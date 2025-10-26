# Low-Level Design (LLD) Document
## Super Mall Web Application

### Document Information
- **Project**: Super Mall Web Application
- **Version**: 1.0.0
- **Date**: October 26, 2025
- **Author**: Development Team

---

## Table of Contents
1. [Introduction](#introduction)
2. [System Components](#system-components)
3. [Module Design](#module-design)
4. [Database Design](#database-design)
5. [API Design](#api-design)
6. [Class Diagrams](#class-diagrams)
7. [Sequence Diagrams](#sequence-diagrams)
8. [Data Flow](#data-flow)
9. [Security Design](#security-design)
10. [Error Handling](#error-handling)

---

## 1. Introduction

### 1.1 Purpose
This document provides a detailed low-level design for the Super Mall Web Application, describing the internal structure, components, and interactions of the system.

### 1.2 Scope
The LLD covers:
- Component-level design
- Module interfaces
- Database schema
- API endpoints
- Algorithm implementations
- Security mechanisms

### 1.3 Technologies
- **Frontend**: HTML5, CSS3, JavaScript (ES6+)
- **Backend**: Firebase (Firestore, Authentication)
- **Hosting**: Firebase Hosting / Netlify / Vercel
- **Version Control**: Git/GitHub

---

## 2. System Components

### 2.1 Component Architecture

```
┌─────────────────────────────────────────────────────────────┐
│                     PRESENTATION LAYER                       │
├─────────────────────────────────────────────────────────────┤
│                                                               │
│  ┌──────────────────┐  ┌──────────────────┐                │
│  │   Admin Module   │  │   User Module    │                │
│  │  - Login         │  │  - Shops         │                │
│  │  - Dashboard     │  │  - Offers        │                │
│  │  - Shops CRUD    │  │  - Categories    │                │
│  │  - Offers CRUD   │  │  - Floors        │                │
│  │  - Categories    │  │  - Search        │                │
│  │  - Floors        │  │  - Filter        │                │
│  └──────────────────┘  └──────────────────┘                │
│                                                               │
└─────────────────────────────────────────────────────────────┘
                            ↓
┌─────────────────────────────────────────────────────────────┐
│                     BUSINESS LOGIC LAYER                     │
├─────────────────────────────────────────────────────────────┤
│                                                               │
│  ┌──────────────┐  ┌──────────────┐  ┌──────────────┐      │
│  │   Utility    │  │  Validation  │  │   Logger     │      │
│  │   Helpers    │  │   Module     │  │   Module     │      │
│  └──────────────┘  └──────────────┘  └──────────────┘      │
│                                                               │
│  ┌──────────────┐  ┌──────────────┐  ┌──────────────┐      │
│  │  Constants   │  │  Auth Check  │  │  Firebase    │      │
│  │   Module     │  │   Module     │  │   Service    │      │
│  └──────────────┘  └──────────────┘  └──────────────┘      │
│                                                               │
└─────────────────────────────────────────────────────────────┘
                            ↓
┌─────────────────────────────────────────────────────────────┐
│                      DATA ACCESS LAYER                       │
├─────────────────────────────────────────────────────────────┤
│                                                               │
│  ┌──────────────────────────────────────────────────┐       │
│  │         Firebase Services                         │       │
│  │  - Firestore Database                            │       │
│  │  - Authentication                                 │       │
│  │  - Cloud Functions (Future)                      │       │
│  └──────────────────────────────────────────────────┘       │
│                                                               │
└─────────────────────────────────────────────────────────────┘
```

---

## 3. Module Design

### 3.1 Logger Module

**File**: `utils/logger.js`

**Purpose**: Centralized logging system for all application activities

**Class**: `Logger`

**Methods**:

```javascript
class Logger {
    // Log levels
    static LOG_LEVELS = {
        DEBUG: 'DEBUG',
        INFO: 'INFO',
        WARN: 'WARN',
        ERROR: 'ERROR',
        FATAL: 'FATAL'
    }

    // Initialize logger
    static init(): void

    // Get all logs
    static getLogs(): Array<LogEntry>

    // Save log entry
    static saveLog(logEntry: LogEntry): void

    // Create log entry
    static createLogEntry(level: string, message: string, metadata: Object): LogEntry

    // Log methods
    static debug(message: string, metadata: Object): void
    static info(message: string, metadata: Object): void
    static warn(message: string, metadata: Object): void
    static error(message: string, metadata: Object): void
    static fatal(message: string, metadata: Object): void

    // Utility methods
    static clearLogs(): void
    static exportLogs(): void
    static getLogsByLevel(level: string): Array<LogEntry>
    static getLogsByTimeRange(startTime: Date, endTime: Date): Array<LogEntry>
    static getLogsByModule(moduleName: string): Array<LogEntry>
}
```

**Data Structure**:
```javascript
interface LogEntry {
    timestamp: string,      // ISO 8601 format
    level: string,          // DEBUG|INFO|WARN|ERROR|FATAL
    message: string,        // Log message
    metadata: {
        module: string,     // Module name
        userId?: string,    // Optional user ID
        error?: string,     // Optional error message
        ...additionalData   // Any additional metadata
    },
    userAgent: string,      // Browser information
    url: string            // Current page URL
}
```

**Storage**: localStorage with key `super_mall_logs`

**Max Logs**: 1000 entries (FIFO when exceeded)

---

### 3.2 Validation Module

**File**: `utils/validation.js`

**Purpose**: Validate all form inputs and data

**Object**: `Validator`

**Methods**:

```javascript
const Validator = {
    // Shop validation
    validateShop(shopData: ShopData): ValidationResult

    // Product validation
    validateProduct(productData: ProductData): ValidationResult

    // Offer validation
    validateOffer(offerData: OfferData): ValidationResult

    // Category validation
    validateCategory(categoryData: CategoryData): ValidationResult

    // Floor validation
    validateFloor(floorData: FloorData): ValidationResult

    // Login validation
    validateLogin(loginData: LoginData): ValidationResult

    // Display validation errors
    displayErrors(errors: Array<string>, containerId: string): void
}
```

**Validation Result**:
```javascript
interface ValidationResult {
    isValid: boolean,
    errors: Array<string>
}
```

**Validation Rules**:
- Shop name: 3-100 characters
- Product name: 3-200 characters
- Description: 1-1000 characters
- Email: Valid email format
- Password: 8-128 characters, at least 1 uppercase, 1 lowercase, 1 number
- Discount: 1-100 for percentage type
- Dates: End date must be after start date

---

### 3.3 Helper Utilities Module

**File**: `utils/helpers.js`

**Purpose**: Common utility functions

**Object**: `Utils`

**Methods**:

```javascript
const Utils = {
    // Date formatting
    formatDate(date: Date|string, format: string): string

    // Currency formatting
    formatCurrency(amount: number, currency: string): string

    // Validation
    isValidEmail(email: string): boolean
    isValidPassword(password: string): ValidationResult

    // Security
    sanitizeHTML(html: string): string

    // Performance
    debounce(func: Function, wait: number): Function
    throttle(func: Function, limit: number): Function

    // Utilities
    generateId(): string
    deepClone(obj: Object): Object
    isEmpty(obj: Object): boolean

    // URL manipulation
    getQueryParam(param: string): string|null
    setQueryParam(param: string, value: string): void

    // UI helpers
    showLoading(containerId: string): void
    hideLoading(containerId: string): void
    showToast(message: string, type: string, duration: number): void
    confirm(message: string, title: string): Promise<boolean>

    // File handling
    validateFile(file: File): ValidationResult
    fileToBase64(file: File): Promise<string>

    // Data manipulation
    calculateDiscount(originalPrice: number, discountedPrice: number): number
    sortArray(array: Array, key: string, order: string): Array
    filterBySearch(array: Array, searchTerm: string, fields: Array<string>): Array
    paginate(array: Array, page: number, pageSize: number): PaginationResult

    // Storage wrapper
    storage: {
        set(key: string, value: any): boolean
        get(key: string, defaultValue: any): any
        remove(key: string): boolean
        clear(): boolean
    }
}
```

---

### 3.4 Firebase Service Module

**File**: `config/firebase-config.js`

**Purpose**: Initialize and manage Firebase services

**Class**: `FirebaseService`

**Methods**:

```javascript
class FirebaseService {
    // Get Firestore instance
    static getDB(): firestore.Firestore

    // Get Auth instance
    static getAuth(): firebase.auth.Auth

    // Check authentication
    static isAuthenticated(): boolean

    // Get current user
    static getCurrentUser(): firebase.User|null

    // Sign out
    static signOut(): Promise<{success: boolean, error?: string}>
}
```

**Configuration**:
```javascript
const firebaseConfig = {
    apiKey: string,
    authDomain: string,
    projectId: string,
    storageBucket: string,
    messagingSenderId: string,
    appId: string,
    measurementId: string
}
```

---

### 3.5 Admin Authentication Module

**File**: `assets/js/admin/auth-check.js`

**Purpose**: Protect admin pages from unauthorized access

**Implementation**:

```javascript
// IIFE to protect global scope
(function() {
    // Check on auth state change
    auth.onAuthStateChanged((user) => {
        if (!user) {
            // Log unauthorized access
            Logger.warn('Unauthorized access attempt', { 
                module: 'auth-check',
                page: window.location.pathname 
            });
            
            // Redirect to login
            window.location.href = 'login.html';
        } else {
            // Update UI with user info
            displayUserInfo(user);
        }
    });

    // Handle logout
    setupLogoutHandler();
})();
```

**Features**:
- Automatic redirect on unauthorized access
- Session validation
- Logout functionality
- User info display

---

### 3.6 Shop Management Module

**File**: `assets/js/admin/shops.js`

**Purpose**: CRUD operations for shops

**State Variables**:
```javascript
let shops = [];           // Array of all shops
let categories = [];      // Array of categories
let floors = [];          // Array of floors
let editingShopId = null; // Currently editing shop ID
```

**Functions**:

```javascript
// Initialize module
async function init(): Promise<void>

// Setup event listeners
function setupEventListeners(): void

// Load data
async function loadCategories(): Promise<void>
async function loadFloors(): Promise<void>
async function loadShops(): Promise<void>

// Display
function displayShops(shops: Array<Shop>): void
function getStatusBadgeClass(status: string): string

// Filter
function filterShops(): void

// Modal operations
function openModal(shop: Shop|null): void
function closeModal(): void

// CRUD operations
async function handleShopSubmit(event: Event): Promise<void>
function editShop(shopId: string): void
async function deleteShop(shopId: string, shopName: string): Promise<void>
```

**Shop Data Model**:
```javascript
interface Shop {
    id: string,
    name: string,
    description: string,
    category: string,
    floor: string,
    contact: string,
    email: string,
    status: 'active' | 'inactive' | 'pending',
    createdAt: Timestamp,
    updatedAt: Timestamp
}
```

---

## 4. Database Design

### 4.1 Firestore Collections

#### 4.1.1 Shops Collection

**Collection Name**: `shops`

**Document Structure**:
```javascript
{
    name: string,              // Shop name (required)
    description: string,       // Shop description (required)
    category: string,          // Category name (required)
    floor: string,             // Floor name (required)
    contact: string,           // Contact number (required)
    email: string,             // Email address (optional)
    status: string,            // 'active' | 'inactive' | 'pending'
    createdAt: Timestamp,      // Auto-generated
    updatedAt: Timestamp       // Auto-updated
}
```

**Indexes**:
- `createdAt` (DESC)
- `status`, `category` (Composite)
- `name` (ASC)

#### 4.1.2 Offers Collection

**Collection Name**: `offers`

**Document Structure**:
```javascript
{
    title: string,             // Offer title (required)
    description: string,       // Offer description (required)
    shopId: string,            // Reference to shop (required)
    shopName: string,          // Denormalized shop name
    offerType: string,         // 'percentage' | 'fixed_amount' | 'bogo' | 'seasonal'
    discount: number,          // Discount value (required)
    startDate: string,         // ISO date string (required)
    endDate: string,           // ISO date string (required)
    createdAt: Timestamp,      // Auto-generated
    updatedAt: Timestamp       // Auto-updated
}
```

**Indexes**:
- `endDate` (ASC)
- `createdAt` (DESC)
- `shopId` (ASC)

#### 4.1.3 Categories Collection

**Collection Name**: `categories`

**Document Structure**:
```javascript
{
    name: string,              // Category name (required, unique)
    description: string,       // Category description (optional)
    icon: string,              // Emoji icon (optional)
    createdAt: Timestamp       // Auto-generated
}
```

**Indexes**:
- `name` (ASC)
- `createdAt` (DESC)

#### 4.1.4 Floors Collection

**Collection Name**: `floors`

**Document Structure**:
```javascript
{
    name: string,              // Floor name (required)
    code: string,              // Floor code (required, e.g., 'G', '1', '2')
    level: number,             // Floor level (required, e.g., 0, 1, -1)
    description: string,       // Floor description (optional)
    createdAt: Timestamp       // Auto-generated
}
```

**Indexes**:
- `level` (ASC)
- `createdAt` (DESC)

### 4.2 Data Relationships

```
┌──────────────┐
│  Categories  │
└──────┬───────┘
       │
       │ 1:N
       │
       ▼
┌──────────────┐         ┌──────────────┐
│    Shops     │◄────────┤    Floors    │
└──────┬───────┘   N:1   └──────────────┘
       │
       │ 1:N
       │
       ▼
┌──────────────┐
│    Offers    │
└──────────────┘
```

---

## 5. API Design

### 5.1 Firebase Firestore Operations

#### 5.1.1 Create Shop

**Function**: `db.collection('shops').add(data)`

**Input**:
```javascript
{
    name: string,
    description: string,
    category: string,
    floor: string,
    contact: string,
    email: string,
    status: string
}
```

**Process**:
1. Validate input data
2. Add timestamps
3. Create document in Firestore
4. Log action
5. Return document reference

**Output**:
```javascript
{
    id: string,
    ...shopData
}
```

#### 5.1.2 Update Shop

**Function**: `db.collection('shops').doc(id).update(data)`

**Input**:
```javascript
{
    id: string,
    ...updatedFields
}
```

**Process**:
1. Validate input data
2. Update timestamp
3. Update document in Firestore
4. Log action
5. Return success/error

#### 5.1.3 Delete Shop

**Function**: `db.collection('shops').doc(id).delete()`

**Input**: `shopId: string`

**Process**:
1. Confirm deletion
2. Delete document
3. Log action
4. Return success/error

#### 5.1.4 Query Shops

**Function**: `db.collection('shops').where(...).orderBy(...).get()`

**Query Parameters**:
- `category`: string
- `floor`: string
- `status`: string
- `orderBy`: 'name' | 'createdAt'
- `limit`: number

**Output**: Array of shop documents

---

## 6. Class Diagrams

### 6.1 Core Classes

```
┌─────────────────────────────────────┐
│            Logger                   │
├─────────────────────────────────────┤
│ - LOG_LEVELS: Object               │
│ - MAX_LOGS: number                 │
│ - STORAGE_KEY: string              │
├─────────────────────────────────────┤
│ + init(): void                      │
│ + getLogs(): LogEntry[]            │
│ + saveLog(entry): void             │
│ + debug(msg, meta): void           │
│ + info(msg, meta): void            │
│ + error(msg, meta): void           │
│ + exportLogs(): void               │
└─────────────────────────────────────┘

┌─────────────────────────────────────┐
│         FirebaseService             │
├─────────────────────────────────────┤
│ - db: Firestore                    │
│ - auth: Auth                       │
├─────────────────────────────────────┤
│ + getDB(): Firestore               │
│ + getAuth(): Auth                  │
│ + isAuthenticated(): boolean       │
│ + getCurrentUser(): User           │
│ + signOut(): Promise               │
└─────────────────────────────────────┘

┌─────────────────────────────────────┐
│           Utils                     │
├─────────────────────────────────────┤
│ + formatDate(): string             │
│ + formatCurrency(): string         │
│ + isValidEmail(): boolean          │
│ + sanitizeHTML(): string           │
│ + debounce(): Function             │
│ + showToast(): void                │
│ + storage: Storage                 │
└─────────────────────────────────────┘
```

---

## 7. Sequence Diagrams

### 7.1 Admin Login Flow

```
User         Login Page      Auth Module     Firebase Auth    Dashboard
 │               │                │                │              │
 │──Enter Creds─>│                │                │              │
 │               │                │                │              │
 │               │──Validate────> │                │              │
 │               │                │                │              │
 │               │<──Valid────────│                │              │
 │               │                │                │              │
 │               │──Submit────────────────────────>│              │
 │               │                │                │              │
 │               │<──Token────────────────────────  │              │
 │               │                │                │              │
 │               │──Store Session>│                │              │
 │               │                │                │              │
 │               │──Redirect───────────────────────────────────> │
 │               │                │                │              │
 │<──Dashboard──────────────────────────────────────────────────│
```

### 7.2 Create Shop Flow

```
Admin     Shop Page    Validation    Firebase     Database
 │            │             │            │            │
 │──Fill Form>│             │            │            │
 │            │             │            │            │
 │──Submit───>│             │            │            │
 │            │             │            │            │
 │            │──Validate──>│            │            │
 │            │             │            │            │
 │            │<──Result────│            │            │
 │            │             │            │            │
 │            │──Create─────────────────>│            │
 │            │             │            │            │
 │            │             │            │──Save─────>│
 │            │             │            │            │
 │            │             │            │<──Success──│
 │            │             │            │            │
 │            │<──Response──────────────  │            │
 │            │             │            │            │
 │<──Success──│             │            │            │
```

---

## 8. Data Flow

### 8.1 User Browse Shops

```
1. User navigates to shops page
2. Page loads categories and floors for filters
3. Page queries Firestore for all active shops
4. Data is transformed and sanitized
5. Shops are rendered in grid layout
6. User applies filters
7. Client-side filtering occurs
8. Filtered results displayed
9. User clicks on shop
10. Navigate to shop details page
```

### 8.2 Admin Create Offer

```
1. Admin opens offer modal
2. Form loads shops list from Firestore
3. Admin fills offer details
4. Client-side validation occurs
5. If valid, submit to Firestore
6. Firestore adds document with timestamp
7. Success response received
8. Local offers array updated
9. UI refreshes to show new offer
10. Success message displayed
11. Log entry created
```

---

## 9. Security Design

### 9.1 Authentication

**Mechanism**: Firebase Authentication (Email/Password)

**Process**:
1. User submits credentials
2. Firebase validates credentials
3. Token generated and stored
4. Token used for subsequent requests
5. Token expires after session timeout

### 9.2 Authorization

**Admin Pages**:
- Protected by auth-check.js middleware
- Checks `auth.currentUser` on page load
- Redirects to login if not authenticated

**Firestore Rules**:
```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    match /{collection}/{document} {
      allow read: if true;  // Public read
      allow write: if request.auth != null;  // Authenticated write only
    }
  }
}
```

### 9.3 Input Sanitization

**XSS Prevention**:
- All user inputs sanitized using `Utils.sanitizeHTML()`
- HTML entities escaped
- Script tags removed
- Content Security Policy headers (in production)

**Validation**:
- Client-side validation for all forms
- Type checking
- Length restrictions
- Format validation (email, dates, etc.)

### 9.4 Data Protection

**Sensitive Data**:
- Passwords never stored in client
- Session tokens in localStorage (HTTPS only in production)
- No credit card or payment data stored

---

## 10. Error Handling

### 10.1 Error Types

**Network Errors**:
```javascript
try {
    await firebase.operation();
} catch (error) {
    if (error.code === 'unavailable') {
        // Network error
        Utils.showToast(CONSTANTS.ERROR_MESSAGES.NETWORK_ERROR, 'error');
        Logger.error('Network error', { module, error: error.message });
    }
}
```

**Authentication Errors**:
```javascript
try {
    await auth.signInWithEmailAndPassword(email, password);
} catch (error) {
    switch (error.code) {
        case 'auth/user-not-found':
        case 'auth/wrong-password':
            message = 'Invalid credentials';
            break;
        case 'auth/too-many-requests':
            message = 'Too many attempts';
            break;
        default:
            message = 'Authentication failed';
    }
    displayError(message);
}
```

**Validation Errors**:
```javascript
const validation = Validator.validateShop(data);
if (!validation.isValid) {
    Validator.displayErrors(validation.errors, 'error-container');
    return;
}
```

### 10.2 Error Logging

All errors logged with:
- Error message
- Error stack trace
- Module name
- User ID (if authenticated)
- Timestamp
- Page URL

### 10.3 User Feedback

**Error Display**:
- Toast notifications for general errors
- Inline form errors for validation
- Modal alerts for critical errors
- Error containers for form submissions

**Success Display**:
- Toast notifications
- Success messages
- UI updates

---

## Appendix

### A. Naming Conventions

**Variables**: camelCase  
**Constants**: UPPER_SNAKE_CASE  
**Functions**: camelCase  
**Classes**: PascalCase  
**Files**: kebab-case.js  
**Collections**: lowercase  

### B. Code Standards

- ES6+ syntax
- JSDoc comments for functions
- Consistent indentation (2 spaces)
- Semicolons required
- Single quotes for strings
- Max line length: 100 characters

---

**Document Version**: 1.0  
**Last Updated**: October 26, 2025  
**Status**: Approved
