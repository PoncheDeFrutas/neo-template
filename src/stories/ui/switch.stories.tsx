import { Switch } from '@shared/ui';
import type { Meta, StoryObj } from '@storybook/react-vite';
import { useState } from 'react';

type Size = 'sm' | 'md' | 'lg';

type StoryArgs = {
    label?: string;
    size: Size;
    disabled?: boolean;
    required?: boolean;
    name?: string;
    containerClassName?: string;
    initialChecked?: boolean;
};

const meta = {
    title: 'Shared/Switch',
    component: Switch,
    parameters: {
        layout: 'centered',
        docs: {
            description: {
                component: `
Switch toggles a single boolean setting on or off. It supports sizes and an optional label.

Usage
\`\`\`tsx
import { Switch } from '@shared/ui';

// Uncontrolled
<Switch name="notifications" label="Enable notifications" defaultChecked />

// Controlled
function Example() {
  const [on, setOn] = useState(false);
  return (
    <Switch name="airplane" label="Airplane mode" checked={on} onChange={(e) => setOn(e.target.checked)} />
  );
}
\`\`\`

Props
- label?: ReactNode — Optional label rendered to the right.
- size?: 'sm' | 'md' | 'lg' — Control size (default: 'md').
- containerClassName?: string — Classes for the outer label wrapper.
- Supports all native input props (name, checked, defaultChecked, disabled, required, etc.).

Notes
- The entire control is wrapped in a label to enlarge the click area.
- The track and thumb animate smoothly between states.
                `,
            },
        },
    },
    tags: ['autodocs'],
    argTypes: {
        label: { control: 'text', description: 'Label text' },
        size: {
            control: { type: 'inline-radio' },
            options: ['sm', 'md', 'lg'],
            description: 'Control size',
        },
        disabled: { control: 'boolean', description: 'Disabled state' },
        required: { control: 'boolean', description: 'Required state' },
        name: { control: 'text', description: 'Input name' },
        containerClassName: { control: 'text', description: 'Container classes' },
        initialChecked: { control: 'boolean', description: 'Initial checked (playground only)' },
    },
} satisfies Meta<any>;

export default meta;

type Story = StoryObj<StoryArgs>;

export const Playground: Story = {
    args: {
        label: 'Enable notifications',
        size: 'md',
        disabled: false,
        required: false,
        name: 'switch-playground',
        containerClassName: '',
        initialChecked: false,
    },
    parameters: { docs: { description: { story: 'Interactive control center.' } } },
    render: (args) => {
        const [on, setOn] = useState(Boolean(args.initialChecked));
        return (
            <Switch
                name={args.name}
                label={args.label}
                size={args.size}
                disabled={args.disabled}
                required={args.required}
                containerClassName={args.containerClassName}
                checked={on}
                onChange={(e) => setOn(e.target.checked)}
            />
        );
    },
};

export const Sizes: Story = {
    args: { label: 'Label', size: 'md', name: 'sizes' },
    parameters: { docs: { description: { story: 'sm, md, lg sizes.' } } },
    render: (args) => (
        <div style={{ display: 'grid', gap: 12 }}>
            <Switch name={args.name} label="Small" size="sm" defaultChecked />
            <Switch name={args.name} label="Medium" size="md" />
            <Switch name={args.name} label="Large" size="lg" />
        </div>
    ),
};

export const States: Story = {
    parameters: { docs: { description: { story: 'Disabled and required examples.' } } },
    render: () => (
        <div style={{ display: 'grid', gap: 16 }}>
            <Switch name="req" label="Required" required />
            <Switch name="dis" label="Disabled" disabled defaultChecked />
        </div>
    ),
};

export const Controlled: Story = {
    parameters: { docs: { description: { story: 'Controlled usage with state.' } } },
    render: () => {
        const [on, setOn] = useState(true);
        return (
            <Switch
                name="wifi"
                label="Wi‑Fi"
                checked={on}
                onChange={(e) => setOn(e.target.checked)}
            />
        );
    },
};
