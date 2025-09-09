import { forwardRef } from 'react';
import type { HTMLAttributes, ReactNode } from 'react';
import { cn } from '@/shared/lib/cn';

type Variant = 'neutral' | 'success' | 'warning' | 'danger' | 'custom';
type Tone = 'soft' | 'solid' | 'outline';
type Size = 'sm' | 'md' | 'lg';

export type BadgeProps = HTMLAttributes<HTMLSpanElement> & {
    variant?: Variant;
    tone?: Tone;
    size?: Size;
    leftIcon?: ReactNode;
    rightIcon?: ReactNode;
};

const sizeClasses: Record<Size, string> = {
    sm: 'h-5 text-[11px] px-2',
    md: 'h-6 text-xs px-2.5',
    lg: 'h-7 text-sm px-3',
};

function variantToneClasses(variant: Exclude<Variant, 'custom'>, tone: Tone): string {
    if (tone === 'solid') {
        switch (variant) {
            case 'neutral':
                return 'bg-secondary text-secondary-foreground';
            case 'success':
                return 'bg-success text-success-foreground';
            case 'warning':
                return 'bg-warning text-warning-foreground';
            case 'danger':
                return 'bg-danger text-danger-foreground';
        }
    }
    if (tone === 'outline') {
        switch (variant) {
            case 'neutral':
                return 'bg-transparent text-text border border-border';
            case 'success':
                return 'bg-transparent text-success border border-success';
            case 'warning':
                return 'bg-transparent text-warning border border-warning';
            case 'danger':
                return 'bg-transparent text-danger border border-danger';
        }
    }
    // soft (default)
    switch (variant) {
        case 'neutral':
            return 'bg-bg-subtle text-muted-foreground border border-border-subtle';
        case 'success':
            return 'bg-success/10 text-success border border-success/20';
        case 'warning':
            return 'bg-warning/10 text-warning border border-warning/20';
        case 'danger':
            return 'bg-danger/10 text-danger border border-danger/20';
    }
}

export const Badge = forwardRef<HTMLSpanElement, BadgeProps>((props, ref) => {
    const {
        variant = 'neutral',
        tone = 'soft',
        size = 'md',
        leftIcon,
        rightIcon,
        className,
        children,
        ...rest
    } = props;
    const base = cn(
        'inline-flex items-center gap-1 rounded-full font-medium select-none whitespace-nowrap',
        'transition-colors duration-200 ease-out',
        sizeClasses[size],
        variant === 'custom' ? '' : variantToneClasses(variant, tone),
        className,
    );
    return (
        <span ref={ref} className={base} {...rest}>
            {leftIcon ? <span className="-ml-0.5 inline-flex items-center">{leftIcon}</span> : null}
            {children}
            {rightIcon ? (
                <span className="-mr-0.5 inline-flex items-center">{rightIcon}</span>
            ) : null}
        </span>
    );
});

Badge.displayName = 'Badge';

export default Badge;
