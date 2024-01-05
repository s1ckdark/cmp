import { fetchClient, apiBe } from '@/services';
import InvoiceVisual from '@/containers/billing/invoice/InvoiceVisual';
import { dataViewAtom} from '@/states/data';
import { useRecoilState } from 'recoil';

interface InvoiceVisualProps {
    memberNo: any;
    targetMonth: any;
}

const InvoiceVisualPage = ({memberNo, targetMonth}:InvoiceVisualProps) => {
    return (
        <>
            <InvoiceVisual memberNo={memberNo} targetMonth={targetMonth}/>
       </>
    )
}
export default InvoiceVisualPage;