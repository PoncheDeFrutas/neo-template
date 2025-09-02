import { PinCodeInput } from '@shared/ui';
import type { Meta, StoryObj } from '@storybook/react-vite';
import { useState } from 'react';

const meta = {
    title: 'Shared/PinCodeInput',
    component: PinCodeInput,
    parameters: {
        layout: 'centered',
    },
    tags: ['autodocs'],
    args: {
        length: 4,
    },
} satisfies Meta<typeof PinCodeInput>;

export default meta;
export type Story = StoryObj<typeof PinCodeInput>;

export const Default: Story = {
    render: (args) => {
        const [value, setValue] = useState('');
        return <PinCodeInput {...args} value={value} onChange={setValue} />;
    },
};

export const SixDigits: Story = {
    render: (args) => {
        const [value, setValue] = useState('');
        return <PinCodeInput {...args} length={6} value={value} onChange={setValue} />;
    },
};