/**
 * Sample Data Seeding Utility
 * Adds sample shops, products, offers, categories, and floors to the database
 */

const SAMPLE_DATA = {
    categories: [
        {
            id: 'cat-1',
            name: 'Fashion & Apparel',
            description: 'Clothing, shoes, and accessories',
            icon: '👗',
            createdAt: new Date('2025-01-15'),
            updatedAt: new Date('2025-01-15')
        },
        {
            id: 'cat-2',
            name: 'Electronics',
            description: 'Mobile phones, computers, and gadgets',
            icon: '📱',
            createdAt: new Date('2025-01-15'),
            updatedAt: new Date('2025-01-15')
        },
        {
            id: 'cat-3',
            name: 'Food & Beverages',
            description: 'Restaurants, cafes, and food courts',
            icon: '🍔',
            createdAt: new Date('2025-01-15'),
            updatedAt: new Date('2025-01-15')
        },
        {
            id: 'cat-4',
            name: 'Beauty & Cosmetics',
            description: 'Makeup, skincare, and fragrances',
            icon: '💄',
            createdAt: new Date('2025-01-15'),
            updatedAt: new Date('2025-01-15')
        },
        {
            id: 'cat-5',
            name: 'Home & Furniture',
            description: 'Furniture, decor, and home essentials',
            icon: '🛋️',
            createdAt: new Date('2025-01-15'),
            updatedAt: new Date('2025-01-15')
        },
        {
            id: 'cat-6',
            name: 'Sports & Fitness',
            description: 'Sportswear, equipment, and gym',
            icon: '⚽',
            createdAt: new Date('2025-01-15'),
            updatedAt: new Date('2025-01-15')
        },
        {
            id: 'cat-7',
            name: 'Books & Stationery',
            description: 'Books, magazines, and office supplies',
            icon: '📚',
            createdAt: new Date('2025-01-15'),
            updatedAt: new Date('2025-01-15')
        },
        {
            id: 'cat-8',
            name: 'Entertainment',
            description: 'Cinema, gaming, and arcade',
            icon: '🎮',
            createdAt: new Date('2025-01-15'),
            updatedAt: new Date('2025-01-15')
        }
    ],

    floors: [
        {
            id: 'floor-1',
            name: 'Ground Floor',
            code: 'GF',
            level: 0,
            description: 'Food court, groceries, and electronics',
            createdAt: new Date('2025-01-15'),
            updatedAt: new Date('2025-01-15')
        },
        {
            id: 'floor-2',
            name: 'First Floor',
            code: 'F1',
            level: 1,
            description: 'Fashion, apparel, and accessories',
            createdAt: new Date('2025-01-15'),
            updatedAt: new Date('2025-01-15')
        },
        {
            id: 'floor-3',
            name: 'Second Floor',
            code: 'F2',
            level: 2,
            description: 'Home, furniture, and sports',
            createdAt: new Date('2025-01-15'),
            updatedAt: new Date('2025-01-15')
        },
        {
            id: 'floor-4',
            name: 'Third Floor',
            code: 'F3',
            level: 3,
            description: 'Entertainment, cinema, and gaming',
            createdAt: new Date('2025-01-15'),
            updatedAt: new Date('2025-01-15')
        }
    ],

    shops: [
        // Electronics Shops
        {
            id: 'shop-1',
            name: 'TechZone Electronics',
            description: 'Latest smartphones, laptops, and accessories at competitive prices',
            category: 'Electronics',
            floor: 'Ground Floor',
            contactNumber: '+1-555-0101',
            email: 'info@techzone.com',
            status: 'active',
            openingHours: '10:00 AM - 9:00 PM',
            products: [
                {
                    id: 'prod-1',
                    name: 'iPhone 15 Pro Max',
                    price: 1199.99,
                    description: '256GB, Titanium Blue',
                    image: 'https://via.placeholder.com/300x300?text=iPhone+15+Pro',
                    inStock: true,
                    stock: 25
                },
                {
                    id: 'prod-2',
                    name: 'MacBook Air M3',
                    price: 1299.99,
                    description: '15-inch, 16GB RAM, 512GB SSD',
                    image: 'https://via.placeholder.com/300x300?text=MacBook+Air',
                    inStock: true,
                    stock: 15
                },
                {
                    id: 'prod-3',
                    name: 'AirPods Pro 2',
                    price: 249.99,
                    description: 'Active Noise Cancellation',
                    image: 'https://via.placeholder.com/300x300?text=AirPods+Pro',
                    inStock: true,
                    stock: 50
                }
            ],
            createdAt: new Date('2025-02-01'),
            updatedAt: new Date('2025-02-01')
        },
        {
            id: 'shop-2',
            name: 'Samsung Experience Store',
            description: 'Official Samsung store with exclusive deals',
            category: 'Electronics',
            floor: 'Ground Floor',
            contactNumber: '+1-555-0102',
            email: 'support@samsung-mall.com',
            status: 'active',
            openingHours: '10:00 AM - 9:00 PM',
            products: [
                {
                    id: 'prod-4',
                    name: 'Samsung Galaxy S24 Ultra',
                    price: 1099.99,
                    description: '512GB, Titanium Gray',
                    image: 'https://via.placeholder.com/300x300?text=Galaxy+S24',
                    inStock: true,
                    stock: 30
                },
                {
                    id: 'prod-5',
                    name: 'Samsung QLED 4K TV 55"',
                    price: 899.99,
                    description: 'Smart TV with Quantum Processor',
                    image: 'https://via.placeholder.com/300x300?text=QLED+TV',
                    inStock: true,
                    stock: 10
                },
                {
                    id: 'prod-6',
                    name: 'Galaxy Buds Pro 3',
                    price: 199.99,
                    description: 'Premium wireless earbuds',
                    image: 'https://via.placeholder.com/300x300?text=Galaxy+Buds',
                    inStock: true,
                    stock: 40
                }
            ],
            createdAt: new Date('2025-02-01'),
            updatedAt: new Date('2025-02-01')
        },

        // Fashion Shops
        {
            id: 'shop-3',
            name: 'Zara Fashion',
            description: 'Trendy clothing for men and women',
            category: 'Fashion & Apparel',
            floor: 'First Floor',
            contactNumber: '+1-555-0103',
            email: 'contact@zara-mall.com',
            status: 'active',
            openingHours: '10:00 AM - 10:00 PM',
            products: [
                {
                    id: 'prod-7',
                    name: 'Men\'s Slim Fit Blazer',
                    price: 129.99,
                    description: 'Navy blue, premium fabric',
                    image: 'https://via.placeholder.com/300x300?text=Blazer',
                    inStock: true,
                    stock: 20
                },
                {
                    id: 'prod-8',
                    name: 'Women\'s Floral Dress',
                    price: 79.99,
                    description: 'Summer collection, cotton blend',
                    image: 'https://via.placeholder.com/300x300?text=Dress',
                    inStock: true,
                    stock: 35
                },
                {
                    id: 'prod-9',
                    name: 'Leather Handbag',
                    price: 159.99,
                    description: 'Genuine leather, multiple colors',
                    image: 'https://via.placeholder.com/300x300?text=Handbag',
                    inStock: true,
                    stock: 15
                }
            ],
            createdAt: new Date('2025-02-05'),
            updatedAt: new Date('2025-02-05')
        },
        {
            id: 'shop-4',
            name: 'Nike Store',
            description: 'Official Nike sportswear and footwear',
            category: 'Fashion & Apparel',
            floor: 'First Floor',
            contactNumber: '+1-555-0104',
            email: 'store@nike-mall.com',
            status: 'active',
            openingHours: '10:00 AM - 9:00 PM',
            products: [
                {
                    id: 'prod-10',
                    name: 'Air Jordan 1 Retro',
                    price: 179.99,
                    description: 'Classic basketball shoes',
                    image: 'https://via.placeholder.com/300x300?text=Air+Jordan',
                    inStock: true,
                    stock: 25
                },
                {
                    id: 'prod-11',
                    name: 'Dri-FIT Running Shirt',
                    price: 49.99,
                    description: 'Moisture-wicking fabric',
                    image: 'https://via.placeholder.com/300x300?text=Running+Shirt',
                    inStock: true,
                    stock: 50
                },
                {
                    id: 'prod-12',
                    name: 'Tech Fleece Hoodie',
                    price: 119.99,
                    description: 'Premium cotton fleece',
                    image: 'https://via.placeholder.com/300x300?text=Hoodie',
                    inStock: true,
                    stock: 30
                }
            ],
            createdAt: new Date('2025-02-05'),
            updatedAt: new Date('2025-02-05')
        },

        // Food & Beverages
        {
            id: 'shop-5',
            name: 'Starbucks Coffee',
            description: 'Premium coffee and beverages',
            category: 'Food & Beverages',
            floor: 'Ground Floor',
            contactNumber: '+1-555-0105',
            email: 'cafe@starbucks-mall.com',
            status: 'active',
            openingHours: '7:00 AM - 10:00 PM',
            products: [
                {
                    id: 'prod-13',
                    name: 'Caramel Macchiato',
                    price: 5.99,
                    description: 'Grande size with extra shot',
                    image: 'https://via.placeholder.com/300x300?text=Macchiato',
                    inStock: true,
                    stock: 999
                },
                {
                    id: 'prod-14',
                    name: 'Chocolate Croissant',
                    price: 3.99,
                    description: 'Freshly baked daily',
                    image: 'https://via.placeholder.com/300x300?text=Croissant',
                    inStock: true,
                    stock: 999
                },
                {
                    id: 'prod-15',
                    name: 'Cold Brew Coffee',
                    price: 4.99,
                    description: 'Smooth and refreshing',
                    image: 'https://via.placeholder.com/300x300?text=Cold+Brew',
                    inStock: true,
                    stock: 999
                }
            ],
            createdAt: new Date('2025-02-10'),
            updatedAt: new Date('2025-02-10')
        },
        {
            id: 'shop-6',
            name: 'Pizza Paradise',
            description: 'Authentic Italian pizzas and pasta',
            category: 'Food & Beverages',
            floor: 'Ground Floor',
            contactNumber: '+1-555-0106',
            email: 'orders@pizzaparadise.com',
            status: 'active',
            openingHours: '11:00 AM - 11:00 PM',
            products: [
                {
                    id: 'prod-16',
                    name: 'Margherita Pizza',
                    price: 12.99,
                    description: 'Fresh mozzarella and basil',
                    image: 'https://via.placeholder.com/300x300?text=Margherita',
                    inStock: true,
                    stock: 999
                },
                {
                    id: 'prod-17',
                    name: 'Pepperoni Feast',
                    price: 15.99,
                    description: 'Double pepperoni, large size',
                    image: 'https://via.placeholder.com/300x300?text=Pepperoni',
                    inStock: true,
                    stock: 999
                },
                {
                    id: 'prod-18',
                    name: 'Carbonara Pasta',
                    price: 11.99,
                    description: 'Creamy sauce with bacon',
                    image: 'https://via.placeholder.com/300x300?text=Pasta',
                    inStock: true,
                    stock: 999
                }
            ],
            createdAt: new Date('2025-02-10'),
            updatedAt: new Date('2025-02-10')
        },

        // Beauty & Cosmetics
        {
            id: 'shop-7',
            name: 'Sephora Beauty',
            description: 'Premium makeup and skincare products',
            category: 'Beauty & Cosmetics',
            floor: 'First Floor',
            contactNumber: '+1-555-0107',
            email: 'info@sephora-mall.com',
            status: 'active',
            openingHours: '10:00 AM - 9:00 PM',
            products: [
                {
                    id: 'prod-19',
                    name: 'Dior Sauvage Parfum',
                    price: 129.99,
                    description: '100ml, eau de parfum',
                    image: 'https://via.placeholder.com/300x300?text=Dior+Sauvage',
                    inStock: true,
                    stock: 20
                },
                {
                    id: 'prod-20',
                    name: 'Fenty Beauty Foundation',
                    price: 39.99,
                    description: '40 shades available',
                    image: 'https://via.placeholder.com/300x300?text=Foundation',
                    inStock: true,
                    stock: 45
                },
                {
                    id: 'prod-21',
                    name: 'La Mer Moisturizer',
                    price: 189.99,
                    description: 'Luxury skincare, 60ml',
                    image: 'https://via.placeholder.com/300x300?text=La+Mer',
                    inStock: true,
                    stock: 12
                }
            ],
            createdAt: new Date('2025-02-15'),
            updatedAt: new Date('2025-02-15')
        },

        // Home & Furniture
        {
            id: 'shop-8',
            name: 'IKEA Home Solutions',
            description: 'Modern furniture and home accessories',
            category: 'Home & Furniture',
            floor: 'Second Floor',
            contactNumber: '+1-555-0108',
            email: 'sales@ikea-mall.com',
            status: 'active',
            openingHours: '9:00 AM - 9:00 PM',
            products: [
                {
                    id: 'prod-22',
                    name: 'KIVIK Sofa',
                    price: 699.99,
                    description: '3-seater, gray fabric',
                    image: 'https://via.placeholder.com/300x300?text=Sofa',
                    inStock: true,
                    stock: 8
                },
                {
                    id: 'prod-23',
                    name: 'MALM Bed Frame',
                    price: 299.99,
                    description: 'Queen size, white',
                    image: 'https://via.placeholder.com/300x300?text=Bed',
                    inStock: true,
                    stock: 12
                },
                {
                    id: 'prod-24',
                    name: 'BILLY Bookcase',
                    price: 79.99,
                    description: 'White, 80x202 cm',
                    image: 'https://via.placeholder.com/300x300?text=Bookcase',
                    inStock: true,
                    stock: 25
                }
            ],
            createdAt: new Date('2025-02-20'),
            updatedAt: new Date('2025-02-20')
        },

        // Sports & Fitness
        {
            id: 'shop-9',
            name: 'Decathlon Sports',
            description: 'Sports equipment and fitness gear',
            category: 'Sports & Fitness',
            floor: 'Second Floor',
            contactNumber: '+1-555-0109',
            email: 'contact@decathlon-mall.com',
            status: 'active',
            openingHours: '9:00 AM - 9:00 PM',
            products: [
                {
                    id: 'prod-25',
                    name: 'Yoga Mat Premium',
                    price: 29.99,
                    description: 'Non-slip, eco-friendly',
                    image: 'https://via.placeholder.com/300x300?text=Yoga+Mat',
                    inStock: true,
                    stock: 40
                },
                {
                    id: 'prod-26',
                    name: 'Dumbbells Set 20kg',
                    price: 89.99,
                    description: 'Adjustable weight',
                    image: 'https://via.placeholder.com/300x300?text=Dumbbells',
                    inStock: true,
                    stock: 15
                },
                {
                    id: 'prod-27',
                    name: 'Running Shoes',
                    price: 79.99,
                    description: 'Lightweight, breathable',
                    image: 'https://via.placeholder.com/300x300?text=Running+Shoes',
                    inStock: true,
                    stock: 30
                }
            ],
            createdAt: new Date('2025-02-20'),
            updatedAt: new Date('2025-02-20')
        },

        // Books & Stationery
        {
            id: 'shop-10',
            name: 'Barnes & Noble',
            description: 'Books, magazines, and office supplies',
            category: 'Books & Stationery',
            floor: 'Second Floor',
            contactNumber: '+1-555-0110',
            email: 'info@barnesnoble-mall.com',
            status: 'active',
            openingHours: '9:00 AM - 9:00 PM',
            products: [
                {
                    id: 'prod-28',
                    name: 'The Great Gatsby',
                    price: 14.99,
                    description: 'Classic literature, hardcover',
                    image: 'https://via.placeholder.com/300x300?text=Gatsby',
                    inStock: true,
                    stock: 25
                },
                {
                    id: 'prod-29',
                    name: 'Moleskine Notebook',
                    price: 19.99,
                    description: 'Large, ruled, black',
                    image: 'https://via.placeholder.com/300x300?text=Notebook',
                    inStock: true,
                    stock: 50
                },
                {
                    id: 'prod-30',
                    name: 'Fountain Pen Set',
                    price: 49.99,
                    description: 'Premium writing instrument',
                    image: 'https://via.placeholder.com/300x300?text=Pen',
                    inStock: true,
                    stock: 18
                }
            ],
            createdAt: new Date('2025-02-25'),
            updatedAt: new Date('2025-02-25')
        }
    ],

    offers: [
        {
            id: 'offer-1',
            title: 'iPhone Flash Sale',
            description: 'Get 15% off on iPhone 15 Pro series',
            shop: 'TechZone Electronics',
            discountType: 'percentage',
            discountValue: 15,
            startDate: new Date('2025-10-20'),
            endDate: new Date('2025-11-30'),
            status: 'active',
            termsAndConditions: 'Valid on selected models only. Cannot be combined with other offers.',
            createdAt: new Date('2025-10-20'),
            updatedAt: new Date('2025-10-20')
        },
        {
            id: 'offer-2',
            title: 'Samsung Diwali Special',
            description: 'Buy Galaxy S24 and get Galaxy Buds free',
            shop: 'Samsung Experience Store',
            discountType: 'bogo',
            discountValue: 0,
            startDate: new Date('2025-10-15'),
            endDate: new Date('2025-11-10'),
            status: 'active',
            termsAndConditions: 'Free Galaxy Buds with every Galaxy S24 Ultra purchase.',
            createdAt: new Date('2025-10-15'),
            updatedAt: new Date('2025-10-15')
        },
        {
            id: 'offer-3',
            title: 'Fashion Week Sale',
            description: 'Up to 40% off on all apparel',
            shop: 'Zara Fashion',
            discountType: 'percentage',
            discountValue: 40,
            startDate: new Date('2025-10-25'),
            endDate: new Date('2025-11-15'),
            status: 'active',
            termsAndConditions: 'Discount varies by product. Maximum 40% off.',
            createdAt: new Date('2025-10-25'),
            updatedAt: new Date('2025-10-25')
        },
        {
            id: 'offer-4',
            title: 'Nike Sneaker Fest',
            description: '$50 off on Air Jordan collection',
            shop: 'Nike Store',
            discountType: 'fixed_amount',
            discountValue: 50,
            startDate: new Date('2025-10-20'),
            endDate: new Date('2025-12-31'),
            status: 'active',
            termsAndConditions: 'Valid on Jordan 1, 3, and 4 models only.',
            createdAt: new Date('2025-10-20'),
            updatedAt: new Date('2025-10-20')
        },
        {
            id: 'offer-5',
            title: 'Happy Hour Special',
            description: 'Buy 1 Get 1 Free on all beverages',
            shop: 'Starbucks Coffee',
            discountType: 'bogo',
            discountValue: 0,
            startDate: new Date('2025-10-26'),
            endDate: new Date('2025-11-26'),
            status: 'active',
            termsAndConditions: 'Valid from 3 PM to 6 PM only. Same or lesser value item free.',
            createdAt: new Date('2025-10-26'),
            updatedAt: new Date('2025-10-26')
        },
        {
            id: 'offer-6',
            title: 'Beauty Sale Extravaganza',
            description: '20% off on all skincare products',
            shop: 'Sephora Beauty',
            discountType: 'percentage',
            discountValue: 20,
            startDate: new Date('2025-10-22'),
            endDate: new Date('2025-11-30'),
            status: 'active',
            termsAndConditions: 'Excludes sale items and gift sets.',
            createdAt: new Date('2025-10-22'),
            updatedAt: new Date('2025-10-22')
        },
        {
            id: 'offer-7',
            title: 'Furniture Clearance',
            description: 'Up to $200 off on furniture sets',
            shop: 'IKEA Home Solutions',
            discountType: 'fixed_amount',
            discountValue: 200,
            startDate: new Date('2025-10-18'),
            endDate: new Date('2025-11-20'),
            status: 'active',
            termsAndConditions: 'On purchases above $500. Selected items only.',
            createdAt: new Date('2025-10-18'),
            updatedAt: new Date('2025-10-18')
        },
        {
            id: 'offer-8',
            title: 'Black Friday Preview',
            description: '30% off storewide',
            shop: 'Decathlon Sports',
            discountType: 'percentage',
            discountValue: 30,
            startDate: new Date('2025-11-01'),
            endDate: new Date('2025-11-30'),
            status: 'active',
            termsAndConditions: 'Early Black Friday access. All products included.',
            createdAt: new Date('2025-10-25'),
            updatedAt: new Date('2025-10-25')
        }
    ]
};

/**
 * Seed the database with sample data
 */
async function seedDatabase() {
    try {
        Logger.info('Starting database seeding...', { module: 'seed-data' });

        const db = FirebaseService.getDB();
        let successCount = 0;
        let errorCount = 0;

        // Seed Categories
        console.log('Seeding categories...');
        for (const category of SAMPLE_DATA.categories) {
            try {
                await db.collection(COLLECTIONS.CATEGORIES).doc(category.id).set(category);
                successCount++;
                console.log(`✓ Added category: ${category.name}`);
            } catch (error) {
                errorCount++;
                console.error(`✗ Failed to add category: ${category.name}`, error);
            }
        }

        // Seed Floors
        console.log('\nSeeding floors...');
        for (const floor of SAMPLE_DATA.floors) {
            try {
                await db.collection(COLLECTIONS.FLOORS).doc(floor.id).set(floor);
                successCount++;
                console.log(`✓ Added floor: ${floor.name}`);
            } catch (error) {
                errorCount++;
                console.error(`✗ Failed to add floor: ${floor.name}`, error);
            }
        }

        // Seed Shops
        console.log('\nSeeding shops...');
        for (const shop of SAMPLE_DATA.shops) {
            try {
                await db.collection(COLLECTIONS.SHOPS).doc(shop.id).set(shop);
                successCount++;
                console.log(`✓ Added shop: ${shop.name} (${shop.products.length} products)`);
            } catch (error) {
                errorCount++;
                console.error(`✗ Failed to add shop: ${shop.name}`, error);
            }
        }

        // Seed Offers
        console.log('\nSeeding offers...');
        for (const offer of SAMPLE_DATA.offers) {
            try {
                await db.collection(COLLECTIONS.OFFERS).doc(offer.id).set(offer);
                successCount++;
                console.log(`✓ Added offer: ${offer.title}`);
            } catch (error) {
                errorCount++;
                console.error(`✗ Failed to add offer: ${offer.title}`, error);
            }
        }

        console.log('\n========================================');
        console.log('DATABASE SEEDING COMPLETED');
        console.log(`✓ Success: ${successCount} items`);
        console.log(`✗ Errors: ${errorCount} items`);
        console.log('========================================\n');

        Logger.info('Database seeding completed', { 
            module: 'seed-data',
            success: successCount,
            errors: errorCount
        });

        alert(`Database seeded successfully!\n\n✓ ${successCount} items added\n✗ ${errorCount} errors`);

    } catch (error) {
        console.error('Fatal error during seeding:', error);
        Logger.error('Database seeding failed', {
            module: 'seed-data',
            error: error.message,
            stack: error.stack
        });
        alert('Database seeding failed! Check console for details.');
    }
}

/**
 * Clear all data from the database
 */
async function clearDatabase() {
    if (!confirm('Are you sure you want to DELETE ALL DATA from the database? This cannot be undone!')) {
        return;
    }

    try {
        const db = FirebaseService.getDB();
        let deleteCount = 0;

        // Delete all collections
        const collections = [
            COLLECTIONS.SHOPS,
            COLLECTIONS.OFFERS,
            COLLECTIONS.CATEGORIES,
            COLLECTIONS.FLOORS
        ];

        for (const collectionName of collections) {
            const snapshot = await db.collection(collectionName).get();
            
            for (const doc of snapshot.docs) {
                await doc.ref.delete();
                deleteCount++;
            }
            
            console.log(`Deleted ${snapshot.size} documents from ${collectionName}`);
        }

        console.log(`\nTotal deleted: ${deleteCount} documents`);
        Logger.info('Database cleared', { module: 'seed-data', deleted: deleteCount });
        alert(`Database cleared successfully!\n${deleteCount} documents deleted.`);

    } catch (error) {
        console.error('Error clearing database:', error);
        Logger.error('Failed to clear database', { module: 'seed-data', error: error.message });
        alert('Failed to clear database! Check console for details.');
    }
}

// Expose functions globally
window.seedDatabase = seedDatabase;
window.clearDatabase = clearDatabase;
window.SAMPLE_DATA = SAMPLE_DATA;

console.log('Seed data utility loaded. Use:');
console.log('  seedDatabase() - Add sample data to Firebase');
console.log('  clearDatabase() - Delete all data from Firebase');
