import { Schema, model } from 'mongoose';

export interface IClothing {
  name: string;
  description: string;
  price: number;
  originalPrice?: number;
  category: string;
  brand: string;
  images: string[];
  thumbnail: string;
  hoverImage?: string;
  rating: number;
  reviewCount: number;
  stock: number;
  sku: string;
  tags: string[];
  isFeatured: boolean;
  isActive: boolean;
  size?: string[];
  color?: string[];
  material?: string;
}

const clothingSchema = new Schema<IClothing>(
  {
    name: { type: String, required: true },
    description: { type: String, required: true },
    price: { type: Number, required: true },
    originalPrice: { type: Number },
    category: { type: String, required: true, default: 'Clothing' },
    brand: { type: String, required: true },
    images: [{ type: String, required: true }],
    thumbnail: { type: String, required: true },
    hoverImage: { type: String },
    rating: { type: Number, default: 0 },
    reviewCount: { type: Number, default: 0 },
    stock: { type: Number, required: true },
    sku: { type: String, required: true, unique: true },
    tags: [{ type: String }],
    isFeatured: { type: Boolean, default: false },
    isActive: { type: Boolean, default: true },
    size: [{ type: String }],
    color: [{ type: String }],
    material: { type: String },
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
  }
);

export const Clothing = model<IClothing>('Clothing', clothingSchema);
