import { SearchableSelect } from '@shared/ui';
import type { Meta, StoryObj } from '@storybook/react-vite';
import { useState } from 'react';

type Size = 'sm' | 'md' | 'lg';

type StoryArgs = {
    label?: string;
    hint?: string;
    error?: string;
    success?: string;
    placeholder?: string;
    size: Size;
    fullWidth: boolean;
    disabled?: boolean;
    clearable: boolean;
    searchable: boolean;
};

const options = Array.from({ length: 20 }).map((_, i) => ({
    label: `Option ${i + 1}`,
    value: String(i + 1),
}));

const meta = {
    title: 'Shared/SearchableSelect',
    component: SearchableSelect,
    parameters: {
        layout: 'padded',
        docs: {
            description: {
                component: `
SearchableSelect is a custom, accessible combobox-like control with optional searching and clear action. It is controlled via value/onChange.

Usage
\`\`\`tsx
import { SearchableSelect } from '@shared/ui';

function Example() {
  const [value, setValue] = useState<string | null>(null);
  return (
    <SearchableSelect
      label="Country"
      placeholder="Choose..."
      options={[{ label: 'USA', value: 'us' }, { label: 'Canada', value: 'ca' }]}
      value={value}
      onChange={setValue}
      clearable
      searchable
    />
  );
}
\`\`\`

Props
- options: { label: ReactNode; value: string; disabled?: boolean }[] — Items to pick from.
- value: string | null — Selected value; use null for none.
- onChange: (value: string | null) => void — Called when value changes.
- clearable?: boolean — Show clear (X) button when a value is selected.
- searchable?: boolean — Show input to filter options.
- label/hint/error/success/placeholder/size/fullWidth/disabled: UI props.

Notes
- Keyboard: ArrowDown/ArrowUp to navigate, Enter to select, ESC to close.
- Clicking outside closes the list; focus returns to the button.
                `,
            },
        },
    },
    tags: ['autodocs'],
    argTypes: {
        label: { control: 'text', description: 'Label text' },
        hint: { control: 'text', description: 'Helper text' },
        error: { control: 'text', description: 'Error message' },
        success: { control: 'text', description: 'Success message' },
        placeholder: { control: 'text', description: 'Placeholder' },
        size: { control: { type: 'inline-radio' }, options: ['sm', 'md', 'lg'], description: 'Control size' },
        fullWidth: { control: 'boolean', description: 'Full width' },
        disabled: { control: 'boolean', description: 'Disabled state' },
        clearable: { control: 'boolean', description: 'Show clear action' },
        searchable: { control: 'boolean', description: 'Enable search input' },
    },
} satisfies Meta<any>;

export default meta;

type Story = StoryObj<StoryArgs>;

export const Playground: Story = {
    args: {
        label: 'Options',
        hint: 'Type to filter the list',
        error: '',
        success: '',
        placeholder: 'Choose...',
        size: 'md',
        fullWidth: true,
        disabled: false,
        clearable: true,
        searchable: true,
    },
    parameters: { docs: { description: { story: 'Interactive control center.' } } },
    render: (args) => {
        const [value, setValue] = useState<string | null>(null);
        return (
            <SearchableSelect
                label={args.label}
                hint={args.hint}
                error={args.error || undefined}
                success={args.success || undefined}
                placeholder={args.placeholder}
                size={args.size}
                fullWidth={args.fullWidth}
                disabled={args.disabled}
                options={options}
                value={value}
                onChange={setValue}
                clearable={args.clearable}
                searchable={args.searchable}
            />
        );
    },
};

export const Sizes: Story = {
    args: { placeholder: 'Choose...', clearable: true, searchable: true },
    parameters: { docs: { description: { story: 'sm, md, lg sizes.' } } },
    render: (args) => {
        const [v1, setV1] = useState<string | null>(null);
        const [v2, setV2] = useState<string | null>(null);
        const [v3, setV3] = useState<string | null>(null);
        return (
            <div style={{ display: 'grid', gap: 12, maxWidth: 420 }}>
                <SearchableSelect size="sm" options={options} value={v1} onChange={setV1} clearable={args.clearable} searchable={args.searchable} />
                <SearchableSelect size="md" options={options} value={v2} onChange={setV2} clearable={args.clearable} searchable={args.searchable} />
                <SearchableSelect size="lg" options={options} value={v3} onChange={setV3} clearable={args.clearable} searchable={args.searchable} />
            </div>
        );
    },
};

export const DisabledAndStates: Story = {
    parameters: { docs: { description: { story: 'Disabled and feedback messages.' } } },
    render: () => {
        const [v1, setV1] = useState<string | null>(null);
        const [v2, setV2] = useState<string | null>(null);
        const [v3, setV3] = useState<string | null>(null);
        return (
            <div style={{ display: 'grid', gap: 12, maxWidth: 420 }}>
                <SearchableSelect label="Disabled" options={options} value={v1} onChange={setV1} disabled />
                <SearchableSelect label="Error" options={options} value={v2} onChange={setV2} error="Please choose an option" />
                <SearchableSelect label="Success" options={options} value={v3} onChange={setV3} success="Looks good" />
            </div>
        );
    },
};

export const SearchVsNoSearch: Story = {
    parameters: { docs: { description: { story: 'Compare searchable vs non-searchable.' } } },
    render: () => {
        const [a, setA] = useState<string | null>(null);
        const [b, setB] = useState<string | null>(null);
        return (
            <div style={{ display: 'grid', gap: 12, maxWidth: 420 }}>
                <SearchableSelect label="Searchable" options={options} value={a} onChange={setA} searchable clearable />
                <SearchableSelect label="No search" options={options} value={b} onChange={setB} searchable={false} clearable />
            </div>
        );
    },
};

