import type { HTMLAttributes, ReactNode } from 'react';
import { forwardRef } from 'react';

import { cn } from '@/shared/lib/cn';

type Orientation = 'horizontal' | 'vertical';
type Variant = 'subtle' | 'default' | 'strong' | 'custom';
type Thickness = 'sm' | 'md' | 'lg';
type Align = 'start' | 'center' | 'end';

export type DividerProps = HTMLAttributes<HTMLDivElement> & {
    orientation?: Orientation;
    dashed?: boolean;
    variant?: Variant;
    thickness?: Thickness;
    label?: ReactNode; // only meaningful for horizontal
    align?: Align;
};

function borderClass(orientation: Orientation, thickness: Thickness) {
    if (orientation === 'vertical') {
        return cn(
            thickness === 'lg' ? 'border-l-[3px]' : thickness === 'md' ? 'border-l-2' : 'border-l',
        );
    }
    return cn(
        thickness === 'lg' ? 'border-t-[3px]' : thickness === 'md' ? 'border-t-2' : 'border-t',
    );
}

function variantClass(variant: Exclude<Variant, 'custom'>) {
    switch (variant) {
        case 'subtle':
            return 'border-border-subtle';
        case 'strong':
            return 'border-strong';
        default:
            return 'border-border';
    }
}

export const Divider = forwardRef<HTMLDivElement, DividerProps>((props, ref) => {
    const {
        orientation = 'horizontal',
        dashed,
        variant = 'subtle',
        thickness = 'sm',
        label,
        align = 'center',
        className,
        ...rest
    } = props;

    const lineBase = cn(
        'shrink-0 border-solid',
        dashed && 'border-dashed',
        variant !== 'custom' && variantClass(variant),
        borderClass(orientation, thickness),
    );

    if (orientation === 'vertical') {
        return (
            <div
                ref={ref}
                role="separator"
                aria-orientation="vertical"
                className={cn('mx-2 h-6', lineBase, className)}
                {...rest}
            />
        );
    }

    // Horizontal
    if (!label) {
        return (
            <div
                ref={ref}
                role="separator"
                aria-orientation="horizontal"
                className={cn('my-2 w-full', lineBase, className)}
                {...rest}
            />
        );
    }

    // Labeled horizontal divider
    const leftFlex = align === 'start' ? 'w-6' : 'flex-1';
    const rightFlex = align === 'end' ? 'w-6' : 'flex-1';
    return (
        <div ref={ref} className={cn('my-2 flex w-full items-center gap-3', className)} {...rest}>
            <div className={cn('h-0', leftFlex, lineBase)} />
            <div className="text-xs text-muted-foreground select-none">{label}</div>
            <div className={cn('h-0', rightFlex, lineBase)} />
        </div>
    );
});

Divider.displayName = 'Divider';

export default Divider;
