 export function showToast(message) {
    const toast = document.createElement('div');
    toast.textContent = message;
    toast.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background: #4CAF50;
        color: white;
        padding: 15px 25px;
        border-radius: 8px;
        box-shadow: 0 4px 12px rgba(0,0,0,0.15);
        z-index: 1000;
        animation: slideIn 0.3s ease, fadeOut 0.3s ease 2.7s;
        font-family: -apple-system, BlinkMacSystemFont, sans-serif;
    `;
    
    const style = document.createElement('style');
    style.textContent = `
        @keyframes slideIn {
            from { transform: translateX(100%); opacity: 0; }
            to { transform: translateX(0); opacity: 1; }
        }
        @keyframes fadeOut {
            from { opacity: 1; }
            to { opacity: 0; }
        }
    `;
    
    document.head.appendChild(style);
    document.body.appendChild(toast);
    
    setTimeout(() => toast.remove(), 3000);
}

export function showErrorToast(message, options = {}) {
    const {
        duration = 4000,           // Longer duration for errors
        position = 'top-right',    // 'top-right', 'top-left', 'bottom-right', 'bottom-left'
        showCloseButton = true,    // Whether to show a close button
        icon = '❌'               // Error icon
    } = options;
    
    const toast = document.createElement('div');
    toast.className = 'error-toast-notification';
    
    // Determine position
    const positions = {
        'top-right': { top: '20px', right: '20px', left: 'auto' },
        'top-left': { top: '20px', left: '20px', right: 'auto' },
        'bottom-right': { bottom: '20px', right: '20px', top: 'auto', left: 'auto' },
        'bottom-left': { bottom: '20px', left: '20px', top: 'auto', right: 'auto' }
    };
    
    const pos = positions[position] || positions['top-right'];
    
    toast.style.cssText = `
        position: fixed;
        top: ${pos.top || 'auto'};
        bottom: ${pos.bottom || 'auto'};
        left: ${pos.left || 'auto'};
        right: ${pos.right || 'auto'};
        background: #f44336;
        color: white;
        padding: 15px 25px;
        padding-right: ${showCloseButton ? '45px' : '25px'};
        border-radius: 8px;
        box-shadow: 0 4px 12px rgba(244, 67, 54, 0.2);
        z-index: 1001; /* Higher than success toast */
        animation: slideInError 0.3s ease, fadeOutError 0.3s ease ${duration - 300}ms;
        font-family: -apple-system, BlinkMacSystemFont, sans-serif;
        min-width: 300px;
        max-width: 400px;
        border-left: 4px solid #d32f2f;
        display: flex;
        align-items: flex-start;
        gap: 12px;
    `;
    
    // Create icon container
    const iconSpan = document.createElement('span');
    iconSpan.textContent = icon;
    iconSpan.style.cssText = `
        font-size: 20px;
        flex-shrink: 0;
        margin-top: 2px;
    `;
    
    // Create message container
    const messageSpan = document.createElement('span');
    messageSpan.textContent = message;
    messageSpan.style.cssText = `
        flex: 1;
        line-height: 1.4;
    `;
    
    // Add icon and message to toast
    toast.appendChild(iconSpan);
    toast.appendChild(messageSpan);
    
    // Add close button if enabled
    if (showCloseButton) {
        const closeButton = document.createElement('button');
        closeButton.textContent = '×';
        closeButton.style.cssText = `
            position: absolute;
            top: 5px;
            right: 10px;
            background: transparent;
            border: none;
            color: white;
            font-size: 24px;
            cursor: pointer;
            padding: 0;
            width: 24px;
            height: 24px;
            display: flex;
            align-items: center;
            justify-content: center;
            opacity: 0.8;
            transition: opacity 0.2s;
        `;
        closeButton.onmouseover = () => closeButton.style.opacity = '1';
        closeButton.onmouseout = () => closeButton.style.opacity = '0.8';
        closeButton.onclick = () => toast.remove();
        toast.appendChild(closeButton);
    }
    
    // Add styles
    const styleId = 'error-toast-styles';
    if (!document.getElementById(styleId)) {
        const style = document.createElement('style');
        style.id = styleId;
        style.textContent = `
            @keyframes slideInError {
                from { 
                    transform: translateX(${position.includes('right') ? '100%' : '-100%'}); 
                    opacity: 0; 
                }
                to { 
                    transform: translateX(0); 
                    opacity: 1; 
                }
            }
            @keyframes fadeOutError {
                from { opacity: 1; }
                to { opacity: 0; }
            }
            
            .error-toast-notification:hover {
                box-shadow: 0 6px 16px rgba(244, 67, 54, 0.3);
                transform: translateY(-1px);
                transition: all 0.2s ease;
            }
        `;
        document.head.appendChild(style);
    }
    
    // Add hover effect
    toast.onmouseenter = () => {
        toast.style.transform = 'translateY(-1px)';
        toast.style.boxShadow = '0 6px 16px rgba(244, 67, 54, 0.3)';
    };
    
    toast.onmouseleave = () => {
        toast.style.transform = 'translateY(0)';
        toast.style.boxShadow = '0 4px 12px rgba(244, 67, 54, 0.2)';
    };
    
    // Add to DOM
    document.body.appendChild(toast);
    
    // Auto-remove after duration
    setTimeout(() => {
        if (toast.parentNode) {
            toast.style.animation = `fadeOutError 0.3s ease forwards`;
            setTimeout(() => toast.remove(), 300);
        }
    }, duration);
    
    // Return toast element for external control
    return toast;
}

// Optional: Convenience function for common error types
export function showFormError(message) {
    return showErrorToast(message, {
        icon: '⚠️',
        position: 'top-right'
    });
}

export function showNetworkError() {
    return showErrorToast('Network error. Please check your connection and try again.', {
        icon: '📡',
        duration: 5000
    });
}

export function showServerError() {
    return showErrorToast('Server error. Please try again in a few moments.', {
        icon: '🔧',
        duration: 5000
    });
}

export function showValidationError(message) {
    return showErrorToast(message, {
        icon: '📝',
        position: 'top-right',
        showCloseButton: false
    });
}
