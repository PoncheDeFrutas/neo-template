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
