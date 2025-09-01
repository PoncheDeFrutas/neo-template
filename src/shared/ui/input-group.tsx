import { forwardRef, type ReactNode } from 'react';

import { Input, type InputProps } from './input';

export interface InputGroupProps extends InputProps {
    leftElement?: ReactNode;
    rightElement?: ReactNode;
}

function cn(...classes: Array<string | false | null | undefined | number | bigint>) {
    return classes.filter(Boolean).join(' ');
}

export const InputGroup = forwardRef<HTMLInputElement, InputGroupProps>(
    ({ leftElement, rightElement, className, ...props }, ref) => {
        return (
            <div className="relative flex items-center w-full">
                {leftElement && (
                    <span className="pointer-events-none absolute left-3 flex items-center">
                        {leftElement}
                    </span>
                )}
                <Input
                    ref={ref}
                    className={cn(leftElement && 'pl-10', rightElement && 'pr-10', className)}
                    {...props}
                />
                {rightElement && (
                    <span className="pointer-events-none absolute right-3 flex items-center">
                        {rightElement}
                    </span>
                )}
            </div>
        );
    },
);

export default InputGroup;