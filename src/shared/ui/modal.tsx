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

/**
 * Props interface for the Modal component.
 * 
 * @interface ModalProps
 * @property {boolean} isOpen - Controls whether the modal is visible or hidden
 * @property {() => void} onClose - Callback function triggered when the modal should be closed
 * @property {ReactNode} children - The content to be displayed inside the modal body
 * @property {ModalType} [type] - Optional modal type that affects styling and behavior
 * @property {ModalSize} [size] - Optional size configuration for the modal dimensions
 * @property {ModalPlacement} [placement] - Optional placement/position of the modal on screen
 * @property {ReactNode} [header] - Optional header content displayed at the top of the modal
 * @property {ReactNode} [footer] - Optional footer content displayed at the bottom of the modal
 * @property {() => void} [onSave] - Optional callback function triggered when save action is performed
 */
export interface ModalProps {
    isOpen: boolean;
    onClose: () => void;
    children: ReactNode;
    type?: ModalType;
    size?: ModalSize;
    placement?: ModalPlacement;
    header?: ReactNode;
    footer?: ReactNode;
    onSave?: () => void;
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

/**
 * A versatile modal component that supports different types, sizes, and placements.
 * 
 * @param props - The modal properties
 * @param props.isOpen - Whether the modal is currently open
 * @param props.onClose - Callback function to close the modal
 * @param props.children - The content to be rendered inside the modal
 * @param props.type - The type of modal ('default', 'static', 'popup', or 'crud')
 * @param props.size - The size of the modal ('md' by default)
 * @param props.placement - The placement of the modal ('center' by default)
 * @param props.header - Custom header content (used with 'crud' type)
 * @param props.footer - Custom footer content (used with 'crud' type)
 * @param props.onSave - Callback function for save action (used with 'crud' type)
 * 
 * @remarks
 * - Supports keyboard navigation (ESC key to close, except for 'static' type)
 * - Uses React Portal to render outside the component tree
 * - 'crud' type automatically includes header, body, and footer sections
 * - 'popup' type renders without overlay
 * - 'static' type prevents closing by clicking overlay or ESC key
 * 
 * @example
 * ```tsx
 * <Modal isOpen={isOpen} onClose={handleClose} type="crud" size="lg">
 *   <p>Modal content here</p>
 * </Modal>
 * ```
 */
export function Modal({
    isOpen,
    onClose,
    children,
    type = 'default',
    size = 'md',
    placement = 'center',
    header,
    footer,
    onSave,
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
    const modalClasses = `relative z-10 w-full ${sizeClasses[size]} rounded-md bg-elevated text-text pointer-events-auto ${
        type === 'crud' ? '' : 'p-4'
    }`;

    let content = <div className={modalClasses}>{children}</div>;

    if (type === 'crud') {
        const defaultHeader = <h3 className="text-lg font-semibold">CRUD Modal</h3>;
        const defaultFooter = (
            <>
                <Button variant="outline" onClick={onClose}>
                    Cancel
                </Button>
                <Button onClick={onSave ?? onClose}>Save</Button>
            </>
        );
        content = (
            <div className={modalClasses}>
                <ModalHeader>{header ?? defaultHeader}</ModalHeader>
                <ModalBody>{children}</ModalBody>
                <ModalFooter>{footer ?? defaultFooter}</ModalFooter>
            </div>
        );
    }

    const overlay =
        type === 'popup' ? null : (
            <div
                className="absolute inset-0 bg-overlay"
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

/**
 * A header component for modals that provides consistent styling and layout.
 * 
 * Renders a flex container with items centered and justified between, featuring
 * a bottom border and padding. Typically used at the top of modal dialogs to
 * contain titles, close buttons, or other header content.
 * 
 * @param children - The content to be rendered inside the modal header
 * @returns A styled div element containing the header content
 */
export function ModalHeader({ children }: { children: ReactNode }) {
    return <div className="flex items-center justify-between border-b border-border p-4">{children}</div>;
}

export function ModalBody({ children }: { children: ReactNode }) {
    return <div className="p-4">{children}</div>;
}

export function ModalFooter({ children }: { children: ReactNode }) {
    return <div className="flex justify-end gap-2 border-t border-border p-4">{children}</div>;
}
export default Modal;
