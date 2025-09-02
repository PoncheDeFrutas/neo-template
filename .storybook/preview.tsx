import type { Preview } from '@storybook/react-vite';
import React, { useEffect } from 'react';
import '../src/index.css';

const withTheme = (Story: any, context: any) => {
    const { theme } = context.globals;

    useEffect(() => {
        const root = document.documentElement;
        const apply = (mode: string) => {
            // Add temporary transition class to animate theme change consistently
            root.classList.add('theme-transition');
            if (mode === 'dark') root.classList.add('dark');
            else if (mode === 'light') root.classList.remove('dark');
            else
                root.classList.toggle(
                    'dark',
                    window.matchMedia('(prefers-color-scheme: dark)').matches,
                );
            // Remove the class after the duration to avoid affecting other transitions
            const timeout = window.setTimeout(
                () => root.classList.remove('theme-transition'),
                320,
            );
            return () => window.clearTimeout(timeout);
        };
        const cleanup = apply(theme);

        let mql: MediaQueryList | null = null;
        const onChange = (e: MediaQueryListEvent) => {
            if (context.globals.theme === 'system') {
                root.classList.toggle('dark', e.matches);
            }
        };
        if (theme === 'system') {
            mql = window.matchMedia('(prefers-color-scheme: dark)');
            mql.addEventListener?.('change', onChange);
        }
        return () => {
            mql?.removeEventListener?.('change', onChange);
            cleanup?.();
        };
    }, [context.globals.theme]);

    return <Story />;
};

const preview: Preview = {
    globalTypes: {
        theme: {
            description: 'UI theme',
            defaultValue: 'light',
            toolbar: {
                icon: 'mirror',
                items: [
                    { value: 'light', title: 'Light' },
                    { value: 'dark', title: 'Dark' },
                    { value: 'system', title: 'System' },
                ],
                dynamicTitle: true,
            },
        },
    },
    decorators: [withTheme],
    parameters: {
        controls: {
            matchers: {
                color: /(background|color)$/i,
                date: /Date$/i,
            },
        },
        backgrounds: {
            default: 'transparent',
            values: [
                { name: 'light', value: '#ffffff' },
                { name: 'dark', value: '#0f172a' },
                { name: 'transparent', value: 'transparent' },
            ],
        },
        a11y: {
            test: 'todo',
        },
    },
};

export default preview;
