import { initializeApp } from "https://www.gstatic.com/firebasejs/9.23.0/firebase-app.js";
import { getFirestore } from "https://www.gstatic.com/firebasejs/9.23.0/firebase-firestore.js";
import { doc, getDoc } from "https://www.gstatic.com/firebasejs/9.23.0/firebase-firestore.js";

const firebaseConfig = {
  apiKey: "AIzaSyDBBHmLTSuwJhTcr5ZEBb7_mLKqZSfANC4",
  authDomain: "brand-website-ce759.firebaseapp.com",
  projectId: "brand-website-ce759",
  appId: "1:234496063014:web:6e42b87acd29324f5718e7",
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export async function checkProductStock(productId, requestedQuantity = 1) {
  try {
    if (!productId) {
      return {
        isAvailable: false,
        currentStock: 0,
        message: "Product ID is required"
      };
    }

    const productDoc = await getDoc(doc(db, "products", productId));
    
    if (!productDoc.exists()) {
      return {
        isAvailable: false,
        currentStock: 0,
        message: "Product not found"
      };
    }

    const productData = productDoc.data();
    const currentStock = Number(productData.stock || 0);
    const isActive = productData.isActive !== false;

    if (!isActive) {
      return {
        isAvailable: false,
        currentStock: currentStock,
        message: "This product is currently unavailable"
      };
    }

    if (currentStock <= 0) {
      return {
        isAvailable: false,
        currentStock: currentStock,
        message: "This product is out of stock"
      };
    }

    if (currentStock < requestedQuantity) {
      return {
        isAvailable: false,
        currentStock: currentStock,
        message: `Only ${currentStock} item${currentStock === 1 ? '' : 's'} available in stock`
      };
    }

    return {
      isAvailable: true,
      currentStock: currentStock,
      message: "Product is available"
    };

  } catch (error) {
    console.error('Error checking product stock:', error);
    return {
      isAvailable: false,
      currentStock: 0,
      message: "Error checking product availability. Please try again."
    };
  }
}

export function showStockNotification(message, type = 'error') {
  let notification = document.getElementById('stock-notification');
  
  if (!notification) {
    notification = document.createElement('div');
    notification.id = 'stock-notification';
    notification.style.cssText = `
      position: fixed;
      top: 20px;
      right: 20px;
      padding: 16px 20px;
      border-radius: 8px;
      box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
      z-index: 10000;
      font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
      font-size: 14px;
      font-weight: 500;
      max-width: 350px;
      opacity: 0;
      transform: translateX(100%);
      transition: all 0.3s ease;
    `;
    document.body.appendChild(notification);
  }

  notification.textContent = message;
  
  switch (type) {
    case 'error':
      notification.style.backgroundColor = '#fee2e2';
      notification.style.color = '#dc2626';
      notification.style.border = '1px solid #fecaca';
      break;
    case 'warning':
      notification.style.backgroundColor = '#fef3c7';
      notification.style.color = '#d97706';
      notification.style.border = '1px solid #fed7aa';
      break;
    case 'info':
      notification.style.backgroundColor = '#dbeafe';
      notification.style.color = '#2563eb';
      notification.style.border = '1px solid #bfdbfe';
      break;
    default:
      notification.style.backgroundColor = '#f3f4f6';
      notification.style.color = '#374151';
      notification.style.border = '1px solid #d1d5db';
  }

  notification.style.opacity = '1';
  notification.style.transform = 'translateX(0)';

  setTimeout(() => {
    notification.style.opacity = '0';
    notification.style.transform = 'translateX(100%)';
  }, 4000);
}

export async function validateAndAddToCart(product, quantity, color = '', size = '', addToCartCallback) {
  try {
    // Check stock availability
    const stockCheck = await checkProductStock(product.id, quantity);
    
    if (!stockCheck.isAvailable) {
      showStockNotification(stockCheck.message, 'error');
      return false;
    }

    if (addToCartCallback && typeof addToCartCallback === 'function') {
      await addToCartCallback();
      showStockNotification(`Added ${quantity} item${quantity === 1 ? '' : 's'} to cart!`, 'info');
      return true;
    }

    return false;
  } catch (error) {
    console.error('Error in validateAndAddToCart:', error);
    showStockNotification('Error adding item to cart. Please try again.', 'error');
    return false;
  }
}
