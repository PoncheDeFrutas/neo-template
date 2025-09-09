import type { HTMLAttributes, ReactNode } from 'react';
import { cn } from '@/shared/lib/cn';

export type ErrorStateProps = Omit<HTMLAttributes<HTMLDivElement>, 'children'> & {
    title: string;
    description?: string;
    action?: ReactNode; // e.g., a retry <Button />
};

export function ErrorState({ title, description, action, className, ...rest }: ErrorStateProps) {
    return (
        <div
            role="group"
            aria-label="Error"
            className={cn(
                'w-full rounded-md border border-danger bg-surface p-8 text-center',
                'flex flex-col items-center justify-center gap-3',
                className,
            )}
            {...rest}
        >
            <h3 className="text-base font-semibold text-danger">{title}</h3>
            {description && <p className="max-w-md text-sm text-muted-foreground">{description}</p>}
            {action && <div className="mt-2">{action}</div>}
        </div>
    );
}

export default ErrorState;
