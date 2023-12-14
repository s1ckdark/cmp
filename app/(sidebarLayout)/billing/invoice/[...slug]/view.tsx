import { fetchClient, apiBe } from '@/services';
import InvoiceView from '@/containers/billing/invoice/InvoiceView';
import { dataViewAtom} from '@/states/data';
import { useRecoilState } from 'recoil';
import useSWR from 'swr';

interface InvoiceViewProps {
    memberNo: string;
    targetMonth: string;
}

const InvoiceViewPage = ({memberNo, targetMonth}:InvoiceViewProps) => {
    return (
        <>
            <InvoiceView memberNo={memberNo} targetMonth={targetMonth}/>
       </>
    )
}
export default InvoiceViewPage;