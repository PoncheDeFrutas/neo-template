import { Button } from '@shared/ui';
import type { Meta, StoryObj } from '@storybook/react-vite';
import { fn } from 'storybook/test';

const meta = {
    title: 'Shared/Button',
    component: Button,
    parameters: { layout: 'centered' },
    tags: ['autodocs'],
    args: {
        label: 'Button',
        onClick: fn(),
    },
    argTypes: {
        label: { control: 'text' },
        variant: {
            control: 'select',
            options: ['default', 'outline', 'gradient', 'gradientOutline'],
        },
        size: {
            control: 'select',
            options: ['xs', 'sm', 'md', 'lg', 'xl'],
        },
        pill: { control: 'boolean' },
        loading: { control: 'boolean' },
        disabled: { control: 'boolean' },
        color: { control: 'color' },
        leftIcon: { control: false },
        rightIcon: { control: false },
        icon: { control: false },
    },
} satisfies Meta<typeof Button>;

export default meta;
export type Story = StoryObj<typeof Button>;

const StarIcon = (
    <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.357 4.19h4.4c.969 0 1.371 1.24.588 1.81l-3.567 2.59 1.357 4.19c.3.921-.755 1.688-1.539 1.118L10 14.347l-3.548 2.478c-.784.57-1.838-.197-1.539-1.118l1.357-4.19-3.567-2.59c-.783-.57-.38-1.81.588-1.81h4.4l1.357-4.19z" />
    </svg>
);

export const Default: Story = {};

export const Outline: Story = {
    args: { variant: 'outline' },
};

export const Gradient: Story = {
    args: { variant: 'gradient' },
};

export const GradientOutline: Story = {
    args: { variant: 'gradientOutline' },
};

export const GradientCustomColor: Story = {
    name: 'Gradient (custom color)',
    args: { variant: 'gradient', color: '#22c55e', label: 'Gradient Green' },
    parameters: {
        docs: {
            description: {
                story: 'El gradiente ahora usa `color` como inicio y calcula el final automáticamente (ligeramente más claro/oscuro).',
            },
        },
    },
};

export const GradientOutlineHover: Story = {
    name: 'Gradient Outline (hover)',
    args: { variant: 'gradientOutline', color: '#ef4444', label: 'Hover Me' },
    parameters: {
        docs: {
            description: {
                story: 'En `gradientOutline`, el gradiente se aplica sólo al hacer hover; el borde usa `color`.',
            },
        },
    },
};

export const Pill: Story = {
    args: { pill: true },
};

export const Sizes: Story = {
    render: (args) => (
        <div className="flex gap-2">
            <Button {...args} size="xs" label="XS" />
            <Button {...args} size="sm" label="SM" />
            <Button {...args} size="md" label="MD" />
            <Button {...args} size="lg" label="LG" />
            <Button {...args} size="xl" label="XL" />
        </div>
    ),
};

export const WithIcons: Story = {
    args: { leftIcon: StarIcon, rightIcon: StarIcon },
};

export const IconButton: Story = {
    args: {
        icon: StarIcon,
        'aria-label': 'star',
        label: undefined,
    },
};

export const Loading: Story = {
    args: { loading: true },
};

export const Disabled: Story = {
    args: { disabled: true },
};
