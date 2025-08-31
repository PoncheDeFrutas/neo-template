import { Button, showToast, Toaster } from '@shared/ui';
import type { Meta, StoryObj } from '@storybook/react-vite';
import type { ToastContainerProps, TypeOptions } from 'react-toastify';

type ToastPosition = NonNullable<ToastContainerProps['position']>;

type StoryArgs = {
    message: string;
    type: TypeOptions;
    position: ToastPosition;
} & Partial<ToastContainerProps>;

const meta = {
    title: 'Shared/Toast',
    component: Toaster,
    parameters: {
        layout: 'centered',
        docs: {
            description: {
                component: `
To show a toast, import and call \`showToast\` from anywhere in your app:

\`\`\`tsx
import { showToast, Toaster } from '@shared/ui';

function App() {
    return (
        <>
            <button onClick={() => showToast('Hello!', { type: 'success' })}>
                Show toast
            </button>
            <Toaster />
        </>
    );
}
\`\`\`

## Available Options

### Basic Usage
\`\`\`tsx
// Simple message
showToast('Hello World!');

// With type
showToast('Success message', { type: 'success' });
showToast('Error occurred', { type: 'error' });
showToast('Warning message', { type: 'warning' });
showToast('Information', { type: 'info' });
\`\`\`

### Position
\`\`\`tsx
showToast('Message', { position: 'top-left' });
showToast('Message', { position: 'top-center' });
showToast('Message', { position: 'top-right' });
showToast('Message', { position: 'bottom-left' });
showToast('Message', { position: 'bottom-center' });
showToast('Message', { position: 'bottom-right' }); // default
\`\`\`

### Auto Close
\`\`\`tsx
showToast('Closes in 5 seconds', { autoClose: 5000 });
showToast('Never auto-closes', { autoClose: false });
\`\`\`

### Progress Bar
\`\`\`tsx
showToast('No progress bar', { hideProgressBar: true });
showToast('With progress bar', { hideProgressBar: false }); // default
\`\`\`

### Interaction
\`\`\`tsx
showToast('Click to close', { closeOnClick: true }); // default
showToast('Cannot close on click', { closeOnClick: false });

showToast('Pauses on hover', { pauseOnHover: true }); // default
showToast('Never pauses', { pauseOnHover: false });
\`\`\`

### Combined Options
\`\`\`tsx
showToast('Custom toast', {
    type: 'success',
    position: 'top-center',
    autoClose: 10000,
    hideProgressBar: true,
    closeOnClick: false,
    pauseOnHover: false
});
\`\`\`

Make sure to include <Toaster /> only once in your app, usually near the root.
                `,
            },
        },
    },
    tags: ['autodocs'],
    argTypes: {
        message: { control: 'text', description: 'Message' },
        type: {
            control: { type: 'select' },
            options: ['default', 'success', 'info', 'warning', 'error'],
            description: 'Toast type',
        },
        position: {
            control: { type: 'select' },
            options: [
                'top-left',
                'top-right',
                'top-center',
                'bottom-left',
                'bottom-right',
                'bottom-center',
            ],
            description: 'Toast position',
        },
        autoClose: { control: 'number', description: 'Auto close time (ms)' },
        hideProgressBar: { control: 'boolean', description: 'Hide progress bar' },
        closeOnClick: { control: 'boolean', description: 'Close on click' },
        pauseOnHover: { control: 'boolean', description: 'Pause on hover' },
    },
} satisfies Meta<StoryArgs>;

export default meta;

type Story = StoryObj<StoryArgs>;

export const Playground: Story = {
    args: {
        message: 'Message',
        type: 'default',
        position: 'bottom-right',
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
    },
    parameters: {
        docs: {
            description: {
                story: `
Click the button to show a toast with the current configuration.
                `,
            },
        },
    },
    render: (args) => {
        const { message, type, position, ...toasterProps } = args;

        const handleClick = () => {
            showToast(message, {
                type,
                position,
                autoClose: args.autoClose,
                hideProgressBar: args.hideProgressBar,
                closeOnClick: args.closeOnClick,
                pauseOnHover: args.pauseOnHover,
            });
        };

        return (
            <div
                style={{ display: 'flex', flexDirection: 'column', gap: 16, alignItems: 'center' }}
            >
                <Button label={`Show ${type} toast`} onClick={handleClick} />
                <Toaster position={position} {...toasterProps} />
            </div>
        );
    },
};
