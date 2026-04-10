export interface IProduct {
  name: string;
  description: string;
  price: number;
  originalPrice?: number;
  category: string;
  brand: string;
  images: string[];
  thumbnail: string;
  rating: number;
  reviewCount: number;
  stock: number;
  sku: string;
  tags: string[];
  isFeatured: boolean;
  isActive: boolean;
}
