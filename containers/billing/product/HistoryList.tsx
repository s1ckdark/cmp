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
    if(!data) return <Loading />;
    return (
        <>
            <Breadcrumb />
            <MonthBar />
            <Tables rowType={'productHistory'} className={'productHistory'} />
        </>
    );
};

export default HistoryList;
