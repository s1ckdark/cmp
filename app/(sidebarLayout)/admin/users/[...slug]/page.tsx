// 'use client';
// import ViewPage from './view';
import ListPage from './list';
// import EditPage from './edit';
import Breadcrumb from '@/components/Breadcrumb';
import { apiBe, fetchClient } from '@/services/';
import { getCookie } from '@/utils/cookie';
// import { useEffect } from 'react';
import { cookies } from 'next/headers';
import { FetchProps } from '@/types/data';
import { UserName } from '@/components/Server';

const breadcrumb = [{ href: '/', label: 'Home' }, { href: '/admin', label: '어드민' }, { href: '/admin/users', label: '회원관리' }];
// const fetching = async (url: string): Promise<Response> => {

//   const response = await fetchClient(url);
//   const data = await response.json();
//   return data;
// }

const UsersPage = async({ params }:any)=> {
  const { slug } = params;
  const type = slug[0];
  const id = parseInt(slug[1]);
  const renderPage = async () => {
    switch (type) {
    //   case 'view':
    //     return <ViewPage />;
      case 'list':
        return <ListPage tableName={"users"} pageNumber={id} className={"border"}/>
    //   case 'edit':
    //     return <EditPage />;
      default:
        // Redirect to a 404 page or display a not found message
        // You can also use router.push('/404') to redirect to a custom 404 page
        return <p>Page not found.</p>;
    }
  };

  return (
    <div>
       <Breadcrumb title="회원관리" breadcrumbs={breadcrumb} />
      {renderPage()}
    </div>
  );
};

export default UsersPage;