import { auth, db } from './firebase.js';
import { onAuthStateChanged } from "https://www.gstatic.com/firebasejs/9.23.0/firebase-auth.js";
import { getDoc, doc } from "https://www.gstatic.com/firebasejs/9.23.0/firebase-firestore.js";

const PAGE_TYPES = {
    ADMIN: 'admin',
    USER: 'user',
    PUBLIC: 'public'
};

const CURRENT_PAGE = getCurrentPageType();

function getCurrentPageType() {
    const currentPath = window.location.pathname;
    const fileName = currentPath.split('/').pop().toLowerCase();
    
    if (fileName === 'dashboard.html' || fileName === 'crud.html') {
        return PAGE_TYPES.ADMIN;
    }
    
    if (fileName === 'profile.html' || fileName === 'orders.html' || 
        fileName === 'cartpage.html' || fileName === 'payment.html') {
        return PAGE_TYPES.USER;
    }
    
    return PAGE_TYPES.PUBLIC;
}

async function checkAdminRole(userId) {
    try {
        const userDoc = await getDoc(doc(db, 'users', userId));
        if (userDoc.exists()) {
            const userData = userDoc.data();
            return userData.role === 'admin';
        }
        return false;
    } catch (error) {
        console.error('Error checking admin role:', error);
        return false;
    }
}

async function checkUserRole(userId) {
    try {
        const userDoc = await getDoc(doc(db, 'users', userId));
        if (userDoc.exists()) {
            const userData = userDoc.data();
            return userData.role === 'user' || userData.role === undefined || userData.role === null;
        }
        return false;
    } catch (error) {
        console.error('Error checking user role:', error);
        return false;
    }
}

function showAccessDeniedMessage(message = 'Access Denied', details = 'You don\'t have permission to access this page.') {
    const messageDiv = document.createElement('div');
    messageDiv.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background: #dc3545;
        color: white;
        padding: 15px 20px;
        border-radius: 8px;
        box-shadow: 0 4px 12px rgba(0,0,0,0.15);
        z-index: 1000;
        font-family: Arial, sans-serif;
        font-size: 14px;
        max-width: 300px;
    `;
    messageDiv.innerHTML = `
        <strong>${message}</strong><br>
        ${details}
        <button onclick="this.parentElement.remove()" style="
            background: none;
            border: none;
            color: white;
            float: right;
            font-size: 18px;
            cursor: pointer;
            margin-left: 10px;
        ">&times;</button>
    `;
    document.body.appendChild(messageDiv);
    
    setTimeout(() => {
        if (messageDiv.parentElement) {
            messageDiv.remove();
        }
    }, 5000);
}

function redirectUser(user, isAdmin) {
    if (CURRENT_PAGE === PAGE_TYPES.ADMIN) {
        if (!isAdmin) {
            showAccessDeniedMessage(
                'Admin Access Required',
                'You need admin privileges to access this page.'
            );
            window.location.href = 'index.html?error=admin_access_denied';
            return;
        }
    } else if (CURRENT_PAGE === PAGE_TYPES.USER) {
        if (isAdmin) {
            showAccessDeniedMessage(
                'User Page Access Denied',
                'Admin users cannot access user pages. Please use the admin dashboard.'
            );
            window.location.href = 'dashboard.html?error=user_page_denied';
            return;
        }
    }
}

async function handleAuthStateChange(user) {
    if (!user) {
        if (CURRENT_PAGE === PAGE_TYPES.ADMIN || CURRENT_PAGE === PAGE_TYPES.USER) {
            console.log('No user logged in - redirecting to login');
            window.location.href = 'login.html';
        }
        return;
    }

    const isAdmin = await checkAdminRole(user.uid);
    redirectUser(user, isAdmin);
}

export function initAccessControl() {
    console.log(`Initializing access control for ${CURRENT_PAGE} page`);
    
    onAuthStateChanged(auth, handleAuthStateChange);
    
    const urlParams = new URLSearchParams(window.location.search);
    const error = urlParams.get('error');
    
    if (error === 'admin_access_denied') {
        showAccessDeniedMessage(
            'Admin Access Required',
            'You need admin privileges to access the admin dashboard.'
        );

        window.history.replaceState({}, document.title, window.location.pathname);
    } else if (error === 'user_page_denied') {
        showAccessDeniedMessage(
            'User Page Access Denied',
            'Admin users cannot access user pages. Please use the admin dashboard.'
        );

        window.history.replaceState({}, document.title, window.location.pathname);
    }
}

export async function canAccessAdmin() {
    const user = auth.currentUser;
    if (!user) return false;
    return await checkAdminRole(user.uid);
}

export async function canAccessUser() {
    const user = auth.currentUser;
    if (!user) return false;
    return await checkUserRole(user.uid);
}


export async function getCurrentUserRole() {
    const user = auth.currentUser;
    if (!user) return null;
    
    try {
        const userDoc = await getDoc(doc(db, 'users', user.uid));
        if (userDoc.exists()) {
            const userData = userDoc.data();
            return userData.role || 'user';
        }
        return 'user';
    } catch (error) {
        console.error('Error getting user role:', error);
        return 'user';
    }
}

if (CURRENT_PAGE === PAGE_TYPES.ADMIN || CURRENT_PAGE === PAGE_TYPES.USER) {
    initAccessControl();
}
