import type { FC } from 'react';
import { Spinner } from './Spinner';

type PageLoaderProps = {
    label?: string;
    size?: number;
};

export const PageLoader: FC<PageLoaderProps> = ({ label = 'Cargando…', size = 48 }) => {
    return (
        <div className="h-screen w-screen flex items-center justify-center py-16">
            <Spinner indeterminate size={size} ariaLabel={label} />
        </div>
    );
};

export default PageLoader;
