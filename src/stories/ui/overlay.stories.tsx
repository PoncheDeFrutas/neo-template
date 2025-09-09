import { Button, Overlay } from '@shared/ui';
import type { Meta, StoryObj } from '@storybook/react-vite';
import { useState } from 'react';

type StoryArgs = {
    blur: boolean;
    visible: boolean;
    className?: string;
};

const meta = {
    title: 'Shared/Overlay',
    component: Overlay,
    parameters: {
        layout: 'padded',
        docs: {
            description: {
                component: `
Overlay renders a full-screen backdrop layer. It is used by components like Modal and Drawer to dim or blur the background.

Usage
\`\`\`tsx
import { Overlay } from '@shared/ui';

// Simple overlay
<Overlay open blur onClick={() => console.log('clicked')} />

// Fading transitions
// Pass \`visible\` to control enter/exit opacity when keeping the element mounted
<Overlay open visible={true} />
\`\`\`

Props
- open: boolean — Mounts/unmounts the overlay.
- blur: boolean — Applies a subtle backdrop blur (default: false).
- onClick?: () => void — Click handler (useful to close a dialog/drawer).
- visible?: boolean — Controls fade in/out when staying mounted (used by Drawer).
- className?: string — Extra classes.

Notes
- When building your own dialog/drawer, set \`open=true\` to mount and handle closing in \`onClick\` or via ESC.
- The overlay is rendered in a Portal and covers the viewport (\`fixed inset-0\`).
                `,
            },
        },
    },
    tags: ['autodocs'],
    argTypes: {
        blur: { control: 'boolean', description: 'Apply backdrop blur' },
        visible: { control: 'boolean', description: 'Fade opacity (when open)' },
        className: { control: 'text', description: 'Extra classes' },
    },
} satisfies Meta<any>;

export default meta;

type Story = StoryObj<StoryArgs>;

function DemoSurface() {
    return (
        <div
            style={{
                height: 180,
                border: '1px solid var(--color-border-subtle)',
                borderRadius: 8,
                background: 'var(--color-bg-elevated)',
                display: 'grid',
                placeItems: 'center',
                color: 'var(--color-muted-foreground)',
            }}
        >
            Page content
        </div>
    );
}

export const Playground: Story = {
    args: { blur: true, visible: true, className: '' },
    parameters: { docs: { description: { story: 'Interactive control center.' } } },
    render: (args) => {
        const [open, setOpen] = useState(false);
        return (
            <div style={{ display: 'grid', gap: 12 }}>
                <DemoSurface />
                <Button onClick={() => setOpen(true)}>Show overlay</Button>
                <Overlay
                    open={open}
                    blur={args.blur}
                    visible={args.visible}
                    className={args.className}
                    onClick={() => setOpen(false)}
                />
            </div>
        );
    },
};

export const BlurVsSolid: Story = {
    args: { visible: true },
    parameters: { docs: { description: { story: 'Compare blurred vs solid overlay.' } } },
    render: (args) => {
        const [openA, setOpenA] = useState(false);
        const [openB, setOpenB] = useState(false);
        return (
            <div style={{ display: 'grid', gap: 12 }}>
                <DemoSurface />
                <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
                    <Button onClick={() => setOpenA(true)}>Open blurred</Button>
                    <Button variant="outline" onClick={() => setOpenB(true)}>
                        Open solid
                    </Button>
                </div>
                <Overlay open={openA} blur visible={args.visible} onClick={() => setOpenA(false)} />
                <Overlay open={openB} blur={false} visible={args.visible} onClick={() => setOpenB(false)} />
            </div>
        );
    },
};

export const CustomStyles: Story = {
    args: { blur: false, visible: true, className: 'bg-black/80' },
    parameters: { docs: { description: { story: 'Override background via className.' } } },
    render: (args) => {
        const [open, setOpen] = useState(false);
        return (
            <div style={{ display: 'grid', gap: 12 }}>
                <DemoSurface />
                <Button onClick={() => setOpen(true)}>Open custom</Button>
                <Overlay
                    open={open}
                    blur={args.blur}
                    visible={args.visible}
                    className={args.className}
                    onClick={() => setOpen(false)}
                />
            </div>
        );
    },
};

