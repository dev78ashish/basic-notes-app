// schema/LoginFormSchema.ts

import { z } from 'zod';

export const loginSchema = z.object({
  username: z.string().min(3, { message: 'Username must be at least 3 characters' }),
  password: z.string().min(6, { message: 'Password must be at least 6 characters' }),
});

export const signupSchema = z.object({
  username: z.string().min(3, "Username must be at least 3 characters"),
  email: z.string().email("Invalid email address"),
  password: z.string().min(6, "Password must be at least 6 characters"),
});

export const noteFormSchema = z.object({
  title: z.string().min(1, 'Title is required'),
  description: z.string().min(1, 'Description is required'),
  image: z
    .any()
    .refine((file) => file instanceof File || file?.[0] instanceof File, {
      message: 'Image is required',
    }),
});

export type NoteFormSchema = z.infer<typeof noteFormSchema>;

export type SignupSchema = z.infer<typeof signupSchema>;

export type LoginSchema = z.infer<typeof loginSchema>;
