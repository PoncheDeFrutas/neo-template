import { z } from '@shared/lib/validation';
import { ROLE_KEYS, type RoleKey, ROLE_ID_BY_KEY } from './roles';

export const baseTopSchema = z.object({
    firstName: z.string().min(1, 'Nombre requerido'),
    lastName: z.string().min(1, 'Apellido requerido'),
    email: z.string().email('Correo inválido'),
    password: z.string().min(6, 'Mínimo 6 caracteres'),
    role: z.enum(ROLE_KEYS),
});

// Client-specific fields
const clientUserBody = z.object({
    gender: z.string().min(1, 'Género requerido'),
    address: z.string().min(1, 'Dirección requerida'),
    phone: z.string().min(1, 'Teléfono requerido'),
    birthdate: z.string().min(1, 'Fecha de nacimiento requerida'),
});

// Dealer-specific fields
const dealerCommon = z.object({
    dpi: z.string().min(1, 'DPI requerido'),
    address: z.string().min(1, 'Dirección requerida'),
    phone: z.string().min(1, 'Teléfono requerido'),
    birthdate: z.string().min(1, 'Fecha de nacimiento requerida'),
    bankAccount: z.string().min(1, 'Número de cuenta bancaria requerido'),
});

const dealerUserBody = dealerCommon
    .merge(
        z.object({
            vehicleType: z.enum(['moto', 'carro', 'bicicleta'], {
                message: 'Tipo de vehículo requerido',
            }),
            plate: z.string().optional(),
            driverLicense: z.string().optional(),
        }),
    )
    .superRefine((data, ctx) => {
        if (data.vehicleType === 'bicicleta') return;
        if (!data.plate || String(data.plate).trim().length === 0) {
            ctx.addIssue({ code: 'custom', path: ['plate'], message: 'Número de placa requerido' });
        }
        if (!data.driverLicense || String(data.driverLicense).trim().length === 0) {
            ctx.addIssue({
                code: 'custom',
                path: ['driverLicense'],
                message: 'Licencia de conducir requerida',
            });
        }
    });

// Shop-specific fields
const shopUserBody = z.object({
    businessName: z.string().min(1, 'Nombre del negocio requerido'),
    document: z.string().min(1, 'Documento requerido'),
    address: z.string().min(1, 'Dirección requerida'),
    phone: z.string().min(1, 'Teléfono requerido'),
    bankAccount: z.string().min(1, 'Número de cuenta bancaria requerido'),
    category: z.string().min(1, 'Categoría requerida'),
    schedule: z.string().min(1, 'Horarios de atención requeridos'),
});

// Admin-specific fields
const adminUserBody = z.object({
    permissionLevel: z.string().min(1, 'Nivel de permisos requerido'),
});

// Map role keys to their respective user body schemas
export const userBodySchemaByRole: Record<RoleKey, z.ZodTypeAny> = {
    client: clientUserBody,
    dealer: dealerUserBody,
    shop: shopUserBody,
    admin: adminUserBody,
};

// Function to build payload from form data
export function buildPayloadFromForm(form: HTMLFormElement, role: RoleKey) {
    const fd = new FormData(form);
    const values: Record<string, unknown> = {};
    fd.forEach((v, k) => {
        if (v instanceof File) {
            values[k] = v.size > 0 ? v : undefined;
        } else {
            values[k] = v;
        }
    });

    // top-level
    const topParsed = baseTopSchema
        .pick({ email: true, password: true, firstName: true, lastName: true })
        .safeParse(values);
    if (!topParsed.success) {
        throw topParsed.error;
    }

    const name = topParsed.data.firstName;
    const lastname = topParsed.data.lastName;

    const bodyCandidate = {
        ...values,
        name,
        lastname,
    } as Record<string, unknown>;

    const bodyParsed = userBodySchemaByRole[role].safeParse(bodyCandidate);
    if (!bodyParsed.success) {
        throw bodyParsed.error;
    }

    return {
        email: topParsed.data.email,
        password: topParsed.data.password,
        roleId: ROLE_ID_BY_KEY[role],
        userBody: {
            ...(bodyParsed.data as Record<string, unknown>),
            name,
            lastname,
        },
    };
}

// Combined schema for full validation if needed
export type RegisterUserBodyByRole = {
    client: z.infer<typeof clientUserBody>;
    dealer: z.infer<typeof dealerUserBody>;
    shop: z.infer<typeof shopUserBody>;
    admin: z.infer<typeof adminUserBody>;
};
