import type { HTMLAttributes, ReactNode } from 'react';

import { cn } from '@/shared/lib/cn';

import { Badge } from './Badge';
import { Tooltip } from './Tooltip';

export type TooltipLabelProps = Omit<HTMLAttributes<HTMLSpanElement>, 'children'> & {
    text: ReactNode;
    tooltip: ReactNode;
    icon?: ReactNode;
    size?: 'sm' | 'md' | 'lg';
    variant?: 'neutral' | 'success' | 'warning' | 'danger' | 'custom';
    tone?: 'soft' | 'solid' | 'outline';
    badgeClassName?: string;
    tooltipClassName?: string;
};

export function TooltipLabel({
    text,
    tooltip,
    icon,
    size = 'sm',
    variant = 'neutral',
    tone = 'soft',
    className,
    badgeClassName,
    tooltipClassName,
    ...rest
}: TooltipLabelProps) {
    const label = (
        <Badge
            size={size}
            variant={variant}
            tone={tone}
            leftIcon={icon}
            className={cn('cursor-help', badgeClassName)}
        >
            {text}
        </Badge>
    );
    return (
        <Tooltip content={tooltip} className={tooltipClassName}>
            <span className={cn('inline-flex', className)} {...rest}>
                {label}
            </span>
        </Tooltip>
    );
}

export default TooltipLabel;
