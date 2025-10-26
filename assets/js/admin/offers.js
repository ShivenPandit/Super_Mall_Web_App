/**
 * Admin Offers Management Module
 */

let offers = [];
let shops = [];
let editingOfferId = null;

document.addEventListener('DOMContentLoaded', async () => {
    Logger.info('Offers management page loaded', { module: 'admin-offers' });

    await Promise.all([
        loadShops(),
        loadOffers()
    ]);

    setupEventListeners();
});

function setupEventListeners() {
    document.getElementById('add-offer-btn').addEventListener('click', () => openModal());
    document.getElementById('close-modal').addEventListener('click', closeModal);
    document.getElementById('cancel-btn').addEventListener('click', closeModal);
    document.getElementById('offer-form').addEventListener('submit', handleOfferSubmit);
    document.getElementById('search-input').addEventListener('input', Utils.debounce(filterOffers, 300));
    document.getElementById('shop-filter').addEventListener('change', filterOffers);
    document.getElementById('status-filter').addEventListener('change', filterOffers);
}

async function loadShops() {
    try {
        const snapshot = await db.collection(CONSTANTS.COLLECTIONS.SHOPS).get();
        shops = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));

        const shopSelect = document.getElementById('offer-shop');
        const shopFilter = document.getElementById('shop-filter');
        
        shopSelect.innerHTML = '<option value="">Select Shop</option>';
        shopFilter.innerHTML = '<option value="">All Shops</option>';
        
        shops.forEach(shop => {
            shopSelect.innerHTML += `<option value="${shop.id}">${shop.name}</option>`;
            shopFilter.innerHTML += `<option value="${shop.id}">${shop.name}</option>`;
        });

        Logger.info('Shops loaded for offers', { module: 'admin-offers', count: shops.length });
    } catch (error) {
        Logger.error('Failed to load shops', { module: 'admin-offers', error: error.message });
    }
}

async function loadOffers() {
    try {
        Utils.showLoading();
        
        const snapshot = await db.collection(CONSTANTS.COLLECTIONS.OFFERS)
            .orderBy('createdAt', 'desc')
            .get();
        
        offers = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
        
        displayOffers(offers);
        
        Logger.info('Offers loaded', { module: 'admin-offers', count: offers.length });
        
        Utils.hideLoading();
    } catch (error) {
        Utils.hideLoading();
        Logger.error('Failed to load offers', { module: 'admin-offers', error: error.message });
        Utils.showToast('Failed to load offers', 'error');
    }
}

function displayOffers(offersToDisplay) {
    const container = document.getElementById('offers-container');
    
    if (offersToDisplay.length === 0) {
        container.innerHTML = '<p class="text-center">No offers found</p>';
        return;
    }

    container.innerHTML = offersToDisplay.map(offer => `
        <div class="offer-card">
            <div class="offer-header">
                <h4 class="offer-title">${Utils.sanitizeHTML(offer.title)}</h4>
                <span class="offer-discount">${offer.discount}${offer.offerType === 'percentage' ? '%' : ''} OFF</span>
            </div>
            <div class="offer-body">
                <p>${Utils.sanitizeHTML(offer.description)}</p>
                <p><strong>Shop:</strong> ${Utils.sanitizeHTML(offer.shopName)}</p>
                <p><strong>Type:</strong> ${offer.offerType}</p>
                <div class="offer-dates">
                    <span>Start: ${Utils.formatDate(offer.startDate)}</span>
                    <span>End: ${Utils.formatDate(offer.endDate)}</span>
                </div>
            </div>
            <div class="offer-footer">
                <button class="btn btn-sm btn-primary" onclick="editOffer('${offer.id}')">Edit</button>
                <button class="btn btn-sm btn-danger" onclick="deleteOffer('${offer.id}', '${Utils.sanitizeHTML(offer.title)}')">Delete</button>
            </div>
        </div>
    `).join('');
}

function filterOffers() {
    const searchTerm = document.getElementById('search-input').value.toLowerCase();
    const shopFilter = document.getElementById('shop-filter').value;
    const statusFilter = document.getElementById('status-filter').value;

    let filtered = offers;

    if (searchTerm) {
        filtered = filtered.filter(offer => 
            offer.title.toLowerCase().includes(searchTerm) ||
            offer.description.toLowerCase().includes(searchTerm)
        );
    }

    if (shopFilter) {
        filtered = filtered.filter(offer => offer.shopId === shopFilter);
    }

    if (statusFilter) {
        const now = new Date().toISOString();
        filtered = filtered.filter(offer => {
            if (statusFilter === 'active') return offer.endDate >= now;
            if (statusFilter === 'expired') return offer.endDate < now;
            if (statusFilter === 'upcoming') return offer.startDate > now;
            return true;
        });
    }

    displayOffers(filtered);
}

function openModal(offer = null) {
    const modal = document.getElementById('offer-modal');
    const modalTitle = document.getElementById('modal-title');
    const form = document.getElementById('offer-form');
    
    form.reset();
    document.getElementById('modal-error-container').style.display = 'none';
    
    if (offer) {
        modalTitle.textContent = 'Edit Offer';
        document.getElementById('offer-id').value = offer.id;
        document.getElementById('offer-title').value = offer.title;
        document.getElementById('offer-description').value = offer.description;
        document.getElementById('offer-shop').value = offer.shopId;
        document.getElementById('offer-type').value = offer.offerType;
        document.getElementById('offer-discount').value = offer.discount;
        document.getElementById('offer-start-date').value = offer.startDate;
        document.getElementById('offer-end-date').value = offer.endDate;
        editingOfferId = offer.id;
    } else {
        modalTitle.textContent = 'Add New Offer';
        editingOfferId = null;
    }
    
    modal.classList.add('show');
}

function closeModal() {
    document.getElementById('offer-modal').classList.remove('show');
    editingOfferId = null;
}

async function handleOfferSubmit(e) {
    e.preventDefault();
    
    const shopId = document.getElementById('offer-shop').value;
    const shop = shops.find(s => s.id === shopId);
    
    const offerData = {
        title: document.getElementById('offer-title').value.trim(),
        description: document.getElementById('offer-description').value.trim(),
        shopId: shopId,
        shopName: shop ? shop.name : '',
        offerType: document.getElementById('offer-type').value,
        discount: parseInt(document.getElementById('offer-discount').value),
        startDate: document.getElementById('offer-start-date').value,
        endDate: document.getElementById('offer-end-date').value
    };

    const validation = Validator.validateOffer(offerData);
    if (!validation.isValid) {
        Validator.displayErrors(validation.errors, 'modal-error-container');
        return;
    }

    try {
        Utils.showLoading();
        
        if (editingOfferId) {
            await db.collection(CONSTANTS.COLLECTIONS.OFFERS)
                .doc(editingOfferId)
                .update({
                    ...offerData,
                    updatedAt: firebase.firestore.FieldValue.serverTimestamp()
                });
            
            Logger.info('Offer updated', { module: 'admin-offers', offerId: editingOfferId });
            Utils.showToast(CONSTANTS.SUCCESS_MESSAGES.OFFER_UPDATED, 'success');
        } else {
            await db.collection(CONSTANTS.COLLECTIONS.OFFERS).add({
                ...offerData,
                createdAt: firebase.firestore.FieldValue.serverTimestamp(),
                updatedAt: firebase.firestore.FieldValue.serverTimestamp()
            });
            
            Logger.info('Offer created', { module: 'admin-offers' });
            Utils.showToast(CONSTANTS.SUCCESS_MESSAGES.OFFER_CREATED, 'success');
        }
        
        closeModal();
        await loadOffers();
        Utils.hideLoading();
    } catch (error) {
        Utils.hideLoading();
        Logger.error('Failed to save offer', { module: 'admin-offers', error: error.message });
        Utils.showToast('Failed to save offer', 'error');
    }
}

function editOffer(offerId) {
    const offer = offers.find(o => o.id === offerId);
    if (offer) openModal(offer);
}

async function deleteOffer(offerId, offerTitle) {
    const confirmed = await Utils.confirm(
        `Are you sure you want to delete "${offerTitle}"?`,
        'Confirm Delete'
    );
    
    if (!confirmed) return;

    try {
        Utils.showLoading();
        await db.collection(CONSTANTS.COLLECTIONS.OFFERS).doc(offerId).delete();
        Logger.info('Offer deleted', { module: 'admin-offers', offerId, offerTitle });
        Utils.showToast(CONSTANTS.SUCCESS_MESSAGES.OFFER_DELETED, 'success');
        await loadOffers();
        Utils.hideLoading();
    } catch (error) {
        Utils.hideLoading();
        Logger.error('Failed to delete offer', { module: 'admin-offers', error: error.message });
        Utils.showToast('Failed to delete offer', 'error');
    }
}
