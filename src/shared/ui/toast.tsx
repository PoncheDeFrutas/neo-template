import {
    toast,
    ToastContainer,
    type ToastContainerProps,
    type ToastOptions,
    type TypeOptions,
} from 'react-toastify';

const variantClasses: Record<TypeOptions, string> = {
    default: 'bg-gray-800 text-white',
    success: 'bg-green-600 text-white',
    info: 'bg-blue-600 text-white',
    warning: 'bg-yellow-500 text-gray-900',
    error: 'bg-red-600 text-white',
};

export const showToast = (
    message: string,
    options?: ToastOptions & { position?: ToastContainerProps['position'] }
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