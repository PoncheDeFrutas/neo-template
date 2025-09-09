/* eslint-disable react-refresh/only-export-components */
import type { Preview } from '@storybook/react-vite';
import type { FC, ReactNode } from 'react';
import React, { useEffect } from 'react';
import '../src/index.css';

type ThemeMode = 'light' | 'dark' | 'system';

const WithTheme: FC<{ mode: ThemeMode; children: ReactNode }> = ({ mode, children }) => {
    useEffect(() => {
        const root = document.documentElement;
        const apply = (m: ThemeMode) => {
            root.classList.add('theme-transition');
            if (m === 'dark') root.classList.add('dark');
            else if (m === 'light') root.classList.remove('dark');
            else
                root.classList.toggle(
                    'dark',
                    window.matchMedia('(prefers-color-scheme: dark)').matches,
                );
            const timeout = window.setTimeout(() => root.classList.remove('theme-transition'), 320);
            return () => window.clearTimeout(timeout);
        };
        const cleanup = apply(mode);
        let mql: MediaQueryList | null = null;
        const onChange = (e: MediaQueryListEvent) => {
            if (mode === 'system') {
                root.classList.toggle('dark', e.matches);
            }
        };
        if (mode === 'system') {
            mql = window.matchMedia('(prefers-color-scheme: dark)');
            mql.addEventListener?.('change', onChange);
        }
        return () => {
            mql?.removeEventListener?.('change', onChange);
            cleanup?.();
        };
    }, [mode]);

    return <>{children}</>;
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
    decorators: [
        (Story, context) => (
            <WithTheme mode={(context.globals.theme as ThemeMode) ?? 'light'}>
                <Story />
            </WithTheme>
        ),
    ],
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
