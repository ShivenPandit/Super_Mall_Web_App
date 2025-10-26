/**
 * Admin Floors Management Module
 */

let floors = [];
let editingFloorId = null;

document.addEventListener('DOMContentLoaded', async () => {
    Logger.info('Floors management page loaded', { module: 'admin-floors' });
    await loadFloors();
    setupEventListeners();
});

function setupEventListeners() {
    document.getElementById('add-floor-btn').addEventListener('click', () => openModal());
    document.getElementById('close-modal').addEventListener('click', closeModal);
    document.getElementById('cancel-btn').addEventListener('click', closeModal);
    document.getElementById('floor-form').addEventListener('submit', handleFloorSubmit);
}

async function loadFloors() {
    try {
        Utils.showLoading();
        
        const snapshot = await db.collection(CONSTANTS.COLLECTIONS.FLOORS)
            .orderBy('level', 'asc')
            .get();
        
        floors = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
        
        displayFloors(floors);
        
        Logger.info('Floors loaded', { module: 'admin-floors', count: floors.length });
        
        Utils.hideLoading();
    } catch (error) {
        Utils.hideLoading();
        Logger.error('Failed to load floors', { module: 'admin-floors', error: error.message });
        Utils.showToast('Failed to load floors', 'error');
    }
}

function displayFloors(floorsToDisplay) {
    const container = document.getElementById('floors-container');
    
    if (floorsToDisplay.length === 0) {
        container.innerHTML = '<p class="text-center">No floors found</p>';
        return;
    }

    container.innerHTML = floorsToDisplay.map(floor => `
        <div class="floor-card">
            <div class="floor-header">
                <div>
                    <h4>${Utils.sanitizeHTML(floor.name)}</h4>
                    <p>Level: ${floor.level}</p>
                    <p>${Utils.sanitizeHTML(floor.description || 'No description')}</p>
                </div>
                <div class="floor-code">${Utils.sanitizeHTML(floor.code)}</div>
            </div>
            <div class="floor-footer">
                <span class="badge badge-info">Code: ${floor.code}</span>
                <div>
                    <button class="btn btn-sm btn-primary" onclick="editFloor('${floor.id}')">Edit</button>
                    <button class="btn btn-sm btn-danger" onclick="deleteFloor('${floor.id}', '${Utils.sanitizeHTML(floor.name)}')">Delete</button>
                </div>
            </div>
        </div>
    `).join('');
}

function openModal(floor = null) {
    const modal = document.getElementById('floor-modal');
    const modalTitle = document.getElementById('modal-title');
    const form = document.getElementById('floor-form');
    
    form.reset();
    document.getElementById('modal-error-container').style.display = 'none';
    
    if (floor) {
        modalTitle.textContent = 'Edit Floor';
        document.getElementById('floor-id').value = floor.id;
        document.getElementById('floor-name').value = floor.name;
        document.getElementById('floor-code').value = floor.code;
        document.getElementById('floor-level').value = floor.level;
        document.getElementById('floor-description').value = floor.description || '';
        editingFloorId = floor.id;
    } else {
        modalTitle.textContent = 'Add New Floor';
        editingFloorId = null;
    }
    
    modal.classList.add('show');
}

function closeModal() {
    document.getElementById('floor-modal').classList.remove('show');
    editingFloorId = null;
}

async function handleFloorSubmit(e) {
    e.preventDefault();
    
    const floorData = {
        name: document.getElementById('floor-name').value.trim(),
        code: document.getElementById('floor-code').value.trim(),
        level: parseInt(document.getElementById('floor-level').value),
        description: document.getElementById('floor-description').value.trim()
    };

    const validation = Validator.validateFloor(floorData);
    if (!validation.isValid) {
        Validator.displayErrors(validation.errors, 'modal-error-container');
        return;
    }

    try {
        Utils.showLoading();
        
        if (editingFloorId) {
            await db.collection(CONSTANTS.COLLECTIONS.FLOORS)
                .doc(editingFloorId)
                .update(floorData);
            
            Logger.info('Floor updated', { module: 'admin-floors', floorId: editingFloorId });
            Utils.showToast('Floor updated successfully!', 'success');
        } else {
            await db.collection(CONSTANTS.COLLECTIONS.FLOORS).add({
                ...floorData,
                createdAt: firebase.firestore.FieldValue.serverTimestamp()
            });
            
            Logger.info('Floor created', { module: 'admin-floors' });
            Utils.showToast('Floor created successfully!', 'success');
        }
        
        closeModal();
        await loadFloors();
        Utils.hideLoading();
    } catch (error) {
        Utils.hideLoading();
        Logger.error('Failed to save floor', { module: 'admin-floors', error: error.message });
        Utils.showToast('Failed to save floor', 'error');
    }
}

function editFloor(floorId) {
    const floor = floors.find(f => f.id === floorId);
    if (floor) openModal(floor);
}

async function deleteFloor(floorId, floorName) {
    const confirmed = await Utils.confirm(
        `Are you sure you want to delete "${floorName}"? This will not delete shops on this floor.`,
        'Confirm Delete'
    );
    
    if (!confirmed) return;

    try {
        Utils.showLoading();
        await db.collection(CONSTANTS.COLLECTIONS.FLOORS).doc(floorId).delete();
        Logger.info('Floor deleted', { module: 'admin-floors', floorId, floorName });
        Utils.showToast('Floor deleted successfully!', 'success');
        await loadFloors();
        Utils.hideLoading();
    } catch (error) {
        Utils.hideLoading();
        Logger.error('Failed to delete floor', { module: 'admin-floors', error: error.message });
        Utils.showToast('Failed to delete floor', 'error');
    }
}
