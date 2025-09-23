// Simple signup functionality - keeps all validation and design exactly the same
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.23.0/firebase-app.js";
import { getAuth } from "https://www.gstatic.com/firebasejs/9.23.0/firebase-auth.js";
import { getFirestore } from "https://www.gstatic.com/firebasejs/9.23.0/firebase-firestore.js";
import { createUserWithEmailAndPassword, updateProfile, sendEmailVerification } from "https://www.gstatic.com/firebasejs/9.23.0/firebase-auth.js";
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
        
        // Send email verification
        await sendEmailVerification(user);
        
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
            email_verified: false,
            created_at: serverTimestamp(),
            updated_at: serverTimestamp()
        });
        
        // Show email verification message
        showEmailVerificationMessage(userData.email);
        
    } catch (error) {
        console.error('Error:', error);
        handleSignupError(error);
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

// ===========================================
// EMAIL VERIFICATION FUNCTIONALITY
// ===========================================

function showEmailVerificationMessage(email) {
    // Hide the signup form
    const signupForm = document.getElementById('signupForm');
    const signupContainer = signupForm.closest('.w-100');
    
    // Create verification message container
    const verificationContainer = document.createElement('div');
    verificationContainer.className = 'text-center';
    verificationContainer.innerHTML = `
        <div class="mb-4">
            <div class="d-inline-flex align-items-center justify-content-center bg-success bg-opacity-10 rounded-circle mb-3" style="width: 80px; height: 80px;">
                <i class="fas fa-envelope-open text-success" style="font-size: 2rem;"></i>
            </div>
            <h3 class="fw-bold text-dark mb-3">Check Your Email</h3>
            <p class="text-muted mb-4">
                We've sent a verification link to <strong>${email}</strong><br>
                Please check your inbox and click the link to verify your account.
            </p>
        </div>
        
        <div class="alert alert-info mb-4">
            <i class="fas fa-info-circle me-2"></i>
            <strong>Important:</strong> You must verify your email before you can sign in to your account.
        </div>
        
        <div class="d-grid gap-2">
            <button type="button" class="btn btn-outline-dark btn-lg fw-bold" onclick="resendVerificationEmail('${email}')">
                <i class="fas fa-paper-plane me-2"></i>Resend Verification Email
            </button>
            <button type="button" class="btn btn-link text-muted" onclick="goToLogin()">
                <i class="fas fa-arrow-left me-2"></i>Back to Sign In
            </button>
        </div>
        
        <div class="mt-4">
            <p class="text-muted small">
                Didn't receive the email? Check your spam folder or 
                <a href="#" onclick="resendVerificationEmail('${email}')" class="text-decoration-none fw-semibold">try again</a>.
            </p>
        </div>
    `;
    
    // Replace the form with verification message
    signupContainer.innerHTML = '';
    signupContainer.appendChild(verificationContainer);
}

function handleSignupError(error) {
    let errorMessage = 'An error occurred during signup. Please try again.';
    
    switch (error.code) {
        case 'auth/email-already-in-use':
            errorMessage = 'This email address is already registered. Please use a different email or try signing in.';
            showError('email', errorMessage);
            break;
        case 'auth/invalid-email':
            errorMessage = 'Please enter a valid email address.';
            showError('email', errorMessage);
            break;
        case 'auth/weak-password':
            errorMessage = 'Password is too weak. Please choose a stronger password.';
            showError('password', errorMessage);
            break;
        case 'auth/network-request-failed':
            errorMessage = 'Network error. Please check your connection and try again.';
            showGeneralError(errorMessage);
            break;
        case 'auth/too-many-requests':
            errorMessage = 'Too many requests. Please try again later.';
            showGeneralError(errorMessage);
            break;
        default:
            showGeneralError(errorMessage);
    }
}

function showGeneralError(message) {
    // Create a temporary error message at the top of the form
    const form = document.getElementById('signupForm');
    const errorDiv = document.createElement('div');
    errorDiv.className = 'alert alert-danger mb-3';
    errorDiv.innerHTML = `<i class="fas fa-exclamation-circle me-2"></i>${message}`;
    
    form.insertBefore(errorDiv, form.firstChild);
    
    // Remove the error message after 5 seconds
    setTimeout(() => {
        if (errorDiv.parentNode) {
            errorDiv.parentNode.removeChild(errorDiv);
        }
    }, 5000);
}

// Global functions for the verification page
window.resendVerificationEmail = async function(email) {
    try {
        // Find the current user and resend verification email
        const user = auth.currentUser;
        if (user && user.email === email) {
            await sendEmailVerification(user);
            
            // Show success message
            const successDiv = document.createElement('div');
            successDiv.className = 'alert alert-success mb-3';
            successDiv.innerHTML = '<i class="fas fa-check-circle me-2"></i>Verification email sent successfully!';
            
            const container = document.querySelector('.text-center');
            container.insertBefore(successDiv, container.firstChild);
            
            setTimeout(() => {
                if (successDiv.parentNode) {
                    successDiv.parentNode.removeChild(successDiv);
                }
            }, 3000);
        }
    } catch (error) {
        console.error('Error resending verification email:', error);
        alert('Failed to resend verification email. Please try again.');
    }
};

window.goToLogin = function() {
    window.location.href = 'login.html';
};