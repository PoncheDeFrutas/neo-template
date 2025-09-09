import { Breadcrumbs } from '@shared/ui';
import type { Meta, StoryObj } from '@storybook/react-vite';
import type { BreadcrumbItem } from '@/shared/ui/Breadcrumbs';
import { Home, Folder, File } from 'lucide-react';

type StoryArgs = {
    items: BreadcrumbItem[];
    className?: string;
};

const meta = {
    title: 'Shared/Breadcrumbs',
    component: Breadcrumbs,
    parameters: {
        layout: 'padded',
        docs: {
            description: {
                component: `
Breadcrumbs display the current page's location within a navigational hierarchy.

Usage
\`\`\`tsx
import { Breadcrumbs } from '@shared/ui';

const items = [
  { label: 'Home', href: '/' },
  { label: 'Library', href: '/library' },
  { label: 'Data', current: true }, // last/current item
];

<Breadcrumbs items={items} />
\`\`\`

Examples
\`\`\`tsx
// With icons in labels
import { Home, Folder, File } from 'lucide-react';

const itemsWithIcons = [
  { label: (<><Home size={14} /> Home</>), href: '/' },
  { label: (<><Folder size={14} /> Projects</>), href: '/projects' },
  { label: (<><File size={14} /> Design System</>), current: true },
];

// With click handlers (no href)
const itemsWithClicks = [
  { label: 'Home', onClick: () => console.log('Home') },
  { label: 'Section', onClick: () => console.log('Section') },
  { label: 'Current', current: true },
];

// Truncation (wrap in a constrained container)
<div style={{ width: 280, overflow: 'hidden' }}>
  <Breadcrumbs items={items} />
  {/* Long labels will truncate */}
  {/* e.g. 'Very long category name that will likely truncate' */}
  {/*      'Extremely verbose product title that should not fit entirely' */}
  
</div>
\`\`\`

Props
- items: Array<{ label: ReactNode; href?: string; onClick?: (e: MouseEvent) => void; current?: boolean }>
- className: string — Optional classes for the nav container.

Notes
- Accessibility: The last item (or any item with \`current: true\`) has \`aria-current="page"\`.
- Navigation: Use \`href\` for links; use \`onClick\` for client-side handlers.
- Current item: Avoid linking the current/last item — keep it non-interactive.
 - Separator: A slash \`/\` is rendered between items.
                `,
            },
        },
    },
    tags: ['autodocs'],
    argTypes: {
        items: { control: 'object', description: 'Breadcrumb items' },
        className: { control: 'text', description: 'Extra classes for the container' },
    },
} satisfies Meta<StoryArgs>;

export default meta;

type Story = StoryObj<StoryArgs>;

export const Playground: Story = {
    args: {
        items: [
            { label: 'Home', href: '/' },
            { label: 'Products', href: '/products' },
            { label: 'Laptops', href: '/products/laptops' },
            { label: 'MacBook Pro', current: true },
        ],
        className: '',
    },
    parameters: { docs: { description: { story: 'Interactive control center.' } } },
};

export const Basic: Story = {
    args: {
        items: [
            { label: 'Home', href: '/' },
            { label: 'Library', href: '/library' },
            { label: 'Data', current: true },
        ],
    },
    parameters: { docs: { description: { story: 'Standard breadcrumb with links and current page.' } } },
};

export const WithIcons: Story = {
    args: {
        items: [
            { label: (<><Home size={14} /> Home</>), href: '/' },
            { label: (<><Folder size={14} /> Projects</>), href: '/projects' },
            { label: (<><File size={14} /> Design System</>), current: true },
        ],
    },
    parameters: { docs: { description: { story: 'Labels accept React nodes; icons can be included.' } } },
};

export const WithClickHandlers: Story = {
    args: {
        items: [
            { label: 'Home', onClick: () => console.log('Home clicked') },
            { label: 'Section', onClick: () => console.log('Section clicked') },
            { label: 'Current Page', current: true },
        ],
    },
    parameters: { docs: { description: { story: 'Using onClick without href for custom navigation.' } } },
};

export const Truncation: Story = {
    args: {
        items: [
            { label: 'Home', href: '/' },
            { label: 'Very long category name that will likely truncate', href: '/category' },
            { label: 'Extremely verbose product title that should not fit entirely', current: true },
        ],
    },
    render: (args) => (
        <div style={{ width: 280, overflow: 'hidden' }}>
            <Breadcrumbs {...args} />
        </div>
    ),
    parameters: { docs: { description: { story: 'Breadcrumb labels truncate within constrained widths.' } } },
};
