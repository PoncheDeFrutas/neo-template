import { createContext, type ReactNode, useCallback, useContext, useEffect, useState } from 'react';

export type Theme = 'light' | 'dark';

interface ThemeContextValue {
    theme: Theme;
    toggleTheme: () => void;
}

export const ThemeContext = createContext<ThemeContextValue>({
    theme: 'light',
    toggleTheme: () => {},
});

interface ThemeProviderProps {
    children: ReactNode;
    persist?: boolean;
}

const STORAGE_KEY = 'theme';

export function ThemeProvider({ children, persist = true }: ThemeProviderProps) {
    const [theme, setTheme] = useState<Theme>(() => {
        if (persist && typeof window !== 'undefined') {
            const stored = window.localStorage.getItem(STORAGE_KEY) as Theme | null;
            if (stored === 'light' || stored === 'dark') {
                return stored;
            }
        }
        return 'light';
    });

    useEffect(() => {
        if (persist && typeof window !== 'undefined') {
            window.localStorage.setItem(STORAGE_KEY, theme);
        }
        if (typeof document !== 'undefined') {
            document.documentElement.classList.toggle('dark', theme === 'dark');
        }
    }, [theme, persist]);

    const toggleTheme = useCallback(() => {
        setTheme((prev) => (prev === 'light' ? 'dark' : 'light'));
    }, []);

    return <ThemeContext.Provider value={{ theme, toggleTheme }}>{children}</ThemeContext.Provider>;
}

// eslint-disable-next-line react-refresh/only-export-components
export const useTheme = () => useContext(ThemeContext);
