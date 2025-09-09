import { Button, Modal } from '@shared/ui';
import type { Meta, StoryObj } from '@storybook/react-vite';
import { useState } from 'react';

type Size = 'sm' | 'md' | 'lg';

type StoryArgs = {
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
    title: 'Shared/Modal',
    component: Modal,
    parameters: {
        layout: 'padded',
        docs: {
            description: {
                component: `
Modals display important content in a dedicated layer and require user interaction to proceed.

Usage
\`\`\`tsx
import { Modal, Button } from '@shared/ui';
import { useState } from 'react';

function Example() {
  const [open, setOpen] = useState(false);
  return (
    <>
      <Button onClick={() => setOpen(true)}>Open</Button>
      <Modal
        open={open}
        onOpenChange={setOpen}
        size="md"
        title="Dialog title"
        description="Helpful description"
      >
        Content goes here.
      </Modal>
    </>
  );
}
\`\`\`

Props
- size: 'sm' | 'md' | 'lg' — Max width (default: 'md').
- title/description/footer: ReactNode — Optional header/footer content.
- blurOverlay: boolean — Blur the background overlay (default: true).
- closeOnOverlay: boolean — Clicking the overlay closes the modal (default: true).
- className: string — Extra classes for the panel.
- open: boolean, onOpenChange: (open: boolean) => void — Controlled state.

Notes
- Keyboard: ESC closes. Focus is trapped within the dialog while open.
- Scrolling: Body scroll is locked to prevent background scroll.
- Accessibility: Uses \`role="dialog"\`, \`aria-modal\`, and labels/descriptions when provided.
                `,
            },
        },
    },
    tags: ['autodocs'],
    argTypes: {
        size: { control: { type: 'inline-radio' }, options: ['sm', 'md', 'lg'], description: 'Dialog size' },
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
        size: 'md',
        title: 'Dialog title',
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
                <Button onClick={() => setOpen(true)}>Open modal</Button>
                <Modal
                    open={open}
                    onOpenChange={setOpen}
                    size={args.size}
                    title={args.title}
                    description={args.description}
                    blurOverlay={args.blurOverlay}
                    closeOnOverlay={args.closeOnOverlay}
                    className={args.className}
                    footer={args.withFooter ? <FooterActions onClose={() => setOpen(false)} /> : undefined}
                >
                    {args.content}
                </Modal>
            </div>
        );
    },
};

export const Sizes: Story = {
    args: { blurOverlay: true, closeOnOverlay: true },
    parameters: { docs: { description: { story: 'sm, md, lg modal widths.' } } },
    render: (args) => {
        const [open, setOpen] = useState(false);
        const [size, setSize] = useState<Size>('sm');
        return (
            <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
                {(['sm', 'md', 'lg'] as Size[]).map((sz) => (
                    <Button key={sz} onClick={() => { setSize(sz); setOpen(true); }}>
                        Open {sz}
                    </Button>
                ))}
                <Modal
                    open={open}
                    onOpenChange={setOpen}
                    size={size}
                    title={`Size ${size}`}
                    description="Modal width changes by size."
                    blurOverlay={args.blurOverlay}
                    closeOnOverlay={args.closeOnOverlay}
                >
                    This is a {size} modal.
                </Modal>
            </div>
        );
    },
};

export const WithFooter: Story = {
    args: { size: 'md', blurOverlay: true, closeOnOverlay: true },
    parameters: { docs: { description: { story: 'Modal with footer actions.' } } },
    render: (args) => {
        const [open, setOpen] = useState(false);
        return (
            <div style={{ display: 'grid', gap: 12 }}>
                <Button onClick={() => setOpen(true)}>Open with footer</Button>
                <Modal
                    open={open}
                    onOpenChange={setOpen}
                    size={args.size}
                    title="Review changes"
                    description="Make sure everything looks correct before continuing."
                    blurOverlay={args.blurOverlay}
                    closeOnOverlay={args.closeOnOverlay}
                    footer={<FooterActions onClose={() => setOpen(false)} />}
                >
                    Content with example actions in the footer.
                </Modal>
            </div>
        );
    },
};

export const LongContent: Story = {
    args: { size: 'md', blurOverlay: true, closeOnOverlay: true },
    parameters: { docs: { description: { story: 'Scrollable content area when content is long.' } } },
    render: (args) => {
        const [open, setOpen] = useState(false);
        const para =
            'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed non risus. Cras vel sapien at augue euismod lobortis. Integer eget turpis vitae sem pulvinar hendrerit.';
        return (
            <div style={{ display: 'grid', gap: 12 }}>
                <Button onClick={() => setOpen(true)}>Open long content</Button>
                <Modal
                    open={open}
                    onOpenChange={setOpen}
                    size={args.size}
                    title="Long content"
                    description="Scroll within the page if content overflows the viewport."
                    blurOverlay={args.blurOverlay}
                    closeOnOverlay={args.closeOnOverlay}
                >
                    <div style={{ display: 'grid', gap: 12 }}>
                        {Array.from({ length: 20 }).map((_, i) => (
                            <p key={i}>{para}</p>
                        ))}
                    </div>
                </Modal>
            </div>
        );
    },
};

export const OverlayBehavior: Story = {
    args: { size: 'md', blurOverlay: true, closeOnOverlay: false },
    parameters: { docs: { description: { story: 'Toggle overlay blur and click-to-close behavior.' } } },
    render: (args) => {
        const [open, setOpen] = useState(false);
        return (
            <div style={{ display: 'grid', gap: 12 }}>
                <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
                    <Button onClick={() => setOpen(true)}>Open (overlay click disabled)</Button>
                </div>
                <Modal
                    open={open}
                    onOpenChange={setOpen}
                    size={args.size}
                    title="Overlay behavior"
                    description={`Blur overlay: ${args.blurOverlay ? 'on' : 'off'}. Click overlay to close: ${args.closeOnOverlay ? 'on' : 'off'}.`}
                    blurOverlay={args.blurOverlay}
                    closeOnOverlay={args.closeOnOverlay}
                >
                    Try pressing ESC to close, or toggle props in the playground.
                </Modal>
            </div>
        );
    },
};

