import type { Meta, StoryObj } from '@storybook/react-vite';
import { Carousel, type CarouselItem } from '@shared/ui/carousel';

const meta: Meta<typeof Carousel> = {
    title: 'Shared/Carousel',
    component: Carousel,
    parameters: { layout: 'fullscreen' },
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
};
