import type { HTMLAttributes } from 'react';

import { cn } from '@/shared/lib/cn';

export type SpinnerProps = {
    value?: number; // 0..100 for determinate
    indeterminate?: boolean;
    size?: number; // px
    thickness?: number; // stroke width in px
    showTrack?: boolean; // show background track circle
    className?: string;
    trackClassName?: string;
    arcClassName?: string;
    showLabel?: boolean; // optional inline percentage label
    labelClassName?: string;
    ariaLabel?: string; // accessible label when no visible context
} & Omit<HTMLAttributes<HTMLDivElement>, 'children'>;

/**
 * Circular Spinner with determinate and indeterminate modes.
 * - Determinate: provide `value` (0..100)
 * - Indeterminate: set `indeterminate` to true
 */
export function Spinner({
    value,
    indeterminate,
    size = 40,
    thickness = 4,
    showTrack = true,
    className,
    trackClassName,
    arcClassName,
    showLabel,
    labelClassName,
    ariaLabel,
    ...rest
}: SpinnerProps) {
    const v = typeof value === 'number' ? Math.max(0, Math.min(100, value)) : undefined;
    const r = (size - thickness) / 2;
    const c = 2 * Math.PI * r;
    const dashArray = c;
    const dashOffset = v != null ? (1 - v / 100) * c : undefined;

    const isIndeterminate = !!indeterminate;
    const ariaNow: number | undefined = isIndeterminate ? undefined : v;

    return (
        <div
            className={cn(
                'spinner relative inline-flex items-center justify-center',
                isIndeterminate && 'spinner--indeterminate',
                className,
            )}
            role="progressbar"
            aria-label={ariaLabel}
            aria-valuemin={0}
            aria-valuemax={100}
            aria-valuenow={ariaNow}
            {...rest}
        >
            <svg
                className={cn('spinner__svg')}
                width={size}
                height={size}
                viewBox={`0 0 ${size} ${size}`}
            >
                {showTrack && (
                    <circle
                        cx={size / 2}
                        cy={size / 2}
                        r={r}
                        fill="none"
                        strokeWidth={thickness}
                        className={cn('stroke-[var(--color-border-subtle)]', trackClassName)}
                    />
                )}
                <circle
                    className={cn('spinner__circle stroke-[var(--color-primary)]', arcClassName)}
                    cx={size / 2}
                    cy={size / 2}
                    r={r}
                    fill="none"
                    strokeWidth={thickness}
                    strokeLinecap="round"
                    strokeDasharray={isIndeterminate ? undefined : dashArray}
                    strokeDashoffset={isIndeterminate ? undefined : dashOffset}
                    transform={`rotate(-90 ${size / 2} ${size / 2})`}
                />
            </svg>

            {showLabel && !isIndeterminate && v != null && (
                <span className={cn('absolute text-xs font-medium text-text', labelClassName)}>
                    {v}%
                </span>
            )}
        </div>
    );
}

export default Spinner;
