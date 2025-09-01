import {
    toast,
    ToastContainer,
    type ToastContainerProps,
    type ToastOptions,
    type TypeOptions,
} from 'react-toastify';

const variantClasses: Record<TypeOptions, string> = {
    default: 'bg-elevated text-text',
    success: 'bg-success text-success-foreground',
    info: 'bg-accent text-accent-foreground',
    warning: 'bg-warning text-warning-foreground',
    error: 'bg-danger text-danger-foreground',
};

export const showToast = (
    message: string,
    options?: ToastOptions & { position?: ToastContainerProps['position'] },
) => {
    return toast(message, {
        position: options?.position ?? 'bottom-right',
        ...options,
    });
};

export function Toaster(props: ToastContainerProps) {
    return (
        <ToastContainer
            autoClose={3000}
            toastClassName={(context) =>
                `rounded-md p-4 shadow-md text-sm font-medium ${variantClasses[context?.type || 'default']}`
            }
            {...props}
        />
    );
}

export { toast };
