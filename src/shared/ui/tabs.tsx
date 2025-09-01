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

/**
 * Props for the Tabs component.
 * 
 * @interface TabsProps
 * @property {string} [value] - The controlled value of the currently active tab
 * @property {string} [defaultValue] - The default value for the active tab when uncontrolled
 * @property {(value: string) => void} [onValueChange] - Callback function called when the active tab changes
 * @property {ReactNode} children - The child elements to render within the tabs component
 */
export interface TabsProps {
    value?: string;
    defaultValue?: string;
    onValueChange?: (value: string) => void;
    children: ReactNode;
}

/**
 * A tabs component that supports both controlled and uncontrolled modes.
 * 
 * @param value - The controlled value of the active tab. When provided, the component operates in controlled mode.
 * @param defaultValue - The initial value for the active tab when operating in uncontrolled mode. Defaults to empty string.
 * @param onValueChange - Callback function called when the active tab changes. Receives the new tab value as parameter.
 * @param children - React children elements, typically TabsList and TabsContent components.
 * 
 * @returns JSX element that provides tab context to child components.
 * 
 * @example
 * ```tsx
 * // Uncontrolled usage
 * <Tabs defaultValue="tab1" onValueChange={(value) => console.log(value)}>
 *   <TabsList>
 *     <TabsTrigger value="tab1">Tab 1</TabsTrigger>
 *     <TabsTrigger value="tab2">Tab 2</TabsTrigger>
 *   </TabsList>
 *   <TabsContent value="tab1">Content 1</TabsContent>
 *   <TabsContent value="tab2">Content 2</TabsContent>
 * </Tabs>
 * 
 * // Controlled usage
 * <Tabs value={activeTab} onValueChange={setActiveTab}>
 *   {children}
 * </Tabs>
 * ```
 */
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

/**
 * Props for the TabList component.
 * 
 * @interface TabListProps
 * @property {ReactNode} children - The child elements to be rendered within the tab list
 * @property {string} [className] - Optional CSS class name for styling the tab list
 * @property {TabVariant} [variant] - Optional variant to control the appearance style of the tab list
 */
export interface TabListProps {
    children: ReactNode;
    className?: string;
    variant?: TabVariant;
}

/**
 * A container component that renders a list of tabs with different visual variants.
 * 
 * @param props - The component props
 * @param props.children - The tab elements to render within the list
 * @param props.className - Additional CSS classes to apply to the container
 * @param props.variant - The visual style variant for the tab list
 *   - 'default': Standard horizontal tabs with bottom border
 *   - 'pill': Rounded tabs with border and background
 *   - 'vertical': Vertical layout with left border
 *   - 'fullWidth': Full width tabs with bottom border
 *   - 'underline': Horizontal tabs with underline styling
 * 
 * @returns A tablist container with the specified variant styling and context provider
 */
export function TabList({ children, className, variant = 'default' }: TabListProps) {
    const containerBase = 'flex bg-surface';
    const containerVariant =
        variant === 'pill'
            ? 'border border-border rounded-lg p-1 gap-1'
            : variant === 'vertical'
              ? 'flex-col border-l border-border rounded-md p-1 gap-1'
              : variant === 'fullWidth'
                ? 'w-full border-b border-border gap-2'
                : 'border-b border-border gap-2'; // default & underline

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
    /**
     * Additional classes applied when the tab is active.
     * Defaults combine with internal styles. Default active styles: 'border-blue-500 text-blue-600'.
     */
    activeClassName?: string;
    /**
     * Additional classes applied when the tab is inactive.
     * Defaults combine with internal styles. Default inactive styles: 'border-transparent text-gray-600'.
     */
    inactiveClassName?: string;
}

/**
 * A tab component that renders an individual tab button within a tabs container.
 * Must be used within a Tabs component context.
 * 
 * @param value - Unique identifier for this tab, used to determine active state
 * @param icon - Optional icon element to display before the tab text
 * @param activeClassName - Additional CSS classes to apply when the tab is active
 * @param inactiveClassName - Additional CSS classes to apply when the tab is inactive
 * @param className - Additional CSS classes to apply to the tab button
 * @param children - The content to display inside the tab (typically text)
 * @param props - Additional HTML button props
 * 
 * @throws {Error} When used outside of a Tabs component context
 * 
 * @example
 * ```tsx
 * <Tabs defaultValue="tab1">
 *   <TabList>
 *     <Tab value="tab1" icon={<HomeIcon />}>
 *       Home
 *     </Tab>
 *     <Tab value="tab2" activeClassName="font-bold">
 *       Settings
 *     </Tab>
 *   </TabList>
 * </Tabs>
 * ```
 */
export function Tab({
    value,
    icon,
    activeClassName,
    inactiveClassName,
    className,
    children,
    ...props
}: TabProps) {
    const context = useContext(TabsContext);
    if (!context) throw new Error('Tab must be used within Tabs');

    const listContext = useContext(TabListContext);
    const variant: TabVariant = listContext?.variant ?? 'default';

    const isActive = context.activeValue === value;

    return (
        <button
            type="button"
            role="tab"
            aria-selected={isActive}
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
                        ? 'bg-primary text-primary-foreground border-primary'
                        : 'border-primary text-primary'
                    : variant === 'pill'
                        ? 'text-muted-foreground hover:bg-surface'
                        : 'border-transparent text-muted-foreground hover:text-text',
                // user-provided classes for active/inactive states
                isActive ? activeClassName : inactiveClassName,
                // full width adjustments
                variant === 'fullWidth' && 'flex-1 text-center',
                className,
            )}
            onClick={() => context.setActiveValue(value)}
            {...props}
        >
            {icon ? (
                <span className="mr-2 inline-block" aria-hidden="true">
                    {icon}
                </span>
            ) : null}
            {children}
        </button>
    );
}

export interface TabPanelProps {
    value: string;
    children: ReactNode;
    className?: string;
}

/**
 * A tab panel component that displays content based on the active tab value.
 * Must be used within a Tabs context provider.
 * 
 * @param props - The component props
 * @param props.value - The unique identifier for this tab panel
 * @param props.children - The content to display when this panel is active
 * @param props.className - Optional CSS class name for styling
 * 
 * @returns The tab panel element when active, or null when inactive
 * 
 * @throws {Error} When used outside of a Tabs context
 * 
 * @example
 * ```tsx
 * <Tabs>
 *   <TabPanel value="tab1" className="panel-styles">
 *     <p>Content for tab 1</p>
 *   </TabPanel>
 * </Tabs>
 * ```
 */
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
