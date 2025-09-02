import { Spinner } from '@shared/ui';
import type { Meta, StoryObj } from '@storybook/react-vite';

const meta = {
  title: 'Shared/Spinner',
  component: Spinner,
  parameters: { layout: 'centered' },
  tags: ['autodocs'],
  args: { label: 'Loading...' },
  argTypes: {
    size: { control: 'select', options: ['xs', 'sm', 'md', 'lg', 'xl'] },
    color: { control: 'color' },
    align: { control: 'select', options: ['left', 'center', 'right'] },
    label: { control: 'text' },
  },
} satisfies Meta<typeof Spinner>;

export default meta;
export type Story = StoryObj<typeof Spinner>;

export const Default: Story = {};

export const Custom: Story = {
  args: {
    size: 'lg',
    color: '#ef4444',
    align: 'left',
  },
};
