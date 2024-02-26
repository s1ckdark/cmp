import React, { useEffect, useState } from 'react';
import { useForm, FormProvider, useFieldArray, useFormContext } from 'react-hook-form';
import { usePathname, useRouter } from 'next/navigation';
import { useRecoilState } from 'recoil';
import { modalAtom } from '@/states';
import _ from 'lodash';
import { apiBe } from '@/services';
import { Toast } from '@/components/Toast';
import { pageTypeAtom } from '@/states/data';
import BillingProductForm from './BillingProductForm';
import BillingProductTypeForm from './BillingProductTypeForm';
import Loading from '@/components/Loading';
import styles from './BillingForm.module.scss';
import Button from '@/components/Button';
import dayjs from 'dayjs';

interface IBillingProductForm {
  pageType: string;
  product?: IBillingProd | null | undefined;
  prodType?: 'billingSwList' | 'billingMspList';
}

interface IBillingProd {
  id?: string;
  memberNo: string;
  memberName: string;
  memberType: string;
  target_start_date: string;
  target_end_date: string;
  target_month: string;
  sw: IProdSW[];
  msp: IProdMSP[];
}

interface IProdSW {
  prodId: string;
  prodName: string;
  prodDetailType: string;
  prodDetailTypeStd: string;
  expPrice: number;
  stdPrice: number;
  discountRate: number;
  etcdiscountamount: number;
  estimateuseAmount: number;
  promiseDiscountamount: number;
  memberpricediscountamount: number;
  memberpromisediscountadddamount: number;
  billingUnit: string;
  service_start_date: string;
  service_end_date: string;
  comment: string;
}
interface IProdMSP {
  prodId: string;
  prodName: string;
  prodDetailType: string;
  qty: number;
  stdPrice: number;
  discountRate: number;
  promiseDiscountamount: number;
  memberpricediscountamount: number;
  memberpromisediscountadddamount: number;
  etcdiscountamount: number;
  billingUnit: string;
  estimateuseAmount: number;
  service_start_date: string;
  service_end_date: string;
  comment: string;
}

const BillingForm = ({ pageType, product }: IBillingProductForm) => {
  const [mounted, setMounted] = useState(false);
  const [modal, setModal] = useRecoilState(modalAtom);
  const [member, setMember] = useState<any>({});
  const [data, setData] = useState(product || {});
  const { id, memberNo, memberName, memberType, target_start_date, target_end_date, target_month, sw, msp } = product || {};
  const defaultValues = {
    id: id,
    memberNo: memberNo,
    memberName: memberName,
    memberType: memberType,
    target_start_date: target_start_date,
    target_end_date: target_end_date,
    target_month: target_month,
    billingSwList: sw,
    billingMspList: msp,
  };
  const methods = useForm({ defaultValues });
  const {
    control,
    register,
    handleSubmit,
    getValues,
    setValue,
    reset,
    watch,
    formState: { errors },
  } = methods;

  const pathname = usePathname();
  const router = useRouter();

  const watchTargetMonth = watch('target_month');
  const watchMemberNo = watch('memberNo');

  const onSubmit = async (formData: any) => {
    let tmp = _.cloneDeep(formData);
    const dummy = {
      etcdiscountamount: 0,
      promiseDiscountamount: 0,
      memberpricediscountamount: 0,
      memberpromisediscountadddamount: 0,
      billingUnit: 'KRW',
    };
    tmp.target_month = dayjs(formData.target_month).format('YYYYMM');
    Object.keys(tmp.billingSwList).forEach((key) => {
      tmp.billingSwList[key] = { ...tmp.billingSwList[key], ...dummy };
    });
    Object.keys(tmp.billingMspList).forEach((key) => {
      tmp.billingMspList[key] = { ...tmp.billingMspList[key], ...dummy };
    });
    console.log(tmp);

    const response: any = pageType === 'register' ? await apiBe.put(`/billing`, tmp) : await apiBe.post(`/billing`, tmp);
    if (response.status === 201 || response.status === 200) {
      const { data } = response;
      if (pageType === 'register') Toast('success', '고객사 정보가 저장 되었습니다.', () => goList());
      if (pageType === 'edit') Toast('success', '고객사 정보가 수정 되었습니다.', () => goList());
    } else {
      console.log(response);
      const errorMessage = response?.message || '에러가 발생하여 저장이 실패하였습니다.';
      Toast('error', errorMessage);
    }
  };

  useEffect(() => {
    if (watchMemberNo && watchTargetMonth && pageType === 'register') {
      const memberNo = getValues('memberNo');
      const target_month = dayjs(getValues('target_month')).format('YYYYMM');
      const prev_month = dayjs(target_month).subtract(1, 'month').format('YYYYMM');

      const copyUrl = { url: `/product/gdbilling/copy/${memberNo}/${prev_month}/${target_month}`, method: 'post' };
      const getUrl = { url: `/product/gdbilling/${memberNo}/${target_month}`, method: 'get' };
      const chkPrevMonth = { url: `/product/gdbilling?memberNo=${memberNo}&target_month=${prev_month}`, method: 'get' };

      const isExist = async () => {
        const chkResponse = await apiBe(getUrl.url, { method: getUrl.method });
        try {
          if (chkResponse.status === 200 && chkResponse.data.id !== '') {
            Toast('success', '저장된 데이터를 가져옵니다.');
            router.push(`/billing/product/edit/${target_month}/${memberNo}`);
          } else {
            const chkPrevMonthResponse = await apiBe(chkPrevMonth.url, { method: chkPrevMonth.method });
            if (chkPrevMonthResponse.status === 200 && chkPrevMonthResponse.data.content.length > 0) {
              Toast('success', '이전달 청구가 존재합니다. 이전달 청구를 복사합니다.');
              const copyResponse = await apiBe(copyUrl.url, { method: copyUrl.method });
              if (copyResponse.status === 200) {
                Toast('success', '로드 되었습니다.');
              }
            }
          }
        } catch (error: any) {
          console.log(error);
          Toast('error', error.message);
        }
      };

      isExist();
    }
  }, [pageType, watchMemberNo, watchTargetMonth]);

  useEffect(() => {
    const sw: IProdSW[] = getValues('billingSwList') || [];
    const msp: IProdMSP[] = getValues('billingMspList') || [];
    if (sw.length > 0) {
      sw.map((value: IProdSW, index: number) => {
        setValue(`billingSwList.${index}.service_start_date`, dayjs(watchTargetMonth).format('YYYY-MM-01'));
        setValue(`billingSwList.${index}.service_end_date`, dayjs(watchTargetMonth).endOf('month').format('YYYY-MM-DD'));
      });
    }
    if (msp.length > 0) {
      msp.map((value: IProdMSP, index: number) => {
        setValue(`billingMspList.${index}.service_start_date`, dayjs(watchTargetMonth).format('YYYY-MM-01'));
        setValue(`billingMspList.${index}.service_end_date`, dayjs(watchTargetMonth).endOf('month').format('YYYY-MM-DD'));
      });
    }
  }, [watchTargetMonth]);

  useEffect(() => {
    if (modal.data?.memberNo && modal.data?.memberName) {
      setMember({ ...member, memberNo: modal.data?.memberNo, memberName: modal.data?.memberName });
      setValue('memberNo', modal.data.memberNo);
      setValue('memberName', modal.data.memberName);
    }
  }, [modal]);

  useEffect(() => {
    console.log(pageType);
    setModal({ isOpen: false, type: '', data: null });
    setMounted(true);
  }, [pageType]);

  useEffect(() => {
    if (pageType !== 'register') {
      reset(defaultValues);
    }
  }, [product]);

  const editMode = () => {
    router.push(`/billing/product/edit/${target_month}/${memberNo}`);
  };

  const goBack = () => {
    router.back();
  };
  const goList = () => {
    router.push('/billing/product/list/1');
  };
  if (mounted === false) return <Loading />;

  return (
    <>
      <FormProvider {...methods}>
        <form onSubmit={handleSubmit(onSubmit)} className={styles[pageType]}>
          <div className={styles.billingForm}>
            <BillingProductForm product={product} pageType={pageType} />
            <BillingProductTypeForm prodType={'billingSwList'} pageType={pageType} product={product?.sw} />
            <BillingProductTypeForm prodType={'billingMspList'} pageType={pageType} product={product?.msp} />
          </div>
          <div className={`${styles.btnArea} mt-6 mx-auto`}>
            {pageType === 'register' || pageType === 'edit' ? (
              <Button type="submit" className={styles.submitBtn} skin="submit">
                {pageType === 'register' ? '등 록' : '저 장'}
              </Button>
            ) : (
              <Button type="button" onClick={editMode} className={styles.submitBtn} skin="green">
                수 정
              </Button>
            )}
            <Button type="button" className={styles.cancelBack} onClick={goList} skin="cancel">
              취 소
            </Button>
          </div>
        </form>
      </FormProvider>
    </>
  );
};

export default BillingForm;
