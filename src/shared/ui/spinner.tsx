import type { FC } from 'react';

export type SpinnerSize = 'xs' | 'sm' | 'md' | 'lg' | 'xl';
export type SpinnerAlign = 'left' | 'center' | 'right';

export interface SpinnerProps {
  color?: string;
  size?: SpinnerSize;
  align?: SpinnerAlign;
  label?: string;
  className?: string;
}

const sizeStyles: Record<SpinnerSize, string> = {
  xs: 'w-4 h-4',
  sm: 'w-6 h-6',
  md: 'w-8 h-8',
  lg: 'w-10 h-10',
  xl: 'w-12 h-12',
};

const alignStyles: Record<SpinnerAlign, string> = {
  left: 'justify-start',
  center: 'justify-center',
  right: 'justify-end',
};

export const Spinner: FC<SpinnerProps> = ({
  color = '#1d4ed8',
  size = 'md',
  align = 'center',
  label = 'Loading...',
  className,
}) => (
  <div role="status" className={`flex ${alignStyles[align]} ${className ?? ''}`}>
    <svg
      aria-hidden="true"
      className={`animate-spin ${sizeStyles[size]} text-gray-200`}
      viewBox="0 0 100 101"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 74.158 26.4328 91.5094 50 91.5094C73.5672 91.5094 90.9186 74.158 90.9186 50.5908C90.9186 27.0237 73.5672 9.67233 50 9.67233C26.4328 9.67233 9.08144 27.0237 9.08144 50.5908Z"
        fill="currentColor"
      />
      <path
        d="M93.9676 39.0409C96.3929 38.4038 97.8624 35.9116 97.0079 33.5535C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05122C51.7666 0.367571 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0509 10.1071C47.8511 9.53853 51.7191 9.52686 55.5402 10.0721C60.8643 10.803 65.9929 12.5596 70.6331 15.2552C75.2732 17.9508 79.3343 21.543 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5423 39.6781 93.9676 39.0409Z"
        fill={color}
      />
    </svg>
    <span className="sr-only">{label}</span>
  </div>
);
