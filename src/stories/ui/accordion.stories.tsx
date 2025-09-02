import { Accordion, AccordionItem } from '@shared/ui';
import type { Meta, StoryObj } from '@storybook/react-vite';

/**
 * Storybook meta configuration for the Accordion component.
 *
 * Provides metadata including component reference, subcomponents, controls and
 * default args for documenting the Accordion and its variants.
 *
 * @property {string} title - Sidebar label in Storybook
 * @property {React.Component} component - The Accordion component
 * @property {object} subcomponents - Related subcomponents (AccordionItem)
 * @property {object} parameters - Storybook parameters such as layout
 * @property {string[]} tags - Tags for automatic documentation generation
 * @property {object} args - Default prop values
 * @property {object} argTypes - Control definitions for interactive props
 */
const meta = {
    title: 'Shared/Accordion',
    component: Accordion,
    subcomponents: { AccordionItem },
    parameters: {
        layout: 'centered',
    },
    tags: ['autodocs'],
    argTypes: {
        alwaysOpen: { control: { type: 'boolean' } },
        flush: { control: { type: 'boolean' } },
        color: { control: { type: 'text' } },
    },
    args: {
        alwaysOpen: false,
        flush: false,
        color: 'border-border',
    },
} satisfies Meta<typeof Accordion>;

export default meta;

/**
 * Story type alias for Accordion component stories.
 */
export type Story = StoryObj<typeof Accordion>;

/**
 * Default accordion where only one panel can be expanded at a time.
 */
export const Default: Story = {
    render: () => (
        <Accordion>
            <AccordionItem value="item1" title="Item 1">
                This is the first item's content.
            </AccordionItem>
            <AccordionItem value="item2" title="Item 2">
                This is the second item's content.
            </AccordionItem>
            <AccordionItem value="item3" title="Item 3">
                This is the third item's content.
            </AccordionItem>
        </Accordion>
    ),
};

/**
 * Accordion allowing multiple panels to stay open simultaneously.
 */
export const AlwaysOpen: Story = {
    render: () => (
        <Accordion alwaysOpen>
            <AccordionItem value="item1" title="Item 1">
                First content.
            </AccordionItem>
            <AccordionItem value="item2" title="Item 2">
                Second content.
            </AccordionItem>
            <AccordionItem value="item3" title="Item 3">
                Third content.
            </AccordionItem>
        </Accordion>
    ),
};

/**
 * Accordion with custom border color.
 */
export const Colored: Story = {
    render: () => (
        <Accordion color="border-green-500">
            <AccordionItem value="item1" title="Green Item 1">
                Content with green borders.
            </AccordionItem>
            <AccordionItem value="item2" title="Green Item 2">
                Another green-bordered section.
            </AccordionItem>
        </Accordion>
    ),
};

/**
 * Accordion without outer border, using only internal separators.
 */
export const Flush: Story = {
    render: () => (
        <Accordion flush>
            <AccordionItem value="item1" title="Flush Item 1">
                Content of item 1.
            </AccordionItem>
            <AccordionItem value="item2" title="Flush Item 2">
                Content of item 2.
            </AccordionItem>
        </Accordion>
    ),
};

const PlusIcon = (
    <svg
        className="w-4 h-4"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        aria-hidden="true"
    >
        <path d="M12 5v14M5 12h14" />
    </svg>
);

/**
 * Accordion using a custom icon for the expand arrow.
 */
export const ArrowStyle: Story = {
    render: () => (
        <Accordion arrowIcon={PlusIcon}>
            <AccordionItem value="item1" title="Custom Arrow 1">
                First custom arrow content.
            </AccordionItem>
            <AccordionItem value="item2" title="Custom Arrow 2">
                Second custom arrow content.
            </AccordionItem>
        </Accordion>
    ),
};

/**
 * Demonstrates nesting an Accordion inside another AccordionItem.
 */
export const Nested: Story = {
    render: () => (
        <Accordion>
            <AccordionItem value="outer1" title="Outer 1">
                Outer content before nested accordion.
                <Accordion className="mt-2">
                    <AccordionItem value="inner1" title="Inner 1">
                        Inner item content 1.
                    </AccordionItem>
                    <AccordionItem value="inner2" title="Inner 2">
                        Inner item content 2.
                    </AccordionItem>
                </Accordion>
            </AccordionItem>
            <AccordionItem value="outer2" title="Outer 2">
                Another outer content section.
            </AccordionItem>
        </Accordion>
    ),
};
