import { FileInput } from '@shared/ui';
import type { Meta, StoryObj } from '@storybook/react-vite';

const meta = {
    title: 'Shared/FileInput',
    component: FileInput,
    parameters: { layout: 'centered' },
    tags: ['autodocs'],
    args: {
        helperText: '',
        multiple: false,
        size: 'md',
        dropzone: false,
    },
    argTypes: {
        helperText: { control: { type: 'text' } },
        multiple: { control: { type: 'boolean' } },
        size: {
            control: { type: 'select' },
            options: ['sm', 'md', 'lg'],
        },
        dropzone: { control: { type: 'boolean' } },
    },
} satisfies Meta<typeof FileInput>;

export default meta;
export type Story = StoryObj<typeof FileInput>;

export const Default: Story = {};

export const WithHelperText: Story = {
    args: { helperText: 'SVG, PNG, JPG or GIF (MAX. 800x400px).' },
};

export const Multiple: Story = { args: { multiple: true } };

export const Sizes: Story = {
    render: (args) => (
        <div className="flex flex-col gap-2">
            <FileInput {...args} size="sm" />
            <FileInput {...args} size="md" />
            <FileInput {...args} size="lg" />
        </div>
    ),
};

export const Dropzone: Story = {
    args: {
        dropzone: true,
        helperText: 'SVG, PNG, JPG or GIF (MAX. 800x400px).',
    },
};
