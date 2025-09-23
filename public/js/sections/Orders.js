import { initializeApp } from "https://www.gstatic.com/firebasejs/9.23.0/firebase-app.js";
import { getAuth } from "https://www.gstatic.com/firebasejs/9.23.0/firebase-auth.js";
import { getFirestore } from "https://www.gstatic.com/firebasejs/9.23.0/firebase-firestore.js";
import { collection, query, where, getDocs } from "https://www.gstatic.com/firebasejs/9.23.0/firebase-firestore.js";

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

// Orders Section - Function-based approach
const elements = {
    totalOrders: document.getElementById('profileTotalOrders'),
    placedOrders: document.getElementById('profilePlacedOrders'),
    completedOrders: document.getElementById('profileCompletedOrders'),
    cancelledOrders: document.getElementById('profileCancelledOrders'),
    recentOrdersList: document.getElementById('recentOrdersList')
};

function initOrders() {
    // Orders section doesn't need event listeners for now
    // Data is loaded when the section becomes active
}

async function loadOrders() {
    try {
        const user = auth.currentUser;
        if (!user) {
            return;
        }
        
        // Query for user-specific orders
        const querySnapshot = await getDocs(query(collection(db, 'orders'), where('user_id', '==', user.uid)));
        
        const orders = querySnapshot.docs.map(doc => {
            const data = doc.data();
            return {
                id: doc.id,
                ...data,
                status: data.status === 'paid' ? 'paid' : (data.status === 'pending' ? 'placed' : (data.status || 'placed')),
                createdAt: data.createdAt?.toDate() || data.created_at?.toDate() || new Date(),
                totalAmount: parseFloat(data.total_amount) || data.order_summary?.total || 0
            };
        });

        updateOrdersSummary(orders);
        displayRecentOrders(orders.slice(0, 5));
        
    } catch (error) {
        console.error('Error loading orders:', error);
    }
}

function updateOrdersSummary(orders) {
    const counts = {
        total: orders.length,
        placed: 0,
        completed: 0,
        cancelled: 0
    };

    // Count orders by status with new logic
    orders.forEach(order => {
        if (order.status === 'paid') {
            // If status is paid, increment both placed and completed
            counts.placed++;
            counts.completed++;
        } else if (order.status === 'cancelled') {
            // If status is cancelled, increment cancelled
            counts.cancelled++;
        } else if (order.status === 'placed') {
            // Regular placed orders
            counts.placed++;
        } else if (order.status === 'completed') {
            // Regular completed orders
            counts.completed++;
        }
    });

    // Update the display elements
    if (elements.totalOrders) elements.totalOrders.textContent = counts.total;
    if (elements.placedOrders) elements.placedOrders.textContent = counts.placed;
    if (elements.completedOrders) elements.completedOrders.textContent = counts.completed;
    if (elements.cancelledOrders) elements.cancelledOrders.textContent = counts.cancelled;
}

function displayRecentOrders(orders) {
    if (!elements.recentOrdersList) return;

    if (orders.length === 0) {
        elements.recentOrdersList.innerHTML = `
            <div class="text-center py-4">
                <i class="fas fa-shopping-bag fa-2x text-muted mb-3"></i>
                <h6 class="text-muted">No orders yet</h6>
                <p class="text-muted">Your recent orders will appear here</p>
            </div>
        `;
        return;
    }

    elements.recentOrdersList.innerHTML = orders.map(order => `
        <div class="d-flex justify-content-between align-items-center border-bottom py-3">
            <div class="d-flex align-items-center">
                <div class="me-3">
                    <span class="badge bg-${getStatusColor(order.status)}">${order.status}</span>
                </div>
                <div>
                    <h6 class="mb-1">Order #${order.id}</h6>
                    <small class="text-muted">${formatDate(order.createdAt)}</small>
                </div>
            </div>
            <div class="text-end">
                <div class="fw-bold">$${order.totalAmount?.toFixed(2) || order.order_summary?.total?.toFixed(2) || '0.00'}</div>
                <small class="text-muted">${order.items?.length || 0} item(s)</small>
            </div>
        </div>
    `).join('');
}

function getStatusColor(status) {
    const colors = { 
        'placed': 'warning',
        'paid': 'success', 
        'completed': 'info', 
        'cancelled': 'danger'
    };
    return colors[status] || 'secondary';
}

function formatDate(date) {
    return new Intl.DateTimeFormat('en-US', {
        year: 'numeric', 
        month: 'short', 
        day: 'numeric', 
        hour: '2-digit', 
        minute: '2-digit'
    }).format(date);
}

// Export functions
export { initOrders, loadOrders };