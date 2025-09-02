import { useEffect, useRef, useState } from 'react';

export interface CarouselItem {
    src: string;
    alt?: string;
    href?: string;
}

interface CarouselProps {
    items: CarouselItem[];
    autoPlay?: boolean;
    interval?: number;
    className?: string;
}

export const Carousel: React.FC<CarouselProps> = ({
    items,
    autoPlay = true,
    interval = 4000,
    className = '',
}) => {
    const [index, setIndex] = useState(0);
    const goTo = (i: number) => setIndex((i + items.length) % items.length);
    const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

    useEffect(() => {
        if (!autoPlay) return;
        const id = setInterval(() => goTo(index + 1), interval);
        return () => clearInterval(id);
    }, [index, autoPlay, interval]);
    useEffect(() => {
        if (intervalRef.current) {
            clearInterval(intervalRef.current);
        }
        if (autoPlay) {
            intervalRef.current = setInterval(
                () => setIndex((i) => (i + 1) % items.length),
                interval,
            );
        }
        return () => {
            if (intervalRef.current) {
                clearInterval(intervalRef.current);
            }
        };
    }, [autoPlay, interval, items.length]);

    return (
        <div className={`relative w-full overflow-hidden ${className}`}>
            {items.map((item, i) => (
                <div
                    key={i}
                    className={`absolute inset-0 transition-opacity duration-700 ${
                        i === index ? 'opacity-100' : 'opacity-0'
                    }`}
                >
                    {item.href ? (
                        <a href={item.href} target="_blank" rel="noopener">
                            <img
                                src={item.src}
                                alt={item.alt}
                                className="w-full h-full object-cover"
                            />
                        </a>
                    ) : (
                        <img src={item.src} alt={item.alt} className="w-full h-full object-cover" />
                    )}
                </div>
            ))}

            <button
                onClick={() => goTo(index - 1)}
                className="absolute top-1/2 left-3 -translate-y-1/2
                   p-2 rounded-full bg-white/30 dark:bg-gray-800/30
                   hover:bg-white/50 dark:hover:bg-gray-800/50
                   text-gray-800 dark:text-white"
            >
                ‹
            </button>

            <button
                onClick={() => goTo(index + 1)}
                className="absolute top-1/2 right-3 -translate-y-1/2
                   p-2 rounded-full bg-white/30 dark:bg-gray-800/30
                   hover:bg-white/50 dark:hover:bg-gray-800/50
                   text-gray-800 dark:text-white"
            >
                ›
            </button>

            <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex space-x-2">
                {items.map((_, i) => (
                    <button
                        key={i}
                        onClick={() => goTo(i)}
                        className={`w-3 h-3 rounded-full border
                        ${i === index ? 'bg-white dark:bg-gray-800' : 'bg-transparent'}`}
                    />
                ))}
            </div>
        </div>
    );
};
