import type { FC } from 'react';
import { Link } from 'react-router-dom';

const NotFoundPage: FC = () => {
    return (
        <div className="flex min-h-screen flex-col items-center justify-center p-4">
            <h1 className="mb-4 text-2xl font-bold">404 - Page Not Found</h1>
            <Link to="/" className="text-blue-600 hover:underline">
                Go back home
            </Link>
        </div>
    );
};

export default NotFoundPage;
