// components/Breadcrumb.tsx
import Link from 'next/link';
import styles from './index.module.scss';
import { BreadcrumbProps } from '@/types';
import { BreadcrumbArrow, BreadcrumbHome } from '@/public/svgs';
import breadcrumbs from './breadcrumb.json';
import { usePathname } from 'next/navigation';

const Breadcrumb = () => {
    const pathname = usePathname();
    const key:string = pathname.split('/').slice(0,4).join('/')
    // if(pathname.includes('view') || pathname.includes('list')) {
    //     key = pathname.split('/').slice(0, -1).join('/');
    // }
    
    const breadcrumbData = breadcrumbs[key as keyof typeof breadcrumbs];
    if (!breadcrumbData) {
        // Handle the case where no matching breadcrumb data is found
        return null;
    }

    const { title, breadcrumb } = breadcrumbData;

    return (
        <hgroup className="flex items-baseline">
            <h2 className="text-4xl font-extrabold dark:text-white">{title}</h2>
            <nav className={`${styles.navi} mb-10 flex`} aria-label="Breadcrumb">
                <ol className="inline-flex items-center space-x-1 md:space-x-3">
                    {
                        breadcrumb.map((item, index) => (
                            <li className="inline-flex items-center" key={item.href}>
                                {index !== 0 ? <BreadcrumbArrow /> : <BreadcrumbHome />}
                                <Link href={item.href} className="inline-flex items-center text-sm font-medium text-gray-700 hover:text-blue-600 dark:text-gray-400 dark:hover:text-white">{item.label}</Link>
                            </li>
                        ))
                    }
                </ol>
            </nav>
        </hgroup>
    );
};

export default Breadcrumb;