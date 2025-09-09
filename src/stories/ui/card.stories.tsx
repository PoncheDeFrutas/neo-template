import { Card, Button } from '@shared/ui';
import type { Meta, StoryObj } from '@storybook/react-vite';
import { ArrowRight } from 'lucide-react';

type Variant = 'surface' | 'elevated' | 'outline' | 'ghost';
type Padding = 'sm' | 'md' | 'lg' | 'none';
type MediaPosition = 'top' | 'left';
type Rounded = 'md' | 'lg' | 'xl' | '2xl';

type StoryArgs = {
    as: 'div' | 'a';
    title?: string;
    subtitle?: string;
    description?: string;
    footer?: string;
    children?: string;
    imageSrc?: string;
    imageAlt?: string;
    mediaPosition: MediaPosition;
    variant: Variant;
    padding: Padding;
    hoverable?: boolean;
    clickable?: boolean;
    elevation: 0 | 1 | 2 | 3;
    rounded: Rounded;
    className?: string;
    contentClassName?: string;
    href?: string;
    target?: string;
};

const meta = {
    title: 'Shared/Card',
    component: Card,
    parameters: {
        layout: 'padded',
        docs: {
            description: {
                component: `
Cards group related information and actions. They support media (image or custom node), title/subtitle/description, footer content, and multiple visual variants.

Usage
\`\`\`tsx
import { Card, Button } from '@shared/ui';

<Card
  title="Card title"
  subtitle="Category"
  description="Short description"
  variant="surface"
  padding="md"
  hoverable
>
  Body content goes here.
  <div slot="footer">
    <Button variant="primary" size="sm">Action</Button>
  </div>
</Card>
\`\`\`

Examples
\`\`\`tsx
// Media at top (vertical)
<Card title="Article" imageSrc="/banner.jpg" imageAlt="Banner" />

// Custom media at left (horizontal on md+)
// Note: left layout is activated when \`media\` is provided and \`mediaPosition="left"\`.
<Card
  title="Project"
  mediaPosition="left"
  media={<img src="/thumb.jpg" alt="" className="object-cover h-full w-40 md:w-56 rounded-l-xl" />}
>
  Content
</Card>

// As link
<Card as="a" href="/product/1" clickable hoverable title="Product" />
\`\`\`

Props
- as: 'div' | 'a' — Render as block or anchor.
- title/subtitle/description/footer: ReactNode — Optional regions.
- media: ReactNode — Custom media node (enables left layout when \`mediaPosition="left"\`).
- imageSrc/imageAlt/imageProps: image support for top media.
- mediaPosition: 'top' | 'left' — Position of media (left requires \`media\`).
- variant: 'surface' | 'elevated' | 'outline' | 'ghost' — Visual style.
- padding: 'none' | 'sm' | 'md' | 'lg' — Inner spacing.
- hoverable: boolean — Adds hover lift and shadow.
- clickable: boolean — Adds pointer cursor and focus ring.
- elevation: 0 | 1 | 2 | 3 — Extra shadow depth.
- rounded: 'md' | 'lg' | 'xl' | '2xl' — Corner radius.
- className/contentClassName: string — Style overrides.
- href/target: anchor attributes when \`as="a"\`.

Notes
- Left media layout requires providing \`media\`; when using \`imageSrc\` alone, media is rendered at the top.
- Combine \`clickable\` and \`hoverable\` for interactive cards; use \`elevation\` to adjust depth.
                `,
            },
        },
    },
    tags: ['autodocs'],
    argTypes: {
        as: { control: { type: 'inline-radio' }, options: ['div', 'a'], description: 'Render as' },
        title: { control: 'text', description: 'Title' },
        subtitle: { control: 'text', description: 'Subtitle (eyebrow)' },
        description: { control: 'text', description: 'Short description' },
        footer: { control: 'text', description: 'Footer text (simple examples)' },
        children: { control: 'text', description: 'Body text' },
        imageSrc: { control: 'text', description: 'Image URL (top media)' },
        imageAlt: { control: 'text', description: 'Image alt' },
        mediaPosition: {
            control: { type: 'inline-radio' },
            options: ['top', 'left'],
            description: 'Media position (left requires media)',
        },
        variant: {
            control: { type: 'select' },
            options: ['surface', 'elevated', 'outline', 'ghost'],
            description: 'Visual variant',
        },
        padding: {
            control: { type: 'inline-radio' },
            options: ['none', 'sm', 'md', 'lg'],
            description: 'Inner padding',
        },
        hoverable: { control: 'boolean', description: 'Hover lift effect' },
        clickable: { control: 'boolean', description: 'Pointer + focus ring' },
        elevation: { control: { type: 'inline-radio' }, options: [0, 1, 2, 3], description: 'Shadow depth' },
        rounded: {
            control: { type: 'inline-radio' },
            options: ['md', 'lg', 'xl', '2xl'],
            description: 'Corner radius',
        },
        className: { control: 'text', description: 'Container classes' },
        contentClassName: { control: 'text', description: 'Content wrapper classes' },
        href: { control: 'text', description: 'Link href (when as="a")' },
        target: { control: 'text', description: 'Link target (when as="a")' },
    },
} satisfies Meta<StoryArgs>;

export default meta;

type Story = StoryObj<StoryArgs>;

function FooterActions() {
    return (
        <div style={{ display: 'flex', gap: 8 }}>
            <Button size="sm">Action</Button>
            <Button variant="outline" size="sm">
                Secondary
            </Button>
        </div>
    );
}

export const Playground: Story = {
    args: {
        as: 'div',
        title: 'Card title',
        subtitle: 'Category',
        description: 'Short description goes here for the card body.',
        footer: 'Footer text',
        children: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
        imageSrc: 'https://picsum.photos/seed/card/640/360',
        imageAlt: 'Random',
        mediaPosition: 'top',
        variant: 'surface',
        padding: 'md',
        hoverable: false,
        clickable: false,
        elevation: 0,
        rounded: 'xl',
        className: '',
        contentClassName: '',
        href: '/product/1',
        target: '_self',
    },
    parameters: { docs: { description: { story: 'Interactive control center.' } } },
    render: (args) => {
        const { as, href, target, children, footer, ...rest } = args;
        const common = {
            ...rest,
            footer: footer ? <div>{footer}</div> : undefined,
            children: children ?? undefined,
        } as any;
        if (as === 'a') {
            common.as = 'a';
            common.href = href || '#';
            common.target = target;
            if (rest.clickable == null) common.clickable = true;
        }
        return <Card {...common} />;
    },
};

export const Variants: Story = {
    args: {
        as: 'div',
        title: 'Variant',
        description: 'Visual style examples',
        padding: 'md',
        hoverable: false,
        clickable: false,
        elevation: 0,
        rounded: 'xl',
        mediaPosition: 'top',
        variant: 'surface',
    },
    parameters: { docs: { description: { story: 'Surface, elevated, outline and ghost variants.' } } },
    render: (args) => (
        <div style={{ display: 'grid', gap: 16, gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))' }}>
            <Card {...(args as any)} title="Surface" variant="surface" />
            <Card {...(args as any)} title="Elevated" variant="elevated" />
            <Card {...(args as any)} title="Outline" variant="outline" />
            <Card {...(args as any)} title="Ghost" variant="ghost" />
        </div>
    ),
};

export const Padding: Story = {
    args: {
        as: 'div',
        title: 'Padding',
        description: 'Inner spacing examples',
        variant: 'surface',
        hoverable: false,
        clickable: false,
        elevation: 0,
        rounded: 'xl',
        mediaPosition: 'top',
        padding: 'md',
    },
    parameters: { docs: { description: { story: 'none, sm, md, lg padding options.' } } },
    render: (args) => (
        <div style={{ display: 'grid', gap: 16, gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))' }}>
            <Card {...(args as any)} title="None" padding="none" />
            <Card {...(args as any)} title="Small" padding="sm" />
            <Card {...(args as any)} title="Medium" padding="md" />
            <Card {...(args as any)} title="Large" padding="lg" />
        </div>
    ),
};

export const Rounded: Story = {
    args: {
        as: 'div',
        title: 'Rounded',
        description: 'Corner radius examples',
        variant: 'surface',
        padding: 'md',
        hoverable: false,
        clickable: false,
        elevation: 0,
        mediaPosition: 'top',
        rounded: 'xl',
    },
    parameters: { docs: { description: { story: 'md, lg, xl, 2xl radius options.' } } },
    render: (args) => (
        <div style={{ display: 'grid', gap: 16, gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))' }}>
            <Card {...(args as any)} title="md" rounded="md" />
            <Card {...(args as any)} title="lg" rounded="lg" />
            <Card {...(args as any)} title="xl" rounded="xl" />
            <Card {...(args as any)} title="2xl" rounded="2xl" />
        </div>
    ),
};

export const HoverAndElevation: Story = {
    args: {
        as: 'div',
        title: 'Interactive',
        description: 'Hover and elevation levels',
        variant: 'elevated',
        padding: 'md',
        hoverable: true,
        clickable: true,
        elevation: 1,
        rounded: 'xl',
        mediaPosition: 'top',
    },
    parameters: { docs: { description: { story: 'Combine hoverable, clickable and elevation.' } } },
    render: (args) => (
        <div style={{ display: 'grid', gap: 16, gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))' }}>
            <Card {...(args as any)} title="Elevation 0" elevation={0} />
            <Card {...(args as any)} title="Elevation 1" elevation={1} />
            <Card {...(args as any)} title="Elevation 2" elevation={2} />
            <Card {...(args as any)} title="Elevation 3" elevation={3} />
        </div>
    ),
};

export const WithImageTop: Story = {
    args: {
        as: 'div',
        title: 'Article title',
        description: 'Short abstract for the article',
        imageSrc: 'https://picsum.photos/seed/top/800/400',
        imageAlt: 'Cover',
        variant: 'surface',
        padding: 'md',
        mediaPosition: 'top',
        rounded: 'xl',
    },
    parameters: { docs: { description: { story: 'Vertical layout with image at the top.' } } },
};

export const WithMediaLeft: Story = {
    args: {
        as: 'div',
        title: 'Project',
        description: 'Media at left on md+ breakpoints',
        variant: 'surface',
        padding: 'md',
        hoverable: false,
        clickable: false,
        elevation: 0,
        rounded: 'xl',
        mediaPosition: 'left',
    },
    parameters: { docs: { description: { story: 'Provide media and set mediaPosition="left".' } } },
    render: (args) => (
        <Card
            {...(args as any)}
            media={
                <img
                    src="https://picsum.photos/seed/left/320/320"
                    alt="Left"
                    className="object-cover h-full w-40 md:w-56 rounded-l-xl"
                />
            }
        >
            This card shows a custom media node on the left.
        </Card>
    ),
};

export const AsLink: Story = {
    args: {
        as: 'a',
        title: 'Go to details',
        description: 'Clickable card rendered as anchor',
        href: '#',
        variant: 'outline',
        padding: 'md',
        hoverable: true,
        clickable: true,
        elevation: 0,
        rounded: 'xl',
        mediaPosition: 'top',
    },
    parameters: { docs: { description: { story: 'Rendered as an anchor; shows focus ring and hover.' } } },
    render: (args) => (
        <Card {...(args as any)} footer={<FooterActions />}>
            Open details <ArrowRight size={16} className="inline-block ml-1 align-middle" />
        </Card>
    ),
};
