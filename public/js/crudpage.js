// crudpage.js — CRUD operations for managing products (Admin only)

// Import Firebase configuration and Firestore functions
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.23.0/firebase-app.js";
import { getFirestore } from "https://www.gstatic.com/firebasejs/9.23.0/firebase-firestore.js";
import { collection, addDoc, getDocs, doc, updateDoc, deleteDoc, getDoc } from "https://www.gstatic.com/firebasejs/9.23.0/firebase-firestore.js";

// Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDBBHmLTSuwJhTcr5ZEBb7_mLKqZSfANC4",
  authDomain: "brand-website-ce759.firebaseapp.com",
  projectId: "brand-website-ce759",
  appId: "1:234496063014:web:6e42b87acd29324f5718e7",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

// ---------- Tabs and Section Visibility Management ----------
const tabs = document.querySelectorAll('.tab-button');
const sections = document.querySelectorAll('.tab-content');

// Initially, set the first tab as active
tabs[0].classList.add('active');
sections[0].classList.add('active');

// Tab switching logic
tabs.forEach(tab => {
  tab.addEventListener('click', () => {
    // Hide all sections
    sections.forEach(sec => sec.classList.remove('active'));

    // Remove 'active' from all tabs
    tabs.forEach(t => t.classList.remove('active'));

    // Add 'active' to clicked tab and the corresponding section
    tab.classList.add('active');
    const sectionId = tab.id.replace('Tab', 'Section');
    document.getElementById(sectionId).classList.add('active');
  });
});

// ---------- Create Product ----------
document.getElementById('createProductForm').addEventListener('submit', async (e) => {
  e.preventDefault();

  const title = e.target.title.value;
  const category = e.target.category.value;
  const price = e.target.price.value;
  const stock = parseInt(e.target.stock.value) || 0;
  const colorOptions = e.target.colorOptions.value.split(',');
  const sizeOptions = e.target.sizeOptions.value.split(',');
  const image = e.target.image.value;

  try {
    await addDoc(collection(db, "products"), {
      title,
      category,
      price,
      stock,
      color_options: colorOptions,
      size_options: sizeOptions,
      image,
      isActive: true,
      created_at: new Date(),
    });

    alert('Product created successfully!');
    e.target.reset(); // Reset form
  } catch (error) {
    alert('Error creating product: ' + error.message);
  }
});

// Global variable to store all products
let allProducts = [];

// ---------- Read Products (View) ----------
async function loadProducts() {
  const productsList = document.getElementById('productsList');
  productsList.innerHTML = ''; // Clear existing content

  try {
    const snapshot = await getDocs(collection(db, "products"));
    allProducts = []; // Reset the global array
    
    snapshot.forEach(doc => {
      const product = doc.data();
      allProducts.push({
        id: doc.id,
        ...product
      });
    });

    // Display all products initially
    displayProducts(allProducts);
    
    // Add search functionality
    addSearchFunctionality();
  } catch (error) {
    alert('Error loading products: ' + error.message);
  }
}

// Helper function to normalize product data
function normalizeProductData(product) {
  const colors = product.color_options || product.colorOptions || product.colors || product.color || [];
  const sizes = product.size_options || product.sizeOptions || product.sizes || product.size || [];
  
  return {
    ...product,
    colorArray: Array.isArray(colors) ? colors : (typeof colors === 'string' ? colors.split(',').map(c => c.trim()) : []),
    sizeArray: Array.isArray(sizes) ? sizes : (typeof sizes === 'string' ? sizes.split(',').map(s => s.trim()) : [])
  };
}

// Function to display products
function displayProducts(products) {
  const productsList = document.getElementById('productsList');
  productsList.innerHTML = '';

  products.forEach(product => {
    const normalizedProduct = normalizeProductData(product);
    const productElement = document.createElement('div');
    productElement.classList.add('product-item');
    
    productElement.innerHTML = `
      <h3>${product.title}</h3>
      <p>Price: $${product.price}</p>
      <p>Stock: ${product.stock || 0} units</p>
      <p>Category: ${product.category || 'N/A'}</p>
      <p>Colors: ${normalizedProduct.colorArray.length > 0 ? normalizedProduct.colorArray.join(', ') : 'N/A'}</p>
      <p>Sizes: ${normalizedProduct.sizeArray.length > 0 ? normalizedProduct.sizeArray.join(', ') : 'N/A'}</p>
      <button class="edit-btn" data-id="${product.id}">Edit</button>
      <button class="delete-btn" data-id="${product.id}">Delete</button>
    `;
    productsList.appendChild(productElement);
  });

  addProductButtonListeners();
}

// Helper function to filter products based on search term
function filterProducts(products, searchTerm) {
  if (!searchTerm) return products;
  
  return products.filter(product => {
    const normalizedProduct = normalizeProductData(product);
    const title = product.title ? product.title.toLowerCase() : '';
    const category = product.category ? product.category.toLowerCase() : '';
    const colorsString = normalizedProduct.colorArray.join(' ').toLowerCase();
    const sizesString = normalizedProduct.sizeArray.join(' ').toLowerCase();
    const price = product.price ? product.price.toString() : '';
    
    return title.includes(searchTerm) || 
           category.includes(searchTerm) || 
           colorsString.includes(searchTerm) || 
           sizesString.includes(searchTerm) ||
           price.includes(searchTerm);
  });
}

// Function to add search functionality
function addSearchFunctionality() {
  const searchInput = document.getElementById('productSearch');
  
  searchInput.addEventListener('input', (e) => {
    const searchTerm = e.target.value.toLowerCase().trim();
    const filteredProducts = filterProducts(allProducts, searchTerm);
    displayProducts(filteredProducts);
  });
}

// Add event listeners for edit and delete buttons
function addProductButtonListeners() {
  // Edit button listeners
  document.querySelectorAll('.edit-btn').forEach(btn => {
    btn.addEventListener('click', async (e) => {
      const productId = e.target.dataset.id;
      await editProduct(productId);
    });
  });

  // Delete button listeners
  document.querySelectorAll('.delete-btn').forEach(btn => {
    btn.addEventListener('click', async (e) => {
      const productId = e.target.dataset.id;
      await deleteProduct(productId);
    });
  });
}

// Call loadProducts to display products when the "View Products" tab is active
document.getElementById('viewTab').addEventListener('click', loadProducts);

// ---------- Update Product ----------
async function editProduct(id) {
  try {
    const productRef = doc(db, "products", id);
    const docSnap = await getDoc(productRef);

    if (docSnap.exists()) {
      const product = docSnap.data();

      // Switch to update tab
      document.querySelectorAll('.tab-button').forEach(tab => tab.classList.remove('active'));
      document.querySelectorAll('.tab-content').forEach(content => content.classList.remove('active'));
      
      document.getElementById('updateTab').classList.add('active');
      document.getElementById('updateSection').classList.add('active');

      // Fill the update form with current product data
      document.getElementById('updateProductId').value = id;
      document.getElementById('updateTitle').value = product.title;
      document.getElementById('updateCategory').value = product.category || '';
      document.getElementById('updatePrice').value = product.price;
      document.getElementById('updateStock').value = product.stock || 0;
      
      // Use helper function to normalize product data
      const normalizedProduct = normalizeProductData(product);
      
      document.getElementById('updateColorOptions').value = normalizedProduct.colorArray.join(',');
      document.getElementById('updateSizeOptions').value = normalizedProduct.sizeArray.join(',');
      document.getElementById('updateImage').value = product.image || '';
    } else {
      alert('Product not found!');
    }
  } catch (error) {
    alert('Error loading product: ' + error.message);
  }
}

document.getElementById('updateProductForm').addEventListener('submit', async (e) => {
  e.preventDefault();

  const id = e.target.updateProductId.value;
  const title = e.target.updateTitle.value;
  const category = e.target.updateCategory.value;
  const price = e.target.updatePrice.value;
  const stock = parseInt(e.target.updateStock.value) || 0;
  const colorOptions = e.target.updateColorOptions.value.split(',').map(option => option.trim()).filter(option => option);
  const sizeOptions = e.target.updateSizeOptions.value.split(',').map(option => option.trim()).filter(option => option);
  const image = e.target.updateImage.value;

  const productRef = doc(db, "products", id);

  try {
    await updateDoc(productRef, {
      title,
      category,
      price,
      stock,
      color_options: colorOptions,
      size_options: sizeOptions,
      image,
    });

    alert('Product updated successfully!');
    e.target.reset(); // Reset form
    
    // Update the product in the global array
    const productIndex = allProducts.findIndex(p => p.id === id);
    if (productIndex !== -1) {
      allProducts[productIndex] = {
        id,
        title,
        category,
        price,
        color_options: colorOptions,
        size_options: sizeOptions,
        image
      };
    }
    
    // Refresh the display with current search term
    const searchInput = document.getElementById('productSearch');
    const searchTerm = searchInput.value.toLowerCase().trim();
    const filteredProducts = filterProducts(allProducts, searchTerm);
    displayProducts(filteredProducts);
    
    // Switch back to view tab
    document.querySelectorAll('.tab-button').forEach(tab => tab.classList.remove('active'));
    document.querySelectorAll('.tab-content').forEach(content => content.classList.remove('active'));
    document.getElementById('viewTab').classList.add('active');
    document.getElementById('viewSection').classList.add('active');
  } catch (error) {
    alert('Error updating product: ' + error.message);
  }
});

// ---------- Delete Product ----------
async function deleteProduct(id) {
  const confirmation = confirm('Are you sure you want to delete this product?');
  if (confirmation) {
    try {
      await deleteDoc(doc(db, "products", id));
      
      // Remove from global array
      allProducts = allProducts.filter(product => product.id !== id);
      
      // Refresh the display with current search term
      const searchInput = document.getElementById('productSearch');
      const searchTerm = searchInput.value.toLowerCase().trim();
      const filteredProducts = filterProducts(allProducts, searchTerm);
      displayProducts(filteredProducts);
      
      alert('Product deleted successfully!');
    } catch (error) {
      alert('Error deleting product: ' + error.message);
    }
  }
}
