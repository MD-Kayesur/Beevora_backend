import mongoose from 'mongoose';
import { Product } from '../modules/product/product.model';
import { Cart } from '../modules/cart/cart.model';
import config from '../config/env';
import logger from '../config/logger';

const products = [
  {
    name: 'Beevora Original Honey',
    description: 'Our signature blend of 100% pure, natural honey. Perfect for daily use.',
    price: 15.99,
    originalPrice: 19.99,
    category: 'Honey',
    brand: 'Beevora',
    thumbnail: '/products/honey-original.png',
    images: ['/products/honey-original.png'],
    stock: 100,
    sku: 'BVR-HON-ORG-001',
    isActive: true,
    isFeatured: true,
    rating: 4.8,
    reviewCount: 156
  },
  {
    name: 'Beevora Wildflower Honey',
    description: 'Captured from the nectar of diverse wildflowers for a complex and delightful taste.',
    price: 18.50,
    category: 'Honey',
    brand: 'Beevora',
    thumbnail: '/products/honey-wildflower.png',
    images: ['/products/honey-wildflower.png'],
    stock: 85,
    sku: 'BVR-HON-WFL-002',
    isActive: true,
    isFeatured: true,
    rating: 4.9,
    reviewCount: 92
  },
  {
    name: 'Beevora Manuka Gold',
    description: 'Premium grade Manuka honey with exceptional antibacterial properties and a rich texture.',
    price: 45.00,
    originalPrice: 55.00,
    category: 'Honey',
    brand: 'Beevora',
    thumbnail: '/products/honey-manuka.png',
    images: ['/products/honey-manuka.png'],
    stock: 30,
    sku: 'BVR-HON-MNK-003',
    isActive: true,
    isFeatured: true,
    rating: 5.0,
    reviewCount: 45
  },
  {
    name: 'Beevora Clover Blossom',
    description: 'Light and sweet honey collected from the finest clover fields.',
    price: 14.25,
    category: 'Honey',
    brand: 'Beevora',
    thumbnail: '/products/honey-clover.png',
    images: ['/products/honey-clover.png'],
    stock: 120,
    sku: 'BVR-HON-CLV-004',
    isActive: true,
    isFeatured: false,
    rating: 4.7,
    reviewCount: 68
  },
  {
    name: 'Beevora Acacia Essence',
    description: 'The clearest and mildest honey, staying liquid longer with a delicate floral hint.',
    price: 22.00,
    category: 'Honey',
    brand: 'Beevora',
    thumbnail: '/products/honey-acacia.png',
    images: ['/products/honey-acacia.png'],
    stock: 60,
    sku: 'BVR-HON-ACA-005',
    isActive: true,
    isFeatured: true,
    rating: 4.9,
    reviewCount: 110
  },
  {
    name: 'Beevora Buckwheat Dark',
    description: 'Deep, dark, and robust honey with high antioxidant levels.',
    price: 19.99,
    category: 'Honey',
    brand: 'Beevora',
    thumbnail: '/products/honey-buckwheat.png',
    images: ['/products/honey-buckwheat.png'],
    stock: 45,
    sku: 'BVR-HON-BKW-006',
    isActive: true,
    isFeatured: false,
    rating: 4.6,
    reviewCount: 54
  },
  {
    name: 'Beevora Forest Nectar',
    description: 'A strong, earthy honey derived from the honeydew of forest trees.',
    price: 25.50,
    category: 'Honey',
    brand: 'Beevora',
    thumbnail: '/products/honey-forest.png',
    images: ['/products/honey-forest.png'],
    stock: 40,
    sku: 'BVR-HON-FOR-007',
    isActive: true,
    isFeatured: true,
    rating: 4.8,
    reviewCount: 77
  },
  {
    name: 'Beevora Organic Pure',
    description: 'Certified organic honey harvested without synthetic pesticides or fertilizers.',
    price: 28.00,
    originalPrice: 32.00,
    category: 'Honey',
    brand: 'Beevora',
    thumbnail: '/products/honey-organic.png',
    images: ['/products/honey-organic.png'],
    stock: 75,
    sku: 'BVR-HON-ORG-008',
    isActive: true,
    isFeatured: true,
    rating: 4.9,
    reviewCount: 130
  },
  {
    name: 'Beevora Raw Unfiltered',
    description: 'Honey in its most natural state, directly from the hive with all nutrients intact.',
    price: 21.50,
    category: 'Honey',
    brand: 'Beevora',
    thumbnail: '/products/honey-raw.png',
    images: ['/products/honey-raw.png'],
    stock: 55,
    sku: 'BVR-HON-RAW-009',
    isActive: true,
    isFeatured: true,
    rating: 5.0,
    reviewCount: 88
  },
  {
    name: 'Beevora Premium Gold',
    description: 'Our most luxurious honey, hand-selected for its exceptional clarity and taste.',
    price: 60.00,
    category: 'Honey',
    brand: 'Beevora',
    thumbnail: '/products/honey-gold.png',
    images: ['/products/honey-gold.png'],
    stock: 20,
    sku: 'BVR-HON-GLD-010',
    isActive: true,
    isFeatured: true,
    rating: 5.0,
    reviewCount: 32
  },
  {
    name: 'Classic Cotton Polo',
    description: '100% organic cotton polo shirt, breathable and stylish for any occasion.',
    price: 35.00,
    category: 'Clothing',
    brand: 'Beevora Wear',
    thumbnail: 'https://picsum.photos/seed/polo/800/1000',
    images: ['https://picsum.photos/seed/polo/800/1000'],
    stock: 50,
    sku: 'BVR-CLO-POLO-011',
    isActive: true,
    isFeatured: true,
    rating: 4.5,
    reviewCount: 28
  },
  {
    name: 'Premium Denim Jeans',
    description: 'High-quality denim jeans with a perfect slim fit and classic wash.',
    price: 75.00,
    category: 'Clothing',
    brand: 'Beevora Wear',
    thumbnail: 'https://picsum.photos/seed/jeans/800/1000',
    images: ['https://picsum.photos/seed/jeans/800/1000'],
    stock: 40,
    sku: 'BVR-CLO-JEAN-012',
    isActive: true,
    isFeatured: false,
    rating: 4.7,
    reviewCount: 15
  }
];

export const seedProducts = async () => {
  try {
    // Clear existing products to only keep the honey collection
    await Product.deleteMany({});
    logger.info('🗑️ Cleared existing products.');
    
    await Cart.deleteMany({});
    logger.info('🗑️ Cleared existing carts.');

    await Product.insertMany(products);
    logger.info(`✅ ${products.length} products seeded successfully via seedProducts`);
  } catch (error) {
    logger.error('❌ Error seeding products:', error);
  }
};
