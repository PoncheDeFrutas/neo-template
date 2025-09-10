import { Button, Portal } from '@shared/ui';
import type { Meta, StoryObj } from '@storybook/react-vite';
import { useState } from 'react';

type StoryArgs = {
    content: string;
    blurBackground: boolean;
};

const meta = {
    title: 'Shared/Portal',
    component: Portal,
    parameters: {
        layout: 'padded',
        docs: {
            description: {
                component: `
Portal renders its children into \`document.body\` using ReactDOM.createPortal. It is useful for UI that should escape parent stacking/overflow contexts (e.g., modals, drawers, tooltips).

Usage
\`\`\`tsx
import { Portal } from '@shared/ui';

function Example() {
  return (
    <Portal>
      <div className="fixed bottom-4 right-4 bg-surface border border-border rounded-md shadow p-3">
        Portalled toast
      </div>
    </Portal>
  );
}
\`\`\`

Props
- children: ReactNode — The content to portal to \`document.body\`.

Notes
- Portal only returns \`null\` during SSR (when \`document\` is undefined).
- Use it for overlay content that should not be clipped by parent \`overflow: hidden\` or z-index stacking contexts.
                `,
            },
        },
    },
    tags: ['autodocs'],
    argTypes: {
        content: { control: 'text', description: 'Inner content string for demo' },
        blurBackground: {
            control: 'boolean',
            description: 'Add a subtle background blur (demo only)',
        },
    },
} satisfies Meta<any>;

export default meta;

type Story = StoryObj<StoryArgs>;

export const Playground: Story = {
    args: { content: 'Portalled content', blurBackground: true },
    parameters: {
        docs: { description: { story: 'Interactive demo: opens a portalled floating panel.' } },
    },
    render: (args) => {
        const [open, setOpen] = useState(false);
        return (
            <div style={{ display: 'grid', gap: 12 }}>
                <div
                    style={{
                        height: 180,
                        border: '1px solid var(--color-border-subtle)',
                        borderRadius: 8,
                        overflow: 'hidden',
                        position: 'relative',
                        background: 'var(--color-bg-elevated)',
                        display: 'grid',
                        placeItems: 'center',
                        color: 'var(--color-muted-foreground)',
                    }}
                >
                    Clipped container (overflow hidden)
                </div>
                <Button onClick={() => setOpen(true)}>Open portal content</Button>
                {open && (
                    <Portal>
                        <div className="fixed inset-0 z-[1005]" onClick={() => setOpen(false)}>
                            <div
                                className={[
                                    'absolute inset-0 transition',
                                    args.blurBackground
                                        ? 'backdrop-blur-[2px] backdrop-saturate-150'
                                        : '',
                                ].join(' ')}
                            />
                            <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 rounded-md border border-border bg-surface shadow-lg p-4 min-w-56 text-sm">
                                <div className="mb-3 font-medium text-text">{args.content}</div>
                                <div className="flex justify-end">
                                    <Button size="sm" onClick={() => setOpen(false)}>
                                        Close
                                    </Button>
                                </div>
                            </div>
                        </div>
                    </Portal>
                )}
            </div>
        );
    },
};

export const InsideClippedContainer: Story = {
    args: { content: 'Tooltip-like content', blurBackground: false },
    parameters: { docs: { description: { story: 'Portal escapes parent overflow clipping.' } } },
    render: (args) => {
        const [open, setOpen] = useState(false);
        return (
            <div
                style={{
                    height: 180,
                    border: '1px solid var(--color-border-subtle)',
                    borderRadius: 8,
                    overflow: 'hidden',
                    position: 'relative',
                    background: 'var(--color-bg-elevated)',
                    display: 'grid',
                    placeItems: 'center',
                }}
            >
                <Button onClick={() => setOpen((v) => !v)}>Toggle tooltip</Button>
                {open && (
                    <Portal>
                        <div className="fixed left-1/2 top-[20%] -translate-x-1/2 rounded border border-border bg-surface px-3 py-2 text-sm shadow">
                            {args.content}
                        </div>
                    </Portal>
                )}
            </div>
        );
    },
};
