import { forwardRef, type InputHTMLAttributes } from 'react';

export type FileInputSize = 'sm' | 'md' | 'lg';

export interface FileInputProps
    extends Omit<InputHTMLAttributes<HTMLInputElement>, 'size' | 'type'> {
    size?: FileInputSize;
    helperText?: string;
    dropzone?: boolean;
}

const baseStyles =
    'block w-full text-text border border-border rounded-lg cursor-pointer bg-surface focus:outline-none focus:ring-2 ring-ring focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed';

const sizeStyles: Record<FileInputSize, string> = {
    sm: 'text-sm p-2',
    md: 'text-sm p-2.5',
    lg: 'text-base p-4',
};

function cn(...classes: Array<string | false | null | undefined>) {
    return classes.filter(Boolean).join(' ');
}

export const FileInput = forwardRef<HTMLInputElement, FileInputProps>(function FileInput(
    { size = 'md', helperText, dropzone = false, className, ...props },
    ref,
) {
    if (dropzone) {
        return (
            <label
                className={cn(
                    'flex flex-col items-center justify-center w-full border-2 border-dashed rounded-lg cursor-pointer bg-surface hover:bg-bg transition-colors',
                    size === 'sm' && 'h-32',
                    size === 'md' && 'h-48',
                    size === 'lg' && 'h-64',
                    className,
                )}
            >
                <div className="flex flex-col items-center justify-center pt-5 pb-6">
                    <svg
                        className="w-8 h-8 mb-4 text-muted-foreground"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 20 16"
                        xmlns="http://www.w3.org/2000/svg"
                    >
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M13 13h3a1 1 0 0 0 1-1V2a1 1 0 0 0-1-1h-4l-2-2H6L4 1H1a1 1 0 0 0-1 1v10a1 1 0 0 0 1 1h3m2-4 3 3 3-3m-3 3V4"
                        />
                    </svg>
                    <p className="mb-2 text-sm text-muted-foreground">
                        <span className="font-semibold">Click to upload</span> or drag and drop
                    </p>
                    {helperText && <p className="text-xs text-muted-foreground">{helperText}</p>}
                </div>
                <input ref={ref} type="file" className="hidden" {...props} />
            </label>
        );
    }

    return (
        <div className="w-full">
            <input
                ref={ref}
                type="file"
                className={cn(baseStyles, sizeStyles[size], className)}
                {...props}
            />
            {helperText && <p className="mt-1 text-sm text-muted-foreground">{helperText}</p>}
        </div>
    );
});

export default FileInput;
