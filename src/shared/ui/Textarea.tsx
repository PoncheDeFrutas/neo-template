import { forwardRef, useEffect, useId, useLayoutEffect, useRef, useState } from 'react';
import type { ReactNode, TextareaHTMLAttributes, MutableRefObject } from 'react';
import { cn } from '@/shared/lib/cn';

type Size = 'sm' | 'md' | 'lg';

export type TextareaProps = Omit<TextareaHTMLAttributes<HTMLTextAreaElement>, 'size'> & {
    label?: ReactNode;
    hint?: string;
    error?: string | boolean;
    success?: string | boolean;
    size?: Size;
    fullWidth?: boolean;
    autoResize?: boolean;
    containerClassName?: string;
    textareaClassName?: string;
};

const sizeClasses: Record<Size, string> = {
    sm: 'text-sm py-2',
    md: 'text-sm py-2.5',
    lg: 'text-base py-3',
};

export const Textarea = forwardRef<HTMLTextAreaElement, TextareaProps>((props, ref) => {
    const {
        id,
        name,
        label,
        hint,
        error,
        success,
        size = 'md',
        fullWidth = true,
        autoResize = false,
        className,
        containerClassName,
        textareaClassName,
        required,
        disabled,
        maxLength,
        rows = 3,
        onChange,
        value,
        defaultValue,
        ...rest
    } = props;

    const autoId = useId();
    const textareaId = id ?? `${name ?? 'textarea'}-${autoId}`;
    const hintId = hint ? `${textareaId}-hint` : undefined;
    const errorId = error ? `${textareaId}-error` : undefined;
    const describedBy = [hintId, errorId].filter(Boolean).join(' ') || undefined;
    const hasError = Boolean(error);
    const hasSuccess = !hasError && Boolean(success);

    const innerRef = useRef<HTMLTextAreaElement | null>(null);
    const setRefs = (node: HTMLTextAreaElement | null) => {
        innerRef.current = node;
        if (typeof ref === 'function') {
            (ref as (instance: HTMLTextAreaElement | null) => void)(node);
        } else if (ref && typeof ref === 'object' && 'current' in ref) {
            (ref as MutableRefObject<HTMLTextAreaElement | null>).current = node;
        }
    };

    const adjustHeight = () => {
        const el = innerRef.current;
        if (!el) return;
        el.style.height = 'auto';
        el.style.height = `${el.scrollHeight}px`;
    };

    // Character count support (when maxLength is given)
    const initialText =
        (typeof value === 'string'
            ? value
            : typeof defaultValue === 'string'
              ? defaultValue
              : '') ?? '';
    const [count, setCount] = useState<number>(initialText.length);

    useEffect(() => {
        if (typeof value === 'string') setCount(value.length);
    }, [value]);

    useLayoutEffect(() => {
        if (!autoResize) return;
        adjustHeight();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [autoResize]);

    useEffect(() => {
        if (!autoResize) return;
        adjustHeight();
        // Adjust on font-size changes (theme toggle) — micro delay
        const t = setTimeout(adjustHeight, 50);
        return () => clearTimeout(t);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [value]);

    const base = cn(
        'block rounded-md border bg-surface text-text placeholder:text-muted-foreground outline-none',
        'transition-all duration-200 ease-out',
        'focus-visible:ring-2 ring-ring focus-visible:border-transparent',
        'disabled:opacity-50 disabled:cursor-not-allowed',
        'invalid:border-danger invalid:focus-visible:ring-danger/70',
        fullWidth && 'w-full',
        sizeClasses[size],
        'px-4',
        autoResize ? 'resize-none overflow-hidden' : 'resize-y',
        'border-border hover:border-strong',
        hasError && 'border-danger focus-visible:ring-danger/70',
        hasSuccess && 'border-success focus-visible:ring-success/70',
        textareaClassName,
    );

    return (
        <div className={cn('inline-flex flex-col', fullWidth && 'w-full', containerClassName)}>
            {label && (
                <label
                    htmlFor={textareaId}
                    className={cn(
                        'mb-1.5 text-sm font-medium',
                        hasError ? 'text-danger' : 'text-text',
                    )}
                >
                    {label}
                    {required ? <span className="text-danger"> *</span> : null}
                </label>
            )}
            <textarea
                ref={setRefs}
                id={textareaId}
                name={name}
                rows={rows}
                aria-invalid={hasError || undefined}
                aria-describedby={describedBy}
                required={required}
                disabled={disabled}
                maxLength={maxLength}
                value={value}
                defaultValue={defaultValue}
                onChange={(e) => {
                    if (autoResize) adjustHeight();
                    setCount(e.currentTarget.value.length);
                    onChange?.(e);
                }}
                className={cn(base, className)}
                {...rest}
            />
            <div className="mt-1 flex items-center gap-3">
                {hint && !hasError ? (
                    <p id={hintId} className="text-xs text-muted-foreground" aria-live="polite">
                        {hint}
                    </p>
                ) : null}
                {typeof error === 'string' && (
                    <p id={errorId} className="text-xs text-danger" aria-live="polite">
                        {error}
                    </p>
                )}
                {!hasError && typeof success === 'string' && (
                    <p className="text-xs text-success" aria-live="polite">
                        {success}
                    </p>
                )}
                {typeof maxLength === 'number' && (
                    <p className="ml-auto text-xs text-muted-foreground" aria-live="polite">
                        {count}/{maxLength}
                    </p>
                )}
            </div>
        </div>
    );
});

Textarea.displayName = 'Textarea';

export default Textarea;
