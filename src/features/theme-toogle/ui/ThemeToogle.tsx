import { useTheme } from '@app/providers/ThemeProvider';
import type { FC } from 'react';

export const ThemeToggle: FC = () => {
    const { theme, toggleTheme } = useTheme();
    return (
        <button
            type="button"
            onClick={toggleTheme}
            className="px-2 py-1 rounded-md border border-border bg-bg text-text transition-colors"
        >
            {theme === 'light' ? 'Dark' : 'Light'}
        </button>
    );
};

export default ThemeToggle;
