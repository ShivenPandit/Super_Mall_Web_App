/**
 * User Shops Browsing Module
 */

let shops = [];
let categories = [];
let floors = [];

document.addEventListener('DOMContentLoaded', async () => {
    Logger.info('User shops page loaded', { module: 'user-shops' });

    await Promise.all([
        loadCategories(),
        loadFloors(),
        loadShops()
    ]);

    setupEventListeners();
});

function setupEventListeners() {
    document.getElementById('search-input').addEventListener('input', Utils.debounce(filterShops, 300));
    document.getElementById('category-filter').addEventListener('change', filterShops);
    document.getElementById('floor-filter').addEventListener('change', filterShops);
    document.getElementById('status-filter').addEventListener('change', filterShops);
}

async function loadCategories() {
    try {
        const snapshot = await db.collection(CONSTANTS.COLLECTIONS.CATEGORIES).get();
        categories = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));

        const categoryFilter = document.getElementById('category-filter');
        categoryFilter.innerHTML = '<option value="">All Categories</option>';
        
        categories.forEach(category => {
            categoryFilter.innerHTML += `<option value="${category.name}">${category.name}</option>`;
        });

        // Check for category parameter in URL
        const urlCategory = Utils.getQueryParam('category');
        if (urlCategory) {
            categoryFilter.value = urlCategory;
        }

        Logger.info('Categories loaded', { module: 'user-shops', count: categories.length });
    } catch (error) {
        Logger.error('Failed to load categories', { module: 'user-shops', error: error.message });
    }
}

async function loadFloors() {
    try {
        const snapshot = await db.collection(CONSTANTS.COLLECTIONS.FLOORS)
            .orderBy('level', 'asc')
            .get();
        floors = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));

        const floorFilter = document.getElementById('floor-filter');
        floorFilter.innerHTML = '<option value="">All Floors</option>';
        
        floors.forEach(floor => {
            floorFilter.innerHTML += `<option value="${floor.name}">${floor.name}</option>`;
        });

        // Check for floor parameter in URL
        const urlFloor = Utils.getQueryParam('floor');
        if (urlFloor) {
            floorFilter.value = urlFloor;
        }

        Logger.info('Floors loaded', { module: 'user-shops', count: floors.length });
    } catch (error) {
        Logger.error('Failed to load floors', { module: 'user-shops', error: error.message });
    }
}

async function loadShops() {
    try {
        Utils.showLoading();
        
        const snapshot = await db.collection(CONSTANTS.COLLECTIONS.SHOPS)
            .orderBy('name', 'asc')
            .get();
        
        shops = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
        
        filterShops(); // Apply initial filters
        
        Logger.info('Shops loaded', { module: 'user-shops', count: shops.length });
        
        Utils.hideLoading();
    } catch (error) {
        Utils.hideLoading();
        Logger.error('Failed to load shops', { module: 'user-shops', error: error.message });
        Utils.showToast('Failed to load shops', 'error');
    }
}

function filterShops() {
    const searchTerm = document.getElementById('search-input').value.toLowerCase();
    const categoryFilter = document.getElementById('category-filter').value;
    const floorFilter = document.getElementById('floor-filter').value;
    const statusFilter = document.getElementById('status-filter').value;

    let filtered = shops;

    // Status filter
    if (statusFilter) {
        filtered = filtered.filter(shop => shop.status === statusFilter);
    }

    // Search filter
    if (searchTerm) {
        filtered = filtered.filter(shop => 
            shop.name.toLowerCase().includes(searchTerm) ||
            shop.description.toLowerCase().includes(searchTerm) ||
            shop.category.toLowerCase().includes(searchTerm)
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
        module: 'user-shops',
        resultCount: filtered.length
    });
}

function displayShops(shopsToDisplay) {
    const container = document.getElementById('shops-container');
    
    if (shopsToDisplay.length === 0) {
        container.innerHTML = `
            <div class="empty-state">
                <div class="empty-state-icon">🏪</div>
                <h3>No shops found</h3>
                <p>Try adjusting your filters or search terms</p>
            </div>
        `;
        return;
    }

    container.innerHTML = shopsToDisplay.map(shop => `
        <div class="shop-card" onclick="viewShopDetails('${shop.id}')">
            <div class="shop-card-header">
                <h3>${Utils.sanitizeHTML(shop.name)}</h3>
                <span class="badge badge-light">${Utils.sanitizeHTML(shop.category)}</span>
            </div>
            <div class="shop-card-body">
                <p>${Utils.sanitizeHTML(shop.description)}</p>
                <div class="shop-info-item">
                    <strong>Floor:</strong>
                    <span>${Utils.sanitizeHTML(shop.floor)}</span>
                </div>
                <div class="shop-info-item">
                    <strong>Contact:</strong>
                    <span>${Utils.sanitizeHTML(shop.contact)}</span>
                </div>
                ${shop.email ? `
                <div class="shop-info-item">
                    <strong>Email:</strong>
                    <span>${Utils.sanitizeHTML(shop.email)}</span>
                </div>
                ` : ''}
            </div>
            <div class="shop-card-footer">
                <span class="badge badge-${shop.status === 'active' ? 'success' : 'secondary'}">${shop.status}</span>
                <button class="btn btn-sm btn-primary">View Details</button>
            </div>
        </div>
    `).join('');
}

function viewShopDetails(shopId) {
    window.location.href = `shop-details.html?id=${shopId}`;
}
