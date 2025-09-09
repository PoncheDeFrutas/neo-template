import { Button, Popover } from '@shared/ui';
import type { Meta, StoryObj } from '@storybook/react-vite';
import { MoreHorizontal, Settings, LogOut, User } from 'lucide-react';
import { useState } from 'react';

type Side = 'top' | 'right' | 'bottom' | 'left';
type Align = 'start' | 'center' | 'end';

type StoryArgs = {
    side: Side;
    align: Align;
    sideOffset: number;
    alignOffset: number;
    closeOnOutsideClick: boolean;
    disabled: boolean;
    panelClassName?: string;
    label: string;
    withActions: boolean;
};

const meta = {
    title: 'Shared/Popover',
    component: Popover,
    parameters: {
        layout: 'centered',
        docs: {
            description: {
                component: `
Popover displays contextual content positioned relative to a trigger. It supports four sides and three alignments with configurable offsets.

Usage
\`\`\`tsx
import { Popover, Button } from '@shared/ui';

<Popover
  side="bottom"
  align="center"
  panel={
    <div style={{ display: 'grid', gap: 8 }}>
      <Button size="sm" variant="ghost">Profile</Button>
      <Button size="sm" variant="ghost">Settings</Button>
    </div>
  }
>
  <Button variant="outline">Open</Button>
</Popover>
\`\`\`

Props
- panel: ReactNode | () => ReactNode — Content rendered in the floating panel.
- side: 'top' | 'right' | 'bottom' | 'left' — Panel side relative to the trigger (default: 'bottom').
- align: 'start' | 'center' | 'end' — Alignment on the chosen side (default: 'center').
- sideOffset?: number — Gap between trigger and panel (default: 8).
- alignOffset?: number — Shift along the alignment axis (default: 0).
- open?: boolean, defaultOpen?: boolean, onOpenChange?: (open: boolean) => void — Controlled/uncontrolled state.
- closeOnOutsideClick?: boolean — Close when clicking outside (default: true).
- disabled?: boolean — Disable opening the popover.
- panelClassName?: string — Additional classes for the panel.

Notes
- Uncontrolled: clicking the trigger toggles the popover. Use \`open\` and \`onOpenChange\` for controlled scenarios.
- The panel is portalled and positioned using fixed coordinates; it updates on scroll/resize.
                `,
            },
        },
    },
    tags: ['autodocs'],
    argTypes: {
        side: { control: { type: 'inline-radio' }, options: ['top', 'right', 'bottom', 'left'], description: 'Panel side' },
        align: { control: { type: 'inline-radio' }, options: ['start', 'center', 'end'], description: 'Panel alignment' },
        sideOffset: { control: { type: 'number', min: 0, max: 30, step: 1 }, description: 'Gap between trigger and panel' },
        alignOffset: { control: { type: 'number', min: -40, max: 40, step: 1 }, description: 'Shift along alignment axis' },
        closeOnOutsideClick: { control: 'boolean', description: 'Close when clicking outside' },
        disabled: { control: 'boolean', description: 'Disable opening' },
        panelClassName: { control: 'text', description: 'Panel classes' },
        label: { control: 'text', description: 'Trigger label' },
        withActions: { control: 'boolean', description: 'Show example action buttons in panel' },
    },
} satisfies Meta<any>;

export default meta;

type Story = StoryObj<StoryArgs>;

function PanelContent({ withActions }: { withActions: boolean }) {
    if (!withActions) return <div className="text-sm text-muted-foreground">Basic content</div>;
    return (
        <div className="grid gap-1">
            <Button size="sm" variant="ghost" leftIcon={<User size={14} />}>Profile</Button>
            <Button size="sm" variant="ghost" leftIcon={<Settings size={14} />}>Settings</Button>
            <Button size="sm" variant="destructive" leftIcon={<LogOut size={14} />}>Sign out</Button>
        </div>
    );
}

export const Playground: Story = {
    args: {
        side: 'bottom',
        align: 'center',
        sideOffset: 8,
        alignOffset: 0,
        closeOnOutsideClick: true,
        disabled: false,
        panelClassName: '',
        label: 'Open popover',
        withActions: true,
    },
    parameters: { docs: { description: { story: 'Interactive control center. Click the trigger to toggle.' } } },
    render: (args) => (
        <Popover
            side={args.side}
            align={args.align}
            sideOffset={args.sideOffset}
            alignOffset={args.alignOffset}
            closeOnOutsideClick={args.closeOnOutsideClick}
            disabled={args.disabled}
            panel={<PanelContent withActions={args.withActions} />}
            panelClassName={args.panelClassName}
        >
            <Button variant="outline" leftIcon={<MoreHorizontal size={16} />}>{args.label}</Button>
        </Popover>
    ),
};

export const Sides: Story = {
    args: { align: 'center', sideOffset: 8, alignOffset: 0, closeOnOutsideClick: true, disabled: false, withActions: false },
    parameters: { docs: { description: { story: 'Position on each side of the trigger.' } } },
    render: (args) => (
        <div className="grid gap-4 grid-cols-2">
            {(['top', 'right', 'bottom', 'left'] as Side[]).map((s) => (
                <div key={s} className="flex items-center justify-center p-6 border border-border-subtle rounded-md">
                    <Popover side={s} align={args.align} sideOffset={args.sideOffset} alignOffset={args.alignOffset} panel={<PanelContent withActions={false} />}>
                        <Button variant="outline">{s}</Button>
                    </Popover>
                </div>
            ))}
        </div>
    ),
};

export const Alignments: Story = {
    args: { side: 'bottom', sideOffset: 8, alignOffset: 0, closeOnOutsideClick: true, disabled: false },
    parameters: { docs: { description: { story: 'start, center, end alignments.' } } },
    render: (args) => (
        <div className="grid gap-4 grid-cols-3">
            {(['start', 'center', 'end'] as Align[]).map((a) => (
                <div key={a} className="flex items-center justify-center p-6 border border-border-subtle rounded-md">
                    <Popover side={args.side} align={a} sideOffset={args.sideOffset} alignOffset={args.alignOffset} panel={<PanelContent withActions={false} />}>
                        <Button variant="outline">{a}</Button>
                    </Popover>
                </div>
            ))}
        </div>
    ),
};

export const Offsets: Story = {
    args: { side: 'bottom', align: 'center', closeOnOutsideClick: true, disabled: false },
    parameters: { docs: { description: { story: 'Adjust side and align offsets.' } } },
    render: (args) => (
        <div className="grid gap-4 grid-cols-2">
            <Popover side={args.side} align={args.align} sideOffset={0} alignOffset={0} panel={<PanelContent withActions={false} />}>
                <Button variant="outline">Offset 0</Button>
            </Popover>
            <Popover side={args.side} align={args.align} sideOffset={16} alignOffset={12} panel={<PanelContent withActions={false} />}>
                <Button variant="outline">Offset 16/12</Button>
            </Popover>
        </div>
    ),
};

export const Controlled: Story = {
    args: { side: 'bottom', align: 'center', sideOffset: 8, alignOffset: 0, closeOnOutsideClick: true, disabled: false },
    parameters: { docs: { description: { story: 'Controlled open state via open/onOpenChange.' } } },
    render: (args) => {
        const [open, setOpen] = useState(false);
        return (
            <div className="grid gap-3">
                <div className="flex gap-2">
                    <Button onClick={() => setOpen(true)}>Open</Button>
                    <Button variant="outline" onClick={() => setOpen(false)}>
                        Close
                    </Button>
                    <span className="text-xs text-muted-foreground">Open: {String(open)}</span>
                </div>
                <Popover
                    side={args.side}
                    align={args.align}
                    sideOffset={args.sideOffset}
                    alignOffset={args.alignOffset}
                    closeOnOutsideClick={args.closeOnOutsideClick}
                    disabled={args.disabled}
                    open={open}
                    onOpenChange={setOpen}
                    panel={<PanelContent withActions={true} />}
                >
                    <Button variant="outline">Toggle</Button>
                </Popover>
            </div>
        );
    },
};

export const Disabled: Story = {
    args: { side: 'bottom', align: 'center', sideOffset: 8, alignOffset: 0, closeOnOutsideClick: true, disabled: true },
    parameters: { docs: { description: { story: 'Disabled trigger does not open the popover.' } } },
    render: (args) => (
        <Popover side={args.side} align={args.align} sideOffset={args.sideOffset} alignOffset={args.alignOffset} disabled panel={<PanelContent withActions={false} />}>
            <Button variant="outline">Disabled</Button>
        </Popover>
    ),
};

