/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect, useMemo, useState } from 'react';
import type { HTMLAttributes, ReactNode } from 'react';
import { cn } from '@/shared/lib/cn';
import { Spinner } from './Spinner';
import { EmptyState } from './EmptyState';

type Align = 'left' | 'center' | 'right';

export type TableColumn<T = any> = {
    key: string; // dot-path o clave simple
    header?: ReactNode;
    accessor?: (row: T) => any; // si no se provee, usa key con dot-path
    render?: (value: any, row: T, rowIndex: number) => ReactNode;
    sortable?: boolean;
    sortAccessor?: (row: T) => string | number | Date | null | undefined;
    className?: string;
    headerClassName?: string;
    width?: number | string;
    align?: Align;
};

export type TableProps<T = any> = Omit<HTMLAttributes<HTMLDivElement>, 'children'> & {
    data: T[];
    columns: TableColumn<T>[];
    loading?: boolean;
    emptyMessage?: string;
    hoverable?: boolean;
    striped?: boolean;
    dense?: boolean;
    rowKey?: (row: T, index: number) => string | number;
    onRowClick?: (row: T, index: number) => void;
    // Filtering
    globalFilter?: string;
    filterKeys?: string[]; // si no se provee, usa columns.key
    filterPredicate?: (row: T) => boolean; // opcional extra
    // Sorting (controlado o no)
    sortKey?: string;
    sortDir?: 'asc' | 'desc';
    onSortChange?: (key: string, dir: 'asc' | 'desc') => void;
    defaultSortKey?: string;
    defaultSortDir?: 'asc' | 'desc';
    // Paginación (opcional)
    page?: number; // 1-based
    pageSize?: number;
};

function getByPath(obj: any, path: string): any {
    try {
        return path
            .split('.')
            .reduce((acc: any, k: string) => (acc == null ? undefined : acc[k]), obj);
    } catch {
        return undefined;
    }
}

function normalize(v: any): string {
    if (v == null) return '';
    if (typeof v === 'string') return v.toLowerCase();
    if (typeof v === 'number' || typeof v === 'boolean') return String(v).toLowerCase();
    if (v instanceof Date) return String(v.getTime());
    return JSON.stringify(v).toLowerCase();
}

export function Table<T = any>(props: TableProps<T>) {
    const {
        data,
        columns,
        loading,
        emptyMessage = 'Sin datos',
        hoverable = true,
        striped,
        dense,
        rowKey,
        onRowClick,
        className,
        // filtering
        globalFilter,
        filterKeys,
        filterPredicate,
        // sorting control
        sortKey,
        sortDir,
        onSortChange,
        defaultSortKey,
        defaultSortDir = 'asc',
        // paging
        page,
        pageSize,
        ...rest
    } = props as TableProps<T>;

    const [innerSortKey, setInnerSortKey] = useState<string | undefined>(defaultSortKey);
    const [innerSortDir, setInnerSortDir] = useState<'asc' | 'desc'>(defaultSortDir);

    useEffect(() => {
        if (defaultSortKey) setInnerSortKey(defaultSortKey);
        if (defaultSortDir) setInnerSortDir(defaultSortDir);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [defaultSortKey, defaultSortDir]);

    const activeSortKey = sortKey ?? innerSortKey;
    const activeSortDir = (sortDir ?? innerSortDir) as 'asc' | 'desc';

    const filterCols = useMemo(
        () => (filterKeys && filterKeys.length > 0 ? filterKeys : columns.map((c) => c.key)),
        [filterKeys, columns],
    );

    const filtered = useMemo(() => {
        let rows = data ?? [];
        const text = globalFilter?.trim().toLowerCase();
        if (text) {
            rows = rows.filter((row) => {
                for (const k of filterCols) {
                    const col = columns.find((c) => c.key === k);
                    const value = col?.accessor ? col.accessor(row) : getByPath(row as any, k);
                    if (normalize(value).includes(text)) return true;
                }
                return false;
            });
        }
        if (filterPredicate) rows = rows.filter(filterPredicate);
        return rows;
    }, [data, columns, filterCols, globalFilter, filterPredicate]);

    const sorted = useMemo(() => {
        const rows = [...filtered];
        const key = activeSortKey;
        if (!key) return rows;
        const col = columns.find((c) => c.key === key);
        if (!col) return rows;
        const dir = activeSortDir === 'desc' ? -1 : 1;
        const getVal = (row: T) =>
            col.sortAccessor
                ? col.sortAccessor(row)
                : col.accessor
                  ? col.accessor(row)
                  : getByPath(row as any, key);
        rows.sort((a, b) => {
            const va = getVal(a);
            const vb = getVal(b);
            // nulls last
            if (va == null && vb != null) return 1;
            if (va != null && vb == null) return -1;
            if (va == null && vb == null) return 0;
            const na = va instanceof Date ? va.getTime() : va;
            const nb = vb instanceof Date ? vb.getTime() : vb;
            if (typeof na === 'number' && typeof nb === 'number') return (na - nb) * dir;
            const sa = normalize(na);
            const sb = normalize(nb);
            if (sa < sb) return -1 * dir;
            if (sa > sb) return 1 * dir;
            return 0;
        });
        return rows;
    }, [filtered, columns, activeSortKey, activeSortDir]);

    const paged = useMemo(() => {
        if (!page || !pageSize) return sorted;
        const p = Math.max(1, page);
        const size = Math.max(1, pageSize);
        const start = (p - 1) * size;
        return sorted.slice(start, start + size);
    }, [sorted, page, pageSize]);

    const handleSortToggle = (key: string, enabled: boolean) => {
        if (!enabled) return;
        let nextKey = activeSortKey;
        let nextDir: 'asc' | 'desc' = activeSortDir ?? 'asc';
        if (activeSortKey !== key) {
            nextKey = key;
            nextDir = 'asc';
        } else if (activeSortDir === 'asc') {
            nextDir = 'desc';
        } else {
            nextKey = undefined;
        }

        if (onSortChange) {
            onSortChange(nextKey!, nextDir);
        } else {
            setInnerSortKey(nextKey);
            if (nextKey) setInnerSortDir(nextDir);
        }
    };

    const tableCls = cn(
        'w-full overflow-x-auto rounded-md border border-border-subtle bg-surface',
        className,
    );
    const thBase =
        'px-4 py-2 text-left text-xs font-semibold uppercase tracking-wide text-muted-foreground bg-bg-subtle';
    const tdBase = cn('px-4 py-2 text-sm text-text', dense ? 'py-1.5' : '');

    return (
        <div className={tableCls} {...rest}>
            <table className="min-w-full">
                <thead className="border-b border-border-subtle">
                    <tr>
                        {columns.map((col) => {
                            const isSorted = activeSortKey === col.key;
                            const sortable = col.sortable !== false; // sortable por defecto
                            const ariaSort = isSorted
                                ? activeSortDir === 'asc'
                                    ? 'ascending'
                                    : 'descending'
                                : 'none';
                            const alignCls =
                                col.align === 'center'
                                    ? 'text-center'
                                    : col.align === 'right'
                                      ? 'text-right'
                                      : 'text-left';
                            return (
                                <th
                                    key={col.key}
                                    scope="col"
                                    aria-sort={ariaSort as any}
                                    className={cn(thBase, alignCls, col.headerClassName)}
                                    style={{ width: col.width as any }}
                                >
                                    <button
                                        type="button"
                                        className={cn(
                                            'inline-flex items-center gap-1 select-none',
                                            sortable ? 'cursor-pointer' : 'cursor-default',
                                        )}
                                        onClick={() => handleSortToggle(col.key, sortable)}
                                        aria-label={
                                            typeof col.header === 'string'
                                                ? `Ordenar por ${col.header}`
                                                : 'Ordenar'
                                        }
                                    >
                                        <span>{col.header ?? col.key}</span>
                                        {sortable && (
                                            <span className="text-muted-foreground">
                                                {isSorted
                                                    ? activeSortDir === 'asc'
                                                        ? '▲'
                                                        : '▼'
                                                    : '↕'}
                                            </span>
                                        )}
                                    </button>
                                </th>
                            );
                        })}
                    </tr>
                </thead>
                <tbody>
                    {loading ? (
                        <tr>
                            <td colSpan={columns.length} className="py-8 text-center">
                                <div className="inline-flex items-center gap-2 text-sm text-muted-foreground">
                                    <Spinner indeterminate size={20} ariaLabel="Cargando" />
                                    Cargando…
                                </div>
                            </td>
                        </tr>
                    ) : paged.length === 0 ? (
                        <tr>
                            <td colSpan={columns.length} className="py-8">
                                <EmptyState
                                    title={emptyMessage}
                                    description={
                                        globalFilter
                                            ? 'Ajusta el filtro para ver resultados'
                                            : undefined
                                    }
                                />
                            </td>
                        </tr>
                    ) : (
                        paged.map((row, rowIndex) => {
                            const key = rowKey ? rowKey(row, rowIndex) : rowIndex;
                            return (
                                <tr
                                    key={key as any}
                                    className={cn(
                                        'border-b border-border-subtle',
                                        hoverable && 'hover:bg-elevated',
                                        striped && rowIndex % 2 === 1 && 'bg-bg-subtle',
                                        onRowClick && 'cursor-pointer',
                                    )}
                                    onClick={
                                        onRowClick ? () => onRowClick(row, rowIndex) : undefined
                                    }
                                >
                                    {columns.map((col) => {
                                        const alignCls =
                                            col.align === 'center'
                                                ? 'text-center'
                                                : col.align === 'right'
                                                  ? 'text-right'
                                                  : 'text-left';
                                        const value = col.accessor
                                            ? col.accessor(row)
                                            : getByPath(row as any, col.key);
                                        return (
                                            <td
                                                key={col.key}
                                                className={cn(tdBase, alignCls, col.className)}
                                            >
                                                {col.render
                                                    ? col.render(value, row, rowIndex)
                                                    : (value as any)}
                                            </td>
                                        );
                                    })}
                                </tr>
                            );
                        })
                    )}
                </tbody>
            </table>
        </div>
    );
}

export default Table;
