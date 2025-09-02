import type { FC, ReactNode } from 'react';
import { ErrorBoundary as ReactErrorBoundary, type FallbackProps } from 'react-error-boundary';

const ErrorFallback: FC<FallbackProps> = ({ error, resetErrorBoundary }) => (
    <div role="alert" className="p-4">
        <p>Something went wrong:</p>
        <pre className="text-sm text-red-500">{error.message}</pre>
        <button onClick={resetErrorBoundary}>Try again</button>
    </div>
);

interface ErrorBoundaryProps {
    children: ReactNode;
}

const ErrorBoundary: FC<ErrorBoundaryProps> = ({ children }) => (
    <ReactErrorBoundary FallbackComponent={ErrorFallback}>{children}</ReactErrorBoundary>
);

export default ErrorBoundary;
