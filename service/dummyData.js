const db = require('../models');

async function seedProducts() {
    try {
        // Create some dummy products
        const products = [
            ...Array.from({ length: 97 }, (_, index) => ({
                name: `Product ${index + 6}`,
                description: `Description for Product ${index + 6}`,
                price: Math.floor(Math.random() * 100) + 1, // Random price between 1 and 100
                quantity: Math.floor(Math.random() * 50) + 1, // Random quantity between 1 and 50
                category: ['Category A', 'Category B', 'Category C'][index % 3] // Cycling through categories
            }))
        ];

        // Insert dummy products into the database
        await db.Product.bulkCreate(products);
        console.log('Dummy products inserted successfully.');
    } catch (error) {
        console.error('Error seeding products:', error);
    }
}

// Call the function to seed products
seedProducts();
