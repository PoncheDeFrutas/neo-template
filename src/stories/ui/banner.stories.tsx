import { Banner, Button } from '@shared/ui';
import type { Meta, StoryObj } from '@storybook/react-vite';

/**
 * Storybook configuration for the Banner component.
 */
const meta = {
    title: 'Shared/Banner',
    component: Banner,
    parameters: { 
        layout: 'fullscreen', // Cambiar a fullscreen para banners
        viewport: {
            defaultViewport: 'responsive',
        },
    },
    tags: ['autodocs'],
    argTypes: {
        variant: {
            control: { type: 'select' },
            options: ['default', 'bottom', 'marketing', 'cta', 'info'],
        },
        position: {
            control: { type: 'select' },
            options: ['top', 'bottom'],
        },
    },
} satisfies Meta<typeof Banner>;

export default meta;

export type Story = StoryObj<typeof Banner>;

/**
 * Simple banner at the top.
 */
export const Default: Story = {
    args: {
        variant: 'default',
        position: 'top',
    },
    render: (args) => (
        <div className="min-h-screen bg-gray-50">
            <Banner {...args}>
                <span className="text-sm font-medium">
                    🎉 Bienvenido a nuestro sitio - Explora nuestras nuevas funcionalidades
                </span>
            </Banner>
            <div className="p-8">
                <p className="text-gray-600">Contenido de la página...</p>
            </div>
        </div>
    ),
};

/**
 * Fixed banner at the bottom of the viewport.
 */
export const Bottom: Story = {
    args: {
        variant: 'bottom',
    },
    render: (args) => (
        <div className="min-h-screen bg-gray-50 relative">
            <div className="p-8">
                <p className="text-gray-600">Contenido de la página...</p>
            </div>
            <Banner {...args}>
                <span className="text-sm">🍪 Usamos cookies para mejorar tu experiencia</span>
                <Button label="Aceptar" size="sm" />
            </Banner>
        </div>
    ),
};

/**
 * Marketing block with image, heading and action.
 */
export const Marketing: Story = {
    args: {
        variant: 'marketing',
    },
    render: (args) => (
        <div className="min-h-screen bg-gray-50">
            <Banner {...args}>
                <div className="flex items-center gap-3">
                    <div className="h-10 w-10 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center text-white font-bold">
                        🚀
                    </div>
                    <div>
                        <h3 className="font-semibold text-lg">Nuevo lanzamiento disponible</h3>
                        <p className="text-sm text-gray-600">Descubre las últimas funcionalidades</p>
                    </div>
                </div>
                <Button label="Descubrir ahora" variant="primary" />
            </Banner>
            <div className="p-8">
                <p className="text-gray-600">Contenido principal...</p>
            </div>
        </div>
    ),
};

/**
 * Call to action banner with a button.
 */
export const Cta: Story = {
    args: {
        variant: 'cta',
    },
    render: (args) => (
        <div className="min-h-screen bg-gray-50">
            <Banner {...args}>
                <div className="flex items-center gap-2">
                    <span className="text-xl">⚡</span>
                    <div>
                        <span className="font-medium">Actualiza tu plan y obtén más funciones</span>
                        <p className="text-sm opacity-80">Oferta limitada - 50% descuento</p>
                    </div>
                </div>
                <Button label="Actualizar plan" variant="secondary" />
            </Banner>
            <div className="p-8">
                <p className="text-gray-600">Dashboard del usuario...</p>
            </div>
        </div>
    ),
};

/**
 * Informational banner with subtle styling.
 */
export const Info: Story = {
    args: {
        variant: 'info',
        position: 'bottom',
    },
    render: (args) => (
        <div className="min-h-screen bg-gray-50 relative">
            <div className="p-8">
                <p className="text-gray-600">Contenido de la página...</p>
            </div>
            <Banner {...args}>
                <div className="flex items-center gap-2">
                    <span className="text-blue-500">ℹ️</span>
                    <span className="text-sm">Mantenimiento programado: 2:00 AM - 4:00 AM EST</span>
                </div>
            </Banner>
        </div>
    ),
};