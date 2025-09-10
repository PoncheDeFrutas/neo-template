import type {
    ChangeEvent,
    DragEvent,
    HTMLAttributes,
    InputHTMLAttributes,
    MutableRefObject,
    ReactNode,
} from 'react';
import { forwardRef, useId, useMemo, useRef, useState } from 'react';

import { cn } from '@/shared/lib/cn';

type Size = 'sm' | 'md' | 'lg';

export type FileInputProps = Omit<
    InputHTMLAttributes<HTMLInputElement>,
    'type' | 'size' | 'value'
> & {
    label?: string;
    hint?: string;
    error?: string | boolean;
    success?: string | boolean;
    leftIcon?: ReactNode;
    rightIcon?: ReactNode;
    size?: Size;
    fullWidth?: boolean;
    dropzone?: boolean;
    onFilesChange?: (files: File[]) => void;
    containerClassName?: string;
    inputClassName?: string;
    dropzoneClassName?: string;
    buttonLabel?: string;
    showSelected?: boolean;
};

const sizeClasses: Record<Size, string> = {
    sm: 'h-9 text-sm',
    md: 'h-10 text-sm',
    lg: 'h-12 text-base',
};

export const FileInput = forwardRef<HTMLInputElement, FileInputProps>((props, ref) => {
    const {
        id,
        name,
        label,
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
        dropzoneClassName,
        dropzone = false,
        multiple,
        accept,
        required,
        disabled,
        onChange,
        onFilesChange,
        buttonLabel,
        showSelected = true,
        ...rest
    } = props;

    const autoId = useId();
    const inputId = id ?? `${name ?? 'file'}-${autoId}`;
    const hintId = hint ? `${inputId}-hint` : undefined;
    const errorId = error ? `${inputId}-error` : undefined;
    const describedBy = [hintId, errorId].filter(Boolean).join(' ') || undefined;
    const hasError = Boolean(error);
    const hasSuccess = !hasError && Boolean(success);

    const [isDragging, setDragging] = useState(false);
    const [pickedFiles, setPickedFiles] = useState<File[]>([]);

    const innerRef = useRef<HTMLInputElement | null>(null);
    const setRefs = (node: HTMLInputElement | null) => {
        innerRef.current = node;
        if (typeof ref === 'function') {
            (ref as (instance: HTMLInputElement | null) => void)(node);
        } else if (ref && typeof ref === 'object' && 'current' in ref) {
            (ref as MutableRefObject<HTMLInputElement | null>).current = node;
        }
    };

    const base = cn(
        'rounded-md border bg-surface text-text outline-none',
        'transition-all duration-200 ease-out',
        'focus-visible:ring-2 ring-ring focus-visible:border-transparent',
        'disabled:opacity-50 disabled:cursor-not-allowed',
        'border-border hover:border-strong',
        hasError && 'border-danger focus-visible:ring-danger/70',
        hasSuccess && 'border-success focus-visible:ring-success/70',
        fullWidth && 'w-full',
    );

    const controlClasses = cn(
        base,
        !dropzone && sizeClasses[size],
        !dropzone && 'px-4',
        'relative',
        inputClassName,
    );

    const dropzoneClasses = cn(
        base,
        'px-4 py-8 text-center border-dashed',
        isDragging && 'ring-2 ring-primary/50 border-primary',
        dropzoneClassName,
    );

    const withLeftIcon = Boolean(leftIcon);
    const withRightIcon = Boolean(rightIcon);

    const labelText = useMemo(() => {
        if (buttonLabel) return buttonLabel;
        return multiple ? 'Seleccionar archivos' : 'Seleccionar archivo';
    }, [buttonLabel, multiple]);

    const handleFiles = (files: FileList | null) => {
        const arr = files ? Array.from(files) : [];
        setPickedFiles(arr);
        onFilesChange?.(arr);
    };

    const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
        handleFiles(e.target.files);
        onChange?.(e);
    };

    const preventDefaults = (e: DragEvent) => {
        e.preventDefault();
        e.stopPropagation();
    };

    const onDragEnter = (e: DragEvent<HTMLDivElement>) => {
        preventDefaults(e);
        if (disabled) return;
        setDragging(true);
    };
    const onDragOver = (e: DragEvent<HTMLDivElement>) => {
        preventDefaults(e);
        if (disabled) return;
        setDragging(true);
    };
    const onDragLeave = (e: DragEvent<HTMLDivElement>) => {
        preventDefaults(e);
        setDragging(false);
    };
    const onDrop = (e: DragEvent<HTMLDivElement>) => {
        preventDefaults(e);
        if (disabled) return;
        setDragging(false);
        const dt = e.dataTransfer;
        handleFiles(dt?.files ?? null);
    };

    const openFileDialog = () => {
        if (disabled) return;
        innerRef.current?.click();
    };

    const selectedSummary = useMemo(() => {
        if (!pickedFiles.length) return '';
        if (pickedFiles.length === 1) return pickedFiles[0].name;
        return `${pickedFiles.length} archivos seleccionados`;
    }, [pickedFiles]);

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

            {/* Hidden native input */}
            <input
                ref={setRefs}
                id={inputId}
                name={name}
                type="file"
                className="sr-only"
                aria-invalid={hasError || undefined}
                aria-describedby={describedBy}
                required={required}
                disabled={disabled}
                multiple={multiple}
                accept={accept}
                onChange={handleInputChange}
                {...(rest as HTMLAttributes<HTMLInputElement>)}
            />

            {dropzone ? (
                <div
                    className={cn(dropzoneClasses, 'cursor-pointer select-none')}
                    onClick={openFileDialog}
                    onDragEnter={onDragEnter}
                    onDragOver={onDragOver}
                    onDragLeave={onDragLeave}
                    onDrop={onDrop}
                    role="button"
                    tabIndex={0}
                    onKeyDown={(e) => {
                        if (e.key === 'Enter' || e.key === ' ') {
                            e.preventDefault();
                            openFileDialog();
                        }
                    }}
                    aria-describedby={describedBy}
                >
                    <div className="flex flex-col items-center justify-center gap-2 text-sm text-muted-foreground">
                        {leftIcon ? <span className="text-text">{leftIcon}</span> : null}
                        <div className="font-medium text-text">{labelText}</div>
                        <div>o arrastra y suelta aquí</div>
                        {showSelected && selectedSummary ? (
                            <div className="mt-1 text-xs text-muted-foreground">
                                {selectedSummary}
                            </div>
                        ) : null}
                    </div>
                </div>
            ) : (
                <div
                    className={cn('flex items-center gap-2', controlClasses)}
                    aria-describedby={describedBy}
                >
                    {withLeftIcon && (
                        <span className="pointer-events-none text-muted-foreground">
                            {leftIcon}
                        </span>
                    )}
                    <button
                        type="button"
                        onClick={openFileDialog}
                        className={cn(
                            'inline-flex items-center justify-center rounded-md border px-3 py-1 text-sm font-medium',
                            'border-border hover:bg-muted/40 text-text',
                            'focus-visible:outline-none focus-visible:ring-2 ring-ring',
                        )}
                        disabled={disabled}
                    >
                        {labelText}
                    </button>
                    <div className="truncate text-sm text-muted-foreground">
                        {showSelected && selectedSummary
                            ? selectedSummary
                            : 'Ningún archivo seleccionado'}
                    </div>
                    {withRightIcon && (
                        <span className="ml-auto text-muted-foreground">{rightIcon}</span>
                    )}
                </div>
            )}

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

FileInput.displayName = 'FileInput';

export default FileInput;
