import { z } from 'zod';

export function validateSchema<T>(schema: z.Schema<T>, data: unknown): T {
    return schema.parse(data);
}

export { z };