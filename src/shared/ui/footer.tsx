import { cloneElement, type FC, type ReactElement } from 'react';

export interface FooterProps {
  variant?: 0 | 1;
  className?: string;
}

const DefaultFooter: ReactElement = (
  <footer className="w-full bg-white dark:bg-gray-900 border-t border-gray-200 dark:border-gray-700">
    <div className="max-w-screen-xl mx-auto p-4 md:py-8">
      <ul className="flex flex-wrap justify-center mb-6 text-sm text-gray-500 dark:text-gray-400">
        <li className="mr-4 hover:underline md:mr-6">
          <a href="#">About</a>
        </li>
        <li className="mr-4 hover:underline md:mr-6">
          <a href="#">Privacy Policy</a>
        </li>
        <li className="mr-4 hover:underline md:mr-6">
          <a href="#">Licensing</a>
        </li>
        <li className="hover:underline">
          <a href="#">Contact</a>
        </li>
      </ul>
      <hr className="my-6 border-gray-200 dark:border-gray-700" />
      <p className="text-center text-sm text-gray-500 dark:text-gray-400">
        © 2024 NeoTemplate™. All Rights Reserved.
      </p>
    </div>
  </footer>
);

const LogoSocialFooter: ReactElement = (
  <footer className="w-full bg-white dark:bg-gray-900 border-t border-gray-200 dark:border-gray-700">
    <div className="max-w-screen-xl mx-auto p-4 md:py-8">
      <div className="sm:flex sm:items-center sm:justify-between">
        <a href="/" className="flex items-center mb-4 sm:mb-0 space-x-3">
          <img src="/vite.svg" alt="Logo" width={32} height={32} />
          <span className="self-center text-2xl font-semibold whitespace-nowrap dark:text-white">
            NeoTemplate
          </span>
        </a>
        <ul className="flex flex-wrap items-center mb-6 text-sm text-gray-500 dark:text-gray-400 sm:mb-0">
          <li className="mr-4 hover:underline md:mr-6">
            <a href="#">About</a>
          </li
          ><li className="mr-4 hover:underline md:mr-6">
            <a href="#">Privacy Policy</a>
          </li>
          <li className="mr-4 hover:underline md:mr-6">
            <a href="#">Licensing</a>
          </li>
          <li className="hover:underline">
            <a href="#">Contact</a>
          </li>
        </ul>
      </div>
      <hr className="my-6 border-gray-200 sm:mx-auto dark:border-gray-700 lg:my-8" />
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
        <span className="text-sm text-gray-500 dark:text-gray-400">
          © 2024 NeoTemplate™. All Rights Reserved.
        </span>
        <div className="flex mt-4 space-x-6 sm:justify-center sm:mt-0">
          <a href="https://facebook.com" className="text-gray-500 hover:text-gray-900 dark:hover:text-white">
            <span className="sr-only">Facebook</span>
          </a>
          <a href="https://twitter.com" className="text-gray-500 hover:text-gray-900 dark:hover:text-white">
            <span className="sr-only">Twitter</span>
          </a>
          <a href="https://github.com" className="text-gray-500 hover:text-gray-900 dark:hover:text-white">
            <span className="sr-only">GitHub</span>
          </a>
          <a href="https://dribbble.com" className="text-gray-500 hover:text-gray-900 dark:hover:text-white">
            <span className="sr-only">Dribbble</span>
          </a>
        </div>
      </div>
    </div>
  </footer>
);

const footerVariants: ReactElement[] = [DefaultFooter, LogoSocialFooter];

const Footer: FC<FooterProps> = ({ variant = 0, className }) =>
  cloneElement(footerVariants[variant], {
    className: `${(footerVariants[variant].props as any).className || ''} ${className || ''}`,
  } as any);

export default Footer;
