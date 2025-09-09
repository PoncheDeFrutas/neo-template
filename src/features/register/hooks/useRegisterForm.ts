import { useMemo, useState } from 'react';
import { z } from '@shared/lib/validation';
import { type RoleKey } from '../model/roles';
import { baseTopSchema, userBodySchemaByRole, buildPayloadFromForm } from '../model/schema';
import { RegisterService } from '../api/registerService';

type UseRegisterFormParams = {
    role: RoleKey;
    onSuccess?: () => void;
};

// Hook for managing the registration form state and submission
export function useRegisterForm({ role, onSuccess }: UseRegisterFormParams) {
    const [submitting, setSubmitting] = useState(false);
    const [errors, setErrors] = useState<Record<string, string>>({});
    const [formError, setFormError] = useState<string | null>(null);

    const topSchema = useMemo(() => baseTopSchema, []);
    const bodySchema = useMemo(() => userBodySchemaByRole[role], [role]);

    const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setFormError(null);
        setErrors({});
        const form = e.currentTarget;
        try {
            const fd = new FormData(form);
            const values: Record<string, unknown> = {};
            fd.forEach(
                (v, k) => (values[k] = v instanceof File ? (v.size > 0 ? v : undefined) : v),
            );

            const name = (values.firstName as string) || (values.name as string) || '';
            const lastname = (values.lastName as string) || (values.lastname as string) || '';
            const top = topSchema
                .pick({ email: true, password: true, firstName: true, lastName: true })
                .safeParse(values);
            const body = bodySchema.safeParse({ ...values, name, lastname });

            const mergedFieldErrors: Record<string, string> = {};
            if (!top.success) {
                Object.entries(top.error.flatten().fieldErrors).forEach(([k, msgs]) => {
                    if (msgs && Array.isArray(msgs) && msgs.length > 0)
                        mergedFieldErrors[k] = msgs[0];
                });
            }
            if (!body.success) {
                Object.entries(body.error.flatten().fieldErrors).forEach(([k, msgs]) => {
                    if (msgs && Array.isArray(msgs) && msgs.length > 0)
                        mergedFieldErrors[k] = msgs[0];
                });
            }

            if (Object.keys(mergedFieldErrors).length > 0) {
                setErrors(mergedFieldErrors);
                return;
            }

            const payload = buildPayloadFromForm(form, role);
            setSubmitting(true);
            await RegisterService.register(payload);
            onSuccess?.();
        } catch (err) {
            if (err instanceof z.ZodError) {
                const flat: Record<string, string> = {};
                Object.entries(err.flatten().fieldErrors).forEach(([k, msgs]) => {
                    if (msgs && Array.isArray(msgs) && msgs.length > 0) flat[k] = msgs[0];
                });
                setErrors(flat);
            } else {
                setFormError('No se pudo completar el registro. Intenta de nuevo.');
            }
        } finally {
            setSubmitting(false);
        }
    };

    return {
        submitting,
        errors,
        formError,
        onSubmit,
    } as const;
}

export default useRegisterForm;
