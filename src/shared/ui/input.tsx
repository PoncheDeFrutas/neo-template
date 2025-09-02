import {
    type ChangeEvent,
    forwardRef,
    type InputHTMLAttributes,
    type ReactNode,
    useState,
} from 'react';

export type InputSize = 'sm' | 'md' | 'lg';
export type ValidationState = 'none' | 'success' | 'error';

/**
 * Props for the Input component.
 *
 * @interface InputProps
 * @extends {Omit<InputHTMLAttributes<HTMLInputElement>, 'size'>}
 *
 * @property {InputSize} [size] - The size variant of the input component
 * @property {ValidationState} [validationState] - The validation state of the input (e.g., error, success, warning)
 * @property {ReactNode} [leftElement] - Optional element to display on the left side of the input
 * @property {ReactNode} [rightElement] - Optional element to display on the right side of the input
 * @property {ReactNode} [interactiveLeftElement] - Optional interactive element on the left side
 * @property {ReactNode} [interactiveRightElement] - Optional interactive element on the right side
 * @property {string} [helperText] - Optional helper text to display below the input
 * @property {'default' | 'search' | 'number'} [variant] - Input visual variant
 */
export interface InputProps extends Omit<InputHTMLAttributes<HTMLInputElement>, 'size'> {
    size?: InputSize;
    validationState?: ValidationState;
    leftElement?: ReactNode;
    rightElement?: ReactNode;
    interactiveLeftElement?: ReactNode;
    interactiveRightElement?: ReactNode;
    helperText?: string;
    variant?: 'default' | 'search' | 'number';
}

/**
 * Base CSS classes for input styling with consistent design system tokens.
 *
 * Includes:
 * - Full width layout and rounded borders
 * - Surface background with text color from design tokens
 * - Smooth color transitions
 * - Focus ring styling with offset
 * - Disabled state styling with reduced opacity and cursor changes
 *
 * @remarks This constant provides foundational styling that can be extended
 * or combined with variant-specific classes for different input types.
 */
const baseStyles =
    'w-full rounded-md border bg-surface text-text transition-colors focus-visible:outline-none focus-visible:ring-2 ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50';

const validationStyles: Record<ValidationState, string> = {
    none: 'border-border',
    success: 'border-success ring-success',
    error: 'border-danger ring-danger',
};

function cn(...classes: Array<string | false | null | undefined | number | bigint>) {
    return classes.filter(Boolean).join(' ');
}
const sizeStyles: Record<InputSize, string> = {
    sm: 'h-8 px-2 py-1 text-sm',
    md: 'h-10 px-3 py-2 text-sm',
    lg: 'h-12 px-4 py-3 text-base',
};

const leftPaddingStyles: Record<InputSize, string> = {
    sm: 'pl-8',
    md: 'pl-10',
    lg: 'pl-12',
};

const rightPaddingStyles: Record<InputSize, string> = {
    sm: 'pr-8',
    md: 'pr-10',
    lg: 'pr-12',
};

/**
 * A flexible input component with support for left and right elements, validation states, and helper text.
 *
 * @param className - Additional CSS classes to apply to the input element
 * @param size - The size variant of the input. Defaults to 'md'
 * @param validationState - The validation state that affects the input's appearance. Defaults to 'none'
 * @param leftElement - Optional element to display on the left side of the input (e.g., icon)
 * @param rightElement - Optional element to display on the right side of the input (e.g., icon, button)
 * @param interactiveLeftElement - Interactive element on the left side
 * @param interactiveRightElement - Interactive element on the right side
 * @param helperText - Optional helper text displayed below the input
 * @param variant - Visual variant of the input
 * @param props - Additional HTML input attributes
 * @param ref - Forward ref to the underlying HTMLInputElement
 *
 * @returns A styled input component wrapped in a container with optional elements and helper text
 */
export const Input = forwardRef<HTMLInputElement, InputProps>(function Input(
    {
        className,
        size = 'md',
        validationState = 'none',
        leftElement,
        rightElement,
        interactiveLeftElement,
        interactiveRightElement,
        helperText,
        variant = 'default',
        type,
        onChange,
        min,
        max,
        step = 1,
        value,
        defaultValue,
        ...props
    },
    ref,
) {
     const isNumber = variant === 'number';

    const parseNumber = (val: unknown) => {
        const num = typeof val === 'number' ? val : parseFloat(String(val ?? 0));
        return Number.isNaN(num) ? 0 : num;
    };

    const clamp = (val: number) => {
        let result = val;
        if (min !== undefined) result = Math.max(result, parseNumber(min));
        if (max !== undefined) result = Math.min(result, parseNumber(max));
        return result;
    };

    const [internalValue, setInternalValue] = useState<number>(
        clamp(parseNumber(value ?? defaultValue ?? 0)),
    );

    const currentValue = isNumber
        ? value !== undefined
            ? clamp(parseNumber(value))
            : internalValue
        : undefined;

    const emitChange = (val: number, e?: ChangeEvent<HTMLInputElement>) => {
        onChange?.({
            ...e,
            target: { ...e?.target, value: String(val) },
        } as ChangeEvent<HTMLInputElement>);
    };

    const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
        const next = clamp(parseNumber(e.target.value));
        if (value === undefined) setInternalValue(next);
        emitChange(next, e);
    };

    const increment = () => {
        const next = clamp((currentValue ?? 0) + parseNumber(step));
        if (value === undefined) setInternalValue(next);
        emitChange(next);
    };

    const decrement = () => {
        const next = clamp((currentValue ?? 0) - parseNumber(step));
        if (value === undefined) setInternalValue(next);
        emitChange(next);
    };

    const mergedLeft =
        interactiveLeftElement ??
        leftElement ??
        (variant === 'search' ? (
            <span role="img" aria-label="search">
                🔍
            </span>
             ) : isNumber ? (
            <button type="button" onClick={decrement} aria-label="decrement" className="px-1">
                −
            </button>
        ) : undefined);

    const mergedRight =
        interactiveRightElement ??
        rightElement ??
        (isNumber ? (
            <button type="button" onClick={increment} aria-label="increment" className="px-1">
                +
            </button>
        ) : undefined);

    const showLeft = Boolean(mergedLeft);
    const showRight = Boolean(mergedRight);

 const leftInteractive = Boolean(interactiveLeftElement) || isNumber;
    const rightInteractive = Boolean(interactiveRightElement) || isNumber;

    const inputType = type ?? (variant === 'search' ? 'search' : isNumber ? 'number' : undefined);
    return (
        <div className="relative w-full">
            {showLeft && (
                <span
                    className={cn(
                        'absolute inset-y-0 left-0 flex items-center pl-2',
                        !leftInteractive && 'pointer-events-none',
                    )}
                >
                    {mergedLeft}
                </span>
            )}
            <input
                ref={ref}
                type={inputType}
                className={cn(
                    baseStyles,
                    validationStyles[validationState],
                    sizeStyles[size],
                    showLeft && leftPaddingStyles[size],
                    showRight && rightPaddingStyles[size],
                    className,
                )}
                {...props}
                {...(isNumber
                    ? {
                          value: String(currentValue ?? 0),
                          onChange: handleInputChange,
                          min,
                          max,
                          step,
                      }
                    : { onChange })}
            />
            {showRight && (
                <span
                    className={cn(
                        'absolute inset-y-0 right-0 flex items-center pr-2',
                        !rightInteractive && 'pointer-events-none',
                    )}
                >
                    {mergedRight}
                </span>
            )}
            {helperText && <p className="mt-1 text-sm text-muted-foreground">{helperText}</p>}
        </div>
    );
});

export default Input;