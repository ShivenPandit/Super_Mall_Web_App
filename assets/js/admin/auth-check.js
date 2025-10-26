/**
 * Admin Authentication Check Module
 * Protects admin pages from unauthorized access
 */

(function() {
    // Check authentication on page load
    auth.onAuthStateChanged((user) => {
        if (!user) {
            Logger.warn('Unauthorized access attempt', { 
                module: 'auth-check',
                page: window.location.pathname 
            });
            
            // Redirect to login page
            window.location.href = 'login.html';
        } else {
            Logger.info('User authenticated', { 
                module: 'auth-check',
                userId: user.uid,
                email: user.email
            });

            // Update user email display
            const userEmailElement = document.getElementById('user-email');
            if (userEmailElement) {
                userEmailElement.textContent = user.email;
            }
        }
    });

    // Handle logout
    document.addEventListener('DOMContentLoaded', () => {
        const logoutBtn = document.getElementById('logout-btn');
        if (logoutBtn) {
            logoutBtn.addEventListener('click', async (e) => {
                e.preventDefault();
                
                const confirmed = await Utils.confirm('Are you sure you want to logout?', 'Confirm Logout');
                if (!confirmed) return;

                try {
                    await FirebaseService.signOut();
                    
                    // Clear session storage
                    Utils.storage.remove(CONSTANTS.STORAGE_KEYS.USER_SESSION);
                    
                    Logger.info('User logged out successfully', { module: 'auth-check' });
                    
                    Utils.showToast(CONSTANTS.SUCCESS_MESSAGES.LOGOUT_SUCCESS, 'success');
                    
                    setTimeout(() => {
                        window.location.href = 'login.html';
                    }, 1000);
                    
                } catch (error) {
                    Logger.error('Logout failed', { 
                        module: 'auth-check',
                        error: error.message 
                    });
                    Utils.showToast('Logout failed. Please try again.', 'error');
                }
            });
        }
    });
})();
