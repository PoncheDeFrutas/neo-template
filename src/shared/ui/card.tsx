import { type ReactNode } from 'react';

export interface CardAction {
    label: ReactNode;
    href?: string;
    onClick?: () => void;
    icon?: ReactNode;
}

export interface CardProps {
    title?: ReactNode;
    children?: ReactNode;
    imgSrc?: string;
    imgAlt?: string;
    horizontal?: boolean;
    href?: string;
    actions?: CardAction[];
    className?: string;
}

function cn(...classes: Array<string | false | null | undefined>) {
    return classes.filter(Boolean).join(' ');
}

export function Card({
    title,
    children,
    imgSrc,
    imgAlt,
    horizontal = false,
    href,
    actions = [],
    className,
}: CardProps) {
    const wrapper = cn(
        // Use design tokens for theme-safe colors
        'bg-elevated border border-border rounded-lg shadow',
        horizontal && 'flex',
        className,
    );

    const image = imgSrc && (
        <img
            src={imgSrc}
            alt={imgAlt}
            className={cn(
                horizontal ? 'object-cover w-48 rounded-none rounded-s-lg' : 'rounded-t-lg',
            )}
        />
    );

    const content = (
        <div className="flex flex-col gap-4 p-5">
            {title && <h5 className="text-xl font-bold tracking-tight text-text">{title}</h5>}
            {children && <div className="font-normal text-muted-foreground">{children}</div>}
            {actions.length > 0 && (
                <div className="mt-auto flex gap-2">
                    {actions.map(({ label, href, onClick, icon }, i) =>
                        href ? (
                            <a
                                key={i}
                                href={href}
                                className="inline-flex items-center rounded-lg bg-primary px-3 py-2 text-sm font-medium text-primary-foreground hover:opacity-90"
                            >
                                {icon}
                                {label}
                            </a>
                        ) : (
                            <button
                                key={i}
                                type="button"
                                onClick={onClick}
                                className="inline-flex items-center rounded-lg bg-primary px-3 py-2 text-sm font-medium text-primary-foreground hover:opacity-90"
                            >
                                {icon}
                                {label}
                            </button>
                        ),
                    )}
                </div>
            )}
        </div>
    );

    const body = horizontal ? (
        <>
            {image}
            {content}
        </>
    ) : (
        <>
            {image}
            {content}
        </>
    );

    return href ? (
        <a href={href} className={wrapper}>
            {body}
        </a>
    ) : (
        <div className={wrapper}>{body}</div>
    );
}
