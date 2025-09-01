import { Button, Modal, ModalBody, ModalFooter, ModalHeader, type ModalProps } from '@shared/ui';
import type { Meta, StoryObj } from '@storybook/react-vite';
import { useState } from 'react';


/**
 * Storybook meta configuration for the Modal component.
 * 
 * Defines the story metadata including component title, default parameters,
 * and control configurations for the Modal component's props.
 * 
 * @property {string} title - The story title displayed in Storybook sidebar
 * @property {React.Component} component - The Modal component being documented
 * @property {string[]} tags - Tags for automatic documentation generation
 * @property {object} args - Default values for component props
 * @property {object} argTypes - Control configurations for interactive prop manipulation
 * @property {object} argTypes.type - Select control for modal type variants (default, static, popup, crud)
 * @property {object} argTypes.size - Select control for modal size options (sm, md, lg, xl, 2xl)
 * @property {object} argTypes.placement - Select control for modal positioning on screen
 * 
 * @example
 * ```tsx
 * // Usage in Storybook stories
 * export default meta;
 * 
 * export const Default: Story = {
 *   args: {
 *     type: "popup",
 *     size: "lg",
 *     placement: "center"
 *   }
 * };
 * ```
 */
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

/**
 * Reusable template for modal stories.
 *
 * Manages internal `open` state and wires `onClose`/`onSave` to close the modal by default.
 */
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

/**
 * Default modal type.
 */
export const Default: Story = {
    render: Template,
    args: { type: 'default' },
};

/**
 * Non-dismissable modal (no outside click to close).
 */
export const Static: Story = {
    render: Template,
    args: { type: 'static' },
};

/**
 * Popup modal style.
 */
export const Popup: Story = {
    render: Template,
    args: { type: 'popup' },
};

/**
 * CRUD-style modal rendering only body content and delegating header/footer.
 */
export const CRUD: Story = {
    render: Template,
    args: { type: 'crud' },
};

/**
 * Demonstrates a larger size.
 */
export const Sizes: Story = {
    render: Template,
    args: { size: 'lg' },
};

/**
 * Demonstrates alternate placements.
 */
export const Placements: Story = {
    render: Template,
    args: { placement: 'top-left' },
};
