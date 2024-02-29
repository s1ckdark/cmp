'use client';
import { useState, useEffect } from 'react';
import Breadcrumb from '@/components/Breadcrumb';
import NoticeForm from '@/components/Form/NoticeForm';
import { apiBe } from '@/services';
import { usePathname } from 'next/navigation';
import lodash from 'lodash';

const NoticeEdit = () => {
  const [data, setData] = useState<any>({});
  const path = usePathname();
  const noticeId: any = lodash.last(path.split('/'));
  useEffect(() => {
    const getNotice = async (id: string) => {
      const url = `/notice/${id}`;
      const response = await apiBe(url);
      if (response.status === 200) {
        const { notice } = response.data;
        setData(notice);
      }
    };
    getNotice(noticeId);
  }, [noticeId]);
  return (
    <>
      <Breadcrumb />
      <NoticeForm data={data} pageType="edit" />
    </>
  );
};
export default NoticeEdit;
