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

/**
 * Show a confirmation dialog
 * @param {string} message - The confirmation message
 * @param {object} options - Optional settings
 * @param {string} options.confirmText - Text for confirm button (default: 'Confirm')
 * @param {string} options.cancelText - Text for cancel button (default: 'Cancel')
 * @param {string} options.type - Type: 'warning', 'danger', 'info' (default: 'warning')
 * @returns {Promise<boolean>} - Resolves to true if confirmed, false if cancelled
 */
export function showConfirm(message, options = {}) {
  const {
    confirmText = 'Confirm',
    cancelText = 'Cancel',
    type = 'warning'
  } = options;

  return new Promise((resolve) => {
    // Create overlay
    const overlay = document.createElement('div');
    Object.assign(overlay.style, {
      position: 'fixed',
      top: '0',
      left: '0',
      right: '0',
      bottom: '0',
      backgroundColor: 'rgba(0, 0, 0, 0.5)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      zIndex: '10000',
      opacity: '0',
      transition: 'opacity 0.2s ease'
    });

    // Color schemes
    const colors = {
      warning: { primary: '#f59e0b', hover: '#d97706' },
      danger: { primary: '#ef4444', hover: '#dc2626' },
      info: { primary: '#3b82f6', hover: '#2563eb' }
    };
    const colorScheme = colors[type] || colors.warning;

    // Create dialog
    const dialog = document.createElement('div');
    Object.assign(dialog.style, {
      backgroundColor: '#ffffff',
      borderRadius: '12px',
      padding: '24px',
      maxWidth: '400px',
      width: '90%',
      boxShadow: '0 20px 40px rgba(0, 0, 0, 0.3)',
      transform: 'scale(0.9)',
      transition: 'transform 0.2s ease',
      fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif'
    });

    dialog.innerHTML = `
      <div style="display: flex; align-items: flex-start; gap: 16px; margin-bottom: 20px;">
        <div style="
          width: 40px;
          height: 40px;
          border-radius: 50%;
          background: ${colorScheme.primary}20;
          display: flex;
          align-items: center;
          justify-content: center;
          flex-shrink: 0;
        ">
          <span style="font-size: 20px;">${type === 'danger' ? '⚠' : type === 'info' ? 'ℹ' : '?'}</span>
        </div>
        <div>
          <h3 style="margin: 0 0 8px 0; font-size: 18px; font-weight: 600; color: #111827;">Confirm Action</h3>
          <p style="margin: 0; font-size: 14px; color: #6b7280; line-height: 1.5;">${message}</p>
        </div>
      </div>
      <div style="display: flex; gap: 12px; justify-content: flex-end;">
        <button class="confirm-cancel-btn" style="
          padding: 10px 20px;
          border: 1px solid #d1d5db;
          background: #ffffff;
          color: #374151;
          border-radius: 8px;
          font-size: 14px;
          font-weight: 500;
          cursor: pointer;
          transition: all 0.15s ease;
        ">${cancelText}</button>
        <button class="confirm-ok-btn" style="
          padding: 10px 20px;
          border: none;
          background: ${colorScheme.primary};
          color: #ffffff;
          border-radius: 8px;
          font-size: 14px;
          font-weight: 500;
          cursor: pointer;
          transition: all 0.15s ease;
        ">${confirmText}</button>
      </div>
    `;

    overlay.appendChild(dialog);
    document.body.appendChild(overlay);

    // Animate in
    requestAnimationFrame(() => {
      overlay.style.opacity = '1';
      dialog.style.transform = 'scale(1)';
    });

    const closeDialog = (result) => {
      overlay.style.opacity = '0';
      dialog.style.transform = 'scale(0.9)';
      setTimeout(() => {
        overlay.remove();
        resolve(result);
      }, 200);
    };

    // Button handlers
    const cancelBtn = dialog.querySelector('.confirm-cancel-btn');
    const confirmBtn = dialog.querySelector('.confirm-ok-btn');

    cancelBtn.addEventListener('click', () => closeDialog(false));
    confirmBtn.addEventListener('click', () => closeDialog(true));

    // Close on overlay click
    overlay.addEventListener('click', (e) => {
      if (e.target === overlay) closeDialog(false);
    });

    // Close on Escape key
    const handleKeydown = (e) => {
      if (e.key === 'Escape') {
        document.removeEventListener('keydown', handleKeydown);
        closeDialog(false);
      } else if (e.key === 'Enter') {
        document.removeEventListener('keydown', handleKeydown);
        closeDialog(true);
      }
    };
    document.addEventListener('keydown', handleKeydown);

    // Hover effects
    cancelBtn.addEventListener('mouseenter', () => {
      cancelBtn.style.backgroundColor = '#f3f4f6';
    });
    cancelBtn.addEventListener('mouseleave', () => {
      cancelBtn.style.backgroundColor = '#ffffff';
    });
    confirmBtn.addEventListener('mouseenter', () => {
      confirmBtn.style.backgroundColor = colorScheme.hover;
    });
    confirmBtn.addEventListener('mouseleave', () => {
      confirmBtn.style.backgroundColor = colorScheme.primary;
    });

    // Focus the confirm button
    confirmBtn.focus();
  });
}

// Default export for simple usage
export default showToast;
