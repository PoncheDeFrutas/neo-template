import { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react-vite';
import { Drawer, NavigationDrawer } from '@/shared/ui/drawer';

const meta: Meta<typeof Drawer> = {
  title: 'Shared/Drawer',
  component: Drawer,
};
export default meta;
type Story = StoryObj<typeof Drawer>;

export const Default: Story = {
  render: () => {
    const [open, setOpen] = useState(false);
    return (
      <>
        <button onClick={() => setOpen(true)} className="btn btn-primary">
          Abrir
        </button>
        <Drawer isOpen={open} onClose={() => setOpen(false)}>
          {/* Contenido personalizado */}
          <p className="text-text">Hola desde el drawer</p>
        </Drawer>
      </>
    );
  },
};

export const Navigation: Story = {
  render: () => {
    const [open, setOpen] = useState(false);
    return (
      <>
        <button onClick={() => setOpen(true)} className="btn btn-primary">
          Menú
        </button>
        <NavigationDrawer
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
};