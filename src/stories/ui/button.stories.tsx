import { Button } from '@shared/ui';
import type { Meta, StoryObj } from '@storybook/react-vite';
import { fn } from 'storybook/test'

const meta = {
    title: 'Shared/Button',
    component: Button,
    parameters: {
        layout: 'centered',
    },
    tags: ['autodocs'],
    args: {
        children: 'Button',
        variant: 'primary',
        size: 'md',
        onClick: fn(),
    },
    argTypes: {
        variant: {
            control: { type: 'select' },
            options: ['primary', 'secondary', 'outline'],
        },
        size: {
            control: { type: 'select' },
            options: ['sm', 'md', 'lg'],
        },
    },
} satisfies Meta<typeof Button>;

export default meta;

export type Story = StoryObj<typeof Button>;

export const Primary: Story = {
    args: {
        children: 'Primary',
        variant: 'primary',
    },
};

export const Secondary: Story = {
    args: {
        children: 'Secondary',
        variant: 'secondary',
    },
};

export const Outline: Story = {
    args: {
        children: 'Outline',
        variant: 'outline',
    },
};

export const Large: Story = {
    args: {
        children: 'Large',
        size: 'lg',
    },
};

export const Medium: Story = {
    args: {
        children: 'Medium',
        size: 'md',
    },
};

export const Small: Story = {
    args: {
        children: 'Small',
        size: 'sm',
    },
};