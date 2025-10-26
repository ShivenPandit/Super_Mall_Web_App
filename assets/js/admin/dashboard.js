/**
 * Admin Dashboard Module
 * Displays statistics and overview of the mall
 */

document.addEventListener('DOMContentLoaded', async () => {
    Logger.info('Dashboard loaded', { module: 'admin-dashboard' });

    // Load dashboard statistics
    await loadDashboardStats();
    
    // Load recent shops
    await loadRecentShops();
    
    // Load active offers
    await loadActiveOffers();
});

/**
 * Load dashboard statistics
 */
async function loadDashboardStats() {
    try {
        Utils.showLoading();

        // Get counts from Firestore
        const [shopsSnapshot, productsSnapshot, offersSnapshot, categoriesSnapshot] = await Promise.all([
            db.collection(CONSTANTS.COLLECTIONS.SHOPS).get(),
            db.collection(CONSTANTS.COLLECTIONS.PRODUCTS).get(),
            db.collection(CONSTANTS.COLLECTIONS.OFFERS)
                .where('endDate', '>=', new Date().toISOString())
                .get(),
            db.collection(CONSTANTS.COLLECTIONS.CATEGORIES).get()
        ]);

        // Update stat cards
        document.getElementById('total-shops').textContent = shopsSnapshot.size;
        document.getElementById('total-products').textContent = productsSnapshot.size;
        document.getElementById('total-offers').textContent = offersSnapshot.size;
        document.getElementById('total-categories').textContent = categoriesSnapshot.size;

        Logger.info('Dashboard stats loaded', {
            module: 'admin-dashboard',
            shops: shopsSnapshot.size,
            products: productsSnapshot.size,
            offers: offersSnapshot.size,
            categories: categoriesSnapshot.size
        });

        Utils.hideLoading();
    } catch (error) {
        Utils.hideLoading();
        Logger.error('Failed to load dashboard stats', {
            module: 'admin-dashboard',
            error: error.message
        });
        Utils.showToast('Failed to load statistics', 'error');
    }
}

/**
 * Load recent shops
 */
async function loadRecentShops() {
    try {
        const snapshot = await db.collection(CONSTANTS.COLLECTIONS.SHOPS)
            .orderBy('createdAt', 'desc')
            .limit(5)
            .get();

        const container = document.getElementById('recent-shops-container');
        
        if (snapshot.empty) {
            container.innerHTML = '<p class="text-center text-secondary">No shops available</p>';
            return;
        }

        let html = '<div class="table-responsive"><table class="table"><thead><tr><th>Shop Name</th><th>Category</th><th>Floor</th><th>Status</th></tr></thead><tbody>';
        
        snapshot.forEach(doc => {
            const shop = doc.data();
            html += `
                <tr>
                    <td>${Utils.sanitizeHTML(shop.name)}</td>
                    <td>${Utils.sanitizeHTML(shop.category)}</td>
                    <td>${Utils.sanitizeHTML(shop.floor)}</td>
                    <td><span class="badge badge-${shop.status === 'active' ? 'success' : 'warning'}">${shop.status}</span></td>
                </tr>
            `;
        });
        
        html += '</tbody></table></div>';
        container.innerHTML = html;

        Logger.info('Recent shops loaded', { module: 'admin-dashboard', count: snapshot.size });
    } catch (error) {
        Logger.error('Failed to load recent shops', {
            module: 'admin-dashboard',
            error: error.message
        });
    }
}

/**
 * Load active offers
 */
async function loadActiveOffers() {
    try {
        const snapshot = await db.collection(CONSTANTS.COLLECTIONS.OFFERS)
            .where('endDate', '>=', new Date().toISOString())
            .orderBy('endDate', 'asc')
            .limit(5)
            .get();

        const container = document.getElementById('active-offers-container');
        
        if (snapshot.empty) {
            container.innerHTML = '<p class="text-center text-secondary">No active offers</p>';
            return;
        }

        let html = '<div class="table-responsive"><table class="table"><thead><tr><th>Title</th><th>Discount</th><th>Start Date</th><th>End Date</th></tr></thead><tbody>';
        
        snapshot.forEach(doc => {
            const offer = doc.data();
            html += `
                <tr>
                    <td>${Utils.sanitizeHTML(offer.title)}</td>
                    <td><span class="badge badge-danger">${offer.discount}${offer.offerType === 'percentage' ? '%' : ''} OFF</span></td>
                    <td>${Utils.formatDate(offer.startDate)}</td>
                    <td>${Utils.formatDate(offer.endDate)}</td>
                </tr>
            `;
        });
        
        html += '</tbody></table></div>';
        container.innerHTML = html;

        Logger.info('Active offers loaded', { module: 'admin-dashboard', count: snapshot.size });
    } catch (error) {
        Logger.error('Failed to load active offers', {
            module: 'admin-dashboard',
            error: error.message
        });
    }
}
