'use client';
import Breadcrumb from '@/components/Breadcrumb';
import React, { use, useEffect, Suspense } from 'react';
import { useRecoilState, useRecoilValue } from 'recoil';
import { dataListAtom, searchAtom } from '@/states/data';
import { pageNumberType } from '@/types/props';
import { Tables } from '@/components/Tables';
import { apiBe, fetchClient} from '@/services';
import { monthAtom,currentPageAtom } from '@/states';
import MonthBar from '@/components/MonthBar';
import { Toast } from '@/components/Toast';
import SearchBar from '@/components/Searchbar';
import Styles from './InvoiceList.module.scss';

const InvoiceList = ({ pageNumber }: pageNumberType) => {
    const [data, setInvoice] = useRecoilState(dataListAtom) || null;;
    const [ month, setMonth ] = useRecoilState(monthAtom);
    const [currentPage, setCurrentPage] = useRecoilState(currentPageAtom);
    
    useEffect(() => {
        const fetching = async (pageNumber: number, targetMonth:string = month) => {
            const url = `/invoice/search`;
            const response = await apiBe.get(url, { params: { page:currentPage , targetMonth: month } });
            if (response.status === 200 && response.data.content !== null) {
                setInvoice({ data: response.data.content, totalPages: response.data.totalPages});
            } else {
                Toast('error', '데이터를 불러오는데 실패하였습니다.');
            }
        };
        fetching(currentPage, month);
    }, [currentPage, month]);



    return (
        <>
            <Breadcrumb />
            <MonthBar />
            <div className={`${Styles.table} ${Styles.withSearchbar}`}>
                <SearchBar />
                <Tables data={data?.data} rowType={'invoiceList'} />
            </div>
        </>
    );
};

export default InvoiceList;
