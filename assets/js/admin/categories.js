/**
 * Admin Categories Management Module
 */

let categories = [];
let editingCategoryId = null;

document.addEventListener('DOMContentLoaded', async () => {
    Logger.info('Categories management page loaded', { module: 'admin-categories' });
    await loadCategories();
    setupEventListeners();
});

function setupEventListeners() {
    document.getElementById('add-category-btn').addEventListener('click', () => openModal());
    document.getElementById('close-modal').addEventListener('click', closeModal);
    document.getElementById('cancel-btn').addEventListener('click', closeModal);
    document.getElementById('category-form').addEventListener('submit', handleCategorySubmit);
}

async function loadCategories() {
    try {
        Utils.showLoading();
        
        const snapshot = await db.collection(CONSTANTS.COLLECTIONS.CATEGORIES)
            .orderBy('createdAt', 'desc')
            .get();
        
        categories = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
        
        displayCategories(categories);
        
        Logger.info('Categories loaded', { module: 'admin-categories', count: categories.length });
        
        Utils.hideLoading();
    } catch (error) {
        Utils.hideLoading();
        Logger.error('Failed to load categories', { module: 'admin-categories', error: error.message });
        Utils.showToast('Failed to load categories', 'error');
    }
}

function displayCategories(categoriesToDisplay) {
    const container = document.getElementById('categories-container');
    
    if (categoriesToDisplay.length === 0) {
        container.innerHTML = '<p class="text-center">No categories found</p>';
        return;
    }

    container.innerHTML = categoriesToDisplay.map(category => `
        <div class="category-card-admin">
            <div class="category-icon-large">${category.icon || '📦'}</div>
            <h4>${Utils.sanitizeHTML(category.name)}</h4>
            <p>${Utils.sanitizeHTML(category.description || 'No description')}</p>
            <div class="category-footer">
                <button class="btn btn-sm btn-primary" onclick="editCategory('${category.id}')">Edit</button>
                <button class="btn btn-sm btn-danger" onclick="deleteCategory('${category.id}', '${Utils.sanitizeHTML(category.name)}')">Delete</button>
            </div>
        </div>
    `).join('');
}

function openModal(category = null) {
    const modal = document.getElementById('category-modal');
    const modalTitle = document.getElementById('modal-title');
    const form = document.getElementById('category-form');
    
    form.reset();
    document.getElementById('modal-error-container').style.display = 'none';
    
    if (category) {
        modalTitle.textContent = 'Edit Category';
        document.getElementById('category-id').value = category.id;
        document.getElementById('category-name').value = category.name;
        document.getElementById('category-description').value = category.description || '';
        document.getElementById('category-icon').value = category.icon || '';
        editingCategoryId = category.id;
    } else {
        modalTitle.textContent = 'Add New Category';
        editingCategoryId = null;
    }
    
    modal.classList.add('show');
}

function closeModal() {
    document.getElementById('category-modal').classList.remove('show');
    editingCategoryId = null;
}

async function handleCategorySubmit(e) {
    e.preventDefault();
    
    const categoryData = {
        name: document.getElementById('category-name').value.trim(),
        description: document.getElementById('category-description').value.trim(),
        icon: document.getElementById('category-icon').value.trim() || '📦'
    };

    const validation = Validator.validateCategory(categoryData);
    if (!validation.isValid) {
        Validator.displayErrors(validation.errors, 'modal-error-container');
        return;
    }

    try {
        Utils.showLoading();
        
        if (editingCategoryId) {
            await db.collection(CONSTANTS.COLLECTIONS.CATEGORIES)
                .doc(editingCategoryId)
                .update(categoryData);
            
            Logger.info('Category updated', { module: 'admin-categories', categoryId: editingCategoryId });
            Utils.showToast('Category updated successfully!', 'success');
        } else {
            await db.collection(CONSTANTS.COLLECTIONS.CATEGORIES).add({
                ...categoryData,
                createdAt: firebase.firestore.FieldValue.serverTimestamp()
            });
            
            Logger.info('Category created', { module: 'admin-categories' });
            Utils.showToast('Category created successfully!', 'success');
        }
        
        closeModal();
        await loadCategories();
        Utils.hideLoading();
    } catch (error) {
        Utils.hideLoading();
        Logger.error('Failed to save category', { module: 'admin-categories', error: error.message });
        Utils.showToast('Failed to save category', 'error');
    }
}

function editCategory(categoryId) {
    const category = categories.find(c => c.id === categoryId);
    if (category) openModal(category);
}

async function deleteCategory(categoryId, categoryName) {
    const confirmed = await Utils.confirm(
        `Are you sure you want to delete "${categoryName}"? This will not delete shops in this category.`,
        'Confirm Delete'
    );
    
    if (!confirmed) return;

    try {
        Utils.showLoading();
        await db.collection(CONSTANTS.COLLECTIONS.CATEGORIES).doc(categoryId).delete();
        Logger.info('Category deleted', { module: 'admin-categories', categoryId, categoryName });
        Utils.showToast('Category deleted successfully!', 'success');
        await loadCategories();
        Utils.hideLoading();
    } catch (error) {
        Utils.hideLoading();
        Logger.error('Failed to delete category', { module: 'admin-categories', error: error.message });
        Utils.showToast('Failed to delete category', 'error');
    }
}
