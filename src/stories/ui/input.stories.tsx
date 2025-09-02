import { Input } from '@shared/ui';
import type { Meta, StoryObj } from '@storybook/react-vite';

/**
 * Storybook meta configuration for the Input component.
 *
 * Defines the story metadata including component title, default parameters,
 * and control configurations for the Input component's props.
 *
 * @property {string} title - The story title displayed in Storybook sidebar
 * @property {React.Component} component - The Input component being documented
 * @property {object} parameters - Storybook parameters including layout configuration
 * @property {string[]} tags - Tags for automatic documentation generation
 * @property {object} args - Default values for component props
 * @property {object} argTypes - Control configurations for interactive prop manipulation
 *
 * @example
 * ```tsx
 * // Usage in Storybook stories
 * export default meta;
 *
 * export const Default: Story = {
 *   args: {
 *     placeholder: "Enter text..."
 *   }
 * };
 * ```
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
        variant: 'default',
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
        variant: {
            control: { type: 'select' },
            options: ['default', 'search'],
        },
        interactiveLeftElement: { control: false },
        interactiveRightElement: { control: false },
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

/**
 * Demonstrates the search variant with default search icon.
 */
export const Search: Story = {
    args: {
        variant: 'search',
        placeholder: 'Search...',
    },
};