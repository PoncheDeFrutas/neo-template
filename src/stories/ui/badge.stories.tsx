import { Badge } from '@shared/ui';
import type { Meta, StoryObj } from '@storybook/react-vite';
import { fn } from 'storybook/test';

const meta = {
    title: 'Shared/Badge',
    component: Badge,
    parameters: { layout: 'centered' },
    tags: ['autodocs'],
    args: {
        children: 'Badge',
    },
    argTypes: {
        children: { control: 'text' },
        size: { control: 'select', options: ['default', 'large'] },
        variant: {
            control: 'select',
            options: ['default', 'bordered', 'pill', 'link', 'notification', 'chips'],
        },
        href: { control: 'text' },
        icon: { control: false },
        iconOnly: { control: 'boolean' },
        onRemove: { control: false },
        color: { control: 'color' },
        textColor: { control: 'color' },
        dotColor: { control: 'color' },
    },
} satisfies Meta<typeof Badge>;

export default meta;
export type Story = StoryObj<typeof Badge>;

const StarIcon = (
    <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.357 4.19h4.4c.969 0 1.371 1.24.588 1.81l-3.567 2.59 1.357 4.19c.3.921-.755 1.688-1.539 1.118L10 14.347l-3.548 2.478c-.784.57-1.838-.197-1.539-1.118l1.357-4.19-3.567-2.59c-.783-.57-.38-1.81.588-1.81h4.4l1.357-4.19z" />
    </svg>
);

export const Default: Story = {};
export const Large: Story = { args: { size: 'large' } };
export const Bordered: Story = { args: { variant: 'bordered' } };
export const Pill: Story = { args: { variant: 'pill' } };
export const Link: Story = { args: { variant: 'link', href: '#' } };
export const WithIcon: Story = { args: { icon: StarIcon } };
export const Notification: Story = { args: { variant: 'notification' } };
export const IconOnly: Story = { args: { icon: StarIcon, iconOnly: true } };
export const Chips: Story = { args: { variant: 'chips', onRemove: fn() } };

export const CustomColors: Story = {
    render: () => (
        <div className="flex gap-2">
            <Badge color="#fee2e2" textColor="#991b1b">
                Rojo
            </Badge>
            <Badge color="#dcfce7" textColor="#166534">
                Verde
            </Badge>
            <Badge color="#fef3c7" textColor="#92400e">
                Amarillo
            </Badge>
        </div>
    ),
};

export const TextColorOnly: Story = { args: { textColor: '#991b1b' } };

export const NotificationColors: Story = {
    render: () => (
        <div className="flex gap-2">
            <Badge variant="notification" textColor="#16a34a">
                Text color dot
            </Badge>
            <Badge variant="notification" dotColor="#facc15">
                Custom dot
            </Badge>
        </div>
    ),
};
