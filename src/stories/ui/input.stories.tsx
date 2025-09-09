import { Input } from '@shared/ui';
import type { Meta, StoryObj } from '@storybook/react-vite';
import { Mail, Lock, Phone, Search, Hash } from 'lucide-react';
import { useState } from 'react';

type Size = 'sm' | 'md' | 'lg';
type Type = 'text' | 'email' | 'password' | 'number' | 'tel' | 'date';
type Spin = 'native' | 'hidden' | 'custom';

type StoryArgs = {
    label?: string;
    placeholder?: string;
    hint?: string;
    error?: string;
    success?: string;
    size: Size;
    fullWidth: boolean;
    type: Type;
    passwordToggle?: boolean;
    numberSpinButtons?: Spin;
    disabled?: boolean;
    required?: boolean;
    className?: string;
    containerClassName?: string;
    inputClassName?: string;
    withLeftIcon?: boolean;
    withRightIcon?: boolean;
};

const meta = {
    title: 'Shared/Input',
    component: Input,
    parameters: {
        layout: 'padded',
        docs: {
            description: {
                component: `
Inputs collect user text, email, numbers and more. Supports icons, password visibility toggle and custom number spin buttons.

Usage
\`\`\`tsx
import { Input } from '@shared/ui';
import { Mail } from 'lucide-react';

// Basic
<Input label="Email" type="email" placeholder="name@domain.com" />

// With icons
<Input label="Search" placeholder="Search..." leftIcon={<Mail size={16} />} />

// Password with visibility toggle
<Input label="Password" type="password" passwordToggle />

// Number with custom spin buttons
<Input label="Quantity" type="number" numberSpinButtons="custom" />
\`\`\`

Props
- label?: string — Optional label.
- hint?: string — Helper text below.
- error?: string | boolean — Error state (string message shown below).
- success?: string | boolean — Success message (string only).
- leftIcon/rightIcon?: ReactNode — Optional icons.
- size: 'sm' | 'md' | 'lg' — Control size (default: 'md').
- fullWidth: boolean — Stretch to container width (default: true).
- type: 'text' | 'email' | 'password' | 'number' | 'tel' | 'date' — Input type.
- passwordToggle?: boolean — Adds show/hide toggle for password inputs.
- numberSpinButtons?: 'native' | 'hidden' | 'custom' — Native spinners, hidden, or custom small buttons.
- containerClassName/inputClassName/className: string — Style overrides.

Notes
- Accessibility: announces hint/error via aria-describedby and marks invalid state.
- For type="number", set numberSpinButtons to 'custom' to use the built-in small buttons.
                `,
            },
        },
    },
    tags: ['autodocs'],
    argTypes: {
        label: { control: 'text', description: 'Label text' },
        placeholder: { control: 'text', description: 'Placeholder text' },
        hint: { control: 'text', description: 'Helper text' },
        error: { control: 'text', description: 'Error message (string)' },
        success: { control: 'text', description: 'Success message (string)' },
        size: { control: { type: 'inline-radio' }, options: ['sm', 'md', 'lg'], description: 'Size' },
        fullWidth: { control: 'boolean', description: 'Full width' },
        type: {
            control: { type: 'select' },
            options: ['text', 'email', 'password', 'number', 'tel', 'date'],
            description: 'Input type',
        },
        passwordToggle: { control: 'boolean', description: 'Show password toggle (password type)' },
        numberSpinButtons: {
            control: { type: 'inline-radio' },
            options: ['native', 'hidden', 'custom'],
            description: 'Number spin buttons mode',
        },
        disabled: { control: 'boolean', description: 'Disabled state' },
        required: { control: 'boolean', description: 'Required state' },
        className: { control: 'text', description: 'Additional input classes' },
        containerClassName: { control: 'text', description: 'Container classes' },
        inputClassName: { control: 'text', description: 'Input inner classes' },
        withLeftIcon: { control: 'boolean', description: 'Show example left icon' },
        withRightIcon: { control: 'boolean', description: 'Show example right icon' },
    },
} satisfies Meta<any>;

export default meta;

type Story = StoryObj<StoryArgs>;

function pickLeftIcon(t: Type) {
    switch (t) {
        case 'email':
            return <Mail size={16} />;
        case 'password':
            return <Lock size={16} />;
        case 'tel':
            return <Phone size={16} />;
        case 'number':
            return <Hash size={16} />;
        default:
            return <Search size={16} />;
    }
}

export const Playground: Story = {
    args: {
        label: 'Label',
        placeholder: 'Placeholder',
        hint: 'Helper text',
        error: '',
        success: '',
        size: 'md',
        fullWidth: true,
        type: 'text',
        passwordToggle: true,
        numberSpinButtons: 'native',
        disabled: false,
        required: false,
        className: '',
        containerClassName: '',
        inputClassName: '',
        withLeftIcon: false,
        withRightIcon: false,
    },
    parameters: { docs: { description: { story: 'Interactive control center.' } } },
    render: (args) => {
        const [value, setValue] = useState('');
        const left = args.withLeftIcon ? pickLeftIcon(args.type) : undefined;
        const right = args.withRightIcon ? <Search size={16} /> : undefined;
        const error = args.error ? args.error : undefined;
        const success = args.success ? args.success : undefined;
        return (
            <div style={{ display: 'grid', gap: 12, maxWidth: 560 }}>
                <Input
                    label={args.label}
                    placeholder={args.placeholder}
                    hint={args.hint}
                    error={error}
                    success={success}
                    size={args.size}
                    fullWidth={args.fullWidth}
                    type={args.type}
                    passwordToggle={args.passwordToggle}
                    numberSpinButtons={args.numberSpinButtons}
                    disabled={args.disabled}
                    required={args.required}
                    className={args.className}
                    containerClassName={args.containerClassName}
                    inputClassName={args.inputClassName}
                    leftIcon={left}
                    rightIcon={right}
                    value={value}
                    onChange={(e) => setValue(e.target.value)}
                />
            </div>
        );
    },
};

export const Sizes: Story = {
    args: { label: 'Label', placeholder: 'Placeholder', size: 'md', type: 'text', fullWidth: false },
    parameters: { docs: { description: { story: 'sm, md, lg control sizes.' } } },
    render: (args) => (
        <div style={{ display: 'grid', gap: 16, maxWidth: 520 }}>
            <Input {...(args as any)} size="sm" label="Small" />
            <Input {...(args as any)} size="md" label="Medium" />
            <Input {...(args as any)} size="lg" label="Large" />
        </div>
    ),
};

export const Types: Story = {
    parameters: { docs: { description: { story: 'Common input types.' } } },
    render: () => (
        <div style={{ display: 'grid', gap: 16, maxWidth: 520 }}>
            <Input label="Text" placeholder="Text" type="text" />
            <Input label="Email" placeholder="name@domain.com" type="email" leftIcon={<Mail size={16} />} />
            <Input label="Password" placeholder="••••••••" type="password" passwordToggle />
            <Input label="Phone" placeholder="(555) 123-4567" type="tel" leftIcon={<Phone size={16} />} />
            <Input label="Number" placeholder="0" type="number" numberSpinButtons="custom" />
            <Input label="Date" type="date" />
        </div>
    ),
};

export const WithIcons: Story = {
    parameters: { docs: { description: { story: 'Left and right icon examples.' } } },
    render: () => (
        <div style={{ display: 'grid', gap: 16, maxWidth: 520 }}>
            <Input label="Search" placeholder="Search..." leftIcon={<Search size={16} />} />
            <Input label="Amount" placeholder="0.00" rightIcon={<Hash size={16} />} />
            <Input label="Email" placeholder="name@domain.com" leftIcon={<Mail size={16} />} rightIcon={<Search size={16} />} />
        </div>
    ),
};

export const PasswordToggle: Story = {
    parameters: { docs: { description: { story: 'Password field with visibility toggle.' } } },
    render: () => <Input label="Password" placeholder="••••••••" type="password" passwordToggle />,
};

export const NumberSpinButtons: Story = {
    parameters: { docs: { description: { story: 'Native, hidden, and custom number spinners.' } } },
    render: () => (
        <div style={{ display: 'grid', gap: 16, maxWidth: 520 }}>
            <Input label="Native" type="number" numberSpinButtons="native" />
            <Input label="Hidden" type="number" numberSpinButtons="hidden" />
            <Input label="Custom" type="number" numberSpinButtons="custom" />
        </div>
    ),
};

export const States: Story = {
    parameters: { docs: { description: { story: 'Disabled, required, error and success states.' } } },
    render: () => (
        <div style={{ display: 'grid', gap: 16, maxWidth: 520 }}>
            <Input label="Disabled" placeholder="Disabled" disabled />
            <Input label="Required" placeholder="Required" required />
            <Input label="Error" placeholder="Error" error="This field is required" />
            <Input label="Success" placeholder="Success" success="Looks good" />
        </div>
    ),
};

export const FullWidth: Story = {
    args: { label: 'Full width', placeholder: 'Stretches to container', fullWidth: true, type: 'text', size: 'md' },
    parameters: { docs: { description: { story: 'Input expands to the container width.' } } },
    render: (args) => (
        <div style={{ width: 360 }}>
            <Input {...(args as any)} />
        </div>
    ),
};

