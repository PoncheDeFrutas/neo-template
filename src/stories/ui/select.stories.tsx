import { Select } from '@shared/ui';
import type { Meta, StoryObj } from '@storybook/react-vite';
import { useState } from 'react';

const options = [
    { label: 'Option 1', value: '1' },
    { label: 'Option 2', value: '2' },
    { label: 'Option 3', value: '3' },
];

const meta = {
    title: 'Shared/Select',
    component: Select,
    parameters: {
        layout: 'centered',
    },
    tags: ['autodocs'],
    args: {
        options,
        disabled: false,
    },
    argTypes: {
        disabled: {
            control: { type: 'boolean' },
        },
    },
} satisfies Meta<typeof Select>;

export default meta;

export type Story = StoryObj<typeof Select>;

export const Default: Story = {
    render: (args) => {
        const [value, setValue] = useState(args.options[0].value);
        return <Select {...args} value={value} onChange={setValue} />;
    },
};

export const Disabled: Story = {
    args: { disabled: true },
    render: (args) => {
        const [value, setValue] = useState(args.options[0].value);
        return <Select {...args} value={value} onChange={setValue} />;
    },
};
