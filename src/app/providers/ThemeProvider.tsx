import { createContext, type ReactNode, useCallback, useContext, useEffect, useState } from 'react';

export type Theme = 'light' | 'dark';

/**
 * Context value interface for theme management.
 *
 * @interface ThemeContextValue
 * @property {Theme} theme - The current active theme
 * @property {() => void} toggleTheme - Function to toggle between available themes
 */
interface ThemeContextValue {
    theme: Theme;
    toggleTheme: () => void;
}

/**
 * Context for managing theme state and theme switching functionality.
 *
 * Provides access to the current theme value and a function to toggle between themes.
 * The default context value includes a 'light' theme and a no-op toggle function.
 *
 * @example
 * ```tsx
 * const { theme, toggleTheme } = useContext(ThemeContext);
 * ```
 */
// eslint-disable-next-line react-refresh/only-export-components
export const ThemeContext = createContext<ThemeContextValue>({
    theme: 'light',
    toggleTheme: () => {},
});

/**
 * Props for the ThemeProvider component.
 *
 * @interface ThemeProviderProps
 * @property {ReactNode} children - The child components to be wrapped by the theme provider
 * @property {boolean} [persist] - Optional flag to determine if theme preferences should be persisted across sessions
 */
interface ThemeProviderProps {
    children: ReactNode;
    persist?: boolean;
}

const STORAGE_KEY = 'theme';

/**
 * ThemeProvider component that manages theme state and persistence across the application.
 *
 * @param children - React children components to be wrapped by the theme provider
 * @param persist - Whether to persist theme preference in localStorage (defaults to true)
 *
 * @description
 * This provider component:
 * - Initializes theme from localStorage if persistence is enabled and valid theme is stored
 * - Falls back to 'light' theme as default
 * - Persists theme changes to localStorage when persist is true
 * - Applies 'dark' class to document.documentElement for CSS styling
 * - Provides theme state and toggleTheme function through context
 *
 * @example
 * ```tsx
 * <ThemeProvider persist={true}>
 *   <App />
 * </ThemeProvider>
 * ```
 */
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
            const root = document.documentElement;
            root.classList.add('theme-transition');
            root.classList.toggle('dark', theme === 'dark');
            const id = window.setTimeout(() => {
                root.classList.remove('theme-transition');
            }, 350);
            return () => window.clearTimeout(id);
        }
    }, [theme, persist]);

    const toggleTheme = useCallback(() => {
        setTheme((prev) => (prev === 'light' ? 'dark' : 'light'));
    }, []);

    return <ThemeContext.Provider value={{ theme, toggleTheme }}>{children}</ThemeContext.Provider>;
}

// eslint-disable-next-line react-refresh/only-export-components
export const useTheme = () => useContext(ThemeContext);
