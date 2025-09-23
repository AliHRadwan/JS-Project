    import { initializeApp } from "https://www.gstatic.com/firebasejs/9.23.0/firebase-app.js";
    import { getAuth } from "https://www.gstatic.com/firebasejs/9.23.0/firebase-auth.js";
    import { getFirestore } from "https://www.gstatic.com/firebasejs/9.23.0/firebase-firestore.js";
    import { signInWithEmailAndPassword, sendPasswordResetEmail } from "https://www.gstatic.com/firebasejs/9.23.0/firebase-auth.js";
    import { doc, getDoc } from "https://www.gstatic.com/firebasejs/9.23.0/firebase-firestore.js";

    const firebaseConfig = {
    apiKey: "AIzaSyDBBHmLTSuwJhTcr5ZEBb7_mLKqZSfANC4",
    authDomain: "brand-website-ce759.firebaseapp.com",
    projectId: "brand-website-ce759",
    appId: "1:234496063014:web:6e42b87acd29324f5718e7",
    };

    const app = initializeApp(firebaseConfig);
    const auth = getAuth(app);
    const db = getFirestore(app);


    const loginForm = document.getElementById('loginForm');
    const formFields = ['email', 'password'];
    const rememberCheckbox = document.getElementById('remember');
    const clearSavedDataBtn = document.getElementById('clearSavedData');


    function showError(fieldId, message) {
        const field = document.getElementById(fieldId);
        const formGroup = field.closest('.mb-3');
        
        const oldError = formGroup.querySelector('.invalid-feedback');
        if (oldError) {
            oldError.remove();
        }
        
        field.classList.add('is-invalid');
        
        const errorDiv = document.createElement('div');
        errorDiv.className = 'invalid-feedback';
        errorDiv.textContent = message;
        formGroup.appendChild(errorDiv);
    }

    function clearFieldError(fieldId) {
        const field = document.getElementById(fieldId);
        const formGroup = field.closest('.mb-3');
        
        const errorDiv = formGroup.querySelector('.invalid-feedback');
        if (errorDiv) {
            errorDiv.remove();
        }
        
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
        
        clearFieldError(fieldId);
        
        if (!value) {
            showError(fieldId, `${fieldId.charAt(0).toUpperCase() + fieldId.slice(1)} is required!`);
            return false;
        }
        
        if (fieldId === 'email' && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) {
            showError(fieldId, 'Please enter a valid email address!');
            return false;
        }
        
        return true;
    }


    function saveCredentials(email, password) {
        if (rememberCheckbox.checked) {
            localStorage.setItem('rememberedEmail', email);
            localStorage.setItem('rememberedPassword', password);
            localStorage.setItem('rememberMe', 'true');
        } else {
            localStorage.removeItem('rememberedEmail');
            localStorage.removeItem('rememberedPassword');
            localStorage.removeItem('rememberMe');
        }
    }

    function loadCredentials() {
        const rememberedEmail = localStorage.getItem('rememberedEmail');
        const rememberedPassword = localStorage.getItem('rememberedPassword');
        const rememberMe = localStorage.getItem('rememberMe');
        
        if (rememberedEmail && rememberedPassword && rememberMe === 'true') {
            document.getElementById('email').value = rememberedEmail;
            document.getElementById('password').value = rememberedPassword;
            rememberCheckbox.checked = true;
            
            showCredentialsLoadedIndicator();
        }
    }

    function showCredentialsLoadedIndicator() {
        const indicator = document.createElement('div');
        indicator.className = 'alert alert-info alert-sm mt-2';
        indicator.innerHTML = '<i class="fas fa-info-circle me-1"></i>Saved credentials loaded';
        indicator.style.fontSize = '0.875rem';
        indicator.style.padding = '0.5rem';
        
        const rememberMeDiv = rememberCheckbox.closest('.d-flex');
        rememberMeDiv.parentNode.insertBefore(indicator, rememberMeDiv.nextSibling);
        
        setTimeout(() => {
            if (indicator.parentNode) {
                indicator.parentNode.removeChild(indicator);
            }
        }, 3000);
    }


    async function handleLogin(email, password) {
        try {
            const userCredential = await signInWithEmailAndPassword(auth, email, password);
            const user = userCredential.user;
            
            if (!user.emailVerified) {
                await auth.signOut();
                showEmailVerificationAlert(email);
                return;
            }
            
            saveCredentials(email, password);
            
            await checkUserRoleAndRedirect(user);
            
        } catch (error) {
            console.error('Error:', error);
            handleLoginError(error);
        }
    }

    async function checkUserRoleAndRedirect(user) {
        try {
            const userDoc = await getDoc(doc(db, 'users', user.uid));
            
            if (userDoc.exists()) {
                const userData = userDoc.data();
                const userRole = userData.role;
                
                if (userRole === 'admin') {
                    window.location.href = 'dashboard.html';
                } else {
                    window.location.href = 'index.html';
                }
            } else {
                window.location.href = 'index.html';
            }
        } catch (error) {
            console.error('Error checking user role:', error);
            window.location.href = 'index.html';
        }
    }


    document.addEventListener('DOMContentLoaded', () => {
        loadCredentials();
    });

    formFields.forEach(fieldId => {
        const field = document.getElementById(fieldId);
        field.addEventListener('blur', () => {
            validateField(fieldId);
        });
    });

    rememberCheckbox.addEventListener('change', () => {
        if (!rememberCheckbox.checked) {
            localStorage.removeItem('rememberedEmail');
            localStorage.removeItem('rememberedPassword');
            localStorage.removeItem('rememberMe');
        }
    });

    clearSavedDataBtn.addEventListener('click', () => {
        if (confirm('Are you sure you want to clear all saved login data?')) {
            localStorage.removeItem('rememberedEmail');
            localStorage.removeItem('rememberedPassword');
            localStorage.removeItem('rememberMe');
            
            document.getElementById('email').value = '';
            document.getElementById('password').value = '';
            rememberCheckbox.checked = false;
            
            showClearDataConfirmation();
        }
    });

    function showClearDataConfirmation() {
        const indicator = document.createElement('div');
        indicator.className = 'alert alert-success alert-sm mt-2';
        indicator.innerHTML = '<i class="fas fa-check-circle me-1"></i>Saved data cleared successfully';
        indicator.style.fontSize = '0.875rem';
        indicator.style.padding = '0.5rem';
        
        const rememberMeDiv = rememberCheckbox.closest('.d-flex');
        rememberMeDiv.parentNode.insertBefore(indicator, rememberMeDiv.nextSibling);
        
        setTimeout(() => {
            if (indicator.parentNode) {
                indicator.parentNode.removeChild(indicator);
            }
        }, 3000);
    }

    loginForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        
        const email = document.getElementById('email').value.trim();
        const password = document.getElementById('password').value;
        
        clearAllErrors();
        
        let hasErrors = false;
        
        if (!email) {
            showError('email', 'Email is required!');
            hasErrors = true;
        }
        
        if (!password) {
            showError('password', 'Password is required!');
            hasErrors = true;
        }
        
        if (hasErrors) {
            return;
        }
        
        if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
            showError('email', 'Please enter a valid email address!');
            hasErrors = true;
        }
        
        if (hasErrors) {
            return;
        }
        
        await handleLogin(email, password);
    });


    
    const forgotPasswordForm = document.getElementById('forgotPasswordForm');
    const resetEmailField = document.getElementById('resetEmail');
    const resetPasswordBtn = document.getElementById('resetPasswordBtn');
    const resetSuccessMessage = document.getElementById('resetSuccessMessage');
    const resetErrorMessage = document.getElementById('resetErrorMessage');

    function showResetError(message) {
        resetErrorMessage.querySelector('.message').textContent = message;
        resetErrorMessage.classList.remove('d-none');
        resetSuccessMessage.classList.add('d-none');
    }

    function showResetSuccess(message) {
        resetSuccessMessage.querySelector('.message').textContent = message;
        resetSuccessMessage.classList.remove('d-none');
        resetErrorMessage.classList.add('d-none');
    }

    function hideResetMessages() {
        resetSuccessMessage.classList.add('d-none');
        resetErrorMessage.classList.add('d-none');
    }

    function setResetButtonLoading(loading) {
        const btnText = resetPasswordBtn.querySelector('.btn-text');
        const spinner = resetPasswordBtn.querySelector('.spinner-border');
        
        if (loading) {
            btnText.textContent = 'Sending...';
            spinner.classList.remove('d-none');
            resetPasswordBtn.disabled = true;
        } else {
            btnText.textContent = 'Send Reset Link';
            spinner.classList.add('d-none');
            resetPasswordBtn.disabled = false;
        }
    }

    function validateResetEmail(email) {
        if (!email) {
            showResetError('Email is required!');
            return false;
        }
        
        if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
            showResetError('Please enter a valid email address!');
            return false;
        }
        
        return true;
    }

    async function handlePasswordReset(email) {
        try {
            setResetButtonLoading(true);
            hideResetMessages();
            
            await sendPasswordResetEmail(auth, email);
            showResetSuccess('Password reset email sent! Please check your inbox and follow the instructions to reset your password.');
            
            resetEmailField.value = '';
            
        } catch (error) {
            console.error('Password reset error:', error);
            
            let errorMessage = 'An error occurred while sending the reset email. Please try again.';
            
            switch (error.code) {
                case 'auth/user-not-found':
                    errorMessage = 'No account found with this email address.';
                    break;
                case 'auth/invalid-email':
                    errorMessage = 'Please enter a valid email address.';
                    break;
                case 'auth/too-many-requests':
                    errorMessage = 'Too many requests. Please try again later.';
                    break;
                case 'auth/network-request-failed':
                    errorMessage = 'Network error. Please check your connection and try again.';
                    break;
            }
            
            showResetError(errorMessage);
        } finally {
            setResetButtonLoading(false);
        }
    }

    forgotPasswordForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        
        const email = resetEmailField.value.trim();
        
        if (!validateResetEmail(email)) {
            return;
        }
        
        await handlePasswordReset(email);
    });

    document.getElementById('forgotPasswordModal').addEventListener('hidden.bs.modal', () => {
        hideResetMessages();
        resetEmailField.value = '';
        resetEmailField.classList.remove('is-invalid');
    });


    
    function showEmailVerificationAlert(email) {
        const alertDiv = document.createElement('div');
        alertDiv.className = 'alert alert-warning alert-dismissible fade show';
        alertDiv.innerHTML = `
            <div class="d-flex align-items-center">
                <i class="fas fa-exclamation-triangle me-3" style="font-size: 1.5rem;"></i>
                <div class="flex-grow-1">
                    <h6 class="alert-heading mb-1">Email Verification Required</h6>
                    <p class="mb-2">Please verify your email address before signing in. Check your inbox for a verification link.</p>
                    <small class="text-muted">Email: ${email}</small>
                </div>
            </div>
            <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
        `;
        
        const loginForm = document.getElementById('loginForm');
        loginForm.insertBefore(alertDiv, loginForm.firstChild);
        
        setTimeout(() => {
            if (alertDiv.parentNode) {
                alertDiv.parentNode.removeChild(alertDiv);
            }
        }, 10000);
    }

    function handleLoginError(error) {
        let errorMessage = 'Invalid email or password. Please try again.';
        
        switch (error.code) {
            case 'auth/user-not-found':
                errorMessage = 'No account found with this email address.';
                showError('email', errorMessage);
                break;
            case 'auth/wrong-password':
                errorMessage = 'Incorrect password. Please try again.';
                showError('password', errorMessage);
                break;
            case 'auth/invalid-email':
                errorMessage = 'Please enter a valid email address.';
                showError('email', errorMessage);
                break;
            case 'auth/user-disabled':
                errorMessage = 'This account has been disabled. Please contact support.';
                showGeneralError(errorMessage);
                break;
            case 'auth/too-many-requests':
                errorMessage = 'Too many failed attempts. Please try again later.';
                showGeneralError(errorMessage);
                break;
            case 'auth/network-request-failed':
                errorMessage = 'Network error. Please check your connection and try again.';
                showGeneralError(errorMessage);
                break;
            default:
                showGeneralError(errorMessage);
        }
    }
//login wrong password message
    function showGeneralError(message) {
        const form = document.getElementById('loginForm');
        const errorDiv = document.createElement('div');
        errorDiv.className = 'alert alert-danger mb-3';
        errorDiv.innerHTML = `<i class="fas fa-exclamation-circle me-2"></i>${message}`;
        
        form.insertBefore(errorDiv, form.firstChild);
        
        setTimeout(() => {
            if (errorDiv.parentNode) {
                errorDiv.parentNode.removeChild(errorDiv);
            }
        }, 5000);
    }