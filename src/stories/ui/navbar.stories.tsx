import { Button, Input } from '@shared/ui';
import { Navbar, type NavItem } from '@shared/ui/navbar';
import type { Meta, StoryObj } from '@storybook/react-vite';

const meta = {
    title: 'Shared/Navbar',
    component: Navbar,
    parameters: { layout: 'centered' },
    tags: ['autodocs'],
} satisfies Meta<typeof Navbar>;

export default meta;

type Story = StoryObj<typeof Navbar>;

const commonItems: NavItem[] = [
    {
        id: 'logo',
        position: 'left',
        component: <img src="/vite.svg" alt="Logo" width={32} height={32} />,
    },
    {
        id: 'search',
        position: 'center',
        component: <Input placeholder="Search..." />,
    },
];

const publicItems: NavItem[] = [
    ...commonItems,
    { id: 'login', position: 'right', component: <Button label="Login" /> },
];

const adminItems: NavItem[] = [
    ...commonItems,
    { id: 'users', position: 'right', component: <Button label="Users" /> },
    { id: 'settings', position: 'right', component: <Button label="Settings" /> },
];

const clientItems: NavItem[] = [
    ...commonItems,
    { id: 'cart', position: 'right', component: <Button label="Cart" /> },
    { id: 'profile', position: 'right', component: <Button label="Profile" /> },
];

export const Public: Story = {
    args: { items: publicItems },
};

export const Admin: Story = {
    args: { items: adminItems },
};

export const Client: Story = {
    args: { items: clientItems },
};
