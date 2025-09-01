import { useTheme } from '@app/providers/ThemeProvider';
import type { FC } from 'react';

export const ThemeToggle: FC = () => {
    const { theme, toggleTheme } = useTheme();
    return (
        <button
            type="button"
            onClick={toggleTheme}
            className="px-2 py-1 rounded-md border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-800 dark:text-gray-100"
        >
            {theme === 'light' ? 'Dark' : 'Light'}
        </button>
    );
};

export default ThemeToggle;