import { FileInput } from '@shared/ui';
import type { Meta, StoryObj } from '@storybook/react-vite';
import { Upload, UploadCloud, Paperclip } from 'lucide-react';
import { useState } from 'react';

type Size = 'sm' | 'md' | 'lg';

type StoryArgs = {
    label?: string;
    hint?: string;
    error?: string;
    success?: string;
    size: Size;
    fullWidth: boolean;
    dropzone: boolean;
    multiple: boolean;
    accept?: string;
    buttonLabel?: string;
    showSelected: boolean;
    disabled?: boolean;
    required?: boolean;
    containerClassName?: string;
    inputClassName?: string;
    dropzoneClassName?: string;
    withLeftIcon?: boolean;
    withRightIcon?: boolean;
};

const meta = {
    title: 'Shared/FileInput',
    component: FileInput,
    parameters: {
        layout: 'padded',
        docs: {
            description: {
                component: `
File inputs let users pick files and (optionally) drag and drop them. This component supports a button-like control and a dropzone variant.

Usage
\`\`\`tsx
import { FileInput } from '@shared/ui';

// Button-like control
<FileInput label="Upload file" name="resume" accept=".pdf,.docx" />

// Dropzone
<FileInput dropzone label="Upload files" multiple accept="image/*" />
\`\`\`

Props
- label?: string — Label above the control.
- hint?: string — Helper text below.
- error?: string | boolean — Error state (string message is displayed below).
- success?: string | boolean — Success message (string only).
- size: 'sm' | 'md' | 'lg' — Size for button-like control (default: 'md').
- fullWidth: boolean — Expands to container width (default: true).
- dropzone: boolean — Enables drag-and-drop area.
- multiple: boolean — Allow selecting multiple files.
- accept?: string — Accept filter (e.g., 'image/*', '.pdf').
- buttonLabel?: string — Custom label for the button.
- showSelected: boolean — Show selected file summary.
- leftIcon/rightIcon: ReactNode — Optional icons.
- containerClassName/inputClassName/dropzoneClassName: string — Style overrides.

Notes
- Drag-and-drop is available when \`dropzone\` is true; pressing Enter/Space also opens the file dialog.
- Accessibility: announces error/success and hint via \`aria-describedby\`.
- The component manages selected filenames internally and notifies via \`onFilesChange(files)\`.
                `,
            },
        },
    },
    tags: ['autodocs'],
    argTypes: {
        label: { control: 'text', description: 'Label text' },
        hint: { control: 'text', description: 'Helper text' },
        error: { control: 'text', description: 'Error message (leave empty for none)' },
        success: { control: 'text', description: 'Success message (string only)' },
        size: { control: { type: 'inline-radio' }, options: ['sm', 'md', 'lg'], description: 'Control size' },
        fullWidth: { control: 'boolean', description: 'Full width' },
        dropzone: { control: 'boolean', description: 'Use dropzone style' },
        multiple: { control: 'boolean', description: 'Allow multiple files' },
        accept: { control: 'text', description: 'Accept filter (e.g., image/*, .pdf)' },
        buttonLabel: { control: 'text', description: 'Custom button label' },
        showSelected: { control: 'boolean', description: 'Show selected summary' },
        disabled: { control: 'boolean', description: 'Disabled state' },
        required: { control: 'boolean', description: 'Required state' },
        containerClassName: { control: 'text', description: 'Container classes' },
        inputClassName: { control: 'text', description: 'Input classes (button-like)' },
        dropzoneClassName: { control: 'text', description: 'Dropzone classes' },
        withLeftIcon: { control: 'boolean', description: 'Show left icon (Upload or UploadCloud)' },
        withRightIcon: { control: 'boolean', description: 'Show right icon (Paperclip)' },
    },
} satisfies Meta<StoryArgs>;

export default meta;

type Story = StoryObj<StoryArgs>;

export const Playground: Story = {
    args: {
        label: 'Upload files',
        hint: 'Max 10MB per file. Accepted: images/pdf.',
        error: '',
        success: '',
        size: 'md',
        fullWidth: true,
        dropzone: false,
        multiple: false,
        accept: '',
        buttonLabel: '',
        showSelected: true,
        disabled: false,
        required: false,
        containerClassName: '',
        inputClassName: '',
        dropzoneClassName: '',
        withLeftIcon: false,
        withRightIcon: false,
    },
    parameters: { docs: { description: { story: 'Interactive control center.' } } },
    render: (args) => {
        const [files, setFiles] = useState<File[]>([]);
        const left = args.withLeftIcon ? (args.dropzone ? <UploadCloud /> : <Upload />) : undefined;
        const right = args.withRightIcon ? <Paperclip /> : undefined;
        const error = args.error ? args.error : undefined;
        const success = args.success ? args.success : undefined;
        return (
            <div style={{ display: 'grid', gap: 8, maxWidth: 560 }}>
                <FileInput
                    name="files"
                    label={args.label}
                    hint={args.hint}
                    error={error}
                    success={success}
                    leftIcon={left}
                    rightIcon={right}
                    size={args.size}
                    fullWidth={args.fullWidth}
                    dropzone={args.dropzone}
                    multiple={args.multiple}
                    accept={args.accept}
                    buttonLabel={args.buttonLabel || undefined}
                    showSelected={args.showSelected}
                    disabled={args.disabled}
                    required={args.required}
                    containerClassName={args.containerClassName}
                    inputClassName={args.inputClassName}
                    dropzoneClassName={args.dropzoneClassName}
                    onFilesChange={setFiles}
                />
                <div style={{ fontSize: 12, color: 'var(--color-muted-foreground)' }}>
                    Selected: {files.length}
                </div>
            </div>
        );
    },
};

export const Dropzone: Story = {
    args: {
        label: 'Upload files',
        hint: 'Drag and drop files here or click to select.',
        dropzone: true,
        multiple: true,
        size: 'md',
        fullWidth: true,
        withLeftIcon: true,
    },
    parameters: { docs: { description: { story: 'Dropzone variant with drag-and-drop support.' } } },
};

export const Sizes: Story = {
    args: { label: 'Upload', fullWidth: false, dropzone: false, size: 'md', showSelected: false },
    parameters: { docs: { description: { story: 'Button-like control sizes.' } } },
    render: (args) => (
        <div style={{ display: 'grid', gap: 16, maxWidth: 520 }}>
            <FileInput {...(args as any)} size="sm" label="Small" />
            <FileInput {...(args as any)} size="md" label="Medium" />
            <FileInput {...(args as any)} size="lg" label="Large" />
        </div>
    ),
};

export const States: Story = {
    parameters: { docs: { description: { story: 'Disabled, required, error and success examples.' } } },
    render: () => (
        <div style={{ display: 'grid', gap: 16, maxWidth: 520 }}>
            <FileInput label="Disabled" disabled />
            <FileInput label="Required" required />
            <FileInput label="With error" error="File type not allowed" />
            <FileInput label="With success" success="All files uploaded" />
        </div>
    ),
};

export const MultipleAndAccept: Story = {
    args: { label: 'Upload images', multiple: true, accept: 'image/*', dropzone: false, showSelected: true },
    parameters: { docs: { description: { story: 'Multiple selection and accept filter.' } } },
};
