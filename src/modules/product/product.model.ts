import { Schema, model } from 'mongoose';
import { IProduct } from './product.interface';

const productSchema = new Schema<IProduct>(
  {
    name: { type: String, required: true },
    description: { type: String, required: true },
    price: { type: Number, required: true },
    originalPrice: { type: Number },
    category: { type: String, required: true },
    brand: { type: String, required: true },
    images: { type: [String], default: [] },
    thumbnail: { type: String, required: true },
    rating: { type: Number, default: 0 },
    reviewCount: { type: Number, default: 0 },
    stock: { type: Number, required: true, default: 0 },
    sku: { type: String, required: true, unique: true },
    tags: { type: [String], default: [] },
    isFeatured: { type: Boolean, default: false },
    isActive: { type: Boolean, default: true },
  },
  {
    timestamps: true,
    toJSON: {
      virtuals: true,
      transform: (doc, ret) => {
        delete (ret as any).__v;
        return ret;
      },
    },
    toObject: {
      virtuals: true,
    },
  }
);

export const Product = model<IProduct>('Product', productSchema);
