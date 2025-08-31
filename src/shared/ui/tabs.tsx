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
}

export function TabList({ children, className }: TabListProps) {
    return (
        <div role="tablist" className={cn('flex border-b border-gray-200', className)}>
            {children}
        </div>
    );
}

export interface TabProps extends ButtonHTMLAttributes<HTMLButtonElement> {
    value: string;
}

export function Tab({ value, className, children, ...props }: TabProps) {
    const context = useContext(TabsContext);
    if (!context) throw new Error('Tab must be used within Tabs');

    const isActive = context.activeValue === value;

    return (
        <button
            type="button"
            role="tab"
            className={cn(
                'px-4 py-2 text-sm -mb-px border-b-2 transition-colors',
                isActive
                    ? 'border-blue-500 text-blue-600'
                    : 'border-transparent text-gray-600 hover:text-gray-800',
                className,
            )}
            onClick={() => context.setActiveValue(value)}
            {...props}
        >
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
