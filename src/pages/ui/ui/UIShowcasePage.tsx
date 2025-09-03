import type { FC, ReactNode } from 'react';
import {
    Accordion,
    AccordionItem,
    Badge,
    Banner,
    Breadcrumb,
    BreadcrumbItem,
    Button,
    ButtonGroup,
    Card,
    Carousel,
    type CarouselItem,
    Input,
    Navbar,
    Select,
    Spinner,
    Tab,
    TabList,
    TabPanel,
    Tabs,
    Footer,
} from '@shared/ui';

const Section: FC<{ id: string; title: string; children: ReactNode } > = ({ id, title, children }) => (
    <section id={id} className="mb-10">
        <h2 className="text-xl font-semibold mb-4">{title}</h2>
        <div className="rounded-lg border border-border bg-elevated p-4">{children}</div>
    </section>
);

const Pill: FC<{ children: ReactNode; href?: string }> = ({ children, href }) => (
    <a href={href} className="block rounded-md border border-border bg-surface px-3 py-2 text-sm hover:bg-bg transition-colors">
        {children}
    </a>
);

const StarIcon = (
    <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20" aria-hidden>
        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.357 4.19h4.4c.969 0 1.371 1.24.588 1.81l-3.567 2.59 1.357 4.19c.3.921-.755 1.688-1.539 1.118L10 14.347l-3.548 2.478c-.784.57-1.838-.197-1.539-1.118l1.357-4.19-3.567-2.59c-.783-.57-.38-1.81.588-1.81h4.4l1.357-4.19z" />
    </svg>
);

const carouselItems: CarouselItem[] = [
    { src: 'https://picsum.photos/seed/1/800/300', alt: 'Slide 1' },
    { src: 'https://picsum.photos/seed/2/800/300', alt: 'Slide 2' },
    { src: 'https://picsum.photos/seed/3/800/300', alt: 'Slide 3' },
];

const UIShowcasePage: FC = () => {
    const navItems = [
        { href: '#buttons', label: 'Buttons' },
        { href: '#button-group', label: 'ButtonGroup' },
        { href: '#inputs', label: 'Inputs' },
        { href: '#select', label: 'Select' },
        { href: '#tabs', label: 'Tabs' },
        { href: '#card', label: 'Card' },
        { href: '#badge', label: 'Badge' },
        { href: '#banner', label: 'Banner' },
        { href: '#breadcrumb', label: 'Breadcrumb' },
        { href: '#navbar', label: 'Navbar' },
        { href: '#footer', label: 'Footer' },
        { href: '#spinner', label: 'Spinner' },
        { href: '#carousel', label: 'Carousel' },
        { href: '#accordion', label: 'Accordion' },
    ];

    return (
        <div className="min-h-screen bg-bg text-text">
            <div className="mx-auto max-w-7xl px-4 py-6">
                <header className="mb-6">
                    <h1 className="text-2xl font-bold">UI Showcase</h1>
                    <p className="text-sm text-muted-foreground">Vista rápida y ordenada de componentes visuales</p>
                </header>

                <div className="grid grid-cols-1 md:grid-cols-[220px,1fr] gap-6">
                    <aside className="h-max">
                        <nav className="space-y-1">
                            {navItems.map((item) => (
                                <Pill key={item.href} href={item.href}>{item.label}</Pill>
                            ))}
                        </nav>
                    </aside>

                    <main>
                        <Section id="buttons" title="Buttons">
                            <div className="flex flex-wrap gap-3">
                                <Button label="Default" />
                                <Button variant="outline" label="Outline" />
                                <Button variant="gradient" label="Gradient" />
                                <Button variant="gradientOutline" label="Grad. Outline" />
                                <Button pill label="Pill" />
                                <Button loading label="Loading" />
                                <Button disabled label="Disabled" />
                                <Button leftIcon={StarIcon} label="Left icon" />
                                <Button rightIcon={StarIcon} label="Right icon" />
                                <Button icon={StarIcon} aria-label="star" />
                            </div>
                            <div className="mt-4 flex flex-wrap items-center gap-3">
                                <Button size="xs" label="XS" />
                                <Button size="sm" label="SM" />
                                <Button size="md" label="MD" />
                                <Button size="lg" label="LG" />
                                <Button size="xl" label="XL" />
                            </div>
                        </Section>

                        <Section id="button-group" title="ButtonGroup">
                            <ButtonGroup
                                items={[
                                    { label: "Left" },
                                    { label: "Center" },
                                    { label: "Right" }
                                ]}
                            />
                        </Section>

                        <Section id="inputs" title="Inputs">
                            <div className="grid gap-4 md:grid-cols-2">
                                <div className="space-y-2">
                                    <label className="text-sm">Default</label>
                                    <Input placeholder="Escribe algo..." />
                                </div>
                                <div className="space-y-2">
                                    <label className="text-sm">Con helper</label>
                                    <Input placeholder="usuario" helperText="Debe tener 3+ caracteres" />
                                </div>
                                <div className="space-y-2">
                                    <label className="text-sm">Success</label>
                                    <Input placeholder="válido" validationState="success" />
                                </div>
                                <div className="space-y-2">
                                    <label className="text-sm">Error</label>
                                    <Input placeholder="inválido" validationState="error" />
                                </div>
                                <div className="space-y-2">
                                    <label className="text-sm">Search</label>
                                    <Input variant="search" placeholder="Buscar" />
                                </div>
                                <div className="space-y-2">
                                    <label className="text-sm">Number</label>
                                    <Input variant="number" min={0} max={10} defaultValue={2} />
                                </div>
                            </div>
                        </Section>

                        <Section id="select" title="Select">
                            <div className="grid gap-4 md:grid-cols-2">
                                <Select
                                    options={[
                                        { label: 'Opción 1', value: '1' },
                                        { label: 'Opción 2', value: '2' },
                                        { label: 'Opción 3', value: '3' },
                                    ]}
                                    value={'2'}
                                    onChange={() => {}}
                                />
                                <Select
                                    options={[
                                        { label: 'Uno', value: '1' },
                                        { label: 'Dos', value: '2' },
                                        { label: 'Tres', value: '3' },
                                    ]}
                                    value={['1', '3']}
                                    multiple
                                    onChange={() => {}}
                                />
                            </div>
                        </Section>

                        <Section id="tabs" title="Tabs">
                            <Tabs defaultValue="tab1">
                                <TabList>
                                    <Tab value="tab1">Tab 1</Tab>
                                    <Tab value="tab2">Tab 2</Tab>
                                    <Tab value="tab3">Tab 3</Tab>
                                </TabList>
                                <TabPanel value="tab1">
                                    <p className="text-sm text-muted-foreground">Contenido del Tab 1</p>
                                </TabPanel>
                                <TabPanel value="tab2">
                                    <p className="text-sm text-muted-foreground">Contenido del Tab 2</p>
                                </TabPanel>
                                <TabPanel value="tab3">
                                    <p className="text-sm text-muted-foreground">Contenido del Tab 3</p>
                                </TabPanel>
                            </Tabs>
                        </Section>

                        <Section id="card" title="Card">
                            <div className="grid gap-4 md:grid-cols-2">
                                <Card title="Card Title">
                                    <p className="text-sm text-muted-foreground">Contenido dentro de la tarjeta.</p>
                                </Card>
                                <Card
                                    title="Dashboard"
                                >
                                    <div className="flex gap-2">
                                        <Button size="sm" label="Acción" />
                                        <Button variant="outline" size="sm" label="Secundario" />
                                    </div>
                                </Card>
                            </div>
                        </Section>

                        <Section id="badge" title="Badge">
                            <div className="flex flex-wrap gap-2 items-center">
                                <Badge>Default</Badge>
                                <Badge variant="bordered">Bordered</Badge>
                                <Badge variant="pill">Pill</Badge>
                                <Badge variant="link" href="#">Link</Badge>
                                <Badge variant="notification">Notify</Badge>
                                <Badge variant="chips">Chip</Badge>
                                <Badge color="#22c55e">Custom</Badge>
                            </div>
                        </Section>

                        <Section id="banner" title="Banner">
                            <div className="space-y-3">
                                <Banner variant="info">Un banner informativo simple.</Banner>
                                <Banner variant="info">Operación completada correctamente.</Banner>
                                <Banner variant="info">Revisa los datos ingresados.</Banner>
                            </div>
                        </Section>

                        <Section id="breadcrumb" title="Breadcrumb">
                            <Breadcrumb
                                items={[
                                    { label: "Home" },
                                    { label: "Sección" },
                                    { label: "Detalle" }
                                ]}
                            />
                        </Section>

                        <Section id="navbar" title="Navbar">
                            <Navbar
                                items={[
                                    { id: 'logo', position: 'left', component: <strong>Brand</strong> },
                                    { id: 'center', position: 'center', component: <span>Centro</span> },
                                    { id: 'cta', position: 'right', component: <Button size="sm" label="Acción" /> },
                                ]}
                                className="rounded-md border border-border bg-surface px-4 py-2"
                            />
                        </Section>

                        <Section id="footer" title="Footer">
                            <Footer />
                        </Section>

                        <Section id="spinner" title="Spinner">
                            <div className="flex items-center gap-3">
                                <Spinner />
                                <span className="text-sm text-muted-foreground">Cargando...</span>
                            </div>
                        </Section>

                        <Section id="carousel" title="Carousel">
                            <div className="w-full max-w-3xl">
                                <Carousel items={carouselItems} autoPlay={false} className="h-48 rounded-md" />
                            </div>
                        </Section>

                        <Section id="accordion" title="Accordion">
                            <Accordion>
                                <AccordionItem value="section1" title="Sección 1">Contenido 1</AccordionItem>
                                <AccordionItem value="section2" title="Sección 2">Contenido 2</AccordionItem>
                                <AccordionItem value="section3" title="Sección 3">Contenido 3</AccordionItem>
                            </Accordion>
                        </Section>

                        {/* Nota: Modal, Drawer y Toast no se renderizan aquí para evitar overlays que tapen la página.
                            Para verlos en detalle, usar Storybook o crear subpáginas puntuales. */}
                    </main>
                </div>
            </div>
        </div>
    );
};

export default UIShowcasePage;
