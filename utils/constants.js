/**
 * Constants and Configuration Module
 * Contains all application-wide constants and configuration values
 */

const CONSTANTS = {
    // Application Information
    APP_NAME: 'Super Mall',
    APP_VERSION: '1.0.0',
    
    // Firebase Collection Names
    COLLECTIONS: {
        SHOPS: 'shops',
        PRODUCTS: 'products',
        OFFERS: 'offers',
        CATEGORIES: 'categories',
        FLOORS: 'floors',
        ADMINS: 'admins',
        USERS: 'users'
    },
    
    // User Roles
    ROLES: {
        ADMIN: 'admin',
        USER: 'user',
        MERCHANT: 'merchant'
    },
    
    // Shop Status
    SHOP_STATUS: {
        ACTIVE: 'active',
        INACTIVE: 'inactive',
        PENDING: 'pending'
    },
    
    // Offer Types
    OFFER_TYPES: {
        PERCENTAGE: 'percentage',
        FIXED_AMOUNT: 'fixed_amount',
        BUY_ONE_GET_ONE: 'bogo',
        SEASONAL: 'seasonal'
    },
    
    // Product Filters
    FILTER_OPTIONS: {
        PRICE_RANGE: {
            LOW: { min: 0, max: 1000 },
            MEDIUM: { min: 1000, max: 5000 },
            HIGH: { min: 5000, max: 10000 },
            PREMIUM: { min: 10000, max: Infinity }
        },
        SORT_BY: {
            PRICE_LOW_HIGH: 'price_asc',
            PRICE_HIGH_LOW: 'price_desc',
            NAME_A_Z: 'name_asc',
            NAME_Z_A: 'name_desc',
            RATING: 'rating_desc',
            NEWEST: 'date_desc'
        }
    },
    
    // Validation Rules
    VALIDATION: {
        MIN_PASSWORD_LENGTH: 8,
        MAX_PASSWORD_LENGTH: 128,
        MIN_SHOP_NAME_LENGTH: 3,
        MAX_SHOP_NAME_LENGTH: 100,
        MIN_PRODUCT_NAME_LENGTH: 3,
        MAX_PRODUCT_NAME_LENGTH: 200,
        MAX_DESCRIPTION_LENGTH: 1000,
        MAX_FILE_SIZE: 5 * 1024 * 1024, // 5MB
        ALLOWED_IMAGE_TYPES: ['image/jpeg', 'image/png', 'image/jpg', 'image/webp']
    },
    
    // Pagination
    PAGINATION: {
        DEFAULT_PAGE_SIZE: 12,
        MAX_PAGE_SIZE: 50
    },
    
    // Local Storage Keys
    STORAGE_KEYS: {
        USER_SESSION: 'super_mall_user_session',
        CART: 'super_mall_cart',
        FAVORITES: 'super_mall_favorites',
        FILTERS: 'super_mall_filters',
        THEME: 'super_mall_theme'
    },
    
    // Error Messages
    ERROR_MESSAGES: {
        NETWORK_ERROR: 'Network error. Please check your connection.',
        AUTH_FAILED: 'Authentication failed. Please try again.',
        INVALID_CREDENTIALS: 'Invalid email or password.',
        PERMISSION_DENIED: 'You do not have permission to perform this action.',
        DATA_NOT_FOUND: 'Requested data not found.',
        VALIDATION_ERROR: 'Please check your input and try again.',
        SERVER_ERROR: 'Server error. Please try again later.',
        SESSION_EXPIRED: 'Your session has expired. Please login again.'
    },
    
    // Success Messages
    SUCCESS_MESSAGES: {
        LOGIN_SUCCESS: 'Login successful!',
        LOGOUT_SUCCESS: 'Logout successful!',
        SHOP_CREATED: 'Shop created successfully!',
        SHOP_UPDATED: 'Shop updated successfully!',
        SHOP_DELETED: 'Shop deleted successfully!',
        OFFER_CREATED: 'Offer created successfully!',
        OFFER_UPDATED: 'Offer updated successfully!',
        OFFER_DELETED: 'Offer deleted successfully!',
        PRODUCT_ADDED: 'Product added successfully!',
        PRODUCT_UPDATED: 'Product updated successfully!',
        PRODUCT_DELETED: 'Product deleted successfully!'
    },
    
    // Floor Configuration
    FLOORS: {
        GROUND: { name: 'Ground Floor', code: 'G', level: 0 },
        FIRST: { name: 'First Floor', code: '1', level: 1 },
        SECOND: { name: 'Second Floor', code: '2', level: 2 },
        THIRD: { name: 'Third Floor', code: '3', level: 3 },
        FOURTH: { name: 'Fourth Floor', code: '4', level: 4 },
        BASEMENT: { name: 'Basement', code: 'B', level: -1 }
    },
    
    // Default Categories
    DEFAULT_CATEGORIES: [
        'Electronics',
        'Fashion',
        'Home & Living',
        'Beauty & Personal Care',
        'Sports & Fitness',
        'Books & Stationery',
        'Toys & Games',
        'Food & Beverages',
        'Health & Wellness',
        'Automotive'
    ],
    
    // API Timeout
    API_TIMEOUT: 30000, // 30 seconds
    
    // Date Formats
    DATE_FORMATS: {
        DISPLAY: 'DD/MM/YYYY',
        DISPLAY_TIME: 'DD/MM/YYYY HH:mm',
        ISO: 'YYYY-MM-DD',
        TIMESTAMP: 'YYYY-MM-DD HH:mm:ss'
    }
};

// Freeze the constants object to prevent modifications
Object.freeze(CONSTANTS);

// Export for use in other modules
if (typeof module !== 'undefined' && module.exports) {
    module.exports = CONSTANTS;
}
