import { useEffect, useState } from 'react';
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

export const showInfoToast = (message: string, options?: ToastOptions) =>
    showToast(message, { type: 'info', ...options });
export const showSuccessToast = (message: string, options?: ToastOptions) =>
    showToast(message, { type: 'success', ...options });
export const showWarningToast = (message: string, options?: ToastOptions) =>
    showToast(message, { type: 'warning', ...options });
export const showErrorToast = (message: string, options?: ToastOptions) =>
    showToast(message, { type: 'error', ...options });

export const showLoadingToast = (message: string, options?: ToastOptions) =>
    toast.loading(message, options);

export function Toaster(props: ToastContainerProps & { autoTheme?: boolean }) {
    const { autoTheme = true, theme, ...rest } = props;
    const detectDark = () =>
        typeof document !== 'undefined' && document.documentElement.classList.contains('dark');
    const [mode, setMode] = useState<ToastContainerProps['theme']>(detectDark() ? 'dark' : 'light');

    useEffect(() => {
        if (!autoTheme) return;
        if (typeof document === 'undefined') return;
        const root = document.documentElement;
        const update = () => setMode(root.classList.contains('dark') ? 'dark' : 'light');
        update();
        const obs = new MutationObserver(() => update());
        obs.observe(root, { attributes: true, attributeFilter: ['class'] });
        return () => obs.disconnect();
    }, [autoTheme]);

    return (
        <ToastContainer
            theme={theme ?? mode}
            autoClose={3000}
            toastClassName={(context) =>
                `rounded-md p-4 shadow-md text-sm font-medium ${variantClasses[context?.type || 'default']}`
            }
            {...rest}
        />
    );
}

export { toast };
