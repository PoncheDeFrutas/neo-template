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

export const VariantDefault: Story = {
    name: 'Variant: Default',
    render: () => (
        <Tabs defaultValue="tab1">
            <TabList variant="default">
                <Tab value="tab1">Tab 1</Tab>
                <Tab value="tab2">Tab 2</Tab>
                <Tab value="tab3">Tab 3</Tab>
            </TabList>
            <TabPanel value="tab1">Default variant: Content 1</TabPanel>
            <TabPanel value="tab2">Default variant: Content 2</TabPanel>
            <TabPanel value="tab3">Default variant: Content 3</TabPanel>
        </Tabs>
    ),
};

export const VariantUnderline: Story = {
    name: 'Variant: Underline',
    render: () => (
        <Tabs defaultValue="tab1">
            <TabList variant="underline">
                <Tab value="tab1">Overview</Tab>
                <Tab value="tab2">Details</Tab>
                <Tab value="tab3">Reviews</Tab>
            </TabList>
            <TabPanel value="tab1">Underline variant: Overview</TabPanel>
            <TabPanel value="tab2">Underline variant: Details</TabPanel>
            <TabPanel value="tab3">Underline variant: Reviews</TabPanel>
        </Tabs>
    ),
};

export const VariantPill: Story = {
    name: 'Variant: Pill',
    render: () => (
        <Tabs defaultValue="tab1">
            <TabList variant="pill">
                <Tab value="tab1">All</Tab>
                <Tab value="tab2">Active</Tab>
                <Tab value="tab3">Archived</Tab>
            </TabList>
            <TabPanel value="tab1">Pill variant: All items</TabPanel>
            <TabPanel value="tab2">Pill variant: Active items</TabPanel>
            <TabPanel value="tab3">Pill variant: Archived items</TabPanel>
        </Tabs>
    ),
};

export const VariantVertical: Story = {
    name: 'Variant: Vertical',
    render: () => (
        <div style={{ display: 'flex', gap: 16 }}>
            <Tabs defaultValue="tab1">
                <TabList variant="vertical">
                    <Tab value="tab1">Profile</Tab>
                    <Tab value="tab2">Security</Tab>
                    <Tab value="tab3">Notifications</Tab>
                </TabList>
                <div style={{ paddingLeft: 16 }}>
                    <TabPanel value="tab1">Vertical variant: Profile</TabPanel>
                    <TabPanel value="tab2">Vertical variant: Security</TabPanel>
                    <TabPanel value="tab3">Vertical variant: Notifications</TabPanel>
                </div>
            </Tabs>
        </div>
    ),
};

export const VariantFullWidth: Story = {
    name: 'Variant: Full Width',
    render: () => (
        <div style={{ width: 480 }}>
            <Tabs defaultValue="tab1">
                <TabList variant="fullWidth">
                    <Tab value="tab1">First</Tab>
                    <Tab value="tab2">Second</Tab>
                    <Tab value="tab3">Third</Tab>
                </TabList>
                <TabPanel value="tab1">Full width variant: First</TabPanel>
                <TabPanel value="tab2">Full width variant: Second</TabPanel>
                <TabPanel value="tab3">Full width variant: Third</TabPanel>
            </Tabs>
        </div>
    ),
};

// Icon example for Tabs
const TabStarIcon = (
    <svg className="w-4 h-4" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.357 4.19h4.4c.969 0 1.371 1.24.588 1.81l-3.567 2.59 1.357 4.19c.3.921-.755 1.688-1.539 1.118L10 14.347l-3.548 2.478c-.784.57-1.838-.197-1.539-1.118l1.357-4.19-3.567-2.59c-.783-.57-.38-1.81.588-1.81h4.4l1.357-4.19z" />
    </svg>
);

export const WithIcon: Story = {
    name: 'With Icon',
    render: () => (
        <Tabs defaultValue="tab1">
            <TabList>
                <Tab icon={TabStarIcon} value="tab1">Featured</Tab>
                <Tab icon={TabStarIcon} value="tab2">Popular</Tab>
                <Tab icon={TabStarIcon} value="tab3">New</Tab>
            </TabList>
            <TabPanel value="tab1">Tab with icon: Featured</TabPanel>
            <TabPanel value="tab2">Tab with icon: Popular</TabPanel>
            <TabPanel value="tab3">Tab with icon: New</TabPanel>
        </Tabs>
    ),
};
