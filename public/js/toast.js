// toast.js - Shared toast notification utility
// Usage: import { showToast } from './toast.js';
//        showToast('Message here', 'success'); // types: success, error, info, warning

const TOAST_DURATION = 3000;
const TOAST_CONTAINER_ID = 'toast-container';

// Create toast container if it doesn't exist
function getOrCreateContainer() {
  let container = document.getElementById(TOAST_CONTAINER_ID);
  if (!container) {
    container = document.createElement('div');
    container.id = TOAST_CONTAINER_ID;
    Object.assign(container.style, {
      position: 'fixed',
      bottom: '20px',
      right: '20px',
      zIndex: '9999',
      display: 'flex',
      flexDirection: 'column',
      gap: '10px',
      maxWidth: '350px'
    });
    document.body.appendChild(container);
  }
  return container;
}

// Get icon and colors based on toast type
function getToastStyles(type) {
  const styles = {
    success: {
      bg: '#10b981',
      icon: '✓',
      border: '#059669'
    },
    error: {
      bg: '#ef4444',
      icon: '✕',
      border: '#dc2626'
    },
    warning: {
      bg: '#f59e0b',
      icon: '⚠',
      border: '#d97706'
    },
    info: {
      bg: '#3b82f6',
      icon: 'ℹ',
      border: '#2563eb'
    }
  };
  return styles[type] || styles.info;
}

/**
 * Show a toast notification
 * @param {string} message - The message to display
 * @param {string} type - Type of toast: 'success', 'error', 'warning', 'info'
 * @param {number} duration - Duration in ms (default: 3000)
 */
export function showToast(message, type = 'info', duration = TOAST_DURATION) {
  const container = getOrCreateContainer();
  const toastStyles = getToastStyles(type);
  
  const toast = document.createElement('div');
  toast.className = `toast-notification toast-${type}`;
  
  Object.assign(toast.style, {
    display: 'flex',
    alignItems: 'center',
    gap: '12px',
    padding: '14px 18px',
    background: toastStyles.bg,
    color: '#ffffff',
    borderRadius: '10px',
    boxShadow: '0 8px 24px rgba(0,0,0,0.2)',
    fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
    fontSize: '14px',
    fontWeight: '500',
    opacity: '0',
    transform: 'translateX(100%)',
    transition: 'all 0.3s ease',
    cursor: 'pointer',
    borderLeft: `4px solid ${toastStyles.border}`
  });

  toast.innerHTML = `
    <span style="font-size: 18px; flex-shrink: 0;">${toastStyles.icon}</span>
    <span style="flex: 1; line-height: 1.4;">${message}</span>
    <button style="
      background: none;
      border: none;
      color: rgba(255,255,255,0.8);
      font-size: 18px;
      cursor: pointer;
      padding: 0;
      margin-left: 8px;
      line-height: 1;
      flex-shrink: 0;
    " aria-label="Close">×</button>
  `;

  // Close button handler
  const closeBtn = toast.querySelector('button');
  closeBtn.addEventListener('click', (e) => {
    e.stopPropagation();
    removeToast(toast);
  });

  // Click to dismiss
  toast.addEventListener('click', () => removeToast(toast));

  container.appendChild(toast);

  // Trigger animation
  requestAnimationFrame(() => {
    toast.style.opacity = '1';
    toast.style.transform = 'translateX(0)';
  });

  // Auto remove after duration
  setTimeout(() => removeToast(toast), duration);
}

function removeToast(toast) {
  if (!toast || !toast.parentNode) return;
  
  toast.style.opacity = '0';
  toast.style.transform = 'translateX(100%)';
  
  setTimeout(() => {
    if (toast.parentNode) {
      toast.parentNode.removeChild(toast);
    }
  }, 300);
}

// Convenience methods
export const toast = {
  success: (msg, duration) => showToast(msg, 'success', duration),
  error: (msg, duration) => showToast(msg, 'error', duration),
  warning: (msg, duration) => showToast(msg, 'warning', duration),
  info: (msg, duration) => showToast(msg, 'info', duration)
};

// Default export for simple usage
export default showToast;
