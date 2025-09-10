import { Menu } from 'lucide-react';
import type { HTMLAttributes, MouseEvent, ReactNode } from 'react';
import { memo, useState } from 'react';

import { cn } from '@/shared/lib/cn';

import { Button } from './Button';
import { Drawer } from './Drawer';

export type NavItem = {
    label: ReactNode;
    href?: string;
    onClick?: (e: MouseEvent) => void;
    active?: boolean;
    icon?: ReactNode;
    disabled?: boolean;
    external?: boolean;
    badge?: ReactNode;
};

export type NavbarProps = Omit<HTMLAttributes<HTMLElement>, 'children'> & {
    brand?: ReactNode;
    brandHref?: string;
    items?: NavItem[];
    rightSlot?: ReactNode;
    align?: 'left' | 'center' | 'between';
    sticky?: boolean;
    elevated?: boolean;
    border?: boolean;
    size?: 'sm' | 'md' | 'lg';
    /** breakpoint en el que el menú colapsa a móvil */
    collapseAt?: 'sm' | 'md' | 'lg';
    /** deshabilita por completo el drawer/toggle móvil y muestra el menú siempre */
    enableDrawer?: boolean;
    containerClassName?: string;
    itemsClassName?: string;
    itemClassName?: string;
};

const sizeHeights: Record<NonNullable<NavbarProps['size']>, string> = {
    sm: 'h-12',
    md: 'h-14',
    lg: 'h-16',
};

function NavbarRaw({
    brand,
    brandHref,
    items = [],
    rightSlot,
    align = 'between',
    sticky = true,
    elevated = false,
    border = true,
    size = 'md',
    collapseAt = 'md',
    enableDrawer = true,
    className,
    containerClassName,
    itemsClassName,
    itemClassName,
    ...rest
}: NavbarProps) {
    const [open, setOpen] = useState(false);

    const heightCls = sizeHeights[size];
    const positionCls = sticky ? 'sticky top-0 z-50' : '';
    const surfaceCls = cn(
        'bg-surface',
        elevated && 'shadow-sm',
        border && 'border-b border-border',
    );

    // Si el drawer está deshabilitado, no colapsa a menú móvil
    const collapseEnabled = enableDrawer && Boolean(collapseAt);
    const desktopMenuCls = cn(
        'items-center gap-1',
        collapseEnabled ? `hidden ${collapseAt}:flex` : 'flex',
    );
    const mobileToggleCls = collapseEnabled ? `${collapseAt}:hidden` : 'hidden';

    const containerCls = cn('mx-auto max-w-7xl', containerClassName);
    const contentAlignCls =
        align === 'center'
            ? 'justify-center'
            : align === 'left'
              ? 'justify-start'
              : 'justify-between';

    const renderItem = (item: NavItem, key?: number) => {
        const base = cn(
            'inline-flex items-center gap-2 rounded-md px-3 py-2 text-sm transition-colors duration-150',
            item.active
                ? 'text-text bg-elevated'
                : 'text-muted-foreground hover:text-text hover:bg-elevated',
            item.disabled && 'opacity-50 pointer-events-none',
            'focus-visible:outline-none focus-visible:ring-2 ring-ring',
            itemClassName,
        );
        const content = (
            <span className="inline-flex items-center gap-2">
                {item.icon}
                <span className="truncate">{item.label}</span>
                {item.badge}
            </span>
        );
        if (item.href) {
            return (
                <a
                    key={key}
                    href={item.href}
                    onClick={item.onClick}
                    target={item.external ? '_blank' : undefined}
                    rel={item.external ? 'noreferrer noopener' : undefined}
                    className={base}
                >
                    {content}
                </a>
            );
        }
        return (
            <button key={key} type="button" onClick={item.onClick} className={base}>
                {content}
            </button>
        );
    };

    return (
        <nav
            className={cn('w-full', positionCls, surfaceCls, className)}
            aria-label="Primary"
            {...rest}
        >
            <div className={cn('flex w-full items-center', heightCls)}>
                <div className={cn('flex w-full items-center', containerCls, contentAlignCls)}>
                    {/* Brand + Mobile toggle */}
                    <div
                        className={cn(
                            'flex min-w-0 items-center gap-3',
                            contentAlignCls === 'justify-center' && 'absolute left-4',
                        )}
                    >
                        {brand ? (
                            brandHref ? (
                                <a
                                    href={brandHref}
                                    className="inline-flex items-center gap-2 text-base font-semibold"
                                >
                                    {brand}
                                </a>
                            ) : (
                                <div className="inline-flex items-center gap-2 text-base font-semibold">
                                    {brand}
                                </div>
                            )
                        ) : null}
                        {/* Mobile toggle */}
                        {collapseEnabled ? (
                            <div className={cn(mobileToggleCls)}>
                                <Button
                                    variant="ghost"
                                    size="icon"
                                    aria-label={open ? 'Cerrar menú' : 'Abrir menú'}
                                    onClick={() => setOpen((v) => !v)}
                                >
                                    <Menu size={18} />
                                </Button>
                            </div>
                        ) : null}
                    </div>

                    {/* Desktop navigation */}
                    <div className={cn('flex-1', contentAlignCls === 'justify-between' && 'px-4')}>
                        <div className={cn('justify-center', desktopMenuCls, itemsClassName)}>
                            {items.map((it, idx) => renderItem(it, idx))}
                        </div>
                    </div>

                    {/* Right actions */}
                    <div
                        className={cn(
                            'flex min-w-0 items-center gap-2',
                            contentAlignCls === 'justify-center' && 'absolute right-4',
                        )}
                    >
                        {rightSlot}
                    </div>
                </div>
            </div>

            {/* Mobile drawer */}
            {collapseEnabled ? (
                <Drawer
                    open={open}
                    onOpenChange={setOpen}
                    side="left"
                    title={typeof brand === 'string' ? brand : undefined}
                    className="p-0"
                    description={null}
                    blurOverlay
                    size="sm"
                >
                    <div className="flex flex-col gap-1">
                        {items.map((it, idx) => (
                            <div key={idx} onClick={() => setOpen(false)}>
                                {renderItem(it)}
                            </div>
                        ))}
                        {rightSlot ? (
                            <div className="mt-2 border-t border-border pt-2">{rightSlot}</div>
                        ) : null}
                    </div>
                </Drawer>
            ) : null}
        </nav>
    );
}

export const Navbar = memo(NavbarRaw);
export default Navbar;
