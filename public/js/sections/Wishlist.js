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

// Wishlist Section - Function-based approach
const elements = {
    wishlistCount: document.getElementById('wishlistCount'),
    wishlistList: document.getElementById('wishlistList')
};

function initWishlist() {
    // Wishlist section doesn't need event listeners for now
    // Data is loaded when the section becomes active
}

async function loadWishlist() {
    try {
        const user = auth.currentUser;
        if (!user) return;
        
        const userDoc = await getDoc(doc(db, "users", user.uid));
        if (userDoc.exists()) {
            const wishlist = userDoc.data().wishlist || [];
            displayWishlistItems(wishlist);
            updateWishlistCount(wishlist.length);
        } else {
            displayEmptyWishlist();
            updateWishlistCount(0);
        }
    } catch (error) {
        console.error('Error loading wishlist:', error);
        displayEmptyWishlist();
        updateWishlistCount(0);
    }
}

function displayWishlistItems(wishlist) {
    if (!elements.wishlistList) return;

    if (wishlist.length === 0) {
        displayEmptyWishlist();
        return;
    }

    elements.wishlistList.innerHTML = wishlist.map((item, index) => `
        <div class="card mb-4 wishlist-item-card shadow-sm">
            <div class="card-body p-4">
                <div class="row align-items-center">
                    <div class="col-md-3">
                        <div class="wishlist-image-container">
                            <img src="${(item.image && item.image[0]) || 'https://via.placeholder.com/120x120?text=No+Image'}" 
                                 alt="${item.title}" class="wishlist-item-image">
                            <div class="wishlist-image-overlay">
                                <button class="btn btn-primary btn-sm" onclick="viewProduct('${item.id || index}')">
                                    <i class="fas fa-eye me-1"></i>Quick View
                                </button>
                            </div>
                        </div>
                    </div>
                    <div class="col-md-5">
                        <div class="wishlist-item-details">
                            <h5 class="wishlist-item-title mb-2">${item.title}</h5>
                            <div class="wishlist-item-attributes mb-2">
                                <span class="badge bg-light text-dark me-2">
                                    <i class="fas fa-palette me-1"></i>${item.color || 'N/A'}
                                </span>
                                <span class="badge bg-light text-dark me-2">
                                    <i class="fas fa-ruler me-1"></i>${item.size || 'N/A'}
                                </span>
                            </div>
                            <p class="wishlist-item-date text-muted small mb-0">
                                <i class="fas fa-calendar-plus me-1"></i>
                                Added: ${item.added_at ? new Date(item.added_at.seconds * 1000).toLocaleDateString() : 'Unknown'}
                            </p>
                        </div>
                    </div>
                    <div class="col-md-2 text-center">
                        <div class="wishlist-item-price">
                            <span class="price-currency">$</span>
                            <span class="price-amount">${item.price ? item.price.toFixed(2) : '0.00'}</span>
                        </div>
                    </div>
                    <div class="col-md-2">
                        <div class="wishlist-item-actions">
                            <button class="btn btn-outline-primary btn-sm mb-2 w-100" onclick="viewProduct('${item.id || index}')">
                                <i class="fas fa-eye me-1"></i>View Product
                            </button>
                            <button class="btn btn-outline-danger btn-sm w-100" onclick="removeFromWishlist(${index})">
                                <i class="fas fa-heart-broken me-1"></i>Remove
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    `).join('');
}

function displayEmptyWishlist() {
    if (!elements.wishlistList) return;

    elements.wishlistList.innerHTML = `
        <div class="text-center py-5">
            <i class="fas fa-heart fa-3x text-muted mb-3"></i>
            <h5 class="text-muted">Your wishlist is empty</h5>
            <p class="text-muted">Add items to your wishlist to see them here</p>
        </div>
    `;
}

function updateWishlistCount(count) {
    if (elements.wishlistCount) {
        elements.wishlistCount.textContent = `${count} item${count !== 1 ? 's' : ''}`;
    }
}

async function addToCart(index) {
    try {
        const user = auth.currentUser;
        if (!user) return;

        const userDoc = await getDoc(doc(db, "users", user.uid));
        if (userDoc.exists()) {
            const userData = userDoc.data();
            const wishlist = userData.wishlist || [];
            const cart = userData.cart || [];

            if (index >= 0 && index < wishlist.length) {
                const item = wishlist[index];
                
                // Check if item already exists in cart
                const existingItemIndex = cart.findIndex(cartItem => 
                    cartItem.id === item.id && 
                    cartItem.color === item.color && 
                    cartItem.size === item.size
                );

                if (existingItemIndex >= 0) {
                    // Update quantity
                    cart[existingItemIndex].quantity += 1;
                } else {
                    // Add new item to cart
                    cart.push({
                        ...item,
                        quantity: 1,
                        added_at: new Date()
                    });
                }

                // Update cart in database
                await updateDoc(doc(db, "users", user.uid), { cart: cart });
                
                // Remove from wishlist
                wishlist.splice(index, 1);
                await updateDoc(doc(db, "users", user.uid), { wishlist: wishlist });
                
                // Refresh wishlist display
                loadWishlist();
                
                alert('Item added to cart and removed from wishlist!');
            }
        }
    } catch (error) {
        console.error('Error adding to cart:', error);
        alert('Error adding item to cart. Please try again.');
    }
}

async function removeFromWishlist(index) {
    if (confirm('Are you sure you want to remove this item from your wishlist?')) {
        try {
            const user = auth.currentUser;
            if (!user) return;

            const userDoc = await getDoc(doc(db, "users", user.uid));
            if (userDoc.exists()) {
                const wishlist = userDoc.data().wishlist || [];
                
                if (index >= 0 && index < wishlist.length) {
                    wishlist.splice(index, 1);
                    await updateDoc(doc(db, "users", user.uid), { wishlist: wishlist });
                    loadWishlist();
                }
            }
        } catch (error) {
            console.error('Error removing from wishlist:', error);
            alert('Error removing item from wishlist. Please try again.');
        }
    }
}

function viewProduct(productId) {
    // Navigate to product details page with product ID as parameter
    window.location.href = `ProductDetails.html?id=${productId}`;
}

// Export functions
export { initWishlist, loadWishlist, addToCart, removeFromWishlist, viewProduct };