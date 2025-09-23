import { loadNavbar } from './navbar.js';
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.23.0/firebase-app.js";
import { getAuth } from "https://www.gstatic.com/firebasejs/9.23.0/firebase-auth.js";
import { getFirestore } from "https://www.gstatic.com/firebasejs/9.23.0/firebase-firestore.js";
import { onAuthStateChanged } from "https://www.gstatic.com/firebasejs/9.23.0/firebase-auth.js";
import { doc, getDoc, updateDoc, serverTimestamp, collection, getDocs, query, where, limit } from "https://www.gstatic.com/firebasejs/9.23.0/firebase-firestore.js";

const firebaseConfig = {
  apiKey: "AIzaSyDBBHmLTSuwJhTcr5ZEBb7_mLKqZSfANC4",
  authDomain: "brand-website-ce759.firebaseapp.com",
  projectId: "brand-website-ce759",
  appId: "1:234496063014:web:6e42b87acd29324f5718e7",
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

const params = new URLSearchParams(window.location.search);
const requestedProductId = params.get("id") || null;
let currentUser = null;

// Map simple color names to hex for swatches
const COLOR_HEX = {
  black: "#111111",
  white: "#f5f5f5",
  gray: "#9ca3af",
  grey: "#9ca3af",
  red: "#ef4444",
  green: "#22c55e",
  blue: "#3b82f6",
  navy: "#1e3a8a",
  yellow: "#f59e0b",
  orange: "#f97316",
  purple: "#8b5cf6",
  pink: "#ec4899",
  brown: "#92400e",
  beige: "#e7d9c7",
  olive: "#6b8e23"
};

let currentProduct = null;

document.addEventListener("DOMContentLoaded", () => {
  init().catch(err => {
    console.error(err);
    toast("Could not load product");
  });
});

async function init() {
  console.log('Initializing product details page...');
  console.log('Requested product ID:', requestedProductId);
  
  try {
    currentProduct = await fetchProductSmart(requestedProductId);
    console.log('Product loaded:', currentProduct);
    renderProduct(currentProduct);
    bindInteractions(currentProduct);
  } catch (error) {
    console.error('Error loading product:', error);
    document.querySelector('.product-title').textContent = 'Product not found';
    document.querySelector('.product-description').textContent = 'The requested product could not be loaded.';
  }
}

async function fetchProductSmart(idOrNull) {
  console.log('Fetching product with ID:', idOrNull);
  
  if (idOrNull) {
    try {
      console.log('Trying to fetch product by ID from Firestore...');
      const snap = await getDoc(doc(db, "products", idOrNull));
      if (snap.exists()) {
        console.log('Product found by ID:', snap.data());
        return normalizeProduct({ id: snap.id, ...snap.data() });
      } else {
        console.log('Product not found by ID');
      }
    } catch (e) {
      console.warn("Firestore fetch by id failed:", e);
    }
  }

  try {
    console.log('Trying to fetch first active product...');
    const q = query(collection(db, "products"), where("isActive", "==", true), limit(1));
    const s = await getDocs(q);
    if (!s.empty) {
      const d = s.docs[0];
      console.log('Found active product:', d.data());
      return normalizeProduct({ id: d.id, ...d.data() });
    } else {
      console.log('No active products found');
    }
  } catch (e) {
    console.warn("Firestore query failed:", e);
  }

  try {
    console.log('Trying to fetch any product as fallback...');
    const q = query(collection(db, "products"), limit(1));
    const s = await getDocs(q);
    if (!s.empty) {
      const d = s.docs[0];
      console.log('Found fallback product:', d.data());
      return normalizeProduct({ id: d.id, ...d.data() });
    } else {
      console.log('No products found at all');
    }
  } catch (e) {
    console.warn("Fallback query failed:", e);
  }

  throw new Error("No product found");
}

// put this helper near the top of app.js (once)
function coerceArray(...candidates) {
  for (const v of candidates) {
    if (Array.isArray(v) && v.length) return v;
    if (typeof v === "string" && v.trim()) {
      return v.split(/[,|]/).map(s => s.trim()).filter(Boolean);
    }
  }
  return [];
}

// replace your whole normalizeProduct with this:
function normalizeProduct(data) {
  const images = Array.isArray(data.images)
    ? data.images
    : (data.image ? [data.image] : []);

  // accept colorOptions, color_options, colors, color (string list)
  const colorNames = coerceArray(
    data.colorOptions,
    data.color_options,
    data.colors,
    data.color,
    data.availableColors
  );

  // accept sizeOptions, size_options, sizes, size (string list)
  const sizeOptions = coerceArray(
    data.sizeOptions,
    data.size_options,
    data.sizes,
    data.size,
    data.availableSizes
  );

  return {
    id: data.id,
    title: data.title || "Untitled",
    description: data.description || "",
    price: Number(data.price || 0),
    discount: Number(data.discount || 0), // percent
    isActive: data.isActive !== false,
    stock: Number(data.stock || 0),
    images,
    colors: colorNames.map(name => ({
      name,
      hex: COLOR_HEX[name?.toLowerCase?.()] || "#e5e7eb"
    })),
    sizes: sizeOptions,
    defaultColor: colorNames[0] || "",
    defaultSize: sizeOptions[0] || "",
    category: data.category || ""
  };
}

// ---------- Rendering ----------
function renderProduct(p) {
  qs(".product-title").textContent = p.title;
  qs(".product-description").textContent = p.description;

  const priceEl = qs(".product-price");
  const hasDiscount = p.discount > 0;
  const finalPrice = +(p.price * (1 - p.discount / 100)).toFixed(2);
  priceEl.innerHTML = hasDiscount
    ? `<span style="text-decoration:line-through; opacity:.6; margin-right:.5rem;">${formatCurrency(p.price)}</span><span>${formatCurrency(finalPrice)}</span>`
    : `${formatCurrency(p.price)}`;

  const imgEl = qs(".product-image img");
  if (p.images[0]) imgEl.src = p.images[0];
  imgEl.alt = p.title;

  // Colors
  const colorWrap = qs(".color-options");
  colorWrap.querySelectorAll(".swatch").forEach(el => el.remove());
  p.colors.forEach((c, i) => {
    const btn = document.createElement("button");
    btn.className = "swatch" + ((c.name === p.defaultColor || i === 0) ? " selected" : "");
    btn.type = "button";
    btn.title = c.name;
    btn.dataset.color = c.name;
    btn.style.setProperty("--swatch", c.hex);
    btn.addEventListener("click", () => {
      qsa(".color-options .swatch").forEach(x => x.classList.remove("selected"));
      btn.classList.add("selected");
      // If you later add per-color images (c.image), swap here.
    });
    colorWrap.appendChild(btn);
  });

  // Sizes
  const sizeWrap = qs(".size-options");
  sizeWrap.querySelectorAll(".size").forEach(el => el.remove());
  p.sizes.forEach(s => {
    const btn = document.createElement("button");
    btn.className = "size" + (s === p.defaultSize ? " selected" : "");
    btn.type = "button";
    btn.textContent = s;
    btn.dataset.size = s;
    btn.addEventListener("click", () => {
      qsa(".size-options .size").forEach(x => x.classList.remove("selected"));
      btn.classList.add("selected");
    });
    sizeWrap.appendChild(btn);
  });

  // Stock state
  const addBtn = qs("#add-to-cart-btn");
  if (p.stock <= 0 || !p.isActive) {
    addBtn.disabled = true;
    addBtn.style.opacity = ".6";
    addBtn.textContent = "Out of stock";
  } else {
    addBtn.disabled = false;
    addBtn.style.opacity = "1";
    addBtn.textContent = "Add to cart";
  }
}

// ---------- Interactions ----------
function bindInteractions(product) {
  const qty = qs("#quantity");
  qty.addEventListener("change", () => {
    let v = parseInt(qty.value, 10);
    if (isNaN(v) || v < 1) v = 1;
    if (v > 10) v = 10;
    qty.value = v;
  });

  qs('#add-to-cart-btn').addEventListener('click', async () => {
    if (!currentUser) {
      alert('Please log in to add items to cart');
      return;
    }

    const qty = parseInt(qs('#quantity').value, 10) || 1;
    const colorBtn = qs('.color-options .swatch.selected');
    const sizeBtn  = qs('.size-options .size.selected');

    const item = {
      id: product.id,
      title: product.title,
      price: product.discount > 0
        ? +(product.price * (1 - product.discount / 100)).toFixed(2)
        : product.price,
      image: qs('.product-image img').src,
      color: colorBtn ? (colorBtn.dataset.color || '') : '',
      size:  sizeBtn ? (sizeBtn.dataset.size  || '') : '',
      quantity: qty,
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

      // Open the popup (now passes product for suggestions)
      openATCModal(item, product);
    } catch (error) {
      console.error('Error adding to cart:', error);
      alert('Error adding item to cart. Please try again.');
    }
  });
}

// ---------- Utils ----------
function toast(message) {
  let el = document.getElementById("toast");
  if (!el) {
    el = document.createElement("div");
    el.id = "toast";
    Object.assign(el.style, {
      position: "fixed",
      bottom: "20px",
      left: "50%",
      transform: "translateX(-50%)",
      padding: "12px 16px",
      background: "#111",
      color: "#fff",
      borderRadius: "8px",
      boxShadow: "0 8px 20px rgba(0,0,0,.15)",
      zIndex: "999",
      transition: "opacity .3s",
      opacity: "0"
    });
    document.body.appendChild(el);
  }
  el.textContent = message;
  el.style.opacity = "1";
  setTimeout(() => (el.style.opacity = "0"), 1500);
}

function formatCurrency(n) {
  return new Intl.NumberFormat(undefined, { style: "currency", currency: "USD" }).format(n);
}

const qs = s => document.querySelector(s);
const qsa = s => Array.from(document.querySelectorAll(s));

(function initATCModalOnce(){
  const modal = document.getElementById("addToCartModal");
  if (!modal) return;

  // Close on backdrop / ✕ / "Continue shopping"
  modal.addEventListener("click", (e) => {
    if (e.target.matches("[data-atc-dismiss]") || e.target.closest("[data-atc-dismiss]")) {
      closeATCModal();
    }
  });

  // Esc to close
  document.addEventListener("keydown", (e) => {
    if (modal.getAttribute("aria-hidden") === "false" && e.key === "Escape") closeATCModal();
  });

  // Qty +/-
  modal.addEventListener("click", (e) => {
    const btn = e.target.closest("[data-atc-qty]");
    if (!btn) return;
    const input = modal.querySelector("#atc-quantity");
    const next = clampQty((parseInt(input.value, 10) || 1) + (btn.dataset.atcQty === "plus" ? 1 : -1));
    input.value = next;
    applyATCQuantity(next);
  });

  // Qty direct input
  modal.querySelector("#atc-quantity")?.addEventListener("change", (e) => {
    const v = clampQty(parseInt(e.target.value, 10) || 1);
    e.target.value = v;
    applyATCQuantity(v);
  });

  // Buttons
  document.getElementById("atc-view-cart")?.addEventListener("click", () => {
    window.location.href = "Cartpage.html"; // matches your filename
  });
  document.getElementById("atc-checkout")?.addEventListener("click", () => {
    localStorage.setItem("goCheckout", "1");
    window.location.href = "Cartpage.html";
  });
})();

// Keep track of the just-added variant (id+color+size)
let __ATC_CTX = null;

// Placeholder used for any broken/blocked images in the modal/suggestions
const ATC_PLACEHOLDER_IMG =
  "data:image/svg+xml;utf8," +
  encodeURIComponent(`<svg xmlns="http://www.w3.org/2000/svg" width="400" height="400">
    <rect fill="#eef2f6" width="100%" height="100%"/>
    <text x="50%" y="50%" dominant-baseline="middle" text-anchor="middle"
      fill="#9aa3af" font-family="sans-serif" font-size="16">No image</text>
  </svg>`);

// openATCModal now accepts the active product so we can suggest by category
function openATCModal(item, activeProduct){
  __ATC_CTX = { id: item.id, color: item.color || "", size: item.size || "" };
  const modal = document.getElementById("addToCartModal");
  if (!modal) return;

  const img = modal.querySelector("#atc-thumb");
  img.src = item.image || "";
  img.alt = item.title || "Product image";
  img.referrerPolicy = "no-referrer";
  img.onerror = () => { img.src = ATC_PLACEHOLDER_IMG; };

  modal.querySelector("#atc-title").textContent = item.title || "Untitled";
  const colorName = item.color || "—";
  modal.querySelector("#atc-color").textContent = colorName;
  const hex = (window.COLOR_HEX?.[colorName?.toLowerCase?.()] || "#e5e7eb");
  modal.querySelector("#atc-color-dot").style.setProperty("--swatch", hex);
  modal.querySelector("#atc-size").textContent = item.size || "—";
  modal.querySelector("#atc-price").textContent = formatCurrency(item.price || 0);
  modal.querySelector("#atc-quantity").value = getCartQuantityFor(item);

  // Load Firestore suggestions for same category (or fallback)
  loadATCSuggestions(activeProduct);

  modal.setAttribute("aria-hidden", "false");
  modal.querySelector("#atc-view-cart")?.focus();
}

async function loadATCSuggestions(activeProduct){
  try {
    const { getFirestore, collection, query, where, limit, getDocs } =
      await import(`https://www.gstatic.com/firebasejs/${FIREBASE_VERSION}/firebase-firestore.js`);
    const db = getFirestore();

    const col = collection(db, "products");
    // Prefer same category; otherwise any active
    let q = activeProduct?.category
      ? query(col, where("isActive","==",true), where("category","==",activeProduct.category), limit(6))
      : query(col, where("isActive","==",true), limit(6));

    const snaps = await getDocs(q);
    const items = snaps.docs.map(d => {
      const p = d.data() || {};
      const base = Number(p.price || 0);
      const discount = Number(p.discount || 0);
      const finalPrice = discount > 0 ? +(base * (1 - discount/100)).toFixed(2) : base;
      return {
        id: d.id,
        title: p.title || "Product",
        image: (Array.isArray(p.images) && p.images[0]) || "",
        price: finalPrice
      };
    })
    .filter(x => x.id !== activeProduct?.id)
    .slice(0, 3);

    renderATCSuggestions(items);
  } catch (e) {
    console.warn("ATC suggestions failed:", e);
  }
}

function renderATCSuggestions(items){
  const grid = document.querySelector(".atc-suggest-grid");
  if (!grid) return;

  if (!items.length) {
    grid.innerHTML = "";
    return;
  }

  grid.innerHTML = items.map(p => `
    <a class="s-card" href="ProductDetails.html?id=${encodeURIComponent(p.id)}" aria-label="View ${escapeHtml(p.title)}">
      <img src="${escapeHtml(p.image || "")}" alt="${escapeHtml(p.title)}" loading="lazy">
      <span class="s-title">${escapeHtml(p.title)}</span>
      <span class="s-price">${formatCurrency(p.price || 0)}</span>
    </a>
  `).join("");

  // robust image handling
  grid.querySelectorAll("img").forEach(img => {
    img.referrerPolicy = "no-referrer";
    img.addEventListener("error", () => { img.src = ATC_PLACEHOLDER_IMG; }, { once: true });
  });
}

// small helper reused above
function escapeHtml(str){return String(str||"").replace(/[&<>"']/g, s=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"}[s]));}

// Modal helpers shared in the ATC block
function closeATCModal(){
  const modal = document.getElementById("addToCartModal");
  if (modal) modal.setAttribute("aria-hidden", "true");
  __ATC_CTX = null;
}
function getCartQuantityFor(item){
  const cart = JSON.parse(localStorage.getItem("cart") || "[]");
  const line = cart.find(l => l.id === item.id &&
                              (l.color || "") === (item.color || "") &&
                              (l.size  || "") === (item.size  || ""));
  return line ? clampQty(line.quantity) : 1;
}
function applyATCQuantity(newQty){
  if (!__ATC_CTX) return;
  const cart = JSON.parse(localStorage.getItem("cart") || "[]");
  const i = cart.findIndex(l => l.id === __ATC_CTX.id &&
                                (l.color || "") === __ATC_CTX.color &&
                                (l.size  || "") === __ATC_CTX.size);
  if (i < 0) return;
  cart[i].quantity = clampQty(newQty);
  localStorage.setItem("cart", JSON.stringify(cart));
}
function clampQty(v){ if(!Number.isFinite(v)) v=1; if(v<1) v=1; if(v>10) v=10; return v; }

// ---------- Page Initialization ----------
document.addEventListener('DOMContentLoaded', async () => {
    // Load navbar
    await loadNavbar();

    // Track authentication state
    onAuthStateChanged(auth, (user) => {
        currentUser = user;
    });

    // Handle product ID from URL
    const urlParams = new URLSearchParams(window.location.search);
    const productId = urlParams.get('id');

    if (productId) {
        // You can add product loading logic here if needed
        // For now, the existing product loading logic should handle it
    } else {
    }
});

