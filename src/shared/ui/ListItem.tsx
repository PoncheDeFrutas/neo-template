import type { AnchorHTMLAttributes, ButtonHTMLAttributes, HTMLAttributes, ReactNode } from 'react';

import { cn } from '@/shared/lib/cn';

type BaseDivAttrs = Omit<HTMLAttributes<HTMLDivElement>, 'children' | 'media'>;
type AnchorPick = Pick<AnchorHTMLAttributes<HTMLAnchorElement>, 'href' | 'target' | 'rel'>;
type ButtonPick = Pick<ButtonHTMLAttributes<HTMLButtonElement>, 'onClick' | 'disabled' | 'type'>;

export type ListItemProps = BaseDivAttrs &
    AnchorPick &
    ButtonPick & {
        media?: ReactNode; // avatar/imagen
        title: ReactNode;
        subtitle?: ReactNode;
        meta?: ReactNode; // texto a la derecha
        actions?: ReactNode; // botones a la derecha
        href?: string; // si se pasa, renderiza <a>
        target?: AnchorHTMLAttributes<HTMLAnchorElement>['target'];
        rel?: AnchorHTMLAttributes<HTMLAnchorElement>['rel'];
        disabled?: boolean; // para cuando sea clickable como botón
        size?: 'sm' | 'md' | 'lg';
        align?: 'center' | 'start';
        rounded?: 'none' | 'md' | 'lg' | 'full';
        hoverable?: boolean; // fondo al pasar el mouse
        titleClassName?: string;
        subtitleClassName?: string;
        mediaClassName?: string;
        actionsClassName?: string;
        metaClassName?: string;
    };

export function ListItem({
    media,
    title,
    subtitle,
    meta,
    actions,
    href,
    target,
    rel,
    onClick,
    type: btnType,
    disabled,
    size = 'md',
    align = 'center',
    rounded = 'md',
    hoverable = true,
    className,
    titleClassName,
    subtitleClassName,
    mediaClassName,
    actionsClassName,
    metaClassName,
    ...rest
}: ListItemProps) {
    const clickable = Boolean(href || onClick);
    const sizeCls = size === 'sm' ? 'p-2 gap-3' : size === 'lg' ? 'p-4 gap-4' : 'p-3 gap-3';
    const roundedCls =
        rounded === 'full'
            ? 'rounded-full'
            : rounded === 'lg'
              ? 'rounded-lg'
              : rounded === 'none'
                ? ''
                : 'rounded-md';
    const alignCls = align === 'start' ? 'items-start' : 'items-center';
    const base = cn(
        'w-full flex',
        alignCls,
        sizeCls,
        roundedCls,
        'border border-border-subtle bg-surface',
        hoverable && clickable && 'hover:bg-elevated',
        clickable && 'cursor-pointer',
        'transition-colors',
        className,
    );

    const content = (
        <>
            {media && <div className={cn('flex-shrink-0', mediaClassName)}>{media}</div>}
            <div className="min-w-0 flex-1">
                <div className={cn('truncate text-sm font-medium text-text', titleClassName)}>
                    {title}
                </div>
                {subtitle && (
                    <div
                        className={cn(
                            'truncate text-xs text-muted-foreground mt-0.5',
                            subtitleClassName,
                        )}
                    >
                        {subtitle}
                    </div>
                )}
            </div>
            {(meta || actions) && (
                <div className="ml-3 flex items-center gap-2">
                    {meta && (
                        <div className={cn('text-xs text-muted-foreground', metaClassName)}>
                            {meta}
                        </div>
                    )}
                    {actions && (
                        <div className={cn('flex items-center gap-1', actionsClassName)}>
                            {actions}
                        </div>
                    )}
                </div>
            )}
        </>
    );

    if (href) {
        return (
            <a href={href} target={target} rel={rel} className={base}>
                {content}
            </a>
        );
    }
    if (onClick) {
        return (
            <button
                type={btnType ?? 'button'}
                onClick={onClick}
                disabled={disabled}
                className={base}
            >
                {content}
            </button>
        );
    }
    return (
        <div role="listitem" className={base} {...rest}>
            {content}
        </div>
    );
}

export default ListItem;
