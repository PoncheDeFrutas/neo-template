/* eslint-disable @typescript-eslint/no-explicit-any */
import { ChevronDown, X } from 'lucide-react';
import type { ReactNode, SelectHTMLAttributes } from 'react';
import { forwardRef, useEffect, useId, useMemo, useRef, useState } from 'react';

import { cn } from '@/shared/lib/cn';

type Size = 'sm' | 'md' | 'lg';
type Variant = 'outline' | 'filled' | 'ghost';

export type Option = {
    label: ReactNode;
    value: string;
    disabled?: boolean;
};

export type SelectProps = Omit<SelectHTMLAttributes<HTMLSelectElement>, 'size'> & {
    label?: string;
    hint?: string;
    error?: string | boolean;
    success?: string | boolean;
    placeholder?: string;
    size?: Size;
    fullWidth?: boolean;
    leftIcon?: ReactNode;
    rightIcon?: ReactNode;
    containerClassName?: string;
    selectClassName?: string;
    variant?: Variant;
    options?: Option[]; // optional, can also pass <option> children
};

const sizeClasses: Record<Size, string> = {
    sm: 'h-9 text-sm',
    md: 'h-10 text-sm',
    lg: 'h-12 text-base',
};

const variantClasses: Record<Variant, string> = {
    outline: 'bg-surface border-border hover:border-strong',
    filled: 'bg-bg border-transparent hover:border-border',
    ghost: 'bg-transparent border-transparent hover:bg-elevated',
};

export const Select = forwardRef<HTMLSelectElement, SelectProps>((props, ref) => {
    const {
        id,
        name,
        label,
        hint,
        error,
        success,
        placeholder,
        size = 'md',
        fullWidth = true,
        leftIcon,
        rightIcon,
        className,
        containerClassName,
        selectClassName,
        variant = 'outline',
        required,
        disabled,
        multiple,
        options,
        ...rest
    } = props;

    const autoId = useId();
    const selectId = id ?? `${name ?? 'select'}-${autoId}`;
    const hintId = hint ? `${selectId}-hint` : undefined;
    const errorId = error ? `${selectId}-error` : undefined;
    const describedBy = [hintId, errorId].filter(Boolean).join(' ') || undefined;
    const hasError = Boolean(error);
    const hasSuccess = !hasError && Boolean(success);

    const base = cn(
        'block rounded-md border text-text outline-none',
        'transition-all duration-200 ease-out',
        'focus-visible:ring-2 ring-ring focus-visible:border-transparent',
        'disabled:opacity-50 disabled:cursor-not-allowed',
        'invalid:border-danger invalid:focus-visible:ring-danger/70',
        fullWidth && 'w-full',
        sizeClasses[size],
        'appearance-none',
        'px-4',
        !multiple && 'pr-10',
        variantClasses[variant],
        hasError && 'border-danger focus-visible:ring-danger/70',
        hasSuccess && 'border-success focus-visible:ring-success/70',
        selectClassName,
    );

    const withLeftIcon = Boolean(leftIcon);
    const withRightIcon = Boolean(rightIcon) || !multiple; // chevron when not multiple
    const paddingAdjusted = cn(base, withLeftIcon && 'pl-10', withRightIcon && 'pr-10');

    const showPlaceholderOption = Boolean(placeholder) && !multiple;
    const hasExplicitValue = 'value' in props || 'defaultValue' in props;
    const computedDefaultValue = !hasExplicitValue && showPlaceholderOption ? '' : undefined;

    return (
        <div className={cn('inline-flex flex-col', fullWidth && 'w-full', containerClassName)}>
            {label && (
                <label
                    htmlFor={selectId}
                    className={cn(
                        'mb-1.5 text-sm font-medium',
                        hasError ? 'text-danger' : 'text-text',
                    )}
                >
                    {label}
                    {required ? <span className="text-danger"> *</span> : null}
                </label>
            )}
            <div className={cn('relative', fullWidth ? 'w-full' : 'inline-block')}>
                {withLeftIcon && (
                    <span className="pointer-events-none absolute inset-y-0 left-3 flex items-center text-muted-foreground">
                        {leftIcon}
                    </span>
                )}

                <select
                    ref={ref}
                    id={selectId}
                    name={name}
                    aria-invalid={hasError || undefined}
                    aria-describedby={describedBy}
                    required={required}
                    disabled={disabled}
                    multiple={multiple}
                    className={cn(paddingAdjusted, className)}
                    defaultValue={computedDefaultValue as any}
                    {...rest}
                >
                    {showPlaceholderOption && (
                        <option value="" disabled>
                            {placeholder}
                        </option>
                    )}
                    {options && options.length > 0
                        ? options.map((opt) => (
                              <option key={opt.value} value={opt.value} disabled={opt.disabled}>
                                  {opt.label}
                              </option>
                          ))
                        : props.children}
                </select>

                {withRightIcon && (
                    <span className="pointer-events-none absolute inset-y-0 right-2 flex items-center text-muted-foreground">
                        {rightIcon ?? <ChevronDown size={18} />}
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

Select.displayName = 'Select';

// Custom, searchable select (combobox-like)
export type SearchableSelectProps = {
    label?: string;
    hint?: string;
    error?: string | boolean;
    success?: string | boolean;
    placeholder?: string;
    size?: Size;
    fullWidth?: boolean;
    disabled?: boolean;
    containerClassName?: string;
    buttonClassName?: string;
    listClassName?: string;
    options: Option[];
    value: string | null;
    onChange: (value: string | null) => void;
    clearable?: boolean;
    searchable?: boolean;
};

export const SearchableSelect = (props: SearchableSelectProps) => {
    const {
        label,
        hint,
        error,
        success,
        placeholder = 'Selecciona...',
        size = 'md',
        fullWidth = true,
        disabled,
        containerClassName,
        buttonClassName,
        listClassName,
        options,
        value,
        onChange,
        clearable = true,
        searchable = true,
    } = props;

    const autoId = useId();
    const baseId = `combobox-${autoId}`;
    const hintId = hint ? `${baseId}-hint` : undefined;
    const errorId = error ? `${baseId}-error` : undefined;
    const listboxId = `${baseId}-listbox`;
    const hasError = Boolean(error);
    const hasSuccess = !hasError && Boolean(success);

    const [open, setOpen] = useState(false);
    const [query, setQuery] = useState('');
    const [highlighted, setHighlighted] = useState<number>(-1);
    const buttonRef = useRef<HTMLButtonElement | null>(null);
    const listRef = useRef<HTMLUListElement | null>(null);

    const current = useMemo(() => options.find((o) => o.value === value) || null, [options, value]);
    const filtered = useMemo(() => {
        const q = query.trim().toLowerCase();
        if (!q) return options;
        return options.filter((o) => String(o.label).toLowerCase().includes(q));
    }, [options, query]);

    useEffect(() => {
        if (!open) return;
        setHighlighted(filtered.length > 0 ? 0 : -1);
    }, [open, filtered.length]);

    useEffect(() => {
        const onDoc = (e: MouseEvent) => {
            if (!open) return;
            const target = e.target as Node;
            if (buttonRef.current?.contains(target)) return;
            if (listRef.current?.parentElement?.contains(target)) return;
            setOpen(false);
        };
        document.addEventListener('mousedown', onDoc);
        return () => document.removeEventListener('mousedown', onDoc);
    }, [open]);

    const pick = (idx: number) => {
        const opt = filtered[idx];
        if (!opt || opt.disabled) return;
        onChange(opt.value);
        setOpen(false);
        setQuery('');
        buttonRef.current?.focus();
    };

    const clear = () => {
        onChange(null);
        setQuery('');
        buttonRef.current?.focus();
    };

    const keyDown = (e: React.KeyboardEvent) => {
        if (!open) {
            if (['ArrowDown', 'Enter', ' '].includes(e.key)) {
                e.preventDefault();
                setOpen(true);
            }
            return;
        }
        if (e.key === 'Escape') {
            e.preventDefault();
            setOpen(false);
            return;
        }
        if (e.key === 'ArrowDown') {
            e.preventDefault();
            setHighlighted((h) => Math.min(h + 1, filtered.length - 1));
            return;
        }
        if (e.key === 'ArrowUp') {
            e.preventDefault();
            setHighlighted((h) => Math.max(h - 1, 0));
            return;
        }
        if (e.key === 'Enter') {
            e.preventDefault();
            if (highlighted >= 0) pick(highlighted);
            return;
        }
    };

    const baseButton = cn(
        'inline-flex w-full items-center justify-between rounded-md border text-text',
        'transition-all duration-200 ease-out',
        'focus-visible:outline-none focus-visible:ring-2 ring-ring',
        'disabled:opacity-50 disabled:cursor-not-allowed',
        sizeClasses[size],
        'px-4',
        'bg-surface border-border hover:border-strong',
        hasError && 'border-danger focus-visible:ring-danger/70',
        hasSuccess && 'border-success focus-visible:ring-success/70',
        buttonClassName,
    );

    return (
        <div className={cn('inline-flex flex-col', fullWidth && 'w-full', containerClassName)}>
            {label && (
                <label
                    className={cn(
                        'mb-1.5 text-sm font-medium',
                        hasError ? 'text-danger' : 'text-text',
                    )}
                >
                    {label}
                </label>
            )}
            <div className={cn('relative', fullWidth ? 'w-full' : 'inline-block')}>
                <button
                    ref={buttonRef}
                    type="button"
                    aria-haspopup="listbox"
                    aria-expanded={open}
                    aria-controls={open ? listboxId : undefined}
                    className={baseButton}
                    onClick={() => setOpen((v) => !v)}
                    onKeyDown={keyDown}
                    disabled={disabled}
                >
                    <span className={cn('truncate text-left', !current && 'text-muted-foreground')}>
                        {current ? current.label : placeholder}
                    </span>
                    <span className="ml-3 flex items-center gap-1 text-muted-foreground">
                        {clearable && current && (
                            <X
                                size={16}
                                className="hover:text-text"
                                onClick={(e) => {
                                    e.stopPropagation();
                                    clear();
                                }}
                                aria-label="Limpiar selección"
                            />
                        )}
                        <ChevronDown size={18} />
                    </span>
                </button>

                {open && (
                    <div className="absolute z-50 mt-1 w-full rounded-md border border-border bg-surface shadow-lg">
                        <div className="p-2">
                            {searchable && (
                                <input
                                    autoFocus
                                    className={cn(
                                        'block w-full rounded-md border bg-bg text-text placeholder:text-muted-foreground outline-none',
                                        'transition-all duration-200 ease-out',
                                        'focus-visible:ring-2 ring-ring focus-visible:border-transparent',
                                        'h-9 px-3 text-sm border-border hover:border-strong',
                                    )}
                                    placeholder="Buscar..."
                                    value={query}
                                    onChange={(e) => setQuery(e.target.value)}
                                    onKeyDown={(e) => {
                                        if (e.key === 'ArrowDown' || e.key === 'ArrowUp') {
                                            // delegate to list handler
                                            (listRef.current as any)?.focus();
                                            e.preventDefault();
                                        }
                                    }}
                                />
                            )}
                        </div>
                        <ul
                            ref={listRef}
                            id={listboxId}
                            role="listbox"
                            tabIndex={-1}
                            className={cn('max-h-60 overflow-auto p-1 outline-none', listClassName)}
                            onKeyDown={(e) => {
                                if (e.key === 'Escape') {
                                    setOpen(false);
                                    e.preventDefault();
                                } else if (e.key === 'ArrowDown') {
                                    e.preventDefault();
                                    setHighlighted((h) => Math.min(h + 1, filtered.length - 1));
                                } else if (e.key === 'ArrowUp') {
                                    e.preventDefault();
                                    setHighlighted((h) => Math.max(h - 1, 0));
                                } else if (e.key === 'Enter') {
                                    e.preventDefault();
                                    if (highlighted >= 0) pick(highlighted);
                                }
                            }}
                        >
                            {filtered.length === 0 ? (
                                <li className="px-3 py-2 text-sm text-muted-foreground">
                                    Sin resultados
                                </li>
                            ) : (
                                filtered.map((opt, idx) => {
                                    const selected = opt.value === value;
                                    const active = idx === highlighted;
                                    return (
                                        <li
                                            key={opt.value}
                                            role="option"
                                            aria-selected={selected}
                                            className={cn(
                                                'cursor-pointer select-none rounded-md px-3 py-2 text-sm',
                                                active && 'bg-elevated',
                                                selected && 'bg-primary text-primary-foreground',
                                                opt.disabled && 'opacity-50 cursor-not-allowed',
                                            )}
                                            onMouseEnter={() => setHighlighted(idx)}
                                            onClick={() => !opt.disabled && pick(idx)}
                                        >
                                            {opt.label}
                                        </li>
                                    );
                                })
                            )}
                        </ul>
                    </div>
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
};

export default Select;
