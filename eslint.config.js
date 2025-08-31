import js from '@eslint/js';
import globals from 'globals';
import reactHooks from 'eslint-plugin-react-hooks';
import reactRefresh from 'eslint-plugin-react-refresh';
import tseslint from 'typescript-eslint';
import prettier from 'eslint-plugin-prettier';
import simpleImportSort from 'eslint-plugin-simple-import-sort';
import unusedImports from 'eslint-plugin-unused-imports';
import boundaries from 'eslint-plugin-boundaries';
import { globalIgnores } from 'eslint/config';

export default tseslint.config([
    globalIgnores(['dist']),
    {
        files: ['**/*.{ts,tsx}'],
        extends: [
            js.configs.recommended,
            tseslint.configs.recommended,
            reactHooks.configs['recommended-latest'],
            reactRefresh.configs.vite,
            'plugin:prettier/recommended',
        ],
        plugins: {
            prettier,
            'simple-import-sort': simpleImportSort,
            'unused-imports': unusedImports,
            boundaries,
        },
        languageOptions: {
            ecmaVersion: 2020,
            globals: globals.browser,
        },
        settings: {
            'boundaries/elements': [
                { type: 'shared', pattern: 'src/shared/*' },
                { type: 'entities', pattern: 'src/entities/*' },
                { type: 'features', pattern: 'src/features/*' },
                { type: 'widgets', pattern: 'src/widgets/*' },
                { type: 'pages', pattern: 'src/pages/*' },
                { type: 'app', pattern: 'src/app/*' },
            ],
        },
        rules: {
            'prettier/prettier': 'error',
            'simple-import-sort/imports': 'warn',
            'simple-import-sort/exports': 'warn',
            'unused-imports/no-unused-imports': 'warn',
            'boundaries/element-types': [
                2,
                {
                    default: 'disallow',
                    rules: [
                        { from: 'shared', to: ['shared'] },
                        { from: 'entities', to: ['shared', 'entities'] },
                        { from: 'features', to: ['shared', 'entities', 'features'] },
                        { from: 'widgets', to: ['shared', 'entities', 'features', 'widgets'] },
                        {
                            from: 'pages',
                            to: ['shared', 'entities', 'features', 'widgets', 'pages'],
                        },
                        { from: 'app', to: ['*'] },
                    ],
                },
            ],
        },
    },
]);
