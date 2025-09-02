import type { Meta, StoryObj } from '@storybook/react-vite';
import Footer, { type FooterProps } from '@shared/ui/footer';

const meta: Meta<typeof Footer> = {
    id: 'components-footer',
    title: 'Shared/Footer',
    component: Footer,
    parameters: { layout: 'fullscreen' },
    tags: ['autodocs'],
    argTypes: {
        variant: {
            control: {
                type: 'select',
                options: [0, 1],
            },
        },
    },
};
export default meta;

export const Default: StoryObj<typeof Footer> = {
    args: {
        variant: 0,
    },
};
