import { type ReactNode } from 'react';

type Placement = 'left' | 'right' | 'top' | 'bottom';

interface DrawerProps {
  isOpen: boolean;
  onClose: () => void;
  placement?: Placement;
  children?: ReactNode;
}

function cn(...classes: Array<string | false | null | undefined>) {
  return classes.filter(Boolean).join(' ');
}

const placementStyles: Record<Placement, string> = {
  left: '-translate-x-full left-0 top-0 h-full w-64',
  right: 'translate-x-full right-0 top-0 h-full w-64',
  top: '-translate-y-full top-0 left-0 w-full h-64',
  bottom: 'translate-y-full bottom-0 left-0 w-full h-64',
};

export function Drawer({
  isOpen,
  onClose,
  placement = 'left',
  children,
}: DrawerProps) {
  return (
    <>
      {/* Backdrop */}
      <div
        className={cn(
          'fixed inset-0 z-40 bg-black/50 transition-opacity',
          isOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'
        )}
        onClick={onClose}
      />
      {/* Panel */}
      <aside
        className={cn(
          'fixed z-50 bg-white dark:bg-gray-800 p-4 transition-transform',
          placementStyles[placement],
          isOpen && 'translate-x-0 translate-y-0'
        )}
      >
        {children}
      </aside>
    </>
  );
}

/* Variante para navegación */
export interface NavItem {
  label: string;
  href: string;
  icon?: ReactNode;
}

interface NavigationDrawerProps extends Omit<DrawerProps, 'children'> {
  items: NavItem[];
}

export function NavigationDrawer({
  items,
  ...props
}: NavigationDrawerProps) {
  return (
    <Drawer {...props}>
      <nav className="space-y-2">
        {items.map(({ label, href, icon }) => (
          <a
            key={label}
            href={href}
            className="flex items-center gap-2 rounded p-2 hover:bg-gray-100 dark:hover:bg-gray-700"
          >
            {icon}
            <span>{label}</span>
          </a>
        ))}
      </nav>
    </Drawer>
  );
}
