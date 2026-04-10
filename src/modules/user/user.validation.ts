import { z } from 'zod';

const updateUser = z.object({
  body: z.object({
    name: z.string().min(2).optional(),
    avatar: z.string().url().optional(),
  }),
});

export const UserValidation = { updateUser };
