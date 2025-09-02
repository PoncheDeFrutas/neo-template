import { createBrowserRouter } from 'react-router-dom';
import adminRoutes from '@/routes/admin';
import clientRoutes from '@/routes/client';

const router = createBrowserRouter([...clientRoutes, ...adminRoutes]);

export default router;