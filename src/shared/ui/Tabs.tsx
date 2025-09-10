import type { HTMLAttributes, ReactNode } from 'react';
import { useEffect, useId, useMemo, useState } from 'react';

import { cn } from '@/shared/lib/cn';

export type TabItem = {
    value: string;
    label: ReactNode;
    content: ReactNode;
    disabled?: boolean;
};

export type TabsProps = Omit<HTMLAttributes<HTMLDivElement>, 'children'> & {
    items: TabItem[];
    value?: string; // controlled
    defaultValue?: string; // uncontrolled initial value
    onValueChange?: (value: string) => void;
    size?: 'sm' | 'md';
    listClassName?: string;
    triggerClassName?: string;
    contentClassName?: string;
};

export function Tabs({
    items,
    value,
    defaultValue,
    onValueChange,
    size = 'md',
    className,
    listClassName,
    triggerClassName,
    contentClassName,
    ...rest
}: TabsProps) {
    const id = useId();
    const firstEnabled = useMemo(() => items.find((i) => !i.disabled)?.value, [items]);
    const [inner, setInner] = useState<string | undefined>(defaultValue ?? firstEnabled);

    useEffect(() => {
        if (defaultValue && defaultValue !== inner) setInner(defaultValue);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [defaultValue]);

    const selected = value ?? inner ?? firstEnabled;
    const setSelected = (v: string) => {
        if (value === undefined) setInner(v);
        onValueChange?.(v);
    };

    const sizeCls = size === 'sm' ? 'px-3 py-2 text-sm' : 'px-4 py-2.5 text-sm';

    return (
        <div className={cn('tabs w-full', className)} {...rest}>
            <div
                role="tablist"
                aria-label="Tabs"
                className={cn(
                    'flex items-center gap-1 border-b border-border-subtle',
                    listClassName,
                )}
            >
                {items.map((item) => {
                    const isSelected = item.value === selected;
                    const tid = `tab-${id}-${item.value}`;
                    const pid = `panel-${id}-${item.value}`;
                    return (
                        <button
                            key={item.value}
                            id={tid}
                            role="tab"
                            type="button"
                            aria-selected={isSelected}
                            aria-controls={pid}
                            tabIndex={isSelected ? 0 : -1}
                            disabled={item.disabled}
                            onClick={() => !item.disabled && setSelected(item.value)}
                            onKeyDown={(e) => {
                                if (
                                    e.key === 'ArrowRight' ||
                                    e.key === 'ArrowLeft' ||
                                    e.key === 'Home' ||
                                    e.key === 'End'
                                ) {
                                    e.preventDefault();
                                    const enabled = items.filter((i) => !i.disabled);
                                    const idx = enabled.findIndex((i) => i.value === selected);
                                    if (idx === -1) return;
                                    let nextIdx = idx;
                                    if (e.key === 'ArrowRight')
                                        nextIdx = (idx + 1) % enabled.length;
                                    if (e.key === 'ArrowLeft')
                                        nextIdx = (idx - 1 + enabled.length) % enabled.length;
                                    if (e.key === 'Home') nextIdx = 0;
                                    if (e.key === 'End') nextIdx = enabled.length - 1;
                                    const next = enabled[nextIdx]?.value;
                                    if (next) setSelected(next);
                                }
                            }}
                            className={cn(
                                'relative inline-flex items-center justify-center select-none border-b-2',
                                sizeCls,
                                item.disabled && 'opacity-50 pointer-events-none',
                                isSelected
                                    ? 'border-primary text-text'
                                    : 'border-transparent text-muted-foreground hover:text-text hover:border-border-strong',
                                'focus-visible:outline-none focus-visible:ring-2 ring-ring rounded-t-md',
                                triggerClassName,
                            )}
                        >
                            {item.label}
                        </button>
                    );
                })}
            </div>
            {items.map((item) => {
                const isSelected = item.value === selected;
                const tid = `tab-${id}-${item.value}`;
                const pid = `panel-${id}-${item.value}`;
                return (
                    <div
                        key={item.value}
                        id={pid}
                        role="tabpanel"
                        aria-labelledby={tid}
                        hidden={!isSelected}
                        className={cn('pt-4', contentClassName)}
                    >
                        {isSelected ? item.content : null}
                    </div>
                );
            })}
        </div>
    );
}

export default Tabs;
