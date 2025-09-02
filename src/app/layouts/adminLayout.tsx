import type { FC } from 'react';
import { Outlet } from 'react-router-dom';

const AdminLayout: FC = () => {
    return (
        <div>
            <Outlet />
        </div>
    );
};

export default AdminLayout;