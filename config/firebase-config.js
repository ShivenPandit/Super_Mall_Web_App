/**
 * Firebase Configuration Module
 * Initializes Firebase services for the Super Mall Application
 */

// Firebase configuration object
// IMPORTANT: Replace these values with your actual Firebase project credentials
const firebaseConfig = {
    apiKey: "YOUR_API_KEY_HERE",
    authDomain: "YOUR_AUTH_DOMAIN_HERE",
    projectId: "YOUR_PROJECT_ID_HERE",
    storageBucket: "YOUR_STORAGE_BUCKET_HERE",
    messagingSenderId: "YOUR_MESSAGING_SENDER_ID_HERE",
    appId: "YOUR_APP_ID_HERE",
    measurementId: "YOUR_MEASUREMENT_ID_HERE"
};

// Initialize Firebase
let app, db, auth;

try {
    // Initialize Firebase App
    app = firebase.initializeApp(firebaseConfig);
    
    // Initialize Firestore Database
    db = firebase.firestore();
    
    // Initialize Firebase Authentication
    auth = firebase.auth();
    
    // Log successful initialization
    Logger.info('Firebase initialized successfully', { module: 'firebase-config' });
    
    console.log('Firebase initialized successfully');
} catch (error) {
    Logger.error('Failed to initialize Firebase', { 
        module: 'firebase-config', 
        error: error.message,
        stack: error.stack
    });
    console.error('Firebase initialization error:', error);
}

/**
 * Firebase Service Class
 * Provides methods for interacting with Firebase services
 */
class FirebaseService {
    /**
     * Get Firestore database instance
     */
    static getDB() {
        return db;
    }

    /**
     * Get Firebase Auth instance
     */
    static getAuth() {
        return auth;
    }

    /**
     * Check if user is authenticated
     */
    static isAuthenticated() {
        return auth.currentUser !== null;
    }

    /**
     * Get current user
     */
    static getCurrentUser() {
        return auth.currentUser;
    }

    /**
     * Sign out current user
     */
    static async signOut() {
        try {
            await auth.signOut();
            Logger.info('User signed out successfully', { module: 'firebase-service' });
            return { success: true };
        } catch (error) {
            Logger.error('Sign out failed', { 
                module: 'firebase-service', 
                error: error.message 
            });
            return { success: false, error: error.message };
        }
    }
}

// Export for use in other modules
if (typeof module !== 'undefined' && module.exports) {
    module.exports = { FirebaseService, db, auth };
}
