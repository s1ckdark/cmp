'use client';
import React, { useState, useEffect } from 'react';
import { useSession } from 'next-auth/react';
import { apiBe } from '@/services';
import { TableBodyProps } from '@/types/data';
import { axiosClient } from '@/services';
import { Tables } from '@/components/Tables';
import Pagination from '@/components/Pagination';
import { pushNoti } from '@/components/Toast';
interface Props {
  tableName: string | null;
  pageNumber: number | null;
  className: string | null;
}

const ListPage = ({ tableName, pageNumber, className }: Props) => {
    const { data: session } = useSession();
    
    const [keyword, setKeyword] = useState<string>('');
    const [data, setData] = useState<TableBodyProps[]>([]);
    const axiosWithAuth = axiosClient();
    useEffect(() => {
            axiosWithAuth
            .get('/apibe/user', { params: { page: pageNumber } })
            .then((response) => {
                setData(response.data.data);
            })
            .catch((error) => {
                console.error('Error fetching data:', error);
            });
  }, [pageNumber]);

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    console.log(e.target.value);
    setKeyword(e.target.value);
  };

  const onPageChange = (pageNumber) => {
    console.log(pageNumber);
  }
  const { currentPage, totalPages, totalElements, content } = data;
  console.log("data",data);
  return (
    <div className="container">
      <input
        type="text"
        id="search-input"
        value={keyword}
        onChange={onChange}
        placeholder="Enter search keyword"
      />
      <Tables data={content} rowType={tableName} className={className} />
      <Pagination count={totalPages-1} page={currentPage} onPageChange={onPageChange} />
    </div>
  );
};

export default ListPage;
