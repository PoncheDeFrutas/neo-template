import { Breadcrumb } from '@shared/ui';
import type { Meta, StoryObj } from '@storybook/react-vite';

/**
 * Storybook meta configuration for the Breadcrumb component.
 */
const meta = {
    title: 'Shared/Breadcrumb',
    component: Breadcrumb,
    parameters: { layout: 'centered' },
    tags: ['autodocs'],
    args: {
        items: [{ label: 'Home', href: '#' }, { label: 'Library', href: '#' }, { label: 'Data' }],
    },
    argTypes: {
        items: { control: 'object' },
        variant: {
            control: 'select',
            options: ['default', 'solid', 'header'],
        },
        size: {
            control: 'select',
            options: ['sm', 'md', 'lg'],
        },
        separatorIcon: { control: false },
        color: { control: 'color' },
        textColor: { control: 'color' },
    },
} satisfies Meta<typeof Breadcrumb>;

export default meta;
export type Story = StoryObj<typeof Breadcrumb>;

/** Default breadcrumb with links. */
export const Default: Story = {};

/** Solid variant with background color. */
export const Solid: Story = {
    args: { variant: 'solid' },
};

/** Breadcrumb displayed inside a header element. */
export const Header: Story = {
    args: { variant: 'header' },
    render: (args) => (
        <header className="bg-gray-100 p-4">
            <Breadcrumb {...args} />
        </header>
    ),
};

/** Custom background and text colors. */
export const CustomColors: Story = {
    args: {
        variant: 'solid',
        color: '#dbeafe',
        textColor: '#1e40af',
    },
};

/** Demonstrates all available sizes. */
export const Sizes: Story = {
    render: (args) => (
        <div className="flex flex-col gap-2">
            <Breadcrumb {...args} size="sm" />
            <Breadcrumb {...args} size="md" />
            <Breadcrumb {...args} size="lg" />
        </div>
    ),
};
