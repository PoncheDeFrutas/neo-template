import { RouterProvider } from 'react-router-dom';
import router from '@app/providers/router';

export default function App() {
    return <RouterProvider router={router} />;
}
