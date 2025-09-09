import { Input, Select, Textarea } from '@/shared/ui';

type Props = {
    disabled?: boolean;
    errors: Record<string, string>;
};

// Tienda fields
export default function StoreFields({ disabled, errors }: Props) {
    return (
        <div className="space-y-5">
            <h3 className="text-base font-semibold text-text">Tienda</h3>
            <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                <Input
                    label="Nombre del negocio"
                    name="businessName"
                    placeholder="Ej. Market XYZ"
                    required
                    disabled={disabled}
                    error={errors.businessName}
                />
                <Input
                    label="Documento (DPI o NIT)"
                    name="document"
                    placeholder="########### / ########-#"
                    required
                    disabled={disabled}
                    error={errors.document}
                />
                <Input
                    label="Dirección física"
                    name="address"
                    placeholder="Calle, zona, ciudad"
                    required
                    disabled={disabled}
                    error={errors.address}
                />
                <Input
                    label="Teléfono de contacto"
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
                    placeholder="Cuenta para pagos de ventas"
                    autoComplete="off"
                    required
                    disabled={disabled}
                    error={errors.bankAccount}
                />
                <Select
                    label="Categoría de productos"
                    name="category"
                    placeholder="Selecciona…"
                    options={[
                        { value: 'alimentos', label: 'Alimentos' },
                        { value: 'farmacia', label: 'Farmacia' },
                        { value: 'tecnologia', label: 'Tecnología' },
                        { value: 'hogar', label: 'Hogar' },
                        { value: 'otros', label: 'Otros' },
                    ]}
                    required
                    disabled={disabled}
                    error={errors.category}
                />
                <Textarea
                    label="Horarios de atención"
                    name="schedule"
                    placeholder="Lun–Vie 8:00–18:00; Sáb 9:00–13:00"
                    rows={3}
                    required
                    error={errors.schedule}
                    disabled={disabled}
                />
            </div>
        </div>
    );
}
