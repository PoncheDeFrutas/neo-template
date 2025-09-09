import { EmptyState, Button } from '@shared/ui';
import type { Meta, StoryObj } from '@storybook/react-vite';

type StoryArgs = {
    title: string;
    description?: string;
    withAction?: boolean;
    actionLabel?: string;
    className?: string;
};

const meta = {
    title: 'Shared/EmptyState',
    component: EmptyState,
    parameters: {
        layout: 'centered',
        docs: {
            description: {
                component: `
Empty states inform users when there is no content to display and guide them towards the next action.

Usage
\`\`\`tsx
import { EmptyState, Button } from '@shared/ui';

<EmptyState
  title="No results"
  description="Try adjusting your filters to find what you're looking for."
  action={<Button>Reset filters</Button>}
/>
\`\`\`

Props
- title: string — Main message.
- description?: string — Optional supporting text.
- action?: ReactNode — Optional action (e.g., a Button).
- className?: string — Extra classes for container.

Notes
- The component centers content and constrains description width for readability.
- Provide an action to help users proceed (e.g., retry, create, refresh).
                `,
            },
        },
    },
    tags: ['autodocs'],
    argTypes: {
        title: { control: 'text', description: 'Main title' },
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
        title: 'No items found',
        description: "You don't have any items yet. Create a new one to get started.",
        withAction: true,
        actionLabel: 'Create item',
        className: '',
    },
    parameters: { docs: { description: { story: 'Interactive control center.' } } },
    render: (args) => (
        <EmptyState
            title={args.title}
            description={args.description}
            action={args.withAction ? <Button>{args.actionLabel || 'Action'}</Button> : undefined}
            className={args.className}
        />
    ),
};

export const Basic: Story = {
    args: {
        title: 'No results',
        description: "Try adjusting your search or filter to find what you're looking for.",
    },
    parameters: { docs: { description: { story: 'Title and description only.' } } },
};

export const WithAction: Story = {
    args: {
        title: 'Nothing here yet',
        description: 'Start by creating your first project.',
        withAction: true,
        actionLabel: 'New project',
    },
    render: (args) => (
        <EmptyState
            title={args.title}
            description={args.description}
            action={args.withAction ? <Button>{args.actionLabel}</Button> : undefined}
        />
    ),
    parameters: { docs: { description: { story: 'Includes a primary call to action.' } } },
};

export const CustomStyling: Story = {
    args: {
        title: 'No notifications',
        description: 'You are all caught up! Check back later.',
        withAction: false,
        className: 'bg-elevated border-border p-10',
    },
    parameters: { docs: { description: { story: 'Override container styles via className.' } } },
};

