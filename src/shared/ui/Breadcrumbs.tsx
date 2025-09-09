import type { HTMLAttributes, ReactNode, MouseEventHandler } from 'react';
import { cn } from '@/shared/lib/cn';

export type BreadcrumbItem = {
    label: ReactNode;
    href?: string;
    onClick?: MouseEventHandler;
    current?: boolean;
};

export type BreadcrumbsProps = Omit<HTMLAttributes<HTMLElement>, 'children'> & {
    items: BreadcrumbItem[];
};

export function Breadcrumbs({ items, className, ...rest }: BreadcrumbsProps) {
    return (
        <nav aria-label="Breadcrumb" className={cn('w-full', className)} {...rest}>
            <ol className="flex items-center gap-2 text-sm" role="list">
                {items.map((item, idx) => {
                    const isLast = idx === items.length - 1;
                    const common = cn('inline-flex items-center gap-1');
                    const content = (
                        <span
                            className={cn(
                                'truncate',
                                isLast || item.current
                                    ? 'text-text font-medium'
                                    : 'text-muted-foreground hover:text-text',
                            )}
                            aria-current={isLast || item.current ? 'page' : undefined}
                        >
                            {item.label}
                        </span>
                    );

                    return (
                        <li key={idx} className="inline-flex items-center gap-2">
                            {item.href ? (
                                <a href={item.href} onClick={item.onClick} className={common}>
                                    {content}
                                </a>
                            ) : (
                                <div
                                    onClick={item.onClick as MouseEventHandler<HTMLDivElement>}
                                    className={common}
                                >
                                    {content}
                                </div>
                            )}
                            {!isLast && <span className="text-muted-foreground">/</span>}
                        </li>
                    );
                })}
            </ol>
        </nav>
    );
}

export default Breadcrumbs;
