import { Radio } from '@shared/ui';
import type { Meta, StoryObj } from '@storybook/react-vite';
import { useState } from 'react';

type Size = 'sm' | 'md' | 'lg';

type StoryArgs = {
    label?: string;
    description?: string;
    error?: string;
    size: Size;
    disabled?: boolean;
    required?: boolean;
    name?: string;
    containerClassName?: string;
    initialChecked?: boolean;
};

const meta = {
    title: 'Shared/Radio',
    component: Radio,
    parameters: {
        layout: 'centered',
        docs: {
            description: {
                component: `
Radio buttons let users select a single option from a set. This component supports label, description, error state and sizes.

Usage (single)
\`\`\`tsx
import { Radio } from '@shared/ui';

<Radio name="opt" label="Option" defaultChecked />
\`\`\`

Usage (group)
\`\`\`tsx
function Example() {
  const [value, setValue] = useState('a');
  const name = 'group1';
  return (
    <div>
      <Radio name={name} label="Option A" checked={value==='a'} onChange={() => setValue('a')} />
      <Radio name={name} label="Option B" checked={value==='b'} onChange={() => setValue('b')} />
      <Radio name={name} label="Option C" checked={value==='c'} onChange={() => setValue('c')} />
    </div>
  );
}
\`\`\`

Props
- label?: ReactNode — Optional label.
- description?: ReactNode — Optional helper text below the label.
- error?: string | boolean — Error state; when a string is provided, it is shown below.
- size: 'sm' | 'md' | 'lg' — Control size (default: 'md').
- containerClassName?: string — Classes for the outer label wrapper.
- All native input props are supported (name, checked, defaultChecked, disabled, required, etc.).

Notes
- The outer label wraps the control for a larger click target.
- Accessibility: sets aria-invalid and aria-describedby when description/error is present.
                `,
            },
        },
    },
    tags: ['autodocs'],
    argTypes: {
        label: { control: 'text', description: 'Label text' },
        description: { control: 'text', description: 'Helper description' },
        error: { control: 'text', description: 'Error message (string)' },
        size: { control: { type: 'inline-radio' }, options: ['sm', 'md', 'lg'], description: 'Control size' },
        disabled: { control: 'boolean', description: 'Disabled state' },
        required: { control: 'boolean', description: 'Required state' },
        name: { control: 'text', description: 'Group name' },
        containerClassName: { control: 'text', description: 'Classes for label wrapper' },
        initialChecked: { control: 'boolean', description: 'Initial checked state (playground only)' },
    },
} satisfies Meta<any>;

export default meta;

type Story = StoryObj<StoryArgs>;

export const Playground: Story = {
    args: {
        label: 'Receive notifications',
        description: 'We will send you occasional product updates.',
        error: '',
        size: 'md',
        disabled: false,
        required: false,
        name: 'radio-play',
        containerClassName: '',
        initialChecked: false,
    },
    parameters: { docs: { description: { story: 'Interactive control center.' } } },
    render: (args) => {
        const [checked, setChecked] = useState(Boolean(args.initialChecked));
        const error = args.error ? args.error : undefined;
        return (
            <Radio
                name={args.name}
                label={args.label}
                description={args.description}
                error={error}
                size={args.size}
                disabled={args.disabled}
                required={args.required}
                containerClassName={args.containerClassName}
                checked={checked}
                onChange={() => setChecked((v) => !v)}
            />
        );
    },
};

export const Sizes: Story = {
    args: { label: 'Label', size: 'md', name: 'sizes' },
    parameters: { docs: { description: { story: 'sm, md, lg sizes.' } } },
    render: (args) => (
        <div style={{ display: 'grid', gap: 12 }}>
            <Radio name={args.name} label="Small" size="sm" defaultChecked />
            <Radio name={args.name} label="Medium" size="md" />
            <Radio name={args.name} label="Large" size="lg" />
        </div>
    ),
};

export const WithDescription: Story = {
    parameters: { docs: { description: { story: 'Radio with helper description.' } } },
    render: () => (
        <Radio
            name="desc"
            label="Email updates"
            description="Receive product news, updates and offers."
            defaultChecked
        />
    ),
};

export const States: Story = {
    parameters: { docs: { description: { story: 'Disabled, required, and error message.' } } },
    render: () => (
        <div style={{ display: 'grid', gap: 16 }}>
            <Radio name="req" label="Required" required />
            <Radio name="dis" label="Disabled" disabled defaultChecked />
            <Radio name="err" label="With error" error="Please select an option" />
        </div>
    ),
};

export const Group: Story = {
    parameters: { docs: { description: { story: 'Typical group usage with a shared name.' } } },
    render: () => {
        const [value, setValue] = useState<'a' | 'b' | 'c'>('a');
        const name = 'group-example';
        return (
            <div style={{ display: 'grid', gap: 8 }}>
                <Radio name={name} label="Option A" checked={value === 'a'} onChange={() => setValue('a')} />
                <Radio name={name} label="Option B" checked={value === 'b'} onChange={() => setValue('b')} />
                <Radio name={name} label="Option C" checked={value === 'c'} onChange={() => setValue('c')} />
            </div>
        );
    },
};

