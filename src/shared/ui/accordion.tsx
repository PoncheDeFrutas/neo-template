import {
    createContext,
    type ReactNode,
    useContext,
    useEffect,
    useId,
    useRef,
    useState,
} from 'react';

/**
 * Context value for the Accordion component.
 *
 * @interface AccordionContextValue
 * @property {string[]} openItems - Array of item values that are currently expanded
 * @property {(value: string) => void} toggleItem - Function to toggle an item's open state
 * @property {string} colorClass - Tailwind border color class applied to items
 * @property {ReactNode} [arrowIcon] - Optional custom arrow icon
 */
interface AccordionContextValue {
    openItems: string[];
    toggleItem: (value: string) => void;
    colorClass: string;
    arrowIcon?: ReactNode;
}

const AccordionContext = createContext<AccordionContextValue | null>(null);

/**
 * Props for the Accordion component.
 *
 * @interface AccordionProps
 * @property {ReactNode} children - The accordion items to render
 * @property {boolean} [alwaysOpen] - Allows multiple panels to be open simultaneously
 * @property {string} [color] - Tailwind border color class (e.g. `border-gray-200`)
 * @property {boolean} [flush] - Removes the outer border and only shows internal dividers
 * @property {ReactNode} [arrowIcon] - Custom arrow icon for all items
 * @property {string} [className] - Additional CSS classes for the container
 */
export interface AccordionProps {
    children: ReactNode;
    alwaysOpen?: boolean;
    color?: string;
    flush?: boolean;
    arrowIcon?: ReactNode;
    className?: string;
}

/**
 * A collapsible container that reveals or hides content sections.
 *
 * Supports exclusive mode (only one panel open) or multiple panels open when
 * `alwaysOpen` is enabled. Styling can be customized via border color, flush
 * mode, and arrow icon.
 *
 * @param props - Component properties
 * @returns JSX element providing accordion context to its children
 *
 * @example
 * ```tsx
 * <Accordion>
 *   <AccordionItem value="a" title="Item A">Content A</AccordionItem>
 *   <AccordionItem value="b" title="Item B">Content B</AccordionItem>
 * </Accordion>
 * ```
 */
export function Accordion({
    children,
    alwaysOpen = false,
    color = 'border-border',
    flush = false,
    arrowIcon,
    className,
}: AccordionProps) {
    const [openItems, setOpenItems] = useState<string[]>([]);

    const toggleItem = (value: string) => {
        setOpenItems((prev) => {
            const isOpen = prev.includes(value);
            if (isOpen) {
                return prev.filter((v) => v !== value);
            }
            return alwaysOpen ? [...prev, value] : [value];
        });
    };

    return (
        <AccordionContext.Provider value={{ openItems, toggleItem, colorClass: color, arrowIcon }}>
            <div
                className={cn(
                    flush ? 'bg-transparent' : `border ${color} rounded-md bg-elevated`,
                    className,
                )}
            >
                {children}
            </div>
        </AccordionContext.Provider>
    );
}

/**
 * Props for an individual accordion item consisting of a header and panel.
 *
 * @interface AccordionItemProps
 * @property {string} value - Unique identifier used to control open state
 * @property {ReactNode} title - Header content displayed in the clickable area
 * @property {ReactNode} children - Content revealed when the item is expanded
 * @property {string} [className] - Additional CSS classes for the item container
 * @property {ReactNode} [arrowIcon] - Custom arrow icon overriding the one from context
 */
export interface AccordionItemProps {
    value: string;
    title: ReactNode;
    children: ReactNode;
    className?: string;
    arrowIcon?: ReactNode;
}

/**
 * Renders a single accordion section with a clickable header and collapsible panel.
 *
 * Must be used within an `Accordion` component.
 *
 * @param props - Component properties
 * @returns JSX element representing the accordion item
 *
 * @throws {Error} If rendered outside of an Accordion
 *
 * @example
 * ```tsx
 * <AccordionItem value="item1" title="Section 1">
 *   <p>Details for section 1</p>
 * </AccordionItem>
 * ```
 */
export function AccordionItem({
    value,
    title,
    children,
    className,
    arrowIcon,
}: AccordionItemProps) {
    const context = useContext(AccordionContext);
    if (!context) throw new Error('AccordionItem must be used within Accordion');

    const { openItems, toggleItem, colorClass } = context;
    const isOpen = openItems.includes(value);
    const id = useId();
    const headerId = `accordion-header-${id}`;
    const panelId = `accordion-panel-${id}`;

    const icon = arrowIcon ?? context.arrowIcon ?? (
        <svg className="w-4 h-4" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
            <path
                fillRule="evenodd"
                d="M5.23 7.21a.75.75 0 011.06.02L10 10.94l3.71-3.71a.75.75 0 011.08 1.04l-4.25 4.25a.75.75 0 01-1.08 0L5.21 8.27a.75.75 0 01.02-1.06z"
                clipRule="evenodd"
            />
        </svg>
    );

    // Smooth collapse/expand animation via max-height transition
    const panelRef = useRef<HTMLDivElement>(null);
    const [maxHeight, setMaxHeight] = useState<string>('0px');

    useEffect(() => {
        const el = panelRef.current;
        if (!el) return;
        if (isOpen) {
            // Measure content for smooth expand
            const content = el.firstElementChild as HTMLElement | null;
            const h = content ? content.scrollHeight : el.scrollHeight;
            setMaxHeight(`${h}px`);
        } else {
            setMaxHeight('0px');
        }
    }, [isOpen, children]);

    // Keep height in sync on resize when open
    useEffect(() => {
        if (!isOpen) return;
        const handle = () => {
            const el = panelRef.current;
            if (!el) return;
            const content = el.firstElementChild as HTMLElement | null;
            const h = content ? content.scrollHeight : el.scrollHeight;
            setMaxHeight(`${h}px`);
        };
        window.addEventListener('resize', handle);
        handle();
        return () => window.removeEventListener('resize', handle);
    }, [isOpen]);

    return (
        <div className={cn('border-t first:border-t-0', colorClass, className)}>
            <h2>
                <button
                    id={headerId}
                    type="button"
                    role="button"
                    className="flex w-full items-center gap-2 p-4 text-left text-text bg-transparent"
                    onClick={() => toggleItem(value)}
                    aria-expanded={isOpen}
                    aria-controls={panelId}
                >
                    <span>{title}</span>
                    <span
                        className={cn('ml-auto transition-transform', isOpen && 'rotate-180')}
                        aria-hidden="true"
                    >
                        {icon}
                    </span>
                </button>
            </h2>
            <div
                id={panelId}
                role="region"
                aria-labelledby={headerId}
                aria-hidden={!isOpen}
                ref={panelRef}
                style={{ maxHeight }}
                className={cn('overflow-hidden transition-[max-height] duration-300 ease-in-out')}
            >
                <div className="px-4 pb-4">{children}</div>
            </div>
        </div>
    );
}

function cn(...classes: Array<string | false | null | undefined>) {
    return classes.filter(Boolean).join(' ');
}
