import { redirect } from 'next/navigation';
import { getCurrentMonth } from '@/utils/date';

import ProductList from './list';
import ProductWrite from './write';
import ProductEdit from './edit';
import ProductView from './view';


const productPage = ({params}:any) => {
    const { slug } = params;
    const pageType = slug[0];
    if(pageType === 'list' && slug.length !== 3) {
        redirect(`/billing/product/list/${getCurrentMonth()}/1`);
    }

    switch (pageType) {
        case 'edit':
            return <ProductEdit />;
        case 'view':
            return <ProductView />;
        case 'list':
            return <ProductList />;
        case 'write':
            return <ProductWrite />;
        default:
            return <ProductList />;
    }
}

export default productPage;
