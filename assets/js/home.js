/**
 * Home Page Module
 * Loads and displays categories on the home page
 */

document.addEventListener('DOMContentLoaded', async () => {
    Logger.info('Home page loaded', { module: 'home' });
    
    await loadCategories();
});

/**
 * Load and display categories
 */
async function loadCategories() {
    try {
        const snapshot = await db.collection(CONSTANTS.COLLECTIONS.CATEGORIES)
            .limit(8)
            .get();
        
        const container = document.getElementById('categories-container');
        
        if (snapshot.empty) {
            container.innerHTML = '<p class="text-center">No categories available</p>';
            return;
        }

        container.innerHTML = snapshot.docs.map(doc => {
            const category = doc.data();
            return `
                <div class="category-card" onclick="window.location.href='user/categories.html?category=${encodeURIComponent(category.name)}'">
                    <div class="category-icon-large">${category.icon || '📦'}</div>
                    <h4>${Utils.sanitizeHTML(category.name)}</h4>
                    <p>${Utils.sanitizeHTML(category.description || 'Explore ' + category.name)}</p>
                </div>
            `;
        }).join('');

        Logger.info('Categories loaded on home page', { module: 'home', count: snapshot.size });
    } catch (error) {
        Logger.error('Failed to load categories', { module: 'home', error: error.message });
    }
}
