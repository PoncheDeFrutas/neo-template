import { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react-vite';
import { Drawer, NavigationDrawer } from '@shared/ui';

const meta = {
    title: 'Shared/Drawer',
    component: Drawer,
    parameters: {
        layout: 'fullscreen',
        docs: {
            story: { height: '80vh' },
        },
    },
    tags: ['autodocs'],
    argTypes: {
        placement: { control: 'select', options: ['left', 'right', 'top', 'bottom'] },
    },
    args: { placement: 'left' },
    decorators: [
        (Story) => (
            <div className="w-full min-h-[80vh] bg-surface text-text flex items-center justify-center p-6">
                <Story />
            </div>
        ),
    ],
} satisfies Meta<typeof Drawer>;

export default meta;
export type Story = StoryObj<typeof Drawer>;

interface DefaultStoryProps {
    placement: 'left' | 'right' | 'top' | 'bottom';
}

export const Default: Story = {
    render: (args) => {
        const [open, setOpen] = useState<boolean>(false);
        return (
            <>
                <button onClick={() => setOpen(true)} className="btn btn-primary">
                    Abrir
                </button>
                <Drawer {...args} isOpen={open} onClose={() => setOpen(false)}>
                    <p className="text-text">Hola desde el drawer</p>
                </Drawer>
            </>
        );
    },
    parameters: {
        docs: {
            description: {
                story: 'Default drawer example. The docs canvas height is increased to 80vh so the overlay and panel are visible as in a real page.',
            },
        },
    },
};

export const Navigation: Story = {
    render: (args) => {
        const [open, setOpen] = useState<boolean>(false);
        return (
            <>
                <button onClick={() => setOpen(true)} className="btn btn-primary">
                    Menú
                </button>
                <NavigationDrawer
                    {...args}
                    isOpen={open}
                    onClose={() => setOpen(false)}
                    items={[
                        { label: 'Inicio', href: '#' },
                        { label: 'Perfil', href: '#' },
                    ]}
                />
            </>
        );
    },
    parameters: {
        docs: {
            description: {
                story: 'Navigation drawer with a simple list of links. Rendered in a taller canvas for realistic layout.',
            },
        },
    },
};
