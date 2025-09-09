import { TooltipLabel } from '@shared/ui';
import type { Meta, StoryObj } from '@storybook/react-vite';
import { Info, HelpCircle } from 'lucide-react';

type Size = 'sm' | 'md' | 'lg';
type Variant = 'neutral' | 'success' | 'warning' | 'danger' | 'custom';
type Tone = 'soft' | 'solid' | 'outline';

type StoryArgs = {
    text: string;
    tooltip: string;
    withIcon: boolean;
    iconType: 'info' | 'help';
    size: Size;
    variant: Variant;
    tone: Tone;
    badgeClassName?: string;
    tooltipClassName?: string;
    className?: string;
};

const meta = {
    title: 'Shared/TooltipLabel',
    component: TooltipLabel,
    parameters: {
        layout: 'centered',
        docs: {
            description: {
                component: `
TooltipLabel combines a Badge with a Tooltip to show concise labels that reveal extra context on hover/focus.

Usage
\`\`\`tsx
import { TooltipLabel } from '@shared/ui';
import { Info } from 'lucide-react';

<TooltipLabel text="Info" tooltip="More details" icon={<Info size={12} />} />
\`\`\`

Props
- text: ReactNode — Visible label content.
- tooltip: ReactNode — Tooltip content shown on hover/focus.
- icon?: ReactNode — Optional leading icon inside the badge.
- size?: 'sm' | 'md' | 'lg' — Badge size (default: 'sm').
- variant?: 'neutral' | 'success' | 'warning' | 'danger' | 'custom' — Badge variant (default: 'neutral').
- tone?: 'soft' | 'solid' | 'outline' — Badge tone (default: 'soft').
- badgeClassName?: string — Extra classes for the badge.
- tooltipClassName?: string — Extra classes for the tooltip panel.
- className?: string — Wrapper classes.

Notes
- The badge acts as the tooltip trigger; cursor shows as help.
- Customize both badge and tooltip styles via their respective className props.
                `,
            },
        },
    },
    tags: ['autodocs'],
    argTypes: {
        text: { control: 'text', description: 'Label text' },
        tooltip: { control: 'text', description: 'Tooltip content' },
        withIcon: { control: 'boolean', description: 'Show example leading icon' },
        iconType: { control: { type: 'inline-radio' }, options: ['info', 'help'], description: 'Icon type' },
        size: { control: { type: 'inline-radio' }, options: ['sm', 'md', 'lg'], description: 'Badge size' },
        variant: { control: { type: 'inline-radio' }, options: ['neutral', 'success', 'warning', 'danger', 'custom'], description: 'Badge variant' },
        tone: { control: { type: 'inline-radio' }, options: ['soft', 'solid', 'outline'], description: 'Badge tone' },
        badgeClassName: { control: 'text', description: 'Badge classes (for custom variant)' },
        tooltipClassName: { control: 'text', description: 'Tooltip panel classes' },
        className: { control: 'text', description: 'Wrapper classes' },
    },
} satisfies Meta<any>;

export default meta;

type Story = StoryObj<StoryArgs>;

const pickIcon = (type: 'info' | 'help') => (type === 'info' ? <Info size={12} /> : <HelpCircle size={12} />);

export const Playground: Story = {
    args: {
        text: 'Info',
        tooltip: 'More information about this label.',
        withIcon: true,
        iconType: 'info',
        size: 'sm',
        variant: 'neutral',
        tone: 'soft',
        badgeClassName: '',
        tooltipClassName: '',
        className: '',
    },
    parameters: { docs: { description: { story: 'Interactive control center.' } } },
    render: (args) => (
        <TooltipLabel
            text={args.text}
            tooltip={args.tooltip}
            icon={args.withIcon ? pickIcon(args.iconType) : undefined}
            size={args.size}
            variant={args.variant}
            tone={args.tone}
            badgeClassName={args.badgeClassName}
            tooltipClassName={args.tooltipClassName}
            className={args.className}
        />
    ),
};

export const Sizes: Story = {
    args: { text: 'Label', tooltip: 'Tooltip', withIcon: true, iconType: 'info' },
    parameters: { docs: { description: { story: 'sm, md, lg badge sizes.' } } },
    render: (args) => (
        <div className="flex items-center gap-3">
            <TooltipLabel text={args.text} tooltip={args.tooltip} icon={pickIcon(args.iconType)} size="sm" />
            <TooltipLabel text={args.text} tooltip={args.tooltip} icon={pickIcon(args.iconType)} size="md" />
            <TooltipLabel text={args.text} tooltip={args.tooltip} icon={pickIcon(args.iconType)} size="lg" />
        </div>
    ),
};

export const VariantsAndTones: Story = {
    args: { text: 'Status', tooltip: 'Details' },
    parameters: { docs: { description: { story: 'Common variant + tone combinations.' } } },
    render: (args) => (
        <div className="grid gap-2">
            <div className="flex items-center gap-2">
                <TooltipLabel {...(args as any)} variant="neutral" tone="soft" />
                <TooltipLabel {...(args as any)} variant="neutral" tone="solid" />
                <TooltipLabel {...(args as any)} variant="neutral" tone="outline" />
            </div>
            <div className="flex items-center gap-2">
                <TooltipLabel {...(args as any)} variant="success" tone="soft" />
                <TooltipLabel {...(args as any)} variant="success" tone="solid" />
                <TooltipLabel {...(args as any)} variant="success" tone="outline" />
            </div>
            <div className="flex items-center gap-2">
                <TooltipLabel {...(args as any)} variant="warning" tone="soft" />
                <TooltipLabel {...(args as any)} variant="warning" tone="solid" />
                <TooltipLabel {...(args as any)} variant="warning" tone="outline" />
            </div>
            <div className="flex items-center gap-2">
                <TooltipLabel {...(args as any)} variant="danger" tone="soft" />
                <TooltipLabel {...(args as any)} variant="danger" tone="solid" />
                <TooltipLabel {...(args as any)} variant="danger" tone="outline" />
            </div>
        </div>
    ),
};

export const Custom: Story = {
    args: {
        text: 'Custom',
        tooltip: 'Custom styled tooltip',
        withIcon: false,
        size: 'md',
        variant: 'custom',
        tone: 'soft',
        badgeClassName: 'bg-primary text-primary-foreground',
        tooltipClassName: 'rounded-lg px-3 py-1.5 text-xs',
    },
    parameters: { docs: { description: { story: 'Using variant="custom" and styled tooltip panel.' } } },
};

