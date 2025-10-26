/**
 * Admin Login Module
 * Handles admin authentication
 */

document.addEventListener('DOMContentLoaded', () => {
    Logger.info('Admin login page loaded', { module: 'admin-login' });

    const loginForm = document.getElementById('login-form');
    const emailInput = document.getElementById('email');
    const passwordInput = document.getElementById('password');
    const errorContainer = document.getElementById('error-container');

    // Handle form submission
    loginForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        
        const loginData = {
            email: emailInput.value.trim(),
            password: passwordInput.value
        };

        // Validate form data
        const validation = Validator.validateLogin(loginData);
        if (!validation.isValid) {
            Validator.displayErrors(validation.errors, 'error-container');
            Logger.warn('Login validation failed', { 
                module: 'admin-login',
                errors: validation.errors 
            });
            return;
        }

        // Clear errors
        errorContainer.style.display = 'none';
        errorContainer.innerHTML = '';

        // Show loading
        Utils.showLoading();

        try {
            // Authenticate with Firebase
            const userCredential = await auth.signInWithEmailAndPassword(
                loginData.email,
                loginData.password
            );

            Logger.info('Admin login successful', { 
                module: 'admin-login',
                userId: userCredential.user.uid,
                email: loginData.email
            });

            // Store session
            Utils.storage.set(CONSTANTS.STORAGE_KEYS.USER_SESSION, {
                uid: userCredential.user.uid,
                email: userCredential.user.email,
                loginTime: new Date().toISOString()
            });

            // Show success message
            Utils.showToast(CONSTANTS.SUCCESS_MESSAGES.LOGIN_SUCCESS, 'success');

            // Redirect to dashboard
            setTimeout(() => {
                window.location.href = 'dashboard.html';
            }, 1000);

        } catch (error) {
            Utils.hideLoading();
            
            Logger.error('Admin login failed', { 
                module: 'admin-login',
                error: error.message,
                code: error.code
            });

            let errorMessage = CONSTANTS.ERROR_MESSAGES.INVALID_CREDENTIALS;
            
            if (error.code === 'auth/user-not-found' || error.code === 'auth/wrong-password') {
                errorMessage = 'Invalid email or password';
            } else if (error.code === 'auth/too-many-requests') {
                errorMessage = 'Too many failed attempts. Please try again later.';
            } else if (error.code === 'auth/network-request-failed') {
                errorMessage = CONSTANTS.ERROR_MESSAGES.NETWORK_ERROR;
            }

            Validator.displayErrors([errorMessage], 'error-container');
        }
    });

    // Check if already logged in
    auth.onAuthStateChanged((user) => {
        if (user) {
            Logger.info('User already logged in, redirecting to dashboard', { 
                module: 'admin-login',
                userId: user.uid 
            });
            window.location.href = 'dashboard.html';
        }
    });
});
