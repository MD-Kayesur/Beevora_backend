import { z } from 'zod';

const createOrder = z.object({
  body: z.object({
    items: z.array(z.object({
      product: z.string(),
      quantity: z.number().int().positive(),
      price: z.number().positive(),
    })),
    totalAmount: z.number().positive(),
    shippingAddress: z.string().min(5),
  }),
});

export const OrderValidation = { createOrder };
