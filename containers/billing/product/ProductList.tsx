'use client';
import Breadcrumb from '@/components/Breadcrumb';
import React, { use, useEffect } from 'react';
import { useRecoilValue, useRecoilState } from 'recoil';
import { dataListAtom, historyListAtom, historyToggleAtom } from '@/states/data';
import { monthAtom } from '@/states';
import { pageNumberType } from '@/types/props';
import { Tables } from '@/components/Tables';
import { apiBe } from '@/services';
import { currentPageAtom } from '@/states';
import MonthBar from '@/components/MonthBar';
import { Toast } from '@/components/Toast';
import Styles from './ProductList.module.scss';
import SearchBar from '@/components/Searchbar';

const ProductList = ({ pageNumber }: pageNumberType) => {
    const [data, setData] = useRecoilState(dataListAtom) || null;
    const targetMonth = useRecoilValue(monthAtom);
    const [currentPage, setCurrentPage] = useRecoilState(currentPageAtom);
    const [history, setHistory] = useRecoilState(historyListAtom || null);
    const [historyToggle, setHistoryToggle] = useRecoilState<boolean>(historyToggleAtom);

    useEffect(() => {
        const fetching = async (pageNumber: number, memberNo?:string, memberName?:string) => {
            const url = `/product/gdbilling`;
            const response = await apiBe.get(url, { params: { page:pageNumber, target_month:targetMonth} });
            console.log(response);
            if (response.status === 200 && response.data.content !== null) {
                console.log(response.data.content);
                setData({ data: response.data.content, totalPages: response.data.totalPages});
            } else {
                Toast('error', '데이터를 불러오는데 실패하였습니다.');
            }
        };
        fetching(currentPage);
    }, [currentPage, targetMonth]);


    // useEffect(() => {
    //     const fetching = async (pageNumber: number, targetMonth: number = Number(month), memberName?: string) => {
    //         const url = `/invoice/search`;
    //         let response:any = null;
    //         if(!memberName){
    //             response = await apiBe.get(url, { params: { page:currentPage , targetMonth: month } });
    //         } else {
    //             Toast("info", "검색중입니다.")
    //             response = await apiBe.get(url, { params: { memberName: memberName, targetMonth:month } });
    //         }
    
    //     };
    //     fetching(currentPage, Number(month),keyword === "" ? undefined : keyword);
    // }, [currentPage, month, excute]);


    return (
        <>
            <Breadcrumb />
            <MonthBar />
            <div className={`${Styles.table} ${Styles.withSearchbar}`}>
                {/* <SearchBar /> */}
                <Tables data={data?.data} rowType={'billingProductList'} className={'billingProductList'} />
            </div>
        </>
    );
};

export default ProductList;
