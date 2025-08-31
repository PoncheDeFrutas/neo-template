import { Input } from '@shared/ui';
import type { Meta, StoryObj } from '@storybook/react-vite';

const meta = {
    title: 'Shared/Input',
    component: Input,
    parameters: {
        layout: 'centered',
    },
    tags: ['autodocs'],
    args: {
        placeholder: 'Type here...',
        disabled: false,
    },
    argTypes: {
        disabled: {
            control: { type: 'boolean' },
        },
    },
} satisfies Meta<typeof Input>;

export default meta;

export type Story = StoryObj<typeof Input>;

export const Default: Story = {
    args: {
        placeholder: 'Type here...',
          },
};