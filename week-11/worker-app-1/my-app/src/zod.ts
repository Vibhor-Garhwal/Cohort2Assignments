import z from 'zod';

export const signUpInput = z.object({
    email: z.string().email(),
    password: z.string().min(6),
    username : z.string().optional()
})

export const signInInput = z.object({
    email: z.string().email(),
    password: z.string().min(6)
})

export const createPostInput = z.object({
    title: z.string(),
    body: z.string(),
    tags: z.array(z.string()).optional(),
})

export const updatePostInput = z.object({
    title: z.string(),
    body: z.string(),
    tags: z.array(z.string()).optional()
})

export type SignupInput = z.infer<typeof signUpInput>; //this is for the frontend to have 
export type SignInInput = z.infer<typeof signInInput>; //this is for the frontend to have
export type UpdateBlogInput = z.infer<typeof updatePostInput>;
export type CreateBlogInput = z.infer<typeof createPostInput>;