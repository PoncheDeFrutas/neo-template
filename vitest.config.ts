/// <reference types="vitest/config" />
import { defineConfig } from 'vitest/config';
import react from '@vitejs/plugin-react';
import tsconfigPaths from 'vite-tsconfig-paths';
export default defineConfig({
    plugins: [react(), tsconfigPaths()],
    test: {
        environment: 'jsdom',
        setupFiles: ['./src/test/setup.ts'],
        globals: true,
        css: true,
        coverage: {
            provider: 'v8',
            include: ['src/features/auth/**', 'src/shared/router/**'],
            thresholds: {
                statements: 70,
                branches: 70,
                functions: 60,
                lines: 70,
            },
        },
    },
});
