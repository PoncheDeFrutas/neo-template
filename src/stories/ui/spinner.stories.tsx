import { Spinner } from '@shared/ui';
import type { Meta, StoryObj } from '@storybook/react-vite';

type StoryArgs = {
    value?: number;
    indeterminate: boolean;
    size: number;
    thickness: number;
    showTrack: boolean;
    showLabel: boolean;
    className?: string;
    trackClassName?: string;
    arcClassName?: string;
    labelClassName?: string;
    ariaLabel?: string;
};

const meta = {
    title: 'Shared/Spinner',
    component: Spinner,
    parameters: {
        layout: 'centered',
        docs: {
            description: {
                component: `
Spinner shows a circular loading indicator. It supports determinate (percentage) and indeterminate modes.

Usage
\`\`\`tsx
import { Spinner } from '@shared/ui';

// Indeterminate
<Spinner indeterminate size={40} />

// Determinate
<Spinner value={65} size={48} showLabel />
\`\`\`

Props
- value?: number — 0..100 (determinate mode).
- indeterminate?: boolean — Continuous animation when progress is unknown.
- size?: number — Diameter in px (default: 40).
- thickness?: number — Stroke width in px (default: 4).
- showTrack?: boolean — Show background circle.
- showLabel?: boolean — Inline percentage label (only in determinate mode).
- className/trackClassName/arcClassName/labelClassName?: string — Style overrides.
- ariaLabel?: string — Accessible label when no visible context.

Notes
- In indeterminate mode, aria-valuenow is omitted and only aria-label is used.
- For full-page loading, consider \`PageLoader\`.
                `,
            },
        },
    },
    tags: ['autodocs'],
    argTypes: {
        value: { control: { type: 'number', min: 0, max: 100, step: 1 }, description: 'Determinate value (0..100)' },
        indeterminate: { control: 'boolean', description: 'Indeterminate mode' },
        size: { control: { type: 'number', min: 16, max: 128, step: 2 }, description: 'Diameter (px)' },
        thickness: { control: { type: 'number', min: 2, max: 12, step: 1 }, description: 'Stroke width (px)' },
        showTrack: { control: 'boolean', description: 'Show background circle' },
        showLabel: { control: 'boolean', description: 'Show percentage label (determinate)' },
        className: { control: 'text', description: 'Wrapper classes' },
        trackClassName: { control: 'text', description: 'Track circle classes' },
        arcClassName: { control: 'text', description: 'Arc classes' },
        labelClassName: { control: 'text', description: 'Label classes' },
        ariaLabel: { control: 'text', description: 'Accessible label' },
    },
} satisfies Meta<any>;

export default meta;

type Story = StoryObj<StoryArgs>;

export const Playground: Story = {
    args: {
        value: 60,
        indeterminate: false,
        size: 48,
        thickness: 4,
        showTrack: true,
        showLabel: true,
        className: '',
        trackClassName: '',
        arcClassName: '',
        labelClassName: '',
        ariaLabel: 'Loading',
    },
    parameters: { docs: { description: { story: 'Interactive control center.' } } },
    render: (args) => (
        <Spinner
            value={args.indeterminate ? undefined : args.value}
            indeterminate={args.indeterminate}
            size={args.size}
            thickness={args.thickness}
            showTrack={args.showTrack}
            showLabel={args.showLabel}
            className={args.className}
            trackClassName={args.trackClassName}
            arcClassName={args.arcClassName}
            labelClassName={args.labelClassName}
            ariaLabel={args.ariaLabel}
        />
    ),
};

export const Indeterminate: Story = {
    args: { indeterminate: true, size: 40, thickness: 4, showTrack: true },
    parameters: { docs: { description: { story: 'Continuous animation with no value.' } } },
};

export const DeterminateExamples: Story = {
    parameters: { docs: { description: { story: 'Determinate values with labels.' } } },
    render: () => (
        <div style={{ display: 'flex', gap: 16, alignItems: 'center' }}>
            <Spinner value={25} size={40} showLabel ariaLabel="Loading 25%" />
            <Spinner value={50} size={48} showLabel ariaLabel="Loading 50%" />
            <Spinner value={75} size={56} showLabel ariaLabel="Loading 75%" />
        </div>
    ),
};

export const Sizes: Story = {
    args: { indeterminate: true },
    parameters: { docs: { description: { story: 'Common size presets.' } } },
    render: () => (
        <div style={{ display: 'flex', gap: 16, alignItems: 'center' }}>
            <Spinner indeterminate size={24} thickness={3} />
            <Spinner indeterminate size={40} thickness={4} />
            <Spinner indeterminate size={64} thickness={6} />
        </div>
    ),
};

export const CustomStyles: Story = {
    parameters: { docs: { description: { story: 'Customize colors via classes.' } } },
    render: () => (
        <div style={{ display: 'flex', gap: 16, alignItems: 'center' }}>
            <Spinner indeterminate size={40} trackClassName="stroke-[var(--color-border)]" arcClassName="stroke-[var(--color-success)]" />
            <Spinner value={80} size={48} showTrack={false} arcClassName="stroke-[var(--color-accent)]" showLabel labelClassName="text-accent" />
        </div>
    ),
};
