import { fetchClient, apiBe } from '@/services';
import InvoiceVisual from '@/containers/billing/invoice/InvoiceVisual';
import { dataViewAtom} from '@/states/data';
import { useRecoilState } from 'recoil';
import useSWR from 'swr';

interface InvoiceVisualProps {
    memberNo: string;
    targetMonth: string;
}

const InvoiceVisualPage = ({memberNo, targetMonth}:InvoiceVisualProps) => {
    return (
        <>
            <InvoiceVisual memberNo={memberNo} targetMonth={targetMonth}/>
       </>
    )
}
export default InvoiceVisualPage;