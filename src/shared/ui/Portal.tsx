import type { ReactNode } from 'react';
import { createPortal } from 'react-dom';

export function Portal({ children }: { children: ReactNode }) {
    if (typeof document === 'undefined') return null;
    return createPortal(children, document.body);
}

export default Portal;
