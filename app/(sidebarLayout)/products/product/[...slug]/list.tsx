'use client';
import React, { useState, useEffect } from 'react';
import { apiBe } from '@/services';
import { TableBodyProps } from '@/types/data';
import { Tables } from '@/components/Tables';
import { useRecoilState } from 'recoil';
import { currentPageAtom } from '@/states';
import { dataListAtom, historyListAtom } from '@/states/data';
import { Toast } from '@/components/Toast';
import ProductList from '@/containers/products/ProductsList'
interface Props {
  tableName: string | null;
  pageNumber: number | null;
  className: string | null;
}

const ListPage = ({ tableName, pageNumber, className }: Props) => {
    const [keyword, setKeyword] = useState<string>('');
    const [data, setData] = useRecoilState(dataListAtom) || null;;
    const [currentPage, setCurrentPage] = useRecoilState(currentPageAtom);
    const [history, setHistory] = useRecoilState(historyListAtom || null);
    const breadcrumbs = [
        { href: '/', label: 'Home' },
        { href: '/billing', label: '빌링내역' },
        { href: '/billing/data/list', label: '이용내역서' }
    ];

  return (

    <div className="container">
      <ProductList />
      {/* <Tables data={data?.data} rowType={tableName} className={className} /> */}
    </div>
  );
};

export default ListPage;
