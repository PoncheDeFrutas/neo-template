import type { HTMLAttributes, ReactNode } from 'react';

import { cn } from '@/shared/lib/cn';

export type EmptyStateProps = Omit<HTMLAttributes<HTMLDivElement>, 'children'> & {
    title: string;
    description?: string;
    action?: ReactNode; // e.g., a <Button />
};

export function EmptyState({ title, description, action, className, ...rest }: EmptyStateProps) {
    return (
        <div
            className={cn(
                'w-full rounded-md border border-border-subtle bg-surface p-8 text-center',
                'flex flex-col items-center justify-center gap-3',
                className,
            )}
            {...rest}
        >
            <h3 className="text-base font-semibold text-text">{title}</h3>
            {description && <p className="max-w-md text-sm text-muted-foreground">{description}</p>}
            {action && <div className="mt-2">{action}</div>}
        </div>
    );
}

export default EmptyState;
