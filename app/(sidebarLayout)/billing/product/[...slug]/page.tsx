import ProductView from './view';
import ProductList from './list';
import ProductWrite from './write';

const productPage = ({params}:any) => {
    const { slug } = params;
    const pageType = slug[0];
    let pageNumber = 1, memberNo = '', targetMonth = '';
    if(pageType === 'list') {
        pageNumber = slug[1];
    } else {
        memberNo = slug[1];
        targetMonth = slug[2];
    }
    switch(pageType) {
        case 'list':
            return <ProductList pageNumber={pageNumber} />;
            break;
        case 'view':
            return <ProductView memberNo={memberNo} targetMonth={targetMonth} />;
            break;
        case 'write':
            return <ProductWrite memberNo={memberNo} targetMonth={targetMonth} />;
            break;
        default:
            return <ProductList pageNumber={pageNumber} />;
            break;
    }
}

export default productPage;
