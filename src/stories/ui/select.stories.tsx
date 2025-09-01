import { Select } from '@shared/ui';
import type { Meta, StoryObj } from '@storybook/react-vite';
import { useState } from 'react';

/**
 * Common Select options used across stories.
 */
const options = [
    { label: 'Option 1', value: '1' },
    { label: 'Option 2', value: '2' },
    { label: 'Option 3', value: '3' },
];

/**
 * Storybook meta configuration for the Select component.
 */
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
        size: 'md',
        variant: 'default',
    },
    argTypes: {
        disabled: {
            control: { type: 'boolean' },
        },
        size: {
            control: { type: 'inline-radio' },
            options: ['sm', 'md', 'lg'],
        },
        variant: {
            control: { type: 'inline-radio' },
            options: ['default', 'underline'],
        },
    },
} as Meta<typeof Select>;

export default meta;

/**
 * Story type alias for the `Select` component.
 */
type Story = StoryObj<typeof Select>;

/**
 * Default Select with controlled value.
 */
export const Default: Story = {
    render: (args) => {
        const [value, setValue] = useState(args.options[0].value);
        return (
            <Select
                {...args}
                value={value}
                onChange={(v) => setValue(Array.isArray(v) ? (v[0] ?? '') : v)}
            />
        );
    },
};

/**
 * Disabled Select (non-interactive).
 */
export const Disabled: Story = {
    args: { disabled: true },
    render: (args) => {
        const [value, setValue] = useState(args.options[0].value);
        return (
            <Select
                {...args}
                value={value}
                onChange={(v) => setValue(Array.isArray(v) ? (v[0] ?? '') : v)}
            />
        );
    },
};

/**
 * Small size variant.
 */
export const Small: Story = {
    args: { size: 'sm' },
    render: (args) => {
        const [value, setValue] = useState(args.options[0].value);
        return (
            <Select
                {...args}
                value={value}
                onChange={(v) => setValue(Array.isArray(v) ? (v[0] ?? '') : v)}
            />
        );
    },
};

/**
 * Medium size variant.
 */
export const Medium: Story = {
    args: { size: 'md' },
    render: (args) => {
        const [value, setValue] = useState(args.options[0].value);
        return (
            <Select
                {...args}
                value={value}
                onChange={(v) => setValue(Array.isArray(v) ? (v[0] ?? '') : v)}
            />
        );
    },
};

/**
 * Large size variant.
 */
export const Large: Story = {
    args: { size: 'lg' },
    render: (args) => {
        const [value, setValue] = useState(args.options[0].value);
        return (
            <Select
                {...args}
                value={value}
                onChange={(v) => setValue(Array.isArray(v) ? (v[0] ?? '') : v)}
            />
        );
    },
};

/**
 * Underline variant with an underline-only style.
 */
export const Underline: Story = {
    args: { variant: 'underline' },
    render: (args) => {
        const [value, setValue] = useState(args.options[0].value);
        return (
            <Select
                {...args}
                value={value}
                onChange={(v) => setValue(Array.isArray(v) ? (v[0] ?? '') : v)}
            />
        );
    },
};
