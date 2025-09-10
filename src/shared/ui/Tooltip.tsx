import type { HTMLAttributes, ReactNode } from 'react';
import { useEffect, useId, useRef, useState } from 'react';

import { cn } from '@/shared/lib/cn';

import { Portal } from './Portal';

type Side = 'top' | 'right' | 'bottom' | 'left';

export type TooltipProps = {
    content: ReactNode;
    side?: Side;
    delay?: number; // ms before showing
    disabled?: boolean;
    className?: string; // tooltip panel className
    children: ReactNode;
} & Omit<HTMLAttributes<HTMLSpanElement>, 'children' | 'content'>;

export function Tooltip({
    content,
    side = 'top',
    delay = 200,
    disabled,
    className,
    children,
    ...rest
}: TooltipProps) {
    const anchorRef = useRef<HTMLSpanElement | null>(null);
    const [open, setOpen] = useState(false);
    const [mounted, setMounted] = useState(false);
    const [coords, setCoords] = useState<{ top: number; left: number } | null>(null);
    const showTimer = useRef<number | null>(null);
    const hideTimer = useRef<number | null>(null);
    const tid = useId();
    const tooltipId = `tt-${tid}`;

    const clearTimers = () => {
        if (showTimer.current) {
            window.clearTimeout(showTimer.current);
            showTimer.current = null;
        }
        if (hideTimer.current) {
            window.clearTimeout(hideTimer.current);
            hideTimer.current = null;
        }
    };

    const compute = () => {
        const el = anchorRef.current;
        if (!el) return;
        const r = el.getBoundingClientRect();
        const gap = 8;
        let top = 0;
        let left = 0;
        switch (side) {
            case 'top':
                top = r.top - gap;
                left = r.left + r.width / 2;
                break;
            case 'bottom':
                top = r.bottom + gap;
                left = r.left + r.width / 2;
                break;
            case 'left':
                top = r.top + r.height / 2;
                left = r.left - gap;
                break;
            case 'right':
                top = r.top + r.height / 2;
                left = r.right + gap;
                break;
        }
        setCoords({ top, left });
    };

    useEffect(() => {
        if (!open) return;
        compute();
        const onScroll = () => compute();
        const onResize = () => compute();
        window.addEventListener('scroll', onScroll, true);
        window.addEventListener('resize', onResize);
        return () => {
            window.removeEventListener('scroll', onScroll, true);
            window.removeEventListener('resize', onResize);
        };
    }, [open, side]);

    const show = () => {
        if (disabled) return;
        clearTimers();
        showTimer.current = window.setTimeout(
            () => {
                setMounted(true);
                setOpen(true);
                compute();
            },
            Math.max(0, delay),
        );
    };
    const hide = () => {
        clearTimers();
        // Slightly quicker hide for responsiveness
        hideTimer.current = window.setTimeout(() => {
            setOpen(false);
            setMounted(false);
        }, 50);
    };

    useEffect(() => () => clearTimers(), []);

    const transform =
        side === 'top'
            ? 'translate(-50%, -100%)'
            : side === 'bottom'
              ? 'translate(-50%, 0)'
              : side === 'left'
                ? 'translate(-100%, -50%)'
                : 'translate(0, -50%)';

    return (
        <span
            ref={anchorRef}
            className="inline-block align-middle"
            onMouseEnter={show}
            onMouseLeave={hide}
            onFocus={show}
            onBlur={hide}
            onPointerDown={hide}
            aria-describedby={mounted ? tooltipId : undefined}
            {...rest}
        >
            {children}
            {mounted && coords ? (
                <Portal>
                    <div
                        id={tooltipId}
                        role="tooltip"
                        className={cn(
                            'pointer-events-none fixed z-[1002] select-none rounded-md px-2.5 py-1.5 text-xs shadow-md',
                            'transition-all duration-150 ease-out',
                            open ? 'opacity-100 scale-100' : 'opacity-0 scale-95',
                            className,
                        )}
                        style={{
                            top: coords.top,
                            left: coords.left,
                            transform,
                            backgroundColor: 'var(--color-text)',
                            color: 'var(--color-bg)',
                        }}
                    >
                        {content}
                    </div>
                </Portal>
            ) : null}
        </span>
    );
}

export default Tooltip;
