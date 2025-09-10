import { Table, Badge, Pagination } from '@shared/ui';
import type { Meta, StoryObj } from '@storybook/react-vite';
import { useState } from 'react';

type Align = 'left' | 'center' | 'right';

type User = {
    id: number;
    name: string;
    email: string;
    role: 'Admin' | 'Editor' | 'Viewer';
    status: 'Active' | 'Invited' | 'Suspended';
    createdAt: Date;
};

// Sample data
const sampleUsers: User[] = Array.from({ length: 48 }).map((_, i) => ({
    id: i + 1,
    name: `User ${i + 1}`,
    email: `user${i + 1}@example.com`,
    role: (['Admin', 'Editor', 'Viewer'] as const)[i % 3],
    status: (['Active', 'Invited', 'Suspended'] as const)[i % 3],
    createdAt: new Date(Date.now() - i * 86400000),
}));

const statusBadge = (s: User['status']) => {
    if (s === 'Active')
        return (
            <Badge variant="success" tone="soft">
                Active
            </Badge>
        );
    if (s === 'Invited') return <Badge variant="neutral">Invited</Badge>;
    return (
        <Badge variant="danger" tone="soft">
            Suspended
        </Badge>
    );
};

const columns = [
    { key: 'name', header: 'Name', sortable: true },
    { key: 'email', header: 'Email', sortable: true },
    {
        key: 'role',
        header: 'Role',
        sortable: true,
    },
    {
        key: 'status',
        header: 'Status',
        sortable: true,
        render: (v: User['status']) => statusBadge(v),
    },
    {
        key: 'createdAt',
        header: 'Created',
        sortable: true,
        align: 'right' as Align,
        sortAccessor: (row: User) => row.createdAt.getTime(),
        render: (v: Date) => new Date(v).toLocaleDateString(),
        width: 120,
    },
];

type StoryArgs = {
    hoverable: boolean;
    striped: boolean;
    dense: boolean;
    loading: boolean;
};

const meta = {
    title: 'Shared/Table',
    component: Table,
    parameters: {
        layout: 'padded',
        docs: {
            description: {
                component: `
Table renders a styled, sortable, filterable data table with optional client-side pagination.

Usage
\`\`\`tsx
import { Table } from '@shared/ui';

const columns = [
  { key: 'name', header: 'Name', sortable: true },
  { key: 'email', header: 'Email', sortable: true },
  { key: 'createdAt', header: 'Created', sortable: true, render: (v: Date) => new Date(v).toLocaleDateString() }
];

<Table data={rows} columns={columns} hoverable striped />
\`\`\`

Sorting & Rendering
- Set \`sortable\` on columns; clicking headers toggles asc/desc.
- Use \`render(value, row)\` to customize cell content; \`sortAccessor\` to sort by a derived value.

Filtering
- Use \`globalFilter\` for simple text search across configured \`filterKeys\` (defaults to column keys).

Pagination (integration example)
\`\`\`tsx
import { Table, Pagination } from '@shared/ui';

function UsersTable() {
  const [page, setPage] = useState(1);
  const pageSize = 10; // fixed for simplicity
  const total = rows.length;

  return (
    <>
      <Table data={rows} columns={columns} page={page} pageSize={pageSize} />
      <div style={{ marginTop: 12 }}>
        <Pagination page={page} pageCount={Math.ceil(total / pageSize)} onChange={setPage} />
      </div>
    </>
  );
}
\`\`\`
                `,
            },
        },
    },
    tags: ['autodocs'],
    argTypes: {
        hoverable: { control: 'boolean', description: 'Row hover background' },
        striped: { control: 'boolean', description: 'Alternate row background' },
        dense: { control: 'boolean', description: 'Reduced vertical padding' },
        loading: { control: 'boolean', description: 'Loading state (spinner row)' },
    },
} satisfies Meta<any>;

export default meta;

type Story = StoryObj<StoryArgs>;

export const Basic: Story = {
    args: { hoverable: true, striped: false, dense: false, loading: false },
    parameters: { docs: { description: { story: 'Basic table with sample user data.' } } },
    render: (args) => (
        <Table
            data={sampleUsers.slice(0, 10)}
            columns={columns}
            hoverable={args.hoverable}
            striped={args.striped}
            dense={args.dense}
            loading={args.loading}
            rowKey={(r: User) => r.id}
        />
    ),
};

export const GlobalFilter: Story = {
    parameters: { docs: { description: { story: 'Simple text search across key columns.' } } },
    render: () => {
        const [query, setQuery] = useState('');
        return (
            <div style={{ display: 'grid', gap: 12 }}>
                <input
                    placeholder="Search users..."
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                    style={{
                        height: 36,
                        borderRadius: 8,
                        border: '1px solid var(--color-border)',
                        background: 'var(--color-surface)',
                        color: 'var(--color-text)',
                        padding: '0 12px',
                    }}
                />
                <Table
                    data={sampleUsers}
                    columns={columns}
                    globalFilter={query}
                    filterKeys={['name', 'email', 'role', 'status']}
                    rowKey={(r: User) => r.id}
                />
            </div>
        );
    },
};

export const PaginationIntegration: Story = {
    parameters: {
        docs: { description: { story: 'Table paged client-side, controlled via Pagination.' } },
    },
    render: () => {
        const [page, setPage] = useState(1);
        const [pageSize, setPageSize] = useState(10);
        const total = sampleUsers.length;
        const pageCount = Math.max(1, Math.ceil(total / pageSize));
        const from = (page - 1) * pageSize + 1;
        const to = Math.min(total, page * pageSize);
        return (
            <div style={{ display: 'grid', gap: 12 }}>
                <div style={{ display: 'flex', gap: 12, alignItems: 'center' }}>
                    <span style={{ fontSize: 12, color: 'var(--color-muted-foreground)' }}>
                        Showing {from}–{to} of {total}
                    </span>
                    <label style={{ marginLeft: 'auto', fontSize: 12 }}>
                        Page size:{' '}
                        <select
                            value={pageSize}
                            onChange={(e) => {
                                const ps = Number(e.target.value);
                                setPageSize(ps);
                                setPage(1);
                            }}
                        >
                            {[5, 10, 15, 20].map((n) => (
                                <option key={n} value={n}>
                                    {n}
                                </option>
                            ))}
                        </select>
                    </label>
                </div>
                <Table
                    data={sampleUsers}
                    columns={columns}
                    page={page}
                    pageSize={pageSize}
                    rowKey={(r: User) => r.id}
                    hoverable
                    striped
                />
                <div style={{ display: 'flex', justifyContent: 'center' }}>
                    <Pagination page={page} pageCount={pageCount} onChange={setPage} />
                </div>
            </div>
        );
    },
};

export const DenseStripedHoverable: Story = {
    parameters: { docs: { description: { story: 'Density, stripes and hover styles.' } } },
    render: () => (
        <Table data={sampleUsers.slice(0, 12)} columns={columns} dense striped hoverable />
    ),
};
