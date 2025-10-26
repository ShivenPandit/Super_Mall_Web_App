/**
 * Utility Helper Functions
 * Common utility functions used across the application
 */

const Utils = {
    /**
     * Format date to readable string
     */
    formatDate(date, format = 'DD/MM/YYYY') {
        if (!date) return '';
        
        const d = date instanceof Date ? date : new Date(date);
        
        if (isNaN(d.getTime())) return '';
        
        const day = String(d.getDate()).padStart(2, '0');
        const month = String(d.getMonth() + 1).padStart(2, '0');
        const year = d.getFullYear();
        const hours = String(d.getHours()).padStart(2, '0');
        const minutes = String(d.getMinutes()).padStart(2, '0');
        const seconds = String(d.getSeconds()).padStart(2, '0');
        
        switch (format) {
            case 'DD/MM/YYYY':
                return `${day}/${month}/${year}`;
            case 'DD/MM/YYYY HH:mm':
                return `${day}/${month}/${year} ${hours}:${minutes}`;
            case 'YYYY-MM-DD':
                return `${year}-${month}-${day}`;
            case 'YYYY-MM-DD HH:mm:ss':
                return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
            default:
                return d.toLocaleDateString();
        }
    },

    /**
     * Format currency
     */
    formatCurrency(amount, currency = '₹') {
        if (typeof amount !== 'number') {
            amount = parseFloat(amount) || 0;
        }
        return `${currency}${amount.toLocaleString('en-IN', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
    },

    /**
     * Validate email format
     */
    isValidEmail(email) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    },

    /**
     * Validate password strength
     */
    isValidPassword(password) {
        const minLength = CONSTANTS.VALIDATION.MIN_PASSWORD_LENGTH;
        const maxLength = CONSTANTS.VALIDATION.MAX_PASSWORD_LENGTH;
        
        if (!password || password.length < minLength || password.length > maxLength) {
            return { valid: false, message: `Password must be between ${minLength} and ${maxLength} characters` };
        }
        
        if (!/[A-Z]/.test(password)) {
            return { valid: false, message: 'Password must contain at least one uppercase letter' };
        }
        
        if (!/[a-z]/.test(password)) {
            return { valid: false, message: 'Password must contain at least one lowercase letter' };
        }
        
        if (!/[0-9]/.test(password)) {
            return { valid: false, message: 'Password must contain at least one number' };
        }
        
        return { valid: true, message: 'Password is valid' };
    },

    /**
     * Sanitize HTML to prevent XSS attacks
     */
    sanitizeHTML(html) {
        const div = document.createElement('div');
        div.textContent = html;
        return div.innerHTML;
    },

    /**
     * Debounce function
     */
    debounce(func, wait) {
        let timeout;
        return function executedFunction(...args) {
            const later = () => {
                clearTimeout(timeout);
                func(...args);
            };
            clearTimeout(timeout);
            timeout = setTimeout(later, wait);
        };
    },

    /**
     * Throttle function
     */
    throttle(func, limit) {
        let inThrottle;
        return function(...args) {
            if (!inThrottle) {
                func.apply(this, args);
                inThrottle = true;
                setTimeout(() => inThrottle = false, limit);
            }
        };
    },

    /**
     * Generate unique ID
     */
    generateId() {
        return Date.now().toString(36) + Math.random().toString(36).substr(2);
    },

    /**
     * Deep clone object
     */
    deepClone(obj) {
        return JSON.parse(JSON.stringify(obj));
    },

    /**
     * Check if object is empty
     */
    isEmpty(obj) {
        return Object.keys(obj).length === 0;
    },

    /**
     * Get query parameter from URL
     */
    getQueryParam(param) {
        const urlParams = new URLSearchParams(window.location.search);
        return urlParams.get(param);
    },

    /**
     * Set query parameter in URL
     */
    setQueryParam(param, value) {
        const url = new URL(window.location.href);
        url.searchParams.set(param, value);
        window.history.pushState({}, '', url);
    },

    /**
     * Show loading spinner
     */
    showLoading(containerId = 'loading-container') {
        const container = document.getElementById(containerId);
        if (container) {
            container.style.display = 'flex';
        }
    },

    /**
     * Hide loading spinner
     */
    hideLoading(containerId = 'loading-container') {
        const container = document.getElementById(containerId);
        if (container) {
            container.style.display = 'none';
        }
    },

    /**
     * Show toast notification
     */
    showToast(message, type = 'info', duration = 3000) {
        const toast = document.createElement('div');
        toast.className = `toast toast-${type}`;
        toast.textContent = message;
        
        document.body.appendChild(toast);
        
        setTimeout(() => {
            toast.classList.add('show');
        }, 100);
        
        setTimeout(() => {
            toast.classList.remove('show');
            setTimeout(() => {
                document.body.removeChild(toast);
            }, 300);
        }, duration);
    },

    /**
     * Confirm dialog
     */
    async confirm(message, title = 'Confirm') {
        return new Promise((resolve) => {
            const result = window.confirm(`${title}\n\n${message}`);
            resolve(result);
        });
    },

    /**
     * Validate file upload
     */
    validateFile(file) {
        const maxSize = CONSTANTS.VALIDATION.MAX_FILE_SIZE;
        const allowedTypes = CONSTANTS.VALIDATION.ALLOWED_IMAGE_TYPES;
        
        if (file.size > maxSize) {
            return { valid: false, message: `File size must be less than ${maxSize / 1024 / 1024}MB` };
        }
        
        if (!allowedTypes.includes(file.type)) {
            return { valid: false, message: 'Invalid file type. Only images are allowed.' };
        }
        
        return { valid: true, message: 'File is valid' };
    },

    /**
     * Convert file to base64
     */
    fileToBase64(file) {
        return new Promise((resolve, reject) => {
            const reader = new FileReader();
            reader.onload = () => resolve(reader.result);
            reader.onerror = reject;
            reader.readAsDataURL(file);
        });
    },

    /**
     * Calculate discount percentage
     */
    calculateDiscount(originalPrice, discountedPrice) {
        if (originalPrice <= 0) return 0;
        return Math.round(((originalPrice - discountedPrice) / originalPrice) * 100);
    },

    /**
     * Sort array of objects
     */
    sortArray(array, key, order = 'asc') {
        return array.sort((a, b) => {
            let aVal = a[key];
            let bVal = b[key];
            
            if (typeof aVal === 'string') {
                aVal = aVal.toLowerCase();
                bVal = bVal.toLowerCase();
            }
            
            if (order === 'asc') {
                return aVal > bVal ? 1 : -1;
            } else {
                return aVal < bVal ? 1 : -1;
            }
        });
    },

    /**
     * Filter array by search term
     */
    filterBySearch(array, searchTerm, fields) {
        const term = searchTerm.toLowerCase();
        return array.filter(item => {
            return fields.some(field => {
                const value = item[field];
                return value && value.toString().toLowerCase().includes(term);
            });
        });
    },

    /**
     * Paginate array
     */
    paginate(array, page = 1, pageSize = CONSTANTS.PAGINATION.DEFAULT_PAGE_SIZE) {
        const startIndex = (page - 1) * pageSize;
        const endIndex = startIndex + pageSize;
        return {
            data: array.slice(startIndex, endIndex),
            totalPages: Math.ceil(array.length / pageSize),
            currentPage: page,
            totalItems: array.length
        };
    },

    /**
     * Local storage wrapper with error handling
     */
    storage: {
        set(key, value) {
            try {
                localStorage.setItem(key, JSON.stringify(value));
                return true;
            } catch (error) {
                Logger.error('Failed to save to localStorage', { key, error: error.message });
                return false;
            }
        },
        
        get(key, defaultValue = null) {
            try {
                const item = localStorage.getItem(key);
                return item ? JSON.parse(item) : defaultValue;
            } catch (error) {
                Logger.error('Failed to read from localStorage', { key, error: error.message });
                return defaultValue;
            }
        },
        
        remove(key) {
            try {
                localStorage.removeItem(key);
                return true;
            } catch (error) {
                Logger.error('Failed to remove from localStorage', { key, error: error.message });
                return false;
            }
        },
        
        clear() {
            try {
                localStorage.clear();
                return true;
            } catch (error) {
                Logger.error('Failed to clear localStorage', { error: error.message });
                return false;
            }
        }
    }
};

// Export for use in other modules
if (typeof module !== 'undefined' && module.exports) {
    module.exports = Utils;
}
