import { z } from 'zod';

// User
export const registerSchema = z.object({
    name: z.string().min(2, 'Name must be at least 2 characters').max(50),
    email: z.string().email('Invalid email address'),
    password: z.string().min(8, 'Password must be at least 8 characters'),
});

export const loginSchema = z.object({
    email: z.string().email('Invalid email address'),
    password: z.string().min(1, 'Password is required'),
});

export const updateProfileSchema = z.object({
    name: z.string().min(2).max(50).optional(),
    bio: z.string().max(500).optional(),
    walletAddress: z.string().optional(),
});

// Resource
export const createResourceSchema = z.object({
    name: z.string().min(2, 'Name must be at least 2 characters').max(100),
    category: z.enum(['Computing', 'Data', 'Services', 'Education', 'Design', 'IoT', 'Blockchain', 'Other']),
    description: z.string().min(10, 'Description must be at least 10 characters').max(2000),
    estimatedValue: z.number().positive('Value must be positive'),
    tags: z.array(z.string()).min(1, 'At least one tag is required').max(10),
    condition: z.enum(['new', 'like-new', 'good', 'fair']).default('good'),
    imageUrl: z.string().url().optional(),
});

export const updateResourceSchema = createResourceSchema.partial();

// Exchange
export const createExchangeSchema = z.object({
    offeredResourceId: z.string().min(1),
    requestedResourceId: z.string().min(1),
    receiverId: z.string().min(1),
    senderNote: z.string().max(500).optional(),
});

export const respondExchangeSchema = z.object({
    action: z.enum(['accept', 'reject', 'counter', 'complete']),
    note: z.string().max(500).optional(),
    counterOffer: z.string().max(500).optional(),
});

// Message
export const createMessageSchema = z.object({
    content: z.string().min(1).max(2000),
    exchangeId: z.string().min(1),
});

// Rating
export const rateExchangeSchema = z.object({
    rating: z.number().min(1).max(5),
});

// Search
export const searchSchema = z.object({
    query: z.string().optional(),
    category: z.string().optional(),
    minValue: z.number().optional(),
    maxValue: z.number().optional(),
    tags: z.array(z.string()).optional(),
    status: z.string().optional(),
    page: z.number().int().positive().default(1),
    limit: z.number().int().positive().max(50).default(20),
});

export type RegisterInput = z.infer<typeof registerSchema>;
export type LoginInput = z.infer<typeof loginSchema>;
export type CreateResourceInput = z.infer<typeof createResourceSchema>;
export type UpdateResourceInput = z.infer<typeof updateResourceSchema>;
export type CreateExchangeInput = z.infer<typeof createExchangeSchema>;
export type RespondExchangeInput = z.infer<typeof respondExchangeSchema>;
export type CreateMessageInput = z.infer<typeof createMessageSchema>;
export type SearchInput = z.infer<typeof searchSchema>;
