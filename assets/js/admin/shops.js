/**
 * Admin Shops Management Module
 * Handles CRUD operations for shops
 */

let shops = [];
let categories = [];
let floors = [];
let editingShopId = null;

document.addEventListener('DOMContentLoaded', async () => {
    Logger.info('Shops management page loaded', { module: 'admin-shops' });

    // Load initial data
    await Promise.all([
        loadCategories(),
        loadFloors(),
        loadShops()
    ]);

    // Setup event listeners
    setupEventListeners();
});

/**
 * Setup event listeners
 */
function setupEventListeners() {
    // Add shop button
    document.getElementById('add-shop-btn').addEventListener('click', () => {
        openModal();
    });

    // Close modal
    document.getElementById('close-modal').addEventListener('click', closeModal);
    document.getElementById('cancel-btn').addEventListener('click', closeModal);

    // Shop form submission
    document.getElementById('shop-form').addEventListener('submit', handleShopSubmit);

    // Search and filters
    document.getElementById('search-input').addEventListener('input', Utils.debounce(filterShops, 300));
    document.getElementById('category-filter').addEventListener('change', filterShops);
    document.getElementById('floor-filter').addEventListener('change', filterShops);
}

/**
 * Load categories
 */
async function loadCategories() {
    try {
        const snapshot = await db.collection(CONSTANTS.COLLECTIONS.CATEGORIES).get();
        categories = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));

        // Populate category dropdowns
        const categorySelect = document.getElementById('shop-category');
        const categoryFilter = document.getElementById('category-filter');
        
        categorySelect.innerHTML = '<option value="">Select Category</option>';
        categoryFilter.innerHTML = '<option value="">All Categories</option>';
        
        categories.forEach(category => {
            categorySelect.innerHTML += `<option value="${category.name}">${category.name}</option>`;
            categoryFilter.innerHTML += `<option value="${category.name}">${category.name}</option>`;
        });

        Logger.info('Categories loaded', { module: 'admin-shops', count: categories.length });
    } catch (error) {
        Logger.error('Failed to load categories', { module: 'admin-shops', error: error.message });
    }
}

/**
 * Load floors
 */
async function loadFloors() {
    try {
        const snapshot = await db.collection(CONSTANTS.COLLECTIONS.FLOORS)
            .orderBy('level', 'asc')
            .get();
        floors = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));

        // Populate floor dropdowns
        const floorSelect = document.getElementById('shop-floor');
        const floorFilter = document.getElementById('floor-filter');
        
        floorSelect.innerHTML = '<option value="">Select Floor</option>';
        floorFilter.innerHTML = '<option value="">All Floors</option>';
        
        floors.forEach(floor => {
            floorSelect.innerHTML += `<option value="${floor.name}">${floor.name}</option>`;
            floorFilter.innerHTML += `<option value="${floor.name}">${floor.name}</option>`;
        });

        Logger.info('Floors loaded', { module: 'admin-shops', count: floors.length });
    } catch (error) {
        Logger.error('Failed to load floors', { module: 'admin-shops', error: error.message });
    }
}

/**
 * Load shops
 */
async function loadShops() {
    try {
        Utils.showLoading();
        
        const snapshot = await db.collection(CONSTANTS.COLLECTIONS.SHOPS)
            .orderBy('createdAt', 'desc')
            .get();
        
        shops = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
        
        displayShops(shops);
        
        Logger.info('Shops loaded', { module: 'admin-shops', count: shops.length });
        
        Utils.hideLoading();
    } catch (error) {
        Utils.hideLoading();
        Logger.error('Failed to load shops', { module: 'admin-shops', error: error.message });
        Utils.showToast('Failed to load shops', 'error');
    }
}

/**
 * Display shops in table
 */
function displayShops(shopsToDisplay) {
    const tbody = document.getElementById('shops-tbody');
    
    if (shopsToDisplay.length === 0) {
        tbody.innerHTML = '<tr><td colspan="6" class="text-center">No shops found</td></tr>';
        return;
    }

    tbody.innerHTML = shopsToDisplay.map(shop => `
        <tr>
            <td>${Utils.sanitizeHTML(shop.name)}</td>
            <td>${Utils.sanitizeHTML(shop.category)}</td>
            <td>${Utils.sanitizeHTML(shop.floor)}</td>
            <td>${Utils.sanitizeHTML(shop.contact)}</td>
            <td><span class="badge badge-${getStatusBadgeClass(shop.status)}">${shop.status}</span></td>
            <td>
                <div class="action-buttons">
                    <button class="btn btn-sm btn-primary" onclick="editShop('${shop.id}')">Edit</button>
                    <button class="btn btn-sm btn-danger" onclick="deleteShop('${shop.id}', '${Utils.sanitizeHTML(shop.name)}')">Delete</button>
                </div>
            </td>
        </tr>
    `).join('');
}

/**
 * Get badge class for status
 */
function getStatusBadgeClass(status) {
    switch (status) {
        case 'active': return 'success';
        case 'inactive': return 'secondary';
        case 'pending': return 'warning';
        default: return 'info';
    }
}

/**
 * Filter shops
 */
function filterShops() {
    const searchTerm = document.getElementById('search-input').value.toLowerCase();
    const categoryFilter = document.getElementById('category-filter').value;
    const floorFilter = document.getElementById('floor-filter').value;

    let filtered = shops;

    // Search filter
    if (searchTerm) {
        filtered = filtered.filter(shop => 
            shop.name.toLowerCase().includes(searchTerm) ||
            shop.description.toLowerCase().includes(searchTerm) ||
            shop.contact.toLowerCase().includes(searchTerm)
        );
    }

    // Category filter
    if (categoryFilter) {
        filtered = filtered.filter(shop => shop.category === categoryFilter);
    }

    // Floor filter
    if (floorFilter) {
        filtered = filtered.filter(shop => shop.floor === floorFilter);
    }

    displayShops(filtered);
    
    Logger.info('Shops filtered', { 
        module: 'admin-shops',
        searchTerm,
        categoryFilter,
        floorFilter,
        resultCount: filtered.length
    });
}

/**
 * Open modal
 */
function openModal(shop = null) {
    const modal = document.getElementById('shop-modal');
    const modalTitle = document.getElementById('modal-title');
    const form = document.getElementById('shop-form');
    
    // Reset form
    form.reset();
    document.getElementById('modal-error-container').style.display = 'none';
    
    if (shop) {
        // Edit mode
        modalTitle.textContent = 'Edit Shop';
        document.getElementById('shop-id').value = shop.id;
        document.getElementById('shop-name').value = shop.name;
        document.getElementById('shop-description').value = shop.description;
        document.getElementById('shop-category').value = shop.category;
        document.getElementById('shop-floor').value = shop.floor;
        document.getElementById('shop-contact').value = shop.contact;
        document.getElementById('shop-email').value = shop.email || '';
        document.getElementById('shop-status').value = shop.status;
        editingShopId = shop.id;
    } else {
        // Add mode
        modalTitle.textContent = 'Add New Shop';
        editingShopId = null;
    }
    
    modal.classList.add('show');
}

/**
 * Close modal
 */
function closeModal() {
    const modal = document.getElementById('shop-modal');
    modal.classList.remove('show');
    editingShopId = null;
}

/**
 * Handle shop form submission
 */
async function handleShopSubmit(e) {
    e.preventDefault();
    
    const shopData = {
        name: document.getElementById('shop-name').value.trim(),
        description: document.getElementById('shop-description').value.trim(),
        category: document.getElementById('shop-category').value,
        floor: document.getElementById('shop-floor').value,
        contact: document.getElementById('shop-contact').value.trim(),
        email: document.getElementById('shop-email').value.trim(),
        status: document.getElementById('shop-status').value
    };

    // Validate
    const validation = Validator.validateShop(shopData);
    if (!validation.isValid) {
        Validator.displayErrors(validation.errors, 'modal-error-container');
        return;
    }

    try {
        Utils.showLoading();
        
        if (editingShopId) {
            // Update existing shop
            await db.collection(CONSTANTS.COLLECTIONS.SHOPS)
                .doc(editingShopId)
                .update({
                    ...shopData,
                    updatedAt: firebase.firestore.FieldValue.serverTimestamp()
                });
            
            Logger.info('Shop updated', { module: 'admin-shops', shopId: editingShopId });
            Utils.showToast(CONSTANTS.SUCCESS_MESSAGES.SHOP_UPDATED, 'success');
        } else {
            // Create new shop
            const docRef = await db.collection(CONSTANTS.COLLECTIONS.SHOPS).add({
                ...shopData,
                createdAt: firebase.firestore.FieldValue.serverTimestamp(),
                updatedAt: firebase.firestore.FieldValue.serverTimestamp()
            });
            
            Logger.info('Shop created', { module: 'admin-shops', shopId: docRef.id });
            Utils.showToast(CONSTANTS.SUCCESS_MESSAGES.SHOP_CREATED, 'success');
        }
        
        closeModal();
        await loadShops();
        Utils.hideLoading();
    } catch (error) {
        Utils.hideLoading();
        Logger.error('Failed to save shop', { module: 'admin-shops', error: error.message });
        Utils.showToast('Failed to save shop', 'error');
    }
}

/**
 * Edit shop
 */
function editShop(shopId) {
    const shop = shops.find(s => s.id === shopId);
    if (shop) {
        openModal(shop);
    }
}

/**
 * Delete shop
 */
async function deleteShop(shopId, shopName) {
    const confirmed = await Utils.confirm(
        `Are you sure you want to delete "${shopName}"?`,
        'Confirm Delete'
    );
    
    if (!confirmed) return;

    try {
        Utils.showLoading();
        
        await db.collection(CONSTANTS.COLLECTIONS.SHOPS).doc(shopId).delete();
        
        Logger.info('Shop deleted', { module: 'admin-shops', shopId, shopName });
        Utils.showToast(CONSTANTS.SUCCESS_MESSAGES.SHOP_DELETED, 'success');
        
        await loadShops();
        Utils.hideLoading();
    } catch (error) {
        Utils.hideLoading();
        Logger.error('Failed to delete shop', { module: 'admin-shops', error: error.message });
        Utils.showToast('Failed to delete shop', 'error');
    }
}
