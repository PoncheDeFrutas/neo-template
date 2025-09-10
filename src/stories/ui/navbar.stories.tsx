import { Badge, Button, Navbar } from '@shared/ui';
import type { Meta, StoryObj } from '@storybook/react-vite';
import { Home, LayoutGrid, Settings, ShoppingBag } from 'lucide-react';

type Align = 'left' | 'center' | 'between';
type Size = 'sm' | 'md' | 'lg';
type Breakpoint = 'sm' | 'md' | 'lg';

type StoryArgs = {
    brand?: string;
    brandHref?: string;
    align: Align;
    sticky: boolean;
    elevated: boolean;
    border: boolean;
    size: Size;
    collapseAt: Breakpoint;
    enableDrawer: boolean;
    withRightSlot: boolean;
    showIcons: boolean;
    showBadges: boolean;
    activeIndex: number;
    className?: string;
    containerClassName?: string;
    itemsClassName?: string;
    itemClassName?: string;
};

const meta = {
    title: 'Shared/Navbar',
    component: Navbar,
    parameters: {
        layout: 'padded',
        docs: {
            description: {
                component: `
Navbar displays brand, navigation items and optional right-side actions. It supports sticky positioning, elevation, borders and mobile collapse into a Drawer.

Usage
\`\`\`tsx
import { Navbar, Button } from '@shared/ui';
import { Home, Settings } from 'lucide-react';

const items = [
  { label: 'Home', href: '/', icon: <Home size={16} />, active: true },
  { label: 'Settings', href: '/settings', icon: <Settings size={16} /> },
];

<Navbar
  brand={<span>RapiEntrega</span>}
  brandHref="/"
  items={items}
  rightSlot={<Button size="sm">Sign in</Button>}
  align="between"
  sticky
  elevated
  border
  size="md"
  collapseAt="md"
  enableDrawer
/>
\`\`\`

Props
- brand?: ReactNode; brandHref?: string — Brand element and link.
- items?: Array<{ label: ReactNode; href?: string; onClick?: (e) => void; active?: boolean; icon?: ReactNode; disabled?: boolean; external?: boolean; badge?: ReactNode }>
- rightSlot?: ReactNode — Right-aligned actions.
- align?: 'left' | 'center' | 'between' — Content alignment (default: 'between').
- sticky?: boolean — Sticky positioning at top (default: true).
- elevated?: boolean — Subtle shadow (default: false).
- border?: boolean — Bottom border (default: true).
- size?: 'sm' | 'md' | 'lg' — Height presets (default: 'md').
- collapseAt?: 'sm' | 'md' | 'lg' — Breakpoint where menu collapses to mobile.
- enableDrawer?: boolean — Disable to always show desktop menu.
- className/containerClassName/itemsClassName/itemClassName: string — Style overrides.

Notes
- On small viewports (below \`collapseAt\`), a mobile Drawer is used with a toggle button.
- For external links, set \`external\` to automatically set target and rel.
                `,
            },
        },
    },
    tags: ['autodocs'],
    argTypes: {
        brand: { control: 'text', description: 'Brand text (can be a node/logo)' },
        brandHref: { control: 'text', description: 'Brand link' },
        align: {
            control: { type: 'inline-radio' },
            options: ['left', 'center', 'between'],
            description: 'Content alignment',
        },
        sticky: { control: 'boolean', description: 'Sticky at top' },
        elevated: { control: 'boolean', description: 'Shadow elevation' },
        border: { control: 'boolean', description: 'Bottom border' },
        size: {
            control: { type: 'inline-radio' },
            options: ['sm', 'md', 'lg'],
            description: 'Navbar height',
        },
        collapseAt: {
            control: { type: 'inline-radio' },
            options: ['sm', 'md', 'lg'],
            description: 'Collapse breakpoint (mobile drawer)',
        },
        enableDrawer: { control: 'boolean', description: 'Enable mobile drawer' },
        withRightSlot: { control: 'boolean', description: 'Show example right slot' },
        showIcons: { control: 'boolean', description: 'Show icons in items' },
        showBadges: { control: 'boolean', description: 'Show badges in items' },
        activeIndex: {
            control: { type: 'number', min: 0, max: 3, step: 1 },
            description: 'Active item index',
        },
        className: { control: 'text', description: 'Navbar className' },
        containerClassName: { control: 'text', description: 'Inner container classes' },
        itemsClassName: { control: 'text', description: 'Items wrapper classes' },
        itemClassName: { control: 'text', description: 'Individual item classes' },
    },
} satisfies Meta<any>;

export default meta;

type Story = StoryObj<StoryArgs>;

function buildItems(args: StoryArgs) {
    const base = [
        { label: 'Home', href: '#', icon: <Home size={16} /> },
        { label: 'Dashboard', href: '#', icon: <LayoutGrid size={16} /> },
        {
            label: 'Orders',
            href: '#',
            icon: <ShoppingBag size={16} />,
            badge: args.showBadges ? <Badge variant="neutral">3</Badge> : undefined,
        },
        { label: 'Settings', href: '#', icon: <Settings size={16} /> },
    ];
    return base.map((it, i) => ({
        ...it,
        icon: args.showIcons ? it.icon : undefined,
        active: args.activeIndex === i,
    }));
}

function rightSlotNode(show: boolean) {
    if (!show) return undefined;
    return (
        <div className="flex items-center gap-2">
            <Button size="sm" variant="ghost">
                Docs
            </Button>
            <Button size="sm">Sign in</Button>
        </div>
    );
}

export const Playground: Story = {
    args: {
        brand: 'RapiEntrega',
        brandHref: '#',
        align: 'between',
        sticky: true,
        elevated: true,
        border: true,
        size: 'md',
        collapseAt: 'md',
        enableDrawer: true,
        withRightSlot: true,
        showIcons: true,
        showBadges: true,
        activeIndex: 0,
        className: '',
        containerClassName: '',
        itemsClassName: '',
        itemClassName: '',
    },
    parameters: { docs: { description: { story: 'Interactive control center.' } } },
    render: (args) => (
        <Navbar
            brand={<span>{args.brand}</span>}
            brandHref={args.brandHref}
            items={buildItems(args)}
            rightSlot={rightSlotNode(args.withRightSlot)}
            align={args.align}
            sticky={args.sticky}
            elevated={args.elevated}
            border={args.border}
            size={args.size}
            collapseAt={args.collapseAt}
            enableDrawer={args.enableDrawer}
            className={args.className}
            containerClassName={args.containerClassName}
            itemsClassName={args.itemsClassName}
            itemClassName={args.itemClassName}
        />
    ),
};

export const Alignments: Story = {
    args: {
        sticky: false,
        elevated: false,
        border: true,
        size: 'md',
        collapseAt: 'md',
        enableDrawer: true,
    },
    parameters: { docs: { description: { story: 'left, center, between alignments.' } } },
    render: (args) => (
        <div className="grid gap-8">
            <Navbar
                brand={<span>Brand</span>}
                items={buildItems({
                    ...args,
                    showIcons: true,
                    showBadges: false,
                    activeIndex: 0,
                } as any)}
                align="left"
                sticky={args.sticky}
                elevated={args.elevated}
                border={args.border}
                size={args.size}
                collapseAt={args.collapseAt}
                enableDrawer={args.enableDrawer}
            />
            <Navbar
                brand={<span>Brand</span>}
                items={buildItems({
                    ...args,
                    showIcons: true,
                    showBadges: false,
                    activeIndex: 1,
                } as any)}
                align="center"
                sticky={args.sticky}
                elevated={args.elevated}
                border={args.border}
                size={args.size}
                collapseAt={args.collapseAt}
                enableDrawer={args.enableDrawer}
            />
            <Navbar
                brand={<span>Brand</span>}
                items={buildItems({
                    ...args,
                    showIcons: true,
                    showBadges: true,
                    activeIndex: 2,
                } as any)}
                align="between"
                sticky={args.sticky}
                elevated={args.elevated}
                border={args.border}
                size={args.size}
                collapseAt={args.collapseAt}
                enableDrawer={args.enableDrawer}
                rightSlot={rightSlotNode(true)}
            />
        </div>
    ),
};

export const Sizes: Story = {
    args: {
        align: 'between',
        sticky: false,
        elevated: true,
        border: true,
        collapseAt: 'md',
        enableDrawer: true,
    },
    parameters: { docs: { description: { story: 'sm, md, lg heights.' } } },
    render: (args) => (
        <div className="grid gap-8">
            <Navbar
                brand={<span>Small</span>}
                items={buildItems({
                    ...args,
                    showIcons: true,
                    showBadges: false,
                    activeIndex: 0,
                } as any)}
                size="sm"
                sticky={args.sticky}
                elevated={args.elevated}
                border={args.border}
                collapseAt={args.collapseAt}
                enableDrawer={args.enableDrawer}
            />
            <Navbar
                brand={<span>Medium</span>}
                items={buildItems({
                    ...args,
                    showIcons: true,
                    showBadges: false,
                    activeIndex: 1,
                } as any)}
                size="md"
                sticky={args.sticky}
                elevated={args.elevated}
                border={args.border}
                collapseAt={args.collapseAt}
                enableDrawer={args.enableDrawer}
            />
            <Navbar
                brand={<span>Large</span>}
                items={buildItems({
                    ...args,
                    showIcons: true,
                    showBadges: false,
                    activeIndex: 2,
                } as any)}
                size="lg"
                sticky={args.sticky}
                elevated={args.elevated}
                border={args.border}
                collapseAt={args.collapseAt}
                enableDrawer={args.enableDrawer}
            />
        </div>
    ),
};

export const StickyAndElevated: Story = {
    args: { align: 'between', size: 'md', collapseAt: 'md', enableDrawer: true },
    parameters: { docs: { description: { story: 'Sticky and elevated surface.' } } },
    render: (args) => (
        <div
            style={{
                height: 300,
                overflow: 'auto',
                border: '1px solid var(--color-border-subtle)',
            }}
        >
            <Navbar
                brand={<span>Sticky</span>}
                items={buildItems({
                    ...args,
                    showIcons: true,
                    showBadges: true,
                    activeIndex: 0,
                } as any)}
                sticky
                elevated
                border
                size={args.size}
                collapseAt={args.collapseAt}
                enableDrawer={args.enableDrawer}
                rightSlot={rightSlotNode(true)}
            />
            <div style={{ height: 800, padding: 16 }}>
                Scroll the container to see sticky behavior.
            </div>
        </div>
    ),
};
