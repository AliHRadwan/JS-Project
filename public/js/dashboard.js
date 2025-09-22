// Admin Dashboard Configuration
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.23.0/firebase-app.js";
import { getAuth } from "https://www.gstatic.com/firebasejs/9.23.0/firebase-auth.js";
import { getFirestore } from "https://www.gstatic.com/firebasejs/9.23.0/firebase-firestore.js";
import { onSnapshot, collection, getDocs, query, where, updateDoc, doc, getDoc, orderBy } from "https://www.gstatic.com/firebasejs/9.23.0/firebase-firestore.js";
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
const db = getFirestore(app);

// Admin authentication and role checking
onAuthStateChanged(auth, async (user) => {
  if (user) {
    // Check if user is admin
    const isAdmin = await checkAdminRole(user.uid);
    if (isAdmin) {
      await setUserAvatar(user.email);
      console.log("Admin user logged in:", user.email);
    } else {
      // User is not admin - redirect to home page
      console.log("Access denied: User is not an admin");
      window.location.href = 'index.html?error=access_denied';
    }
  } else {
    // No user logged in - redirect to login page
    console.log("No user logged in - redirecting to login");
    window.location.href = 'login.html';
  }
});

// Check if user has admin role
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

//function to set avatar and user name 
async function setUserAvatar(userEmail) {
  //get user from firebase 
  const usersRef = collection(db, "users");
  const q = query(usersRef, where("email", "==", userEmail));
  const querySnapshot = await getDocs(q);
  
  if (!querySnapshot.empty) {
    const userData = querySnapshot.docs[0].data();
    const firstName = userData.first_name || "U";
    const lastName = userData.last_name || "";
    const firstLetter = firstName.charAt(0).toUpperCase();

    document.getElementById("userAvatar").textContent = firstLetter;
    const fullName = `${firstName} ${lastName}`;
    document.getElementById("userName").textContent = fullName;
    document.getElementById("name").textContent = fullName;
  } else {
    console.log("User not found in Firestore");
  }
}
//================================================================================
//dashboard 
function listenToStats() {
  const colRef = collection(db, "products");

  onSnapshot(colRef, (snapshot) => {
    let reads = {};
    let writes = {};

    snapshot.forEach(doc => {
      const data = doc.data();
      if (data.created_at) {
        let date = new Date(data.created_at.seconds * 1000)
                     .toDateString()
                     .slice(4, 10);

        if (!reads[date]) {
          reads[date] = 0;
          writes[date] = 0;
        }
        reads[date] += 1;
        writes[date] += 1;
      }
    });

    // sorted array by date 
    let dates = Object.keys(reads).sort((a,b) => new Date(a) - new Date(b));
    let readsArr = dates.map(d => reads[d]);
    let writesArr = dates.map(d => writes[d]);

    updateChart(dates, readsArr, writesArr);
  });
}

//chart.js to paint 
function updateChart(dates, reads, writes) {
  const ctx = document.getElementById("statsChart").getContext("2d");

  new Chart(ctx, {
    type: "line",
    data: {
      labels: dates,
      datasets: [
        {
          label: "Reads",
          data: reads,
          borderColor: "blue",
          borderWidth: 2,
          fill: false,
        },
        {
          label: "Writes",
          data: writes,
          borderColor: "green",
          borderWidth: 2,
          fill: false,
        }
      ]
    },
    options: {
      responsive: true,
      plugins: {
        legend: { position: "top" },
        title: { display: true, text: "Firestore Usage (Live) products" }
      }
    }
  });
}

document.getElementById("dashboardBtn").addEventListener("click", () => {
  const mainDiv = document.getElementById("main");
  mainDiv.innerHTML = `<canvas id="statsChart"></canvas>`;
  listenToStats();
});
//================================================================================
//orders
// -------- Orders --------
let allOrders = [];

document.getElementById("ordersBtn").addEventListener("click", async () => {
  const mainDiv = document.getElementById("main");
  mainDiv.innerHTML = "<p>Loading orders...</p>";

  try {
    const snapshot = await getDocs(collection(db, "orders"));
    if (snapshot.empty) {
      mainDiv.innerHTML = "<p>No orders found.</p>";
      return;
    }

    allOrders = [];

    // Process all orders and fetch user data
    for (const docSnap of snapshot.docs) {
      const data = docSnap.data();
      const userId = data.user_id;
      let userEmail = "N/A";
      let userName = "N/A";

      if (userId) {
        const userDoc = await getDoc(doc(db, "users", userId));
        if (userDoc.exists()) {
          const userData = userDoc.data();
          userEmail = userData.email || "N/A";
          userName = `${userData.first_name || ""} ${userData.last_name || ""}`.trim() || "N/A";
        }
      }

      allOrders.push({
        id: docSnap.id,
        ...data,
        user_email: userEmail,
        user_name: userName
      });
    }

    // Sort orders by created_at (newest first)
    allOrders.sort((a, b) => {
      const dateA = a.createdAt?.seconds || 0;
      const dateB = b.createdAt?.seconds || 0;
      return dateB - dateA;
    });

    // Build table + search input
    mainDiv.innerHTML = `
       <div class="search-box">
         <input id="search" type="text" placeholder="Search orders...">
         <span class="search-icon">🔍</span>
       </div>
      <table id="ordersTable" class="table table-striped">
        <thead>
          <tr>
            <th>Order ID</th>
            <th>User Email</th>
            <th>User Name</th>
            <th>Status</th>
            <th>Total</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          ${renderOrders(allOrders)}
        </tbody>
      </table>
    `;

    addCancelListeners();
    addDetailsListener();

    // Close modal event listeners
    document.querySelector(".close-btn")?.addEventListener("click", () => {
      document.getElementById("orderModal").style.display = "none";
    });
    window.addEventListener("click", (e) => { 
      if (e.target.id === "orderModal") {
        document.getElementById("orderModal").style.display = "none"; 
      }
    });

    // Search functionality
    const searchInput = document.getElementById("search");
    searchInput.addEventListener("keyup", () => {
      const filter = searchInput.value.toLowerCase().trim();
      const rows = document.querySelectorAll("#ordersTable tbody tr");
      rows.forEach(row => {
        const text = row.innerText.toLowerCase();
        row.style.display = text.includes(filter) ? "" : "none";
      });
    });

  } catch (error) {
    console.error("Error loading orders:", error);
    mainDiv.innerHTML = "<p>Error loading orders.</p>";
  }
});

// -------- Helper Functions --------

// Render orders table rows
function renderOrders(orders) {
  return orders.map(data => `
    <tr id="row-${data.id}">
      <td>${data.id}</td>
      <td>${data.user_email}</td>
      <td>${data.user_name}</td>
      <td class="status">${data.status || "pending"}</td>
      <td>${data.total_amount || 0}</td>
      <td>
        <button class="order-btn cancel-btn btn btn-danger btn-sm" data-id="${data.id}">Cancel</button>
        <button class="order-btn details-btn btn btn-info btn-sm" data-id="${data.id}">Details</button>
      </td>
    </tr>
  `).join("");
}

// Cancel button listeners
function addCancelListeners() {
  document.querySelectorAll(".cancel-btn").forEach(btn => {
    btn.addEventListener("click", async (e) => {
      const orderId = e.target.dataset.id;
      const order = allOrders.find(o => o.id === orderId);
      if (!order) return;

      const confirming = confirm(`Are you sure you want to cancel order ${orderId}?`);
      if (!confirming) return;

      await updateDoc(doc(db, "orders", orderId), { status: "canceled" });

      document.querySelector(`#row-${orderId} .status`).textContent = "canceled";
      alert(`Order ${orderId} has been canceled ✅`);
    });
  });
}

// Details popup
function addDetailsListener() {
  document.getElementById("ordersTable").addEventListener("click", (e) => {
    if (!e.target.classList.contains("details-btn")) return;

    const orderId = e.target.dataset.id;
    const orderData = allOrders.find(o => o.id === orderId);
    if (!orderData) return;

    document.getElementById("orderDetails").innerHTML = `
      <div class="section">
        <h3>Order Info</h3>
        <p><b>ID:</b> ${orderId}</p>
        <p><b>Date:</b> ${orderData.createdAt?.toDate?.()?.toLocaleString() || "N/A"}</p>
        <p><b>Status:</b> ${orderData.status || "pending"}</p>
      </div>

      <div class="section">
        <h3>User Info</h3>
        <p><b>Name:</b> ${orderData.user_name}</p>
        <p><b>Email:</b> ${orderData.user_email}</p>
      </div>

      <div class="section">
        <h3>Items</h3>
        <table class="items-table table table-bordered">
          <thead>
            <tr>
              <th>Image</th><th>Title</th><th>Color</th><th>Size</th><th>Qty</th><th>Price</th>
            </tr>
          </thead>
          <tbody>
          ${orderData.items?.map(item => `
            <tr>
              <td><img src="${item.images?.[0] || 'placeholder.png'}" width="50"/></td>
              <td>${item.title}</td>
              <td>${item.color}</td>
              <td>${item.size}</td>
              <td>${item.quantity}</td>
              <td>${item.unit_price}</td>
            </tr>
          `).join("") || "<tr><td colspan='6'>No items</td></tr>"}
          </tbody>
        </table>
      </div>
    `;

    document.getElementById("orderModal").style.display = "block";
  });
}

//================================================================================
//Products
document.getElementById("productsDropdown").addEventListener("click", () => {
  // Navigate to CRUD page for product management
  window.location.href = 'crud.html';
});

//================================================================================
// Logout functionality
document.getElementById("logoutBtn").addEventListener("click", async (e) => {
  e.preventDefault();
  await logout();
});

