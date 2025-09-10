import { Textarea } from '@shared/ui';
import type { Meta, StoryObj } from '@storybook/react-vite';
import { useState } from 'react';

type Size = 'sm' | 'md' | 'lg';

type StoryArgs = {
    label?: string;
    hint?: string;
    error?: string;
    success?: string;
    placeholder?: string;
    size: Size;
    fullWidth: boolean;
    autoResize: boolean;
    rows: number;
    maxLength?: number;
    disabled?: boolean;
    required?: boolean;
    containerClassName?: string;
    textareaClassName?: string;
};

const meta = {
    title: 'Shared/Textarea',
    component: Textarea,
    parameters: {
        layout: 'padded',
        docs: {
            description: {
                component: `
Textarea collects multi-line input with optional auto-resize and character count.

Usage
\`\`\`tsx
import { Textarea } from '@shared/ui';

// Basic
<Textarea label="Message" placeholder="Write your message..." rows={4} />

// Auto-resize with character limit
<Textarea label="Comment" autoResize maxLength={200} />
\`\`\`

Props
- label?: ReactNode, hint?: string, error?: string | boolean, success?: string | boolean
- size?: 'sm' | 'md' | 'lg' — Control size (default: 'md')
- fullWidth?: boolean — Stretch to container width (default: true)
- autoResize?: boolean — Grows with content (disables manual resize)
- rows?: number — Initial number of visible rows (default: 3)
- maxLength?: number — Shows live character count when provided
- containerClassName/textareaClassName?: string — Style overrides
- Supports all native textarea props (placeholder, disabled, required, value/defaultValue, etc.)

Notes
- When \`autoResize\` is true, the textarea grows to fit content and hides the resize handle.
- Character count appears automatically when \`maxLength\` is set.
                `,
            },
        },
    },
    tags: ['autodocs'],
    argTypes: {
        label: { control: 'text', description: 'Label text' },
        hint: { control: 'text', description: 'Helper text' },
        error: { control: 'text', description: 'Error message (string)' },
        success: { control: 'text', description: 'Success message (string)' },
        placeholder: { control: 'text', description: 'Placeholder text' },
        size: {
            control: { type: 'inline-radio' },
            options: ['sm', 'md', 'lg'],
            description: 'Control size',
        },
        fullWidth: { control: 'boolean', description: 'Full width' },
        autoResize: { control: 'boolean', description: 'Auto grow with content' },
        rows: {
            control: { type: 'number', min: 1, max: 12, step: 1 },
            description: 'Initial rows',
        },
        maxLength: {
            control: { type: 'number', min: 10, max: 500, step: 10 },
            description: 'Max characters (shows counter)',
        },
        disabled: { control: 'boolean', description: 'Disabled state' },
        required: { control: 'boolean', description: 'Required state' },
        containerClassName: { control: 'text', description: 'Container classes' },
        textareaClassName: { control: 'text', description: 'Textarea classes' },
    },
} satisfies Meta<any>;

export default meta;

type Story = StoryObj<StoryArgs>;

export const Playground: Story = {
    args: {
        label: 'Message',
        hint: 'Be concise and clear.',
        error: '',
        success: '',
        placeholder: 'Write your message...',
        size: 'md',
        fullWidth: true,
        autoResize: false,
        rows: 4,
        maxLength: 0 as unknown as number, // hide by default
        disabled: false,
        required: false,
        containerClassName: '',
        textareaClassName: '',
    },
    parameters: { docs: { description: { story: 'Interactive control center.' } } },
    render: (args) => {
        const [val, setVal] = useState('');
        const max =
            typeof args.maxLength === 'number' && args.maxLength > 0 ? args.maxLength : undefined;
        return (
            <Textarea
                label={args.label}
                hint={args.hint}
                error={args.error || undefined}
                success={args.success || undefined}
                placeholder={args.placeholder}
                size={args.size}
                fullWidth={args.fullWidth}
                autoResize={args.autoResize}
                rows={args.rows}
                maxLength={max}
                disabled={args.disabled}
                required={args.required}
                containerClassName={args.containerClassName}
                textareaClassName={args.textareaClassName}
                value={val}
                onChange={(e) => setVal(e.target.value)}
            />
        );
    },
};

export const Sizes: Story = {
    args: {
        label: 'Label',
        placeholder: 'Write here...',
        fullWidth: false,
        autoResize: false,
        rows: 3,
    },
    parameters: { docs: { description: { story: 'sm, md, lg sizes.' } } },
    render: (args) => (
        <div style={{ display: 'grid', gap: 16, maxWidth: 520 }}>
            <Textarea {...(args as any)} size="sm" label="Small" />
            <Textarea {...(args as any)} size="md" label="Medium" />
            <Textarea {...(args as any)} size="lg" label="Large" />
        </div>
    ),
};

export const AutoResize: Story = {
    parameters: { docs: { description: { story: 'Auto grows as the user types.' } } },
    render: () => {
        const [val, setVal] = useState(
            'This textarea auto-resizes as you type.\nTry adding more lines to see it grow.',
        );
        return (
            <div style={{ maxWidth: 560 }}>
                <Textarea
                    label="Auto-resize"
                    autoResize
                    value={val}
                    onChange={(e) => setVal(e.target.value)}
                />
            </div>
        );
    },
};

export const MaxLengthCounter: Story = {
    parameters: {
        docs: { description: { story: 'Shows live character count when maxLength is set.' } },
    },
    render: () => {
        const [val, setVal] = useState('');
        return (
            <Textarea
                label="Comment"
                placeholder="Max 120 characters"
                maxLength={120}
                value={val}
                onChange={(e) => setVal(e.target.value)}
            />
        );
    },
};

export const States: Story = {
    parameters: {
        docs: { description: { story: 'Disabled, required, error and success messages.' } },
    },
    render: () => (
        <div style={{ display: 'grid', gap: 16, maxWidth: 560 }}>
            <Textarea label="Disabled" placeholder="Disabled" disabled />
            <Textarea label="Required" placeholder="Required" required />
            <Textarea label="Error" placeholder="Error" error="This field is required" />
            <Textarea label="Success" placeholder="Success" success="Looks good" />
        </div>
    ),
};

export const FullWidth: Story = {
    args: {
        label: 'Full width',
        placeholder: 'Stretches to container',
        fullWidth: true,
        autoResize: false,
        rows: 3,
        size: 'md',
    },
    parameters: { docs: { description: { story: 'Textarea expands to the container width.' } } },
    render: (args) => (
        <div style={{ width: 360 }}>
            <Textarea {...(args as any)} />
        </div>
    ),
};
