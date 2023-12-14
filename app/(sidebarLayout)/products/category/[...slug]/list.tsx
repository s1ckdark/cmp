'use client';
import React, { useState, useEffect } from 'react';
import { useSession } from 'next-auth/react';
import { apiBe } from '@/services';
import { TableBodyProps } from '@/types/data';
import { configureAxios } from '@/services';
import { Tables } from '@/components/Tables';
import Pagination from '@/components/Pagination';
import Toast, { pushNoti } from '@/components/Toast';
interface Props {
  tableName: string | null;
  pageNumber: number | null;
  className: string | null;
}

const ListPage = ({ tableName, pageNumber, className }: Props) => {
    const { data: session } = useSession();
    
    const [keyword, setKeyword] = useState<string>('');
    const [data, setData] = useState<TableBodyProps[]>([]);

    useEffect(() => {
        if(session) {
            const axiosWithAuth = configureAxios();
            axiosWithAuth
            .get('/apibe/customer')
            .then((response) => {
                setData(response.data);
            })
            .catch((error) => {
                console.error('Error fetching data:', error);
            });
        }
    
  }, [session, pageNumber]);

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    console.log(e.target.value);
    setKeyword(e.target.value);
  };
  const onPageChange = (pageNumber) => {
    console.log(pageNumber);
  }
  const { currentPage, totalPages, customers } = data;
  return (
    <div className="container">
        <Toast />
      <input
        type="text"
        id="search-input"
        value={keyword}
        onChange={onChange}
        placeholder="Enter search keyword"
      /> <button onClick={() => pushNoti({type:'success',text:'success'})}>success</button>
      <Tables data={customers} rowType={tableName} className={className} />
      <Pagination count={totalPages} page={currentPage} onPageChange={onPageChange} />
    </div>
  );
};

export default ListPage;
