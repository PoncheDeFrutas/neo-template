import type { FC } from 'react';
import { Outlet } from 'react-router-dom';

const ClientLayout: FC = () => {
    return (
        <div>
            <Outlet />
        </div>
    );
};

export default ClientLayout;