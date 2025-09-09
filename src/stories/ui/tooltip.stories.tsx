import { Button, Tooltip } from '@shared/ui';
import type { Meta, StoryObj } from '@storybook/react-vite';

type Side = 'top' | 'right' | 'bottom' | 'left';

type StoryArgs = {
    content: string;
    side: Side;
    delay: number;
    disabled: boolean;
    className?: string;
    label: string;
};

const meta = {
    title: 'Shared/Tooltip',
    component: Tooltip,
    parameters: {
        layout: 'centered',
        docs: {
            description: {
                component: `
Tooltips display additional context when hovering or focusing on an element. They appear after a short delay and disappear on blur or pointer down.

Usage
\`\`\`tsx
import { Tooltip, Button } from '@shared/ui';

<Tooltip content="More info" side="top">
  <Button variant="outline">Hover me</Button>
</Tooltip>
\`\`\`

Props
- content: ReactNode — Tooltip text or content.
- side: 'top' | 'right' | 'bottom' | 'left' — Placement relative to trigger (default: 'top').
- delay?: number — Show delay in ms (default: 200).
- disabled?: boolean — Disable showing the tooltip.
- className?: string — Tooltip panel classes.

Notes
- Accessible: Uses \`role="tooltip"\` and links with the trigger via \`aria-describedby\`.
- Repositions on window scroll and resize.
                `,
            },
        },
    },
    tags: ['autodocs'],
    argTypes: {
        content: { control: 'text', description: 'Tooltip content' },
        side: { control: { type: 'inline-radio' }, options: ['top', 'right', 'bottom', 'left'], description: 'Placement side' },
        delay: { control: { type: 'number', min: 0, max: 2000, step: 50 }, description: 'Show delay (ms)' },
        disabled: { control: 'boolean', description: 'Disable tooltip' },
        className: { control: 'text', description: 'Panel classes' },
        label: { control: 'text', description: 'Trigger label' },
    },
} satisfies Meta<any>;

export default meta;

type Story = StoryObj<StoryArgs>;

export const Playground: Story = {
    args: {
        content: 'Additional information',
        side: 'top',
        delay: 200,
        disabled: false,
        className: '',
        label: 'Hover or focus me',
    },
    parameters: { docs: { description: { story: 'Interactive control center.' } } },
    render: (args) => (
        <Tooltip content={args.content} side={args.side} delay={args.delay} disabled={args.disabled} className={args.className}>
            <Button variant="outline">{args.label}</Button>
        </Tooltip>
    ),
};

export const Sides: Story = {
    args: { content: 'Tooltip', delay: 200, disabled: false },
    parameters: { docs: { description: { story: 'Placement on each side.' } } },
    render: (args) => (
        <div className="grid grid-cols-2 gap-6">
            {(['top', 'right', 'bottom', 'left'] as Side[]).map((side) => (
                <div key={side} className="flex items-center justify-center p-6 border border-border-subtle rounded-md">
                    <Tooltip content={`${args.content} (${side})`} side={side} delay={args.delay}>
                        <Button variant="outline">{side}</Button>
                    </Tooltip>
                </div>
            ))}
        </div>
    ),
};

export const Delay: Story = {
    args: { content: 'Opens after 600ms', side: 'top', delay: 600, disabled: false },
    parameters: { docs: { description: { story: 'Show delay customization.' } } },
};

export const Disabled: Story = {
    args: { content: 'This will not show', side: 'top', delay: 200, disabled: true },
    parameters: { docs: { description: { story: 'Disabled tooltip does not render on hover/focus.' } } },
};

export const CustomStyle: Story = {
    args: { content: 'Custom styles', side: 'bottom', delay: 200, disabled: false, className: 'rounded-lg px-3 py-1.5 text-xs', label: 'Hover' },
    parameters: { docs: { description: { story: 'Override panel styles via className.' } } },
    render: (args) => (
        <Tooltip content={args.content} side={args.side} delay={args.delay} className="rounded-lg px-3 py-1.5 text-xs">
            <Button variant="outline">{args.label}</Button>
        </Tooltip>
    ),
};

