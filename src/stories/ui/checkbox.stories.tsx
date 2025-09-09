import { Checkbox } from '@shared/ui';
import type { Meta, StoryObj } from '@storybook/react-vite';
import { useState } from 'react';

type Size = 'sm' | 'md' | 'lg';

type StoryArgs = {
    label?: string;
    description?: string;
    size: Size;
    disabled?: boolean;
    required?: boolean;
    containerClassName?: string;
    hasError?: boolean;
    errorMessage?: string;
    initialChecked?: boolean;
};

const meta = {
    title: 'Shared/Checkbox',
    component: Checkbox,
    parameters: {
        layout: 'centered',
        docs: {
            description: {
                component: `
Checkboxes allow users to select one or more items from a set. This component supports label, description, error state and sizes.

Usage
\`\`\`tsx
import { Checkbox } from '@shared/ui';

// Uncontrolled
<Checkbox name="terms" label="I agree" defaultChecked />

// With description
<Checkbox name="updates" label="Email updates" description="Receive product news and offers" />

// Controlled
function Example() {
  const [checked, setChecked] = useState(false);
  return (
    <Checkbox
      name="optin"
      label="Subscribe"
      checked={checked}
      onChange={(e) => setChecked(e.target.checked)}
    />
  );
}
\`\`\`

Props
- label: ReactNode — Optional label rendered next to the control.
- description: ReactNode — Optional helper text below the label.
- error: string | boolean — Error state; when a string is provided, it is shown below.
- size: 'sm' | 'md' | 'lg' — Control size (default: 'md').
- containerClassName: string — Classes for the outer label wrapper.
- All native input props are supported (name, checked, defaultChecked, disabled, required, etc.).

Notes
- Uses native checkbox with CSS \`accent-color\` for theme-aware styling.
- The outer label wraps the control for a larger click target.
- Accessibility: sets \`aria-invalid\` and \`aria-describedby\` when description/error is present.
                `,
            },
        },
    },
    tags: ['autodocs'],
    argTypes: {
        label: { control: 'text', description: 'Label text' },
        description: { control: 'text', description: 'Helper description' },
        size: { control: { type: 'inline-radio' }, options: ['sm', 'md', 'lg'], description: 'Control size' },
        disabled: { control: 'boolean', description: 'Disabled state' },
        required: { control: 'boolean', description: 'Required state' },
        containerClassName: { control: 'text', description: 'Classes for label wrapper' },
        hasError: { control: 'boolean', description: 'Boolean error state' },
        errorMessage: { control: 'text', description: 'Error message (overrides boolean)' },
        initialChecked: { control: 'boolean', description: 'Initial checked state (playground only)' },
    },
} satisfies Meta<StoryArgs>;

export default meta;

type Story = StoryObj<StoryArgs>;

export const Playground: Story = {
    args: {
        label: 'I agree to the Terms',
        description: 'You can unsubscribe at any time.',
        size: 'md',
        disabled: false,
        required: false,
        containerClassName: '',
        hasError: false,
        errorMessage: '',
        initialChecked: false,
    },
    parameters: { docs: { description: { story: 'Interactive control center.' } } },
    render: (args) => {
        const [checked, setChecked] = useState(Boolean(args.initialChecked));
        const error = args.errorMessage ? args.errorMessage : args.hasError ? true : undefined;
        return (
            <Checkbox
                name="playground"
                label={args.label}
                description={args.description}
                size={args.size}
                disabled={args.disabled}
                required={args.required}
                containerClassName={args.containerClassName}
                error={error}
                checked={checked}
                onChange={(e) => setChecked(e.target.checked)}
            />
        );
    },
};

export const Sizes: Story = {
    args: { size: 'md' },
    parameters: { docs: { description: { story: 'sm, md, lg sizes.' } } },
    render: () => (
        <div style={{ display: 'grid', gap: 12 }}>
            <Checkbox name="chk-sm" label="Small" size="sm" defaultChecked />
            <Checkbox name="chk-md" label="Medium" size="md" />
            <Checkbox name="chk-lg" label="Large" size="lg" />
        </div>
    ),
};

export const ErrorStates: Story = {
    parameters: { docs: { description: { story: 'Boolean error vs. string message.' } } },
    render: () => (
        <div style={{ display: 'grid', gap: 16 }}>
            <Checkbox name="err-bool" label="Boolean error" error />
            <Checkbox name="err-msg" label="With message" error="Please accept the terms" />
        </div>
    ),
};

export const DisabledAndRequired: Story = {
    parameters: { docs: { description: { story: 'Disabled and required examples.' } } },
    render: () => (
        <div style={{ display: 'grid', gap: 16 }}>
            <Checkbox name="req" label="Required" required />
            <Checkbox name="dis" label="Disabled" disabled defaultChecked />
        </div>
    ),
};

export const WithLongText: Story = {
    parameters: { docs: { description: { story: 'Long label and description wrapping.' } } },
    render: () => (
        <div style={{ width: 340 }}>
            <Checkbox
                name="long"
                label="I want to receive occasional emails about product updates, special offers, and events."
                description="We respect your privacy. No spam. Unsubscribe at any time."
            />
        </div>
    ),
};
