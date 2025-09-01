import { forwardRef, type SelectHTMLAttributes } from 'react';

export interface SelectOption {
    label: string;
    value: string;
}

export interface SelectProps
    extends Omit<SelectHTMLAttributes<HTMLSelectElement>, 'onChange' | 'value' | 'multiple'> {
    options: SelectOption[];
    value: string | string[];
    multiple?: boolean;
    onChange: (value: string | string[]) => void;
}

const baseStyles =
    'flex h-10 w-full rounded-md border border-gray-300 bg-white px-3 py-2 text-sm transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50';

function cn(...classes: Array<string | false | null | undefined>) {
    return classes.filter(Boolean).join(' ');
}

export const Select = forwardRef<HTMLSelectElement, SelectProps>(function Select(
    { options, value, onChange, className, disabled, multiple, ...props },
    ref,
) {
    const normalizedValue: string | ReadonlyArray<string> = multiple
        ? (Array.isArray(value) ? value : [value])
        : (Array.isArray(value) ? (value[0] ?? '') : value);

    return (
        <select
            ref={ref}
            className={cn(baseStyles, className)}
            value={normalizedValue}
            multiple={multiple}
            onChange={(e) =>
                multiple
                    ? onChange(Array.from(e.currentTarget.selectedOptions, (opt) => opt.value))
                    : onChange(e.currentTarget.value)
            }
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
