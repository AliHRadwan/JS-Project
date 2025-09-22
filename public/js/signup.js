// Simple signup functionality - keeps all validation and design exactly the same
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.23.0/firebase-app.js";
import { getAuth } from "https://www.gstatic.com/firebasejs/9.23.0/firebase-auth.js";
import { getFirestore } from "https://www.gstatic.com/firebasejs/9.23.0/firebase-firestore.js";
import { createUserWithEmailAndPassword, updateProfile } from "https://www.gstatic.com/firebasejs/9.23.0/firebase-auth.js";
import { doc, setDoc, serverTimestamp } from "https://www.gstatic.com/firebasejs/9.23.0/firebase-firestore.js";

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

// ===========================================
// SIGNUP FEATURE - FORM ELEMENTS
// ===========================================
const signupForm = document.getElementById('signupForm');
const formFields = ['username', 'firstName', 'lastName', 'email', 'phone', 'address', 'password', 'confirmPassword', 'terms'];

// ===========================================
// SIGNUP FEATURE - VALIDATION FUNCTIONS
// ===========================================
function showError(fieldId, message) {
    const field = document.getElementById(fieldId);
    let formGroup;
    
    // For checkboxes, look for .form-check parent, otherwise look for .mb-3
    if (fieldId === 'terms') {
        formGroup = field.closest('.form-check');
    } else {
        formGroup = field.closest('.mb-3');
    }
    
    // Remove old error
    const oldError = formGroup.querySelector('.invalid-feedback');
    if (oldError) {
        oldError.remove();
    }
    
    // Add red border
    field.classList.add('is-invalid');
    
    // Add error message
    const errorDiv = document.createElement('div');
    errorDiv.className = 'invalid-feedback';
    errorDiv.textContent = message;
    formGroup.appendChild(errorDiv);
}

function clearFieldError(fieldId) {
    const field = document.getElementById(fieldId);
    let formGroup;
    
    // For checkboxes, look for .form-check parent, otherwise look for .mb-3
    if (fieldId === 'terms') {
        formGroup = field.closest('.form-check');
    } else {
        formGroup = field.closest('.mb-3');
    }
    
    // Remove error message
    const errorDiv = formGroup.querySelector('.invalid-feedback');
    if (errorDiv) {
        errorDiv.remove();
    }
    
    // Remove red border
    field.classList.remove('is-invalid');
}

function clearAllErrors() {
    const errorMessages = document.querySelectorAll('.invalid-feedback');
    errorMessages.forEach(error => error.remove());
    
    const invalidFields = document.querySelectorAll('.is-invalid');
    invalidFields.forEach(field => field.classList.remove('is-invalid'));
}

function validateField(fieldId) {
    const field = document.getElementById(fieldId);
    const value = field.value.trim();
    
    // Clear previous error
    clearFieldError(fieldId);
    
    // Check if field is empty
    if (!value) {
        showError(fieldId, `${fieldId.charAt(0).toUpperCase() + fieldId.slice(1)} is required!`);
        return false;
    }
    
    // Check specific field types
    if (fieldId === 'email' && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) {
        showError(fieldId, 'Please enter a valid email address!');
        return false;
    }
    
    if (fieldId === 'phone' && !/^(\+20|0)?1[2015][0-9]{8}$/.test(value)) {
        showError(fieldId, 'Please enter a valid Egyptian phone number!');
        return false;
    }
    
    if (fieldId === 'username' && !/^[a-zA-Z0-9_]{3,20}$/.test(value)) {
        showError(fieldId, 'Username must be 3-20 characters and contain only letters, numbers, and underscores!');
        return false;
    }
    
    if (fieldId === 'password' && value.length < 16) {
        showError(fieldId, 'Password must be at least 16 characters long!');
        return false;
    }
    
    if (fieldId === 'password' && (!/[A-Z]/.test(value) || !/[0-9]/.test(value) || !/[@#$%&*]/.test(value))) {
        showError(fieldId, 'Password must contain at least 1 uppercase letter, 1 number, and 1 symbol (@#$%&*)!');
        return false;
    }
    
    if (fieldId === 'confirmPassword') {
        const password = document.getElementById('password').value;
        if (value !== password) {
            showError(fieldId, 'Passwords do not match!');
            return false;
        }
    }
    
    if (fieldId === 'terms' && !field.checked) {
        showError(fieldId, 'You must agree to the terms!');
        return false;
    }
    
    return true;
}

// ===========================================
// SIGNUP FEATURE - USER CREATION FUNCTIONS
// ===========================================
async function createUserAccount(userData) {
    try {
        // Create user account with Firebase
        const userCredential = await createUserWithEmailAndPassword(auth, userData.email, userData.password);
        const user = userCredential.user;
        
        // Set display name for the user
        const fullName = `${userData.firstName} ${userData.lastName}`;
        await updateProfile(user, {
            displayName: fullName
        });
        
        // Save user data to Firestore
        await setDoc(doc(db, "users", user.uid), {
            user_name: userData.username,
            first_name: userData.firstName,
            last_name: userData.lastName,
            email: userData.email,
            phone: userData.phone,
            address: [userData.address], // Store as array
            role: "user",
            cart: [],
            wishlist: [],
            created_at: serverTimestamp(),
            updated_at: serverTimestamp()
        });
        
        // Show success message and redirect
        window.location.href = 'login.html';
        
    } catch (error) {
        console.error('Error:', error);
    }
}

function validateFormData(formData) {
    let hasErrors = false;
    
    // Check all required fields first
    if (!formData.username) {
        showError('username', 'Username is required!');
        hasErrors = true;
    }
    if (!formData.firstName) {
        showError('firstName', 'First name is required!');
        hasErrors = true;
    }
    if (!formData.lastName) {
        showError('lastName', 'Last name is required!');
        hasErrors = true;
    }
    if (!formData.email) {
        showError('email', 'Email is required!');
        hasErrors = true;
    }
    if (!formData.phone) {
        showError('phone', 'Phone is required!');
        hasErrors = true;
    }
    if (!formData.address) {
        showError('address', 'Address is required!');
        hasErrors = true;
    }
    if (!formData.password) {
        showError('password', 'Password is required!');
        hasErrors = true;
    }
    if (!formData.confirmPassword) {
        showError('confirmPassword', 'Please confirm your password!');
        hasErrors = true;
    }
    if (!formData.terms) {
        showError('terms', 'You must agree to the terms!');
        hasErrors = true;
    }
    
    // If any required fields are missing, stop here
    if (hasErrors) {
        return false;
    }
    
    // Now check format validation
    if (!/^[a-zA-Z0-9_]{3,20}$/.test(formData.username)) {
        showError('username', 'Username must be 3-20 characters and contain only letters, numbers, and underscores!');
        hasErrors = true;
    }
    
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
        showError('email', 'Please enter a valid email address!');
        hasErrors = true;
    }
    
    if (!/^(\+20|0)?1[2015][0-9]{8}$/.test(formData.phone)) {
        showError('phone', 'Please enter a valid Egyptian phone number!');
        hasErrors = true;
    }
    
    if (formData.password.length < 16 || !/[A-Z]/.test(formData.password) || !/[0-9]/.test(formData.password) || !/[@#$%&*]/.test(formData.password)) {
        showError('password', 'Password must be at least 16 characters long and contain at least 1 uppercase letter, 1 number, and 1 symbol (@#$%&*)!');
        hasErrors = true;
    }
    
    if (formData.password !== formData.confirmPassword) {
        showError('confirmPassword', 'Passwords do not match!');
        hasErrors = true;
    }
    
    return !hasErrors;
}

// ===========================================
// SIGNUP FEATURE - EVENT LISTENERS
// ===========================================

// Add validation when user leaves a field
formFields.forEach(fieldId => {
    const field = document.getElementById(fieldId);
    field.addEventListener('blur', () => {
        validateField(fieldId);
    });
});

// Handle form submission
signupForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    
    // Get all form values
    const formData = {
        username: document.getElementById('username').value.trim(),
        firstName: document.getElementById('firstName').value.trim(),
        lastName: document.getElementById('lastName').value.trim(),
        email: document.getElementById('email').value.trim(),
        phone: document.getElementById('phone').value.trim(),
        address: document.getElementById('address').value.trim(),
        password: document.getElementById('password').value,
        confirmPassword: document.getElementById('confirmPassword').value,
        terms: document.getElementById('terms').checked
    };
    
    // Clear all previous errors
    clearAllErrors();
    
    // Validate form data
    if (!validateFormData(formData)) {
        return;
    }
    
    // If all validation passes, create the account
    await createUserAccount(formData);
});