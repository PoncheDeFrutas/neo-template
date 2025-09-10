/* eslint-disable react-refresh/only-export-components */
import 'react-toastify/dist/ReactToastify.css';

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

/**
 * Displays a toast notification with the specified message and options.
 *
 * @param message - The text content to display in the toast notification
 * @param options - Optional configuration object for the toast
 * @param options.position - The position where the toast should appear on screen (defaults to 'bottom-right')
 * @returns The toast instance returned by the underlying toast library
 *
 * @example
 * ```tsx
 * // Basic usage
 * showToast('Operation completed successfully');
 *
 * // With custom position
 * showToast('Error occurred', { position: 'top-center' });
 *
 * // With additional options
 * showToast('Custom toast', {
 *   position: 'top-right',
 *   autoClose: 5000,
 *   type: 'success'
 * });
 * ```
 */
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

/**
 * A toast notification container component that automatically adapts to the current theme.
 *
 * @param props - The props for the toast container
 * @param props.autoTheme - Whether to automatically detect and switch between light/dark themes based on the document's class. Defaults to true
 * @param props.theme - Manual theme override. When provided, autoTheme detection is bypassed
 * @param props.rest - Additional props passed through to the underlying ToastContainer component
 *
 * @returns A ToastContainer component with automatic theme detection and custom styling
 *
 * @example
 * ```tsx
 * // Auto theme detection (default)
 * <Toaster />
 *
 * // Manual theme override
 * <Toaster theme="dark" autoTheme={false} />
 *
 * // With additional toast container props
 * <Toaster position="top-right" hideProgressBar />
 * ```
 */
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
