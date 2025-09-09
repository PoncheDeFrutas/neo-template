import { useEffect, useId, useRef, useState } from 'react';
import type { HTMLAttributes, ReactNode } from 'react';
import { cn } from '@/shared/lib/cn';
import { Overlay } from './Overlay';
import { Portal } from './Portal';
import { X } from 'lucide-react';

type Size = 'sm' | 'md' | 'lg';
type Side = 'right' | 'left' | 'top' | 'bottom';

export type DrawerProps = {
    open: boolean;
    onOpenChange: (open: boolean) => void;
    side?: Side;
    title?: ReactNode;
    description?: ReactNode;
    footer?: ReactNode;
    size?: Size;
    closeOnOverlay?: boolean;
    blurOverlay?: boolean;
} & HTMLAttributes<HTMLDivElement>;

const sizeClassSide = (side: Side, size: Size) => {
    if (side === 'left' || side === 'right') {
        // width for vertical drawers
        return size === 'sm'
            ? 'w-72 max-w-[90vw]'
            : size === 'lg'
              ? 'w-[28rem] max-w-[95vw]'
              : 'w-96 max-w-[95vw]';
    }
    // height for horizontal drawers
    return size === 'sm'
        ? 'h-1/3 max-h-[90vh]'
        : size === 'lg'
          ? 'h-[80vh] max-h-[95vh]'
          : 'h-1/2 max-h-[95vh]';
};

function useLockBodyScroll(locked: boolean) {
    useEffect(() => {
        if (!locked) return;
        const prev = document.body.style.overflow;
        document.body.style.overflow = 'hidden';
        return () => {
            document.body.style.overflow = prev;
        };
    }, [locked]);
}

export function Drawer(props: DrawerProps) {
    const {
        open,
        onOpenChange,
        side = 'right',
        title,
        description,
        footer,
        size = 'md',
        closeOnOverlay = true,
        blurOverlay = true,
        className,
        children,
        ...rest
    } = props;

    const panelRef = useRef<HTMLDivElement | null>(null);
    const titleId = useId();
    const descId = useId();

    useLockBodyScroll(open);

    // Presence + animation control for smooth enter/exit
    const [mounted, setMounted] = useState(open);
    const [visible, setVisible] = useState(open);

    useEffect(() => {
        if (open) {
            setMounted(true);
            // next frame to allow transition
            requestAnimationFrame(() => setVisible(true));
        } else {
            setVisible(false);
            const t = setTimeout(() => setMounted(false), 200); // close duration
            return () => clearTimeout(t);
        }
    }, [open]);

    useEffect(() => {
        if (!open) return;
        const node = panelRef.current;
        node?.focus();
        const onKey = (e: KeyboardEvent) => {
            if (e.key === 'Escape') onOpenChange(false);
            if (e.key === 'Tab') {
                // Simple focus trap
                const root = node;
                if (!root) return;
                const focusable = root.querySelectorAll<HTMLElement>(
                    'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])',
                );
                if (focusable.length === 0) return;
                const first = focusable[0];
                const last = focusable[focusable.length - 1];
                if (e.shiftKey) {
                    if (document.activeElement === first) {
                        last.focus();
                        e.preventDefault();
                    }
                } else {
                    if (document.activeElement === last) {
                        first.focus();
                        e.preventDefault();
                    }
                }
            }
        };
        document.addEventListener('keydown', onKey);
        return () => document.removeEventListener('keydown', onKey);
    }, [open, onOpenChange]);

    if (!mounted) return null;

    const positionClass =
        side === 'right'
            ? 'right-0 top-0 h-full'
            : side === 'left'
              ? 'left-0 top-0 h-full'
              : side === 'top'
                ? 'top-0 left-0 w-full'
                : 'bottom-0 left-0 w-full';

    const offscreen =
        side === 'right'
            ? 'translate-x-full'
            : side === 'left'
              ? '-translate-x-full'
              : side === 'top'
                ? '-translate-y-full'
                : 'translate-y-full';
    const onscreen = side === 'top' || side === 'bottom' ? 'translate-y-0' : 'translate-x-0';
    const transformClass = visible ? onscreen : offscreen;

    return (
        <Portal>
            <Overlay
                open={mounted}
                visible={visible}
                blur={blurOverlay}
                onClick={closeOnOverlay ? () => onOpenChange(false) : undefined}
            />
            <div className="fixed inset-0 z-[1001]">
                <div
                    ref={panelRef}
                    role="dialog"
                    aria-modal="true"
                    aria-labelledby={title ? titleId : undefined}
                    aria-describedby={description ? descId : undefined}
                    tabIndex={-1}
                    className={cn(
                        'fixed bg-surface border border-border shadow-lg outline-none',
                        'transition-transform will-change-transform',
                        visible ? 'duration-500 ease-out' : 'duration-200 ease-in',
                        positionClass,
                        sizeClassSide(side, size),
                        transformClass,
                        'flex flex-col',
                        className,
                    )}
                    {...rest}
                >
                    <div className="flex items-start justify-between gap-3 border-b border-border p-4">
                        <div className="min-w-0">
                            {title ? (
                                <h2 id={titleId} className="text-base font-semibold text-text">
                                    {title}
                                </h2>
                            ) : null}
                            {description ? (
                                <p id={descId} className="mt-0.5 text-sm text-muted-foreground">
                                    {description}
                                </p>
                            ) : null}
                        </div>
                        <button
                            type="button"
                            className="rounded-md p-1 text-muted-foreground hover:text-text focus-visible:outline-none focus-visible:ring-2 ring-ring"
                            aria-label="Cerrar"
                            onClick={() => onOpenChange(false)}
                        >
                            <X size={18} />
                        </button>
                    </div>
                    <div className="flex-1 overflow-auto p-4">{children}</div>
                    {footer ? <div className="border-t border-border p-4">{footer}</div> : null}
                </div>
            </div>
        </Portal>
    );
}

export default Drawer;
