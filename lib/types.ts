import { z } from 'zod';

// interfaces

export interface NonConsentProps {
  heading: string;
  description: string;
  image: string;
}

export interface UserProps {
  id: string;
  clerkId: string;
  username: string;
  email: string;
  biogram?: string | null;
  image?: string | null;
  link?: string | null;
}

// form schemas

export const EditUserSchema = z.object({
  id: z.string().uuid(),
  biogram: z
    .string()
    .trim()
    .min(5, { message: 'Biogram must be at least 5 characters' })
    .max(50, { message: 'Biogram must not exceed 50 characters' }),
  link: z
    .string()
    .trim()
    .url({ message: 'Link must be a valid URL' })
    .min(5, { message: 'Link must be at least 5 characters' })
    .max(50, { message: 'Link must not exceed 50 characters' })
});
