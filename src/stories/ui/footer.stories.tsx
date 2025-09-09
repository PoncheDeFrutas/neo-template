import { Footer } from '@shared/ui';
import type { Meta, StoryObj } from '@storybook/react-vite';
import { Github, Twitter, Instagram } from 'lucide-react';

type StoryArgs = {
    brand: string;
    description?: string;
    withGroups: boolean;
    withSocial: boolean;
    bottomLeft?: string;
    className?: string;
    containerClassName?: string;
};

const defaultGroups = [
    {
        title: 'Product',
        links: [
            { label: 'Features', href: '#' },
            { label: 'Pricing', href: '#' },
            { label: 'Roadmap', href: '#' },
        ],
    },
    {
        title: 'Company',
        links: [
            { label: 'About', href: '#' },
            { label: 'Careers', href: '#' },
            { label: 'Press', href: '#' },
        ],
    },
    {
        title: 'Resources',
        links: [
            { label: 'Docs', href: '#' },
            { label: 'Community', href: '#' },
            { label: 'Support', href: '#' },
        ],
    },
];

const meta = {
    title: 'Shared/Footer',
    component: Footer,
    parameters: {
        layout: 'padded',
        docs: {
            description: {
                component: `
The Footer component displays brand info, grouped links and a bottom bar with secondary content.

Usage
\`\`\`tsx
import { Footer } from '@shared/ui';

<Footer
  brand={<span>Acme Inc.</span>}
  description="Fast deliveries and reliable service."
  groups={[
    { title: 'Product', links: [{ label: 'Features', href: '#' }, { label: 'Pricing', href: '#' }] },
    { title: 'Company', links: [{ label: 'About', href: '#' }, { label: 'Careers', href: '#' }] },
  ]}
  bottomLeft={\`© \${new Date().getFullYear()} Acme\`}
  bottomRight={(
    <>
      <a href="#" aria-label="GitHub"><Github size={16} /></a>
      <a href="#" aria-label="Twitter"><Twitter size={16} /></a>
    </>
  )}
/>
\`\`\`

Props
- brand?: ReactNode — Brand element (text or logo).
- description?: ReactNode — Supporting brand text.
- groups?: Array<{ title: ReactNode; links: { label: ReactNode; href?: string; onClick?: (e) => void; external?: boolean; disabled?: boolean }[] }>
- bottomLeft?: ReactNode — Bottom-left area (copyright or helper text).
- bottomRight?: ReactNode — Bottom-right area (icons or extra links).
- className?: string — Styles for the outer footer.
- containerClassName?: string — Styles for the inner max-width container.

Notes
- Links support \`external\` to set \`target="_blank"\` and security rel automatically.
- Disabled links receive reduced opacity and no pointer events.
                `,
            },
        },
    },
    tags: ['autodocs'],
    argTypes: {
        brand: { control: 'text', description: 'Brand text (can be a logo/node in real use)' },
        description: { control: 'text', description: 'Brand description' },
        withGroups: { control: 'boolean', description: 'Show example groups' },
        withSocial: { control: 'boolean', description: 'Show example social icons' },
        bottomLeft: { control: 'text', description: 'Bottom-left content' },
        className: { control: 'text', description: 'Footer outer classes' },
        containerClassName: { control: 'text', description: 'Inner container classes' },
    },
} satisfies Meta<StoryArgs>;

export default meta;

type Story = StoryObj<StoryArgs>;

export const Playground: Story = {
    args: {
        brand: 'RapiEntrega',
        description: 'Fast deliveries and reliable service across the city.',
        withGroups: true,
        withSocial: true,
        bottomLeft: `© ${new Date().getFullYear()} RapiEntrega. All rights reserved.`,
        className: '',
        containerClassName: '',
    },
    parameters: { docs: { description: { story: 'Interactive control center.' } } },
    render: (args) => (
        <Footer
            brand={<span>{args.brand}</span>}
            description={args.description}
            groups={args.withGroups ? (defaultGroups as any) : []}
            bottomLeft={args.bottomLeft}
            bottomRight={
                args.withSocial ? (
                    <>
                        <a href="#" aria-label="GitHub" className="text-muted-foreground hover:text-text">
                            <Github size={16} />
                        </a>
                        <a href="#" aria-label="Twitter" className="text-muted-foreground hover:text-text">
                            <Twitter size={16} />
                        </a>
                        <a href="#" aria-label="Instagram" className="text-muted-foreground hover:text-text">
                            <Instagram size={16} />
                        </a>
                    </>
                ) : undefined
            }
            className={args.className}
            containerClassName={args.containerClassName}
        />
    ),
};

export const Simple: Story = {
    args: {
        brand: 'Acme Inc.',
        description: 'We build delightful software.',
        withGroups: false,
        withSocial: false,
        bottomLeft: `© ${new Date().getFullYear()} Acme` as any,
    },
    parameters: { docs: { description: { story: 'Brand + description + default bottom line.' } } },
};

export const WithGroups: Story = {
    args: {
        brand: 'Acme Inc.',
        description: 'We build delightful software.',
        withGroups: true,
        withSocial: false,
        bottomLeft: `© ${new Date().getFullYear()} Acme` as any,
    },
    parameters: { docs: { description: { story: 'Shows grouped navigation links.' } } },
};

export const WithSocialIcons: Story = {
    args: {
        brand: 'Acme Inc.',
        description: 'We build delightful software.',
        withGroups: true,
        withSocial: true,
        bottomLeft: `© ${new Date().getFullYear()} Acme` as any,
    },
    parameters: { docs: { description: { story: 'Adds social icons to bottom-right.' } } },
};
