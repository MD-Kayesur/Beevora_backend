import { z } from 'zod';

const register = z.object({
  body: z.object({
    name: z.string().min(2, 'Name is required'),
    email: z.string().email('Invalid email'),
    password: z.string().min(6, 'Password should be at least 6 chars'),
  }),
});

const login = z.object({
  body: z.object({
    email: z.string().email('Invalid email'),
    password: z.string().min(1, 'Password is required'),
  }),
});

export const AuthValidation = {
  register,
  login,
};
