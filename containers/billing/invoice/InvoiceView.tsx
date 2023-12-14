'use client';
import Breadcrumb from '@/components/Breadcrumb';
import React, {useEffect} from 'react';
import { apiBe } from '@/services';
import InfoSection from './InfoSection';
import Usage from './Usage';
import Summary from './Summary';
import { PdfExport } from '@/components/PdfExport';
import Button from '@/components/Button';
import { useRecoilState } from 'recoil';
import { dataViewAtom} from '@/states/data';

interface InvoiceViewCtProps {
    memberNo: string;
    targetMonth: string;
}

const InvoiceView = ({memberNo, targetMonth}:InvoiceViewCtProps) => {
    const [ data, setData ] = useRecoilState(dataViewAtom);
    const breadcrumbs = [
        { href: '/', label: 'Home' },
        { href: '/billing', label: 'Billing' },
        { href: `/billing/invoice/${memberNo}/${targetMonth}`, label: 'List' }
    ];

    const handlePdf = (id: string) => {
        PdfExport(id);
    };

    useEffect(() => {
        const fetching = async() => {
            const url = `/invoice/${memberNo}/${targetMonth}`;
            const response = await apiBe.get(url);
            if(response.status === 200) setData({data:response.data,memberNo:memberNo,targetMonth:targetMonth});
        }
        fetching();
    }, [memberNo, targetMonth]);

    return (
        <>
            <Breadcrumb title={memberNo} breadcrumbs={breadcrumbs} />
            <div id="invoice">
                <InfoSection type="supply" memberNo={memberNo} />
                <InfoSection type="client" memberNo={memberNo} />
                <Usage />
                <Summary />
            </div>
            <Button onClick={()=>handlePdf('invoice')} className="flex justify-end mt-10" skin="green">pdf</Button>

        </>
    )
}

export default InvoiceView;