import { Input, Select } from '@/shared/ui';

type Props = {
    disabled?: boolean;
    errors: Record<string, string>;
};

// Cliente fields
export default function ClientFields({ disabled, errors }: Props) {
    return (
        <div className="space-y-5">
            <h3 className="text-base font-semibold text-text">Cliente</h3>
            <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                <Select
                    label="Género"
                    name="gender"
                    placeholder="Selecciona"
                    options={[
                        { value: 'm', label: 'Masculino' },
                        { value: 'f', label: 'Femenino' },
                        { value: 'o', label: 'Otro' },
                    ]}
                    required
                    disabled={disabled}
                    error={errors.gender}
                />
                <Input
                    label="Dirección"
                    name="address"
                    placeholder="Calle, zona, ciudad"
                    autoComplete="street-address"
                    required
                    disabled={disabled}
                    error={errors.address}
                />
                <Input
                    label="Teléfono"
                    name="phone"
                    type="tel"
                    placeholder="5555-5555"
                    autoComplete="tel"
                    required
                    disabled={disabled}
                    error={errors.phone}
                />
                <Input
                    label="Fecha de nacimiento"
                    name="birthdate"
                    type="date"
                    required
                    disabled={disabled}
                    error={errors.birthdate}
                />
            </div>
        </div>
    );
}
