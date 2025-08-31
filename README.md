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

### Consultas a la API

Las solicitudes HTTP se realizan mediante la instancia base de Axios ubicada en `src/shared/api/axios.ts`, la cual utiliza `VITE_API_BASE_URL` como URL base y añade headers comunes.

```ts
// src/entities/users/api.ts
import api from '@/shared/api/axios';

export const fetchUsers = () => api.get('/users');
```

Asegúrate de configurar `VITE_API_BASE_URL` en `.env` para que las consultas apunten al servidor correcto.


### Estructura del proyecto

Este template sigue la arquitectura Feature-Sliced. Usa las carpetas de la siguiente manera:

- `pages/`: componentes vinculados a rutas. Crea una página cuando agregues una ruta nueva.
- `widgets/`: bloques de UI que combinan entidades y features. Ejemplo: `src/widgets/counter`.
- `features/`: acciones del usuario o casos de uso aislados. Ejemplo: `src/features/counter`.
- `entities/`: modelos de negocio y lógica relacionada.
- `shared/`: utilidades reutilizables, estilos y componentes independientes.

Sigue estas pautas para decidir dónde ubicar nuevos archivos.

### Agregar componentes UI

1. Crea `<Componente>.tsx` en `src/shared/ui/`.
2. Registra el componente en `src/shared/ui/index.ts`.
3. Crea `src/stories/ui/<componente>.stories.tsx` con un ejemplo de uso.
4. Ejecuta `pnpm storybook` para verificar la historia.

### Definición de modelos

Los modelos de negocio se agrupan en `src/entities/<entidad>/` y suelen incluir:

- `types.ts`: define el esquema de Zod y los tipos correspondientes.
- `adapter.ts`: mapea los datos entre la API y el dominio. Aquí puedes reutilizar `validateSchema` desde `@shared/lib/validation` para validar las respuestas.
- `api.ts`: contiene las funciones de red que consumen los endpoints.

#### Ejemplo: `user`

```
src/entities/user/
├── types.ts       // esquema y tipos
├── adapter.ts     // mapUserFromApi / mapUserToApi
└── api.ts         // fetchUsers / createUser
```

En `adapter.ts`:

```ts
import { validateSchema } from '@shared/lib/validation';
import { UserApiSchema } from './types';

export function mapUserFromApi(dto: unknown) {
    const parsed = validateSchema(UserApiSchema, dto);
    return { id: parsed.id, name: parsed.name };
}
```