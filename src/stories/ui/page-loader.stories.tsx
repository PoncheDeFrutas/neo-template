import { PageLoader } from '@shared/ui';
import type { Meta, StoryObj } from '@storybook/react-vite';

type StoryArgs = {
    label?: string;
    size: number;
};

const meta = {
    title: 'Shared/PageLoader',
    component: PageLoader,
    parameters: {
        layout: 'fullscreen',
        docs: {
            description: {
                component: `
PageLoader centers a large spinner to indicate a full-page loading state.

Usage
\`\`\`tsx
import { PageLoader } from '@shared/ui';

// In a route boundary or suspense fallback
<PageLoader label="Loading…" size={48} />
\`\`\`

Props
- label?: string — Accessible label for the spinner (default: 'Cargando…').
- size?: number — Diameter of the spinner in pixels (default: 48).

Notes
- The component uses a full-viewport container (\`h-screen w-screen\`) and centers the spinner.
- Prefer using it for entire page or route transitions; for inline loading use Spinner directly.
                `,
            },
        },
    },
    tags: ['autodocs'],
    argTypes: {
        label: { control: 'text', description: 'Aria label for the spinner' },
        size: {
            control: { type: 'number', min: 16, max: 128, step: 2 },
            description: 'Spinner size (px)',
        },
    },
} satisfies Meta<any>;

export default meta;

type Story = StoryObj<StoryArgs>;

export const Playground: Story = {
    args: {
        label: 'Loading…',
        size: 48,
    },
    parameters: { docs: { description: { story: 'Interactive control center.' } } },
    render: (args) => <PageLoader label={args.label} size={args.size} />,
};

export const Sizes: Story = {
    args: { size: 48 },
    parameters: { docs: { description: { story: 'Common sizes.' } } },
    render: () => (
        <div className="grid gap-4 p-6">
            <div className="h-40 border border-border-subtle rounded-md grid place-items-center">
                <PageLoader label="Small" size={24} />
            </div>
            <div className="h-40 border border-border-subtle rounded-md grid place-items-center">
                <PageLoader label="Medium" size={48} />
            </div>
            <div className="h-40 border border-border-subtle rounded-md grid place-items-center">
                <PageLoader label="Large" size={72} />
            </div>
        </div>
    ),
};
