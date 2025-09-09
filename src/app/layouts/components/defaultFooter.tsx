import type { FC } from 'react';
import { Footer } from '@/shared/ui';

/**
 * Default footer component for the RapiEntrega web platform.
 *
 * Renders a footer with brand information, description, and organized link groups
 * including policies, company information, and social media links.
 *
 * @returns The rendered footer component with predefined content and navigation links
 */
const DefaultFooter: FC = () => {
    return (
        <Footer
            brand={<span>RapiEntrega Web</span>}
            description={
                <span>
                    Plataforma web para explorar tiendas, realizar pedidos y seguir entregas en
                    tiempo real.
                </span>
            }
            groups={[
                {
                    title: 'Políticas',
                    links: [
                        { label: 'Privacidad', href: '#' },
                        { label: 'Términos', href: '#' },
                        { label: 'Cookies', href: '#' },
                    ],
                },
                {
                    title: 'Compañía',
                    links: [
                        { label: 'Sobre nosotros', href: '/about' },
                        { label: 'Contacto', href: '#' },
                        { label: 'Soporte', href: '#' },
                    ],
                },
                {
                    title: 'Redes',
                    links: [
                        { label: 'GitHub', href: 'https://github.com', external: true },
                        { label: 'Twitter/X', href: 'https://x.com', external: true },
                        { label: 'LinkedIn', href: 'https://linkedin.com', external: true },
                    ],
                },
            ]}
        />
    );
};

export default DefaultFooter;
