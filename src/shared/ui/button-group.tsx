import { Button, type ButtonProps, type ButtonSize, type ButtonVariant } from './button';

function cn(...classes: Array<string | false | null | undefined>) {
    return classes.filter(Boolean).join(' ');
}

export interface ButtonGroupItem extends Omit<ButtonProps, 'variant' | 'size' | 'color' | 'pill'> {
    href?: string;
}

export interface ButtonGroupProps {
    items: ButtonGroupItem[];
    variant?: ButtonVariant;
    size?: ButtonSize;
    color?: string;
    pill?: boolean;
    className?: string;
}

export function ButtonGroup({
    items,
    variant = 'default',
    size = 'md',
    color,
    pill = false,
    className,
}: ButtonGroupProps) {
    return (
        <div className={cn('inline-flex gap-2', className)}>
            {items.map(({ href, ...item }, index) =>
                href ? (
                    <a key={index} href={href} className="inline-flex">
                        <Button variant={variant} size={size} color={color} pill={pill} {...item} />
                    </a>
                ) : (
                    <Button
                        key={index}
                        variant={variant}
                        size={size}
                        color={color}
                        pill={pill}
                        {...item}
                    />
                ),
            )}
        </div>
    );
}

export default ButtonGroup;