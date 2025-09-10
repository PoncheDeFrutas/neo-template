import type { HTMLAttributes, ImgHTMLAttributes } from 'react';
import { forwardRef, useMemo, useState } from 'react';

import { cn } from '@/shared/lib/cn';

type Size = 'xs' | 'sm' | 'md' | 'lg' | 'xl';
type Rounded = 'sm' | 'md' | 'lg' | 'xl' | 'full';

export type AvatarProps = Omit<HTMLAttributes<HTMLDivElement>, 'children'> & {
    src?: string;
    alt?: string;
    name?: string; // para fallback de iniciales
    size?: Size;
    rounded?: Rounded;
    imgProps?: Omit<ImgHTMLAttributes<HTMLImageElement>, 'src' | 'alt'>;
};

const sizeClasses: Record<Size, string> = {
    xs: 'h-6 w-6 text-[10px]',
    sm: 'h-8 w-8 text-[11px]',
    md: 'h-10 w-10 text-xs',
    lg: 'h-12 w-12 text-sm',
    xl: 'h-16 w-16 text-base',
};

const roundedClasses: Record<Rounded, string> = {
    sm: 'rounded',
    md: 'rounded-md',
    lg: 'rounded-lg',
    xl: 'rounded-xl',
    full: 'rounded-full',
};

function getInitials(input?: string): string {
    if (!input) return '?';
    const parts = input.trim().split(/\s+/).filter(Boolean);
    if (parts.length === 1) {
        return parts[0].slice(0, 2).toUpperCase();
    }
    return (parts[0][0] + parts[parts.length - 1][0]).toUpperCase();
}

export const Avatar = forwardRef<HTMLDivElement, AvatarProps>((props, ref) => {
    const { src, alt, name, size = 'md', rounded = 'full', imgProps, className, ...rest } = props;
    const [imgError, setImgError] = useState(false);
    const showImg = Boolean(src) && !imgError;
    const initials = useMemo(() => getInitials(name || alt), [name, alt]);

    const base = cn(
        'relative inline-flex items-center justify-center overflow-hidden select-none',
        'bg-bg-subtle text-muted-foreground border border-border-subtle',
        sizeClasses[size],
        roundedClasses[rounded],
        className,
    );

    return (
        <div ref={ref} className={base} aria-label={alt || name} {...rest}>
            {showImg ? (
                <img
                    src={src}
                    alt={alt || name || ''}
                    onError={() => setImgError(true)}
                    className="h-full w-full object-cover"
                    {...imgProps}
                />
            ) : (
                <span className="uppercase tracking-wide">{initials}</span>
            )}
        </div>
    );
});

Avatar.displayName = 'Avatar';

export default Avatar;
