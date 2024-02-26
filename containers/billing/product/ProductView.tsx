'use client';
import Breadcrumb from '@/components/Breadcrumb';
import React, { use, useEffect, useState } from 'react';
import { apiBe } from '@/services';
import Button from '@/components/Button';
import { useRecoilState } from 'recoil';
import { dataViewAtom } from '@/states/data';
import Styles from './ProductWrite.module.scss';
import { useForm, Controller } from 'react-hook-form';
import { Toast } from '@/components/Toast';
import { IconSearch, IconCalendar } from '@/public/svgs';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { getMonth, getLastDayOfMonth, generateDates } from '@/utils/date';
import dayjs from 'dayjs';
import _ from 'lodash';
import { useRouter, usePathname } from 'next/navigation';
import Confirm from '@/components/Confirm';
import Pagination from '@/components/Pagination';
import BillingForm from '@/components/Form/BillingForm';

const ProductView = () => {
  const [product, setProduct] = useState(null);
  const pathname = usePathname();

  useEffect(() => {
    const memberNo = _.last(pathname.split('/'));
    const targetMonth = _.get(pathname.split('/'), '[4]');
    const fetchData = async () => {
      const response = await apiBe.get(`/product/gdbilling/${memberNo}/${targetMonth}`);
      if (response.status === 200) {
        setProduct(response.data);
      }
    };
    fetchData();
  }, [pathname]);

  return (
    <>
      <Breadcrumb />
      <BillingForm pageType="view" product={product} />
    </>
  );
};

export default ProductView;
