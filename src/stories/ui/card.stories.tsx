import { Card } from '@shared/ui';
import type { Meta, StoryObj } from '@storybook/react-vite';

const meta = {
    title: 'Shared/Card',
    component: Card,
    parameters: { layout: 'centered' },
    tags: ['autodocs'],
} satisfies Meta<typeof Card>;

export default meta;
type Story = StoryObj<typeof Card>;

export const Default: Story = {
    args: {
        title: 'Noteworthy technology acquisitions 2021',
        children:
            'Here are the biggest enterprise technology acquisitions of 2021 so far, in reverse chronological order.',
    },
};

export const WithImage: Story = {
    args: {
        ...Default.args,
        imgSrc: 'https://flowbite.com/docs/images/blog/image-1.jpg',
        imgAlt: 'Office',
    },
};

export const WithActions: Story = {
    args: {
        ...Default.args,
        actions: [
            { label: 'Read more', href: '#' },
            { label: 'Share', onClick: () => alert('share') },
        ],
    },
};

export const Horizontal: Story = {
    args: {
        ...Default.args,
        horizontal: true,
        imgSrc: 'https://flowbite.com/docs/images/blog/image-4.jpg',
        imgAlt: 'Laptop',
    },
};
