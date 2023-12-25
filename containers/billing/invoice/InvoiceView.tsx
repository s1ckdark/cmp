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
import Styles from './InvoiceView.module.scss';
import { useRouter } from 'next/navigation';
interface InvoiceViewCtProps {
    memberNo: string;
    targetMonth: string;
}

const InvoiceView = ({memberNo, targetMonth}:InvoiceViewCtProps) => {
    const [ data, setData ] = useRecoilState(dataViewAtom);
    const router = useRouter();
    const handlePdf = (id: string) => {
        const target = document.querySelector('#invoice');
        target?.classList.add(Styles.pdf);
        PdfExport(id);
        target?.removeAttribute('class');
    };

    useEffect(() => {
        const fetching = async() => {
            console.log(memberNo);
            const url = `/invoice/${memberNo}/${targetMonth}`;
            const response = await apiBe.get(url);
            if(response.status === 200) setData({data:response.data,memberNo:memberNo,targetMonth:targetMonth});
        }
        fetching();
    }, [memberNo, targetMonth]);

    return (
        <>
            <Breadcrumb />
            <div className={Styles.container}>
                <div id="invoice">
                    <InfoSection type="supply" />
                    <InfoSection type="client" memberNo={memberNo} />
                    <Usage />
                    <Summary />
                </div>
                <div className={Styles.btnArea}>
                    <Button onClick={()=>handlePdf('invoice')} className={`${Styles.btn} ${Styles.pdfBtn} flex justify-end mt-10`} skin="green">pdf</Button>
                    <Button className={`${Styles.btn} ${Styles.backBtn} flex justify-end mt-10`} onClick={()=>router.back()} skin="green">목록</Button>
                </div>
            </div>

        </>
    )
}

export default InvoiceView;