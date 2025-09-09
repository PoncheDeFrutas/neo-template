import { Avatar } from '@shared/ui';
import type { Meta, StoryObj } from '@storybook/react-vite';

type Size = 'xs' | 'sm' | 'md' | 'lg' | 'xl';
type Rounded = 'sm' | 'md' | 'lg' | 'xl' | 'full';

type StoryArgs = {
    src?: string;
    alt?: string;
    name?: string;
    size: Size;
    rounded: Rounded;
    className?: string;
};

const meta = {
    title: 'Shared/Avatar',
    component: Avatar,
    parameters: {
        layout: 'centered',
        docs: {
            description: {
                component: `
Avatar displays a user's photo or, as a fallback, the initials computed from 
\`name\` or \`alt\`.

Usage
\`\`\`tsx
import { Avatar } from '@shared/ui';

// With image
<Avatar src="https://i.pravatar.cc/160?img=5" alt="Jane Cooper" size="md" rounded="full" />

// With initials (fallback)
<Avatar name="Jane Cooper" size="md" rounded="full" />

// Custom size & shape
<Avatar name="Project X" size="lg" rounded="xl" />
\`\`\`

Props
- src: string | optional — Image URL. If it fails, initials are shown.
- alt: string | optional — Image alt text; also used to compute initials when \`name\` is not provided.
- name: string | optional — Text to compute initials from.
- size: 'xs' | 'sm' | 'md' | 'lg' | 'xl' — Visual size (default: 'md').
- rounded: 'sm' | 'md' | 'lg' | 'xl' | 'full' — Border radius (default: 'full').
- className: string | optional — Extra classes applied to the container.

Notes
- Initials are derived from \`name\` if provided, otherwise from \`alt\`.
- When \`src\` is provided but image fails to load, the component shows initials.
                `,
            },
        },
    },
    tags: ['autodocs'],
    argTypes: {
        size: {
            control: { type: 'inline-radio' },
            options: ['xs', 'sm', 'md', 'lg', 'xl'],
            description: 'Avatar size',
        },
        rounded: {
            control: { type: 'inline-radio' },
            options: ['sm', 'md', 'lg', 'xl', 'full'],
            description: 'Border radius',
        },
        name: { control: 'text', description: 'Name used for initials' },
        alt: { control: 'text', description: 'Alt text, also used for initials' },
        src: { control: 'text', description: 'Image URL' },
        className: { control: 'text', description: 'Extra classes' },
    },
} satisfies Meta<StoryArgs>;

export default meta;

type Story = StoryObj<StoryArgs>;

const sampleImage = 'https://i.pravatar.cc/160?img=5';


export const Playground: Story = {
    args: {
        name: 'Jane Cooper',
        alt: 'Jane Cooper',
        src: sampleImage,
        size: 'md',
        rounded: 'full',
        className: '',
    },
    parameters: {
        docs: {
            description: {
                story: `
Interactive control center. Tweak the props.
                `,
            },
        },
    },
    render: (args) => {
        return (
            <div style={{ display: 'grid', gap: 16, placeItems: 'center' }}>
                <Avatar {...args} />
            </div>
        );
    },
};

export const Sizes: Story = {
    args: { name: 'JS', rounded: 'full', size: 'md' },
    parameters: {
        docs: {
            description: {
                story: 'Available sizes: xs, sm, md, lg, xl.',
            },
        },
    },
    render: (args) => (
        <div style={{ display: 'flex', gap: 12, alignItems: 'center' }}>
            <Avatar {...args} size="xs" />
            <Avatar {...args} size="sm" />
            <Avatar {...args} size="md" />
            <Avatar {...args} size="lg" />
            <Avatar {...args} size="xl" />
        </div>
    ),
};

export const Rounded: Story = {
    args: { name: 'Jane Cooper', size: 'md', rounded: 'full' },
    parameters: {
        docs: {
            description: {
                story: 'Border radius variations: sm, md, lg, xl, full.',
            },
        },
    },
    render: (args) => (
        <div style={{ display: 'flex', gap: 12, alignItems: 'center' }}>
            <Avatar {...args} rounded="sm" />
            <Avatar {...args} rounded="md" />
            <Avatar {...args} rounded="lg" />
            <Avatar {...args} rounded="xl" />
            <Avatar {...args} rounded="full" />
        </div>
    ),
};

export const WithImage: Story = {
    args: { src: sampleImage, alt: 'Jane Cooper', size: 'lg', rounded: 'full' },
    parameters: {
        docs: {
            description: { story: 'Displays image when src is provided and loads successfully.' },
        },
    },
};

export const WithInitials: Story = {
    args: { name: 'Jane Cooper', size: 'lg', rounded: 'full' },
    parameters: {
        docs: {
            description: { story: 'Shows initials when no src is provided.' },
        },
    },
};

export const ErrorFallback: Story = {
    args: {
        src: 'https://example.com/non-existing-image.png',
        alt: 'Broken Image',
        name: 'Broken Image',
        size: 'lg',
        rounded: 'full',
    },
    parameters: {
        docs: {
            description: {
                story:
                    'If the image fails to load, Avatar falls back to initials computed from name or alt.',
            },
        },
    },
};
