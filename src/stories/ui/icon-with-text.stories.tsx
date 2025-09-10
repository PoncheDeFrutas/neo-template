import { IconWithText } from '@shared/ui';
import type { Meta, StoryObj } from '@storybook/react-vite';
import { Clock, MapPin, Info, Check } from 'lucide-react';

type Size = 'xs' | 'sm' | 'md';
type IconName = 'clock' | 'map-pin' | 'info' | 'check';

type StoryArgs = {
    text: string;
    size: Size;
    gap: number;
    muted: boolean;
    className?: string;
    iconClassName?: string;
    textClassName?: string;
    iconName: IconName;
    iconSize: number;
};

const meta = {
    title: 'Shared/IconWithText',
    component: IconWithText,
    parameters: {
        layout: 'centered',
        docs: {
            description: {
                component: `
IconWithText displays a small inline icon with a short piece of text. Useful for metadata chips like time, location, etc.

Usage
\`\`\`tsx
import { IconWithText } from '@shared/ui';
import { Clock, MapPin, Info } from 'lucide-react';

<IconWithText icon={<Clock size={14} />} text="25 min" />
<IconWithText icon={<MapPin size={14} />} text="1.2 km" muted={false} size="md" />
<IconWithText icon={<Info size={12} />} text="Details" size="xs" gap={4} />
\`\`\`

Props
- icon: ReactNode — The icon element (e.g., Lucide icon).
- text: ReactNode — The label next to the icon.
- size: 'xs' | 'sm' | 'md' — Text sizing (default: 'sm').
- gap: number — Gap in pixels between icon and text (default: 6).
- muted: boolean — Uses muted foreground color (default: true).
- iconClassName/textClassName/className: string — Style overrides.

Notes
- The text truncates to avoid layout shifts in tight spaces.
- Provide a size-appropriate icon (12–16px recommended depending on \`size\`).
                `,
            },
        },
    },
    tags: ['autodocs'],
    argTypes: {
        text: { control: 'text', description: 'Text content' },
        size: {
            control: { type: 'inline-radio' },
            options: ['xs', 'sm', 'md'],
            description: 'Text size',
        },
        gap: { control: { type: 'number', min: 0, max: 24, step: 1 }, description: 'Gap in px' },
        muted: { control: 'boolean', description: 'Muted text color' },
        className: { control: 'text', description: 'Wrapper classes' },
        iconClassName: { control: 'text', description: 'Icon wrapper classes' },
        textClassName: { control: 'text', description: 'Text classes' },
        iconName: {
            control: { type: 'select' },
            options: ['clock', 'map-pin', 'info', 'check'],
            description: 'Example icon to render',
        },
        iconSize: {
            control: { type: 'number', min: 10, max: 24, step: 1 },
            description: 'Icon pixel size',
        },
    },
} satisfies Meta<any>;

export default meta;

type Story = StoryObj<StoryArgs>;

function pickIcon(name: IconName, px: number) {
    switch (name) {
        case 'clock':
            return <Clock size={px} />;
        case 'map-pin':
            return <MapPin size={px} />;
        case 'info':
            return <Info size={px} />;
        case 'check':
            return <Check size={px} />;
        default:
            return <Clock size={px} />;
    }
}

export const Playground: Story = {
    args: {
        text: '25 min',
        size: 'sm',
        gap: 6,
        muted: true,
        className: '',
        iconClassName: '',
        textClassName: '',
        iconName: 'clock',
        iconSize: 14,
    },
    parameters: { docs: { description: { story: 'Interactive control center.' } } },
    render: (args) => (
        <IconWithText
            icon={pickIcon(args.iconName, args.iconSize)}
            text={args.text}
            size={args.size}
            gap={args.gap}
            muted={args.muted}
            className={args.className}
            iconClassName={args.iconClassName}
            textClassName={args.textClassName}
        />
    ),
};

export const Sizes: Story = {
    args: { text: 'Metadata', size: 'sm', gap: 6, muted: true, iconName: 'info', iconSize: 14 },
    parameters: { docs: { description: { story: 'xs, sm, md sizes.' } } },
    render: (args) => (
        <div style={{ display: 'grid', gap: 12 }}>
            <IconWithText icon={pickIcon(args.iconName, 12)} text="Extra small" size="xs" />
            <IconWithText icon={pickIcon(args.iconName, 14)} text="Small" size="sm" />
            <IconWithText icon={pickIcon(args.iconName, 16)} text="Medium" size="md" />
        </div>
    ),
};

export const MutedVsDefault: Story = {
    args: { text: '1.2 km', size: 'md', gap: 6, muted: true, iconName: 'map-pin', iconSize: 16 },
    parameters: { docs: { description: { story: 'Muted vs default text color.' } } },
    render: () => (
        <div style={{ display: 'grid', gap: 12 }}>
            <IconWithText icon={pickIcon('map-pin', 16)} text="Muted" size="md" muted />
            <IconWithText icon={pickIcon('map-pin', 16)} text="Default" size="md" muted={false} />
        </div>
    ),
};

export const CustomGap: Story = {
    args: { text: 'Custom gap', size: 'sm', gap: 6, muted: true, iconName: 'check', iconSize: 14 },
    parameters: { docs: { description: { story: 'Gap variations in pixels.' } } },
    render: () => (
        <div style={{ display: 'grid', gap: 12 }}>
            <IconWithText icon={<Check size={14} />} text="Gap 2" gap={2} />
            <IconWithText icon={<Check size={14} />} text="Gap 6" gap={6} />
            <IconWithText icon={<Check size={14} />} text="Gap 12" gap={12} />
        </div>
    ),
};

export const Truncation: Story = {
    args: {
        text: 'Very long metadata label that will be truncated',
        size: 'sm',
        gap: 6,
        muted: true,
        iconName: 'info',
        iconSize: 14,
    },
    parameters: { docs: { description: { story: 'Text truncates within narrow containers.' } } },
    render: (args) => (
        <div style={{ width: 160, border: '1px dashed var(--color-border-subtle)', padding: 8 }}>
            <IconWithText
                icon={pickIcon(args.iconName, args.iconSize)}
                text={args.text}
                size={args.size}
                gap={args.gap}
                muted={args.muted}
            />
        </div>
    ),
};

export const CustomStyling: Story = {
    args: { text: 'Success', size: 'sm', gap: 6, muted: false, iconName: 'check', iconSize: 14 },
    parameters: {
        docs: {
            description: { story: 'Override styles with className/iconClassName/textClassName.' },
        },
    },
    render: (args) => (
        <IconWithText
            icon={<Check size={14} />}
            text={args.text}
            size={args.size}
            gap={args.gap}
            muted={args.muted}
            className="bg-success/10 rounded-md px-2 py-1"
            iconClassName="text-success"
            textClassName="text-success"
        />
    ),
};
