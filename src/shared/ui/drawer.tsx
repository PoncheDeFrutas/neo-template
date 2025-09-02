import { type ReactNode } from 'react';

type Placement = 'left' | 'right' | 'top' | 'bottom';

interface DrawerProps {
    isOpen: boolean;
    onClose: () => void;
    placement?: Placement;
    children?: ReactNode;
    className?: string;
}

function cn(...classes: Array<string | false | null | undefined>) {
    return classes.filter(Boolean).join(' ');
}

const basePlacement: Record<Placement, string> = {
    left: 'left-0 top-0 h-full w-64',
    right: 'right-0 top-0 h-full w-64',
    top: 'top-0 left-0 w-full h-64',
    bottom: 'bottom-0 left-0 w-full h-64',
};

const closedTransform: Record<Placement, string> = {
    left: '-translate-x-full',
    right: 'translate-x-full',
    top: '-translate-y-full',
    bottom: 'translate-y-full',
};

const openTransform: Record<Placement, string> = {
    left: 'translate-x-0',
    right: 'translate-x-0',
    top: 'translate-y-0',
    bottom: 'translate-y-0',
};

export function Drawer({ isOpen, onClose, placement = 'left', children, className }: DrawerProps) {
    return (
        <>
            <div
                className={cn(
                    'fixed inset-0 z-40 bg-overlay transition-opacity',
                    isOpen ? 'opacity-100' : 'opacity-0 pointer-events-none',
                    className,
                )}
                onClick={onClose}
            />
            <aside
                className={cn(
                    'fixed z-50 bg-elevated text-text p-4 transition-transform transform-gpu will-change-transform',
                    basePlacement[placement],
                    isOpen ? openTransform[placement] : closedTransform[placement],
                    className,
                )}
            >
                {children}
            </aside>
        </>
    );
}

export interface NavItem {
    label: string;
    href: string;
    icon?: ReactNode;
}

interface NavigationDrawerProps extends Omit<DrawerProps, 'children'> {
    items: NavItem[];
    navClassName?: string;
}

export function NavigationDrawer({ items, navClassName, ...props }: NavigationDrawerProps) {
    return (
        <Drawer {...props}>
            <nav className={cn('space-y-2', navClassName)}>
                {items.map(({ label, href, icon }) => (
                    <a
                        key={label}
                        href={href}
                        className="flex items-center gap-2 rounded p-2 hover:bg-surface"
                    >
                        {icon}
                        <span>{label}</span>
                    </a>
                ))}
            </nav>
        </Drawer>
    );
}
