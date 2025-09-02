import type { Meta, StoryObj } from '@storybook/react-vite';
import { Carousel, type CarouselItem } from '@shared/ui/carousel';

const meta: Meta<typeof Carousel> = {
    title: 'Shared/Carousel',
    component: Carousel,
    parameters: { layout: 'fullscreen' },
    tags: ['autodocs'],
    argTypes: {
        autoPlay: { control: { type: 'boolean' }, description: 'Automatically cycle slides' },
        interval: { control: { type: 'number' }, description: 'Autoplay interval in ms' },
        className: { control: { type: 'text' }, description: 'Additional container classes' },
    },
};
export default meta;

const images: CarouselItem[] = [
    {
        src: 'https://via.placeholder.com/800x400?text=Slide+1',
        alt: 'Primera',
    },
    {
        src: 'https://via.placeholder.com/800x400?text=Slide+2',
        alt: 'Segunda',
    },
    {
        src: 'https://via.placeholder.com/800x400?text=Slide+3',
        alt: 'Tercera',
        href: 'https://www.ejemplo.com',
    },
];

export const Default: StoryObj<typeof Carousel> = {
    args: {
        items: images,
        autoPlay: true,
        interval: 4000,
        className: 'h-64',
    },
    parameters: {
        docs: {
            description: {
                story: 'Default carousel with autoplay enabled and a 4s interval.',
            },
        },
    },
};

export const NoAutoPlay: StoryObj<typeof Carousel> = {
    args: {
        items: images,
        autoPlay: false,
        interval: 4000,
        className: 'h-64',
    },
    parameters: {
        docs: {
            description: {
                story: 'Autoplay is disabled; use the navigation controls or dots to change slides.',
            },
        },
    },
};

export const CustomInterval: StoryObj<typeof Carousel> = {
    args: {
        items: images,
        autoPlay: true,
        interval: 1000,
        className: 'h-64',
    },
    parameters: {
        docs: {
            description: {
                story: 'Demonstrates a custom autoplay interval (1 second). Adjust the control to try other values.',
            },
        },
    },
};

export const WithLinks: StoryObj<typeof Carousel> = {
    args: {
        items: [
            {
                src: 'https://via.placeholder.com/800x400?text=Slide+1',
                alt: 'Slide 1',
                href: 'https://example.com/1',
            },
            {
                src: 'https://via.placeholder.com/800x400?text=Slide+2',
                alt: 'Slide 2',
                href: 'https://example.com/2',
            },
            {
                src: 'https://via.placeholder.com/800x400?text=Slide+3',
                alt: 'Slide 3',
                href: 'https://example.com/3',
            },
        ],
        autoPlay: true,
        interval: 4000,
        className: 'h-64',
    },
    parameters: {
        docs: {
            description: {
                story: 'Each slide is wrapped with a link (`href`) and opens in a new tab.',
            },
        },
    },
};
