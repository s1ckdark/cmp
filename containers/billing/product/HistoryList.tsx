'use client';
import Breadcrumb from '@/components/Breadcrumb';
import React, { use, useEffect } from 'react';
import { useRecoilState } from 'recoil';
import { dataListAtom } from '@/states/data';
import { pageNumberType } from '@/types/props';
import { Tables } from '@/components/Tables';
import { apiBe } from '@/services';
import { currentPageAtom } from '@/states';
import MonthBar from '@/components/MonthBar';
import { Toast } from '@/components/Toast';
import Loading from '@/components/Loading';

const HistoryList = ({ pageNumber }: pageNumberType) => {
    const [data, setData] = useRecoilState(dataListAtom) || null;;
    const [currentPage, setCurrentPage] = useRecoilState(currentPageAtom);
    const breadcrumbs = [
        { href: '/', label: 'Home' },
        { href: '/billing', label: '빌링내역' },
        { href: '/billing/product/list', label: '이용내역서' }
    ];

    if(!data) return <Loading />;
    return (
        <>
            <Breadcrumb title={'전체이용내역서'} breadcrumbs={breadcrumbs} />
            <MonthBar />
            <Tables data={data?.data.} rowType={'productList'} className={'productList'} />
        </>
    );
};

export default HistoryList;
