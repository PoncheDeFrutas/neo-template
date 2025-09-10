import { Progress, CircularProgress } from '@shared/ui';
import type { Meta, StoryObj } from '@storybook/react-vite';

type Height = 'xs' | 'sm' | 'md';
type Rounded = 'sm' | 'md' | 'lg' | 'full';

type LinearArgs = {
    value?: number;
    indeterminate?: boolean;
    rounded: Rounded;
    height: Height;
    className?: string;
    trackClassName?: string;
    barClassName?: string;
};

type CircularArgs = {
    value: number;
    size: number;
    stroke: number;
    showLabel: boolean;
    className?: string;
    trackClassName?: string;
    arcClassName?: string;
    labelClassName?: string;
};

const meta = {
    title: 'Shared/Progress',
    component: Progress,
    parameters: {
        layout: 'padded',
        docs: {
            description: {
                component: `
Progress indicators communicate ongoing processes and their completion percentage. Includes linear and circular variants.

Usage (Linear)
\`\`\`tsx
import { Progress } from '@shared/ui';

// Determinate
<Progress value={42} />

// Indeterminate
<Progress indeterminate />
\`\`\`

Usage (Circular)
\`\`\`tsx
import { CircularProgress } from '@shared/ui';

<CircularProgress value={65} size={48} stroke={4} showLabel />
\`\`\`

Props (Linear)
- value?: number — 0..100 determinate value.
- indeterminate?: boolean — Animated stripe when progress is unknown.
- rounded?: 'sm' | 'md' | 'lg' | 'full' — Corner radius (default: 'full').
- height?: 'xs' | 'sm' | 'md' — Bar height (default: 'sm').
- trackClassName/barClassName/className?: string — Style overrides.

Props (Circular)
- value: number — 0..100 value.
- size?: number — Diameter in px (default: 48).
- stroke?: number — Stroke width in px (default: 4).
- showLabel?: boolean — Show percentage label overlay.
- trackClassName/arcClassName/labelClassName/className?: string — Style overrides.

Notes
- Linear indeterminate mode ignores \`value\` and animates continuously.
- Circular variant uses an SVG arc; the label is absolutely centered.
                `,
            },
        },
    },
    tags: ['autodocs'],
    argTypes: {
        // Linear controls
        value: {
            control: { type: 'number', min: 0, max: 100, step: 1 },
            description: 'Determinate value (0..100)',
        },
        indeterminate: { control: 'boolean', description: 'Indeterminate animation' },
        rounded: {
            control: { type: 'inline-radio' },
            options: ['sm', 'md', 'lg', 'full'],
            description: 'Corner radius',
        },
        height: {
            control: { type: 'inline-radio' },
            options: ['xs', 'sm', 'md'],
            description: 'Bar height',
        },
        className: { control: 'text', description: 'Container classes' },
        trackClassName: { control: 'text', description: 'Track classes' },
        barClassName: { control: 'text', description: 'Bar classes' },
    },
} satisfies Meta<any>;

export default meta;

type Story = StoryObj<LinearArgs>;

export const LinearPlayground: Story = {
    args: {
        value: 40,
        indeterminate: false,
        rounded: 'full',
        height: 'sm',
        className: '',
        trackClassName: '',
        barClassName: '',
    },
    parameters: { docs: { description: { story: 'Interactive control center (linear).' } } },
    render: (args) => (
        <div style={{ display: 'grid', gap: 12, maxWidth: 520 }}>
            <Progress {...args} />
        </div>
    ),
};

export const LinearSizesAndRadius: Story = {
    parameters: { docs: { description: { story: 'Heights xs/sm/md and radius variants.' } } },
    render: () => (
        <div style={{ display: 'grid', gap: 12, maxWidth: 520 }}>
            <Progress value={30} height="xs" rounded="sm" />
            <Progress value={50} height="sm" rounded="md" />
            <Progress value={70} height="md" rounded="lg" />
            <Progress value={85} height="sm" rounded="full" />
        </div>
    ),
};

export const LinearIndeterminate: Story = {
    parameters: { docs: { description: { story: 'Indeterminate linear progress.' } } },
    render: () => <Progress indeterminate height="sm" />,
};

// Circular
type CStory = StoryObj<CircularArgs>;

export const CircularPlayground: CStory = {
    args: {
        value: 65,
        size: 64,
        stroke: 4,
        showLabel: true,
        className: '',
        trackClassName: '',
        arcClassName: '',
        labelClassName: '',
    },
    parameters: { docs: { description: { story: 'Interactive control center (circular).' } } },
    render: (args) => (
        <CircularProgress
            value={args.value}
            size={args.size}
            stroke={args.stroke}
            showLabel={args.showLabel}
            className={args.className}
            trackClassName={args.trackClassName}
            arcClassName={args.arcClassName}
            labelClassName={args.labelClassName}
        />
    ),
};

export const CircularSizes: CStory = {
    args: { value: 60 },
    parameters: { docs: { description: { story: 'Common sizes and strokes.' } } },
    render: (args) => (
        <div style={{ display: 'flex', gap: 16, alignItems: 'center' }}>
            <CircularProgress value={args.value} size={32} stroke={3} />
            <CircularProgress value={args.value} size={48} stroke={4} />
            <CircularProgress value={args.value} size={64} stroke={6} />
        </div>
    ),
};

export const CircularCustomStyles: CStory = {
    args: { value: 75 },
    parameters: { docs: { description: { story: 'Customize track/arc colors via classes.' } } },
    render: (args) => (
        <CircularProgress
            value={args.value}
            size={64}
            stroke={6}
            trackClassName="stroke-[var(--color-border)]"
            arcClassName="stroke-[var(--color-success)]"
            showLabel
            labelClassName="text-success"
        />
    ),
};
