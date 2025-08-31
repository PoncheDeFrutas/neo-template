import { Button } from '@shared/ui';
import type { Meta, StoryObj } from '@storybook/react-vite';
import { fn } from 'storybook/test';

const meta = {
    title: 'Shared/Button',
    component: Button,
    parameters: {
        layout: 'centered',
    },
    tags: ['autodocs'],
    args: {
        label: 'Button',
        primary: false,
        size: 'medium',
        state: 'default',
        onClick: fn(),
    },
    argTypes: {
        primary: {
            control: { type: 'boolean' },
        },
        size: {
            control: { type: 'select' },
            options: ['small', 'medium', 'large'],
        },
        state: {
            control: { type: 'select' },
            options: ['default', 'loading', 'disabled'],
        },
        backgroundColor: {
            control: { type: 'color' },
        },
    },
} satisfies Meta<typeof Button>;

export default meta;

export type Story = StoryObj<typeof Button>;

export const Primary: Story = {
    args: {
        label: 'Primary',
        primary: true,
    },
};

export const Secondary: Story = {
    args: {
        label: 'Secondary',
        primary: false,
    },
};

export const Large: Story = {
    args: {
        label: 'Large',
        size: 'large',
    },
};

export const Medium: Story = {
    args: {
        label: 'Medium',
        size: 'medium',
    },
};

export const Small: Story = {
    args: {
        label: 'Small',
        size: 'small',
    },
};

export const Loading: Story = {
    args: {
        label: 'Loading',
        state: 'loading',
    },
};

export const Disabled: Story = {
    args: {
        label: 'Disabled',
        state: 'disabled',
    },
};

export const Default: Story = {
    args: {
        label: 'Default',
        state: 'default',
    },
};
