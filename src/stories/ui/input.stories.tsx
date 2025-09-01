import { Input } from '@shared/ui';
import type { Meta, StoryObj } from '@storybook/react-vite';

/**
 * Storybook meta configuration for the Input component.
 *
 * Describes default args, controls, and layout for interactive documentation.
 */
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

/**
 * Story type alias for the `Input` component.
 */
export type Story = StoryObj<typeof Input>;

/**
 * Basic input example with default configuration.
 */
export const Default: Story = {};

/**
 * Showcases all available sizes (`sm`, `md`, `lg`).
 */
export const Sizes: Story = {
    render: (args) => (
        <div className="flex flex-col gap-2">
            <Input {...args} size="sm" placeholder="Small" />
            <Input {...args} size="md" placeholder="Medium" />
            <Input {...args} size="lg" placeholder="Large" />
        </div>
    ),
};

/**
 * Demonstrates validation states: none, success, and error.
 */
export const Validation: Story = {
    render: (args) => (
        <div className="flex flex-col gap-2">
            <Input {...args} validationState="none" placeholder="None" />
            <Input {...args} validationState="success" placeholder="Success" />
            <Input {...args} validationState="error" placeholder="Error" />
        </div>
    ),
};

/**
 * Input with left and right inline elements (e.g., icons).
 */
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

/**
 * Adds helper text below the input field.
 */
export const WithHelperText: Story = {
    args: {
        helperText: 'This is a helper text',
    },
};
