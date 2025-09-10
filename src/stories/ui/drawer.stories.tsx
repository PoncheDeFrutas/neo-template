import { Button, Drawer } from '@shared/ui';
import type { Meta, StoryObj } from '@storybook/react-vite';
import { useState } from 'react';

type Size = 'sm' | 'md' | 'lg';
type Side = 'right' | 'left' | 'top' | 'bottom';

type StoryArgs = {
    open?: boolean;
    onOpenChange?: (open: boolean) => void;
    side: Side;
    size: Size;
    title?: string;
    description?: string;
    withFooter?: boolean;
    blurOverlay?: boolean;
    closeOnOverlay?: boolean;
    className?: string;
    content?: string;
};

const meta = {
    title: 'Shared/Drawer',
    component: Drawer,
    parameters: {
        layout: 'padded',
        docs: {
            description: {
                component: `
Drawers are dismissible panels that slide from the screen edge. They are useful for navigation, forms or contextual details.

Usage
\`\`\`tsx
import { Drawer, Button } from '@shared/ui';
import { useState } from 'react';

function Example() {
  const [open, setOpen] = useState(false);
  return (
    <>
      <Button onClick={() => setOpen(true)}>Open</Button>
      <Drawer
        open={open}
        onOpenChange={setOpen}
        side="right"
        size="md"
        title="Panel title"
        description="Helper description"
      >
        Content goes here.
      </Drawer>
    </>
  );
}
\`\`\`

Props
- side: 'right' | 'left' | 'top' | 'bottom' — Slide-in edge (default: 'right').
- size: 'sm' | 'md' | 'lg' — Width for left/right or height for top/bottom (default: 'md').
- title/description/footer: ReactNode — Optional header/footer content.
- blurOverlay: boolean — Blur the background overlay (default: true).
- closeOnOverlay: boolean — Clicking the overlay closes the drawer (default: true).
- className: string — Extra classes for the panel.
- open: boolean, onOpenChange: (open: boolean) => void — Controlled state.

Notes
- Keyboard: ESC closes. Focus is trapped within the drawer while open.
- Scrolling: Background scrolling is locked to prevent scroll bleed.
- Accessibility: Uses \`role="dialog"\`, \`aria-modal\`, and labels/descriptions when provided.
                `,
            },
        },
    },
    tags: ['autodocs'],
    argTypes: {
        side: {
            control: { type: 'inline-radio' },
            options: ['right', 'left', 'top', 'bottom'],
            description: 'Slide-in side',
        },
        size: {
            control: { type: 'inline-radio' },
            options: ['sm', 'md', 'lg'],
            description: 'Panel size',
        },
        title: { control: 'text', description: 'Header title' },
        description: { control: 'text', description: 'Header description' },
        withFooter: { control: 'boolean', description: 'Show example footer actions' },
        blurOverlay: { control: 'boolean', description: 'Blur background overlay' },
        closeOnOverlay: { control: 'boolean', description: 'Close when clicking overlay' },
        className: { control: 'text', description: 'Extra classes for the panel' },
        content: { control: 'text', description: 'Body content (for examples)' },
    },
} satisfies Meta<any>;

export default meta;

type Story = StoryObj<StoryArgs>;

function FooterActions({ onClose }: { onClose: () => void }) {
    return (
        <div style={{ display: 'flex', gap: 8, justifyContent: 'flex-end' }}>
            <Button variant="outline" onClick={onClose} size="sm">
                Cancel
            </Button>
            <Button onClick={onClose} size="sm">
                Confirm
            </Button>
        </div>
    );
}

export const Playground: Story = {
    args: {
        side: 'right',
        size: 'md',
        title: 'Panel title',
        description: 'Short helpful text.',
        withFooter: false,
        blurOverlay: true,
        closeOnOverlay: true,
        className: '',
        content:
            'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec nec magna eros. Integer sit amet dui nec purus posuere imperdiet.',
    },
    parameters: { docs: { description: { story: 'Interactive control center.' } } },
    render: (args) => {
        const [open, setOpen] = useState(false);
        return (
            <div style={{ display: 'grid', gap: 12 }}>
                <Button onClick={() => setOpen(true)}>Open drawer</Button>
                <Drawer
                    open={open}
                    onOpenChange={setOpen}
                    side={args.side}
                    size={args.size}
                    title={args.title}
                    description={args.description}
                    blurOverlay={args.blurOverlay}
                    closeOnOverlay={args.closeOnOverlay}
                    className={args.className}
                    footer={
                        args.withFooter ? (
                            <FooterActions onClose={() => setOpen(false)} />
                        ) : undefined
                    }
                >
                    {args.content}
                </Drawer>
            </div>
        );
    },
};

export const Sides: Story = {
    args: { size: 'md', blurOverlay: true, closeOnOverlay: true },
    parameters: { docs: { description: { story: 'Open drawers from each side.' } } },
    render: (args) => {
        const [open, setOpen] = useState(false);
        const [side, setSide] = useState<Side>('right');
        return (
            <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
                {(['right', 'left', 'top', 'bottom'] as Side[]).map((s) => (
                    <Button
                        key={s}
                        onClick={() => {
                            setSide(s);
                            setOpen(true);
                        }}
                    >
                        Open {s}
                    </Button>
                ))}
                <Drawer
                    open={open}
                    onOpenChange={setOpen}
                    side={side}
                    size={args.size}
                    title={`From ${side}`}
                    description="This drawer demonstrates different slide-in sides."
                    blurOverlay={args.blurOverlay}
                    closeOnOverlay={args.closeOnOverlay}
                >
                    Content from {side}
                </Drawer>
            </div>
        );
    },
};

export const Sizes: Story = {
    args: { side: 'right', blurOverlay: true, closeOnOverlay: true },
    parameters: { docs: { description: { story: 'sm, md, lg sizes for the right side.' } } },
    render: (args) => {
        const [open, setOpen] = useState(false);
        const [size, setSize] = useState<Size>('sm');
        return (
            <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
                {(['sm', 'md', 'lg'] as Size[]).map((sz) => (
                    <Button
                        key={sz}
                        onClick={() => {
                            setSize(sz);
                            setOpen(true);
                        }}
                    >
                        Open {sz}
                    </Button>
                ))}
                <Drawer
                    open={open}
                    onOpenChange={setOpen}
                    side={args.side}
                    size={size}
                    title={`Size ${size}`}
                    description="Right drawer width changes by size."
                    blurOverlay={args.blurOverlay}
                    closeOnOverlay={args.closeOnOverlay}
                >
                    This is a {size} drawer.
                </Drawer>
            </div>
        );
    },
};

export const WithFooter: Story = {
    args: { side: 'right', size: 'md', blurOverlay: true, closeOnOverlay: true },
    parameters: { docs: { description: { story: 'Drawer with footer actions.' } } },
    render: (args) => {
        const [open, setOpen] = useState(false);
        return (
            <div style={{ display: 'grid', gap: 12 }}>
                <Button onClick={() => setOpen(true)}>Open with footer</Button>
                <Drawer
                    open={open}
                    onOpenChange={setOpen}
                    side={args.side}
                    size={args.size}
                    title="Review changes"
                    description="Make sure everything looks correct before continuing."
                    blurOverlay={args.blurOverlay}
                    closeOnOverlay={args.closeOnOverlay}
                    footer={<FooterActions onClose={() => setOpen(false)} />}
                >
                    Content with example actions in the footer.
                </Drawer>
            </div>
        );
    },
};

export const LongContent: Story = {
    args: { side: 'right', size: 'md', blurOverlay: true, closeOnOverlay: true },
    parameters: { docs: { description: { story: 'Scrollable content area.' } } },
    render: (args) => {
        const [open, setOpen] = useState(false);
        const para =
            'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed non risus. Cras vel sapien at augue euismod lobortis. Integer eget turpis vitae sem pulvinar hendrerit.';
        return (
            <div style={{ display: 'grid', gap: 12 }}>
                <Button onClick={() => setOpen(true)}>Open long content</Button>
                <Drawer
                    open={open}
                    onOpenChange={setOpen}
                    side={args.side}
                    size={args.size}
                    title="Long content"
                    description="Scroll within the panel."
                    blurOverlay={args.blurOverlay}
                    closeOnOverlay={args.closeOnOverlay}
                >
                    <div style={{ display: 'grid', gap: 12 }}>
                        {Array.from({ length: 20 }).map((_, i) => (
                            <p key={i}>{para}</p>
                        ))}
                    </div>
                </Drawer>
            </div>
        );
    },
};
