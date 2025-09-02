import { ButtonGroup } from '@shared/ui';
import type { Meta, StoryObj } from '@storybook/react-vite';
import { fn } from 'storybook/test';

const meta = {
    title: 'Shared/ButtonGroup',
    component: ButtonGroup,
    parameters: { layout: 'centered' },
    tags: ['autodocs'],
    argTypes: {
        variant: {
            control: 'select',
            options: ['default', 'outline', 'gradient', 'gradientOutline'],
        },
        size: {
            control: 'select',
            options: ['xs', 'sm', 'md', 'lg', 'xl'],
        },
        pill: { control: 'boolean' },
        color: { control: 'color' },
        items: { control: false },
    },
} satisfies Meta<typeof ButtonGroup>;

export default meta;
export type Story = StoryObj<typeof ButtonGroup>;

const StarIcon = (
    <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.357 4.19h4.4c.969 0 1.371 1.24.588 1.81l-3.567 2.59 1.357 4.19c.3.921-.755 1.688-1.539 1.118L10 14.347l-3.548 2.478c-.784.57-1.838-.197-1.539-1.118l1.357-4.19-3.567-2.59c-.783-.57-.38-1.81.588-1.81h4.4l1.357-4.19z" />
    </svg>
);

export const Default: Story = {
    args: {
        items: [
            { label: 'One', onClick: fn() },
            { label: 'Two', onClick: fn() },
            { label: 'Three', onClick: fn() },
        ],
    },
};

export const Links: Story = {
    args: {
        items: [
            { label: 'Home', href: '#' },
            { label: 'About', href: '#' },
            { label: 'Contact', href: '#' },
        ],
    },
};

export const WithIcons: Story = {
    args: {
        items: [
            { label: 'Left', leftIcon: StarIcon },
            { label: 'Right', rightIcon: StarIcon },
            { icon: StarIcon, 'aria-label': 'star' },
        ],
    },
};

export const Outline: Story = {
    args: {
        variant: 'outline',
        items: [
            { label: 'One', onClick: fn() },
            { label: 'Two', onClick: fn() },
            { label: 'Three', onClick: fn() },
        ],
    },
};

export const OutlineWithIcons: Story = {
    args: {
        variant: 'outline',
        items: [
            { label: 'Left', leftIcon: StarIcon },
            { label: 'Right', rightIcon: StarIcon },
            { icon: StarIcon, 'aria-label': 'star' },
        ],
    },
};
