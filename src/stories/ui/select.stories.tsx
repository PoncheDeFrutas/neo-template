import { Select, SearchableSelect } from '@/shared/ui/Select';
import { useState } from 'react';

export default {
    title: 'UI/Select',
};

const baseOptions = [
    { label: 'Opción A', value: 'a' },
    { label: 'Opción B', value: 'b' },
    { label: 'Opción C', value: 'c' },
];

export const NativeBasic = () => (
    <div className="max-w-sm space-y-6">
        <Select label="Nativo" placeholder="Selecciona una opción" options={baseOptions} />
        <Select
            label="Error"
            placeholder="Selecciona"
            error="Campo requerido"
            options={baseOptions}
        />
        <Select label="Éxito" placeholder="Selecciona" success="¡Listo!" options={baseOptions} />
    </div>
);

export const NativeVariants = () => (
    <div className="max-w-sm space-y-6">
        <Select
            label="Outline (default)"
            placeholder="Selecciona"
            options={baseOptions}
            variant="outline"
        />
        <Select label="Filled" placeholder="Selecciona" options={baseOptions} variant="filled" />
        <Select label="Ghost" placeholder="Selecciona" options={baseOptions} variant="ghost" />
    </div>
);

export const Searchable = () => {
    const [val, setVal] = useState<string | null>(null);
    return (
        <div className="max-w-sm space-y-6">
            <SearchableSelect
                label="Buscable"
                placeholder="Elige una opción"
                options={baseOptions}
                value={val}
                onChange={setVal}
                hint="Escribe para filtrar"
            />
            <div className="text-sm text-muted-foreground">Valor: {String(val)}</div>
        </div>
    );
};
