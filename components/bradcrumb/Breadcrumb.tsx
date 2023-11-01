// components/Breadcrumb.tsx
import Link from 'next/link';
import styles from './Breadcrumb.module.scss';
import type { BreadcrumbProps } from '@/types';
import { BreadcrumbArrow, BreadcrumbHome } from '@/public/svgs';
const Breadcrumb: React.FC<BreadcrumbProps> = ({ title, breadcrumbs }) => {
    return (
        <hgroup>
            <h2 className="text-4xl font-extrabold dark:text-white">{title}</h2>
            <nav className={`${styles.navi} mb-10 flex`} aria-label="Breadcrumb">
                <ol className="inline-flex items-center space-x-1 md:space-x-3">
                    {
                        breadcrumbs.map((breadcrumb, index) => (
                            <li className="inline-flex items-center" key={breadcrumb.href}>
                                {index !== 0 ? <BreadcrumbArrow /> : <BreadcrumbHome />}
                                <Link href={breadcrumb.href} className="inline-flex items-center text-sm font-medium text-gray-700 hover:text-blue-600 dark:text-gray-400 dark:hover:text-white">{breadcrumb.label}</Link>
                            </li>
                        ))
                    }
                </ol>
            </nav >

        </hgroup>
    );
};

export default Breadcrumb;
