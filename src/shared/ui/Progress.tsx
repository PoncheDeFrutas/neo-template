import type { HTMLAttributes } from 'react';

/* eslint-disable @typescript-eslint/no-explicit-any */
import { cn } from '@/shared/lib/cn';

export type ProgressProps = {
    value?: number; // 0..100
    indeterminate?: boolean;
    rounded?: 'sm' | 'md' | 'lg' | 'full';
    height?: 'xs' | 'sm' | 'md';
    trackClassName?: string;
    barClassName?: string;
} & Omit<HTMLAttributes<HTMLDivElement>, 'children'>;

const heightMap = {
    xs: 'h-1.5',
    sm: 'h-2',
    md: 'h-3',
};

export function Progress({
    value,
    indeterminate,
    rounded = 'full',
    height = 'sm',
    className,
    trackClassName,
    barClassName,
    ...rest
}: ProgressProps) {
    const v = typeof value === 'number' ? Math.max(0, Math.min(100, value)) : undefined;
    const r =
        rounded === 'full'
            ? 'rounded-full'
            : rounded === 'lg'
              ? 'rounded-lg'
              : rounded === 'md'
                ? 'rounded-md'
                : 'rounded-sm';
    const h = heightMap[height];
    const ariaNow = indeterminate ? undefined : v;
    return (
        <div
            role="progressbar"
            aria-valuemin={0}
            aria-valuemax={100}
            aria-valuenow={ariaNow as any}
            className={cn(
                'progress relative w-full overflow-hidden',
                r,
                h,
                'bg-border-subtle',
                className,
                trackClassName,
            )}
            {...rest}
        >
            <div
                className={cn(
                    'progress__bar h-full bg-primary',
                    r,
                    indeterminate ? 'progress--indeterminate' : '',
                    !indeterminate && v != null ? '' : '',
                    barClassName,
                )}
                style={!indeterminate && v != null ? { width: `${v}%` } : undefined}
            />
        </div>
    );
}

export type CircularProgressProps = {
    value: number; // 0..100
    size?: number; // px
    stroke?: number; // px
    className?: string;
    trackClassName?: string;
    arcClassName?: string;
    showLabel?: boolean;
    labelClassName?: string;
} & Omit<HTMLAttributes<HTMLDivElement>, 'children'>;

export function CircularProgress({
    value,
    size = 48,
    stroke = 4,
    className,
    trackClassName,
    arcClassName,
    showLabel,
    labelClassName,
    ...rest
}: CircularProgressProps) {
    const v = Math.max(0, Math.min(100, value));
    const r = (size - stroke) / 2;
    const c = 2 * Math.PI * r;
    const dashArray = c;
    const dashOffset = (1 - v / 100) * c;
    return (
        <div className={cn('inline-flex items-center justify-center', className)} {...rest}>
            <svg
                role="progressbar"
                aria-valuemin={0}
                aria-valuemax={100}
                aria-valuenow={v as any}
                width={size}
                height={size}
                viewBox={`0 0 ${size} ${size}`}
            >
                <circle
                    cx={size / 2}
                    cy={size / 2}
                    r={r}
                    fill="none"
                    strokeWidth={stroke}
                    className={cn('stroke-[var(--color-border-subtle)]', trackClassName)}
                />
                <circle
                    cx={size / 2}
                    cy={size / 2}
                    r={r}
                    fill="none"
                    strokeWidth={stroke}
                    strokeLinecap="round"
                    className={cn('stroke-[var(--color-primary)]', arcClassName)}
                    strokeDasharray={dashArray}
                    strokeDashoffset={dashOffset}
                    transform={`rotate(-90 ${size / 2} ${size / 2})`}
                />
            </svg>
            {showLabel && (
                <span className={cn('absolute text-xs font-medium text-text', labelClassName)}>
                    {v}%
                </span>
            )}
        </div>
    );
}

export default Progress;
