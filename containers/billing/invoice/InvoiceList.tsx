'use client';
import Breadcrumb from '@/components/Breadcrumb';
import React, { use, useEffect } from 'react';
import { useRecoilState } from 'recoil';
import { dataListAtom } from '@/states/data';
import { pageNumberType } from '@/types/props';
import { Tables } from '@/components/Tables';
import { apiBe } from '@/services';
import { monthAtom,currentPageAtom } from '@/states';
import MonthBar from '@/components/MonthBar';
import { Toast } from '@/components/Toast';
const InvoiceList = ({ pageNumber }: pageNumberType) => {
    const [data, setInvoice] = useRecoilState(dataListAtom) || null;;
    const [ month, setMonth ] = useRecoilState(monthAtom);
    const [currentPage, setCurrentPage] = useRecoilState(currentPageAtom);
    const breadcrumbs = [
        { href: '/', label: 'Home' },
        { href: '/billing', label: '빌링내역' },
        { href: '/billing/data/list', label: '이용내역서' }
    ];

    useEffect(() => {

        const fetching = async (pageNumber: number, targetMonth: number = Number(month)) => {
            const url = `/invoice/search`;
            const response = await apiBe.get(url, { params: { page:currentPage , targetMonth: month } });
            if (response.status === 200 && response.data.content !== null) {
                setInvoice({ data: response.data.content, totalPages: response.data.totalPages});
            } else {
                Toast('error', '데이터를 불러오는데 실패하였습니다.');
            }
        };
        fetching(currentPage, Number(month));
    }, [currentPage, month]);



    return (
        <>
            <Breadcrumb title={'전체이용내역서'} breadcrumbs={breadcrumbs} />
            <MonthBar />
            <Tables data={data?.data} rowType={'invoiceList'} className={'invoiceList'} />
        </>
    );
};

export default InvoiceList;
