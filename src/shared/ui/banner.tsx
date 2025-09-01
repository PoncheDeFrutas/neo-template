import type { ReactNode } from 'react';

/**
 * Allowed variants for the Banner component.
 */
export type BannerVariant = 'default' | 'bottom' | 'marketing' | 'cta' | 'info';

/**
 * Props for the Banner component.
 *
 * @interface BannerProps
 * @property {BannerVariant} variant - Visual style of the banner.
 * @property {'top' | 'bottom'} [position] - Optional fixed position on screen.
 * @property {ReactNode} [children] - Banner content.
 * @property {string} [className] - Additional classes.
 */
export interface BannerProps {
    variant: BannerVariant;
    position?: 'top' | 'bottom';
    children?: ReactNode;
    className?: string;
}

/**
 * Utility to conditionally join class names.
 */
function cn(...classes: Array<string | false | null | undefined>) {
    return classes.filter(Boolean).join(' ');
}

/**
 * Displays contextual messages across the application.
 *
 * Each variant maps to a set of Tailwind CSS classes providing
 * different visual styles.
 *
 * @param props - Component properties
 * @returns A banner element
 */
export function Banner({ variant, position, children, className }: BannerProps) {
    const base = 'w-full';

    const variantStyles: Record<BannerVariant, string> = {
        default: 'bg-blue-600 text-white px-4 py-2 text-center',
        bottom: 'bg-blue-600 text-white px-4 py-2 text-center shadow-md z-50',
        marketing:
            'bg-gray-100 border border-gray-200 p-6 flex flex-col sm:flex-row items-center justify-between gap-4',
        cta: 'bg-indigo-600 text-white p-4 flex items-center justify-between gap-4',
        info: 'bg-blue-50 text-blue-900 p-4 border-l-4 border-blue-400',
    };

    const positionClass = cn(
        variant === 'bottom' && 'fixed inset-x-0 bottom-0',
        position === 'top' && 'fixed inset-x-0 top-0',
        position === 'bottom' && 'fixed inset-x-0 bottom-0',
    );

    return (
        <div className={cn(base, variantStyles[variant], positionClass, className)}>{children}</div>
    );
}