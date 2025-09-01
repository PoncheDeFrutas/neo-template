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



### Estructura y Organización del Proyecto

Este template sigue la arquitectura **Feature-Sliced Design** para escalar proyectos de frontend de manera mantenible y predecible. A continuación se detalla el propósito de cada carpeta, cómo decidir dónde ubicar archivos y buenas prácticas para mantener la coherencia del proyecto.

#### Estructura principal

- **`pages/`**: Componentes vinculados a rutas (cada subcarpeta representa una página). Aquí solo debe haber lógica de composición y layout de página, nunca lógica de negocio ni lógica de UI compleja. Ejemplo: `src/pages/about`.
    - _Cuándo usar_: Cuando agregues una nueva ruta en el router.
    - _Qué poner_: Composición de widgets, features y entidades para esa ruta.

- **`widgets/`**: Bloques de UI que combinan entidades y features para formar secciones reutilizables de una página. Ejemplo: `src/widgets/counter`.
    - _Cuándo usar_: Cuando una sección de la UI se reutiliza en varias páginas o es suficientemente compleja.
    - _Qué poner_: Composición de features, entidades y componentes shared.

- **`features/`**: Funcionalidades o acciones del usuario aisladas (casos de uso). Ejemplo: `src/features/counter`.
    - _Cuándo usar_: Cuando una acción o interacción del usuario puede ser reutilizada o aislada (ej: login, like, agregar al carrito).
    - _Qué poner_: Lógica de interacción, hooks, componentes UI específicos de la feature.

- **`entities/`**: Modelos de negocio, lógica y estado relacionados a conceptos del dominio (ej: usuario, producto). Ejemplo: `src/entities/user`.
    - _Cuándo usar_: Cuando defines un modelo de datos o lógica asociada a un concepto de negocio.
    - _Qué poner_: Tipos, esquemas, adaptadores, API, slices de estado, selectores.

- **`shared/`**: Utilidades, helpers, componentes UI atómicos, estilos y lógica reutilizable en todo el proyecto. Ejemplo: `src/shared/ui/button.tsx`.
    - _Cuándo usar_: Cuando algo es genérico y puede ser usado por cualquier feature, entidad, widget o página.
    - _Qué poner_: Componentes UI atómicos, hooks genéricos, helpers, constantes, estilos globales.

#### Ejemplo de organización para una nueva funcionalidad

Supón que agregas una funcionalidad de "favoritos":

```
src/
    entities/
        favorite/
            types.ts        // Tipos y esquemas de favoritos
            adapter.ts      // Mapeo y validación de datos
            api.ts          // Llamadas a la API de favoritos
    features/
        add-favorite/
            ui/
                AddFavoriteButton.tsx // Botón para agregar a favoritos
            model/
                useAddFavorite.ts     // Hook para manejar la lógica
    widgets/
        favorites-list/
            ui/
                FavoritesList.tsx     // Lista de favoritos
            index.ts
    pages/
        profile/
            ui/
                ProfilePage.tsx       // Página de perfil que usa el widget de favoritos
            index.ts
```

#### Buenas prácticas y convenciones

- **Nombrado**: Usa nombres en inglés y en kebab-case para carpetas, PascalCase para componentes y camelCase para funciones y variables.
- **Evita dependencias circulares**: Las capas solo pueden importar de capas inferiores (shared < entities < features < widgets < pages).
- **No mezcles lógica**: Mantén la lógica de negocio en entities, la lógica de interacción en features y la composición en widgets/pages.
- **Componentes UI**: Si un componente UI es genérico, va en `shared/ui`. Si es específico de una feature, va en `features/<feature>/ui`.
- **Hooks**: Los hooks genéricos van en `shared`, los específicos en la feature o entidad correspondiente.
- **Validación**: Usa los esquemas de Zod en `entities/<entidad>/types.ts` y valida siempre las respuestas de la API en los adaptadores.
- **Reutilización**: Si un bloque de UI se repite en varias páginas, conviértelo en un widget.
- **Documenta**: Agrega comentarios y documentación breve en los archivos clave.

#### Ejemplo de decisión de ubicación

- **¿Dónde pongo un botón de "Like"?**
    - Si es un botón genérico: `shared/ui/LikeButton.tsx`.
    - Si solo se usa en la feature de likes: `features/like/ui/LikeButton.tsx`.

- **¿Dónde pongo un hook para paginación?**
    - Si es genérico: `shared/lib/hooks/usePagination.ts`.
    - Si es específico de usuarios: `entities/user/model/useUserPagination.ts`.

#### Escalabilidad y mantenimiento

- Divide las features y entidades en subcarpetas si crecen mucho.
- Usa barriles (`index.ts`) para exportar módulos y simplificar imports.
- Mantén el código desacoplado y enfocado en una sola responsabilidad por archivo.
- Revisa y refactoriza la estructura periódicamente para evitar la acumulación de deuda técnica.

---

Sigue estas pautas para decidir dónde ubicar nuevos archivos y mantener el proyecto escalable y fácil de entender para cualquier miembro del equipo.

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