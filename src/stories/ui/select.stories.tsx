import { Select } from '@shared/ui';
import type { Meta, StoryObj } from '@storybook/react-vite';
import { Mail, Search } from 'lucide-react';

type Size = 'sm' | 'md' | 'lg';
type Variant = 'outline' | 'filled' | 'ghost';

type StoryArgs = {
    label?: string;
    hint?: string;
    error?: string;
    success?: string;
    placeholder?: string;
    size: Size;
    fullWidth: boolean;
    leftIcon?: boolean;
    rightIcon?: boolean;
    containerClassName?: string;
    selectClassName?: string;
    variant: Variant;
    disabled?: boolean;
    required?: boolean;
    multiple?: boolean;
    useChildren?: boolean;
};

const options = [
    { label: 'Apple', value: 'apple' },
    { label: 'Banana', value: 'banana' },
    { label: 'Cherry', value: 'cherry' },
    { label: 'Dragonfruit', value: 'dragon' },
];

const meta = {
    title: 'Shared/Select',
    component: Select,
    parameters: {
        layout: 'padded',
        docs: {
            description: {
                component: `
Select renders a native <select> with theme-aware styles, icons, variants and sizes. You can pass options via the \`options\` prop or as children.

Usage
\`\`\`tsx
import { Select } from '@shared/ui';

// With options prop
<Select label="Fruit" placeholder="Choose..." options={[
  { label: 'Apple', value: 'apple' },
  { label: 'Banana', value: 'banana' }
]} />

// With children
<Select label="Fruit" placeholder="Choose...">
  <option value="apple">Apple</option>
  <option value="banana">Banana</option>
</Select>
\`\`\`

Props
- label, hint, error, success, placeholder
- size: 'sm' | 'md' | 'lg' — Control height
- fullWidth: boolean — Stretch to container width
- leftIcon/rightIcon: ReactNode — Optional leading/trailing icons
- variant: 'outline' | 'filled' | 'ghost' — Visual style
- options?: { label: ReactNode; value: string; disabled?: boolean }[] — Alternative to passing children
- Supports all native select props (multiple, disabled, required, value/defaultValue, etc.)

Notes
- When \`placeholder\` is set and no value is provided, a disabled first option is automatically rendered.
- For multiple selection, the chevron is hidden and rightIcon is ignored.
                `,
            },
        },
    },
    tags: ['autodocs'],
    argTypes: {
        label: { control: 'text', description: 'Label text' },
        hint: { control: 'text', description: 'Helper text' },
        error: { control: 'text', description: 'Error message' },
        success: { control: 'text', description: 'Success message' },
        placeholder: { control: 'text', description: 'Placeholder (single select only)' },
        size: {
            control: { type: 'inline-radio' },
            options: ['sm', 'md', 'lg'],
            description: 'Control size',
        },
        fullWidth: { control: 'boolean', description: 'Full width' },
        leftIcon: { control: 'boolean', description: 'Show example left icon' },
        rightIcon: { control: 'boolean', description: 'Show example right icon' },
        containerClassName: { control: 'text', description: 'Container classes' },
        selectClassName: { control: 'text', description: 'Select classes' },
        variant: {
            control: { type: 'inline-radio' },
            options: ['outline', 'filled', 'ghost'],
            description: 'Visual style',
        },
        disabled: { control: 'boolean', description: 'Disabled state' },
        required: { control: 'boolean', description: 'Required state' },
        multiple: { control: 'boolean', description: 'Enable multiple selection' },
        useChildren: {
            control: 'boolean',
            description: 'Render options via children instead of options prop',
        },
    },
} satisfies Meta<any>;

export default meta;

type Story = StoryObj<StoryArgs>;

export const Playground: Story = {
    args: {
        label: 'Fruit',
        hint: 'Pick your favorite fruit',
        error: '',
        success: '',
        placeholder: 'Choose...',
        size: 'md',
        fullWidth: true,
        leftIcon: false,
        rightIcon: false,
        containerClassName: '',
        selectClassName: '',
        variant: 'outline',
        disabled: false,
        required: false,
        multiple: false,
        useChildren: false,
    },
    parameters: { docs: { description: { story: 'Interactive control center.' } } },
    render: (args) => (
        <Select
            label={args.label}
            hint={args.hint}
            error={args.error || undefined}
            success={args.success || undefined}
            placeholder={args.placeholder}
            size={args.size}
            fullWidth={args.fullWidth}
            leftIcon={args.leftIcon ? <Search size={16} /> : undefined}
            rightIcon={args.rightIcon ? <Mail size={16} /> : undefined}
            containerClassName={args.containerClassName}
            selectClassName={args.selectClassName}
            variant={args.variant}
            disabled={args.disabled}
            required={args.required}
            multiple={args.multiple}
            options={!args.useChildren ? options : undefined}
        >
            {args.useChildren ? (
                <>
                    <option value="apple">Apple</option>
                    <option value="banana">Banana</option>
                    <option value="cherry">Cherry</option>
                </>
            ) : null}
        </Select>
    ),
};

export const Variants: Story = {
    args: { label: 'Variant', placeholder: 'Choose...', fullWidth: false },
    parameters: { docs: { description: { story: 'outline, filled, ghost.' } } },
    render: (args) => (
        <div style={{ display: 'grid', gap: 12, maxWidth: 420 }}>
            <Select {...(args as any)} variant="outline" options={options} />
            <Select {...(args as any)} variant="filled" options={options} />
            <Select {...(args as any)} variant="ghost" options={options} />
        </div>
    ),
};

export const Sizes: Story = {
    args: { label: 'Size', placeholder: 'Choose...', variant: 'outline', fullWidth: false },
    parameters: { docs: { description: { story: 'sm, md, lg heights.' } } },
    render: (args) => (
        <div style={{ display: 'grid', gap: 12, maxWidth: 420 }}>
            <Select {...(args as any)} size="sm" options={options} />
            <Select {...(args as any)} size="md" options={options} />
            <Select {...(args as any)} size="lg" options={options} />
        </div>
    ),
};

export const WithIcons: Story = {
    args: { label: 'With icons', placeholder: 'Choose...', variant: 'outline', fullWidth: false },
    parameters: { docs: { description: { story: 'Leading and trailing icons.' } } },
    render: (args) => (
        <Select
            {...(args as any)}
            leftIcon={<Search size={16} />}
            rightIcon={<Mail size={16} />}
            options={options}
        />
    ),
};

export const Multiple: Story = {
    args: { label: 'Multiple', placeholder: 'Choose...', fullWidth: false, variant: 'outline' },
    parameters: { docs: { description: { story: 'Enable multiple selection (chevron hidden).' } } },
    render: (args) => <Select {...(args as any)} multiple options={options} />,
};

export const WithChildren: Story = {
    args: { label: 'Children', placeholder: 'Choose...', fullWidth: false, variant: 'outline' },
    parameters: { docs: { description: { story: 'Render <option> elements as children.' } } },
    render: (args) => (
        <Select {...(args as any)}>
            <option value="apple">Apple</option>
            <option value="banana">Banana</option>
            <option value="cherry">Cherry</option>
        </Select>
    ),
};

export const States: Story = {
    parameters: {
        docs: { description: { story: 'Disabled, required, error and success messages.' } },
    },
    render: () => (
        <div style={{ display: 'grid', gap: 12, maxWidth: 420 }}>
            <Select label="Disabled" disabled options={options} />
            <Select label="Required" required options={options} />
            <Select label="Error" error="Please select a value" options={options} />
            <Select label="Success" success="Looks good" options={options} />
        </div>
    ),
};
