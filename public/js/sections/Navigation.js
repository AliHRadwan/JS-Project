import { logout } from '../logout.js';

// Navigation Section - Function-based approach
const elements = {
    avatar: document.getElementById('profileAvatar'),
    userName: document.getElementById('userName'),
    userEmail: document.getElementById('userEmail'),
    personalInfoNav: document.getElementById('personalInfoNav'),
    addressesNav: document.getElementById('addressesNav'),
    ordersNav: document.getElementById('ordersNav'),
    wishlistNav: document.getElementById('wishlistNav'),
    cartNav: document.getElementById('cartNav'),
    logoutNav: document.getElementById('logoutNav')
};

function initNavigation() {
    bindEvents();
}

function bindEvents() {
    elements.personalInfoNav?.addEventListener('click', (e) => {
        e.preventDefault();
        switchToSection('personalInfoSection', e.target);
    });
    
    elements.addressesNav?.addEventListener('click', (e) => {
        e.preventDefault();
        switchToSection('addressesSection', e.target);
    });
    
    elements.ordersNav?.addEventListener('click', (e) => {
        e.preventDefault();
        switchToSection('ordersSection', e.target);
    });
    
    elements.wishlistNav?.addEventListener('click', (e) => {
        e.preventDefault();
        switchToSection('wishlistSection', e.target);
    });
    
    elements.cartNav?.addEventListener('click', (e) => {
        e.preventDefault();
        switchToSection('cartSection', e.target);
    });
    
    elements.logoutNav?.addEventListener('click', (e) => {
        e.preventDefault();
        if (confirm("Are you sure you want to logout?")) {
            logout();
        }
    });
}

function switchToSection(sectionId, clickedElement) {
    // Hide all sections
    document.querySelectorAll('.content-section').forEach(section => section.classList.remove('active'));
    
    // Remove active class from all nav links
    document.querySelectorAll('.nav-link').forEach(link => link.classList.remove('active'));
    
    // Show selected section
    const targetSection = document.getElementById(sectionId);
    if (targetSection) targetSection.classList.add('active');
    
    // Add active class to clicked nav link
    if (clickedElement) clickedElement.classList.add('active');
    
    // Dispatch custom event for section change
    const sectionChangeEvent = new CustomEvent('sectionChanged', {
        detail: { sectionId: sectionId }
    });
    document.dispatchEvent(sectionChangeEvent);
}

function updateUserInfo(userData) {
    if (!userData) return;
    
    // Set avatar
    const firstLetter = userData.user_name ? userData.user_name.charAt(0).toUpperCase() : 'U';
    if (elements.avatar) elements.avatar.innerHTML = firstLetter;
    
    // Set header info
    if (elements.userName) {
        elements.userName.textContent = userData.user_name || 'Unknown User';
    }
    if (elements.userEmail) {
        elements.userEmail.textContent = userData.email || 'No email';
    }
}

// Export functions
export { initNavigation, updateUserInfo };