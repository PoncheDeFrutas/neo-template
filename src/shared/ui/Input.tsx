import { forwardRef, useId, useRef, useState } from 'react';
import type { InputHTMLAttributes, MutableRefObject, ReactNode } from 'react';
import { cn } from '@/shared/lib/cn';
import { Eye, EyeOff, ChevronUp, ChevronDown } from 'lucide-react';

type Size = 'sm' | 'md' | 'lg';

export type InputProps = Omit<InputHTMLAttributes<HTMLInputElement>, 'size' | 'type'> & {
    label?: string;
    hint?: string;
    error?: string | boolean;
    success?: string | boolean;
    leftIcon?: ReactNode;
    rightIcon?: ReactNode;
    size?: Size;
    fullWidth?: boolean;
    type?: 'text' | 'email' | 'password' | 'number' | 'tel' | 'date' | 'file';
    passwordToggle?: boolean;
    numberSpinButtons?: 'native' | 'hidden' | 'custom';
    containerClassName?: string;
    inputClassName?: string;
};

const sizeClasses: Record<Size, string> = {
    sm: 'h-9 text-sm',
    md: 'h-10 text-sm',
    lg: 'h-12 text-base',
};

export const Input = forwardRef<HTMLInputElement, InputProps>((props, ref) => {
    const {
        id,
        name,
        label,
        placeholder,
        hint,
        error,
        success,
        leftIcon,
        rightIcon,
        size = 'md',
        fullWidth = true,
        className,
        containerClassName,
        inputClassName,
        type = 'text',
        passwordToggle,
        numberSpinButtons = 'native',
        required,
        disabled,
        ...rest
    } = props;

    const autoId = useId();
    const inputId = id ?? `${name ?? 'input'}-${autoId}`;
    const hintId = hint ? `${inputId}-hint` : undefined;
    const errorId = error ? `${inputId}-error` : undefined;
    const describedBy = [hintId, errorId].filter(Boolean).join(' ') || undefined;
    const hasError = Boolean(error);
    const hasSuccess = !hasError && Boolean(success);

    const [showPassword, setShowPassword] = useState(false);
    const isPassword = type === 'password';
    const isNumber = type === 'number';
    const effectiveType =
        isPassword && passwordToggle ? (showPassword ? 'text' : 'password') : type;
    const hideNativeSpin =
        isNumber && (numberSpinButtons === 'hidden' || numberSpinButtons === 'custom');

    const base = cn(
        'block rounded-md border bg-surface text-text placeholder:text-muted-foreground outline-none',
        'transition-all duration-200 ease-out',
        'focus-visible:ring-2 ring-ring focus-visible:border-transparent',
        'disabled:opacity-50 disabled:cursor-not-allowed',
        'invalid:border-danger invalid:focus-visible:ring-danger/70',
        fullWidth && 'w-full',
        sizeClasses[size],
        // padding (adjust for icons later)
        'px-4',
        'border-border',
        'hover:border-strong',
        hideNativeSpin && 'no-spin',
        hasError && 'border-danger focus-visible:ring-danger/70',
        hasSuccess && 'border-success focus-visible:ring-success/70',
        inputClassName,
    );

    const withLeftIcon = Boolean(leftIcon);
    const withRightAddon =
        Boolean(rightIcon) ||
        (isPassword && passwordToggle) ||
        (isNumber && numberSpinButtons === 'custom');
    const paddingAdjusted = cn(base, withLeftIcon && 'pl-10', withRightAddon && 'pr-12');

    // Helpful inputMode defaults for mobile keyboards
    const inputMode =
        type === 'email'
            ? 'email'
            : type === 'number'
              ? 'numeric'
              : type === 'tel'
                ? 'tel'
                : undefined;

    const innerRef = useRef<HTMLInputElement | null>(null);
    const setRefs = (node: HTMLInputElement | null) => {
        innerRef.current = node;
        if (typeof ref === 'function') {
            (ref as (instance: HTMLInputElement | null) => void)(node);
        } else if (ref && typeof ref === 'object' && 'current' in ref) {
            (ref as MutableRefObject<HTMLInputElement | null>).current = node;
        }
    };

    const stepBy = (dir: 'up' | 'down') => {
        const el = innerRef.current;
        if (!el) return;
        try {
            if (dir === 'up') el.stepUp();
            else el.stepDown();
            el.dispatchEvent(new Event('input', { bubbles: true }));
            el.dispatchEvent(new Event('change', { bubbles: true }));
        } catch {
            /* no-op */
        }
    };

    return (
        <div className={cn('inline-flex w-full flex-col', containerClassName)}>
            {label && (
                <label
                    htmlFor={inputId}
                    className={cn(
                        'mb-1.5 text-sm font-medium',
                        hasError ? 'text-danger' : 'text-text',
                    )}
                >
                    {label}
                    {required ? <span className="text-danger"> *</span> : null}
                </label>
            )}

            <div className="relative">
                {withLeftIcon && (
                    <span className="pointer-events-none absolute inset-y-0 left-3 flex items-center text-muted-foreground">
                        {leftIcon}
                    </span>
                )}

                <input
                    ref={setRefs}
                    id={inputId}
                    name={name}
                    type={effectiveType}
                    placeholder={placeholder}
                    aria-invalid={hasError || undefined}
                    aria-describedby={describedBy}
                    required={required}
                    disabled={disabled}
                    className={cn(paddingAdjusted, className)}
                    inputMode={inputMode}
                    // Provide a sensible default for phone inputs; user can override via props
                    autoComplete={type === 'tel' ? 'tel' : undefined}
                    {...rest}
                />

                {/* Right side: either custom icon or password toggle */}
                {withRightAddon && (
                    <span className="absolute inset-y-0 right-2 flex items-center">
                        {isPassword && passwordToggle ? (
                            <button
                                type="button"
                                className="text-muted-foreground hover:text-text transition-colors"
                                onClick={() => setShowPassword((v) => !v)}
                                aria-label={
                                    showPassword ? 'Ocultar contraseña' : 'Mostrar contraseña'
                                }
                                tabIndex={-1}
                            >
                                {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                            </button>
                        ) : isNumber && numberSpinButtons === 'custom' ? (
                            <span className="flex flex-col items-center justify-center gap-0.5">
                                <button
                                    type="button"
                                    className="h-4 w-6 rounded-sm text-muted-foreground hover:text-text focus-visible:outline-none focus-visible:ring-2 ring-ring"
                                    aria-label="Incrementar"
                                    tabIndex={-1}
                                    onClick={() => stepBy('up')}
                                >
                                    <ChevronUp size={14} />
                                </button>
                                <button
                                    type="button"
                                    className="h-4 w-6 rounded-sm text-muted-foreground hover:text-text focus-visible:outline-none focus-visible:ring-2 ring-ring"
                                    aria-label="Disminuir"
                                    tabIndex={-1}
                                    onClick={() => stepBy('down')}
                                >
                                    <ChevronDown size={14} />
                                </button>
                            </span>
                        ) : (
                            rightIcon
                        )}
                    </span>
                )}
            </div>

            {hint && !hasError && (
                <p id={hintId} className="mt-1 text-xs text-muted-foreground" aria-live="polite">
                    {hint}
                </p>
            )}
            {typeof error === 'string' && (
                <p id={errorId} className="mt-1 text-xs text-danger" aria-live="polite">
                    {error}
                </p>
            )}
            {!hasError && typeof success === 'string' && (
                <p className="mt-1 text-xs text-success" aria-live="polite">
                    {success}
                </p>
            )}
        </div>
    );
});

Input.displayName = 'Input';

export default Input;
