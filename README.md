# Neo Template

## Getting Started

Instala las dependencias:

```bash
pnpm install
```

Ejecuta el entorno de desarrollo:

```bash
pnpm dev
```

Genera la build de producción:

```bash
pnpm build
```

Previsualiza la build:

```bash
pnpm preview
```

### Scripts Adicionales

Ejecuta Storybook:

```bash
pnpm storybook
```

Lanza las pruebas:

```bash
pnpm test
```

Revisa el linting:

```bash
pnpm lint
```

Corrige automáticamente:

```bash
pnpm lint:fix
```

### Variables de entorno

Copia `.env.example` a `.env` y completa las variables necesarias como `VITE_API_BASE_URL`.

### Estructura del proyecto

Este template sigue la arquitectura Feature-Sliced. Usa las carpetas de la siguiente manera:

- `pages/`: componentes vinculados a rutas. Crea una página cuando agregues una ruta nueva.
- `widgets/`: bloques de UI que combinan entidades y features. Ejemplo: `src/widgets/counter`.
- `features/`: acciones del usuario o casos de uso aislados. Ejemplo: `src/features/counter`.
- `entities/`: modelos de negocio y lógica relacionada.
- `shared/`: utilidades reutilizables, estilos y componentes independientes.

Sigue estas pautas para decidir dónde ubicar nuevos archivos.