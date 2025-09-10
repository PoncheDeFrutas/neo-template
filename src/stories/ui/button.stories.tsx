import { Button } from '@shared/ui';
import type { Meta, StoryObj } from '@storybook/react-vite';
import { ArrowRight, ExternalLink, Mail, Save } from 'lucide-react';

type Variant = 'primary' | 'secondary' | 'outline' | 'ghost' | 'link' | 'destructive' | 'custom';
type Size = 'sm' | 'md' | 'lg' | 'icon';
type Shape = 'rounded' | 'square' | 'pill' | 'circle';

type StoryArgs = {
    as: 'button' | 'a';
    label?: string;
    variant: Variant;
    size: Size;
    shape: Shape;
    fullWidth?: boolean;
    loading?: boolean;
    disabled?: boolean;
    className?: string;
    href?: string;
    target?: string;
    withLeftIcon?: boolean;
    withRightIcon?: boolean;
};

const meta = {
    title: 'Shared/Button',
    component: Button,
    parameters: {
        layout: 'centered',
        docs: {
            description: {
                component: `
Buttons trigger actions or navigate to other views. This component supports multiple variants, sizes, shapes and can render as an anchor for links.

Usage
\`\`\`tsx
import { Button } from '@shared/ui';

// Primary action
<Button variant="primary" onClick={() => alert('Clicked!')}>Continue</Button>

// With icons
import { Mail, ArrowRight } from 'lucide-react';
<Button leftIcon={<Mail size={16} />} rightIcon={<ArrowRight size={16} />}>Contact</Button>

// As link
<Button as="a" variant="link" href="/docs">Docs</Button>

// Icon button
import { Save } from 'lucide-react';
<Button size="icon" aria-label="Save"><Save size={16} /></Button>

// Custom styles (variant="custom")
<Button variant="custom" className="bg-primary text-primary-foreground">Custom</Button>
\`\`\`

Props
- as: 'button' | 'a' — Render as a button or anchor (default: 'button').
- label/children: string | ReactNode — Content; use \`children\` for advanced layouts.
- variant: 'primary' | 'secondary' | 'outline' | 'ghost' | 'link' | 'destructive' | 'custom' (default: 'primary').
- size: 'sm' | 'md' | 'lg' | 'icon' — Visual size (default: 'md').
- shape: 'rounded' | 'square' | 'pill' | 'circle' (default: 'rounded').
- fullWidth: boolean — Stretch to full width.
- loading: boolean — Shows a spinner and sets aria-busy.
- leftIcon/rightIcon: ReactNode — Optional icons.
- className: string — Extra classes. When \`variant="custom"\`, built-in colors are omitted.
- href/target/rel: anchor attributes when \`as="a"\`.

Notes
- Accessibility: Loading state adds \`aria-busy\` and disables the control.
- Link variant uses minimal padding and underline style.
- Icon size expects only an icon as content; label is ignored.
                `,
            },
        },
    },
    tags: ['autodocs'],
    argTypes: {
        as: {
            control: { type: 'inline-radio' },
            options: ['button', 'a'],
            description: 'Render mode',
        },
        label: { control: 'text', description: 'Text label (or use children)' },
        variant: {
            control: { type: 'select' },
            options: ['primary', 'secondary', 'outline', 'ghost', 'link', 'destructive', 'custom'],
            description: 'Visual variant',
        },
        size: {
            control: { type: 'inline-radio' },
            options: ['sm', 'md', 'lg', 'icon'],
            description: 'Button size',
        },
        shape: {
            control: { type: 'inline-radio' },
            options: ['rounded', 'square', 'pill', 'circle'],
            description: 'Shape',
        },
        fullWidth: { control: 'boolean', description: 'Full width' },
        loading: { control: 'boolean', description: 'Loading state' },
        disabled: { control: 'boolean', description: 'Disabled state' },
        className: { control: 'text', description: 'Extra classes (for custom variant)' },
        href: { control: 'text', description: 'Link URL (when as="a")' },
        target: { control: 'text', description: 'Link target (when as="a")' },
        withLeftIcon: { control: 'boolean', description: 'Show left icon' },
        withRightIcon: { control: 'boolean', description: 'Show right icon' },
    },
} satisfies Meta<StoryArgs>;

export default meta;

type Story = StoryObj<StoryArgs>;

export const Playground: Story = {
    args: {
        as: 'button',
        label: 'Continue',
        variant: 'primary',
        size: 'md',
        shape: 'rounded',
        fullWidth: false,
        loading: false,
        disabled: false,
        className: '',
        href: '/docs',
        target: '_self',
        withLeftIcon: false,
        withRightIcon: false,
    },
    parameters: { docs: { description: { story: 'Interactive control center.' } } },
    render: (args) => {
        const { as, href, target, withLeftIcon, withRightIcon, label, ...rest } = args;
        const left = withLeftIcon ? <Mail size={16} /> : undefined;
        const right = withRightIcon ? <ArrowRight size={16} /> : undefined;
        const props: any = { as, label, leftIcon: left, rightIcon: right, ...rest };
        if (as === 'a') {
            props.href = href || '#';
            props.target = target;
            props.rel = target === '_blank' ? 'noreferrer noopener' : undefined;
        }
        return <Button {...props} />;
    },
};

export const Variants: Story = {
    args: { as: 'button', label: 'Action', size: 'md', shape: 'rounded', variant: 'primary' },
    parameters: { docs: { description: { story: 'All visual variants.' } } },
    render: (args) => (
        <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap' }}>
            <Button {...(args as any)} variant="primary" />
            <Button {...(args as any)} variant="secondary" />
            <Button {...(args as any)} variant="outline" />
            <Button {...(args as any)} variant="ghost" />
            <Button {...(args as any)} variant="link" />
            <Button {...(args as any)} variant="destructive" />
        </div>
    ),
};

export const Sizes: Story = {
    args: { as: 'button', label: 'Size', variant: 'primary', shape: 'rounded', size: 'md' },
    parameters: { docs: { description: { story: 'sm, md, lg and icon size.' } } },
    render: (args) => (
        <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap', alignItems: 'center' }}>
            <Button {...(args as any)} size="sm" />
            <Button {...(args as any)} size="md" />
            <Button {...(args as any)} size="lg" />
            <Button {...(args as any)} size="icon" aria-label="Save">
                <Save size={16} />
            </Button>
        </div>
    ),
};

export const Shapes: Story = {
    args: { as: 'button', label: 'Shape', variant: 'primary', size: 'md', shape: 'rounded' },
    parameters: { docs: { description: { story: 'rounded, square, pill, circle.' } } },
    render: (args) => (
        <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap', alignItems: 'center' }}>
            <Button {...(args as any)} shape="rounded" />
            <Button {...(args as any)} shape="square" />
            <Button {...(args as any)} shape="pill" />
            <Button {...(args as any)} shape="circle" />
        </div>
    ),
};

export const WithIcons: Story = {
    args: { as: 'button', label: 'Contact', variant: 'secondary', size: 'md', shape: 'rounded' },
    parameters: { docs: { description: { story: 'Left and right icons.' } } },
    render: (args) => (
        <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap', alignItems: 'center' }}>
            <Button {...(args as any)} leftIcon={<Mail size={16} />} />
            <Button {...(args as any)} rightIcon={<ArrowRight size={16} />} />
            <Button
                {...(args as any)}
                leftIcon={<Mail size={16} />}
                rightIcon={<ArrowRight size={16} />}
            />
        </div>
    ),
};

export const LoadingAndDisabled: Story = {
    args: { as: 'button', label: 'Processing', variant: 'primary', size: 'md', shape: 'rounded' },
    parameters: { docs: { description: { story: 'Loading and disabled states.' } } },
    render: (args) => (
        <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap', alignItems: 'center' }}>
            <Button {...(args as any)} loading />
            <Button {...(args as any)} disabled />
        </div>
    ),
};

export const FullWidth: Story = {
    args: { as: 'button', label: 'Full width', variant: 'outline', size: 'md', shape: 'rounded' },
    parameters: { docs: { description: { story: 'Stretch to full width.' } } },
    render: (args) => (
        <div style={{ width: 360 }}>
            <Button {...(args as any)} fullWidth />
        </div>
    ),
};

export const AsLink: Story = {
    args: {
        as: 'a',
        label: 'Open Docs',
        variant: 'link',
        size: 'md',
        shape: 'rounded',
        href: 'https://storybook.js.org',
        target: '_blank',
    },
    parameters: { docs: { description: { story: 'Rendered as an anchor with link variant.' } } },
    render: (args) => {
        const props: any = {
            ...args,
            rel: args.target === '_blank' ? 'noreferrer noopener' : undefined,
        };
        return <Button {...props} rightIcon={<ExternalLink size={16} />} />;
    },
};

export const Custom: Story = {
    args: {
        as: 'button',
        label: 'Custom',
        variant: 'custom',
        size: 'md',
        shape: 'rounded',
        className: 'bg-primary text-primary-foreground hover:opacity-90',
    },
    parameters: {
        docs: { description: { story: 'Provide your own classes when using variant="custom".' } },
    },
};
