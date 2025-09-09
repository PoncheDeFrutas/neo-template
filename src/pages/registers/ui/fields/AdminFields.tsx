import { Select } from '@/shared/ui';

type Props = {
    disabled?: boolean;
    errors: Record<string, string>;
};

// Admin fields
export default function AdminFields({ disabled, errors }: Props) {
    return (
        <div className="space-y-5">
            <h3 className="text-base font-semibold text-text">Administrador</h3>
            <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                <Select
                    label="Nivel de permisos"
                    name="permissionLevel"
                    placeholder="Selecciona…"
                    options={[
                        { value: '1', label: '1' },
                        { value: '2', label: '2' },
                        { value: '3', label: '3' },
                        { value: '4', label: '4' },
                        { value: '5', label: '5' },
                    ]}
                    disabled={disabled}
                    error={errors.permissionLevel}
                />
            </div>
        </div>
    );
}
