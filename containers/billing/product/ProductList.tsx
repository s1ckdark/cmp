'use client';
import Breadcrumb from '@/components/Breadcrumb';
import React, { use, useEffect } from 'react';
import { useRecoilState } from 'recoil';
import { dataListAtom, historyListAtom, historyToggleAtom } from '@/states/data';
import { pageNumberType } from '@/types/props';
import { Tables } from '@/components/Tables';
import { apiBe } from '@/services';
import { currentPageAtom } from '@/states';
import MonthBar from '@/components/MonthBar';
import { Toast } from '@/components/Toast';
import { set } from 'lodash';

const ProductList = ({ pageNumber }: pageNumberType) => {
    const [data, setData] = useRecoilState(dataListAtom) || null;;
    const [currentPage, setCurrentPage] = useRecoilState(currentPageAtom);
    const [history, setHistory] = useRecoilState(historyListAtom || null);
    const [historyToggle, setHistoryToggle] = useRecoilState<boolean>(historyToggleAtom);

    const breadcrumbs = [
        { href: '/', label: 'Home' },
        { href: '/billing', label: '빌링내역' },
        { href: '/billing/product/list', label: '이용내역서' }
    ];

    useEffect(() => {
        setCurrentPage(0);
        const fetching = async (pageNumber: number) => {
            const url = `/product/product`;
            const response = await apiBe.get(url, { params: { page:currentPage} });
            console.log(response);
            if (response.status === 200 && response.data.content !== null) {
                setData({ data: response.data.content, totalPages: response.data.totalPages});
            } else {
                Toast('error', '데이터를 불러오는데 실패하였습니다.');
            }
        };
        fetching(currentPage);
    }, [currentPage]);



    return (
        <>
            <Breadcrumb title={'전체이용내역서'} breadcrumbs={breadcrumbs} />
            <MonthBar />
            <Tables data={data?.data} rowType={'productGd'} className={'productGd'} />
        </>
    );
};

export default ProductList;
