# Test Cases - Super Mall Web Application

## Table of Contents
1. [Admin Module Test Cases](#admin-module-test-cases)
2. [User Module Test Cases](#user-module-test-cases)
3. [Utility Module Test Cases](#utility-module-test-cases)
4. [Integration Test Cases](#integration-test-cases)
5. [Security Test Cases](#security-test-cases)
6. [Performance Test Cases](#performance-test-cases)

---

## Admin Module Test Cases

### TC-A001: Admin Login - Successful Login
**Priority**: High  
**Module**: Admin Authentication  
**Test Data**:
- Email: admin@supermall.com
- Password: ValidPassword123!

**Steps**:
1. Navigate to `/admin/login.html`
2. Enter valid email and password
3. Click "Login" button

**Expected Result**:
- User is authenticated successfully
- Redirected to admin dashboard
- Success toast notification appears
- Session is stored in localStorage
- Log entry created

**Status**: ✅ Pass

---

### TC-A002: Admin Login - Invalid Credentials
**Priority**: High  
**Module**: Admin Authentication  
**Test Data**:
- Email: admin@supermall.com
- Password: WrongPassword

**Steps**:
1. Navigate to `/admin/login.html`
2. Enter valid email but wrong password
3. Click "Login" button

**Expected Result**:
- Login fails
- Error message "Invalid email or password" displayed
- User remains on login page
- Error log entry created

**Status**: ✅ Pass

---

### TC-A003: Admin Login - Empty Fields
**Priority**: Medium  
**Module**: Admin Authentication  
**Test Data**:
- Email: (empty)
- Password: (empty)

**Steps**:
1. Navigate to `/admin/login.html`
2. Leave fields empty
3. Click "Login" button

**Expected Result**:
- Validation errors displayed
- "Email is required" message shown
- "Password is required" message shown
- Form not submitted

**Status**: ✅ Pass

---

### TC-A004: Admin Login - Invalid Email Format
**Priority**: Medium  
**Module**: Admin Authentication  
**Test Data**:
- Email: notanemail
- Password: ValidPassword123!

**Steps**:
1. Navigate to `/admin/login.html`
2. Enter invalid email format
3. Click "Login" button

**Expected Result**:
- Validation error: "Valid email is required"
- Form not submitted

**Status**: ✅ Pass

---

### TC-A005: Create Shop - All Valid Data
**Priority**: High  
**Module**: Shop Management  
**Test Data**:
- Shop Name: Electronics Hub
- Description: Best electronics in town
- Category: Electronics
- Floor: Ground Floor
- Contact: +1234567890
- Email: electronics@supermall.com
- Status: Active

**Steps**:
1. Login as admin
2. Navigate to "Manage Shops"
3. Click "+ Add New Shop"
4. Fill all fields with valid data
5. Click "Save Shop"

**Expected Result**:
- Shop created in Firestore
- Success message displayed
- Shop appears in shop list
- Modal closes
- Log entry created

**Status**: ✅ Pass

---

### TC-A006: Create Shop - Missing Required Fields
**Priority**: High  
**Module**: Shop Management  
**Test Data**:
- Shop Name: (empty)
- Description: Test

**Steps**:
1. Login as admin
2. Navigate to "Manage Shops"
3. Click "+ Add New Shop"
4. Leave required fields empty
5. Click "Save Shop"

**Expected Result**:
- Validation errors displayed
- Form not submitted
- Error messages for each missing field

**Status**: ✅ Pass

---

### TC-A007: Update Shop - Modify Existing Shop
**Priority**: High  
**Module**: Shop Management  
**Test Data**:
- Existing shop: Electronics Hub
- New name: Electronics Hub Pro

**Steps**:
1. Login as admin
2. Navigate to "Manage Shops"
3. Click "Edit" on existing shop
4. Modify shop name
5. Click "Save Shop"

**Expected Result**:
- Shop updated in Firestore
- Success message displayed
- Updated data reflected in list
- updatedAt timestamp changed

**Status**: ✅ Pass

---

### TC-A008: Delete Shop - Confirm Deletion
**Priority**: High  
**Module**: Shop Management  
**Test Data**:
- Shop to delete: Test Shop

**Steps**:
1. Login as admin
2. Navigate to "Manage Shops"
3. Click "Delete" on a shop
4. Confirm deletion in dialog

**Expected Result**:
- Confirmation dialog appears
- Shop deleted from Firestore
- Success message displayed
- Shop removed from list
- Log entry created

**Status**: ✅ Pass

---

### TC-A009: Delete Shop - Cancel Deletion
**Priority**: Medium  
**Module**: Shop Management  

**Steps**:
1. Login as admin
2. Navigate to "Manage Shops"
3. Click "Delete" on a shop
4. Click "Cancel" in confirmation dialog

**Expected Result**:
- Shop NOT deleted
- No changes to database
- Shop remains in list

**Status**: ✅ Pass

---

### TC-A010: Filter Shops - By Category
**Priority**: Medium  
**Module**: Shop Management  
**Test Data**:
- Filter: Category = Electronics

**Steps**:
1. Login as admin
2. Navigate to "Manage Shops"
3. Select "Electronics" from category filter

**Expected Result**:
- Only electronics shops displayed
- Other category shops hidden
- Filter state maintained

**Status**: ✅ Pass

---

### TC-A011: Search Shops - By Name
**Priority**: Medium  
**Module**: Shop Management  
**Test Data**:
- Search term: "Electronics"

**Steps**:
1. Login as admin
2. Navigate to "Manage Shops"
3. Enter "Electronics" in search box

**Expected Result**:
- Shops with "Electronics" in name displayed
- Results update in real-time (debounced)
- Other shops hidden

**Status**: ✅ Pass

---

### TC-A012: Create Offer - Valid Data
**Priority**: High  
**Module**: Offer Management  
**Test Data**:
- Title: Summer Sale
- Description: Get 50% off
- Shop: Electronics Hub
- Offer Type: Percentage
- Discount: 50
- Start Date: 2025-06-01
- End Date: 2025-08-31

**Steps**:
1. Login as admin
2. Navigate to "Manage Offers"
3. Click "+ Add New Offer"
4. Fill all fields
5. Click "Save Offer"

**Expected Result**:
- Offer created in Firestore
- Success message displayed
- Offer appears in offers grid
- Log entry created

**Status**: ✅ Pass

---

### TC-A013: Create Offer - Invalid Date Range
**Priority**: High  
**Module**: Offer Management  
**Test Data**:
- Start Date: 2025-08-31
- End Date: 2025-06-01

**Steps**:
1. Login as admin
2. Navigate to "Manage Offers"
3. Click "+ Add New Offer"
4. Enter end date before start date
5. Click "Save Offer"

**Expected Result**:
- Validation error: "End date must be after start date"
- Form not submitted

**Status**: ✅ Pass

---

### TC-A014: Create Offer - Percentage > 100%
**Priority**: Medium  
**Module**: Offer Management  
**Test Data**:
- Offer Type: Percentage
- Discount: 150

**Steps**:
1. Login as admin
2. Navigate to "Manage Offers"
3. Click "+ Add New Offer"
4. Enter discount > 100%
5. Click "Save Offer"

**Expected Result**:
- Validation error: "Percentage discount cannot exceed 100%"
- Form not submitted

**Status**: ✅ Pass

---

### TC-A015: Create Category - Valid Data
**Priority**: High  
**Module**: Category Management  
**Test Data**:
- Name: Sports & Fitness
- Description: Sports equipment and fitness gear
- Icon: 🏋️

**Steps**:
1. Login as admin
2. Navigate to "Manage Categories"
3. Click "+ Add New Category"
4. Fill all fields
5. Click "Save Category"

**Expected Result**:
- Category created in Firestore
- Success message displayed
- Category appears in grid
- Icon displayed correctly

**Status**: ✅ Pass

---

### TC-A016: Create Floor - Valid Data
**Priority**: High  
**Module**: Floor Management  
**Test Data**:
- Name: Third Floor
- Code: 3
- Level: 3
- Description: Fashion and accessories

**Steps**:
1. Login as admin
2. Navigate to "Manage Floors"
3. Click "+ Add New Floor"
4. Fill all fields
5. Click "Save Floor"

**Expected Result**:
- Floor created in Firestore
- Success message displayed
- Floor appears in grid

**Status**: ✅ Pass

---

### TC-A017: Dashboard - Load Statistics
**Priority**: High  
**Module**: Admin Dashboard  

**Steps**:
1. Login as admin
2. Navigate to dashboard

**Expected Result**:
- Total shops count displayed
- Total products count displayed
- Active offers count displayed
- Total categories count displayed
- Recent shops table populated
- Active offers table populated

**Status**: ✅ Pass

---

### TC-A018: Admin Logout
**Priority**: High  
**Module**: Admin Authentication  

**Steps**:
1. Login as admin
2. Click "Logout" from sidebar
3. Confirm logout

**Expected Result**:
- User logged out from Firebase
- Session cleared from localStorage
- Redirected to login page
- Success message displayed
- Log entry created

**Status**: ✅ Pass

---

## User Module Test Cases

### TC-U001: Browse All Shops
**Priority**: High  
**Module**: User - Shop Browsing  

**Steps**:
1. Navigate to home page
2. Click "Browse Shops"

**Expected Result**:
- All active shops displayed
- Shop cards show name, category, floor, description
- Shops are clickable

**Status**: ✅ Pass

---

### TC-U002: Filter Shops by Category
**Priority**: High  
**Module**: User - Shop Browsing  
**Test Data**:
- Category: Electronics

**Steps**:
1. Navigate to shops page
2. Select "Electronics" from category filter

**Expected Result**:
- Only electronics shops displayed
- Filter state maintained
- Count updated

**Status**: ✅ Pass

---

### TC-U003: Filter Shops by Floor
**Priority**: High  
**Module**: User - Shop Browsing  
**Test Data**:
- Floor: Ground Floor

**Steps**:
1. Navigate to shops page
2. Select "Ground Floor" from floor filter

**Expected Result**:
- Only ground floor shops displayed
- Filter applied correctly

**Status**: ✅ Pass

---

### TC-U004: Search Shops
**Priority**: High  
**Module**: User - Shop Browsing  
**Test Data**:
- Search term: "Fashion"

**Steps**:
1. Navigate to shops page
2. Enter "Fashion" in search box

**Expected Result**:
- Shops matching "Fashion" displayed
- Real-time search (debounced)
- Results filtered correctly

**Status**: ✅ Pass

---

### TC-U005: View Shop Details
**Priority**: High  
**Module**: User - Shop Browsing  

**Steps**:
1. Navigate to shops page
2. Click on a shop card

**Expected Result**:
- Redirected to shop details page
- Shop information displayed
- Products listed (if available)
- Contact information shown

**Status**: ✅ Pass

---

### TC-U006: Browse Active Offers
**Priority**: High  
**Module**: User - Offers  

**Steps**:
1. Navigate to offers page

**Expected Result**:
- Only active offers displayed (end date >= today)
- Offer cards show title, discount, dates
- Shop name displayed

**Status**: ✅ Pass

---

### TC-U007: Filter Offers by Shop
**Priority**: Medium  
**Module**: User - Offers  
**Test Data**:
- Shop: Electronics Hub

**Steps**:
1. Navigate to offers page
2. Select shop from filter

**Expected Result**:
- Only offers for selected shop displayed
- Filter applied correctly

**Status**: ✅ Pass

---

### TC-U008: Browse Categories
**Priority**: High  
**Module**: User - Categories  

**Steps**:
1. Navigate to categories page

**Expected Result**:
- All categories displayed as cards
- Category icons shown
- Categories are clickable

**Status**: ✅ Pass

---

### TC-U009: View Category Shops
**Priority**: High  
**Module**: User - Categories  
**Test Data**:
- Category: Electronics

**Steps**:
1. Navigate to categories page
2. Click on "Electronics" category

**Expected Result**:
- Filtered to show only electronics shops
- Category name displayed as page title

**Status**: ✅ Pass

---

### TC-U010: Browse Floors
**Priority**: High  
**Module**: User - Floors  

**Steps**:
1. Navigate to floors page

**Expected Result**:
- All floors displayed
- Floors sorted by level
- Floor information shown

**Status**: ✅ Pass

---

## Utility Module Test Cases

### TC-UT001: Logger - Info Log
**Priority**: High  
**Module**: Logger Utility  

**Steps**:
1. Call `Logger.info('Test message', {key: 'value'})`
2. Check localStorage

**Expected Result**:
- Log entry created
- Timestamp added
- Level set to INFO
- Metadata stored
- Console.info called

**Status**: ✅ Pass

---

### TC-UT002: Logger - Error Log
**Priority**: High  
**Module**: Logger Utility  

**Steps**:
1. Call `Logger.error('Error occurred', {error: 'details'})`
2. Check localStorage

**Expected Result**:
- Log entry created
- Level set to ERROR
- Error details stored
- Console.error called

**Status**: ✅ Pass

---

### TC-UT003: Logger - Export Logs
**Priority**: Medium  
**Module**: Logger Utility  

**Steps**:
1. Create several log entries
2. Call `Logger.exportLogs()`

**Expected Result**:
- JSON file downloaded
- All logs included
- File named with timestamp

**Status**: ✅ Pass

---

### TC-UT004: Validation - Valid Email
**Priority**: High  
**Module**: Validation Utility  
**Test Data**:
- Email: test@example.com

**Steps**:
1. Call `Utils.isValidEmail('test@example.com')`

**Expected Result**:
- Returns true

**Status**: ✅ Pass

---

### TC-UT005: Validation - Invalid Email
**Priority**: High  
**Module**: Validation Utility  
**Test Data**:
- Email: notanemail

**Steps**:
1. Call `Utils.isValidEmail('notanemail')`

**Expected Result**:
- Returns false

**Status**: ✅ Pass

---

### TC-UT006: Format Currency
**Priority**: Medium  
**Module**: Helper Utility  
**Test Data**:
- Amount: 1234.56

**Steps**:
1. Call `Utils.formatCurrency(1234.56)`

**Expected Result**:
- Returns "₹1,234.56"

**Status**: ✅ Pass

---

### TC-UT007: Format Date
**Priority**: Medium  
**Module**: Helper Utility  
**Test Data**:
- Date: 2025-10-26

**Steps**:
1. Call `Utils.formatDate('2025-10-26', 'DD/MM/YYYY')`

**Expected Result**:
- Returns "26/10/2025"

**Status**: ✅ Pass

---

### TC-UT008: Sanitize HTML
**Priority**: High  
**Module**: Helper Utility  
**Test Data**:
- Input: `<script>alert('XSS')</script>`

**Steps**:
1. Call `Utils.sanitizeHTML("<script>alert('XSS')</script>")`

**Expected Result**:
- Returns sanitized text without script tags

**Status**: ✅ Pass

---

## Integration Test Cases

### TC-I001: Create Shop and Assign to Category
**Priority**: High  

**Steps**:
1. Create a new category
2. Create a shop in that category
3. Filter shops by category

**Expected Result**:
- Shop appears in category filter
- Relationship maintained

**Status**: ✅ Pass

---

### TC-I002: Create Offer for Shop
**Priority**: High  

**Steps**:
1. Create a shop
2. Create an offer for that shop
3. View offers page

**Expected Result**:
- Offer linked to shop
- Shop name displayed in offer

**Status**: ✅ Pass

---

### TC-I003: Shop Floor Assignment
**Priority**: High  

**Steps**:
1. Create a floor
2. Create a shop on that floor
3. Filter by floor

**Expected Result**:
- Shop appears when filtering by floor

**Status**: ✅ Pass

---

## Security Test Cases

### TC-S001: Unauthorized Access to Admin Pages
**Priority**: Critical  

**Steps**:
1. Without logging in, try to access `/admin/dashboard.html`

**Expected Result**:
- Redirected to login page
- Warning log created

**Status**: ✅ Pass

---

### TC-S002: XSS Prevention in Shop Name
**Priority**: Critical  
**Test Data**:
- Shop Name: `<script>alert('XSS')</script>`

**Steps**:
1. Try to create shop with script in name
2. View shop in list

**Expected Result**:
- Script tags sanitized
- No script execution

**Status**: ✅ Pass

---

### TC-S003: SQL Injection Prevention
**Priority**: Critical  
**Note**: Using Firestore (NoSQL), SQL injection not applicable

**Status**: N/A

---

### TC-S004: Session Expiry
**Priority**: High  

**Steps**:
1. Login as admin
2. Clear Firebase auth manually
3. Try to access admin page

**Expected Result**:
- Session detected as invalid
- Redirected to login

**Status**: ✅ Pass

---

## Performance Test Cases

### TC-P001: Load 100 Shops
**Priority**: Medium  

**Steps**:
1. Create 100 shops in database
2. Navigate to shops page
3. Measure load time

**Expected Result**:
- Page loads in < 3 seconds
- All shops displayed correctly

**Status**: ✅ Pass

---

### TC-P002: Search Debouncing
**Priority**: Medium  

**Steps**:
1. Navigate to shops page
2. Type quickly in search box
3. Observe number of queries

**Expected Result**:
- Queries debounced (300ms)
- Not every keystroke triggers search

**Status**: ✅ Pass

---

### TC-P003: Pagination Performance
**Priority**: Low  

**Steps**:
1. Load page with many items
2. Navigate through pages

**Expected Result**:
- Only 12 items loaded per page
- Smooth navigation

**Status**: ✅ Pass

---

## Summary

| Module | Total | Passed | Failed | Pending |
|--------|-------|--------|--------|---------|
| Admin Auth | 4 | 4 | 0 | 0 |
| Shop Management | 9 | 9 | 0 | 0 |
| Offer Management | 3 | 3 | 0 | 0 |
| Category Management | 1 | 1 | 0 | 0 |
| Floor Management | 1 | 1 | 0 | 0 |
| Dashboard | 1 | 1 | 0 | 0 |
| User Module | 10 | 10 | 0 | 0 |
| Utilities | 8 | 8 | 0 | 0 |
| Integration | 3 | 3 | 0 | 0 |
| Security | 4 | 3 | 0 | 1 |
| Performance | 3 | 3 | 0 | 0 |
| **TOTAL** | **47** | **46** | **0** | **1** |

---

**Test Coverage**: 98%  
**Last Updated**: October 26, 2025  
**Tested By**: QA Team
