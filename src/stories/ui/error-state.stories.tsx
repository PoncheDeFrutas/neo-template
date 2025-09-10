import { ErrorState, Button } from '@shared/ui';
import type { Meta, StoryObj } from '@storybook/react-vite';

type StoryArgs = {
    title: string;
    description?: string;
    withAction?: boolean;
    actionLabel?: string;
    className?: string;
};

const meta = {
    title: 'Shared/ErrorState',
    component: ErrorState,
    parameters: {
        layout: 'centered',
        docs: {
            description: {
                component: `
Error states communicate that something went wrong and often provide a recovery action.

Usage
\`\`\`tsx
import { ErrorState, Button } from '@shared/ui';

<ErrorState
  title="Failed to load data"
  description="There was a problem fetching your data. Please try again."
  action={<Button variant="destructive">Retry</Button>}
/>
\`\`\`

Props
- title: string — Main error message.
- description?: string — Optional supporting text.
- action?: ReactNode — Optional action (e.g., Retry button).
- className?: string — Extra classes for container.

Notes
- Uses emphasized styles (danger border/title) to highlight the error.
- Provide a clear recovery option whenever possible (retry, reload, contact support).
                `,
            },
        },
    },
    tags: ['autodocs'],
    argTypes: {
        title: { control: 'text', description: 'Main error title' },
        description: { control: 'text', description: 'Supporting text' },
        withAction: { control: 'boolean', description: 'Show example action button' },
        actionLabel: { control: 'text', description: 'Action button label' },
        className: { control: 'text', description: 'Extra container classes' },
    },
} satisfies Meta<StoryArgs>;

export default meta;

type Story = StoryObj<StoryArgs>;

export const Playground: Story = {
    args: {
        title: 'Failed to load data',
        description: 'There was a problem fetching your data. Please try again.',
        withAction: true,
        actionLabel: 'Retry',
        className: '',
    },
    parameters: { docs: { description: { story: 'Interactive control center.' } } },
    render: (args) => (
        <ErrorState
            title={args.title}
            description={args.description}
            action={
                args.withAction ? (
                    <Button variant="destructive">{args.actionLabel || 'Retry'}</Button>
                ) : undefined
            }
            className={args.className}
        />
    ),
};

export const Basic: Story = {
    args: {
        title: 'Something went wrong',
        description: 'Please refresh the page and try again.',
    },
    parameters: { docs: { description: { story: 'Title and description only.' } } },
};

export const WithAction: Story = {
    args: {
        title: 'Network error',
        description: 'We could not reach the server.',
        withAction: true,
        actionLabel: 'Reload',
    },
    render: (args) => (
        <ErrorState
            title={args.title}
            description={args.description}
            action={
                args.withAction ? (
                    <Button variant="destructive">{args.actionLabel}</Button>
                ) : undefined
            }
        />
    ),
    parameters: { docs: { description: { story: 'Includes a destructive Retry/Reload action.' } } },
};

export const CustomStyling: Story = {
    args: {
        title: 'Build failed',
        description: 'Check the console output for details.',
        withAction: false,
        className: 'bg-elevated p-10',
    },
    parameters: { docs: { description: { story: 'Override container styles via className.' } } },
};
