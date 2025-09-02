import { forwardRef, type SelectHTMLAttributes } from 'react';

export interface SelectOption {
    label: string;
    value: string;
}

export type SelectSize = 'sm' | 'md' | 'lg';
export type SelectVariant = 'default' | 'underline';

/**
 * Props for the Select component.
 *
 * @interface SelectProps
 * @extends {Omit<SelectHTMLAttributes<HTMLSelectElement>, 'onChange' | 'value' | 'multiple' | 'size'>}
 *
 * @property {SelectOption[]} options - Array of options to display in the select dropdown
 * @property {string | string[]} value - The current selected value(s). Can be a single string or array of strings for multiple selection
 * @property {boolean} [multiple] - Whether multiple options can be selected simultaneously
 * @property {SelectSize} [size] - The size variant of the select component
 * @property {SelectVariant} [variant] - The visual variant/style of the select component
 * @property {(value: string | string[]) => void} onChange - Callback function triggered when the selection changes. Receives the new value(s) as parameter
 */
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

/**
 * Generates CSS class names for select components based on size and variant.
 *
 * @param size - The size of the select component. Can be 'sm', 'md', or 'lg'. Defaults to 'md'.
 * @param variant - The visual variant of the select component. Can be 'default' or 'underline'. Defaults to 'default'.
 * @returns A string containing the combined CSS class names for the select component.
 *
 * @example
 * ```tsx
 * // Default medium select
 * const classes = selectVariants();
 *
 * // Small underline variant
 * const classes = selectVariants('sm', 'underline');
 *
 * // Large default variant
 * const classes = selectVariants('lg', 'default');
 * ```
 */
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

/**
 * Combines multiple CSS class names into a single string, filtering out falsy values.
 *
 * @param classes - An array of class names that can be strings or falsy values (false, null, undefined)
 * @returns A single string containing all truthy class names separated by spaces
 *
 * @example
 * ```typescript
 * cn('btn', 'btn-primary', false, null, 'active') // Returns: "btn btn-primary active"
 * cn('card', isActive && 'active', isDisabled && 'disabled') // Conditional classes
 * ```
 */
function cn(...classes: Array<string | false | null | undefined>) {
    return classes.filter(Boolean).join(' ');
}

/**
 * A flexible select component that supports both single and multiple selection modes.
 *
 * @param options - Array of option objects with value and label properties
 * @param value - The current selected value(s). Can be a string for single select or array for multiple select
 * @param onChange - Callback function called when selection changes. Receives string for single select or string array for multiple select
 * @param className - Additional CSS classes to apply to the select element
 * @param disabled - Whether the select is disabled
 * @param multiple - Whether multiple options can be selected
 * @param size - Size variant of the select component (default: 'md')
 * @param variant - Visual variant of the select component (default: 'default')
 * @param props - Additional HTML select element props
 * @param ref - Forwarded ref to the underlying HTML select element
 *
 * @example
 * ```tsx
 * // Single select
 * <Select
 *   options={[{value: '1', label: 'Option 1'}, {value: '2', label: 'Option 2'}]}
 *   value="1"
 *   onChange={(value) => console.log(value)}
 * />
 *
 * // Multiple select
 * <Select
 *   options={[{value: '1', label: 'Option 1'}, {value: '2', label: 'Option 2'}]}
 *   value={['1', '2']}
 *   multiple
 *   onChange={(values) => console.log(values)}
 * />
 * ```
 */
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
