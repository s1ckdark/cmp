'use client';
import Breadcrumb from '@/components/Breadcrumb';
import React, {useEffect} from 'react';
import { apiBe } from '@/services';
import InfoSection from './InfoSection';
import Usage from './Usage';
import Summary from './Summary';
import { PdfExport } from '@/components/PdfExport';
import Button from '@/components/Button';
import { useRecoilState, useRecoilValue } from 'recoil';
import { dataViewAtom } from '@/states/data';
import { adjustedMonthSelector } from '@/states/';
import Styles from './InvoiceView.module.scss';
import { useRouter } from 'next/navigation';
import { Toast } from '@/components/Toast';

interface InvoiceViewCtProps {
    memberNo: string;
    targetMonth: string;
}

const InvoiceView = ({memberNo, targetMonth}:InvoiceViewCtProps) => {
    const [ data, setData ] = useRecoilState<any>(dataViewAtom);
    const nextMonth = useRecoilValue(adjustedMonthSelector('next'));
    const currentMonth = useRecoilValue(adjustedMonthSelector('current'));
    const router = useRouter();
    const handlePdf = (id: string) => {
        const target = document.querySelector('#invoice');
        const filename: any = data?.data?.memberName + '_' + targetMonth + '월_사용내역서';
        target?.classList.add(Styles.pdf);
        Toast('info', 'pdf 변환중입니다.')
        PdfExport(id,filename);
        target?.removeAttribute('class');
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
            <Breadcrumb />
            <div className={Styles.container}>
                <div id="invoice">
                    <div className={Styles.hGroup}>
                        <h1>서비스 이용내역서</h1>
                        <span className={Styles.date}><label>청구년월</label>{nextMonth}({currentMonth}분)</span>
                    </div>
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