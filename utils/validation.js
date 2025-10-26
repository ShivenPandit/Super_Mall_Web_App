/**
 * Validation Module
 * Provides validation functions for forms and data
 */

const Validator = {
    /**
     * Validate shop form data
     */
    validateShop(shopData) {
        const errors = [];

        // Validate shop name
        if (!shopData.name || shopData.name.trim().length < CONSTANTS.VALIDATION.MIN_SHOP_NAME_LENGTH) {
            errors.push(`Shop name must be at least ${CONSTANTS.VALIDATION.MIN_SHOP_NAME_LENGTH} characters`);
        }
        if (shopData.name && shopData.name.length > CONSTANTS.VALIDATION.MAX_SHOP_NAME_LENGTH) {
            errors.push(`Shop name must not exceed ${CONSTANTS.VALIDATION.MAX_SHOP_NAME_LENGTH} characters`);
        }

        // Validate description
        if (!shopData.description || shopData.description.trim().length === 0) {
            errors.push('Description is required');
        }
        if (shopData.description && shopData.description.length > CONSTANTS.VALIDATION.MAX_DESCRIPTION_LENGTH) {
            errors.push(`Description must not exceed ${CONSTANTS.VALIDATION.MAX_DESCRIPTION_LENGTH} characters`);
        }

        // Validate category
        if (!shopData.category || shopData.category.trim().length === 0) {
            errors.push('Category is required');
        }

        // Validate floor
        if (!shopData.floor) {
            errors.push('Floor is required');
        }

        // Validate contact
        if (!shopData.contact || shopData.contact.trim().length === 0) {
            errors.push('Contact information is required');
        }

        return {
            isValid: errors.length === 0,
            errors: errors
        };
    },

    /**
     * Validate product form data
     */
    validateProduct(productData) {
        const errors = [];

        // Validate product name
        if (!productData.name || productData.name.trim().length < CONSTANTS.VALIDATION.MIN_PRODUCT_NAME_LENGTH) {
            errors.push(`Product name must be at least ${CONSTANTS.VALIDATION.MIN_PRODUCT_NAME_LENGTH} characters`);
        }
        if (productData.name && productData.name.length > CONSTANTS.VALIDATION.MAX_PRODUCT_NAME_LENGTH) {
            errors.push(`Product name must not exceed ${CONSTANTS.VALIDATION.MAX_PRODUCT_NAME_LENGTH} characters`);
        }

        // Validate description
        if (!productData.description || productData.description.trim().length === 0) {
            errors.push('Description is required');
        }

        // Validate price
        if (!productData.price || productData.price <= 0) {
            errors.push('Valid price is required');
        }

        // Validate category
        if (!productData.category || productData.category.trim().length === 0) {
            errors.push('Category is required');
        }

        // Validate shop ID
        if (!productData.shopId || productData.shopId.trim().length === 0) {
            errors.push('Shop ID is required');
        }

        return {
            isValid: errors.length === 0,
            errors: errors
        };
    },

    /**
     * Validate offer form data
     */
    validateOffer(offerData) {
        const errors = [];

        // Validate offer title
        if (!offerData.title || offerData.title.trim().length === 0) {
            errors.push('Offer title is required');
        }

        // Validate description
        if (!offerData.description || offerData.description.trim().length === 0) {
            errors.push('Description is required');
        }

        // Validate discount
        if (!offerData.discount || offerData.discount <= 0) {
            errors.push('Valid discount is required');
        }

        if (offerData.offerType === CONSTANTS.OFFER_TYPES.PERCENTAGE && offerData.discount > 100) {
            errors.push('Percentage discount cannot exceed 100%');
        }

        // Validate dates
        if (!offerData.startDate) {
            errors.push('Start date is required');
        }
        if (!offerData.endDate) {
            errors.push('End date is required');
        }

        if (offerData.startDate && offerData.endDate) {
            const start = new Date(offerData.startDate);
            const end = new Date(offerData.endDate);
            if (end <= start) {
                errors.push('End date must be after start date');
            }
        }

        return {
            isValid: errors.length === 0,
            errors: errors
        };
    },

    /**
     * Validate category form data
     */
    validateCategory(categoryData) {
        const errors = [];

        // Validate category name
        if (!categoryData.name || categoryData.name.trim().length === 0) {
            errors.push('Category name is required');
        }

        // Validate description
        if (categoryData.description && categoryData.description.length > CONSTANTS.VALIDATION.MAX_DESCRIPTION_LENGTH) {
            errors.push(`Description must not exceed ${CONSTANTS.VALIDATION.MAX_DESCRIPTION_LENGTH} characters`);
        }

        return {
            isValid: errors.length === 0,
            errors: errors
        };
    },

    /**
     * Validate floor form data
     */
    validateFloor(floorData) {
        const errors = [];

        // Validate floor name
        if (!floorData.name || floorData.name.trim().length === 0) {
            errors.push('Floor name is required');
        }

        // Validate floor code
        if (!floorData.code || floorData.code.trim().length === 0) {
            errors.push('Floor code is required');
        }

        // Validate level
        if (floorData.level === undefined || floorData.level === null) {
            errors.push('Floor level is required');
        }

        return {
            isValid: errors.length === 0,
            errors: errors
        };
    },

    /**
     * Validate login form data
     */
    validateLogin(loginData) {
        const errors = [];

        // Validate email
        if (!loginData.email || !Utils.isValidEmail(loginData.email)) {
            errors.push('Valid email is required');
        }

        // Validate password
        if (!loginData.password || loginData.password.length === 0) {
            errors.push('Password is required');
        }

        return {
            isValid: errors.length === 0,
            errors: errors
        };
    },

    /**
     * Display validation errors
     */
    displayErrors(errors, containerId) {
        const container = document.getElementById(containerId);
        if (!container) return;

        container.innerHTML = '';
        
        if (errors.length === 0) {
            container.style.display = 'none';
            return;
        }

        container.style.display = 'block';
        const ul = document.createElement('ul');
        
        errors.forEach(error => {
            const li = document.createElement('li');
            li.textContent = error;
            ul.appendChild(li);
        });

        container.appendChild(ul);
    }
};

// Export for use in other modules
if (typeof module !== 'undefined' && module.exports) {
    module.exports = Validator;
}
