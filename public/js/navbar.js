// Unified Navbar Component - Authentication State Management
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.23.0/firebase-app.js";
import { getAuth } from "https://www.gstatic.com/firebasejs/9.23.0/firebase-auth.js";
import { onAuthStateChanged } from "https://www.gstatic.com/firebasejs/9.23.0/firebase-auth.js";
import { logout } from './logout.js';

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

// Navbar elements
const elements = {
    loginBtn: document.getElementById('loginBtn'),
    userInfo: document.getElementById('userInfo'),
    userName: document.getElementById('userName'),
    profileBtn: document.getElementById('profileBtn'),
    adminBtn: document.getElementById('adminBtn'),
    logoutBtn: document.getElementById('logoutBtn'),
    mobileLoginBtn: document.getElementById('mobileLoginBtn'),
    mobileUserInfo: document.getElementById('mobileUserInfo'),
    mobileUserName: document.getElementById('mobileUserName'),
    mobileProfileBtn: document.getElementById('mobileProfileBtn'),
    mobileAdminBtn: document.getElementById('mobileAdminBtn')
};

// Initialize navbar
function initNavbar() {
    // Handle logout button click
    if (elements.logoutBtn) {
        elements.logoutBtn.addEventListener('click', async (e) => {
            e.preventDefault();
            await logout();
        });
    }
    
    // Listen for authentication state changes
    onAuthStateChanged(auth, async (user) => {
        await updateNavbarForUser(user);
    });
}

// Update displayName for existing users who don't have it set
async function updateUserDisplayName(user) {
    if (!user.displayName) {
        try {
            const { doc, getDoc } = await import("https://www.gstatic.com/firebasejs/9.23.0/firebase-firestore.js");
            const { updateProfile } = await import("https://www.gstatic.com/firebasejs/9.23.0/firebase-auth.js");
            const { getFirestore } = await import("https://www.gstatic.com/firebasejs/9.23.0/firebase-firestore.js");
            const db = getFirestore(app);
            
            const userDoc = await getDoc(doc(db, 'users', user.uid));
            if (userDoc.exists()) {
                const userData = userDoc.data();
                const fullName = userData.first_name && userData.last_name 
                    ? `${userData.first_name} ${userData.last_name}`
                    : userData.first_name || userData.last_name;
                
                if (fullName) {
                    await updateProfile(user, { displayName: fullName });
                    return fullName;
                }
            }
        } catch (error) {
            console.log('Could not update user displayName:', error);
        }
    }
    return user.displayName;
}

// Update navbar based on authentication state
async function updateNavbarForUser(user) {
    if (user) {
        // User is logged in
        if (elements.loginBtn) elements.loginBtn.style.display = 'none';
        if (elements.userInfo) elements.userInfo.style.display = 'flex';
        if (elements.logoutBtn) elements.logoutBtn.style.display = 'inline-block';
        if (elements.mobileLoginBtn) elements.mobileLoginBtn.style.display = 'none';
        if (elements.mobileUserInfo) elements.mobileUserInfo.style.display = 'block';
        
        // Check if user is admin and show/hide admin links
        const isAdmin = await checkUserRole(user.uid);
        if (elements.adminBtn) elements.adminBtn.style.display = isAdmin ? 'inline-block' : 'none';
        if (elements.mobileAdminBtn) elements.mobileAdminBtn.style.display = isAdmin ? 'inline-block' : 'none';
        
        // Update user name - prioritize displayName, then try to get full name from profile
        
        let displayName = await updateUserDisplayName(user);
        
        // Final fallback
        if (!displayName) {
            displayName = 'User';
        }
        
        if (elements.userName) elements.userName.textContent = `Welcome, ${displayName}`;
        if (elements.mobileUserName) elements.mobileUserName.textContent = `Welcome, ${displayName}`;
    } else {
        // User is not logged in
        if (elements.loginBtn) elements.loginBtn.style.display = 'inline-block';
        if (elements.userInfo) elements.userInfo.style.display = 'none';
        if (elements.logoutBtn) elements.logoutBtn.style.display = 'none';
        if (elements.mobileLoginBtn) elements.mobileLoginBtn.style.display = 'block';
        if (elements.mobileUserInfo) elements.mobileUserInfo.style.display = 'none';
        if (elements.adminBtn) elements.adminBtn.style.display = 'none';
        if (elements.mobileAdminBtn) elements.mobileAdminBtn.style.display = 'none';
    }
}

// Check if user has admin role
async function checkUserRole(userId) {
    try {
        const { doc, getDoc } = await import("https://www.gstatic.com/firebasejs/9.23.0/firebase-firestore.js");
        const { getFirestore } = await import("https://www.gstatic.com/firebasejs/9.23.0/firebase-firestore.js");
        const db = getFirestore(app);
        
        const userDoc = await getDoc(doc(db, 'users', userId));
        if (userDoc.exists()) {
            const userData = userDoc.data();
            return userData.role === 'admin';
        }
        return false;
    } catch (error) {
        console.error('Error checking user role:', error);
        return false;
    }
}

// Load navbar into page
async function loadNavbar() {
    try {
        const response = await fetch('navbar.html');
        const navbarHTML = await response.text();
        const navbarContainer = document.getElementById('navbar-container');
        if (navbarContainer) {
            navbarContainer.innerHTML = navbarHTML;
            
            // Re-initialize elements after loading
            setTimeout(() => {
                // Update elements reference after DOM update
                Object.assign(elements, {
                    loginBtn: document.getElementById('loginBtn'),
                    userInfo: document.getElementById('userInfo'),
                    userName: document.getElementById('userName'),
                    profileBtn: document.getElementById('profileBtn'),
                    adminBtn: document.getElementById('adminBtn'),
                    logoutBtn: document.getElementById('logoutBtn'),
                    mobileLoginBtn: document.getElementById('mobileLoginBtn'),
                    mobileUserInfo: document.getElementById('mobileUserInfo'),
                    mobileUserName: document.getElementById('mobileUserName'),
                    mobileProfileBtn: document.getElementById('mobileProfileBtn'),
                    mobileAdminBtn: document.getElementById('mobileAdminBtn')
                });
                
                initNavbar();
            }, 100);
        }
    } catch (error) {
        console.error('Error loading navbar:', error);
    }
}

// Export functions
export { initNavbar, updateNavbarForUser, loadNavbar };
