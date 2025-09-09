import { useEffect, useId, useRef, useState } from 'react';
import type { ReactNode, HTMLAttributes } from 'react';
import { Portal } from './Portal';
import { cn } from '@/shared/lib/cn';

type Side = 'top' | 'right' | 'bottom' | 'left';
type Align = 'start' | 'center' | 'end';

export type PopoverProps = {
    panel: ReactNode | (() => ReactNode);
    side?: Side;
    align?: Align;
    open?: boolean; // controlled
    defaultOpen?: boolean; // uncontrolled
    onOpenChange?: (open: boolean) => void;
    sideOffset?: number;
    alignOffset?: number;
    disabled?: boolean;
    closeOnOutsideClick?: boolean;
    panelClassName?: string;
    children: ReactNode; // trigger
} & Omit<HTMLAttributes<HTMLSpanElement>, 'children'>;

export function Popover({
    panel,
    side = 'bottom',
    align = 'center',
    open,
    defaultOpen,
    onOpenChange,
    sideOffset = 8,
    alignOffset = 0,
    disabled,
    closeOnOutsideClick = true,
    panelClassName,
    children,
    ...rest
}: PopoverProps) {
    const anchorRef = useRef<HTMLSpanElement | null>(null);
    const panelRef = useRef<HTMLDivElement | null>(null);
    const isControlled = typeof open === 'boolean';
    const [uncontrolledOpen, setUncontrolledOpen] = useState<boolean>(Boolean(defaultOpen));
    const realOpen = isControlled ? Boolean(open) : uncontrolledOpen;

    const [mounted, setMounted] = useState<boolean>(realOpen);
    const [visible, setVisible] = useState<boolean>(realOpen);
    const [coords, setCoords] = useState<{ top: number; left: number } | null>(null);
    const id = useId();
    const panelId = `popover-${id}`;

    const setOpen = (v: boolean) => {
        if (disabled) return;
        if (!isControlled) setUncontrolledOpen(v);
        onOpenChange?.(v);
    };

    const toggle = () => setOpen(!realOpen);

    const compute = () => {
        const a = anchorRef.current;
        if (!a) return;
        const r = a.getBoundingClientRect();
        let top = 0;
        let left = 0;
        if (side === 'bottom') {
            top = r.bottom + sideOffset;
            if (align === 'start') left = r.left + alignOffset;
            else if (align === 'end') left = r.right - alignOffset;
            else left = r.left + r.width / 2;
        } else if (side === 'top') {
            top = r.top - sideOffset;
            if (align === 'start') left = r.left + alignOffset;
            else if (align === 'end') left = r.right - alignOffset;
            else left = r.left + r.width / 2;
        } else if (side === 'right') {
            left = r.right + sideOffset;
            if (align === 'start') top = r.top + alignOffset;
            else if (align === 'end') top = r.bottom - alignOffset;
            else top = r.top + r.height / 2;
        } else if (side === 'left') {
            left = r.left - sideOffset;
            if (align === 'start') top = r.top + alignOffset;
            else if (align === 'end') top = r.bottom - alignOffset;
            else top = r.top + r.height / 2;
        }
        setCoords({ top, left });
    };

    useEffect(() => {
        if (realOpen) {
            setMounted(true);
            requestAnimationFrame(() => setVisible(true));
            compute();
        } else {
            setVisible(false);
            const t = setTimeout(() => setMounted(false), 150);
            return () => clearTimeout(t);
        }
    }, [realOpen]);

    useEffect(() => {
        if (!realOpen) return;
        const onKey = (e: KeyboardEvent) => {
            if (e.key === 'Escape') setOpen(false);
        };
        const onDoc = (e: MouseEvent) => {
            if (!closeOnOutsideClick) return;
            const target = e.target as Node | null;
            if (anchorRef.current?.contains(target as Node)) return;
            if (panelRef.current?.contains(target as Node)) return;
            setOpen(false);
        };
        const onScroll = () => compute();
        const onResize = () => compute();
        document.addEventListener('keydown', onKey);
        document.addEventListener('mousedown', onDoc);
        window.addEventListener('scroll', onScroll, true);
        window.addEventListener('resize', onResize);
        return () => {
            document.removeEventListener('keydown', onKey);
            document.removeEventListener('mousedown', onDoc);
            window.removeEventListener('scroll', onScroll, true);
            window.removeEventListener('resize', onResize);
        };
    }, [realOpen, side, align]);

    const transform = (() => {
        if (side === 'bottom')
            return align === 'start'
                ? 'translate(0, 0)'
                : align === 'end'
                  ? 'translate(-100%, 0)'
                  : 'translate(-50%, 0)';
        if (side === 'top')
            return align === 'start'
                ? 'translate(0, -100%)'
                : align === 'end'
                  ? 'translate(-100%, -100%)'
                  : 'translate(-50%, -100%)';
        if (side === 'right')
            return align === 'start'
                ? 'translate(0, 0)'
                : align === 'end'
                  ? 'translate(0, -100%)'
                  : 'translate(0, -50%)';
        return align === 'start'
            ? 'translate(-100%, 0)'
            : align === 'end'
              ? 'translate(-100%, -100%)'
              : 'translate(-100%, -50%)';
    })();

    return (
        <span
            ref={anchorRef}
            className="inline-block align-middle"
            onClick={(e) => {
                // Ignore clicks coming from the panel (portal) bubbling via React
                if (panelRef.current && panelRef.current.contains(e.target as Node)) return;
                if (!isControlled) toggle();
                else onOpenChange?.(!realOpen);
            }}
            {...rest}
        >
            {children}
            {mounted && coords ? (
                <Portal>
                    <div
                        ref={panelRef}
                        id={panelId}
                        role="dialog"
                        aria-modal={false}
                        className={cn(
                            'fixed z-[1002] min-w-40 rounded-md border border-border bg-surface p-3 shadow-lg outline-none',
                            'transition-all duration-150 ease-out',
                            visible ? 'opacity-100 scale-100' : 'opacity-0 scale-95',
                            panelClassName,
                        )}
                        style={{ top: coords.top, left: coords.left, transform }}
                        tabIndex={-1}
                        onMouseDownCapture={(e) => e.stopPropagation()}
                        onClickCapture={(e) => e.stopPropagation()}
                    >
                        {typeof panel === 'function' ? (panel as () => ReactNode)() : panel}
                    </div>
                </Portal>
            ) : null}
        </span>
    );
}

export default Popover;
