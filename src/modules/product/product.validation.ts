import { z } from 'zod';

const createProduct = z.object({
  body: z.object({
    name: z.string().min(2, 'Name is required'),
    description: z.string().min(10, 'Description too short'),
    price: z.number().positive('Price must be positive'),
    category: z.string().min(2),
    brand: z.string().min(2),
    thumbnail: z.string().url('Invalid thumbnail URL'),
    stock: z.number().int().min(0),
    sku: z.string().min(3),
  }),
});

export const ProductValidation = { createProduct };
