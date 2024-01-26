import ProductList from './list';
import ProductWrite from './write';

const productPage = ({params}:any) => {
    const { slug } = params;
    const pageType = slug[0];

    switch(pageType) {
        case 'list':
            return <ProductList />;
        case 'write':
            return <ProductWrite />;
        default:
            return <ProductList />;
    }
}

export default productPage;
