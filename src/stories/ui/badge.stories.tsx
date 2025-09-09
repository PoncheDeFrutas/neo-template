import { Badge } from '@shared/ui';
import type { Meta, StoryObj } from '@storybook/react-vite';
import { Check, X } from 'lucide-react';

type Variant = 'neutral' | 'success' | 'warning' | 'danger' | 'custom';
type Tone = 'soft' | 'solid' | 'outline';
type Size = 'sm' | 'md' | 'lg';

type StoryArgs = {
    children: string;
    variant: Variant;
    tone: Tone;
    size: Size;
    className?: string;
    withLeftIcon?: boolean;
    withRightIcon?: boolean;
};

const meta = {
    title: 'Shared/Badge',
    component: Badge,
    parameters: {
        layout: 'centered',
        docs: {
            description: {
                component: `
Badges are small status or categorization pills. They support variant, tone, size and optional icons.

Usage
\`\`\`tsx
import { Badge } from '@shared/ui';

// Soft tone (default)
<Badge>New</Badge>
<Badge variant="success">Active</Badge>
<Badge variant="warning">Pending</Badge>
<Badge variant="danger">Blocked</Badge>

// Solid tone
<Badge variant="success" tone="solid">Active</Badge>

// Outline tone
<Badge variant="warning" tone="outline">Pending</Badge>

// Sizes
<Badge size="sm">Small</Badge>
<Badge size="md">Medium</Badge>
<Badge size="lg">Large</Badge>

// With icons
import { Check, X } from 'lucide-react';

<Badge variant="success" tone="solid" size="md" leftIcon={<Check size={12} />}>Done</Badge>
<Badge variant="danger" tone="soft" size="md" rightIcon={<X size={12} />}>Error</Badge>

// Custom styling (variant="custom"): you own all classes
<Badge variant="custom" className="bg-primary text-primary-foreground border border-transparent">Custom</Badge>
\`\`\`

Props
- children: string — The label text displayed inside the badge.
- variant: 'neutral' | 'success' | 'warning' | 'danger' | 'custom' — Visual intent (default: 'neutral').
- tone: 'soft' | 'solid' | 'outline' — Style tone (default: 'soft').
- size: 'sm' | 'md' | 'lg' — Size of the badge (default: 'md').
- leftIcon/rightIcon: ReactNode — Optional icons placed at the sides.
- className: string — Extra classes (use with variant="custom").

Notes
- Using variant="custom" disables built-in styles; provide your own classes via className.
- Icons are vertically centered and padded for visual balance.
                `,
            },
        },
    },
    tags: ['autodocs'],
    argTypes: {
        children: { control: 'text', description: 'Label text' },
        variant: {
            control: { type: 'inline-radio' },
            options: ['neutral', 'success', 'warning', 'danger', 'custom'],
            description: 'Visual variant',
        },
        tone: {
            control: { type: 'inline-radio' },
            options: ['soft', 'solid', 'outline'],
            description: 'Style tone',
        },
        size: {
            control: { type: 'inline-radio' },
            options: ['sm', 'md', 'lg'],
            description: 'Badge size',
        },
        className: { control: 'text', description: 'Extra classes (for custom variant)' },
        withLeftIcon: { control: 'boolean', description: 'Show a left icon (Check)' },
        withRightIcon: { control: 'boolean', description: 'Show a right icon (X)' },
    },
} satisfies Meta<StoryArgs>;

export default meta;

type Story = StoryObj<StoryArgs>;

export const Playground: Story = {
    args: {
        children: 'New',
        variant: 'neutral',
        tone: 'soft',
        size: 'md',
        className: '',
        withLeftIcon: false,
        withRightIcon: false,
    },
    parameters: { docs: { description: { story: 'Interactive control center.' } } },
    render: (args) => {
        const { children, withLeftIcon, withRightIcon, ...rest } = args;
        return (
            <div style={{ display: 'grid', gap: 16, placeItems: 'center' }}>
                <Badge
                    {...rest}
                    leftIcon={withLeftIcon ? <Check size={12} /> : undefined}
                    rightIcon={withRightIcon ? <X size={12} /> : undefined}
                >
                    {children}
                </Badge>
            </div>
        );
    },
};

export const Variants: Story = {
    args: { children: 'Label', size: 'md', tone: 'soft', variant: 'neutral' },
    parameters: {
        docs: { description: { story: 'Available variants under soft tone.' } },
    },
    render: (args) => (
        <div style={{ display: 'flex', gap: 12, alignItems: 'center', flexWrap: 'wrap' }}>
            <Badge {...args} variant="neutral">Neutral</Badge>
            <Badge {...args} variant="success">Success</Badge>
            <Badge {...args} variant="warning">Warning</Badge>
            <Badge {...args} variant="danger">Danger</Badge>
        </div>
    ),
};

export const Tones: Story = {
    args: { children: 'Status', variant: 'success', size: 'md', tone: 'soft' },
    parameters: {
        docs: { description: { story: 'Soft, solid and outline tones.' } },
    },
    render: (args) => (
        <div style={{ display: 'flex', gap: 12, alignItems: 'center', flexWrap: 'wrap' }}>
            <Badge {...args} tone="soft">Soft</Badge>
            <Badge {...args} tone="solid">Solid</Badge>
            <Badge {...args} tone="outline">Outline</Badge>
        </div>
    ),
};

export const Sizes: Story = {
    args: { children: 'Size', variant: 'neutral', tone: 'soft', size: 'md' },
    parameters: {
        docs: { description: { story: 'Badge sizes: sm, md, lg.' } },
    },
    render: (args) => (
        <div style={{ display: 'flex', gap: 12, alignItems: 'center' }}>
            <Badge {...args} size="sm">SM</Badge>
            <Badge {...args} size="md">MD</Badge>
            <Badge {...args} size="lg">LG</Badge>
        </div>
    ),
};

export const WithIcons: Story = {
    args: { children: 'With Icons', variant: 'success', tone: 'solid', size: 'md' },
    parameters: {
        docs: { description: { story: 'Left and right icon examples.' } },
    },
    render: (args) => (
        <div style={{ display: 'flex', gap: 12, alignItems: 'center', flexWrap: 'wrap' }}>
            <Badge {...args} leftIcon={<Check size={12} />}>Done</Badge>
            <Badge {...args} variant="danger" tone="soft" rightIcon={<X size={12} />}>Error</Badge>
        </div>
    ),
};

export const Custom: Story = {
    args: {
        children: 'Custom',
        variant: 'custom',
        tone: 'soft',
        size: 'md',
        className: 'bg-primary text-primary-foreground border border-transparent',
    },
    parameters: {
        docs: {
            description: {
                story:
                    'When using variant="custom", built-in styles are disabled. Provide your own classes.',
            },
        },
    },
};
