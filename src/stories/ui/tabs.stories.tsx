import { Tabs, TabList, Tab, TabPanel } from '@shared/ui';
import type { Meta, StoryObj } from '@storybook/react-vite';
import { useState } from 'react';

const meta: Meta<typeof Tabs> = {
    title: 'Shared/Tabs',
    component: Tabs,
    subcomponents: { TabList, Tab, TabPanel },
    parameters: {
        layout: 'centered',
    },
    tags: ['autodocs'],
    argTypes: {
        variant: {
            control: { type: 'select' },
            options: ['default', 'underline', 'pill', 'vertical', 'fullWidth'],
        },
        showIcon: {
            control: { type: 'boolean' },
        },
        activeClassName: {
            control: { type: 'text' },
        },
        inactiveClassName: {
            control: { type: 'text' },
        },
    } as any,
    args: {
        variant: 'default',
        showIcon: false,
    } as any,
};

export default meta;

export type Story = StoryObj<typeof Tabs> & {
    args?: {
        variant?: 'default' | 'underline' | 'pill' | 'vertical' | 'fullWidth';
        showIcon?: boolean;
        activeClassName?: string;
        inactiveClassName?: string;
    };
};

const TabStarIcon = (
    <svg className="w-4 h-4" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.357 4.19h4.4c.969 0 1.371 1.24.588 1.81l-3.567 2.59 1.357 4.19c.3.921-.755 1.688-1.539 1.118L10 14.347l-3.548 2.478c-.784.57-1.838-.197-1.539-1.118l1.357-4.19-3.567-2.59c-.783-.57-.38-1.81.588-1.81h4.4l1.357-4.19z" />
    </svg>
);

const Template = (args: any) => {
    const iconNode = args.showIcon ? TabStarIcon : undefined;

    if (args.variant === 'vertical') {
        return (
            <div style={{ display: 'flex', gap: 16 }}>
                <Tabs defaultValue="tab1">
                    <TabList variant={args.variant}>
                        <Tab value="tab1" icon={iconNode} activeClassName={args.activeClassName} inactiveClassName={args.inactiveClassName}>Tab 1</Tab>
                        <Tab value="tab2" icon={iconNode} activeClassName={args.activeClassName} inactiveClassName={args.inactiveClassName}>Tab 2</Tab>
                        <Tab value="tab3" icon={iconNode} activeClassName={args.activeClassName} inactiveClassName={args.inactiveClassName}>Tab 3</Tab>
                    </TabList>
                    <div style={{ paddingLeft: 16 }}>
                        <TabPanel value="tab1">Content 1</TabPanel>
                        <TabPanel value="tab2">Content 2</TabPanel>
                        <TabPanel value="tab3">Content 3</TabPanel>
                    </div>
                </Tabs>
            </div>
        );
    }

    const content = (
        <Tabs defaultValue="tab1">
            <TabList variant={args.variant}>
                <Tab value="tab1" icon={iconNode} activeClassName={args.activeClassName} inactiveClassName={args.inactiveClassName}>Tab 1</Tab>
                <Tab value="tab2" icon={iconNode} activeClassName={args.activeClassName} inactiveClassName={args.inactiveClassName}>Tab 2</Tab>
                <Tab value="tab3" icon={iconNode} activeClassName={args.activeClassName} inactiveClassName={args.inactiveClassName}>Tab 3</Tab>
            </TabList>
            <TabPanel value="tab1">Content 1</TabPanel>
            <TabPanel value="tab2">Content 2</TabPanel>
            <TabPanel value="tab3">Content 3</TabPanel>
        </Tabs>
    );

    if (args.variant === 'fullWidth') {
        return <div style={{ width: 480 }}>{content}</div>;
    }
    return content;
};


export const Default = Template.bind({}) as Story;
Default.args = { variant: 'default' };

export const Underline = Template.bind({}) as Story;
Underline.args = { variant: 'underline' };

export const Pill = Template.bind({}) as Story;
Pill.args = { variant: 'pill' };

export const Vertical = Template.bind({}) as Story;
Vertical.args = { variant: 'vertical' };

export const FullWidth = Template.bind({}) as Story;
FullWidth.args = { variant: 'fullWidth' };

export const WithIcon: Story = {
    name: 'With Icon',
    render: () => (
        <Tabs defaultValue="tab1">
            <TabList>
                <Tab icon={TabStarIcon} value="tab1">
                    Featured
                </Tab>
                <Tab icon={TabStarIcon} value="tab2">
                    Popular
                </Tab>
                <Tab icon={TabStarIcon} value="tab3">
                    New
                </Tab>
            </TabList>
            <TabPanel value="tab1">Tab with icon: Featured</TabPanel>
            <TabPanel value="tab2">Tab with icon: Popular</TabPanel>
            <TabPanel value="tab3">Tab with icon: New</TabPanel>
        </Tabs>
    ),
};

export const CustomClasses: Story = {
    name: 'Custom Classes (active/inactive)',
    parameters: {
        docs: {
            description: {
                story: "Ejemplo usando 'activeClassName' y 'inactiveClassName' en <Tab />. Por defecto, activo usa 'border-blue-500 text-blue-600' e inactivo 'border-transparent text-gray-600'.",
            },
        },
    },
    render: () => (
        <Tabs defaultValue="tab1">
            <TabList>
                <Tab
                    value="tab1"
                    activeClassName="border-emerald-500 text-emerald-600"
                    inactiveClassName="border-gray-400 text-gray-500"
                >
                    Overview
                </Tab>
                <Tab
                    value="tab2"
                    activeClassName="border-emerald-500 text-emerald-600"
                    inactiveClassName="border-gray-400 text-gray-500"
                >
                    Details
                </Tab>
                <Tab
                    value="tab3"
                    activeClassName="border-emerald-500 text-emerald-600"
                    inactiveClassName="border-gray-400 text-gray-500"
                >
                    Reviews
                </Tab>
            </TabList>
            <TabPanel value="tab1">Overview content</TabPanel>
            <TabPanel value="tab2">Details content</TabPanel>
            <TabPanel value="tab3">Reviews content</TabPanel>
        </Tabs>
    ),
};

export const Playground = Template.bind({}) as Story;
Playground.args = {
    variant: 'default',
    showIcon: true,
    activeClassName: '',
    inactiveClassName: '',
};

export const Uncontrolled: Story = {
    render: (args: any) => (
        <Tabs defaultValue="tab1">
            <TabList variant={args.variant}>
                <Tab value="tab1">Tab 1</Tab>
                <Tab value="tab2">Tab 2</Tab>
            </TabList>
            <TabPanel value="tab1">Content 1</TabPanel>
            <TabPanel value="tab2">Content 2</TabPanel>
        </Tabs>
    ),
};

export const Controlled: Story = {
    render: (args: any) => {
        const [value, setValue] = useState('tab1');
        return (
            <Tabs value={value} onValueChange={setValue}>
                <TabList variant={args.variant}>
                    <Tab value="tab1">Tab 1</Tab>
                    <Tab value="tab2">Tab 2</Tab>
                </TabList>
                <TabPanel value="tab1">Content 1</TabPanel>
                <TabPanel value="tab2">Content 2</TabPanel>
            </Tabs>
        );
    },
};
