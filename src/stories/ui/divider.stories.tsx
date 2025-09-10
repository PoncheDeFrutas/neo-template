import { Divider } from '@shared/ui';
import type { Meta, StoryObj } from '@storybook/react-vite';

type Orientation = 'horizontal' | 'vertical';
type Variant = 'subtle' | 'default' | 'strong' | 'custom';
type Thickness = 'sm' | 'md' | 'lg';
type Align = 'start' | 'center' | 'end';

type StoryArgs = {
    orientation: Orientation;
    dashed?: boolean;
    variant: Variant;
    thickness: Thickness;
    label?: string;
    align: Align;
    className?: string;
};

const meta = {
    title: 'Shared/Divider',
    component: Divider,
    parameters: {
        layout: 'padded',
        docs: {
            description: {
                component: `
Dividers separate content and group lists. This component supports horizontal and vertical orientations, optional label (horizontal only), variants, thickness and dashed style.

Usage
\`\`\`tsx
import { Divider } from '@shared/ui';

// Horizontal (default)
<Divider />
<Divider label="Settings" />
<Divider variant="strong" thickness="md" />
<Divider dashed />

// Vertical (use inside a flex row)
<div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
  <span>Item A</span>
  <Divider orientation="vertical" />
  <span>Item B</span>
</div>

// Custom styling (variant="custom")
<Divider variant="custom" className="border-primary" />
\`\`\`

Props
- orientation: 'horizontal' | 'vertical' — Orientation (default: 'horizontal').
- dashed: boolean — Dashed line style.
- variant: 'subtle' | 'default' | 'strong' | 'custom' — Color strength (default: 'subtle').
- thickness: 'sm' | 'md' | 'lg' — Line thickness (default: 'sm').
- label: ReactNode — Centered text (horizontal only).
- align: 'start' | 'center' | 'end' — Label alignment between the lines (horizontal only).
- className: string — Extra classes (use with variant="custom").

Notes
- When \`orientation="vertical"\`, place the divider between items in a horizontal flex layout.
- Label is only rendered for horizontal dividers.
- When using \`variant="custom"\`, provide your own color classes, e.g., \`border-primary\`.
                `,
            },
        },
    },
    tags: ['autodocs'],
    argTypes: {
        orientation: {
            control: { type: 'inline-radio' },
            options: ['horizontal', 'vertical'],
            description: 'Orientation',
        },
        dashed: { control: 'boolean', description: 'Dashed style' },
        variant: {
            control: { type: 'inline-radio' },
            options: ['subtle', 'default', 'strong', 'custom'],
            description: 'Color strength',
        },
        thickness: {
            control: { type: 'inline-radio' },
            options: ['sm', 'md', 'lg'],
            description: 'Line thickness',
        },
        label: { control: 'text', description: 'Label (horizontal only)' },
        align: {
            control: { type: 'inline-radio' },
            options: ['start', 'center', 'end'],
            description: 'Label alignment (horizontal only)',
        },
        className: { control: 'text', description: 'Extra classes (for custom variant)' },
    },
} satisfies Meta<StoryArgs>;

export default meta;

type Story = StoryObj<StoryArgs>;

export const Playground: Story = {
    args: {
        orientation: 'horizontal',
        dashed: false,
        variant: 'subtle',
        thickness: 'sm',
        label: 'Section',
        align: 'center',
        className: '',
    },
    parameters: { docs: { description: { story: 'Interactive control center.' } } },
    render: (args) => {
        if (args.orientation === 'vertical') {
            return (
                <div style={{ display: 'flex', alignItems: 'center', gap: 12, height: 24 }}>
                    <span>Item A</span>
                    <Divider {...args} />
                    <span>Item B</span>
                </div>
            );
        }
        return <Divider {...args} />;
    },
};

export const Variants: Story = {
    args: { orientation: 'horizontal', thickness: 'sm', dashed: false, align: 'center' },
    parameters: { docs: { description: { story: 'Subtle, default, strong and custom.' } } },
    render: (args) => (
        <div style={{ display: 'grid', gap: 16 }}>
            <Divider {...args} label="Subtle" variant="subtle" />
            <Divider {...args} label="Default" variant="default" />
            <Divider {...args} label="Strong" variant="strong" />
            <Divider {...args} label="Custom" variant="custom" className="border-primary" />
        </div>
    ),
};

export const Thickness: Story = {
    args: { orientation: 'horizontal', variant: 'default', dashed: false, align: 'center' },
    parameters: { docs: { description: { story: 'sm, md, lg thickness.' } } },
    render: (args) => (
        <div style={{ display: 'grid', gap: 16 }}>
            <Divider {...args} label="Thin" thickness="sm" />
            <Divider {...args} label="Medium" thickness="md" />
            <Divider {...args} label="Thick" thickness="lg" />
        </div>
    ),
};

export const LabeledAlignment: Story = {
    args: { orientation: 'horizontal', variant: 'subtle', thickness: 'sm', dashed: false },
    parameters: { docs: { description: { story: 'Label align: start, center, end.' } } },
    render: (args) => (
        <div style={{ display: 'grid', gap: 16 }}>
            <Divider {...args} label="Start" align="start" />
            <Divider {...args} label="Center" align="center" />
            <Divider {...args} label="End" align="end" />
        </div>
    ),
};

export const DashedAndSolid: Story = {
    args: { orientation: 'horizontal', variant: 'default', thickness: 'sm' },
    parameters: { docs: { description: { story: 'Solid vs dashed.' } } },
    render: (args) => (
        <div style={{ display: 'grid', gap: 16 }}>
            <Divider {...args} label="Solid" dashed={false} />
            <Divider {...args} label="Dashed" dashed />
        </div>
    ),
};

export const Vertical: Story = {
    args: { orientation: 'vertical', variant: 'subtle', thickness: 'sm', dashed: false },
    parameters: {
        docs: { description: { story: 'Place between items in a horizontal flex row.' } },
    },
    render: (args) => (
        <div style={{ display: 'flex', alignItems: 'center', gap: 12, height: 24 }}>
            <span>Filters</span>
            <Divider {...args} />
            <span>Sort</span>
            <Divider {...args} dashed />
            <span>View</span>
        </div>
    ),
};
