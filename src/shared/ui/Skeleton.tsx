import { forwardRef } from 'react';
import type { HTMLAttributes, CSSProperties } from 'react';
import { cn } from '@/shared/lib/cn';

type Shape = 'text' | 'rect' | 'circle';
type Animate = 'shimmer' | 'pulse' | 'none';
type Rounded = 'none' | 'sm' | 'md' | 'lg' | 'xl' | '2xl' | 'full';

export type SkeletonProps = Omit<HTMLAttributes<HTMLDivElement>, 'children'> & {
    shape?: Shape;
    width?: number | string; // e.g., 200 or '100%'
    height?: number | string; // e.g., 16 or '2rem'
    rounded?: Rounded; // for rect
    lines?: number; // for text
    gap?: number; // px gap between lines
    animate?: Animate;
};

const roundedMap: Record<Rounded, string> = {
    none: '',
    sm: 'rounded',
    md: 'rounded-md',
    lg: 'rounded-lg',
    xl: 'rounded-xl',
    '2xl': 'rounded-2xl',
    full: 'rounded-full',
};

function toPx(v?: number | string): string | undefined {
    if (v === undefined) return undefined;
    return typeof v === 'number' ? `${v}px` : v;
}

export const Skeleton = forwardRef<HTMLDivElement, SkeletonProps>((props, ref) => {
    const {
        shape = 'rect',
        width,
        height,
        rounded = 'md',
        lines = 1,
        gap = 8,
        animate = 'shimmer',
        className,
        style,
        ...rest
    } = props;

    const base = cn(
        'skeleton relative overflow-hidden bg-[var(--skeleton-base)]',
        animate === 'shimmer' && 'skeleton--shimmer',
        animate === 'pulse' && 'animate-pulse',
        className,
    );

    if (shape === 'circle') {
        const s: CSSProperties = {
            width: toPx(width) ?? '2.5rem',
            height: toPx(height) ?? '2.5rem',
            ...style,
        };
        return (
            <div ref={ref} className={cn(base, 'rounded-full')} style={s} aria-hidden {...rest} />
        );
    }

    if (shape === 'text') {
        // Render lines with varying widths for natural look
        const items = Array.from({ length: Math.max(1, lines) }).map((_, i) => {
            const isLast = i === lines - 1;
            const lineWidth = toPx(width) ?? (isLast && lines > 1 ? '60%' : '100%');
            const lineHeight = toPx(height) ?? '0.875rem'; // ~14px
            return (
                <div
                    key={i}
                    className={cn(base, roundedMap[rounded])}
                    style={{
                        width: lineWidth,
                        height: lineHeight,
                        marginTop: i === 0 ? 0 : gap,
                        ...(style ?? {}),
                    }}
                    aria-hidden
                />
            );
        });
        return (
            <div ref={ref} className="w-full" aria-hidden {...rest}>
                {items}
            </div>
        );
    }

    // rect
    const s: CSSProperties = {
        width: toPx(width) ?? '100%',
        height: toPx(height) ?? '1rem',
        ...style,
    };
    return (
        <div ref={ref} className={cn(base, roundedMap[rounded])} style={s} aria-hidden {...rest} />
    );
});

Skeleton.displayName = 'Skeleton';

export default Skeleton;
