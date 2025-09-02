import { type ReactNode } from 'react';

export type NavPosition = 'left' | 'center' | 'right';

export interface NavItem {
    id: string;
    position: NavPosition;
    component: ReactNode;
    roles?: string[];
}

export interface NavbarProps {
    items: NavItem[];
    className?: string;
}

function cn(...classes: Array<string | false | null | undefined>) {
    return classes.filter(Boolean).join(' ');
}

export function Navbar({ items, className }: NavbarProps) {
    const sections: Record<NavPosition, NavItem[]> = {
        left: [],
        center: [],
        right: [],
    };

    for (const item of items) {
        sections[item.position].push(item);
    }

    return (
        <nav className={cn('flex items-center justify-between', className)}>
            <div className="flex items-center gap-2">
                {sections.left.map((item) => (
                    <div key={item.id}>{item.component}</div>
                ))}
            </div>
            <div className="flex items-center gap-2">
                {sections.center.map((item) => (
                    <div key={item.id}>{item.component}</div>
                ))}
            </div>
            <div className="flex items-center gap-2">
                {sections.right.map((item) => (
                    <div key={item.id}>{item.component}</div>
                ))}
            </div>
        </nav>
    );
}
