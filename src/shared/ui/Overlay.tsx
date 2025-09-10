import type { HTMLAttributes } from 'react';

import { cn } from '@/shared/lib/cn';

import { Portal } from './Portal';

export type OverlayProps = {
    open: boolean;
    onClick?: () => void;
    blur?: boolean;
    visible?: boolean; // for enter/exit fade support
} & Omit<HTMLAttributes<HTMLDivElement>, 'children'>;

export function Overlay({
    open,
    onClick,
    blur = false,
    visible = true,
    className,
    ...rest
}: OverlayProps) {
    if (!open) return null;
    return (
        <Portal>
            <div
                aria-hidden
                onClick={onClick}
                className={cn(
                    'fixed inset-0 z-[1000] bg-overlay',
                    blur && 'backdrop-blur-[2px] backdrop-saturate-150',
                    'transition-opacity',
                    visible ? 'duration-300' : 'duration-200',
                    visible ? 'opacity-100' : 'opacity-0',
                    className,
                )}
                {...rest}
            />
        </Portal>
    );
}

export default Overlay;
