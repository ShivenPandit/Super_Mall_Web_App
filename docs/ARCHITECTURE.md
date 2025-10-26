# System Architecture Document
## Super Mall Web Application

### Document Information
- **Project**: Super Mall Web Application  
- **Version**: 1.0.0  
- **Date**: October 26, 2025  
- **Status**: Final

---

## Table of Contents
1. [Executive Summary](#executive-summary)
2. [System Overview](#system-overview)
3. [Architecture Patterns](#architecture-patterns)
4. [Component Architecture](#component-architecture)
5. [Data Architecture](#data-architecture)
6. [Security Architecture](#security-architecture)
7. [Deployment Architecture](#deployment-architecture)
8. [Performance & Scalability](#performance--scalability)
9. [Technology Stack](#technology-stack)

---

## 1. Executive Summary

### 1.1 Purpose
The Super Mall Web Application is designed to provide a comprehensive digital platform for managing and browsing a shopping mall. It enables administrators to manage shops, offers, categories, and floors while providing users with an intuitive interface to explore and discover shops and deals.

### 1.2 Key Features
- **Admin Management**: Complete CRUD operations for shops, offers, categories, and floors
- **User Exploration**: Browse shops by category, floor, and active offers
- **Real-time Updates**: Live data synchronization using Firebase Firestore
- **Security**: Firebase Authentication with role-based access control
- **Logging**: Comprehensive activity logging for debugging and analytics
- **Responsive Design**: Mobile-first approach for all devices

### 1.3 Architecture Goals
- **Modularity**: Clean separation of concerns
- **Scalability**: Support for growth in data and users
- **Maintainability**: Easy to update and extend
- **Security**: Protection against common web vulnerabilities
- **Performance**: Fast load times and smooth user experience

---

## 2. System Overview

### 2.1 High-Level Architecture

```
┌────────────────────────────────────────────────────────────────┐
│                         CLIENT TIER                             │
│                                                                 │
│  ┌──────────────┐  ┌──────────────┐  ┌──────────────┐        │
│  │   Browser    │  │    Mobile    │  │    Tablet    │        │
│  │   Desktop    │  │    Browser   │  │    Browser   │        │
│  └──────────────┘  └──────────────┘  └──────────────┘        │
│                          │                                      │
└──────────────────────────┼──────────────────────────────────────┘
                           │ HTTPS
                           ▼
┌────────────────────────────────────────────────────────────────┐
│                    WEB APPLICATION TIER                         │
│                                                                 │
│  ┌──────────────────────────────────────────────────────┐     │
│  │           Static Web Application                      │     │
│  │  • HTML5 Pages                                       │     │
│  │  • CSS3 Styling                                      │     │
│  │  • JavaScript (ES6+) Logic                          │     │
│  └──────────────────────────────────────────────────────┘     │
│                          │                                      │
└──────────────────────────┼──────────────────────────────────────┘
                           │ SDK
                           ▼
┌────────────────────────────────────────────────────────────────┐
│                    FIREBASE SERVICES TIER                       │
│                                                                 │
│  ┌──────────────┐  ┌──────────────┐  ┌──────────────┐        │
│  │  Firestore   │  │ Authentication│ │   Hosting    │        │
│  │   Database   │  │    Service    │ │   Service    │        │
│  └──────────────┘  └──────────────┘  └──────────────┘        │
│                                                                 │
└────────────────────────────────────────────────────────────────┘
```

### 2.2 System Context

**Users**:
- **Administrators**: Manage mall data
- **End Users**: Browse shops and offers
- **Mall Merchants**: (Future) Manage their own shops

**External Systems**:
- **Firebase**: Backend services
- **CDN**: Firebase CDN for global content delivery
- **Browser Storage**: localStorage for logs and session

---

## 3. Architecture Patterns

### 3.1 Architectural Style

**Pattern**: Client-Side MVC (Model-View-Controller)

**Justification**:
- Separation of concerns between data, presentation, and logic
- Easier testing and maintenance
- Clear responsibility boundaries

**Implementation**:
- **Model**: Firebase Firestore data
- **View**: HTML templates and dynamic rendering
- **Controller**: JavaScript modules handling business logic

### 3.2 Layered Architecture

```
┌─────────────────────────────────────────────────────┐
│             PRESENTATION LAYER                       │
│  Responsibilities:                                   │
│  • User Interface                                   │
│  • User Input Handling                              │
│  • Display Logic                                    │
└─────────────────────────────────────────────────────┘
                        ↓
┌─────────────────────────────────────────────────────┐
│            BUSINESS LOGIC LAYER                      │
│  Responsibilities:                                   │
│  • Data Validation                                  │
│  • Business Rules                                   │
│  • Workflow Management                              │
│  • Logging                                          │
└─────────────────────────────────────────────────────┘
                        ↓
┌─────────────────────────────────────────────────────┐
│             DATA ACCESS LAYER                        │
│  Responsibilities:                                   │
│  • Firebase SDK Integration                         │
│  • CRUD Operations                                  │
│  • Query Execution                                  │
│  • Data Transformation                              │
└─────────────────────────────────────────────────────┘
                        ↓
┌─────────────────────────────────────────────────────┐
│              DATA STORAGE LAYER                      │
│  Responsibilities:                                   │
│  • Cloud Firestore (NoSQL)                          │
│  • Firebase Authentication                          │
│  • Browser localStorage                             │
└─────────────────────────────────────────────────────┘
```

### 3.3 Design Patterns Used

**1. Module Pattern**
- Encapsulation of functionality
- Private and public members
- Used in all utility modules

**2. Singleton Pattern**
- Logger instance
- Firebase service instance
- Constants object

**3. Observer Pattern**
- Firebase real-time listeners
- Auth state changes
- Event listeners

**4. Factory Pattern**
- Creating shop/offer/category cards
- Log entry creation

**5. Facade Pattern**
- Utils helper functions
- Firebase service wrapper

---

## 4. Component Architecture

### 4.1 Component Diagram

```
┌────────────────────────────────────────────────────────┐
│                   ADMIN COMPONENTS                      │
├────────────────────────────────────────────────────────┤
│                                                         │
│  ┌──────────────┐  ┌──────────────┐  ┌─────────────┐ │
│  │    Login     │  │  Dashboard   │  │    Shops    │ │
│  │  Component   │  │  Component   │  │  Component  │ │
│  └──────────────┘  └──────────────┘  └─────────────┘ │
│                                                         │
│  ┌──────────────┐  ┌──────────────┐  ┌─────────────┐ │
│  │   Offers     │  │ Categories   │  │   Floors    │ │
│  │  Component   │  │  Component   │  │  Component  │ │
│  └──────────────┘  └──────────────┘  └─────────────┘ │
│                                                         │
└────────────────────────────────────────────────────────┘

┌────────────────────────────────────────────────────────┐
│                   USER COMPONENTS                       │
├────────────────────────────────────────────────────────┤
│                                                         │
│  ┌──────────────┐  ┌──────────────┐  ┌─────────────┐ │
│  │    Home      │  │    Shops     │  │   Offers    │ │
│  │  Component   │  │  Component   │  │  Component  │ │
│  └──────────────┘  └──────────────┘  └─────────────┘ │
│                                                         │
│  ┌──────────────┐  ┌──────────────┐                   │
│  │ Categories   │  │   Floors     │                   │
│  │  Component   │  │  Component   │                   │
│  └──────────────┘  └──────────────┘                   │
│                                                         │
└────────────────────────────────────────────────────────┘

┌────────────────────────────────────────────────────────┐
│                 SHARED COMPONENTS                       │
├────────────────────────────────────────────────────────┤
│                                                         │
│  ┌──────────────┐  ┌──────────────┐  ┌─────────────┐ │
│  │    Logger    │  │  Validator   │  │   Helpers   │ │
│  │    Module    │  │    Module    │  │   Module    │ │
│  └──────────────┘  └──────────────┘  └─────────────┘ │
│                                                         │
│  ┌──────────────┐  ┌──────────────┐                   │
│  │  Constants   │  │   Firebase   │                   │
│  │    Module    │  │   Service    │                   │
│  └──────────────┘  └──────────────┘                   │
│                                                         │
└────────────────────────────────────────────────────────┘
```

### 4.2 Component Responsibilities

**Admin Login Component**:
- User authentication
- Session management
- Error handling
- Redirect to dashboard

**Dashboard Component**:
- Display statistics
- Show recent activities
- Quick navigation

**Shop Management Component**:
- List all shops
- Create/Edit/Delete shops
- Filter and search
- Category/Floor assignment

**Offer Management Component**:
- List all offers
- Create/Edit/Delete offers
- Associate with shops
- Date validation

**User Shops Component**:
- Display active shops
- Filter by category/floor
- Search functionality
- Navigate to details

**Shared Logger Component**:
- Centralized logging
- Multiple log levels
- Export functionality
- Filter and search logs

---

## 5. Data Architecture

### 5.1 Data Model

```
┌──────────────────────────────────────────────────────┐
│                    CATEGORIES                         │
│  • id (auto)                                         │
│  • name                                              │
│  • description                                       │
│  • icon                                              │
│  • createdAt                                         │
└─────────────┬────────────────────────────────────────┘
              │ 1:N
              ▼
┌──────────────────────────────────────────────────────┐
│                      SHOPS                            │
│  • id (auto)                                         │
│  • name                                              │
│  • description                                       │
│  • category (FK to Categories.name)                 │
│  • floor (FK to Floors.name)                        │
│  • contact                                           │
│  • email                                             │
│  • status                                            │
│  • createdAt                                         │
│  • updatedAt                                         │
└─────────────┬────────────────────────────────────────┘
              │ 1:N
              ▼
┌──────────────────────────────────────────────────────┐
│                     OFFERS                            │
│  • id (auto)                                         │
│  • title                                             │
│  • description                                       │
│  • shopId (FK to Shops.id)                          │
│  • shopName (denormalized)                          │
│  • offerType                                         │
│  • discount                                          │
│  • startDate                                         │
│  • endDate                                           │
│  • createdAt                                         │
│  • updatedAt                                         │
└──────────────────────────────────────────────────────┘

┌──────────────────────────────────────────────────────┐
│                     FLOORS                            │
│  • id (auto)                                         │
│  • name                                              │
│  • code                                              │
│  • level                                             │
│  • description                                       │
│  • createdAt                                         │
└─────────────┬────────────────────────────────────────┘
              │ 1:N
              └───────────────────────┐
                                      │
                                (Referenced by Shops)
```

### 5.2 Data Storage Strategy

**Primary Database**: Cloud Firestore (NoSQL)

**Advantages**:
- Real-time synchronization
- Scalable
- Serverless
- Built-in security rules
- Offline support

**Client-Side Storage**: localStorage

**Usage**:
- Application logs
- User session
- Temporary filters
- UI preferences

**Storage Limits**:
- localStorage: ~5-10MB per domain
- Firestore: Unlimited (pay as you go)

---

## 6. Security Architecture

### 6.1 Security Layers

```
┌────────────────────────────────────────────────────┐
│         TRANSPORT SECURITY (HTTPS/TLS)             │
└────────────────────────────────────────────────────┘
                        ↓
┌────────────────────────────────────────────────────┐
│        AUTHENTICATION (Firebase Auth)              │
│  • Email/Password                                  │
│  • JWT Tokens                                      │
│  • Session Management                              │
└────────────────────────────────────────────────────┘
                        ↓
┌────────────────────────────────────────────────────┐
│      AUTHORIZATION (Auth Check Middleware)         │
│  • Admin Page Protection                           │
│  • Auth State Validation                           │
└────────────────────────────────────────────────────┘
                        ↓
┌────────────────────────────────────────────────────┐
│      DATA SECURITY (Firestore Rules)               │
│  • Read: Public                                    │
│  • Write: Authenticated Users Only                 │
└────────────────────────────────────────────────────┘
                        ↓
┌────────────────────────────────────────────────────┐
│       INPUT VALIDATION & SANITIZATION              │
│  • Client-side Validation                          │
│  • HTML Sanitization                               │
│  • XSS Prevention                                  │
└────────────────────────────────────────────────────┘
```

### 6.2 Threat Model

**Threats**:
1. Unauthorized Access
2. XSS Attacks
3. Data Breach
4. CSRF Attacks
5. Session Hijacking

**Mitigations**:
1. Firebase Authentication + Auth Middleware
2. Input Sanitization (`Utils.sanitizeHTML()`)
3. Firestore Security Rules
4. SameSite Cookies (Production)
5. HTTPS Only (Production)

---

## 7. Deployment Architecture

### 7.1 Deployment Options

#### Option 1: Firebase Hosting (Recommended)

```
┌──────────────────────────────────────────────────┐
│           Firebase Hosting CDN                    │
│  • Global Distribution                            │
│  • Automatic SSL                                  │
│  • CDN Caching                                    │
└─────────────┬────────────────────────────────────┘
              │
              ▼
┌──────────────────────────────────────────────────┐
│         Static Web Application                    │
│  • HTML/CSS/JS Files                             │
│  • Assets (Images, Icons)                        │
└─────────────┬────────────────────────────────────┘
              │
              ▼
┌──────────────────────────────────────────────────┐
│           Firebase Services                       │
│  • Firestore Database                            │
│  • Authentication                                 │
└──────────────────────────────────────────────────┘
```

**Benefits**:
- Tight integration with Firebase services
- Automatic SSL certificates
- Global CDN
- Easy deployment (`firebase deploy`)
- Free tier available

#### Option 2: Netlify

**Benefits**:
- Continuous deployment from Git
- Branch previews
- Built-in form handling
- Serverless functions

#### Option 3: Vercel

**Benefits**:
- Optimized for frontend frameworks
- Edge caching
- Zero-config deployments
- Analytics included

### 7.2 CI/CD Pipeline

```
┌──────────┐     ┌──────────┐     ┌──────────┐     ┌──────────┐
│  Develop │────>│   Commit │────>│   Build  │────>│  Deploy  │
│   Code   │     │  to Git  │     │   & Test │     │   Live   │
└──────────┘     └──────────┘     └──────────┘     └──────────┘
                                        │
                                        ▼
                                  ┌──────────┐
                                  │   Run    │
                                  │  Tests   │
                                  └──────────┘
```

**Steps**:
1. Developer commits code to GitHub
2. CI tool (GitHub Actions) triggered
3. Run linting and tests
4. Build optimized bundle
5. Deploy to hosting platform
6. Verify deployment

---

## 8. Performance & Scalability

### 8.1 Performance Optimizations

**Frontend**:
- Minified CSS/JS files
- Lazy loading of images
- Debounced search (300ms)
- Pagination (12 items per page)
- Client-side caching

**Backend (Firestore)**:
- Indexed queries
- Composite indexes for common queries
- Limit queries to necessary fields
- Use pagination for large datasets

**Network**:
- CDN for static assets
- HTTP/2 support
- Gzip compression
- Browser caching headers

### 8.2 Scalability Strategy

**Horizontal Scalability**:
- Firebase auto-scales
- CDN distributes load globally
- Stateless application

**Vertical Scalability**:
- Upgrade Firestore plan
- Increase read/write limits

**Database Optimization**:
- Denormalization where appropriate
- Batch operations
- Transaction management

### 8.3 Performance Metrics

**Target Metrics**:
- **Page Load**: < 2 seconds
- **Time to Interactive**: < 3 seconds
- **API Response**: < 500ms
- **Search Latency**: < 300ms

---

## 9. Technology Stack

### 9.1 Technology Matrix

| Layer | Technology | Version | Purpose |
|-------|-----------|---------|---------|
| Frontend | HTML5 | Latest | Markup |
| Frontend | CSS3 | Latest | Styling |
| Frontend | JavaScript | ES6+ | Logic |
| Backend | Firebase Firestore | v9 | Database |
| Backend | Firebase Auth | v9 | Authentication |
| Hosting | Firebase Hosting | Latest | Web Hosting |
| Version Control | Git | 2.x | Source Control |
| Repository | GitHub | - | Code Hosting |

### 9.2 Technology Justification

**Firebase Firestore**:
- Serverless (no infrastructure management)
- Real-time capabilities
- Scalable
- Cost-effective for moderate usage
- Built-in security

**Vanilla JavaScript**:
- No framework overhead
- Faster load times
- Greater control
- Easier to learn and maintain

**Firebase Hosting**:
- Integrated with Firebase services
- Global CDN
- Free SSL
- Simple deployment

---

## Conclusion

The Super Mall Web Application architecture is designed for **modularity**, **scalability**, and **security**. The use of Firebase provides a robust backend infrastructure without the complexity of server management. The client-side architecture ensures fast load times and smooth user experience.

**Key Strengths**:
- Clean separation of concerns
- Comprehensive logging
- Strong security measures
- Scalable infrastructure
- Easy maintenance

**Future Enhancements**:
- Product catalog with images
- User accounts and favorites
- Payment integration
- Progressive Web App (PWA)
- Analytics dashboard
- Push notifications

---

**Document Version**: 1.0  
**Last Updated**: October 26, 2025  
**Approved By**: Project Team
