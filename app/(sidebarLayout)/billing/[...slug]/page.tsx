'use client';
import { useParams } from 'next/navigation';
import Invoice from '@/containers/billing/Invoice';

const Page = () => {
    const params = useParams();
    const { slug } = params;
    const customer = slug[0];
    const type = slug[1];
    if (customer === 'gd') {
        return <Invoice type={type} customer={customer} />;
    } else if (customer[0] === 'naver') {
    }
}

export default Page;