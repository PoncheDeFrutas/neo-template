# React + TypeScript + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## Expanding the ESLint configuration

If you are developing a production application, we recommend updating the configuration to enable type-aware lint rules:

```js
export default tseslint.config([
    globalIgnores(['dist']),
    {
        files: ['**/*.{ts,tsx}'],
        extends: [
            // Other configs...

            // Remove tseslint.configs.recommended and replace with this
            ...tseslint.configs.recommendedTypeChecked,
            // Alternatively, use this for stricter rules
            ...tseslint.configs.strictTypeChecked,
            // Optionally, add this for stylistic rules
            ...tseslint.configs.stylisticTypeChecked,

            // Other configs...
        ],
        languageOptions: {
            parserOptions: {
                project: ['./tsconfig.node.json', './tsconfig.app.json'],
                tsconfigRootDir: import.meta.dirname,
            },
            // other options...
        },
    },
]);
```

You can also install [eslint-plugin-react-x](https://github.com/Rel1cx/eslint-react/tree/main/packages/plugins/eslint-plugin-react-x) and [eslint-plugin-react-dom](https://github.com/Rel1cx/eslint-react/tree/main/packages/plugins/eslint-plugin-react-dom) for React-specific lint rules:

```js
// eslint.config.js
import reactX from 'eslint-plugin-react-x';
import reactDom from 'eslint-plugin-react-dom';

export default tseslint.config([
    globalIgnores(['dist']),
    {
        files: ['**/*.{ts,tsx}'],
        extends: [
            // Other configs...
            // Enable lint rules for React
            reactX.configs['recommended-typescript'],
            // Enable lint rules for React DOM
            reactDom.configs.recommended,
        ],
        languageOptions: {
            parserOptions: {
                project: ['./tsconfig.node.json', './tsconfig.app.json'],
                tsconfigRootDir: import.meta.dirname,
            },
            // other options...
        },
    },
]);
```

## Estructura de carpetas

Este proyecto usa una jerarquía inspirada en Feature-Sliced Design para organizar el código de forma escalable:

- `src/app`: punto de entrada de la aplicación, configuración global (routing, providers, estilos globales), y composición raíz.
- `src/pages`: páginas completas (rutas) compuestas por widgets/features. Sin lógica de negocio propia.
- `src/widgets`: bloques UI de alto nivel que combinan varias features y entidades.
- `src/features`: unidades funcionales independientes centradas en casos de uso del usuario (formularios, interacciones, etc.).
- `src/entities`: modelos y UI asociados a entidades del dominio (User, Product, etc.). Reutilizables y sin conocimiento de casos de uso.
- `src/shared`: utilidades y recursos compartidos (libs, ui básicos, hooks, api, config, assets).

Atajos de importación:

- Alias `@/*` apunta a `src/*` (ver `tsconfig.app.json`). Ejemplo: `import { Button } from '@/shared/ui/button'`.

Reglas de importación por capas:

- El linter (`eslint-plugin-boundaries`) restringe dependencias entre capas para mantener la arquitectura. Revisa `eslint.config.js` para ver qué capas pueden importar a cuáles.
