import type {
    AnchorHTMLAttributes,
    HTMLAttributes,
    ImgHTMLAttributes,
    ReactNode,
    Ref,
} from 'react';
import { forwardRef } from 'react';

import { cn } from '@/shared/lib/cn';

type Variant = 'surface' | 'elevated' | 'outline' | 'ghost';
type Padding = 'sm' | 'md' | 'lg' | 'none';
type MediaPosition = 'top' | 'left';

type CommonProps = {
    title?: ReactNode;
    subtitle?: ReactNode;
    description?: ReactNode;
    footer?: ReactNode;
    media?: ReactNode;
    imageSrc?: string;
    imageAlt?: string;
    imageProps?: Omit<ImgHTMLAttributes<HTMLImageElement>, 'src' | 'alt'>;
    mediaPosition?: MediaPosition;
    variant?: Variant;
    padding?: Padding;
    hoverable?: boolean;
    clickable?: boolean; // adds cursor + focus ring
    elevation?: 0 | 1 | 2 | 3; // extra shadows
    rounded?: 'md' | 'lg' | 'xl' | '2xl';
    className?: string;
    contentClassName?: string;
};

type CardAsDiv = { as?: 'div' } & HTMLAttributes<HTMLDivElement> & CommonProps;
type CardAsAnchor = { as: 'a' } & AnchorHTMLAttributes<HTMLAnchorElement> & CommonProps;

export type CardProps = CardAsDiv | CardAsAnchor;

const padClasses: Record<Padding, string> = {
    none: 'p-0',
    sm: 'p-3',
    md: 'p-4',
    lg: 'p-6',
};

const variantClasses: Record<Variant, string> = {
    surface: 'bg-surface border border-border',
    elevated: 'bg-elevated border border-border shadow-sm',
    outline: 'bg-bg border border-border',
    ghost: 'bg-transparent border border-transparent',
};

function CardContentWrap({
    children,
    padding,
    contentClassName,
}: {
    children: ReactNode;
    padding: Padding;
    contentClassName?: string;
}) {
    return (
        <div className={cn(padClasses[padding], 'flex flex-col gap-2', contentClassName)}>
            {children}
        </div>
    );
}

function Media({
    node,
    imageSrc,
    imageAlt,
    imageProps,
    rounded,
    position,
}: {
    node?: ReactNode;
    imageSrc?: string;
    imageAlt?: string;
    imageProps?: Omit<ImgHTMLAttributes<HTMLImageElement>, 'src' | 'alt'>;
    rounded: NonNullable<CommonProps['rounded']>;
    position: MediaPosition;
}) {
    const r = rounded ?? 'xl';
    const radiusTop =
        r === 'md'
            ? 'rounded-t-md'
            : r === 'lg'
              ? 'rounded-t-lg'
              : r === '2xl'
                ? 'rounded-t-2xl'
                : 'rounded-t-xl';
    const radiusLeft =
        r === 'md'
            ? 'rounded-l-md'
            : r === 'lg'
              ? 'rounded-l-lg'
              : r === '2xl'
                ? 'rounded-l-2xl'
                : 'rounded-l-xl';
    if (node) return <>{node}</>;
    if (!imageSrc) return null;
    return (
        <img
            src={imageSrc}
            alt={imageAlt || ''}
            className={cn(
                'object-cover',
                position === 'top' ? radiusTop : radiusLeft,
                position === 'top' ? 'w-full h-40' : 'h-full w-40 md:w-56',
            )}
            {...imageProps}
        />
    );
}

export const Card = forwardRef<HTMLDivElement | HTMLAnchorElement, CardProps>((props, ref) => {
    const {
        as = 'div',
        title,
        subtitle,
        description,
        footer,
        media,
        imageSrc,
        imageAlt,
        imageProps,
        mediaPosition = 'top',
        variant = 'surface',
        padding = 'md',
        hoverable = true,
        clickable,
        elevation = 0,
        rounded = 'xl',
        className,
        contentClassName,
        ...rest
    } = props as CardProps;

    const roundedClass =
        rounded === 'md'
            ? 'rounded-md'
            : rounded === 'lg'
              ? 'rounded-lg'
              : rounded === '2xl'
                ? 'rounded-2xl'
                : 'rounded-xl';
    const hoverClass = hoverable
        ? 'transition-all duration-200 ease-out hover:-translate-y-0.5 hover:shadow-md'
        : 'transition-colors';
    const clickableClass = clickable
        ? 'cursor-pointer focus-visible:outline-none focus-visible:ring-2 ring-ring'
        : '';
    const elevationClass =
        elevation >= 3
            ? 'shadow-lg'
            : elevation === 2
              ? 'shadow-md'
              : elevation === 1
                ? 'shadow-sm'
                : '';

    const base = cn(
        'group overflow-hidden',
        roundedClass,
        variantClasses[variant],
        hoverClass,
        clickableClass,
        elevationClass,
        className,
    );

    const headerBlock =
        title || subtitle || description ? (
            <div className="flex flex-col gap-1">
                {subtitle ? (
                    <div className="text-xs text-muted-foreground uppercase tracking-wide">
                        {subtitle}
                    </div>
                ) : null}
                {title ? <div className="text-base font-semibold text-text">{title}</div> : null}
                {description ? (
                    <div className="text-sm text-muted-foreground">{description}</div>
                ) : null}
            </div>
        ) : null;

    // Layout rendering
    if (media && mediaPosition === 'left') {
        // Horizontal layout on md+ with media at left
        const { children, ...restEl } = rest as HTMLAttributes<HTMLDivElement>;
        const mediaNode = (
            <div className="md:w-1/3 w-full md:h-full overflow-hidden">
                <Media
                    node={media}
                    imageSrc={imageSrc}
                    imageAlt={imageAlt}
                    imageProps={imageProps}
                    rounded={rounded}
                    position="left"
                />
            </div>
        );

        if (as === 'a') {
            const aProps = restEl as AnchorHTMLAttributes<HTMLAnchorElement>;
            return (
                <a
                    ref={ref as Ref<HTMLAnchorElement>}
                    className={cn(base, 'md:flex items-stretch')}
                    {...aProps}
                >
                    {mediaNode}
                    <div className="flex-1">
                        <CardContentWrap padding={padding} contentClassName={contentClassName}>
                            {headerBlock}
                            {children}
                            {footer ? <div className="pt-2">{footer}</div> : null}
                        </CardContentWrap>
                    </div>
                </a>
            );
        }
        return (
            <div
                ref={ref as Ref<HTMLDivElement>}
                className={cn(base, 'md:flex items-stretch')}
                {...restEl}
            >
                {mediaNode}
                <div className="flex-1">
                    <CardContentWrap padding={padding} contentClassName={contentClassName}>
                        {headerBlock}
                        {children}
                        {footer ? <div className="pt-2">{footer}</div> : null}
                    </CardContentWrap>
                </div>
            </div>
        );
    }

    // Default vertical layout with media at top
    if (as === 'a') {
        const { children, ...aProps } = rest as AnchorHTMLAttributes<HTMLAnchorElement>;
        return (
            <a ref={ref as Ref<HTMLAnchorElement>} className={base} {...aProps}>
                {(media || imageSrc) && (
                    <Media
                        node={media}
                        imageSrc={imageSrc}
                        imageAlt={imageAlt}
                        imageProps={imageProps}
                        rounded={rounded}
                        position="top"
                    />
                )}
                <CardContentWrap padding={padding} contentClassName={contentClassName}>
                    {headerBlock}
                    {children}
                    {footer ? <div className="pt-2">{footer}</div> : null}
                </CardContentWrap>
            </a>
        );
    }
    const { children, ...divProps } = rest as HTMLAttributes<HTMLDivElement>;
    return (
        <div ref={ref as Ref<HTMLDivElement>} className={base} {...divProps}>
            {(media || imageSrc) && (
                <Media
                    node={media}
                    imageSrc={imageSrc}
                    imageAlt={imageAlt}
                    imageProps={imageProps}
                    rounded={rounded}
                    position="top"
                />
            )}
            <CardContentWrap padding={padding} contentClassName={contentClassName}>
                {headerBlock}
                {children}
                {footer ? <div className="pt-2">{footer}</div> : null}
            </CardContentWrap>
        </div>
    );
});

Card.displayName = 'Card';

export default Card;
