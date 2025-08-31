import { Tabs, TabList, Tab, TabPanel } from '@shared/ui';
import type { Meta, StoryObj } from '@storybook/react-vite';
import { useState } from 'react';

const meta = {
    title: 'Shared/Tabs',
    component: Tabs,
    parameters: {
        layout: 'centered',
    },
    tags: ['autodocs'],
} satisfies Meta<typeof Tabs>;

export default meta;

export type Story = StoryObj<typeof Tabs>;

export const Uncontrolled: Story = {
    render: () => (
        <Tabs defaultValue="tab1">
            <TabList>
                <Tab value="tab1">Tab 1</Tab>
                <Tab value="tab2">Tab 2</Tab>
            </TabList>
            <TabPanel value="tab1">Content 1</TabPanel>
            <TabPanel value="tab2">Content 2</TabPanel>
        </Tabs>
    ),
};

export const Controlled: Story = {
    render: () => {
        const [value, setValue] = useState('tab1');
        return (
            <Tabs value={value} onValueChange={setValue}>
                <TabList>
                    <Tab value="tab1">Tab 1</Tab>
                    <Tab value="tab2">Tab 2</Tab>
                </TabList>
                <TabPanel value="tab1">Content 1</TabPanel>
                <TabPanel value="tab2">Content 2</TabPanel>
            </Tabs>
        );
    },
};