// cart.js — Cart page with Firestore Users/{uid}.cart array support + guest fallback

/* ---------- Navbar Loading ---------- */
import { loadNavbar } from './navbar.js';

/* ---------- UI/checkout config ---------- */
const CURRENCY = "USD";
const TAX_RATE = 0.0;
const FLAT_SHIPPING = 8.0;
const FREE_SHIP_THRESHOLD = 120.0;

/* ---------- Firebase config ---------- */

/* ---------- Simple promos (edit as needed) ---------- */
const PROMOS = { SAVE10:{type:"percent",value:10}, BLACK15:{type:"percent",value:15}, FREESHIP:{type:"shipfree"} };

/* ---------- UI helpers ---------- */
const COLOR_HEX = { black:"#111111",white:"#f5f5f5",gray:"#9ca3af",grey:"#9ca3af",red:"#ef4444",green:"#22c55e",blue:"#3b82f6",navy:"#1e3a8a",yellow:"#f59e0b",orange:"#f97316",purple:"#8b5cf6",pink:"#ec4899",brown:"#92400e",beige:"#e7d9c7",olive:"#6b8e23",rose:"#ff6b9b" };
const PLACEHOLDER_IMG="data:image/svg+xml;utf8,"+encodeURIComponent(`<svg xmlns="http://www.w3.org/2000/svg" width="400" height="400"><rect fill="#eef2f6" width="100%" height="100%"/><text x="50%" y="50%" dominant-baseline="middle" text-anchor="middle" fill="#9aa3af" font-family="sans-serif" font-size="16">No image</text></svg>`);

/* ---------- Small utils ---------- */
const qs=(s,r=document)=>r.querySelector(s);
const qsa=(s,r=document)=>Array.from(r.querySelectorAll(s));
const fmt=(n)=>new Intl.NumberFormat(undefined,{style:"currency",currency:CURRENCY}).format(n);
const clampQty=(v)=>!Number.isFinite(v)||v<1?1:(v>10?10:v);
const escapeHtml=(str)=>String(str||"").replace(/[&<>"']/g,s=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"}[s]));
const isUrl=(s)=>/^https?:\/\//i.test(s||"");

/* ---------- Promo storage (localStorage only for promo codes) ---------- */
const getPromo=()=> (localStorage.getItem("cartPromo")||"").toUpperCase().trim();
const setPromo=(c)=> localStorage.setItem("cartPromo",(c||"").toUpperCase().trim());

/* ---------- Firebase imports ---------- */
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.23.0/firebase-app.js";
import { getAuth } from "https://www.gstatic.com/firebasejs/9.23.0/firebase-auth.js";
import { getFirestore } from "https://www.gstatic.com/firebasejs/9.23.0/firebase-firestore.js";
import { onAuthStateChanged } from "https://www.gstatic.com/firebasejs/9.23.0/firebase-auth.js";
import { doc, getDoc, updateDoc, serverTimestamp, collection, addDoc } from "https://www.gstatic.com/firebasejs/9.23.0/firebase-firestore.js";

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

/* ---------- Firebase-only cart management ---------- */
let currentUser = null;        // Firebase user or null
let cachedCart  = [];          // normalized items for rendering

// Normalize from your schema (Users.cart array) to UI item
function normalizeFromUserDoc(raw={}){
  const id   = raw.product_id || raw.productId || raw.id || "";
  const title= raw.title || "Untitled";
  const image= isUrl(raw.image) ? raw.image
              : (Array.isArray(raw.images)&&isUrl(raw.images[0]) ? raw.images[0] : "");
  const price= Number(raw.unit_price ?? raw.unitPrice ?? raw.price ?? 0);
  const qty  = clampQty(Number(raw.quantity ?? raw.qty ?? 1));
  const color= raw.color || "";
  const size = raw.size  || "";
  return { id, title, price, image, color, size, quantity: qty, addedAt: raw.added_at || Date.now() };
}

// Map UI item -> your Users.cart array schema
function mapToUserDocSchema(it){
  return {
    product_id: it.id,
    title: it.title,
    images: it.image ? [it.image] : [],
    color: it.color || "",
    size: it.size || "",
    unit_price: Number(it.price || 0),
    quantity: clampQty(it.quantity),
    added_at: it.addedAt || new Date()
  };
}

async function readCart(){
  if (!currentUser) {
    return [];
  }
  
  try {
    const snap = await getDoc(doc(db, "users", currentUser.uid));
    const data = snap.exists() ? snap.data() : {};
    const arr = Array.isArray(data.cart) ? data.cart : [];
    return arr.map(normalizeFromUserDoc);
  } catch (error) {
    return [];
  }
}

async function writeCart(items){
  if (!currentUser) {
    return;
  }
  
  try {
    const mapped = items.map(mapToUserDocSchema);
    await updateDoc(doc(db, "users", currentUser.uid), {
      cart: mapped,
      updated_at: serverTimestamp()
    });
  } catch (error) {
    console.error('Error saving cart to Firestore:', error);
  }
}

/* ---------- Boot ---------- */
document.addEventListener("DOMContentLoaded", async () => {
  // Load navbar
  await loadNavbar();

  // Detect auth; require login for cart
  onAuthStateChanged(auth, async (user) => {
    currentUser = user;

    if (!user) {
      // User not logged in - show login prompt
      showLoginPrompt();
      return;
    }

    // Load + render cart
    cachedCart = await readCart();
    renderAll();
  });
}, { once:true });

function showLoginPrompt(){
  const list = qs("#cart-items");
  if (!list) return;
  
  list.innerHTML = `
    <div class="login-prompt" style="grid-column: 1/-1; text-align: center; padding: 2rem;">
      <h3>Please log in to view your cart</h3>
      <p>You need to be logged in to access your shopping cart.</p>
      <a href="login.html" class="btn btn-primary">Login</a>
    </div>
  `;
  
  showEmpty(false);
  updateSummary({ subtotal:0, discount:0, shipping:0, tax:0, total:0 });
}

/* ---------- Rendering ---------- */
function renderAll(){
  const list = qs("#cart-items");
  if (!list) return;
  list.innerHTML = "";

  if (!cachedCart.length){
    showEmpty(true);
    updateSummary({ subtotal:0, discount:0, shipping:0, tax:0, total:0 });
    return;
  }
  showEmpty(false);

  for (const it of cachedCart) list.appendChild(renderItem(it));
  recomputeAndUpdateSummary();
}

function renderItem(it){
  const li = document.createElement("li");
  li.className = "cart-item";
  li.dataset.id = it.id || "";
  li.dataset.color = it.color || "";
  li.dataset.size = it.size || "";

  const colorHex = COLOR_HEX[(it.color||"").toLowerCase()] || "#e5e7eb";
  const unitPrice = Number(it.price||0);
  const qty = clampQty(it.quantity);

  li.innerHTML = `
    <div class="item-media">
      <a href="product.html?id=${encodeURIComponent(it.id||"")}" class="item-image-link" aria-label="View product">
        <img class="item-image" src="${escapeHtml(it.image||"")}" alt="${escapeHtml(it.title||"Product")}" loading="lazy">
      </a>
    </div>
    <div class="item-main">
      <a href="product.html?id=${encodeURIComponent(it.id||"")}" class="item-title">${escapeHtml(it.title||"Untitled")}</a>
      <div class="item-variants">
        ${it.color?`
          <span class="variant">
            <span class="variant-label">Color:</span>
            <span class="color-dot" title="${escapeHtml(it.color)}" style="--swatch:${colorHex}"></span>
            <span class="variant-value">${escapeHtml(it.color)}</span>
          </span>`:""}
        ${it.size?`
          <span class="variant">
            <span class="variant-label">Size:</span>
            <span class="size-badge">${escapeHtml(it.size)}</span>
          </span>`:""}
      </div>
      <button class="remove-item" type="button">Remove</button>
    </div>
    <div class="item-price">
      <span class="unit-price" data-price="${unitPrice}">${fmt(unitPrice)}</span>
    </div>
    <div class="item-qty">
      <button class="qty-btn minus" type="button">−</button>
      <input class="qty-input" type="number" inputmode="numeric" pattern="[0-9]*" value="${qty}" min="1" max="10" aria-label="Quantity">
      <button class="qty-btn plus" type="button">+</button>
    </div>
    <div class="item-total"><span class="line-total">${fmt(unitPrice*qty)}</span></div>
  `;

  const img = qs(".item-image", li);
  if (img){
    img.referrerPolicy="no-referrer";
    img.addEventListener("error", ()=>{ img.src = PLACEHOLDER_IMG; }, { once:true });
  }
  return li;
}

function showEmpty(empty){
  const e = qs("#cart-empty"); if (e) e.hidden = !empty;
  const l = qs(".cart-layout"); if (l) l.style.display = empty ? "none" : "grid";
}

/* ---------- Item events (delegated) ---------- */
document.addEventListener("click", async (e)=>{
  const btn = e.target.closest("button");
  if (!btn) return;
  const li = e.target.closest(".cart-item");
  if (!li) return;

  if (btn.classList.contains("remove-item")) {
    await removeItem(li);
  } else if (btn.classList.contains("qty-btn")) {
    const isPlus = btn.classList.contains("plus");
    const input = qs(".qty-input", li);
    const newVal = clampQty((parseInt(input.value,10)||1)+(isPlus?1:-1));
    input.value = newVal;
    await setQty(li, newVal);
  }
});

document.addEventListener("change", async (e)=>{
  const input = e.target.closest(".qty-input");
  if (!input) return;
  const li = e.target.closest(".cart-item");
  if (!li) return;
  await setQty(li, parseInt(input.value,10));
});

async function removeItem(li){
  const id=li.dataset.id, color=li.dataset.color, size=li.dataset.size;
  cachedCart = cachedCart.filter(x => !(x.id===id && (x.color||"")===color && (x.size||"")===size));
  await writeCart(cachedCart);
  li.remove();
  if (!cachedCart.length) showEmpty(true);
  recomputeAndUpdateSummary();
}

async function setQty(li, val){
  const qty = clampQty(val);
  const id=li.dataset.id, color=li.dataset.color, size=li.dataset.size;
  const idx = cachedCart.findIndex(x => x.id===id && (x.color||"")===color && (x.size||"")===size);
  if (idx<0) return;
  cachedCart[idx].quantity = qty;
  await writeCart(cachedCart);

  const unit = Number(qs(".unit-price", li).dataset.price||0);
  qs(".line-total", li).textContent = fmt(unit*qty);
  recomputeAndUpdateSummary();
}

/* ---------- Summary / Promo ---------- */
document.addEventListener("submit", (e)=>{
  const form = e.target.closest("#promo-form");
  if (!form) return;
  e.preventDefault();
  const code = (qs("#promo").value||"").toUpperCase().trim();
  if (!code){ setPromo(""); recomputeAndUpdateSummary(); return; }
  if (PROMOS[code]){ setPromo(code); recomputeAndUpdateSummary(); toast(`Promo applied: ${code}`); }
  else toast("Invalid promo code");
});

const checkoutBtn = document.getElementById("checkoutBtn");
if (checkoutBtn){
  checkoutBtn.addEventListener("click", async ()=>{
    if (!currentUser) {
      toast("Please log in to proceed with checkout");
      return;
    }

    if (cachedCart.length === 0) {
      toast("Your cart is empty");
      return;
    }

    // Redirect to payment page
    window.location.href = "payment.html";
  });
}

function recomputeAndUpdateSummary(){
  const t = computeTotals(cachedCart, getPromo());
  updateSummary(t);
}

function computeTotals(items, promoCode){
  let subtotal = items.reduce((s,it)=> s + Number(it.price||0)*clampQty(it.quantity), 0);
  let discount = 0;
  const promo = PROMOS[promoCode||""];
  if (promo?.type==="percent") discount = +(subtotal*(promo.value/100)).toFixed(2);
  const shipFree = (promo?.type==="shipfree") || subtotal>=FREE_SHIP_THRESHOLD;
  const shipping = subtotal>0 ? (shipFree?0:FLAT_SHIPPING) : 0;
  const taxableBase = Math.max(subtotal-discount,0);
  const tax = +(taxableBase*TAX_RATE).toFixed(2);
  const total = +(taxableBase+shipping+tax).toFixed(2);
  return { subtotal:+subtotal.toFixed(2), discount, shipping, tax, total };
}

function updateSummary({ subtotal, discount, shipping, tax, total }){
  const set = (sel, val)=>{ const el=qs(sel); if (el) el.textContent = val; };
  set("#subtotalAmount", fmt(subtotal));
  set("#discountAmount", discount?`− ${fmt(discount)}`:fmt(0));
  const shipEl = qs("#shippingAmount");
  if (shipEl) shipEl.textContent = subtotal>0 ? (shipping===0?"Free":fmt(shipping)) : "Calculated at checkout";
  set("#taxAmount", fmt(tax));
  set("#totalAmount", fmt(total));
}

/* ---------- Toast ---------- */
function toast(message){
  let el = document.getElementById("toast");
  if (!el){
    el = document.createElement("div");
    el.id="toast";
    Object.assign(el.style,{position:"fixed",bottom:"20px",left:"50%",transform:"translateX(-50%)",padding:"12px 16px",background:"#111",color:"#fff",borderRadius:"8px",boxShadow:"0 8px 20px rgba(0,0,0,.15)",zIndex:"999",transition:"opacity .3s",opacity:"0"});
    document.body.appendChild(el);
  }
  el.textContent=message; el.style.opacity="1"; setTimeout(()=>el.style.opacity="0",1500);
}
