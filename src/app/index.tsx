import { RouterProvider } from 'react-router-dom';
import router from '@app/providers/router';

/**
 * Main application component that provides routing functionality.
 * 
 * This is the root component of the application that wraps the entire app
 * with the router provider to enable client-side routing.
 * 
 * @returns The main application component with router provider
 */
export default function App() {
    return <RouterProvider router={router} />;
}
