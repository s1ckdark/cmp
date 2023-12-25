'use client';
import Breadcrumb from '@/components/Breadcrumb';
import React, { use, useEffect } from 'react';
import { useRecoilState, useResetRecoilState } from 'recoil';
import { dataListAtom, historyListAtom, historyToggleAtom } from '@/states/data';
import { pageNumberType } from '@/types/props';
import { Tables } from '@/components/Tables';
import { apiBe } from '@/services';
import { monthAtom,currentPageAtom } from '@/states';
import MonthBar from '@/components/MonthBar';
import { Toast } from '@/components/Toast';
import Styles from './productsList.module.scss';

const ProductList = () => {
    const [data, setData] = useRecoilState(dataListAtom) || null;;
    const [history, setHistory] = useRecoilState(historyListAtom || null);
    const [historyToggle, setHistoryToggle] = useRecoilState<boolean>(historyToggleAtom);
    const [ month, setMonth ] = useRecoilState(monthAtom);
    const [currentPage, setCurrentPage] = useRecoilState(currentPageAtom);


    useEffect(() => {
        const fetching = async (pageNumber: number) => {
            const url = `/product/product`;
            const response = await apiBe.get(url, { params: { page:pageNumber} });
            if (response.status === 200 && response.data.content !== null) {
                setData({ data: response.data.products, totalPages: response.data.totalPages, totalItems: response.data.totalItems});
            } else {
                Toast('error', '데이터를 불러오는데 실패하였습니다.');
            }
        };
        fetching(currentPage-1);
    }, [currentPage]);

    const closeHistory = () => {
        setHistoryToggle(false);
    }
    return (
        <>
            <Breadcrumb />
            <Tables data={data?.data} rowType={'productGd'} className={'productList'} />
            {historyToggle && <div className={Styles.history}><div className={Styles.closeBtn} onClick={closeHistory}>&times;</div><Tables data={history?.data} rowType={'history'} className={'history'} /></div>}
        </>
    );
};

export default ProductList;
