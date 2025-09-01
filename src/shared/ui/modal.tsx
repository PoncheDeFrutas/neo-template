import { type ReactNode, useEffect } from 'react';
import { createPortal } from 'react-dom';

import { Button } from './button';

export type ModalType = 'default' | 'static' | 'popup' | 'crud';
export type ModalSize = 'sm' | 'md' | 'lg' | 'xl' | '2xl';
export type ModalPlacement =
    | 'center'
    | 'top-left'
    | 'top-center'
    | 'top-right'
    | 'center-left'
    | 'center-right'
    | 'bottom-left'
    | 'bottom-center'
    | 'bottom-right';

export interface ModalProps {
    isOpen: boolean;
    onClose: () => void;
    children: ReactNode;
    type?: ModalType;
    size?: ModalSize;
    placement?: ModalPlacement;
}

const sizeClasses: Record<ModalSize, string> = {
    sm: 'max-w-sm',
    md: 'max-w-md',
    lg: 'max-w-lg',
    xl: 'max-w-xl',
    '2xl': 'max-w-2xl',
};

const placementClasses: Record<ModalPlacement, string> = {
    center: 'items-center justify-center',
    'top-left': 'items-start justify-start',
    'top-center': 'items-start justify-center',
    'top-right': 'items-start justify-end',
    'center-left': 'items-center justify-start',
    'center-right': 'items-center justify-end',
    'bottom-left': 'items-end justify-start',
    'bottom-center': 'items-end justify-center',
    'bottom-right': 'items-end justify-end',
};

export function Modal({
    isOpen,
    onClose,
    children,
    type = 'default',
    size = 'md',
    placement = 'center',
}: ModalProps) {
    useEffect(() => {
        if (!isOpen || type === 'static') return;
        const handleKey = (e: KeyboardEvent) => {
            if (e.key === 'Escape') onClose();
        };
        document.addEventListener('keydown', handleKey);
        return () => document.removeEventListener('keydown', handleKey);
    }, [isOpen, onClose, type]);

    if (!isOpen) return null;

    const containerClasses = `fixed inset-0 z-50 flex ${placementClasses[placement]} ${
        type === 'popup' ? 'pointer-events-none' : ''
    }`;
    const modalClasses = `relative z-10 w-full ${sizeClasses[size]} rounded-md bg-white pointer-events-auto ${
        type === 'crud' ? '' : 'p-4'
    }`;

    let content = <div className={modalClasses}>{children}</div>;

    if (type === 'crud') {
        content = (
            <div className={modalClasses}>
                <ModalHeader>
                    <h3 className="text-lg font-semibold">CRUD Modal</h3>
                </ModalHeader>
                <ModalBody>{children}</ModalBody>
                <ModalFooter>
                    <Button variant="outline" onClick={onClose}>
                        Cancel
                    </Button>
                    <Button onClick={onClose}>Save</Button>
                </ModalFooter>
            </div>
        );
    }

    const overlay =
        type === 'popup' ? null : (
            <div
                className="absolute inset-0 bg-black/50"
                onClick={type === 'static' ? undefined : onClose}
            />
        );

    return createPortal(
        <div className={containerClasses}>
            {overlay}
            {content}
        </div>,
        document.body,
    );
}

export function ModalHeader({ children }: { children: ReactNode }) {
    return <div className="flex items-center justify-between border-b p-4">{children}</div>;
}

export function ModalBody({ children }: { children: ReactNode }) {
    return <div className="p-4">{children}</div>;
}

export function ModalFooter({ children }: { children: ReactNode }) {
    return <div className="flex justify-end gap-2 border-t p-4">{children}</div>;
}
export default Modal;