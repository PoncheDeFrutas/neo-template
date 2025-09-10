import { useTheme } from '@app/providers/ThemeProvider';
import { Moon, Sun } from 'lucide-react';
import type { FC } from 'react';

import { Button } from '@/shared/ui';

/**
 * A toggle button component that switches between light and dark themes.
 *
 * @component
 * @returns {JSX.Element} A circular button that displays a moon icon in light mode
 * and a sun icon in dark mode. Clicking the button toggles between themes.
 *
 * @example
 * ```tsx
 * <ThemeToggle />
 * ```
 */
export const ThemeToggle: FC = () => {
    const { theme, toggleTheme } = useTheme();
    return (
        <>
            <Button
                variant="custom"
                size="icon"
                shape="circle"
                className="bg-bg text-text border-border !border-[0.5px] hover:bg-opacity-40"
                aria-label="Modo"
                onClick={toggleTheme}
            >
                {theme === 'light' ? <Moon size={20} /> : <Sun size={20} />}
            </Button>
        </>
    );
};

export default ThemeToggle;
