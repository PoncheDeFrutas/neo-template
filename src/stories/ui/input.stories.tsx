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
    },
    argTypes: {
        disabled: { control: { type: 'boolean' } },
        size: {
            control: { type: 'select' },
            options: ['sm', 'md', 'lg'],
        },
    },
} satisfies Meta<typeof Input>;

export default meta;

export type Story = StoryObj<typeof Input>;

export const Sizes: Story = {
    render: (args) => (
        <div className="flex flex-col gap-2">
            <Input {...args} size="sm" placeholder="Small" />
            <Input {...args} size="md" placeholder="Medium" />
            <Input {...args} size="lg" placeholder="Large" />
        </div>
    ),
};