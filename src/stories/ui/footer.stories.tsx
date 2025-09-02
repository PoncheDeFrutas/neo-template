import type { Meta, StoryObj } from '@storybook/react-vite';
import Footer, { type FooterProps } from '@shared/ui/footer';

const meta: Meta<typeof Footer> = {
  title: 'Shared/Footer',
  component: Footer,
  parameters: { layout: 'fullscreen' },
};
export default meta;

type Story = StoryObj<FooterProps>;

export const Default: Story = {
  args: { variant: 0 },
};

export const LogoSocial: Story = {
  args: { variant: 1 },
};
