import mongoose from 'mongoose';
import { Product } from '../modules/product/product.model';
import config from '../config/env';
import logger from '../config/logger';

const products = [
  {
    name: 'Pro Wireless Headphones',
    description: 'High-fidelity audio with active noise cancellation and 40-hour battery life.',
    price: 299.99,
    originalPrice: 349.99,
    category: 'Electronics',
    brand: 'AudioPhile',
    thumbnail: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?q=80&w=1000&auto=format&fit=crop',
    images: ['https://images.unsplash.com/photo-1505740420928-5e560c06d30e?q=80&w=1000&auto=format&fit=crop'],
    stock: 50,
    sku: 'BEE-PRO-H-001',
    isActive: true,
    isFeatured: true,
    rating: 4.8,
    reviewCount: 124
  },
  {
    name: 'Smart Business Watch',
    description: 'Stay connected and track your health with this premium titanium smartwatch.',
    price: 199.50,
    originalPrice: 249.00,
    category: 'Electronics',
    brand: 'TechVance',
    thumbnail: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?q=80&w=1000&auto=format&fit=crop',
    images: ['https://images.unsplash.com/photo-1523275335684-37898b6baf30?q=80&w=1000&auto=format&fit=crop'],
    stock: 12,
    sku: 'BEE-SWATCH-002',
    isActive: true,
    isFeatured: true,
    rating: 4.5,
    reviewCount: 89
  },
  {
    name: 'Premium Leather Briefcase',
    description: 'Genuine hand-crafted leather briefcase for the modern professional.',
    price: 150.00,
    category: 'Clothing & Fashion',
    brand: 'LuxCarry',
    thumbnail: 'https://images.unsplash.com/photo-1548036328-c9fa89d128fa?q=80&w=1000&auto=format&fit=crop',
    images: ['https://images.unsplash.com/photo-1548036328-c9fa89d128fa?q=80&w=1000&auto=format&fit=crop'],
    stock: 0,
    sku: 'BEE-LEATHER-003',
    isActive: true,
    isFeatured: false,
    rating: 4.9,
    reviewCount: 45
  }
];

export const seedProducts = async () => {
  try {
    const count = await Product.countDocuments();
    if (count > 0) {
      logger.info('📦 Products already exist in database, skipping seed.');
      return;
    }

    await Product.insertMany(products);
    logger.info('✅ Products seeded successfully');
  } catch (error) {
    logger.error('❌ Error seeding products:', error);
  }
};
