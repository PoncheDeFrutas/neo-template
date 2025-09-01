import { Input } from '@shared/ui';
import type { Meta, StoryObj } from '@storybook/react-vite';

const meta = {
    title: 'Shared/Input',
    component: Input,
    parameters: {
        layout: 'centered',
    },
    tags: ['autodocs'],
    args: {
        placeholder: 'Type here...',
        disabled: false,
        size: 'md',
        validationState: 'none',
        helperText: '',
    },
    argTypes: {
        disabled: { control: { type: 'boolean' } },
        size: {
            control: { type: 'select' },
            options: ['sm', 'md', 'lg'],
        },
        validationState: {
            control: { type: 'select' },
            options: ['none', 'success', 'error'],
        },
        helperText: { control: { type: 'text' } },
        leftElement: { control: false },
        rightElement: { control: false },
    },
} satisfies Meta<typeof Input>;

export default meta;

export type Story = StoryObj<typeof Input>;

export const Default: Story = {};

export const Sizes: Story = {
    render: (args) => (
        <div className="flex flex-col gap-2">
            <Input {...args} size="sm" placeholder="Small" />
            <Input {...args} size="md" placeholder="Medium" />
            <Input {...args} size="lg" placeholder="Large" />
        </div>
    ),
};

export const Validation: Story = {
    render: (args) => (
        <div className="flex flex-col gap-2">
            <Input {...args} validationState="none" placeholder="None" />
            <Input {...args} validationState="success" placeholder="Success" />
            <Input {...args} validationState="error" placeholder="Error" />
        </div>
    ),
};

export const WithElements: Story = {
    render: (args) => (
        <div className="flex flex-col gap-2">
            <Input
                {...args}
                leftElement={
                    <span role="img" aria-label="search">
                        🔍
                    </span>
                }
                rightElement={
                    <span role="img" aria-label="clear">
                        ❌
                    </span>
                }
                placeholder="Icons"
            />
        </div>
    ),
};

export const WithHelperText: Story = {
    args: {
        helperText: 'This is a helper text',
    },
};
