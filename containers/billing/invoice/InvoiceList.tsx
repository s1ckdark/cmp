'use client';
import Breadcrumb from '@/components/Breadcrumb';
import React, { use, useEffect } from 'react';
import { useRecoilState, useRecoilValue } from 'recoil';
import { dataListAtom, searchAtom } from '@/states/data';
import { pageNumberType } from '@/types/props';
import { Tables } from '@/components/Tables';
import { apiBe } from '@/services';
import { monthAtom,currentPageAtom } from '@/states';
import MonthBar from '@/components/MonthBar';
import { Toast } from '@/components/Toast';
import SearchBar from '@/components/Searchbar';
import Styles from './InvoiceList.module.scss';
const InvoiceList = ({ pageNumber }: pageNumberType) => {
    const [data, setInvoice] = useRecoilState(dataListAtom) || null;;
    const [ month, setMonth ] = useRecoilState(monthAtom);
    const [search, setSearch] = useRecoilState(searchAtom);
    const { keyword, excute } = search;
    const [currentPage, setCurrentPage] = useRecoilState(currentPageAtom);
    
    useEffect(() => {
        const fetching = async (pageNumber: number, targetMonth: number = Number(month), memberName?: string) => {
            const url = `/invoice/search`;
            let response:any = null;
            if(!memberName){
          
                response = await apiBe.get(url, { params: { page:currentPage , targetMonth: month } });
            } else {
                Toast("info", "검색중입니다.")
                response = await apiBe.get(url, { params: { memberName: memberName, targetMonth:month } });
            }
            if (response.status === 200 && response.data.content !== null) {
                setInvoice({ data: response.data.content, totalPages: response.data.totalPages});
                setSearch({...search, excute:false})
            } else {
                Toast('error', '데이터를 불러오는데 실패하였습니다.');
            }
        };
        fetching(currentPage, Number(month),keyword === "" ? undefined : keyword);
    }, [currentPage, month, excute]);



    return (
        <>
            <Breadcrumb />
            <MonthBar />
            <div className={Styles.table}>
                <SearchBar />
                <Tables data={data?.data} rowType={'invoiceList'} className={'invoiceList'} />
            </div>
        </>
    );
};

export default InvoiceList;
