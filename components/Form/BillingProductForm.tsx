'use client';
import styles from './BillingProductForm.module.scss';
import { useFormContext, Controller } from 'react-hook-form';
import { useEffect, useState } from 'react';
import { modalAtom } from '@/states';
import { useRecoilState } from 'recoil';
import { IconSearch } from '@/public/svgs';
import { useRouter, usePathname } from 'next/navigation';
import { apiBe } from '@/services';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import dayjs from 'dayjs';
import _ from 'lodash';

interface IBillingProductForm {
  pageType: string;
  product?: any;
}

interface IBillingProd {
  id?: string;
  memberNo: string;
  memberName: string;
  memberType: string;
  target_start_date: string;
  target_end_date: string;
  target_month: string;
  billingSwList: IProdSW[];
  billingMspList: IProdMSP[];
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

const BillingProductForm = ({ product, pageType }: IBillingProductForm) => {
  const [modal, setModal] = useRecoilState(modalAtom);
  const tmp = _.cloneDeep(product);
  const { id, memberNo, memberType, target_start_date, target_end_date, target_month } = product || {};
  const {
    register,
    control,
    setValue,
    reset,
    formState: { errors },
  }: any = useFormContext();
  const [member, setMember] = useState<any>({});
  const [isDisabled, setIsDisabled] = useState(false);
  const [mounted, setMounted] = useState(false);
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [targetMonth, setTargetMonth] = useState('');

  const pathname = usePathname();
  const router = useRouter();

  const openModal = (type: string) => {
    if (pageType === 'register') setModal({ isOpen: true, type: type, data: null });
  };

  useEffect(() => {
    if (modal.data?.memberNo && modal.data?.memberName) {
      setValue('memberName', modal.data.memberName);
      setValue('memberNo', modal.data.memberNo);
    }
  }, [modal]);

  useEffect(() => {
    setModal({ isOpen: false, type: '', data: null });
    if (pageType !== 'register') setIsDisabled(true);
    setMounted(true);
  }, [pageType]);

  return (
    <>
      <div className={styles.billingMemberMonth}>
        <div className={styles.inputSection}>
          <h1>고객 정보</h1>
          <div className={styles['col-3']}>
            <div className={styles.inputGroup}>
              <label htmlFor="memberName">고객명</label>
              <div className={styles.search}>
                <input type="text" {...register('memberName', { required: true })} onClick={() => openModal('member')} readOnly={isDisabled} />
                <IconSearch onClick={() => openModal('member')} />
              </div>
              {errors.memberName && <span className={styles.errorMsg}>필수 입력 항목입니다.</span>}
            </div>
            <div className={styles.inputGroup}>
              <label htmlFor="memberNo">고객번호</label>
              <input readOnly={true} type="text" {...register('memberNo', { required: true })} defaultValue={memberNo} />
              {errors.memberNo && <span className={styles.errorMsg}>필수 입력 항목입니다.</span>}
            </div>
            <div className={styles.inputGroup}>
              <label htmlFor="memberType">고객유형</label>
              <input readOnly={isDisabled} type="text" {...register('memberType', { required: true })} defaultValue={memberType} />
              {errors.memberType && <span className={styles.errorMsg}>필수 입력 항목입니다.</span>}
            </div>
          </div>
        </div>
        <div className={styles.inputSection}>
          <h1>기간</h1>
          <div className={styles['col-3']}>
            <div className={styles.inputGroup}>
              <label htmlFor="target_month">청구년월</label>
              <div className={`${styles.search} ${styles.datesearch}`}>
                <Controller
                  name="target_month"
                  control={control}
                  rules={{ required: true }}
                  render={({ field: { onChange, value } }) => {
                    console.log(new Date(value), 'value');
                    const convert = (value: any) => (value ? dayjs(value).toDate() : null);
                    return (
                      <DatePicker
                        selected={convert(value)}
                        showMonthYearPicker
                        disabled={isDisabled}
                        readOnly={isDisabled}
                        onChange={(date) => {
                          console.log(date);
                          onChange(date); // Keep the full date format for internal use
                          setValue('target_start_date', dayjs(date).startOf('month').format('YYYY-MM-DD'));
                          setValue('target_end_date', dayjs(date).endOf('month').format('YYYY-MM-DD'));
                        }}
                        dateFormat="yyyyMM" // Confirm this is the correct format string for your library
                        isClearable
                        popperProps={{ strategy: 'fixed' }}
                      />
                    );
                  }}
                />
              </div>
              {errors.target_month && <span className={styles.errorMsg}>필수 입력 항목입니다</span>}
            </div>
            <div className={styles.inputGroup}>
              <label htmlFor="target_start_date">상품시작일</label>
              <div className={styles.search}>
                <input type="text" {...register('target_start_date', { required: true })} readOnly={true} />
              </div>
              {errors.target_start_date && <span className={styles.errorMsg}>필수 입력 항목입니다</span>}
            </div>

            <div className={styles.inputGroup}>
              <label htmlFor="target_end_date">상품종료일</label>
              <div className={styles.search}>
                <input type="text" {...register('target_end_date', { required: true })} readOnly={true} />
              </div>
              {errors.target_end_date && <span className={styles.errorMsg}>필수 입력 항목입니다</span>}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
export default BillingProductForm;
