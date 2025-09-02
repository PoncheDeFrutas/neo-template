import { z } from 'zod';

const envSchema = z.object({
    VITE_API_BASE_URL: z.string().url(),
});

const rawEnv = {
    VITE_API_BASE_URL: import.meta.env?.VITE_API_BASE_URL ?? process.env.VITE_API_BASE_URL,
};

const parsedEnv = envSchema.safeParse(rawEnv);

if (!parsedEnv.success) {
    console.error('Invalid environment variables', parsedEnv.error.flatten().fieldErrors);
    throw new Error('Invalid environment variables');
}

export const env = parsedEnv.data;

export default env;