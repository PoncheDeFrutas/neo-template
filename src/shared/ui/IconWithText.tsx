import type { HTMLAttributes, ReactNode } from 'react';
import { cn } from '@/shared/lib/cn';

export type IconWithTextProps = Omit<HTMLAttributes<HTMLSpanElement>, 'children'> & {
    icon: ReactNode;
    text: ReactNode;
    size?: 'xs' | 'sm' | 'md';
    gap?: number; // px
    muted?: boolean; // aplica color de texto tenue
    iconClassName?: string;
    textClassName?: string;
};

export function IconWithText({
    icon,
    text,
    size = 'sm',
    gap = 6,
    muted = true,
    className,
    iconClassName,
    textClassName,
    style,
    ...rest
}: IconWithTextProps) {
    const textSize = size === 'xs' ? 'text-[11px]' : size === 'md' ? 'text-sm' : 'text-xs';
    return (
        <span
            className={cn('inline-flex items-center', className)}
            style={{ gap, ...(style ?? {}) }}
            {...rest}
        >
            <span className={cn('inline-flex items-center', iconClassName)}>{icon}</span>
            <span
                className={cn(
                    'truncate',
                    textSize,
                    muted ? 'text-muted-foreground' : 'text-text',
                    textClassName,
                )}
            >
                {text}
            </span>
        </span>
    );
}

export default IconWithText;
