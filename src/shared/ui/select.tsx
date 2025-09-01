import { forwardRef, type SelectHTMLAttributes } from 'react';

export interface SelectOption {
    label: string;
    value: string;
}

export type SelectSize = 'sm' | 'md' | 'lg';
export type SelectVariant = 'default' | 'underline';

export interface SelectProps
    extends Omit<
        SelectHTMLAttributes<HTMLSelectElement>,
        'onChange' | 'value' | 'multiple' | 'size'
    > {
    options: SelectOption[];
    value: string | string[];
    multiple?: boolean;
    size?: SelectSize;
    variant?: SelectVariant;
    onChange: (value: string | string[]) => void;
}

function selectVariants(size: SelectSize = 'md', variant: SelectVariant = 'default') {
    const base =
        'flex w-full bg-surface text-text px-3 py-2 transition-colors focus-visible:outline-none disabled:cursor-not-allowed disabled:opacity-50';
    const shape =
        variant === 'underline'
            ? 'border-0 border-b border-border rounded-none focus:ring-0'
            : 'rounded-md border border-border focus-visible:ring-2 ring-ring focus-visible:ring-offset-2';
    const sizeCls =
        size === 'sm' ? 'h-8 text-xs' : size === 'lg' ? 'h-12 text-base' : 'h-10 text-sm';
    return cn(base, shape, sizeCls);
}

function cn(...classes: Array<string | false | null | undefined>) {
    return classes.filter(Boolean).join(' ');
}

export const Select = forwardRef<HTMLSelectElement, SelectProps>(function Select(
    {
        options,
        value,
        onChange,
        className,
        disabled,
        multiple,
        size = 'md',
        variant = 'default',
        ...props
    },
    ref,
) {
    const normalizedValue: string | ReadonlyArray<string> = multiple
        ? Array.isArray(value)
            ? value
            : [value]
        : Array.isArray(value)
          ? (value[0] ?? '')
          : value;

    return (
        <select
            ref={ref}
            className={cn(selectVariants(size, variant), className)}
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
