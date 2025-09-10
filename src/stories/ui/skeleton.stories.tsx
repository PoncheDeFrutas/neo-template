import { Skeleton } from '@shared/ui';
import type { Meta, StoryObj } from '@storybook/react-vite';

type Shape = 'text' | 'rect' | 'circle';
type Animate = 'shimmer' | 'pulse' | 'none';
type Rounded = 'none' | 'sm' | 'md' | 'lg' | 'xl' | '2xl' | 'full';

type StoryArgs = {
    shape: Shape;
    width?: number | string;
    height?: number | string;
    rounded: Rounded;
    lines: number;
    gap: number;
    animate: Animate;
    className?: string;
};

const meta = {
    title: 'Shared/Skeleton',
    component: Skeleton,
    parameters: {
        layout: 'padded',
        docs: {
            description: {
                component: `
Skeleton is a lightweight loading placeholder. It supports text lines, rectangles, and circles with shimmer or pulse animation.

Usage
\`\`\`tsx
import { Skeleton } from '@shared/ui';

// Text lines
<Skeleton shape="text" lines={3} />

// Rectangle (e.g., image placeholder)
<Skeleton shape="rect" width={320} height={180} rounded="lg" />

// Circle (e.g., avatar)
<Skeleton shape="circle" width={40} height={40} />
\`\`\`

Props
- shape: 'text' | 'rect' | 'circle' — Visual form (default: 'rect').
- width?: number | string — CSS width; for text, controls line width.
- height?: number | string — CSS height; for text, controls line height.
- rounded?: 'none' | 'sm' | 'md' | 'lg' | 'xl' | '2xl' | 'full' — Radius for text/rect (default: 'md').
- lines?: number — For text shape, number of lines (default: 1).
- gap?: number — Pixel gap between text lines (default: 8).
- animate?: 'shimmer' | 'pulse' | 'none' — Animation (default: 'shimmer').
- className?: string — Extra classes.

Notes
- Text shape automatically shortens the last line for a more natural look.
- Use numbers for pixel sizes or strings for arbitrary CSS sizes (e.g., '100%', '2rem').
                `,
            },
        },
    },
    tags: ['autodocs'],
    argTypes: {
        shape: {
            control: { type: 'inline-radio' },
            options: ['text', 'rect', 'circle'],
            description: 'Skeleton shape',
        },
        width: { control: 'text', description: 'Width (number px or CSS string)' },
        height: { control: 'text', description: 'Height (number px or CSS string)' },
        rounded: {
            control: { type: 'inline-radio' },
            options: ['none', 'sm', 'md', 'lg', 'xl', '2xl', 'full'],
            description: 'Corner radius (text/rect)',
        },
        lines: { control: { type: 'number', min: 1, max: 10, step: 1 }, description: 'Text lines' },
        gap: {
            control: { type: 'number', min: 0, max: 24, step: 1 },
            description: 'Gap between text lines (px)',
        },
        animate: {
            control: { type: 'inline-radio' },
            options: ['shimmer', 'pulse', 'none'],
            description: 'Animation style',
        },
        className: { control: 'text', description: 'Extra classes' },
    },
} satisfies Meta<any>;

export default meta;

type Story = StoryObj<StoryArgs>;

export const Playground: Story = {
    args: {
        shape: 'rect',
        width: '100%',
        height: 16,
        rounded: 'md',
        lines: 3,
        gap: 8,
        animate: 'shimmer',
        className: '',
    },
    parameters: { docs: { description: { story: 'Interactive control center.' } } },
    render: (args) => (
        <div style={{ display: 'grid', gap: 12, maxWidth: 520 }}>
            {args.shape === 'text' ? (
                <Skeleton
                    shape="text"
                    lines={args.lines}
                    gap={args.gap}
                    rounded={args.rounded}
                    width={args.width}
                    height={args.height}
                    animate={args.animate}
                    className={args.className}
                />
            ) : (
                <Skeleton
                    shape={args.shape}
                    width={args.width}
                    height={args.height}
                    rounded={args.rounded}
                    animate={args.animate}
                    className={args.className}
                />
            )}
        </div>
    ),
};

export const TextLines: Story = {
    parameters: {
        docs: { description: { story: 'Paragraph-like text skeleton with 3–5 lines.' } },
    },
    render: () => (
        <div style={{ display: 'grid', gap: 10, maxWidth: 520 }}>
            <Skeleton shape="text" lines={3} />
            <Skeleton shape="text" lines={4} />
            <Skeleton shape="text" lines={5} />
        </div>
    ),
};

export const Rectangles: Story = {
    parameters: {
        docs: { description: { story: 'Common rectangular placeholders (e.g., images, cards).' } },
    },
    render: () => (
        <div style={{ display: 'grid', gap: 12 }}>
            <Skeleton shape="rect" width={320} height={180} rounded="lg" />
            <Skeleton shape="rect" width={280} height={24} rounded="md" />
            <Skeleton shape="rect" width={280} height={48} rounded="full" />
        </div>
    ),
};

export const Circles: Story = {
    parameters: { docs: { description: { story: 'Avatar-like circular skeletons.' } } },
    render: () => (
        <div style={{ display: 'flex', gap: 12, alignItems: 'center' }}>
            <Skeleton shape="circle" width={24} height={24} />
            <Skeleton shape="circle" width={40} height={40} />
            <Skeleton shape="circle" width={64} height={64} />
        </div>
    ),
};

export const Animations: Story = {
    parameters: { docs: { description: { story: 'Compare shimmer, pulse and none.' } } },
    render: () => (
        <div style={{ display: 'grid', gap: 12, maxWidth: 520 }}>
            <Skeleton shape="rect" height={16} animate="shimmer" />
            <Skeleton shape="rect" height={16} animate="pulse" />
            <Skeleton shape="rect" height={16} animate="none" />
        </div>
    ),
};

export const CompositeLayout: Story = {
    parameters: {
        docs: { description: { story: 'A typical card layout composed of skeletons.' } },
    },
    render: () => (
        <div
            style={{
                width: 360,
                border: '1px solid var(--color-border-subtle)',
                borderRadius: 12,
                padding: 12,
            }}
        >
            <Skeleton shape="rect" width="100%" height={160} rounded="lg" />
            <div style={{ marginTop: 12 }}>
                <Skeleton shape="text" lines={2} />
                <div style={{ display: 'flex', gap: 12, marginTop: 8 }}>
                    <Skeleton shape="circle" width={32} height={32} />
                    <div style={{ flex: 1 }}>
                        <Skeleton shape="text" lines={2} />
                    </div>
                </div>
            </div>
        </div>
    ),
};
