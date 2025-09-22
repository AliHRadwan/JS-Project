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

// Cart Section - Function-based approach
const elements = {
    cartCount: document.getElementById('cartCount'),
    cartTotal: document.getElementById('cartTotal'),
    cartList: document.getElementById('cartList'),
    cartActions: document.getElementById('cartActions')
};

function initCart() {
    // Cart section doesn't need event listeners for now
    // Data is loaded when the section becomes active
}

async function loadCart() {
    try {
        const user = auth.currentUser;
        if (!user) return;
        
        const userDoc = await getDoc(doc(db, "users", user.uid));
        if (userDoc.exists()) {
            const cart = userDoc.data().cart || [];
            displayCartItems(cart);
            updateCartSummary(cart);
        }
    } catch (error) {
        console.error('Error loading cart:', error);
    }
}

function displayCartItems(cart) {
    if (!elements.cartList) return;

    if (cart.length === 0) {
        elements.cartList.innerHTML = `
            <div class="card mb-3 shadow-sm">
                <div class="card-body">
                    <div class="row align-items-center">
                        <div class="col-md-2 text-center">
                            <i class="fas fa-shopping-cart fa-3x text-muted"></i>
                        </div>
                        <div class="col-md-6">
                            <h6 class="fw-bold mb-1 text-muted">Your cart is empty</h6>
                            <p class="text-muted mb-1 small">Add items to your cart to see them here</p>
                            <p class="text-muted mb-0 small">Start shopping to build your cart</p>
                        </div>
                        <div class="col-md-4 text-end">
                            <div class="fw-bold text-dark mb-2">$0.00 each</div>
                            <div class="fw-bold text-primary">Total: $0.00</div>
                        </div>
                    </div>
                </div>
            </div>
        `;
        updateCartSummary([]);
        displayCartActions([]);
        return;
    }
    
    elements.cartList.innerHTML = cart.map((item, index) => `
        <div class="card mb-3 shadow-sm">
            <div class="card-body">
                <div class="row align-items-center">
                    <div class="col-md-2">
                        <img src="${(item.image && item.image[0]) || 'https://via.placeholder.com/80x80?text=No+Image'}" 
                        alt="${item.title}" class="img-fluid rounded" style="width: 80px; height: 80px; object-fit: cover;">
                    </div>
                    <div class="col-md-6">
                        <h6 class="fw-bold mb-1">${item.title}</h6>
                        <p class="text-muted mb-1 small">Color: ${item.color || 'N/A'}</p>
                        <p class="text-muted mb-1 small">Quantity: ${item.quantity}</p>
                        <p class="text-muted mb-0 small">Added: ${item.added_at ? new Date(item.added_at.seconds * 1000).toLocaleDateString() : 'Unknown'}</p>
                    </div>
                    <div class="col-md-4 text-end">
                        <div class="fw-bold text-dark mb-2">$${item.unit_price ? item.unit_price.toFixed(2) : '0.00'} each</div>
                        <div class="fw-bold text-primary">Total: $${((item.unit_price || 0) * item.quantity).toFixed(2)}</div>
                    </div>
                </div>
            </div>
        </div>
    `).join('');
    
    displayCartActions(cart);
}

function updateCartSummary(cart) {
    const totalItems = cart.reduce((sum, item) => sum + (item.quantity || 0), 0);
    const totalPrice = cart.reduce((sum, item) => sum + ((item.unit_price || 0) * (item.quantity || 0)), 0);
    
    if (elements.cartCount) {
        elements.cartCount.textContent = `${totalItems} item${totalItems !== 1 ? 's' : ''}`;
    }
    if (elements.cartTotal) {
        elements.cartTotal.textContent = `$${totalPrice.toFixed(2)}`;
    }
}

function displayCartActions(cart) {
    if (!elements.cartActions) return;

    const isEmpty = cart.length === 0;
    
    if (isEmpty) {
        elements.cartActions.innerHTML = `
            <div class="d-flex justify-content-between align-items-center">
                <div>
                    <button class="btn btn-outline-secondary" onclick="window.location.href='index.html'">
                        <i class="fas fa-shopping-bag me-1"></i>Start Shopping
                    </button>
                </div>
                <div>
                    <button class="btn btn-dark" onclick="window.location.href='index.html'">
                        <i class="fas fa-arrow-right me-1"></i>Browse Products
                    </button>
                </div>
            </div>
        `;
    } else {
        elements.cartActions.innerHTML = `
            <div class="d-flex justify-content-between align-items-center">
                <div>
                    <button class="btn btn-outline-danger me-2" onclick="clearCart()">
                        <i class="fas fa-trash me-1"></i>Clear Cart
                    </button>
                    <button class="btn btn-outline-secondary" onclick="window.location.href='index.html'">
                        <i class="fas fa-shopping-bag me-1"></i>Continue Shopping
                    </button>
                </div>
                <div>
                    <button class="btn btn-primary" onclick="window.location.href='Cartpage.html'">
                        <i class="fas fa-shopping-cart me-1"></i>Manage Cart
                    </button>
                </div>
            </div>
        `;
    }
    elements.cartActions.style.display = 'flex';
}

async function clearCart() {
    try {
        const user = auth.currentUser;
        if (!user) return;
        
        if (confirm('Are you sure you want to clear your cart?')) {
            await updateDoc(doc(db, "users", user.uid), { cart: [] });
            loadCart();
        }
    } catch (error) {
        console.error('Error clearing cart:', error);
    }
}

// Export functions
export { initCart, loadCart, clearCart };