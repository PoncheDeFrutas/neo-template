import { memo } from 'react';
import type { HTMLAttributes, MouseEvent, ReactNode } from 'react';
import { cn } from '@/shared/lib/cn';

export type FooterLink = {
    label: ReactNode;
    href?: string;
    onClick?: (e: MouseEvent) => void;
    external?: boolean;
    disabled?: boolean;
};

export type FooterGroup = {
    title: ReactNode;
    links: FooterLink[];
};

export type FooterProps = Omit<HTMLAttributes<HTMLElement>, 'children'> & {
    brand?: ReactNode;
    description?: ReactNode;
    groups?: FooterGroup[];
    bottomLeft?: ReactNode;
    bottomRight?: ReactNode;
    containerClassName?: string;
};

function FooterRaw({
    brand,
    description,
    groups = [],
    bottomLeft,
    bottomRight,
    className,
    containerClassName,
    ...rest
}: FooterProps) {
    const containerCls = cn('mx-auto max-w-7xl px-4 sm:px-6 lg:px-8', containerClassName);
    return (
        <footer
            className={cn('w-full bg-surface border-t border-border mt-16', className)}
            {...rest}
        >
            <div className={cn('py-10', containerCls)}>
                <div className="grid grid-cols-1 gap-8 md:grid-cols-12">
                    {/* Left: brand + description */}
                    <div className="md:col-span-4">
                        {brand ? (
                            <div className="text-base font-semibold text-text">{brand}</div>
                        ) : null}
                        {description ? (
                            <p className="mt-2 text-sm text-muted-foreground max-w-sm">
                                {description}
                            </p>
                        ) : null}
                    </div>
                    {/* Right: groups */}
                    <div className="md:col-span-8 grid grid-cols-2 sm:grid-cols-3 gap-6">
                        {groups.map((g, idx) => (
                            <div key={idx}>
                                <div className="text-sm font-semibold text-text">{g.title}</div>
                                <ul className="mt-3 space-y-2">
                                    {g.links.map((l, i) => (
                                        <li key={i}>
                                            {l.href ? (
                                                <a
                                                    href={l.href}
                                                    target={l.external ? '_blank' : undefined}
                                                    rel={
                                                        l.external
                                                            ? 'noreferrer noopener'
                                                            : undefined
                                                    }
                                                    onClick={l.onClick}
                                                    className={cn(
                                                        'text-sm text-muted-foreground hover:text-text transition-colors',
                                                        l.disabled &&
                                                            'opacity-50 pointer-events-none',
                                                    )}
                                                >
                                                    {l.label}
                                                </a>
                                            ) : (
                                                <span
                                                    className={cn(
                                                        'text-sm text-muted-foreground',
                                                        l.disabled && 'opacity-50',
                                                    )}
                                                >
                                                    {l.label}
                                                </span>
                                            )}
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        ))}
                    </div>
                </div>

                <div className="my-8 h-px bg-border-subtle" />

                <div className="flex flex-col-reverse items-center justify-between gap-4 text-xs text-muted-foreground sm:flex-row">
                    <div>
                        {bottomLeft ??
                            `© ${new Date().getFullYear()} RapiEntrega. Todos los derechos reservados.`}
                    </div>
                    <div className="flex items-center gap-3">{bottomRight}</div>
                </div>
            </div>
        </footer>
    );
}

export const Footer = memo(FooterRaw);
export default Footer;
