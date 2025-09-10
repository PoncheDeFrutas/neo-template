import { Avatar, Button, ListItem } from '@shared/ui';
import type { Meta, StoryObj } from '@storybook/react-vite';
import { Edit3, Mail, MoreHorizontal, Phone, Trash2 } from 'lucide-react';

type Size = 'sm' | 'md' | 'lg';
type Align = 'center' | 'start';
type Rounded = 'none' | 'md' | 'lg' | 'full';

type StoryArgs = {
    title: string;
    subtitle?: string;
    meta?: string;
    withMedia?: boolean;
    mediaType?: 'avatar' | 'icon';
    avatarName?: string;
    avatarSrc?: string;
    rounded: Rounded;
    size: Size;
    align: Align;
    hoverable: boolean;
    as?: 'div' | 'a' | 'button';
    href?: string;
    disabled?: boolean;
    withActions?: boolean;
};

const meta = {
    title: 'Shared/ListItem',
    component: ListItem,
    parameters: {
        layout: 'padded',
        docs: {
            description: {
                component: `
ListItem presents a compact row with optional media (avatar/icon), title, subtitle, right-side meta and actions. Can render as static div, link or button.

Usage
\`\`\`tsx
import { ListItem, Avatar, Button } from '@shared/ui';

// Static item
<ListItem title="Mariana Silva" subtitle="Product Designer" />

// With avatar and actions
<ListItem
  media={<Avatar name="Mariana Silva" />}
  title="Mariana Silva"
  subtitle="Product Designer"
  meta="Online"
  actions={<>
    <Button size="sm" variant="ghost">Message</Button>
    <Button size="sm" variant="outline">Call</Button>
  </>}
/>

// As link
<ListItem href="/users/1" title="View profile" />

// As button
<ListItem onClick={() => {}} title="Invite" />
\`\`\`

Props
- media?: ReactNode — Left slot (e.g., Avatar or icon)
- title: ReactNode — Primary text
- subtitle?: ReactNode — Secondary text
- meta?: ReactNode — Right-aligned small text
- actions?: ReactNode — Right-aligned actions (e.g., Buttons)
- href/target/rel: render as anchor when \`href\` is provided
- onClick/disabled/type: render as button when \`onClick\` is provided
- size: 'sm' | 'md' | 'lg' — Spacing and density
- align: 'center' | 'start' — Vertical alignment of content
- rounded: 'none' | 'md' | 'lg' | 'full' — Container radius
- hoverable: boolean — Hover background when clickable

Notes
- When \`href\` is set, it renders an \`<a>\`; when \`onClick\` is passed, it renders a \`<button>\`. Otherwise, it renders a \`<div role="listitem">\`.
- Use the \`media\` slot for avatars, icons or thumbnails.
                `,
            },
        },
    },
    tags: ['autodocs'],
    argTypes: {
        title: { control: 'text', description: 'Primary text' },
        subtitle: { control: 'text', description: 'Secondary text' },
        meta: { control: 'text', description: 'Right-aligned meta text' },
        withMedia: { control: 'boolean', description: 'Show media on the left' },
        mediaType: {
            control: { type: 'inline-radio' },
            options: ['avatar', 'icon'],
            description: 'Media type',
        },
        avatarName: { control: 'text', description: 'Avatar name (for initials)' },
        avatarSrc: { control: 'text', description: 'Avatar image URL' },
        rounded: {
            control: { type: 'inline-radio' },
            options: ['none', 'md', 'lg', 'full'],
            description: 'Container radius',
        },
        size: {
            control: { type: 'inline-radio' },
            options: ['sm', 'md', 'lg'],
            description: 'Density',
        },
        align: {
            control: { type: 'inline-radio' },
            options: ['center', 'start'],
            description: 'Vertical alignment',
        },
        hoverable: { control: 'boolean', description: 'Hover background on interactive items' },
        as: {
            control: { type: 'inline-radio' },
            options: ['div', 'a', 'button'],
            description: 'Rendered element',
        },
        href: { control: 'text', description: 'Link URL (when as="a")' },
        disabled: { control: 'boolean', description: 'Disabled (when as="button")' },
        withActions: { control: 'boolean', description: 'Show example actions on the right' },
    },
} satisfies Meta<any>;

export default meta;

type Story = StoryObj<StoryArgs>;

function mediaNode(args: StoryArgs) {
    if (!args.withMedia) return undefined;
    if (args.mediaType === 'icon') return <MoreHorizontal size={18} />;
    return <Avatar name={args.avatarName || 'MS'} src={args.avatarSrc} size="sm" />;
}

function actionsNode(show: boolean) {
    if (!show) return undefined;
    return (
        <>
            <Button size="sm" variant="ghost" leftIcon={<Mail size={14} />}>
                Email
            </Button>
            <Button size="sm" variant="outline" leftIcon={<Phone size={14} />}>
                Call
            </Button>
        </>
    );
}

export const Playground: Story = {
    args: {
        title: 'Mariana Silva',
        subtitle: 'Product Designer',
        meta: 'Online',
        withMedia: true,
        mediaType: 'avatar',
        avatarName: 'Mariana Silva',
        avatarSrc: '',
        rounded: 'md',
        size: 'md',
        align: 'center',
        hoverable: true,
        as: 'div',
        href: '#',
        disabled: false,
        withActions: true,
    },
    parameters: { docs: { description: { story: 'Interactive control center.' } } },
    render: (args) => {
        const media = mediaNode(args);
        const actions = actionsNode(args.withActions || false);
        const common = {
            media,
            title: args.title,
            subtitle: args.subtitle,
            meta: args.meta,
            size: args.size,
            align: args.align,
            rounded: args.rounded,
            hoverable: args.hoverable,
            actions,
        } as any;
        if (args.as === 'a') {
            return <ListItem {...common} href={args.href || '#'} />;
        }
        if (args.as === 'button') {
            return <ListItem {...common} onClick={() => {}} disabled={args.disabled} />;
        }
        return <ListItem {...common} />;
    },
};

export const Sizes: Story = {
    args: {
        title: 'Title',
        subtitle: 'Subtitle',
        withMedia: true,
        mediaType: 'avatar',
        rounded: 'md',
        align: 'center',
        hoverable: true,
    },
    parameters: { docs: { description: { story: 'sm, md, lg density.' } } },
    render: (args) => (
        <div style={{ display: 'grid', gap: 12, maxWidth: 520 }}>
            <ListItem {...(args as any)} size="sm" media={<Avatar name="SM" size="sm" />} />
            <ListItem {...(args as any)} size="md" media={<Avatar name="MD" size="sm" />} />
            <ListItem {...(args as any)} size="lg" media={<Avatar name="LG" size="sm" />} />
        </div>
    ),
};

export const Alignments: Story = {
    args: {
        title: 'Two-line item',
        subtitle: 'Secondary line',
        withMedia: true,
        mediaType: 'avatar',
        size: 'md',
        rounded: 'md',
        hoverable: true,
    },
    parameters: { docs: { description: { story: 'Center vs start vertical alignment.' } } },
    render: (args) => (
        <div style={{ display: 'grid', gap: 12, maxWidth: 520 }}>
            <ListItem {...(args as any)} align="center" media={<Avatar name="MC" size="sm" />} />
            <ListItem {...(args as any)} align="start" media={<Avatar name="MS" size="sm" />} />
        </div>
    ),
};

export const Rounded: Story = {
    args: {
        title: 'Rounded item',
        subtitle: 'Visual radius',
        withMedia: true,
        mediaType: 'avatar',
        size: 'md',
        align: 'center',
        hoverable: true,
    },
    parameters: { docs: { description: { story: 'none, md, lg, full.' } } },
    render: (args) => (
        <div style={{ display: 'grid', gap: 12, maxWidth: 520 }}>
            <ListItem {...(args as any)} rounded="none" media={<Avatar name="N" size="sm" />} />
            <ListItem {...(args as any)} rounded="md" media={<Avatar name="M" size="sm" />} />
            <ListItem {...(args as any)} rounded="lg" media={<Avatar name="L" size="sm" />} />
            <ListItem {...(args as any)} rounded="full" media={<Avatar name="F" size="sm" />} />
        </div>
    ),
};

export const WithMetaAndActions: Story = {
    parameters: { docs: { description: { story: 'Right-aligned meta and action buttons.' } } },
    render: () => (
        <div style={{ display: 'grid', gap: 12, maxWidth: 620 }}>
            <ListItem
                media={<Avatar name="JS" size="sm" />}
                title="Juan Sánchez"
                subtitle="Sales Manager"
                meta="Online"
                actions={
                    <>
                        <Button size="sm" variant="ghost" leftIcon={<Mail size={14} />}>
                            Email
                        </Button>
                        <Button size="sm" variant="outline" leftIcon={<Phone size={14} />}>
                            Call
                        </Button>
                        <Button size="sm" variant="ghost" leftIcon={<Edit3 size={14} />}>
                            Edit
                        </Button>
                        <Button size="sm" variant="destructive" leftIcon={<Trash2 size={14} />}>
                            Remove
                        </Button>
                    </>
                }
            />
        </div>
    ),
};

export const AsLinkAndButton: Story = {
    parameters: { docs: { description: { story: 'Rendering as anchor and button.' } } },
    render: () => (
        <div style={{ display: 'grid', gap: 12, maxWidth: 520 }}>
            <ListItem
                href="#"
                media={<Avatar name="Link" size="sm" />}
                title="Open profile"
                subtitle="Anchor item"
                meta="Link"
            />
            <ListItem
                onClick={() => {}}
                media={<Avatar name="Btn" size="sm" />}
                title="Select user"
                subtitle="Button item"
                meta="Action"
            />
        </div>
    ),
};

export const ListExample: Story = {
    parameters: { docs: { description: { story: 'Stacked list using multiple items.' } } },
    render: () => (
        <div role="list" style={{ display: 'grid', gap: 8, maxWidth: 560 }}>
            {[
                { name: 'Ana López', role: 'UX Researcher' },
                { name: 'Mariana Silva', role: 'Product Designer' },
                { name: 'Pedro Castillo', role: 'Engineer' },
            ].map((u) => (
                <ListItem
                    key={u.name}
                    media={<Avatar name={u.name} size="sm" />}
                    title={u.name}
                    subtitle={u.role}
                    meta="Active"
                    actions={<Button size="sm">Message</Button>}
                />
            ))}
        </div>
    ),
};
