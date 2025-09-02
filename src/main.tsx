/**
 * Main entry point for the React application.
 *
 * Sets up the root component with necessary providers and renders the application
 * into the DOM element with id 'root'. The application is wrapped with:
 * - StrictMode for development checks and warnings
 * - ThemeProvider for consistent theming across the application
 *
 * @fileoverview Application bootstrap and initialization
 */
import { ThemeProvider } from './app/providers/ThemeProvider';
import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import App from '@app/index';

createRoot(document.getElementById('root')!).render(
    <StrictMode>
        <ThemeProvider>
            <App />
        </ThemeProvider>
    </StrictMode>,
);
