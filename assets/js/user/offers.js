/**
 * User Offers Browsing Module
 */

let offers = [];
let shops = [];

document.addEventListener('DOMContentLoaded', async () => {
    Logger.info('User offers page loaded', { module: 'user-offers' });

    await Promise.all([
        loadShops(),
        loadOffers()
    ]);

    setupEventListeners();
});

function setupEventListeners() {
    document.getElementById('search-input').addEventListener('input', Utils.debounce(filterOffers, 300));
    document.getElementById('shop-filter').addEventListener('change', filterOffers);
    document.getElementById('type-filter').addEventListener('change', filterOffers);
}

async function loadShops() {
    try {
        const snapshot = await db.collection(CONSTANTS.COLLECTIONS.SHOPS).get();
        shops = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));

        const shopFilter = document.getElementById('shop-filter');
        shopFilter.innerHTML = '<option value="">All Shops</option>';
        
        shops.forEach(shop => {
            shopFilter.innerHTML += `<option value="${shop.id}">${shop.name}</option>`;
        });

        Logger.info('Shops loaded for offers', { module: 'user-offers', count: shops.length });
    } catch (error) {
        Logger.error('Failed to load shops', { module: 'user-offers', error: error.message });
    }
}

async function loadOffers() {
    try {
        Utils.showLoading();
        
        // Load only active offers (end date >= today)
        const today = new Date().toISOString().split('T')[0];
        
        const snapshot = await db.collection(CONSTANTS.COLLECTIONS.OFFERS)
            .where('endDate', '>=', today)
            .orderBy('endDate', 'asc')
            .get();
        
        offers = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
        
        filterOffers();
        
        Logger.info('Offers loaded', { module: 'user-offers', count: offers.length });
        
        Utils.hideLoading();
    } catch (error) {
        Utils.hideLoading();
        Logger.error('Failed to load offers', { module: 'user-offers', error: error.message });
        Utils.showToast('Failed to load offers', 'error');
    }
}

function filterOffers() {
    const searchTerm = document.getElementById('search-input').value.toLowerCase();
    const shopFilter = document.getElementById('shop-filter').value;
    const typeFilter = document.getElementById('type-filter').value;

    let filtered = offers;

    // Search filter
    if (searchTerm) {
        filtered = filtered.filter(offer => 
            offer.title.toLowerCase().includes(searchTerm) ||
            offer.description.toLowerCase().includes(searchTerm) ||
            offer.shopName.toLowerCase().includes(searchTerm)
        );
    }

    // Shop filter
    if (shopFilter) {
        filtered = filtered.filter(offer => offer.shopId === shopFilter);
    }

    // Type filter
    if (typeFilter) {
        filtered = filtered.filter(offer => offer.offerType === typeFilter);
    }

    displayOffers(filtered);
    
    Logger.info('Offers filtered', { 
        module: 'user-offers',
        resultCount: filtered.length
    });
}

function displayOffers(offersToDisplay) {
    const container = document.getElementById('offers-container');
    
    if (offersToDisplay.length === 0) {
        container.innerHTML = `
            <div class="empty-state">
                <div class="empty-state-icon">💰</div>
                <h3>No active offers</h3>
                <p>Check back later for exciting deals!</p>
            </div>
        `;
        return;
    }

    container.innerHTML = offersToDisplay.map(offer => `
        <div class="user-offer-card">
            <div class="offer-ribbon">
                ${offer.discount}${offer.offerType === 'percentage' ? '%' : ''} OFF
            </div>
            <div class="user-offer-body">
                <h4>${Utils.sanitizeHTML(offer.title)}</h4>
                <p>${Utils.sanitizeHTML(offer.description)}</p>
                <p class="offer-shop-name">📍 ${Utils.sanitizeHTML(offer.shopName)}</p>
                <p><span class="badge badge-info">${getOfferTypeLabel(offer.offerType)}</span></p>
                <div class="offer-validity">
                    <span>Valid from: ${Utils.formatDate(offer.startDate)}</span>
                    <span>Until: ${Utils.formatDate(offer.endDate)}</span>
                </div>
            </div>
        </div>
    `).join('');
}

function getOfferTypeLabel(type) {
    const labels = {
        'percentage': 'Percentage Discount',
        'fixed_amount': 'Fixed Amount Off',
        'bogo': 'Buy One Get One',
        'seasonal': 'Seasonal Sale'
    };
    return labels[type] || type;
}
