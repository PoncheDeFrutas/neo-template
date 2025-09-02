import { type ReactNode } from 'react';

export type NavPosition = 'left' | 'center' | 'right';

export interface NavItem {
    id: string;
    position: NavPosition;
    component: ReactNode;
    roles?: string[];
}