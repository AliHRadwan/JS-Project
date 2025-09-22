// app1.js — Home page

/* ---------------- Navbar Loading ---------------- */
import { loadNavbar } from './navbar.js';

/* ---------------- Firebase ---------------- */
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.23.0/firebase-app.js";
import { getAuth } from "https://www.gstatic.com/firebasejs/9.23.0/firebase-auth.js";
import { getFirestore } from "https://www.gstatic.com/firebasejs/9.23.0/firebase-firestore.js";
import { onAuthStateChanged } from "https://www.gstatic.com/firebasejs/9.23.0/firebase-auth.js";
import { collection, getDocs, doc, getDoc, updateDoc, serverTimestamp } from "https://www.gstatic.com/firebasejs/9.23.0/firebase-firestore.js";

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

/* ---------------- State ---------------- */
let allProducts = [];
let filteredProducts = [];
let currentPage = 1;
const productsPerPage = 8;

/* ---------------- Load products ---------------- */
async function loadProducts() {
  const productsContainer = document.querySelector(".products");
  productsContainer.innerHTML = "<p>Loading products...</p>";

  try {
    const querySnapshot = await getDocs(collection(db, "products"));
    productsContainer.innerHTML = "";

    if (querySnapshot.empty) {
      productsContainer.innerHTML = "<p>No products found.</p>";
      return;
    }

    // ✅ keep Firestore document IDs
    allProducts = querySnapshot.docs.map(d => ({ id: d.id, ...d.data() }));  // was: d.data()
    filteredProducts = [...allProducts];

    displayProducts(currentPage, filteredProducts);

    // filters & listeners
    loadFilters();
    setupEventListeners();

  } catch (err) {
    console.error("Error fetching products:", err);
    productsContainer.innerHTML = "<p>Error loading products.</p>";
  }
}

/* ---------------- Render grid ---------------- */
function displayProducts(page, productsArray) {
  const productsContainer = document.querySelector(".products");
  productsContainer.innerHTML = "";

  const start = (page - 1) * productsPerPage;
  const end   = start + productsPerPage;
  const productsToShow = productsArray.slice(start, end);

  if (!productsToShow.length) {
    productsContainer.innerHTML = "<p>No products found</p>";
    return;
  }

  productsToShow.forEach((product) => {
    const imgSrc = Array.isArray(product.images) && product.images[0]
      ? product.images[0]
      : "https://via.placeholder.com/200x150?text=No+Image";
    const title = product.title || "No Title";
    const price = product.price ?? "0.00";

    const card = document.createElement("div");
    card.className = "product-card";
    card.innerHTML = `
      <img src="${imgSrc}" alt="${title}">
      <h4>${title}</h4>
      <p>$${price}</p>
      <strong class="add-cart">+</strong>
    `;

    // ✅ navigate to ProductDetails with a real Firestore id
    card.addEventListener("click", () => {
      localStorage.setItem("selectedProductId", product.id); // optional bridge
      window.location.href = `ProductDetails.html?id=${encodeURIComponent(product.id)}`;
    });

    // ✅ open Add-to-Cart popup on the "+" button
    const addBtn = card.querySelector(".add-cart");
    if (addBtn) {
      addBtn.addEventListener("click", (e) => {
        e.stopPropagation();               // prevent card navigation
        openATCFromHome(product.id);       // fetch + show color/size/qty
      });
    }

    productsContainer.appendChild(card);
  });

  renderPagination(productsArray);
}

/* ---------------- Pagination ---------------- */
function renderPagination(productsArray) {
  const pagination = document.getElementById("pagination");
  pagination.innerHTML = "";

  const totalPages = Math.ceil(productsArray.length / productsPerPage);

  const prevBtn = document.createElement("button");
  prevBtn.textContent = "Prev";
  prevBtn.style.padding = "3px 8px";
  prevBtn.style.fontSize = "12px";
  prevBtn.style.backgroundColor = "black";
  prevBtn.style.color = "white";
  prevBtn.style.borderRadius = "15px";
  prevBtn.addEventListener("click", () => {
    currentPage = currentPage - 1 < 1 ? totalPages : currentPage - 1;
    displayProducts(currentPage, productsArray);
  });
  pagination.appendChild(prevBtn);

  const pageIndicator = document.createElement("span");
  pageIndicator.textContent = `${currentPage} / ${totalPages}`;
  pagination.appendChild(pageIndicator);

  const nextBtn = document.createElement("button");
  nextBtn.textContent = "Next";
  nextBtn.style.padding = "3px 8px";
  nextBtn.style.fontSize = "12px";
  nextBtn.style.backgroundColor = "black";
  nextBtn.style.color = "white";
  nextBtn.style.borderRadius = "15px";
  nextBtn.addEventListener("click", () => {
    currentPage = currentPage + 1 > totalPages ? 1 : currentPage + 1;
    displayProducts(currentPage, productsArray);
  });
  pagination.appendChild(nextBtn);
}

/* ---------------- Filters (kept minimal) ---------------- */
function loadFilters() {
  const categories = [...new Set(allProducts.map(p => p.category).filter(Boolean))];
  // support both snake_case and camelCase
  const sizes = [
    ...new Set(
      allProducts.flatMap(p =>
        (p.size_options || p.sizeOptions || []).filter(Boolean)
      )
    ),
  ];
  const ratings = [5, 4, 3, 2, 1];

  renderFilter("#filter-category", categories, "category");
  renderFilter("#filter-size", sizes, "size");
  renderFilter("#filter-ratings", ratings, "rating");
}

function renderFilter(selector, items, type) {
  const wrap = document.querySelector(selector);
  if (!wrap) return;
  wrap.innerHTML = "";

  items.forEach((value) => {
    const id = `${type}-${String(value).toLowerCase().replace(/\s+/g, "-")}`;
    const label = document.createElement("label");
    label.style.display = "inline-flex";
    label.style.alignItems = "center";
    label.style.gap = "6px";
    label.style.margin = "4px 8px 4px 0";

    const input = document.createElement("input");
    input.type = type === "rating" ? "radio" : "checkbox";
    input.name = type === "rating" ? "rating" : undefined;
    input.value = String(value).toLowerCase();
    input.id = id;

    const span = document.createElement("span");
    span.textContent = String(value);

    label.appendChild(input);
    label.appendChild(span);
    wrap.appendChild(label);
  });
}

function applyFilters() {
  const selectedCategories = Array.from(
    document.querySelectorAll('#filter-category input[type="checkbox"]:checked')
  ).map(i => i.value);

  const selectedSizes = Array.from(
    document.querySelectorAll('#filter-size input[type="checkbox"]:checked')
  ).map(i => i.value.toLowerCase());

  const ratingInput = document.getElementById("ratingRange");
  const minRating = (ratingInput && ratingInput.dataset.active === "true")
    ? Number(ratingInput.value) : null;

  filteredProducts = allProducts.filter(p => {
    const category = (p.category || "").toLowerCase();
    const sizes = (p.size_options || p.sizeOptions || []).map(s => String(s).toLowerCase());
    const rating = Math.floor(p.ratings || 0);

    const matchCategory = selectedCategories.length ? selectedCategories.includes(category) : true;
    const matchSize     = selectedSizes.length ? selectedSizes.some(s => sizes.includes(s)) : true;
    const matchRating   = minRating ? rating >= minRating : true;

    return matchCategory && matchSize && matchRating;
  });

  currentPage = 1;
  displayProducts(currentPage, filteredProducts);
}

function setupEventListeners() {
  document.querySelectorAll(".filters input").forEach(input => {
    input.addEventListener("change", applyFilters);
  });

  const searchInput = document.getElementById("search");
  if (searchInput) {
    searchInput.addEventListener("input", () => {
      const q = searchInput.value.trim().toLowerCase();
      filteredProducts = allProducts.filter(p =>
        p.title && p.title.toLowerCase().includes(q)
      );
      currentPage = 1;
      displayProducts(currentPage, filteredProducts);
    });
  }
}

/* ---------------- Kickoff ---------------- */
loadProducts();

/* ===========================================================
   Add-to-Cart popup (Home) — color, size, qty, localStorage
   =========================================================== */
const ATC_PLACEHOLDER_IMG =
  "data:image/svg+xml;utf8," +
  encodeURIComponent(`<svg xmlns="http://www.w3.org/2000/svg" width="400" height="400">
    <rect fill="#eef2f6" width="100%" height="100%"/>
    <text x="50%" y="50%" dominant-baseline="middle" text-anchor="middle"
      fill="#9aa3af" font-family="sans-serif" font-size="16">No image</text>
  </svg>`);

const COLOR_HEX = {
  black:"#111111", white:"#f5f5f5", gray:"#9ca3af", grey:"#9ca3af", red:"#ef4444",
  green:"#22c55e", blue:"#3b82f6", navy:"#1e3a8a", yellow:"#f59e0b", orange:"#f97316",
  purple:"#8b5cf6", pink:"#ec4899", brown:"#92400e", beige:"#e7d9c7", olive:"#6b8e23", rose:"#ff6b9b"
};

const money = (n)=> new Intl.NumberFormat(undefined,{ style:"currency", currency:"USD" }).format(n);
const clampQty = (v)=> !Number.isFinite(v)||v<1 ? 1 : (v>10 ? 10 : v);

// Normalize product to the fields the popup needs
function normalizeForATC(data){
  const images = Array.isArray(data.images) ? data.images : (data.image ? [data.image] : []);
  const colorNames = Array.isArray(data.colorOptions) ? data.colorOptions
                   : Array.isArray(data.color_options) ? data.color_options : [];
  const sizeOptions = Array.isArray(data.sizeOptions) ? data.sizeOptions
                   : Array.isArray(data.size_options) ? data.size_options : [];
  const discount = Number(data.discount || 0);
  const base     = Number(data.price || 0);
  const finalPrice = discount>0 ? +(base*(1-discount/100)).toFixed(2) : base;
  return {
    id: data.id,
    title: data.title || "Untitled",
    images,
    colors: colorNames.map(n => ({ name:n, hex: COLOR_HEX[n?.toLowerCase?.()] || "#e5e7eb" })),
    sizes: sizeOptions,
    finalPrice
  };
}

// Open the modal for a given product id
async function openATCFromHome(productId){
  const snap = await getDoc(doc(db, "products", productId));
  if (!snap.exists()) return;

  const p = normalizeForATC({ id: snap.id, ...snap.data() });
  const modal = document.getElementById("homeAddToCartModal");
  if (!modal) return;

  // Image/title/price
  const img = modal.querySelector("#atc-thumb");
  img.src = p.images[0] || "";
  img.alt = p.title || "Product image";
  img.referrerPolicy = "no-referrer";
  img.onerror = () => { img.src = ATC_PLACEHOLDER_IMG; };

  modal.querySelector("#atc-title").textContent = p.title || "Untitled";
  modal.querySelector("#atc-price").textContent = money(p.finalPrice);

  const qtyInput = modal.querySelector("#atc-quantity");
  qtyInput.value = 1;

  // Colors
  const colorWrap = modal.querySelector("#atc-color-list");
  colorWrap.innerHTML = "";
  let selectedColor = p.colors[0]?.name || "";
  if (p.colors.length){
    p.colors.forEach(c=>{
      const b = document.createElement("button");
      b.type="button";
      b.className = "swatch" + (c.name===selectedColor ? " selected" : "");
      b.title = c.name;
      b.dataset.color = c.name;
      b.style.setProperty("--swatch", c.hex);
      b.addEventListener("click", ()=>{
        selectedColor = c.name;
        colorWrap.querySelectorAll(".swatch").forEach(x=>x.classList.remove("selected"));
        b.classList.add("selected");
      });
      colorWrap.appendChild(b);
    });
  } else {
    colorWrap.innerHTML = `<span style="font-size:12px;color:#6b7280;">No color options</span>`;
    selectedColor = "";
  }

  // Sizes
  const sizeWrap = modal.querySelector("#atc-size-list");
  sizeWrap.innerHTML = "";
  let selectedSize = p.sizes[0] || "";
  if (p.sizes.length){
    p.sizes.forEach(s=>{
      const btn = document.createElement("button");
      btn.type="button";
      btn.className = "size" + (s===selectedSize ? " selected" : "");
      btn.textContent = s;
      btn.dataset.size = s;
      btn.addEventListener("click", ()=>{
        selectedSize = s;
        sizeWrap.querySelectorAll(".size").forEach(x=>x.classList.remove("selected"));
        btn.classList.add("selected");
      });
      sizeWrap.appendChild(btn);
    });
  } else {
    sizeWrap.innerHTML = `<span style="font-size:12px;color:#6b7280;">No size options</span>`;
    selectedSize = "";
  }

  // Qty +/- (delegated)
  const qtyClick = (e)=>{
    const btn = e.target.closest("[data-atc-qty]"); if (!btn) return;
    const delta = btn.dataset.atcQty === "plus" ? 1 : -1;
    qtyInput.value = clampQty((parseInt(qtyInput.value,10)||1) + delta);
  };
  modal.addEventListener("click", qtyClick, { once:false });

  // Add to cart (Firebase)
  const addBtn = modal.querySelector("#atc-add");
  const onAdd = async ()=>{
    const currentUser = auth.currentUser;
    if (!currentUser) {
      alert('Please log in to add items to cart');
      return;
    }

    const item = {
      id: p.id,
      title: p.title,
      price: p.finalPrice,
      image: p.images[0] || "",
      color: selectedColor,
      size:  selectedSize,
      quantity: clampQty(parseInt(qtyInput.value,10) || 1),
      addedAt: Date.now()
    };

    try {
      // Get current cart from Firebase
      const userDoc = await getDoc(doc(db, "users", currentUser.uid));
      const userData = userDoc.exists() ? userDoc.data() : {};
      const cart = userData.cart || [];
      
      // Check if item already exists
      const existingItemIndex = cart.findIndex(cartItem => 
        cartItem.product_id === item.id && 
        cartItem.color === item.color && 
        cartItem.size === item.size
      );
      
      if (existingItemIndex >= 0) {
        // Update quantity
        cart[existingItemIndex].quantity += item.quantity;
      } else {
        // Add new item
        cart.push({
          product_id: item.id,
          title: item.title,
          images: item.image ? [item.image] : [],
          color: item.color || "",
          size: item.size || "",
          unit_price: Number(item.price || 0),
          quantity: item.quantity,
          added_at: new Date()
        });
      }
      
      // Update Firebase
      await updateDoc(doc(db, "users", currentUser.uid), {
        cart: cart,
        updated_at: serverTimestamp()
      });
      
      addBtn.textContent = "Added!"; 
      setTimeout(()=> addBtn.textContent="Add to cart", 900);
    } catch (error) {
      console.error('Error adding to cart:', error);
      alert('Error adding item to cart. Please try again.');
    }
  };
  addBtn.addEventListener("click", onAdd, { once:true });

  // View cart
  modal.querySelector("#atc-view-cart")?.addEventListener("click", ()=> {
    window.location.href = "Cartpage.html";
  }, { once:true });

  // Close on backdrop / ✕ / Continue
  modal.querySelectorAll("[data-atc-dismiss]").forEach(x=>{
    x.addEventListener("click", ()=> modal.setAttribute("aria-hidden","true"), { once:true });
  });

  // Show
  modal.setAttribute("aria-hidden","false");
  addBtn.focus();
}

// Load navbar when page loads
document.addEventListener('DOMContentLoaded', () => {
    loadNavbar();
});
