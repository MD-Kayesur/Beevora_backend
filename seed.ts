import mongoose from 'mongoose';
import dotenv from 'dotenv';
import path from 'path';
import { Product } from './src/modules/product/product.model';

dotenv.config();

const MONGO_URI = process.env.MONGO_URI || "mongodb://localhost:27017/beevora";

const seedData = async () => {
    try {
        await mongoose.connect(MONGO_URI);
        console.log("Connected to MongoDB");

        const products = [
            {
                name: "Premium Wireless Keyboard",
                description: "Ergonomic design with silent keys.",
                price: 89.99,
                originalPrice: 109.99,
                discount: 18,
                category: "Electronics",
                brand: "Logitech",
                images: ["https://images.unsplash.com/photo-1511467687858-23d96c32e4ae"],
                thumbnail: "https://images.unsplash.com/photo-1511467687858-23d96c32e4ae",
                rating: 4.8,
                reviewCount: 450,
                stock: 15,
                sku: "LOGI-WRLS-01",
                tags: ["wireless", "keyboard", "peripheral"],
                isFeatured: true,
                isActive: true
            },
            {
                name: "4K Desktop Monitor",
                description: "32-inch IPS display with HDR.",
                price: 499.00,
                originalPrice: 599.00,
                discount: 16,
                category: "Electronics",
                brand: "Dell",
                images: ["https://images.unsplash.com/photo-1527443224154-c4a3942d3acf"],
                thumbnail: "https://images.unsplash.com/photo-1527443224154-c4a3942d3acf",
                rating: 4.9,
                reviewCount: 120,
                stock: 5,
                sku: "DELL-ULTRA-32",
                tags: ["monitor", "4k", "desktop"],
                isFeatured: true,
                isActive: true
            }
        ];

        for (const p of products) {
            await Product.findOneAndUpdate({ sku: p.sku }, p, { upsert: true });
        }

        console.log("Seeding complete");
        process.exit(0);
    } catch (error) {
        console.error("Seeding failed", error);
        process.exit(1);
    }
};

seedData();
