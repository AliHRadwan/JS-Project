        // Orders Page JavaScript
        import { initializeApp } from "https://www.gstatic.com/firebasejs/9.23.0/firebase-app.js";
        import { getAuth } from "https://www.gstatic.com/firebasejs/9.23.0/firebase-auth.js";
        import { getFirestore } from "https://www.gstatic.com/firebasejs/9.23.0/firebase-firestore.js";
        import { onAuthStateChanged } from "https://www.gstatic.com/firebasejs/9.23.0/firebase-auth.js";
        import { collection, query, where, getDocs, updateDoc, doc, serverTimestamp, getDoc } from "https://www.gstatic.com/firebasejs/9.23.0/firebase-firestore.js";
        import { loadNavbar } from './navbar.js';

        const firebaseConfig = {
        apiKey: "AIzaSyDBBHmLTSuwJhTcr5ZEBb7_mLKqZSfANC4",
        authDomain: "brand-website-ce759.firebaseapp.com",
        projectId: "brand-website-ce759",
        appId: "1:234496063014:web:6e42b87acd29324f5718e7",
        };

        const app = initializeApp(firebaseConfig);
        const auth = getAuth(app);
        const db = getFirestore(app);


        let allOrders = [];
        let filteredOrders = [];
        let currentOrderId = null;

        const elements = {
            ordersList: document.getElementById('ordersList'),
            loadingSpinner: document.getElementById('loadingSpinner'),
            authLoading: document.getElementById('authLoading'),
            emptyState: document.getElementById('emptyState'),
            searchInput: document.getElementById('searchOrders'),
            statusFilter: document.getElementById('statusFilter'),
            dateFilter: document.getElementById('dateFilter'),
            orderDetailsModal: document.getElementById('orderDetailsModal'),
            cancelOrderModal: document.getElementById('cancelOrderModal'),
            totalOrdersSpan: document.getElementById('totalOrders'),
            placedOrdersSpan: document.getElementById('placedOrders'),
            completedOrdersSpan: document.getElementById('completedOrders'),
            shippedOrdersSpan: document.getElementById('shippedOrders'),
            deliveredOrdersSpan: document.getElementById('deliveredOrders'),
            cancelledOrdersSpan: document.getElementById('cancelledOrders')
        };



        async function initOrdersPage(user) {
            try {
                
                await new Promise(resolve => setTimeout(resolve, 100));
                
                if (!elements.ordersList) {
                    console.error('Required DOM elements not found');
                    showError('Page elements not loaded properly. Please refresh the page.');
                    return;
                }
                
                
                await loadOrders();
                
                await addTrackingNumbersToOrders(user.uid);
            } catch (error) {
                console.error('Error initializing orders page:', error);
                showError('Failed to initialize orders page. Please try again.');
            }
        }

        function setupEventListeners() {
            if (elements.searchInput) {
                elements.searchInput.addEventListener('input', filterOrders);
            }
            if (elements.statusFilter) {
                elements.statusFilter.addEventListener('change', filterOrders);
            }
            if (elements.dateFilter) {
                elements.dateFilter.addEventListener('change', filterOrders);
            }
            
            document.addEventListener('click', (e) => {
                if (e.target.classList.contains('modal')) {
                    closeModal(e.target.id);
                }
            });
            
            document.addEventListener('keydown', (e) => {
                if (e.key === 'Escape') {
                    const openModal = document.querySelector('.modal.show');
                    if (openModal) {
                        closeModal(openModal.id);
                    }
                }
            });
        }


        document.addEventListener('DOMContentLoaded', () => {
            setupEventListeners();
            loadNavbar();
        });

        onAuthStateChanged(auth, async (user) => {
            if (user) {
                if (elements.authLoading) elements.authLoading.style.display = 'none';
                await initOrdersPage(user);
            } else {
                if (elements.authLoading) elements.authLoading.style.display = 'none';
                window.location.href = "login.html";
            }
        });


        async function loadOrders() {
            try {
                showLoading(true);
                
                if (!auth || !db) {
                    console.error('Firebase not properly initialized. Auth:', !!auth, 'DB:', !!db);
                    throw new Error('Firebase not properly initialized');
                }
                
                const user = auth.currentUser;
                if (!user) {
                    showError('Authentication error. Please refresh the page.');
                    return;
                }

                
                let getDocs, collection, query, where;
                try {
                    const firestoreModule = await import("https://www.gstatic.com/firebasejs/9.23.0/firebase-firestore.js");
                    getDocs = firestoreModule.getDocs;
                    collection = firestoreModule.collection;
                    query = firestoreModule.query;
                    where = firestoreModule.where;
                } catch (importError) {
                    console.error('Failed to import Firebase functions:', importError);
                    throw new Error('Failed to load Firebase functions');
                }
                
                const querySnapshot = await getDocs(query(collection(db, 'orders'), where('user_id', '==', user.uid)));
                
                let userAddress = null;
                try {
                    const userDoc = await getDoc(doc(db, "users", user.uid));
                    if (userDoc.exists()) {
                        const userData = userDoc.data();
                        if (userData.address && userData.address.length > 0) {
                            userAddress = userData.address[0]; 
                        }
                    }
                } catch (error) {
                }

                allOrders = querySnapshot.docs.map(doc => {
                    const data = doc.data();
                    return {
                        id: doc.id,
                        ...data,
                        orderid: doc.id, 
                        totalAmount: parseFloat(data.total_amount) || data.order_summary?.total || 0,
                        createdAt: data.createdAt?.toDate() || data.created_at?.toDate() || new Date(),
                        updatedAt: data.updated_at?.toDate() || new Date(),
                        status: data.status === 'paid' ? 'paid' : (data.status === 'pending' ? 'placed' : (data.status || 'placed')),
                        items: data.items || [],
                        shipping_address: data.shipping_address || userAddress,
                        billing_address: data.billing_address || userAddress,
                        payment_method: data.payment_method || 'Credit Card',
                        payment_status: data.status === 'paid' ? 'Paid' : (data.payment_status || 'Unknown'),
                        trackingNumber: data.tracking_number || data.trackingNumber || data.tracking || data.tracking_id || null,
                        notes: data.notes || null
                    };
                });


                if (allOrders.length === 0) {
                    showEmptyState(true);
                    return;
                }

                filteredOrders = [...allOrders];
                displayOrders();
                updateSummaryCounts();
                
            } catch (error) {
                console.error('Error loading orders:', error);
                const errorMessage = error.code === 'permission-denied' ? 'Permission denied. Please check your authentication.' :
                                error.code === 'unavailable' ? 'Service temporarily unavailable. Please try again later.' :
                                error.message === 'Firebase not properly initialized' ? 'Firebase connection failed. Please refresh the page.' :
                                'Failed to load orders. Please try again.';
                showError(errorMessage);
                showEmptyState(true);
            } finally {
                showLoading(false);
            }
        }

        function displayOrders() {
            if (!elements.ordersList) return;

            if (filteredOrders.length === 0) {
                elements.ordersList.innerHTML = `
                    <div class="empty-state">
                        <i class="fas fa-search"></i>
                        <h4>No orders found</h4>
                        <p>Try adjusting your search or filter criteria.</p>
                    </div>
                `;
                return;
            }

            elements.ordersList.innerHTML = filteredOrders.map(order => `
                <div class="order-card ${order.status}" onclick="showOrderDetails('${order.id}')">
                    <div class="order-card-content">
                        <div class="order-info">
                            <h6>Order #${order.id}</h6>
                            <small>${formatDate(order.createdAt)}</small>
                        </div>
                        <div class="order-status">
                            <span class="status-badge status-${order.status}">${order.status}</span>
                            <div>$${order.totalAmount.toFixed(2)}</div>
                            <small>${order.items ? order.items.length : 0} item(s)</small>
                        </div>
                        <div class="order-actions">
                            ${order.status === 'placed' ? `
                                <button class="btn btn-danger" onclick="event.stopPropagation(); showCancelOrderModal('${order.id}')">
                                    <i class="fas fa-times"></i> Cancel
                                </button>
                            ` : ''}
                            ${order.status === 'paid' ? `
                                <span class="text-success">
                                    <i class="fas fa-credit-card"></i> Paid
                                </span>
                            ` : ''}
                            ${order.status === 'completed' ? `
                                <span class="text-info">
                                    <i class="fas fa-check"></i> Completed
                                </span>
                            ` : ''}
                            ${order.status === 'shipped' ? `
                                <span class="text-info">
                                    <i class="fas fa-truck"></i> Shipped
                                </span>
                            ` : ''}
                            ${order.status === 'delivered' ? `
                                <span class="text-success">
                                    <i class="fas fa-check-circle"></i> Delivered
                                </span>
                            ` : ''}
                            ${order.status === 'cancelled' ? `
                                <span class="text-danger">
                                    <i class="fas fa-ban"></i> Cancelled
                                </span>
                            ` : ''}
                        </div>
                    </div>
                </div>
            `).join('');
        }


        function showOrderDetails(orderId) {
            const order = allOrders.find(o => o.id === orderId);
            if (!order) return;

            currentOrderId = orderId;

            document.getElementById('orderDetailsOrderId').textContent = `Order #${order.id}`;
            document.getElementById('orderDetailsDate').textContent = formatDate(order.createdAt);
            document.getElementById('orderDetailsTotal').textContent = `$${order.totalAmount.toFixed(2)}`;
            document.getElementById('orderDetailsPayment').textContent = order.payment_method || 'Not specified';
            document.getElementById('orderDetailsPaymentStatus').textContent = order.payment_status || 'Unknown';
            document.getElementById('orderDetailsAddress').innerHTML = formatAddress(order.shipping_address);
            
            const statusElement = document.getElementById('orderDetailsStatus');
            if (statusElement) {
                statusElement.innerHTML = `<span class="status-badge status-${order.status}">${order.status}</span>`;
            }
            
            const statusBadge = document.getElementById('orderStatusBadge');
            if (statusBadge) {
                statusBadge.textContent = order.status.charAt(0).toUpperCase() + order.status.slice(1);
                statusBadge.className = `status-badge status-${order.status}`;
            }

            const itemsContainer = document.getElementById('orderItems');
            if (itemsContainer) {
                itemsContainer.innerHTML = order.items.map(item => `
                    <div class="order-item">
                        <img src="${(item.images && item.images[0]) || 'https://via.placeholder.com/60x60?text=Product'}" 
                            alt="${item.title}" class="order-item-image">
                        <div class="order-item-details">
                            <h6>${item.title}</h6>
                            <p>Size: ${item.size || 'N/A'} | Qty: ${item.quantity || 1}</p>
                            <p>$${(item.unit_price || 0).toFixed(2)} each</p>
                        </div>
                        <div class="order-item-price">
                            $${(item.line_total || (item.unit_price || 0) * (item.quantity || 1)).toFixed(2)}
                        </div>
                    </div>
                `).join('');
            }

            const trackingInfo = document.getElementById('trackingInfo');
            if (trackingInfo) {
                const trackingNumber = order.tracking_number || order.trackingNumber || order.tracking || order.tracking_id;
                trackingInfo.innerHTML = trackingNumber ? `
                    <div class="alert alert-info">
                        <i class="fas fa-truck"></i>
                        <strong>Tracking Number:</strong> ${trackingNumber}
                    </div>
                ` : `
                    <div class="alert alert-secondary">
                        <i class="fas fa-info-circle"></i>
                        <strong>Tracking:</strong> No tracking number available yet
                    </div>
                `;
            }

            const notesSection = document.getElementById('orderNotes');
            if (notesSection) {
                notesSection.innerHTML = order.notes ? `
                    <div class="notes-section">
                        <h5>Notes</h5>
                        <div class="alert alert-warning">
                            <i class="fas fa-sticky-note"></i>
                            ${order.notes}
                        </div>
                    </div>
                ` : '';
            }

            showModal('orderDetailsModal');
        }


        function showCancelOrderModal(orderId) {
            currentOrderId = orderId;
            showModal('cancelOrderModal');
        }

        async function cancelOrder() {
            if (!currentOrderId) return;

            try {
                const orderToCancel = allOrders.find(o => o.id === currentOrderId);
                if (!orderToCancel) {
                    showError('Order not found. Please refresh and try again.');
                    return;
                }

                await updateDoc(doc(db, 'orders', currentOrderId), {
                    status: 'cancelled',
                    notes: 'Order cancelled by customer',
                    updated_at: serverTimestamp()
                });

                if (orderToCancel.items && orderToCancel.items.length > 0) {
                    await restoreStock(orderToCancel.items);
                }

                const orderIndex = allOrders.findIndex(o => o.id === currentOrderId);
                if (orderIndex !== -1) {
                    allOrders[orderIndex].status = 'cancelled';
                    allOrders[orderIndex].notes = 'Order cancelled by customer';
                    allOrders[orderIndex].updatedAt = new Date();
                }

                filterOrders();
                updateSummaryCounts();
                closeModal('cancelOrderModal');
                showSuccess('Order cancelled successfully and stock has been restored');
                
            } catch (error) {
                console.error('Error cancelling order:', error);
                showError('Failed to cancel order. Please try again.');
            }
        }


        function filterOrders() {
            const searchTerm = elements.searchInput?.value.toLowerCase() || '';
            const statusFilterValue = elements.statusFilter?.value || '';
            const dateFilterValue = elements.dateFilter?.value || '';

            filteredOrders = allOrders.filter(order => {
                const matchesSearch = !searchTerm || 
                    order.id.toString().toLowerCase().includes(searchTerm) ||
                    (order.items && order.items.some(item => item.title.toLowerCase().includes(searchTerm)));
                const matchesStatus = !statusFilterValue || order.status === statusFilterValue;
                const matchesDate = !dateFilterValue || order.createdAt >= new Date(Date.now() - parseInt(dateFilterValue) * 24 * 60 * 60 * 1000);
                return matchesSearch && matchesStatus && matchesDate;
            });

            displayOrders();
            updateSummaryCounts();
        }

        function updateSummaryCounts() {
            const counts = {
                total: filteredOrders.length,
                placed: filteredOrders.filter(order => order.status === 'placed').length,
                paid: filteredOrders.filter(order => order.status === 'paid').length,
                completed: filteredOrders.filter(order => order.status === 'completed').length,
                shipped: filteredOrders.filter(order => order.status === 'shipped').length,
                delivered: filteredOrders.filter(order => order.status === 'delivered').length,
                cancelled: filteredOrders.filter(order => order.status === 'cancelled').length
            };

            Object.entries(counts).forEach(([key, value]) => {
                const el = elements[`${key}OrdersSpan`];
                if (el) el.textContent = value;
            });
        }

        function clearFilters() {
            if (elements.searchInput) elements.searchInput.value = '';
            if (elements.statusFilter) elements.statusFilter.value = '';
            if (elements.dateFilter) elements.dateFilter.value = '';
            filterOrders();
        }

        function trackOrder() {
            const order = allOrders.find(o => o.id === currentOrderId);
            if (order && order.trackingNumber) {
                window.open(`https://www.ups.com/track?trackingNumber=${order.trackingNumber}`, '_blank');
            } else {
                showError('No tracking number available for this order.');
            }
        }


        function showModal(modalId) {
            const modal = document.getElementById(modalId);
            if (modal) {
                modal.classList.add('show');
                document.body.style.overflow = 'hidden';
            }
        }

        function closeModal(modalId) {
            const modal = document.getElementById(modalId);
            if (modal) {
                modal.classList.remove('show');
                document.body.style.overflow = '';
            }
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

        function getStatusColor(status) {
            const colors = { 
                'placed': 'warning', 
                'completed': 'info', 
                'shipped': 'primary', 
                'delivered': 'success',
                'cancelled': 'danger'
            };
            return colors[status] || 'secondary';
        }

        function formatAddress(address) {
            if (!address) {
                return `
                    <div class="alert alert-warning">
                        <i class="fas fa-exclamation-triangle"></i>
                        <strong>Address:</strong> No shipping address provided
                    </div>
                `;
            }
            
            if (typeof address === 'string') {
                return `<div class="address-display">${address}</div>`;
            } else if (typeof address === 'object') {
                if (address.text && address.label) {
                    return `
                        <div class="address-display">
                            <strong>${address.label}</strong><br>
                            ${address.text}
                        </div>
                    `;
                }
                else if (address.street || address.address) {
                    return `
                        <div class="address-display">
                            <strong>${address.name || address.fullName || 'N/A'}</strong><br>
                            ${address.street || address.address || ''}<br>
                            ${address.city || ''}, ${address.state || address.province || ''} ${address.zip || address.postalCode || ''}<br>
                            ${address.country || ''}
                        </div>
                    `;
                } 
                else if (Array.isArray(address) && address.length > 0) {
                    const firstAddress = address[0];
                    if (typeof firstAddress === 'object' && firstAddress.text && firstAddress.label) {
                        return `
                            <div class="address-display">
                                <strong>${firstAddress.label}</strong><br>
                                ${firstAddress.text}
                            </div>
                        `;
                    } else if (typeof firstAddress === 'string') {
                        return `<div class="address-display">${firstAddress}</div>`;
                    }
                }
                else {
                    return `<div class="address-display">${JSON.stringify(address)}</div>`;
                }
            }
            
            return `<div class="address-display">${address}</div>`;
        }

        function showLoading(show) {
            if (elements.loadingSpinner) {
                elements.loadingSpinner.style.display = show ? 'block' : 'none';
            }
            if (elements.ordersList) {
                elements.ordersList.style.display = show ? 'none' : 'block';
            }
            if (elements.emptyState) {
                elements.emptyState.style.display = 'none';
            }
        }

        function showEmptyState(show) {
            if (elements.emptyState) {
                elements.emptyState.style.display = show ? 'block' : 'none';
            }
            if (elements.ordersList) {
                elements.ordersList.style.display = show ? 'none' : 'block';
            }

        }

        function showSuccess(message) {
            showToast(message, 'success');
        }

        function showError(message) {
            showToast(message, 'error');
        }

        function showToast(message, type = 'info') {
            const container = document.getElementById('toast-container');
            if (!container) return;

            const toast = document.createElement('div');
            toast.className = `toast ${type}`;
            toast.innerHTML = `
                <span>${message}</span>
                <button class="toast-close" onclick="this.parentElement.remove()">×</button>
            `;

            container.appendChild(toast);

            setTimeout(() => {
                if (toast.parentNode) {
                    toast.remove();
                }
            }, 5000);
        }

        async function restoreStock(orderItems) {
            try {
                
                const { doc, getDoc, updateDoc, increment } = await import("https://www.gstatic.com/firebasejs/9.23.0/firebase-firestore.js");
                
                for (const item of orderItems) {
                    try {
                        const productRef = doc(db, 'products', item.productid);
                        const productDoc = await getDoc(productRef);
                        
                        if (productDoc.exists()) {
                            const productData = productDoc.data();
                            const currentStock = productData.stock || 0;
                            const restoredStock = currentStock + item.qty;
                            
                            await updateDoc(productRef, {
                                stock: restoredStock,
                                updatedAt: new Date()
                            });
                            
                        } else {
                            console.warn(`Product ${item.productid} not found in database`);
                        }
                    } catch (itemError) {
                        console.error(`Error restoring stock for product ${item.productid}:`, itemError);
                    }
                }
                
                showSuccess('Stock has been restored for cancelled order items');
            } catch (error) {
                console.error('Error restoring stock:', error);
                showError('Failed to restore stock. Please contact support.');
            }
        }

        async function addTrackingNumbersToOrders(userId) {
            try {
                console.log('Checking for orders without tracking numbers...');
                
                const userOrdersQuery = query(collection(db, 'orders'), where('user_id', '==', userId));
                const userOrdersSnapshot = await getDocs(userOrdersQuery);
                
                const ordersWithoutTracking = userOrdersSnapshot.docs.filter(doc => {
                    const data = doc.data();
                    return !data.tracking_number && !data.trackingNumber && !data.tracking && !data.tracking_id;
                });
                
                if (ordersWithoutTracking.length > 0) {
                    console.log(`Found ${ordersWithoutTracking.length} orders without tracking numbers`);
                    
                    for (const orderDoc of ordersWithoutTracking) {
                        const trackingNumber = 'TRK' + Math.random().toString(36).substring(2, 15).toUpperCase();
                        await updateDoc(doc(db, 'orders', orderDoc.id), {
                            tracking_number: trackingNumber,
                            updated_at: serverTimestamp()
                        });
                        console.log(`Added tracking number ${trackingNumber} to order ${orderDoc.id}`);
                    }
                    
                    await loadOrders();
                } else {
                    console.log('All orders already have tracking numbers');
                }
                
            } catch (error) {
                console.error('Error adding tracking numbers:', error);
            }
        }


        window.showOrderDetails = showOrderDetails;
        window.showCancelOrderModal = showCancelOrderModal;
        window.cancelOrder = cancelOrder;
        window.trackOrder = trackOrder;
        window.clearFilters = clearFilters;
        window.refreshOrders = loadOrders;
        window.closeModal = closeModal;
        