import { initializeApp } from "https://www.gstatic.com/firebasejs/9.23.0/firebase-app.js";
import { getAuth } from "https://www.gstatic.com/firebasejs/9.23.0/firebase-auth.js";
import { getFirestore } from "https://www.gstatic.com/firebasejs/9.23.0/firebase-firestore.js";
import { doc, getDoc, updateDoc, serverTimestamp } from "https://www.gstatic.com/firebasejs/9.23.0/firebase-firestore.js";

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

// Personal Info Section - Function-based approach
let userData = null;

const elements = {
    avatar: document.getElementById('profileAvatar'),
    userName: document.getElementById('userName'),
    userEmail: document.getElementById('userEmail'),
    displayUsername: document.getElementById('displayUsername'),
    displayFullName: document.getElementById('displayFullName'),
    displayEmail: document.getElementById('displayEmail'),
    displayPhone: document.getElementById('displayPhone'),
    displayAddress: document.getElementById('displayAddress'),
    displayMemberSince: document.getElementById('displayMemberSince'),
    displayMode: document.getElementById('profileDisplayMode'),
    editForm: document.getElementById('profileEditForm'),
    editUsername: document.getElementById('editUsername'),
    editFirstName: document.getElementById('editFirstName'),
    editLastName: document.getElementById('editLastName'),
    editEmail: document.getElementById('editEmail'),
    editPhone: document.getElementById('editPhone'),
    editAddress: document.getElementById('editAddress'),
    editMemberSince: document.getElementById('editMemberSince'),
    editBtn: document.getElementById('editProfileBtn'),
    saveBtn: document.getElementById('saveProfileBtn'),
    cancelBtn: document.getElementById('cancelEditBtn')
};

function initPersonalInfo() {
    bindEvents();
}

function bindEvents() {
    elements.editBtn?.addEventListener('click', switchToEditMode);
    elements.saveBtn?.addEventListener('click', saveProfileChanges);
    elements.cancelBtn?.addEventListener('click', switchToDisplayMode);
}

async function loadUserProfile(user) {
    try {
        const userDoc = await getDoc(doc(db, "users", user.uid));
        if (userDoc.exists()) {
            userData = userDoc.data();
            displayUserData();
        } else {
            alert("User data not found. Please contact support.");
        }
    } catch (error) {
        console.error("Error loading profile:", error);
        alert("Error loading profile data. Please try again.");
    }
}

function displayUserData() {
    if (!userData) return;
    
    const firstLetter = userData.user_name ? userData.user_name.charAt(0).toUpperCase() : 'U';
    if (elements.avatar) elements.avatar.innerHTML = firstLetter;
    
    if (elements.userName) elements.userName.textContent = userData.user_name || 'Unknown User';
    if (elements.userEmail) elements.userEmail.textContent = userData.email || 'No email';
    if (elements.displayUsername) elements.displayUsername.textContent = userData.user_name || 'Not set';
    if (elements.displayFullName) elements.displayFullName.textContent = `${userData.first_name || ''} ${userData.last_name || ''}`.trim() || 'Not set';
    if (elements.displayEmail) elements.displayEmail.textContent = userData.email || 'Not set';
    if (elements.displayPhone) elements.displayPhone.textContent = userData.phone || 'Not set';
    
    let addressText = 'Not set';
    if (userData.address && userData.address.length > 0) {
        const firstAddress = userData.address[0];
        if (typeof firstAddress === 'string') {
            addressText = firstAddress;
        } else if (typeof firstAddress === 'object' && firstAddress.text) {
            addressText = firstAddress.text;
        }
    }
    if (elements.displayAddress) elements.displayAddress.textContent = addressText;
    
    if (userData.created_at) {
        const date = userData.created_at.toDate();
        if (elements.displayMemberSince) {
            elements.displayMemberSince.textContent = date.toLocaleDateString('en-US', {
                year: 'numeric', month: 'long', day: 'numeric'
            });
        }
    } else {
        if (elements.displayMemberSince) elements.displayMemberSince.textContent = 'Unknown';
    }
}

function switchToEditMode() {
    if (elements.displayMode) elements.displayMode.style.display = 'none';
    if (elements.editForm) elements.editForm.style.display = 'block';
    populateEditForm();
}

function switchToDisplayMode() {
    if (elements.displayMode) elements.displayMode.style.display = 'block';
    if (elements.editForm) elements.editForm.style.display = 'none';
    clearValidationErrors();
}

function populateEditForm() {
    if (!userData) return;
    
    if (elements.editUsername) elements.editUsername.value = userData.user_name || '';
    if (elements.editFirstName) elements.editFirstName.value = userData.first_name || '';
    if (elements.editLastName) elements.editLastName.value = userData.last_name || '';
    if (elements.editEmail) elements.editEmail.value = userData.email || '';
    if (elements.editPhone) elements.editPhone.value = userData.phone || '';
    
    let addressValue = '';
    if (userData.address && userData.address.length > 0) {
        const firstAddress = userData.address[0];
        if (typeof firstAddress === 'string') {
            addressValue = firstAddress;
        } else if (typeof firstAddress === 'object' && firstAddress.text) {
            addressValue = firstAddress.text;
        }
    }
    if (elements.editAddress) elements.editAddress.value = addressValue;
    
    if (userData.created_at) {
        const date = userData.created_at.toDate();
        if (elements.editMemberSince) {
            elements.editMemberSince.value = date.toLocaleDateString('en-US', {
                year: 'numeric', month: 'long', day: 'numeric'
            });
        }
    }
}

function clearValidationErrors() {
    document.querySelectorAll('.is-invalid').forEach(field => field.classList.remove('is-invalid'));
    document.querySelectorAll('.invalid-feedback').forEach(error => error.remove());
}

function showValidationError(fieldId, message) {
    const field = document.getElementById(fieldId);
    const formGroup = field.closest('.mb-3');
    
    formGroup.querySelector('.invalid-feedback')?.remove();
    field.classList.add('is-invalid');
    
    const errorDiv = document.createElement('div');
    errorDiv.className = 'invalid-feedback';
    errorDiv.textContent = message;
    formGroup.appendChild(errorDiv);
}

function validateEditForm() {
    clearValidationErrors();
    let isValid = true;
    
    const fields = [
        { id: 'editUsername', value: elements.editUsername?.value.trim() || '', name: 'Username' },
        { id: 'editFirstName', value: elements.editFirstName?.value.trim() || '', name: 'First name' },
        { id: 'editLastName', value: elements.editLastName?.value.trim() || '', name: 'Last name' },
        { id: 'editEmail', value: elements.editEmail?.value.trim() || '', name: 'Email' },
        { id: 'editPhone', value: elements.editPhone?.value.trim() || '', name: 'Phone' },
        { id: 'editAddress', value: elements.editAddress?.value.trim() || '', name: 'Address' }
    ];
    
    fields.forEach(field => {
        if (!field.value) {
            showValidationError(field.id, `${field.name} is required!`);
            isValid = false;
        }
    });
    
    if (elements.editEmail?.value && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(elements.editEmail.value)) {
        showValidationError('editEmail', 'Please enter a valid email address!');
        isValid = false;
    }
    
    if (elements.editPhone?.value && !/^(\+20|0)?1[2015][0-9]{8}$/.test(elements.editPhone.value)) {
        showValidationError('editPhone', 'Please enter a valid Egyptian phone number!');
        isValid = false;
    }
    
    return isValid;
}

async function saveProfileChanges() {
    if (!validateEditForm()) return;
    
    try {
        const user = auth.currentUser;
        if (!user) return;
        
        const updatedData = {
            user_name: elements.editUsername?.value.trim() || '',
            first_name: elements.editFirstName?.value.trim() || '',
            last_name: elements.editLastName?.value.trim() || '',
            email: elements.editEmail?.value.trim() || '',
            phone: elements.editPhone?.value.trim() || '',
            updated_at: serverTimestamp()
        };
        
        const addressValue = elements.editAddress?.value.trim() || '';
        if (addressValue) {
            const currentAddresses = userData.address || [];
            if (currentAddresses.length > 0) {
                currentAddresses[0] = addressValue;
            } else {
                currentAddresses.push(addressValue);
            }
            updatedData.address = currentAddresses;
        }
        
        await updateDoc(doc(db, "users", user.uid), updatedData);
        userData = { ...userData, ...updatedData };
        displayUserData();
        switchToDisplayMode();
        alert('Profile updated successfully!');
        
    } catch (error) {
        console.error('Error updating profile:', error);
        alert('Error updating profile. Please try again.');
    }
}

// Export functions
export { initPersonalInfo, loadUserProfile };