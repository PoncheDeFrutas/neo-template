import { z } from 'zod';

/**
 * Validates data against a Zod schema and returns the parsed result.
 * 
 * @template T - The expected type of the validated data
 * @param schema - The Zod schema to validate against
 * @param data - The unknown data to be validated
 * @returns The validated and parsed data of type T
 * @throws {ZodError} When the data doesn't match the schema requirements
 * 
 * @example
 * ```typescript
 * const userSchema = z.object({ name: z.string(), age: z.number() });
 * const validatedUser = validateSchema(userSchema, { name: "John", age: 30 });
 * ```
 */
export function validateSchema<T>(schema: z.Schema<T>, data: unknown): T {
    return schema.parse(data);
}

export { z };
