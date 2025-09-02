import { type CSSProperties, type ReactNode } from 'react';

export interface BreadcrumbItemData {
    label: ReactNode;
    href?: string;
    icon?: ReactNode;
}

export interface BreadcrumbProps {
    items: BreadcrumbItemData[];
    variant?: 'default' | 'solid' | 'header';
    size?: 'sm' | 'md' | 'lg';
    separatorIcon?: ReactNode;
    color?: string;
    textColor?: string;
    className?: string;
}

export interface BreadcrumbItemProps {
    item: BreadcrumbItemData;
    isLast: boolean;
    separator: ReactNode;
}

function cn(...classes: Array<string | false | null | undefined>) {
    return classes.filter(Boolean).join(' ');
}

const defaultSeparator = (
    <svg
        className="w-4 h-4"
        viewBox="0 0 20 20"
        fill="currentColor"
        aria-hidden="true"
    >
        <path
            fillRule="evenodd"
            d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
            clipRule="evenodd"
        />
    </svg>
);

export function Breadcrumb({
    items,
    variant = 'default',
    size = 'md',
    separatorIcon,
    color,
    textColor,
    className,
}: BreadcrumbProps) {
    const variantStyles: Record<NonNullable<BreadcrumbProps['variant']>, string> = {
        default: '',
        solid: 'p-3 bg-gray-50 rounded-md',
        header: 'bg-gray-50 border p-3',
    };

    const sizeStyles: Record<NonNullable<BreadcrumbProps['size']>, string> = {
        sm: 'text-sm',
        md: 'text-base',
        lg: 'text-lg',
    };

    const style: CSSProperties = {};
    let navClass = cn(variantStyles[variant], sizeStyles[size], className);
    if (color) {
        if (color.startsWith('bg-')) {
            navClass = cn(navClass, color);
        } else {
            style.backgroundColor = color;
        }
    }
    if (textColor) {
        if (textColor.startsWith('text-')) {
            navClass = cn(navClass, textColor);
        } else {
            style.color = textColor;
        }
    }

    const separator = separatorIcon ?? defaultSeparator;

    return (
        <nav
            className={navClass}
            style={Object.keys(style).length ? style : undefined}
            aria-label="Breadcrumb"
        >
            <ol className="inline-flex items-center">
                {items.map((item, index) => (
                    <BreadcrumbItem
                        key={index}
                        item={item}
                        isLast={index === items.length - 1}
                        separator={separator}
                    />
                ))}
            </ol>
        </nav>
    );
}

export function BreadcrumbItem({ item, isLast, separator }: BreadcrumbItemProps) {
    const content = item.href && !isLast ? (
        <a
            href={item.href}
            className="inline-flex items-center gap-1 hover:underline"
        >
            {item.icon && <span className="me-1">{item.icon}</span>}
            {item.label}
        </a>
    ) : (
        <span
            className="inline-flex items-center gap-1"
            aria-current={isLast ? 'page' : undefined}
        >
            {item.icon && <span className="me-1">{item.icon}</span>}
            {item.label}
        </span>
    );

    return (
        <li className="inline-flex items-center">
            {content}
            {!isLast && <span className="mx-2">{separator}</span>}
        </li>
    );
}
