import { useEffect, useId, useRef } from 'react';
import type { ReactNode, HTMLAttributes } from 'react';
import { cn } from '@/shared/lib/cn';
import { Overlay } from './Overlay';
import { Portal } from './Portal';
import { X } from 'lucide-react';

type Size = 'sm' | 'md' | 'lg';

export type ModalProps = {
    open: boolean;
    onOpenChange: (open: boolean) => void;
    title?: ReactNode;
    description?: ReactNode;
    footer?: ReactNode;
    size?: Size;
    closeOnOverlay?: boolean;
    blurOverlay?: boolean;
} & HTMLAttributes<HTMLDivElement>;

const sizeClass: Record<Size, string> = {
    sm: 'max-w-sm',
    md: 'max-w-lg',
    lg: 'max-w-2xl',
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

export function Modal(props: ModalProps) {
    const {
        open,
        onOpenChange,
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

    const dialogRef = useRef<HTMLDivElement | null>(null);
    const titleId = useId();
    const descId = useId();

    useLockBodyScroll(open);

    useEffect(() => {
        if (!open) return;
        const node = dialogRef.current;
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

    if (!open) return null;

    return (
        <Portal>
            <Overlay
                open={open}
                blur={blurOverlay}
                onClick={closeOnOverlay ? () => onOpenChange(false) : undefined}
            />
            <div className="fixed inset-0 z-[1001] flex items-center justify-center p-4">
                <div
                    ref={dialogRef}
                    role="dialog"
                    aria-modal="true"
                    aria-labelledby={title ? titleId : undefined}
                    aria-describedby={description ? descId : undefined}
                    tabIndex={-1}
                    className={cn(
                        'w-full rounded-xl border border-border bg-surface shadow-lg outline-none',
                        'transition-all duration-200 ease-out',
                        'max-h-[85vh] flex flex-col',
                        sizeClass[size],
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

export default Modal;
