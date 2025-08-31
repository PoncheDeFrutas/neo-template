import { forwardRef, type SelectHTMLAttributes } from 'react';

export interface SelectOption {
    label: string;
    value: string;
}

export interface SelectProps extends Omit<SelectHTMLAttributes<HTMLSelectElement>, 'onChange'> {
    options: SelectOption[];
    value: string;
    onChange: (value: string) => void;
}

const baseStyles =
    'flex h-10 w-full rounded-md border border-gray-300 bg-white px-3 py-2 text-sm transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50';

function cn(...classes: Array<string | false | null | undefined>) {
    return classes.filter(Boolean).join(' ');
}

export const Select = forwardRef<HTMLSelectElement, SelectProps>(function Select(
    { options, value, onChange, className, disabled, ...props },
    ref,
) {
    return (
        <select
            ref={ref}
            className={cn(baseStyles, className)}
            value={value}
            onChange={(e) => onChange(e.target.value)}
            disabled={disabled}
            {...props}
        >
            {options.map((option) => (
                <option key={option.value} value={option.value}>
                    {option.label}
                </option>
            ))}
        </select>
    );
});

export default Select;
