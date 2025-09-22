
    import { initializeApp } from "https://www.gstatic.com/firebasejs/9.23.0/firebase-app.js";
    import { getAuth } from "https://www.gstatic.com/firebasejs/9.23.0/firebase-auth.js";
    import { onAuthStateChanged } from "https://www.gstatic.com/firebasejs/9.23.0/firebase-auth.js";

    const firebaseConfig = {
    apiKey: "AIzaSyDBBHmLTSuwJhTcr5ZEBb7_mLKqZSfANC4",
    authDomain: "brand-website-ce759.firebaseapp.com",
    projectId: "brand-website-ce759",
    appId: "1:234496063014:web:6e42b87acd29324f5718e7",
    };

    const app = initializeApp(firebaseConfig);
    const auth = getAuth(app);

    import { initPersonalInfo, loadUserProfile as loadPersonalInfo } from './sections/PersonalInfo.js';
    import { initAddresses, loadAddresses, editAddress, deleteAddress } from './sections/Addresses.js';
    import { initOrders, loadOrders } from './sections/Orders.js';
    import { initWishlist, loadWishlist, addToCart, removeFromWishlist, viewProduct } from './sections/Wishlist.js';
    import { initCart, loadCart, clearCart } from './sections/Cart.js';
    import { initNavigation, updateUserInfo } from './sections/Navigation.js';


    let currentUser = null;


    function initProfilePage() {
        initNavigation();
        initPersonalInfo();
        initAddresses();
        initOrders();
        initWishlist();
        initCart();
        
        bindEvents();
    }

    function bindEvents() {
        document.addEventListener('sectionChanged', (event) => {
            handleSectionChange(event.detail.sectionId);
        });
    }

    async function handleSectionChange(sectionId) {
        switch (sectionId) {
            case 'personalInfoSection':
                if (currentUser) {
                    await loadPersonalInfo(currentUser);
                }
                break;
            case 'addressesSection':
                await loadAddresses();
                break;
            case 'ordersSection':
                await loadOrders();
                break;
            case 'wishlistSection':
                await loadWishlist();
                break;
            case 'cartSection':
                await loadCart();
                break;
        }
    }

    async function loadUserProfile(user) {
        currentUser = user;
        
        updateUserInfo(user);
        
        await loadPersonalInfo(user);
    }


    window.editAddress = editAddress;
    window.deleteAddress = deleteAddress;
    window.clearCart = clearCart;
    window.addToCart = addToCart;
    window.removeFromWishlist = removeFromWishlist;
    window.viewProduct = viewProduct;


    import { loadNavbar } from './navbar.js';


    initProfilePage();

    loadNavbar();

    onAuthStateChanged(auth, (user) => {
        if (user) {
            loadUserProfile(user);
        } else {
            window.location.href = "login.html";
        }
    });