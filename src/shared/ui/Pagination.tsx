import type { HTMLAttributes } from 'react';
import { cn } from '@/shared/lib/cn';

export type PaginationProps = Omit<HTMLAttributes<HTMLElement>, 'children' | 'onChange'> & {
    page: number; // 1-based
    pageCount: number; // total pages >= 1
    onChange: (page: number) => void;
    siblingCount?: number; // adjacent pages around current
    boundaryCount?: number; // pages at start and end
    size?: 'sm' | 'md';
    showFirstLast?: boolean;
    showPrevNext?: boolean;
};

function clamp(n: number, min: number, max: number) {
    return Math.max(min, Math.min(max, n));
}

function range(start: number, end: number): number[] {
    return Array.from({ length: Math.max(0, end - start + 1) }, (_, i) => start + i);
}

export function Pagination({
    page,
    pageCount,
    onChange,
    siblingCount = 1,
    boundaryCount = 1,
    size = 'md',
    showFirstLast = true,
    showPrevNext = true,
    className,
    ...rest
}: PaginationProps) {
    const total = Math.max(1, pageCount | 0);
    const current = clamp(page | 0, 1, total);

    const startPages = range(1, Math.min(boundaryCount, total));
    const endPages = range(Math.max(total - boundaryCount + 1, boundaryCount + 1), total);
    const siblingsStart = Math.max(
        Math.min(current - siblingCount, total - boundaryCount - siblingCount * 2 - 1),
        boundaryCount + 2,
    );
    const siblingsEnd = Math.min(
        Math.max(current + siblingCount, boundaryCount + siblingCount * 2 + 2),
        endPages.length > 0 ? endPages[0] - 2 : total - 1,
    );

    type Item = {
        key: string;
        type: 'page' | 'ellipsis' | 'prev' | 'next' | 'first' | 'last';
        page?: number;
        disabled?: boolean;
        selected?: boolean;
    };
    const items: Item[] = [];
    const pushPage = (p: number) => {
        if (!items.some((it) => it.type === 'page' && it.page === p)) {
            items.push({ key: `p${p}`, type: 'page', page: p, selected: p === current });
        }
    };

    if (showFirstLast)
        items.push({ key: 'first', type: 'first', page: 1, disabled: current === 1 });
    if (showPrevNext)
        items.push({ key: 'prev', type: 'prev', page: current - 1, disabled: current === 1 });

    startPages.forEach((p) => pushPage(p));
    // Left gap handling: show ellipsis if big gap, or bridge single page if exact gap of 1
    if (siblingsStart > boundaryCount + 2) {
        items.push({ key: 'e1', type: 'ellipsis' });
    } else if (siblingsStart === boundaryCount + 2) {
        const bridge = boundaryCount + 1;
        pushPage(bridge);
    }
    range(siblingsStart, siblingsEnd).forEach((p) => pushPage(p));
    // Right gap handling: ellipsis or bridge
    if (siblingsEnd < total - boundaryCount - 1) {
        items.push({ key: 'e2', type: 'ellipsis' });
    } else if (siblingsEnd === total - boundaryCount - 1) {
        const bridge = total - boundaryCount;
        pushPage(bridge);
    }
    endPages.forEach((p) => pushPage(p));

    if (showPrevNext)
        items.push({ key: 'next', type: 'next', page: current + 1, disabled: current === total });
    if (showFirstLast)
        items.push({ key: 'last', type: 'last', page: total, disabled: current === total });

    const sizeCls = size === 'sm' ? 'h-8 min-w-8 px-2 text-xs' : 'h-9 min-w-9 px-3 text-sm';
    const baseBtn = cn(
        'inline-flex items-center justify-center rounded-md border transition-colors select-none',
        'bg-bg text-text border-border-subtle hover:border-strong',
        'focus-visible:outline-none focus-visible:ring-2 ring-ring',
        sizeCls,
    );
    const activeBtn = 'bg-primary text-primary-foreground border-transparent hover:opacity-90';
    const iconBtn = 'px-2';

    return (
        <nav aria-label="Pagination" className={cn('w-full', className)} {...rest}>
            <ul className="flex items-center gap-2" role="list">
                {items.map((it) => {
                    if (it.type === 'ellipsis') {
                        return (
                            <li key={it.key} className="text-muted-foreground select-none">
                                …
                            </li>
                        );
                    }
                    const isPage = it.type === 'page';
                    const label =
                        it.type === 'first'
                            ? 'Primera'
                            : it.type === 'prev'
                              ? 'Anterior'
                              : it.type === 'next'
                                ? 'Siguiente'
                                : it.type === 'last'
                                  ? 'Última'
                                  : String(it.page);
                    const ariaCurrent: 'page' | undefined =
                        isPage && it.selected ? 'page' : undefined;
                    const classes = cn(
                        baseBtn,
                        isPage && it.selected ? activeBtn : '',
                        !isPage ? iconBtn : '',
                    );
                    return (
                        <li key={it.key}>
                            <button
                                type="button"
                                aria-label={isPage ? undefined : label}
                                aria-current={ariaCurrent}
                                disabled={it.disabled}
                                className={cn(
                                    classes,
                                    it.disabled && 'opacity-50 pointer-events-none',
                                )}
                                onClick={() => {
                                    const target = clamp(it.page ?? current, 1, total);
                                    if (target !== current) onChange(target);
                                }}
                            >
                                {isPage ? it.page : label}
                            </button>
                        </li>
                    );
                })}
            </ul>
        </nav>
    );
}

export default Pagination;
