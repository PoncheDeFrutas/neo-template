import { Input, Select } from '@/shared/ui';
import { useState } from 'react';

type Props = {
    disabled?: boolean;
    errors: Record<string, string>;
};

// Repartidor fields
export default function DealerFields({ disabled, errors }: Props) {
    const [vehicleType, setVehicleType] = useState<string>('');
    const showVehicleDetails = vehicleType === 'moto' || vehicleType === 'carro';

    return (
        <div className="space-y-5">
            <h3 className="text-base font-semibold text-text">Repartidor</h3>
            <div className="grid gap-4 [grid-template-columns:repeat(auto-fit,minmax(260px,1fr))]">
                <Input
                    label="DPI"
                    name="dpi"
                    placeholder="###########"
                    required
                    disabled={disabled}
                    error={errors.dpi}
                />
                <Input
                    label="Fecha de nacimiento"
                    name="birthdate"
                    type="date"
                    required
                    disabled={disabled}
                    error={errors.birthdate}
                />
                <Input
                    label="Dirección de residencia"
                    name="address"
                    placeholder="Calle, zona, ciudad"
                    required
                    disabled={disabled}
                    error={errors.address}
                />
                <Input
                    label="Número de teléfono"
                    name="phone"
                    type="tel"
                    placeholder="5555-5555"
                    autoComplete="tel"
                    required
                    disabled={disabled}
                    error={errors.phone}
                />
                <Input
                    label="Número de cuenta bancaria"
                    name="bankAccount"
                    placeholder="Cuenta para depósitos"
                    autoComplete="off"
                    required
                    disabled={disabled}
                    error={errors.bankAccount}
                />
                <Select
                    label="Tipo de vehículo"
                    name="vehicleType"
                    placeholder="Selecciona"
                    options={[
                        { value: 'moto', label: 'Moto' },
                        { value: 'carro', label: 'Carro' },
                        { value: 'bicicleta', label: 'Bicicleta' },
                    ]}
                    required
                    value={vehicleType}
                    onChange={(e) => setVehicleType(e.currentTarget.value)}
                    disabled={disabled}
                    error={errors.vehicleType}
                />
                {showVehicleDetails && (
                    <>
                        <Input
                            label="Número de placa"
                            name="plate"
                            placeholder="P-000ABC"
                            required
                            disabled={disabled}
                            error={errors.plate}
                        />
                        <Input
                            label="Licencia de conducir"
                            name="driverLicense"
                            placeholder="Número de licencia"
                            required
                            disabled={disabled}
                            error={errors.driverLicense}
                        />
                    </>
                )}
            </div>
        </div>
    );
}
