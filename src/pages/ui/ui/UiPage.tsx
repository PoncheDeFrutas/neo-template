import {
    Clock,
    Edit,
    Hash,
    Lock,
    Mail,
    MapPin,
    MoreHorizontal,
    Search,
    Settings,
    Star,
    Sun,
    Trash2,
    Upload,
    UploadCloud,
    User,
} from 'lucide-react';
import { type FC, useState } from 'react';

import {
    Avatar,
    Badge,
    Breadcrumbs,
    Button,
    Card,
    Checkbox,
    CircularProgress,
    Divider,
    Drawer,
    EmptyState,
    ErrorState,
    FileInput,
    IconWithText,
    Input,
    ListItem,
    Modal,
    Pagination,
    Popover,
    Progress,
    Radio,
    SearchableSelect,
    Select,
    Skeleton,
    Spinner,
    Switch,
    Table,
    Tabs,
    Textarea,
    Tooltip,
    TooltipLabel,
} from '@/shared/ui';

const UiPage: FC = () => {
    const [cityMain, setCityMain] = useState<string | null>(null);
    const [citySm, setCitySm] = useState<string | null>(null);
    const [cityErr, setCityErr] = useState<string | null>(null);
    const [openModal, setOpenModal] = useState(false);
    const [ffName, setFfName] = useState('');
    const [ffCountry, setFfCountry] = useState('');
    const [openDrawerRight, setOpenDrawerRight] = useState(false);
    const [openDrawerBottom, setOpenDrawerBottom] = useState(false);
    const [openPopover, setOpenPopover] = useState(false);
    const [openPopoverFilter, setOpenPopoverFilter] = useState(false);
    const [progress, setProgress] = useState(45);
    const [tab, setTab] = useState('general');
    const [pageMain, setPageMain] = useState(1);
    const [tableFilter, setTableFilter] = useState('');
    const [tablePage, setTablePage] = useState(1);
    const tablePageSize = 5;
    type Person = {
        id: number;
        name: string;
        email: string;
        role: string;
        status: string;
        avatar: string;
    };
    const tableData: Person[] = [
        {
            id: 1,
            name: 'María Gómez',
            email: 'maria.gomez@example.com',
            role: 'Admin',
            status: 'Activo',
            avatar: 'https://i.pravatar.cc/80?img=5',
        },
        {
            id: 2,
            name: 'Juan Pérez',
            email: 'juan.perez@example.com',
            role: 'User',
            status: 'Inactivo',
            avatar: 'https://i.pravatar.cc/80?img=6',
        },
        {
            id: 3,
            name: 'Laura García',
            email: 'laura.garcia@example.com',
            role: 'Editor',
            status: 'Activo',
            avatar: 'https://i.pravatar.cc/80?img=7',
        },
        {
            id: 4,
            name: 'Carlos Ruiz',
            email: 'carlos.ruiz@example.com',
            role: 'User',
            status: 'Activo',
            avatar: 'https://i.pravatar.cc/80?img=8',
        },
        {
            id: 5,
            name: 'Ana Fernández',
            email: 'ana.fernandez@example.com',
            role: 'User',
            status: 'Inactivo',
            avatar: 'https://i.pravatar.cc/80?img=9',
        },
        {
            id: 6,
            name: 'Diego López',
            email: 'diego.lopez@example.com',
            role: 'User',
            status: 'Activo',
            avatar: 'https://i.pravatar.cc/80?img=10',
        },
        {
            id: 7,
            name: 'Sofía Torres',
            email: 'sofia.torres@example.com',
            role: 'Admin',
            status: 'Activo',
            avatar: 'https://i.pravatar.cc/80?img=11',
        },
        {
            id: 8,
            name: 'Miguel Castro',
            email: 'miguel.castro@example.com',
            role: 'Editor',
            status: 'Inactivo',
            avatar: 'https://i.pravatar.cc/80?img=12',
        },
        {
            id: 9,
            name: 'Valentina Diaz',
            email: 'valentina.diaz@example.com',
            role: 'User',
            status: 'Activo',
            avatar: 'https://i.pravatar.cc/80?img=13',
        },
        {
            id: 10,
            name: 'Pablo Romero',
            email: 'pablo.romero@example.com',
            role: 'User',
            status: 'Activo',
            avatar: 'https://i.pravatar.cc/80?img=14',
        },
        {
            id: 11,
            name: 'Lucía Silva',
            email: 'lucia.silva@example.com',
            role: 'Editor',
            status: 'Inactivo',
            avatar: 'https://i.pravatar.cc/80?img=15',
        },
        {
            id: 12,
            name: 'Franco Morales',
            email: 'franco.morales@example.com',
            role: 'User',
            status: 'Activo',
            avatar: 'https://i.pravatar.cc/80?img=16',
        },
        {
            id: 13,
            name: 'Camila Vega',
            email: 'camila.vega@example.com',
            role: 'User',
            status: 'Activo',
            avatar: 'https://i.pravatar.cc/80?img=17',
        },
        {
            id: 14,
            name: 'Agustín Herrera',
            email: 'agustin.herrera@example.com',
            role: 'User',
            status: 'Inactivo',
            avatar: 'https://i.pravatar.cc/80?img=18',
        },
        {
            id: 15,
            name: 'Florencia Ríos',
            email: 'florencia.rios@example.com',
            role: 'Admin',
            status: 'Activo',
            avatar: 'https://i.pravatar.cc/80?img=19',
        },
    ];
    const tableFilterKeys: Array<keyof Pick<Person, 'name' | 'email' | 'role' | 'status'>> = [
        'name',
        'email',
        'role',
        'status',
    ];
    const filteredCount = tableData.filter((r) => {
        const t = tableFilter.trim().toLowerCase();
        if (!t) return true;
        return tableFilterKeys.some((k) =>
            String(r[k] ?? '')
                .toLowerCase()
                .includes(t),
        );
    }).length;
    const tablePageCount = Math.max(1, Math.ceil(filteredCount / tablePageSize));

    return (
        <>
            {/* Outline que hereda color del texto (border-current) */}

            {/* Showcase de botones: variantes, tamaños y formas */}
            <div className="mt-8 space-y-5">
                {/* Variantes */}
                <div className="space-y-2">
                    <div className="text-sm font-semibold text-muted-foreground">Variantes</div>
                    <div className="flex flex-wrap items-center gap-3">
                        <Button variant="primary">Primary</Button>
                        <Button variant="secondary">Secondary</Button>
                        <Button variant="outline">Outline</Button>
                        <Button variant="ghost">Ghost</Button>
                        <Button as="a" href="#" variant="link">
                            Link
                        </Button>
                        <Button variant="destructive">Destructive</Button>
                    </div>
                </div>

                {/* Tamaños */}
                <div className="space-y-2">
                    <div className="text-sm font-semibold text-muted-foreground">Tamaños</div>
                    <div className="flex flex-wrap items-center gap-3">
                        <Button variant="primary" size="sm">
                            Small
                        </Button>
                        <Button variant="primary" size="md">
                            Medium
                        </Button>
                        <Button variant="primary" size="lg">
                            Large
                        </Button>
                        <Button variant="secondary" size="icon" aria-label="Icono">
                            <Settings size={18} />
                        </Button>
                    </div>
                </div>

                {/* Formas */}
                <div className="space-y-2">
                    <div className="text-sm font-semibold text-muted-foreground">Formas</div>
                    <div className="flex flex-wrap items-center gap-3">
                        <Button variant="primary" shape="rounded">
                            Rounded
                        </Button>
                        <Button variant="secondary" shape="pill">
                            Pill
                        </Button>
                        <Button variant="outline" shape="square">
                            Square
                        </Button>
                        <Button variant="ghost" size="icon" shape="circle" aria-label="Círculo">
                            <Sun size={18} />
                        </Button>
                    </div>
                </div>
            </div>

            {/* Showcase de inputs: tipos, estados e iconos */}
            <div className="mt-10 space-y-3">
                <div className="text-sm font-semibold text-muted-foreground">Inputs</div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {/* Texto básico */}
                    <Input
                        label="Nombre"
                        placeholder="Ej: Juan Pérez"
                        leftIcon={<User size={16} />}
                        hint="Tu nombre completo"
                    />

                    {/* Búsqueda */}
                    <Input
                        label="Buscar"
                        placeholder="Platos, restaurantes..."
                        leftIcon={<Search size={16} />}
                    />

                    {/* Email con hint */}
                    <Input
                        type="email"
                        label="Correo"
                        placeholder="ejemplo@dominio.com"
                        leftIcon={<Mail size={16} />}
                        hint="Usa un correo válido"
                    />

                    {/* Password con toggle */}
                    <Input
                        type="password"
                        label="Contraseña"
                        placeholder="Mínimo 8 caracteres"
                        leftIcon={<Lock size={16} />}
                        passwordToggle
                    />

                    {/* Número - spinners nativos */}
                    <Input
                        type="number"
                        label="Cantidad (nativo)"
                        placeholder="Ej: 2"
                        min={0}
                        step={1}
                        numberSpinButtons="native"
                    />

                    {/* Número - spinners ocultos */}
                    <Input
                        type="number"
                        label="Cantidad (sin spinners)"
                        placeholder="Ej: 2"
                        min={0}
                        step={1}
                        numberSpinButtons="hidden"
                        rightIcon={<Hash size={16} />}
                    />

                    {/* Número - spinners personalizados */}
                    <Input
                        type="number"
                        label="Cantidad (custom)"
                        placeholder="Ej: 2"
                        min={0}
                        step={1}
                        numberSpinButtons="custom"
                    />

                    {/* Error y success */}
                    <Input
                        type="email"
                        label="Correo (con error)"
                        placeholder="usuario@correo"
                        leftIcon={<Mail size={16} />}
                        error="Formato de correo inválido"
                        hint="Debe incluir @ y dominio"
                    />
                    <Input
                        label="Usuario"
                        placeholder="Ej: juanperez"
                        leftIcon={<User size={16} />}
                        success="Disponible"
                    />
                </div>
            </div>

            {/* Showcase de File inputs */}
            <div className="mt-10 space-y-3">
                <div className="text-sm font-semibold text-muted-foreground">File inputs</div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {/* Básico */}
                    <FileInput
                        label="Documento"
                        name="document"
                        hint="Formatos permitidos: PDF, DOCX"
                        accept=".pdf,.doc,.docx"
                        leftIcon={<Upload size={16} />}
                    />

                    {/* Dropzone múltiple */}
                    <FileInput
                        label="Imágenes"
                        name="images"
                        dropzone
                        multiple
                        accept="image/*"
                        hint="Arrastra imágenes o haz click para seleccionar"
                        leftIcon={<UploadCloud size={24} />}
                        buttonLabel="Subir imágenes"
                    />
                </div>
            </div>

            {/* Showcase de textareas */}
            <div className="mt-10 space-y-4">
                <div className="text-sm font-semibold text-muted-foreground">Textareas</div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <Card
                        variant="surface"
                        padding="lg"
                        title="Básico"
                        description="Con hint y placeholder"
                    >
                        <Textarea
                            label="Descripción"
                            placeholder="Escribe una breve descripción..."
                            hint="Máximo 3-4 líneas recomendadas"
                        />
                    </Card>
                    <Card
                        variant="surface"
                        padding="lg"
                        title="Auto-resize"
                        description="Ajusta altura al contenido"
                    >
                        <Textarea
                            label="Notas"
                            placeholder="Escribe tus notas..."
                            rows={3}
                            autoResize
                            defaultValue={'Compra:\n+- Tomates\n- Queso\n- Pan integral'}
                        />
                    </Card>
                    <Card
                        variant="surface"
                        padding="lg"
                        title="Con límite"
                        description="Cuenta de caracteres"
                    >
                        <Textarea
                            label="Biografía"
                            placeholder="Cuéntanos sobre ti"
                            maxLength={120}
                            rows={4}
                            hint="Máx. 120 caracteres"
                        />
                    </Card>
                    <Card
                        variant="surface"
                        padding="lg"
                        title="Estados"
                        description="Error / éxito / disabled"
                    >
                        <div className="space-y-3">
                            <Textarea
                                label="Comentarios"
                                placeholder="Deja un comentario"
                                error="Campo requerido"
                            />
                            <Textarea
                                label="Observaciones"
                                placeholder="Todo correcto"
                                success="¡Listo!"
                            />
                            <Textarea
                                label="Solo lectura"
                                placeholder="No editable"
                                disabled
                                defaultValue="Contenido de ejemplo"
                            />
                        </div>
                    </Card>
                </div>
            </div>

            {/* Showcase de FormField (A11y wrapper) */}
            <div className="mt-10 space-y-4">
                <div className="text-sm font-semibold text-muted-foreground">
                    FormField (wrapper accesible)
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6"></div>
            </div>

            {/* Showcase de Overlays */}
            <div className="mt-10 space-y-4">
                <div className="text-sm font-semibold text-muted-foreground">Overlays</div>
                <Card
                    variant="surface"
                    padding="lg"
                    title="Modal básico"
                    description="Overlay + diálogo accesible"
                >
                    <div className="flex flex-wrap items-center gap-3">
                        <Button onClick={() => setOpenModal(true)}>Abrir modal</Button>
                        <Modal
                            open={openModal}
                            onOpenChange={setOpenModal}
                            title="Confirmar acción"
                            description="Revisa la información antes de continuar."
                            size="md"
                            footer={
                                <div className="flex justify-end gap-2">
                                    <Button variant="outline" onClick={() => setOpenModal(false)}>
                                        Cancelar
                                    </Button>
                                    <Button onClick={() => setOpenModal(false)}>Aceptar</Button>
                                </div>
                            }
                        >
                            <p className="text-sm text-muted-foreground">
                                Este es un modal minimalista con overlay y foco controlado.
                            </p>
                        </Modal>
                    </div>
                </Card>
                <Card
                    variant="surface"
                    padding="lg"
                    title="Tooltips"
                    description="Mensajes breves con delay y lado"
                >
                    <div className="flex flex-wrap items-center gap-4">
                        <Tooltip content="Configuración" side="top" delay={100}>
                            <Button variant="secondary" size="icon" aria-label="Config">
                                <Settings size={18} />
                            </Button>
                        </Tooltip>
                        <Tooltip content="Cambiar tema" side="right" delay={150}>
                            <Button variant="ghost" size="icon" aria-label="Tema">
                                <Sun size={18} />
                            </Button>
                        </Tooltip>
                        <Tooltip content="Buscar" side="bottom" delay={250}>
                            <Button variant="outline" size="md">
                                Buscar
                            </Button>
                        </Tooltip>
                        <Tooltip content="Eliminar" side="left" delay={300}>
                            <Button variant="destructive" size="md">
                                Eliminar
                            </Button>
                        </Tooltip>
                    </div>
                </Card>
                <Card
                    variant="surface"
                    padding="lg"
                    title="Popovers"
                    description="Contenido flotante con acciones"
                >
                    <div className="flex flex-wrap items-center gap-4">
                        <Popover
                            panel={
                                <div className="min-w-52 space-y-2">
                                    <div className="text-sm font-medium">Acciones</div>
                                    <Divider />
                                    <Button variant="ghost" className="w-full justify-start">
                                        Compartir
                                    </Button>
                                    <Button variant="ghost" className="w-full justify-start">
                                        Duplicar
                                    </Button>
                                    <Button
                                        variant="ghost"
                                        className="w-full justify-start text-danger"
                                    >
                                        Eliminar
                                    </Button>
                                </div>
                            }
                            side="bottom"
                            align="start"
                        >
                            <Button variant="primary">Abrir popover</Button>
                        </Popover>

                        <Popover
                            panel={
                                <div className="min-w-64 space-y-3">
                                    <div className="text-sm font-medium">Filtro rápido</div>
                                    <Select
                                        label="Categoría"
                                        placeholder="Selecciona"
                                        options={[
                                            { label: 'Todos', value: 'all' },
                                            { label: 'Activos', value: 'active' },
                                        ]}
                                    />
                                    <Button
                                        variant="secondary"
                                        className="w-full"
                                        onClick={() => setOpenPopoverFilter(false)}
                                    >
                                        Aplicar
                                    </Button>
                                </div>
                            }
                            side="right"
                            align="center"
                            open={openPopoverFilter}
                            onOpenChange={setOpenPopoverFilter}
                            closeOnOutsideClick={false}
                        >
                            <Button variant="outline">Filtro</Button>
                        </Popover>

                        <Popover
                            panel={
                                <div className="min-w-52 space-y-2">
                                    <div className="text-sm">Controlado</div>
                                    <p className="text-xs text-muted-foreground">
                                        Este popover usa prop open.
                                    </p>
                                </div>
                            }
                            side="top"
                            align="end"
                            open={openPopover}
                            onOpenChange={setOpenPopover}
                        >
                            <Button variant="ghost" onClick={() => setOpenPopover((v) => !v)}>
                                Toggle controlado
                            </Button>
                        </Popover>
                    </div>
                </Card>
                <Card
                    variant="surface"
                    padding="lg"
                    title="Drawer / Sheet"
                    description="Anclado a los bordes (ideal móvil)"
                >
                    <div className="flex flex-wrap items-center gap-3">
                        <Button variant="primary" onClick={() => setOpenDrawerRight(true)}>
                            Abrir desde la derecha
                        </Button>
                        <Button variant="secondary" onClick={() => setOpenDrawerBottom(true)}>
                            Abrir desde abajo
                        </Button>
                    </div>
                    <Drawer
                        open={openDrawerRight}
                        onOpenChange={setOpenDrawerRight}
                        side="right"
                        title="Ajustes"
                        description="Preferencias de la cuenta"
                        footer={
                            <div className="flex justify-end gap-2">
                                <Button variant="outline" onClick={() => setOpenDrawerRight(false)}>
                                    Cerrar
                                </Button>
                                <Button onClick={() => setOpenDrawerRight(false)}>Guardar</Button>
                            </div>
                        }
                    >
                        <div className="space-y-4">
                            <Input label="Nombre" placeholder="Ej: María" />
                            <Select
                                label="País"
                                placeholder="Selecciona"
                                options={[
                                    { label: 'Argentina', value: 'ar' },
                                    { label: 'Uruguay', value: 'uy' },
                                ]}
                            />
                            <Switch label="Notificaciones" defaultChecked />
                        </div>
                    </Drawer>
                    <Drawer
                        open={openDrawerBottom}
                        onOpenChange={setOpenDrawerBottom}
                        side="bottom"
                        title="Selecciona una opción"
                        description="Acciones rápidas"
                        footer={
                            <div className="flex justify-end gap-2">
                                <Button
                                    variant="outline"
                                    onClick={() => setOpenDrawerBottom(false)}
                                >
                                    Cancelar
                                </Button>
                            </div>
                        }
                    >
                        <div className="grid grid-cols-2 gap-3">
                            <Button variant="ghost">Compartir</Button>
                            <Button variant="ghost">Duplicar</Button>
                            <Button variant="ghost">Mover</Button>
                            <Button variant="ghost" onClick={() => setOpenDrawerBottom(false)}>
                                Eliminar
                            </Button>
                        </div>
                    </Drawer>
                </Card>
            </div>

            {/* Showcase de Progreso */}
            <div className="mt-10 space-y-4">
                <div className="text-sm font-semibold text-muted-foreground">Progreso</div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <Card
                        variant="surface"
                        padding="lg"
                        title="Lineal"
                        description="Determinístico e indeterminado"
                    >
                        <div className="space-y-4">
                            <Progress value={progress} />
                            <div className="flex items-center gap-2">
                                <Button
                                    size="sm"
                                    variant="outline"
                                    onClick={() => setProgress((p) => Math.max(0, p - 10))}
                                >
                                    -10%
                                </Button>
                                <Button
                                    size="sm"
                                    onClick={() => setProgress((p) => Math.min(100, p + 10))}
                                >
                                    +10%
                                </Button>
                                <span className="text-sm text-muted-foreground">{progress}%</span>
                            </div>
                            <Divider />
                            <Progress indeterminate />
                            <div className="flex items-center gap-2">
                                <Spinner indeterminate size={20} ariaLabel="Cargando" />
                                <span className="text-xs text-muted-foreground">Indeterminado</span>
                            </div>
                        </div>
                    </Card>
                    <Card
                        variant="surface"
                        padding="lg"
                        title="Circular"
                        description="Indicador de porcentaje"
                    >
                        <div className="flex items-center gap-8">
                            <div className="flex flex-col items-center gap-2">
                                <CircularProgress value={progress} size={48} stroke={4} />
                                <span className="text-xs text-muted-foreground">{progress}%</span>
                            </div>
                            <div className="flex flex-col items-center gap-2">
                                <Spinner
                                    value={progress}
                                    size={48}
                                    thickness={4}
                                    showLabel
                                    ariaLabel="Progreso circular"
                                />
                                <span className="text-xs text-muted-foreground">
                                    Spinner determinado
                                </span>
                            </div>
                            <div className="flex flex-col items-center gap-2">
                                <Spinner indeterminate size={32} ariaLabel="Cargando" />
                                <span className="text-xs text-muted-foreground">
                                    Spinner indeterminado
                                </span>
                            </div>
                        </div>
                    </Card>
                </div>
            </div>

            {/* Showcase de Estados */}
            <div className="mt-10 space-y-4">
                <div className="text-sm font-semibold text-muted-foreground">
                    Estados vacíos / error
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <Card
                        variant="surface"
                        padding="lg"
                        title="Empty State"
                        description="Vista para cuando no hay datos"
                    >
                        <EmptyState
                            title="Sin resultados"
                            description="Aún no has agregado elementos. Comienza creando tu primer ítem."
                            action={<Button>Agregar ítem</Button>}
                        />
                    </Card>
                    <Card
                        variant="surface"
                        padding="lg"
                        title="Error State"
                        description="Vista para errores recuperables"
                    >
                        <ErrorState
                            title="Ocurrió un error"
                            description="No pudimos cargar la información. Verifica tu conexión e intenta nuevamente."
                            action={<Button variant="outline">Reintentar</Button>}
                        />
                    </Card>
                </div>
            </div>

            {/* Showcase de Navegación */}
            <div className="mt-10 space-y-4">
                <div className="text-sm font-semibold text-muted-foreground">Navegación</div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <Card
                        variant="surface"
                        padding="lg"
                        title="Tabs"
                        description="Secciones con contenido conmutable"
                    >
                        <Tabs
                            value={tab}
                            onValueChange={setTab}
                            items={[
                                {
                                    value: 'general',
                                    label: 'General',
                                    content: (
                                        <div className="text-sm text-muted-foreground">
                                            Información general del elemento. Aquí puedes colocar un
                                            resumen.
                                        </div>
                                    ),
                                },
                                {
                                    value: 'detalles',
                                    label: 'Detalles',
                                    content: (
                                        <div className="space-y-2 text-sm">
                                            <div className="text-muted-foreground">
                                                Campos detallados y configuración avanzada.
                                            </div>
                                            <Input label="Nombre" placeholder="Ej: Proyecto X" />
                                        </div>
                                    ),
                                },
                                {
                                    value: 'comentarios',
                                    label: 'Comentarios',
                                    content: (
                                        <Textarea
                                            label="Añadir comentario"
                                            placeholder="Escribe algo..."
                                            rows={3}
                                        />
                                    ),
                                },
                            ]}
                        />
                    </Card>
                    <Card
                        variant="surface"
                        padding="lg"
                        title="Breadcrumbs"
                        description="Jerarquía de navegación"
                    >
                        <div className="space-y-4">
                            <Breadcrumbs
                                items={[
                                    { label: 'Inicio', href: '#' },
                                    { label: 'Productos', href: '#' },
                                    { label: 'Electrónica', href: '#' },
                                    { label: 'Cámaras', current: true },
                                ]}
                            />
                            <div className="text-sm text-muted-foreground">
                                Ejemplo con 4 niveles; el último es la página actual.
                            </div>
                        </div>
                    </Card>
                    <Card
                        variant="surface"
                        padding="lg"
                        title="Pagination"
                        description="Listado largo con navegación por páginas"
                    >
                        <div className="space-y-4">
                            <Pagination page={pageMain} pageCount={20} onChange={setPageMain} />
                            <div className="text-sm text-muted-foreground">
                                Página actual: {pageMain} / 20
                            </div>
                            <div className="flex items-center gap-2">
                                <Button
                                    size="sm"
                                    variant="outline"
                                    onClick={() => setPageMain((p) => Math.max(1, p - 1))}
                                >
                                    Anterior
                                </Button>
                                <Button
                                    size="sm"
                                    onClick={() => setPageMain((p) => Math.min(20, p + 1))}
                                >
                                    Siguiente
                                </Button>
                            </div>
                        </div>
                    </Card>
                    <Card
                        variant="surface"
                        padding="lg"
                        title="ListItem / MediaObject"
                        description="Fila con media, textos y acciones"
                    >
                        <div className="space-y-3">
                            <ListItem
                                media={
                                    <Avatar
                                        size="md"
                                        name="María Gomez"
                                        src="https://i.pravatar.cc/80?img=5"
                                    />
                                }
                                title="María Gómez"
                                subtitle="maria.gomez@example.com"
                                meta={<span>Activo</span>}
                            />
                            <ListItem
                                media={<Avatar size="md" name="Proyecto X" />}
                                title="Proyecto X"
                                subtitle="Última actualización: hace 2 días"
                                actions={
                                    <>
                                        <Button size="icon" variant="ghost" aria-label="Editar">
                                            <Edit size={16} />
                                        </Button>
                                        <Button size="icon" variant="ghost" aria-label="Eliminar">
                                            <Trash2 size={16} />
                                        </Button>
                                    </>
                                }
                            />
                            <ListItem
                                media={<Avatar size="md" name="Configuración" />}
                                title="Preferencias"
                                subtitle="Ajustes de la cuenta"
                                href="#"
                                actions={
                                    <Button size="icon" variant="ghost" aria-label="Más">
                                        <MoreHorizontal size={16} />
                                    </Button>
                                }
                            />
                        </div>
                    </Card>
                </div>
            </div>

            {/* Showcase de Tabla */}
            <div className="mt-10 space-y-4">
                <div className="text-sm font-semibold text-muted-foreground">Tabla básica</div>
                <Card
                    variant="surface"
                    padding="lg"
                    title="Usuarios"
                    description="Filtrar, ordenar y paginar"
                >
                    <div className="flex flex-col gap-4">
                        <div className="flex items-center justify-between gap-3">
                            <Input
                                label="Filtrar"
                                placeholder="Busca por nombre, email, rol, estado"
                                value={tableFilter}
                                onChange={(e) => {
                                    setTableFilter(e.target.value);
                                    setTablePage(1);
                                }}
                            />
                            <div className="text-sm text-muted-foreground whitespace-nowrap">
                                {filteredCount} resultados
                            </div>
                        </div>
                        <Table<Person>
                            data={tableData}
                            columns={[
                                {
                                    key: 'name',
                                    header: 'Nombre',
                                    sortable: true,
                                    render: (_, row) => (
                                        <div className="flex items-center gap-2">
                                            <Avatar size="sm" name={row.name} src={row.avatar} />
                                            <span>{row.name}</span>
                                        </div>
                                    ),
                                },
                                { key: 'email', header: 'Email', sortable: true },
                                { key: 'role', header: 'Rol', sortable: true },
                                { key: 'status', header: 'Estado', sortable: true },
                                {
                                    key: 'actions',
                                    header: 'Acciones',
                                    sortable: false,
                                    align: 'right',
                                    render: () => (
                                        <div className="flex justify-end gap-1">
                                            <Button size="icon" variant="ghost" aria-label="Editar">
                                                <Edit size={16} />
                                            </Button>
                                            <Button
                                                size="icon"
                                                variant="ghost"
                                                aria-label="Eliminar"
                                            >
                                                <Trash2 size={16} />
                                            </Button>
                                        </div>
                                    ),
                                },
                            ]}
                            globalFilter={tableFilter}
                            filterKeys={tableFilterKeys}
                            page={tablePage}
                            pageSize={tablePageSize}
                            emptyMessage="No se encontraron usuarios"
                        />
                        <div className="flex items-center justify-between">
                            <div className="text-xs text-muted-foreground">
                                Página {tablePage} de {tablePageCount}
                            </div>
                            <Pagination
                                page={tablePage}
                                pageCount={tablePageCount}
                                onChange={setTablePage}
                            />
                        </div>
                    </div>
                </Card>
            </div>

            {/* Showcase de cards: variantes, media y layouts */}
            <div className="mt-10 space-y-3">
                <div className="text-sm font-semibold text-muted-foreground">Cards</div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {/* Card básico */}
                    <Card
                        title="Hamburguesa Clásica"
                        description="Carne 150g, queso, lechuga y tomate"
                        footer={<Button size="sm">Ordenar</Button>}
                    />

                    {/* Card elevated y hoverable */}
                    <Card
                        variant="elevated"
                        title="Pizza Margarita"
                        description="Mozzarella, tomate, albahaca fresca"
                        footer={
                            <Button size="sm" variant="secondary">
                                Ver detalles
                            </Button>
                        }
                    />

                    {/* Card con imagen arriba */}
                    <Card
                        title="Ensalada César"
                        description="Pollo, parmesano, crutones"
                        imageSrc="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTy81pAPUwU8QlvkQNTt4zHQAT1f3KDjgFc9w&s"
                        imageAlt="Ensalada César"
                        footer={
                            <div className="flex items-center justify-between">
                                <span className="text-primary font-semibold">$7.99</span>
                                <Button size="sm">Añadir</Button>
                            </div>
                        }
                    />

                    {/* Card horizontal con media a la izquierda */}
                    <Card
                        media={
                            <img
                                className="h-full w-40 md:w-56 object-cover"
                                src="https://images.unsplash.com/photo-1598679253544-2c97992403ea?q=80&w=800&auto=format&fit=crop"
                                alt="Sushi"
                            />
                        }
                        mediaPosition="left"
                        title="Sushi Variado"
                        description="12 piezas mixtas"
                        elevation={3}
                        clickable={false}
                        footer={
                            <div className="flex items-center gap-2">
                                <Button size="sm">Ordenar</Button>
                                <Button size="sm" variant="outline">
                                    Favoritos
                                </Button>
                            </div>
                        }
                    >
                        <div className="flex items-center gap-2 mb-1">
                            <TooltipLabel
                                text="Disponible"
                                tooltip="Listo para enviar"
                                variant="success"
                            />
                            <TooltipLabel
                                text="20-30 min"
                                tooltip="Tiempo estimado de entrega"
                                variant="warning"
                            />
                        </div>
                        <div className="text-sm text-muted-foreground">
                            Incluye salmón, atún y ebi.
                        </div>
                        <div className="mt-2 flex items-center gap-4">
                            <IconWithText
                                icon={<Star size={14} className="text-warning" />}
                                text="4.6"
                            />
                            <IconWithText icon={<Clock size={14} />} text="25 min" />
                            <IconWithText icon={<MapPin size={14} />} text="1.2 km" />
                        </div>
                    </Card>

                    {/* Card outline clickable (como link) */}
                    <Card
                        as="a"
                        href="#"
                        variant="outline"
                        clickable
                        title="Promociones"
                        description="Descubre descuentos de hoy"
                        footer={<span className="text-primary text-sm">Ver más →</span>}
                    />

                    {/* Card ghost con contenido custom y padding grande */}
                    <Card
                        variant="ghost"
                        padding="lg"
                        title="Tu pedido"
                        description="2 items listos"
                        footer={
                            <Button size="sm" variant="primary">
                                Pagar
                            </Button>
                        }
                    />
                </div>
            </div>

            {/* Showcase de dividers */}
            <div className="mt-10 space-y-4">
                <div className="text-sm font-semibold text-muted-foreground">Dividers</div>

                {/* Horizontales simples */}
                <div className="space-y-3">
                    <Divider />
                    <Divider dashed />
                    <Divider variant="strong" />
                </div>

                {/* Con etiqueta */}
                <div className="space-y-3">
                    <Divider label="Sección" />
                    <Divider label="Inicio" align="start" />
                    <Divider label="Resumen" align="end" dashed />
                </div>

                {/* Verticales dentro de una fila */}
                <div className="flex items-center gap-2">
                    <span className="text-sm">Filtro</span>
                    <Divider orientation="vertical" />
                    <span className="text-sm">Más vendidos</span>
                    <Divider orientation="vertical" dashed />
                    <span className="text-sm">Cerca de mí</span>
                </div>
            </div>

            {/* Showcase de avatars */}
            <div className="mt-10 space-y-3">
                <div className="text-sm font-semibold text-muted-foreground">Avatars</div>
                <div className="flex flex-wrap items-center gap-4">
                    <Avatar
                        src="https://images.unsplash.com/photo-1502685104226-ee32379fefbe?w=160&h=160&auto=format&fit=facearea&facepad=2"
                        alt="Mariana Silva"
                    />
                    <Avatar name="Mariana Silva" />
                    <Avatar name="JS" size="sm" />
                    <Avatar name="Ana López" size="lg" />
                    <Avatar name="Pedro" size="xl" rounded="xl" />
                    <Avatar name="Equipo UX" rounded="md" />
                </div>
            </div>

            {/* Showcase de skeletons */}
            <div className="mt-10 space-y-4">
                <div className="text-sm font-semibold text-muted-foreground">Skeletons</div>
                {/* Texto de 3 líneas */}
                <div className="max-w-md">
                    <Skeleton shape="text" lines={3} />
                </div>
                {/* Avatar circular */}
                <div className="flex items-center gap-3">
                    <Skeleton shape="circle" width={40} height={40} />
                    <div className="flex-1">
                        <Skeleton shape="text" width="40%" />
                        <Skeleton shape="text" width="60%" />
                    </div>
                </div>
                {/* Rectángulo (imagen/tarjeta) */}
                <Skeleton shape="rect" height={140} rounded="xl" />
            </div>

            {/* Showcase de Checkbox & Radio */}
            <div className="mt-10 space-y-4">
                <div className="text-sm font-semibold text-muted-foreground">Checkbox & Radio</div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-3">
                        <div className="text-xs text-muted-foreground">Nativo (accent-color)</div>
                        <Checkbox
                            name="terms"
                            label="Acepto términos y condiciones"
                            description="Puedes retirarte cuando quieras"
                            defaultChecked
                        />
                        <Checkbox name="promo" label="Recibir promociones" />
                        <Checkbox
                            name="error"
                            label="Con error"
                            error="Debes aceptar para continuar"
                        />
                        <Checkbox
                            name="disabled"
                            label="Deshabilitado"
                            description="No disponible"
                            disabled
                        />
                    </div>
                    <div className="space-y-3">
                        <div className="text-xs text-muted-foreground">Radios</div>
                        <Radio
                            name="envio"
                            value="express"
                            label="Envío express"
                            description="20-30 min"
                            defaultChecked
                        />
                        <Radio
                            name="envio"
                            value="standard"
                            label="Envío estándar"
                            description="40-60 min"
                        />
                        <Radio
                            name="envio"
                            value="programado"
                            label="Programado"
                            description="Elige hora"
                        />
                        <Radio
                            name="metodo"
                            value="error"
                            label="Con error"
                            error="Selecciona una opción válida"
                        />
                    </div>
                </div>
            </div>

            {/* Showcase de switches */}
            <div className="mt-10 space-y-4">
                <div className="text-sm font-semibold text-muted-foreground">Switches</div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {/* No controlado */}
                    <div className="space-y-3">
                        <Switch label="Notificaciones" defaultChecked />
                        <Switch label="Entregas inmediatas" />
                        <Switch label="Disponible" disabled />
                    </div>
                    {/* Controlado */}
                    <ControlledSwitchDemo />
                </div>
            </div>

            {/* Showcase de badges */}
            <div className="mt-10 space-y-3">
                <div className="text-sm font-semibold text-muted-foreground">Badges</div>
                <div className="flex flex-wrap items-center gap-3">
                    {/* Soft (default) */}
                    <Badge variant="neutral">Neutral</Badge>
                    <Badge variant="success">Success</Badge>
                    <Badge variant="warning">Warning</Badge>
                    <Badge variant="danger">Danger</Badge>
                </div>
                <div className="flex flex-wrap items-center gap-3">
                    {/* Solid */}
                    <Badge tone="solid" variant="neutral">
                        Neutral
                    </Badge>
                    <Badge tone="solid" variant="success">
                        Success
                    </Badge>
                    <Badge tone="solid" variant="warning">
                        Warning
                    </Badge>
                    <Badge tone="solid" variant="danger">
                        Danger
                    </Badge>
                </div>
                <div className="flex flex-wrap items-center gap-3">
                    {/* Outline */}
                    <Badge tone="outline" variant="neutral">
                        Neutral
                    </Badge>
                    <Badge tone="outline" variant="success">
                        Success
                    </Badge>
                    <Badge tone="outline" variant="warning">
                        Warning
                    </Badge>
                    <Badge tone="outline" variant="danger">
                        Danger
                    </Badge>
                </div>
                <div className="flex flex-wrap items-center gap-3">
                    {/* Tamaños */}
                    <Badge size="sm" variant="success">
                        sm
                    </Badge>
                    <Badge size="md" variant="success">
                        md
                    </Badge>
                    <Badge size="lg" variant="success">
                        lg
                    </Badge>
                </div>
            </div>

            {/* Showcase de selects: nativo + buscable */}
            <div className="mt-10 space-y-4">
                <div className="text-sm font-semibold text-muted-foreground">Selects</div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {/* Nativo: variantes */}
                    <Card
                        variant="surface"
                        padding="lg"
                        title="Nativo — Variantes"
                        description="Outline, filled y ghost"
                    >
                        <div className="space-y-3">
                            <Select
                                label="País (outline)"
                                placeholder="Selecciona"
                                options={[
                                    { label: 'Argentina', value: 'ar' },
                                    { label: 'Uruguay', value: 'uy' },
                                    { label: 'Chile', value: 'cl' },
                                ]}
                                variant="outline"
                            />
                            <Select
                                label="País (filled)"
                                placeholder="Selecciona"
                                variant="filled"
                                options={[
                                    { label: 'Argentina', value: 'ar' },
                                    { label: 'Uruguay', value: 'uy' },
                                    { label: 'Chile', value: 'cl' },
                                ]}
                            />
                            <Select
                                label="País (ghost)"
                                placeholder="Selecciona"
                                variant="ghost"
                                options={[
                                    { label: 'Argentina', value: 'ar' },
                                    { label: 'Uruguay', value: 'uy' },
                                    { label: 'Chile', value: 'cl' },
                                ]}
                            />
                        </div>
                    </Card>

                    {/* Nativo: tamaños y estados */}
                    <Card
                        variant="surface"
                        padding="lg"
                        title="Nativo — Tamaños y estados"
                        description="sm, md, lg + estados"
                    >
                        <div className="space-y-3">
                            <Select
                                label="Tamaño sm"
                                placeholder="Selecciona"
                                size="sm"
                                options={[
                                    { label: 'Pequeño', value: 'sm' },
                                    { label: 'Mediano', value: 'md' },
                                    { label: 'Grande', value: 'lg' },
                                ]}
                            />
                            <Select
                                label="Tamaño md"
                                placeholder="Selecciona"
                                size="md"
                                options={[
                                    { label: 'Pequeño', value: 'sm' },
                                    { label: 'Mediano', value: 'md' },
                                    { label: 'Grande', value: 'lg' },
                                ]}
                            />
                            <Select
                                label="Tamaño lg (con icono)"
                                placeholder="Selecciona"
                                size="lg"
                                leftIcon={<User size={16} />}
                                options={[
                                    { label: 'Pequeño', value: 'sm' },
                                    { label: 'Mediano', value: 'md' },
                                    { label: 'Grande', value: 'lg' },
                                ]}
                            />
                            <Select
                                label="Con error"
                                placeholder="Selecciona"
                                error="Campo requerido"
                                hint="Selecciona una opción"
                                options={[
                                    { label: 'A', value: 'a' },
                                    { label: 'B', value: 'b' },
                                ]}
                            />
                            <Select
                                label="Con éxito"
                                placeholder="Selecciona"
                                success="¡Listo!"
                                options={[{ label: 'Opción', value: 'ok' }]}
                            />
                            <Select
                                label="Deshabilitado"
                                placeholder="No disponible"
                                disabled
                                options={[{ label: '—', value: '-' }]}
                            />
                        </div>
                    </Card>

                    {/* Nativo: múltiple */}
                    <Card
                        variant="surface"
                        padding="lg"
                        title="Nativo — Selección múltiple"
                        description="Usa Ctrl/Cmd para múltiples"
                    >
                        <Select
                            label="Categorías"
                            multiple
                            selectClassName="h-auto min-h-28 py-2"
                            options={[
                                { label: 'Pizza', value: 'pizza' },
                                { label: 'Sushi', value: 'sushi' },
                                { label: 'Hamburguesa', value: 'burger' },
                                { label: 'Vegano', value: 'vegan' },
                                { label: 'Pastas', value: 'pasta' },
                            ]}
                            hint="Mantén Ctrl/Cmd para seleccionar varias"
                        />
                    </Card>

                    {/* Custom buscable */}
                    <Card
                        variant="surface"
                        padding="lg"
                        title="Custom — Buscable"
                        description="Con búsqueda y limpiar"
                    >
                        <div className="space-y-3">
                            <SearchableSelect
                                label="Ciudad"
                                placeholder="Elige una ciudad"
                                options={[
                                    { label: 'Asunción', value: 'asu' },
                                    { label: 'Buenos Aires', value: 'bue' },
                                    { label: 'Córdoba', value: 'cor' },
                                    { label: 'Montevideo', value: 'mvd' },
                                    { label: 'Santiago', value: 'stgo' },
                                ]}
                                value={cityMain}
                                onChange={setCityMain}
                                hint="Escribe para filtrar"
                            />
                            <SearchableSelect
                                label="Ciudad (sm)"
                                placeholder="Selecciona"
                                size="sm"
                                options={[
                                    { label: 'Asunción', value: 'asu' },
                                    { label: 'Buenos Aires', value: 'bue' },
                                    { label: 'Córdoba', value: 'cor' },
                                    { label: 'Montevideo', value: 'mvd' },
                                ]}
                                value={citySm}
                                onChange={setCitySm}
                            />
                            <SearchableSelect
                                label="Ciudad (lg, deshabilitado)"
                                placeholder="No disponible"
                                size="lg"
                                disabled
                                options={[{ label: '—', value: '-' }]}
                                value={null}
                                onChange={() => {}}
                            />
                            <SearchableSelect
                                label="Con error"
                                placeholder="Selecciona"
                                options={[
                                    { label: 'Uno', value: '1' },
                                    { label: 'Dos', value: '2' },
                                ]}
                                value={cityErr}
                                onChange={setCityErr}
                                error="Debes elegir una opción"
                            />
                            <div className="text-xs text-muted-foreground">
                                Seleccionados — Principal: {cityMain ?? '—'} · sm: {citySm ?? '—'}
                            </div>
                        </div>
                    </Card>
                </div>
            </div>
        </>
    );
};

export default UiPage;

// Controlled demo component for switches
const ControlledSwitchDemo: FC = () => {
    const [enabled, setEnabled] = useState(true);
    const [email, setEmail] = useState(false);
    return (
        <div className="space-y-3">
            <div className="text-xs text-muted-foreground">Controlado (checked + onChange)</div>
            <div className="flex items-center gap-3">
                <Switch
                    label="Recordatorios"
                    checked={enabled}
                    onChange={(e) => setEnabled(e.currentTarget.checked)}
                />
            </div>
            <div className="flex items-center gap-3">
                <Switch
                    label="Promos por email"
                    checked={email}
                    onChange={(e) => setEmail(e.currentTarget.checked)}
                />
            </div>
        </div>
    );
};
