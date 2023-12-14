import { fetchClient, apiBe } from '@/services';
import ProductView from '@/containers/billing/product/ProductView';
import { invoiceViewAtom} from '@/states/invoice';
import { useRecoilState } from 'recoil';
import useSWR from 'swr';

interface ProductViewProps {
    memberNo: string;
    targetMonth: string;
}

const ProductViewPage = ({memberNo, targetMonth}:ProductViewProps) => {
    return (
        <>
            <ProductView memberNo={memberNo} targetMonth={targetMonth}/>
       </>
    )
}
export default ProductViewPage;