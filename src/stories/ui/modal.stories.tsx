import { Button, Modal } from '@shared/ui';
import type { Meta, StoryObj } from '@storybook/react-vite';
import { useState } from 'react';

const meta = {
    title: 'Shared/Modal',
    component: Modal,
    tags: ['autodocs'],
} satisfies Meta<typeof Modal>;

export default meta;

export type Story = StoryObj<typeof Modal>;

export const Default: Story = {
    render: () => {
        const [open, setOpen] = useState(false);
        return (
            <>
                <Button label="Open Modal" onClick={() => setOpen(true)} />
                <Modal isOpen={open} onClose={() => setOpen(false)}>
                    <div className="p-4">
                        <h2 className="mb-2 text-lg font-bold">Modal Title</h2>
                        <p className="mb-4">This is a simple modal.</p>
                        <Button label="Close" onClick={() => setOpen(false)} />
                    </div>
                </Modal>
            </>
        );
    },
};