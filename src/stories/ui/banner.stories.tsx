import { Banner, Button } from '@shared/ui';
import type { Meta, StoryObj } from '@storybook/react-vite';

/**
 * Storybook meta configuration for the Banner component.
 *
 *
 * Defines the story structure, component parameters, and control options
 * for testing different Banner variants and positions in Storybook.
 *
 *
 * The `bgColor` and `textColor` controls accept Tailwind CSS classes to
 * override the component's default background and text colors when needed.
 *
 * @property title - The title displayed in Storybook sidebar under 'Shared/Banner'
 * @property component - References the Banner component to be documented
 * @property parameters - Configuration for layout and viewport settings
 * @property parameters.layout - Set to 'fullscreen' for full viewport rendering
 * @property parameters.viewport - Responsive viewport configuration
 * @property tags - Enables automatic documentation generation
 * @property argTypes - Control definitions for interactive props
 * @property argTypes.variant - Select control for banner style variants
 * @property argTypes.position - Select control for banner positioning options
 * @property argTypes.bgColor - Text control for custom background classes
 * @property argTypes.textColor - Text control for custom text color classes
 */
const meta = {
    title: 'Shared/Banner',
    component: Banner,
    parameters: {
        layout: 'fullscreen',
        viewport: {
            defaultViewport: 'responsive',
        },
    },
    tags: ['autodocs'],
    // En el argTypes del meta
    argTypes: {
        variant: {
            control: { type: 'select' },
            options: ['default', 'bottom', 'marketing', 'cta', 'info'],
        },
        position: {
            control: { type: 'select' },
            options: ['top', 'bottom'],
        },
        bgColor: {
            control: { type: 'select' },
            options: [
                'bg-blue-600', // default/bottom
                'bg-gray-100', // marketing
                'bg-indigo-600', // cta
                'bg-blue-50', // info
                'bg-red-600', // alternative
                'bg-green-600', // alternative
                'bg-yellow-100', // alternative
            ],
        },
        textColor: {
            control: { type: 'select' },
            options: [
                'text-white',
                'text-gray-900',
                'text-blue-900',
                'text-red-900',
                'text-green-900',
            ],
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
        bgColor: 'bg-blue-600',
        textColor: 'text-white',
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
        bgColor: 'bg-blue-600',
        textColor: 'text-white',
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
        bgColor: 'bg-gray-100',
        textColor: 'text-gray-900',
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
                        <p className="text-sm text-gray-600">
                            Descubre las últimas funcionalidades
                        </p>
                    </div>
                </div>
                <Button label="Descubrir ahora" variant="default" />
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
        bgColor: 'bg-indigo-600',
        textColor: 'text-white',
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
                <Button label="Actualizar plan" variant="outline" />
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
        bgColor: 'bg-blue-50',
        textColor: 'text-blue-900',
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
