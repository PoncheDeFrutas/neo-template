import { Tabs } from '@shared/ui';
import type { Meta, StoryObj } from '@storybook/react-vite';
import { useState } from 'react';

type Size = 'sm' | 'md';

type StoryArgs = {
    size: Size;
    value?: string;
    defaultValue?: string;
    withDisabledSecond?: boolean;
    listClassName?: string;
    triggerClassName?: string;
    contentClassName?: string;
};

const meta = {
    title: 'Shared/Tabs',
    component: Tabs,
    parameters: {
        layout: 'padded',
        docs: {
            description: {
                component: `
Tabs organize content into multiple sections, displaying one panel at a time. Controlled and uncontrolled modes are supported.

Usage
\`\`\`tsx
import { Tabs } from '@shared/ui';

const items = [
  { value: 'account', label: 'Account', content: <div>Account content</div> },
  { value: 'password', label: 'Password', content: <div>Password content</div> },
  { value: 'billing', label: 'Billing', content: <div>Billing content</div> },
];

// Uncontrolled (defaultValue)
<Tabs items={items} defaultValue="account" />

// Controlled
function Example() {
  const [val, setVal] = useState('account');
  return <Tabs items={items} value={val} onValueChange={setVal} />;
}
\`\`\`

Props
- items: Array<{ value: string; label: ReactNode; content: ReactNode; disabled?: boolean }>
- value?: string, defaultValue?: string, onValueChange?: (value: string) => void
- size?: 'sm' | 'md' — Tab trigger size (default: 'md')
- listClassName/triggerClassName/contentClassName?: string — Style overrides

Notes
- Keyboard: ArrowLeft/ArrowRight navigate between enabled tabs; Home/End jump to first/last.
- Disabled tabs are skipped by keyboard navigation and cannot be activated.
                `,
            },
        },
    },
    tags: ['autodocs'],
    argTypes: {
        size: { control: { type: 'inline-radio' }, options: ['sm', 'md'], description: 'Trigger size' },
        value: { control: 'text', description: 'Selected value (controlled)' },
        defaultValue: { control: 'text', description: 'Initial value (uncontrolled)' },
        withDisabledSecond: { control: 'boolean', description: 'Disable the second tab (demo)' },
        listClassName: { control: 'text', description: 'Tab list classes' },
        triggerClassName: { control: 'text', description: 'Trigger classes' },
        contentClassName: { control: 'text', description: 'Content classes' },
    },
} satisfies Meta<any>;

export default meta;

type Story = StoryObj<StoryArgs>;

function buildItems(disableSecond?: boolean) {
    return [
        { value: 'account', label: 'Account', content: <div>Update your profile settings here.</div> },
        {
            value: 'password',
            label: 'Password',
            disabled: !!disableSecond,
            content: <div>Change your password and manage security options.</div>,
        },
        { value: 'billing', label: 'Billing', content: <div>Manage billing information and invoices.</div> },
    ];
}

export const Playground: Story = {
    args: {
        size: 'md',
        defaultValue: 'account',
        withDisabledSecond: false,
        listClassName: '',
        triggerClassName: '',
        contentClassName: '',
    },
    parameters: { docs: { description: { story: 'Interactive control center.' } } },
    render: (args) => (
        <Tabs
            items={buildItems(args.withDisabledSecond)}
            size={args.size}
            value={args.value}
            defaultValue={args.defaultValue}
            onValueChange={() => {}}
            listClassName={args.listClassName}
            triggerClassName={args.triggerClassName}
            contentClassName={args.contentClassName}
        />
    ),
};

export const Sizes: Story = {
    args: { withDisabledSecond: false },
    parameters: { docs: { description: { story: 'sm and md trigger sizes.' } } },
    render: (args) => (
        <div className="grid gap-8">
            <Tabs items={buildItems(args.withDisabledSecond)} size="sm" defaultValue="account" />
            <Tabs items={buildItems(args.withDisabledSecond)} size="md" defaultValue="account" />
        </div>
    ),
};

export const DisabledTab: Story = {
    parameters: { docs: { description: { story: 'Second tab is disabled.' } } },
    render: () => <Tabs items={buildItems(true)} defaultValue="account" />,
};

export const Controlled: Story = {
    parameters: { docs: { description: { story: 'Controlled tabs with external controls.' } } },
    render: () => {
        const [val, setVal] = useState('account');
        return (
            <div className="grid gap-3">
                <div className="flex gap-2">
                    <button className="px-3 py-1 rounded border" onClick={() => setVal('account')}>
                        Account
                    </button>
                    <button className="px-3 py-1 rounded border" onClick={() => setVal('password')}>
                        Password
                    </button>
                    <button className="px-3 py-1 rounded border" onClick={() => setVal('billing')}>
                        Billing
                    </button>
                </div>
                <Tabs items={buildItems(false)} value={val} onValueChange={setVal} />
            </div>
        );
    },
};

