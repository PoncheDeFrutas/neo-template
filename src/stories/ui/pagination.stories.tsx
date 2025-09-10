import { Pagination } from '@shared/ui';
import type { Meta, StoryObj } from '@storybook/react-vite';
import { useState } from 'react';

type Size = 'sm' | 'md';

type StoryArgs = {
    page: number;
    pageCount: number;
    siblingCount: number;
    boundaryCount: number;
    size: Size;
    showFirstLast: boolean;
    showPrevNext: boolean;
    className?: string;
};

const meta = {
    title: 'Shared/Pagination',
    component: Pagination,
    parameters: {
        layout: 'padded',
        docs: {
            description: {
                component: `
Pagination allows users to navigate between pages of content.

Usage
\`\`\`tsx
import { Pagination } from '@shared/ui';

function Example() {
  const [page, setPage] = useState(1);
  return (
    <Pagination
      page={page}
      pageCount={20}
      onChange={setPage}
      siblingCount={1}
      boundaryCount={1}
    />
  );
}
\`\`\`

Props
- page: number — Current page (1-based).
- pageCount: number — Total number of pages (>= 1).
- onChange: (page: number) => void — Called with the new page.
- siblingCount?: number — Pages shown adjacent to the current page (default: 1).
- boundaryCount?: number — Pages shown at the start and end (default: 1).
- size?: 'sm' | 'md' — Control size (default: 'md').
- showFirstLast?: boolean — Show first/last buttons (default: true).
- showPrevNext?: boolean — Show previous/next buttons (default: true).

Notes
- Disables navigation buttons when on the first or last page.
- Uses an ellipsis to collapse long page ranges.
                `,
            },
        },
    },
    tags: ['autodocs'],
    argTypes: {
        page: { control: 'number', description: 'Current page (1-based)' },
        pageCount: { control: 'number', description: 'Total pages' },
        siblingCount: {
            control: { type: 'number', min: 0, max: 3, step: 1 },
            description: 'Adjacent pages around current',
        },
        boundaryCount: {
            control: { type: 'number', min: 0, max: 3, step: 1 },
            description: 'Pages shown at start/end',
        },
        size: {
            control: { type: 'inline-radio' },
            options: ['sm', 'md'],
            description: 'Control size',
        },
        showFirstLast: { control: 'boolean', description: 'Show first/last buttons' },
        showPrevNext: { control: 'boolean', description: 'Show previous/next buttons' },
        className: { control: 'text', description: 'Container classes' },
    },
} satisfies Meta<any>;

export default meta;

type Story = StoryObj<StoryArgs>;

export const Playground: Story = {
    args: {
        page: 1,
        pageCount: 20,
        siblingCount: 1,
        boundaryCount: 1,
        size: 'md',
        showFirstLast: true,
        showPrevNext: true,
        className: '',
    },
    parameters: { docs: { description: { story: 'Interactive control center.' } } },
    render: (args) => {
        const [page, setPage] = useState(args.page);
        return (
            <Pagination
                page={page}
                pageCount={args.pageCount}
                onChange={setPage}
                siblingCount={args.siblingCount}
                boundaryCount={args.boundaryCount}
                size={args.size}
                showFirstLast={args.showFirstLast}
                showPrevNext={args.showPrevNext}
                className={args.className}
            />
        );
    },
};

export const Sizes: Story = {
    args: {
        pageCount: 15,
        page: 7,
        siblingCount: 1,
        boundaryCount: 1,
        showFirstLast: true,
        showPrevNext: true,
    },
    parameters: { docs: { description: { story: 'sm and md sizes.' } } },
    render: (args) => {
        const [p1, setP1] = useState(args.page);
        const [p2, setP2] = useState(args.page);
        return (
            <div style={{ display: 'grid', gap: 12 }}>
                <Pagination
                    page={p1}
                    pageCount={args.pageCount}
                    onChange={setP1}
                    size="sm"
                    siblingCount={args.siblingCount}
                    boundaryCount={args.boundaryCount}
                />
                <Pagination
                    page={p2}
                    pageCount={args.pageCount}
                    onChange={setP2}
                    size="md"
                    siblingCount={args.siblingCount}
                    boundaryCount={args.boundaryCount}
                />
            </div>
        );
    },
};

export const ManyPages: Story = {
    args: {
        page: 50,
        pageCount: 200,
        siblingCount: 1,
        boundaryCount: 1,
        size: 'md',
        showFirstLast: true,
        showPrevNext: true,
    },
    parameters: { docs: { description: { story: 'Large datasets with ellipsis on both sides.' } } },
    render: (args) => {
        const [page, setPage] = useState(args.page);
        return (
            <Pagination
                page={page}
                pageCount={args.pageCount}
                onChange={setPage}
                siblingCount={args.siblingCount}
                boundaryCount={args.boundaryCount}
                size={args.size}
                showFirstLast={args.showFirstLast}
                showPrevNext={args.showPrevNext}
            />
        );
    },
};

export const WithoutEdgeButtons: Story = {
    args: {
        page: 5,
        pageCount: 20,
        siblingCount: 2,
        boundaryCount: 1,
        size: 'md',
        showFirstLast: false,
        showPrevNext: true,
    },
    parameters: { docs: { description: { story: 'Hide first/last buttons; keep prev/next.' } } },
    render: (args) => {
        const [page, setPage] = useState(args.page);
        return (
            <Pagination
                page={page}
                pageCount={args.pageCount}
                onChange={setPage}
                siblingCount={args.siblingCount}
                boundaryCount={args.boundaryCount}
                size={args.size}
                showFirstLast={args.showFirstLast}
                showPrevNext={args.showPrevNext}
            />
        );
    },
};

export const EdgeCases: Story = {
    parameters: {
        docs: { description: { story: 'Single page and first/last page disabled states.' } },
    },
    render: () => {
        const [p2, setP2] = useState(1);
        const [p3, setP3] = useState(10);
        return (
            <div style={{ display: 'grid', gap: 12 }}>
                <div>
                    <div
                        style={{
                            fontSize: 12,
                            marginBottom: 6,
                            color: 'var(--color-muted-foreground)',
                        }}
                    >
                        Single page
                    </div>
                    <Pagination page={1} pageCount={1} onChange={() => {}} />
                </div>
                <div>
                    <div
                        style={{
                            fontSize: 12,
                            marginBottom: 6,
                            color: 'var(--color-muted-foreground)',
                        }}
                    >
                        At first page
                    </div>
                    <Pagination page={p2} pageCount={10} onChange={setP2} />
                </div>
                <div>
                    <div
                        style={{
                            fontSize: 12,
                            marginBottom: 6,
                            color: 'var(--color-muted-foreground)',
                        }}
                    >
                        At last page
                    </div>
                    <Pagination page={p3} pageCount={10} onChange={setP3} />
                </div>
            </div>
        );
    },
};
