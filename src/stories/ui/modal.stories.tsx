import { Button, Modal, ModalBody, ModalFooter, ModalHeader, type ModalProps } from '@shared/ui';
import type { Meta, StoryObj } from '@storybook/react-vite';
import { useState } from 'react';

const meta = {
    title: 'Shared/Modal',
    component: Modal,
    tags: ['autodocs'],
    argTypes: {
        type: { control: 'select', options: ['default', 'static', 'popup', 'crud'] },
        size: { control: 'select', options: ['sm', 'md', 'lg', 'xl', '2xl'] },
        placement: {
            control: 'select',
            options: [
                'center',
                'top-left',
                'top-center',
                'top-right',
                'center-left',
                'center-right',
                'bottom-left',
                'bottom-center',
                'bottom-right',
            ],
        },
    },
    args: {
        type: 'default',
        size: 'md',
        placement: 'center',
    },
} satisfies Meta<typeof Modal>;

export default meta;

export type Story = StoryObj<typeof Modal>;

const Template = (args: ModalProps) => {
    const [open, setOpen] = useState(false);
    return (
        <>
            <Button label="Open Modal" onClick={() => setOpen(true)} />
            <Modal
                {...args}
                isOpen={open}
                onClose={() => setOpen(false)}
                onSave={args.onSave ?? (() => setOpen(false))}
            >
                {args.type === 'crud' ? (
                    <p className="mb-4">Body content for create/update/delete.</p>
                ) : (
                    <>
                        <ModalHeader>
                            <h2 className="text-lg font-bold">Modal Title</h2>
                        </ModalHeader>
                        <ModalBody>
                            <p className="mb-4">This is a simple modal.</p>
                        </ModalBody>
                        <ModalFooter>
                            <Button label="Close" onClick={() => setOpen(false)} />
                        </ModalFooter>
                    </>
                )}
            </Modal>
        </>
    );
};

export const Default: Story = {
    render: Template,
    args: { type: 'default' },
};

export const Static: Story = {
    render: Template,
    args: { type: 'static' },
};

export const Popup: Story = {
    render: Template,
    args: { type: 'popup' },
};

export const CRUD: Story = {
    render: Template,
    args: { type: 'crud' },
};

export const Sizes: Story = {
    render: Template,
    args: { size: 'lg' },
};

export const Placements: Story = {
    render: Template,
    args: { placement: 'top-left' },
};
