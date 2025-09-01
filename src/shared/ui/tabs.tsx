import {
    type ReactNode,
    createContext,
    useContext,
    useState,
    type ButtonHTMLAttributes,
} from 'react';

interface TabsContextValue {
    activeValue: string;
    setActiveValue: (value: string) => void;
}

const TabsContext = createContext<TabsContextValue | null>(null);

type TabVariant = 'default' | 'underline' | 'pill' | 'vertical' | 'fullWidth';

interface TabListContextValue {
    variant: TabVariant;
}

const TabListContext = createContext<TabListContextValue | null>(null);

export interface TabsProps {
    value?: string;
    defaultValue?: string;
    onValueChange?: (value: string) => void;
    children: ReactNode;
}

export function Tabs({ value, defaultValue, onValueChange, children }: TabsProps) {
    const [internalValue, setInternalValue] = useState(defaultValue ?? '');
    const isControlled = value !== undefined;
    const activeValue = isControlled ? value : internalValue;

    const setActiveValue = (val: string) => {
        if (!isControlled) {
            setInternalValue(val);
        }
        onValueChange?.(val);
    };

    return (
        <TabsContext.Provider value={{ activeValue, setActiveValue }}>
            {children}
        </TabsContext.Provider>
    );
}

export interface TabListProps {
    children: ReactNode;
    className?: string;
    variant?: TabVariant;
}

export function TabList({ children, className, variant = 'default' }: TabListProps) {
    const containerBase = 'flex';
    const containerVariant =
        variant === 'pill'
            ? 'border border-gray-200 bg-gray-50 rounded-lg p-1 gap-1'
            : variant === 'vertical'
              ? 'flex-col border-l border-gray-200 gap-1'
              : variant === 'fullWidth'
                ? 'w-full border-b border-gray-200 gap-2'
                : 'border-b border-gray-200 gap-2'; // default & underline

    return (
        <TabListContext.Provider value={{ variant }}>
            <div role="tablist" className={cn(containerBase, containerVariant, className)}>
                {children}
            </div>
        </TabListContext.Provider>
    );
}

export interface TabProps extends ButtonHTMLAttributes<HTMLButtonElement> {
    value: string;
    icon?: ReactNode;
}

export function Tab({ value, icon, className, children, ...props }: TabProps) {
    const context = useContext(TabsContext);
    if (!context) throw new Error('Tab must be used within Tabs');

    const listContext = useContext(TabListContext);
    const variant: TabVariant = listContext?.variant ?? 'default';

    const isActive = context.activeValue === value;

    return (
        <button
            type="button"
            role="tab"
            className={cn(
                // base
                'px-4 py-2 text-sm transition-colors focus:outline-none',
                // variant specific base
                variant === 'pill'
                    ? 'rounded-lg border border-transparent'
                    : variant === 'vertical'
                      ? '-ml-px border-l-2 text-left'
                      : '-mb-px border-b-2', // default, underline, fullWidth
                // active vs inactive
                isActive
                    ? variant === 'pill'
                        ? 'bg-blue-600 text-white border-blue-600'
                        : 'border-blue-500 text-blue-600'
                    : variant === 'pill'
                        ? 'text-gray-700 hover:bg-white'
                        : 'border-transparent text-gray-600 hover:text-gray-800',
                // full width adjustments
                variant === 'fullWidth' && 'flex-1 text-center',
                className,
            )}
            onClick={() => context.setActiveValue(value)}
            {...props}
        >
            {icon ? <span className="mr-2 inline-block" aria-hidden="true">{icon}</span> : null}
            {children}
        </button>
    );
}

export interface TabPanelProps {
    value: string;
    children: ReactNode;
    className?: string;
}

export function TabPanel({ value, children, className }: TabPanelProps) {
    const context = useContext(TabsContext);
    if (!context) throw new Error('TabPanel must be used within Tabs');
    if (context.activeValue !== value) return null;

    return (
        <div role="tabpanel" className={className}>
            {children}
        </div>
    );
}

function cn(...classes: Array<string | false | null | undefined>) {
    return classes.filter(Boolean).join(' ');
}

export default Tabs;
