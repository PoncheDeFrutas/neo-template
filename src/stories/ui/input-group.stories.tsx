import { InputGroup } from '@shared/ui';
import type { Meta, StoryObj } from '@storybook/react-vite';

const meta = {
    title: 'Shared/InputGroup',
    component: InputGroup,
    parameters: {
        layout: 'centered',
    },
    tags: ['autodocs'],
    args: {
        placeholder: 'Type here...',
        size: 'md',
        validationState: 'none',
    },
    argTypes: {
        disabled: { control: { type: 'boolean' } },
        size: {
            control: { type: 'select' },
            options: ['sm', 'md', 'lg'],
        },
        validationState: {
            control: { type: 'select' },
            options: ['none', 'success', 'error'],
        },
        leftElement: { control: false },
        rightElement: { control: false },
    },
} satisfies Meta<typeof InputGroup>;

export default meta;

export type Story = StoryObj<typeof InputGroup>;

const SearchIcon = (
    <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
        <circle cx="11" cy="11" r="8" />
        <line x1="21" y1="21" x2="16.65" y2="16.65" />
    </svg>
);

const CheckIcon = (
    <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
        <polyline points="20 6 9 17 4 12" />
    </svg>
);

export const WithIcons: Story = {
    args: {
        leftElement: SearchIcon,
        rightElement: CheckIcon,
    },
};

export const WithText: Story = {
    args: {
        leftElement: <span className="text-sm text-gray-500">@</span>,
        rightElement: <span className="text-sm text-gray-500">kg</span>,
    },
};