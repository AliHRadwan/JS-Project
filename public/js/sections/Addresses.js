import { initializeApp } from "https://www.gstatic.com/firebasejs/9.23.0/firebase-app.js";
import { getAuth } from "https://www.gstatic.com/firebasejs/9.23.0/firebase-auth.js";
import { getFirestore } from "https://www.gstatic.com/firebasejs/9.23.0/firebase-firestore.js";
import { doc, getDoc, updateDoc } from "https://www.gstatic.com/firebasejs/9.23.0/firebase-firestore.js";

// Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDBBHmLTSuwJhTcr5ZEBb7_mLKqZSfANC4",
  authDomain: "brand-website-ce759.firebaseapp.com",
  projectId: "brand-website-ce759",
  appId: "1:234496063014:web:6e42b87acd29324f5718e7",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

// Addresses Section - Function-based approach
const elements = {
    addAddressBtn: document.getElementById('addAddressBtn'),
    addressesList: document.getElementById('addressesList'),
    addressModal: document.getElementById('addressModal'),
    addressInput: document.getElementById('addressInput'),
    addressLabel: document.getElementById('addressLabel'),
    setAsDefault: document.getElementById('setAsDefault'),
    saveAddressBtn: document.getElementById('saveAddressBtn')
};

function initAddresses() {
    bindEvents();
}

function bindEvents() {
    elements.addAddressBtn?.addEventListener('click', addNewAddress);
    elements.saveAddressBtn?.addEventListener('click', saveAddress);
}

async function loadAddresses() {
    try {
        const user = auth.currentUser;
        if (!user) return;
        
        const userDoc = await getDoc(doc(db, "users", user.uid));
        if (userDoc.exists()) {
            const addresses = userDoc.data().address || [];
            displayAddresses(addresses);
        }
    } catch (error) {
        console.error('Error loading addresses:', error);
    }
}

function displayAddresses(addresses) {
    if (!elements.addressesList) return;

    if (addresses.length === 0) {
        elements.addressesList.innerHTML = `
            <div class="text-center py-5">
                <i class="fas fa-map-marker-alt fa-3x text-muted mb-3"></i>
                <h5 class="text-muted">No addresses saved</h5>
                <p class="text-muted">Add your first address to get started</p>
            </div>
        `;
        return;
    }
    
    elements.addressesList.innerHTML = addresses.map((address, index) => {
        const addressText = typeof address === 'string' ? address : address.text || address;
        const addressLabel = typeof address === 'object' && address.label ? address.label : (index === 0 ? 'Default Address' : `Address ${index + 1}`);
        
        return `
            <div class="card mb-3 ${index === 0 ? 'border-dark bg-light' : 'border-light'}">
                <div class="card-body">
                    <div class="d-flex justify-content-between align-items-start">
                        <div class="flex-grow-1">
                            <h6 class="fw-bold mb-2">
                                ${addressLabel}
                                ${index === 0 ? '<span class="badge bg-dark ms-2">Default</span>' : ''}
                            </h6>
                            <p class="text-muted mb-0">${addressText}</p>
                        </div>
                        <div class="d-flex gap-2">
                            <button class="btn btn-outline-dark btn-sm" onclick="editAddress(${index})">
                                <i class="fas fa-edit"></i>
                            </button>
                            <button class="btn btn-outline-danger btn-sm" onclick="deleteAddress(${index})">
                                <i class="fas fa-trash"></i>
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        `;
    }).join('');
}

function addNewAddress() {
    // Clear form fields
    if (elements.addressInput) elements.addressInput.value = '';
    if (elements.addressLabel) elements.addressLabel.value = '';
    if (elements.setAsDefault) elements.setAsDefault.checked = false;
    
    // Reset modal title and button text
    const modalLabel = document.getElementById('addressModalLabel');
    if (modalLabel) modalLabel.textContent = 'Add New Address';
    if (elements.saveAddressBtn) {
        elements.saveAddressBtn.textContent = 'Save Address';
        elements.saveAddressBtn.removeAttribute('data-edit-index');
    }
    
    // Show the modal
    if (elements.addressModal) {
        new bootstrap.Modal(elements.addressModal).show();
    }
}

async function saveAddress() {
    const addressText = elements.addressInput?.value.trim() || '';
    const addressLabelText = elements.addressLabel?.value.trim() || '';
    
    if (!addressText) {
        alert('Please enter an address');
        return;
    }
    
    try {
        const user = auth.currentUser;
        if (!user) return;
        
        const userDoc = await getDoc(doc(db, "users", user.uid));
        if (userDoc.exists()) {
            let addresses = userDoc.data().address || [];
            const newAddress = addressLabelText ? { text: addressText, label: addressLabelText } : addressText;
            
            // Check if we're editing an existing address
            const editIndex = elements.saveAddressBtn?.getAttribute('data-edit-index');
            
            if (editIndex !== null && editIndex !== undefined) {
                // Update existing address
                const index = parseInt(editIndex);
                if (index >= 0 && index < addresses.length) {
                    addresses[index] = newAddress;
                    
                    // If set as default, move to first position
                    if (elements.setAsDefault?.checked && index !== 0) {
                        addresses.splice(index, 1); // Remove from current position
                        addresses.unshift(newAddress); // Add to beginning
                    }
                }
            } else {
                // Add new address
                if (elements.setAsDefault?.checked) {
                    addresses.unshift(newAddress);
                } else {
                    addresses.push(newAddress);
                }
            }
            
            await updateDoc(doc(db, "users", user.uid), { address: addresses });
            loadAddresses();
            
            // Clear edit index and reset modal
            if (elements.saveAddressBtn) {
                elements.saveAddressBtn.removeAttribute('data-edit-index');
            }
            
            const modalInstance = bootstrap.Modal.getInstance(elements.addressModal);
            if (modalInstance) modalInstance.hide();
        }
    } catch (error) {
        console.error('Error saving address:', error);
        alert('Error saving address. Please try again.');
    }
}

async function editAddress(index) {
    try {
        const user = auth.currentUser;
        if (!user) return;
        
        const userDoc = await getDoc(doc(db, "users", user.uid));
        if (userDoc.exists()) {
            const addresses = userDoc.data().address || [];
            
            if (index >= 0 && index < addresses.length) {
                const address = addresses[index];
                
                // Pre-populate the form with existing address data
                if (elements.addressInput) {
                    elements.addressInput.value = typeof address === 'string' ? address : (address.text || '');
                }
                
                if (elements.addressLabel) {
                    elements.addressLabel.value = typeof address === 'object' && address.label ? address.label : '';
                }
                
                if (elements.setAsDefault) {
                    elements.setAsDefault.checked = index === 0; // First address is default
                }
                
                // Update modal title and button text
                const modalLabel = document.getElementById('addressModalLabel');
                if (modalLabel) modalLabel.textContent = 'Edit Address';
                if (elements.saveAddressBtn) elements.saveAddressBtn.textContent = 'Update Address';
                
                // Store the index for updating
                elements.saveAddressBtn.setAttribute('data-edit-index', index);
                
                // Show the modal
                if (elements.addressModal) {
                    new bootstrap.Modal(elements.addressModal).show();
                }
            }
        }
    } catch (error) {
        console.error('Error loading address for editing:', error);
        alert('Error loading address details. Please try again.');
    }
}

async function deleteAddress(index) {
    if (confirm('Are you sure you want to delete this address?')) {
        try {
            const user = auth.currentUser;
            if (!user) return;
            
            const userDoc = await getDoc(doc(db, "users", user.uid));
            if (userDoc.exists()) {
                const addresses = userDoc.data().address || [];
                addresses.splice(index, 1);
                await updateDoc(doc(db, "users", user.uid), { address: addresses });
                loadAddresses();
            }
        } catch (error) {
            console.error('Error deleting address:', error);
        }
    }
}

// Export functions
export { initAddresses, loadAddresses, editAddress, deleteAddress };