import { z } from 'zod';

// Global Spanish error map for Zod v4 (classic compat)
// Ensures default messages are shown in Spanish when a custom message isn't provided
z.setErrorMap((issue) => {
    switch (issue.code) {
        case 'invalid_type': {
            // Treat undefined, null and empty string as required for common form cases
            const input = (issue as any).input;
            if (input === undefined || input === null || input === '')
                return { message: 'Campo requerido' };
            return { message: 'Tipo de dato inválido' };
        }
        case 'invalid_format': {
            const fmt = (issue as any).format;
            if (fmt === 'email') return { message: 'Correo inválido' };
            if (fmt === 'url') return { message: 'URL inválida' };
            if (fmt === 'uuid') return { message: 'UUID inválido' };
            return { message: 'Formato inválido' };
        }
        case 'too_small': {
            const origin = (issue as any).origin;
            const min = (issue as any).minimum;
            if (origin === 'string') return { message: `Debe tener al menos ${min} caracteres` };
            if (origin === 'number' || origin === 'int' || origin === 'bigint')
                return { message: `Debe ser mayor o igual a ${min}` };
            if (origin === 'array' || origin === 'set')
                return { message: `Debe contener al menos ${min} elementos` };
            if (origin === 'date') return { message: 'Fecha demasiado temprana' };
            return { message: 'Valor demasiado pequeño' };
        }
        case 'too_big': {
            const origin = (issue as any).origin;
            const max = (issue as any).maximum;
            if (origin === 'string') return { message: `Debe tener como máximo ${max} caracteres` };
            if (origin === 'number' || origin === 'int' || origin === 'bigint')
                return { message: `Debe ser menor o igual a ${max}` };
            if (origin === 'array' || origin === 'set')
                return { message: `Debe contener como máximo ${max} elementos` };
            if (origin === 'date') return { message: 'Fecha demasiado tardía' };
            return { message: 'Valor demasiado grande' };
        }
        case 'unrecognized_keys': {
            return { message: 'Contiene campos no permitidos' };
        }
        case 'invalid_value': {
            return { message: 'Valor no permitido' };
        }
        case 'custom': {
            return { message: (issue as any).params?.message ?? 'Dato inválido' };
        }
        default:
            return { message: 'Dato inválido' };
    }
});

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
