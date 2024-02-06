'use client';
import Breadcrumb from '@/components/Breadcrumb';
import React, {useEffect, useState} from 'react';
import { apiBe } from '@/services';
import Button from '@/components/Button';
import { useRecoilState } from 'recoil';
import { dataViewAtom } from '@/states/data';
import Styles from './ProductView.module.scss';
import { useForm, Controller } from "react-hook-form";
import { Toast } from '@/components/Toast';
import { IconSearch, IconCalendar } from '@/public/svgs';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { getMonth, getLastDayOfMonth, generateDates } from '@/utils/date';
import dayjs from 'dayjs';
import Lodash, { add } from 'lodash';
import { useRouter, usePathname } from 'next/navigation';
import { path } from 'd3';

interface form {
    "memberNo": string;
    "memberName": string;
    "memberType": string;
    "target_start_date": string;
    "target_end_date": string;
    "target_month": string;  
}

interface ISW {
    "billingId": string;
    "prodId": string;
    "prodName": string;
    "prodDetailType": string;
    "prodDetailTypeStd": string;
    "expPrice": number;
    "stdPrice": number;
    "discountRate": number;
    "etcdiscountamount": number;
    "estimateuseAmount": number;
    "trimDiscUnit": number;
    "promiseDiscountamount": number;
    "memberpricediscountamount": number;
    "memberpromisediscountadddamount": number;
    "billingUnit": string;
    "service_start_date": string;
    "service_end_date": string;
    "comment": string;
  }
interface IMSP {
    "billingId": string;
    "prodId": string;
    "prodName": string;
    "prodDetailType": string;
    "prodDetailTypeStd": string;
    "qty": number;
    "stdPrice": number;
    "discountRate": number;
    "promiseDiscountamount": number;
    "memberpricediscountamount": number;
    "memberpromisediscountadddamount": number;
    "trimDiscUnit": number;
    "etcdiscountamount": number;
    "billingUnit": string;
    "estimateuseAmount": number;
    "service_start_date": string;
    "service_end_date": string;
    "comment": string;
}


const ProductView = () => {
    const pathname = usePathname();
    const router = useRouter();
    const [memberNo, setMemberNo] = useState<string>(pathname.split('/')[4]);
    const [targetMonth, setTargetMonth ] = useState<string>(pathname.split('/')[5]);
    const [dataView, setDataView] = useRecoilState(dataViewAtom);
    const [form, setForm] = useState<any>({});
    const [regProd, setRegProd] = useState<boolean>(false);
    const [prodSw, setProdSw] = useState<ISW[]>([]);
    const [prodMsp, setProdMsp] = useState<IMSP[]>([]);
    const { memberName, memberType, target_start_date, target_end_date, target_month } = form;
    const { register, handleSubmit, getValues, setValue, control, formState: { errors } } = useForm({
        defaultValues: {
            memberNo: memberNo,
            memberName: memberName,
            target_month: targetMonth,
            memberType: memberType,
            target_start_date: target_start_date,
            target_end_date: target_end_date
        }
    });
    const [startDate, setStartDate] = useState<string>('');
    const [endDate, setEndDate] = useState<string>('');
    const [addField, setAddField] = useState<any>({});
    const [addFieldType, setAddFieldType] = useState<string>('');
    const [prodList, setProdList] = useState<any>([]);
    const [isDisabled, setIsDisabled] = useState<boolean>(true);
    //billing id = objectId
    const RenderProdSw = ({ data, view }:any) => {
        return data.map((item: ISW, idx: number) => (
            <tr key={item.prodId || idx}>
                <td><input type="text" name="prodId" value={item.prodId} readOnly={view} /></td>
                <td><input type="text" name="prodName" value={item.prodName} readOnly={view}/></td>
                <td><input type="text" name="prodDetailType" value={item.prodDetailType} readOnly={view}/></td>
                <td><input type="text" name="prodDetailTypeStd" value={item.prodDetailTypeStd} readOnly={view}/></td>
                <td><input type="number" name="stdPrice" value={item.stdPrice} readOnly={view}/></td>
                <td><input type="number" name="expPrice" value={item.expPrice} readOnly={view}/></td>
                <td><input type="number" name="discountRate" value={item.discountRate} readOnly={view}/></td>
                <td><input type="number" name="estimateUseAmount" value={item.estimateuseAmount} readOnly={view}/></td>
                <td><input type="text" name="service_start_date" value={item.service_start_date} readOnly={view}/></td>
                <td><input type="text" name="service_end_date" value={item.service_end_date} readOnly={view}/></td>
                <td><input type="text" name="comment" value={item.comment} readOnly={view}/></td>
            </tr>
        ))
    }

    const RenderProdMsp = ({ data, view }:any) => {
        return data.map((item: IMSP, idx: number) => (
            <tr key={item.prodId || idx}>
                <td><input type="text" name="prodId" value={item.prodId} readOnly={view} /></td>
                <td><input type="text" name="prodName" value={item.prodName} readOnly={view} /></td>
                <td><input type="text" name="prodDetailType" value={item.prodDetailType} readOnly={view} /></td>
                <td><input type="text" name="prodDetailTypeStd" value={item.prodDetailTypeStd} readOnly={view} /></td>
                <td><input type="number" name="qty" value={item.qty} readOnly={view} /></td>
                <td><input type="number" name="stdPrice" value={item.stdPrice} readOnly={view} /></td>
                <td><input type="number" name="discountRate" value={item.discountRate} readOnly={view} /></td>
                <td><input type="number" name="estimateUseAmount" value={item.estimateuseAmount} /></td>
                <td><input type="text" name="service_start_date" value={item.service_start_date} readOnly={view} /></td>
                <td><input type="text" name="service_end_date" value={item.service_end_date} readOnly={view} /></td>
                <td><input type="text" name="comment" value={item.comment} readOnly={view} /></td>
            </tr>
        ))
    }
    const goEdit = () => {
        router.push('/billing/product/edit/'+memberNo+'/'+targetMonth);  
    }

    const goBack = () => {
        router.push('/billing/product/list/1');
    }
    
    useEffect(() => {
        console.log(targetMonth, memberNo);
        const fetchData = async () => {
            const response = await apiBe.get(`/product/gdbilling/${memberNo}/${targetMonth}`);
            if (response.status === 200) {
                setDataView(response.data);
                setForm(response.data);
                setRegProd(true);
                setIsDisabled(true);
            }
        }
        fetchData();
    },[memberNo, targetMonth])
    
    return (
        <>
            <Breadcrumb />
            <div className={Styles.container}>
                <div className={Styles.form}>
                    <div className={Styles.inputSection}>
                        <h1>고객 정보</h1>
                        <div className={Styles['col-3']}>
                            <div className={Styles.inputGroup}>
                                <label htmlFor="memberName">고객명</label>
                                <div className={Styles.search}>
                                    <input readOnly={isDisabled} type="text" {...register("memberName")} defaultValue={memberName} />
                                </div>                                                                                                                                                                                                                                                                                                                                                                  
                            </div>
                            <div className={Styles.inputGroup}>
                                <label htmlFor="memberNo">고객번호</label>
                                <input readOnly={isDisabled} type="text" {...register("memberNo")} defaultValue={memberNo} />
                            </div>
                            <div className={Styles.inputGroup}>
                                <label htmlFor="memberType">고객유형</label>
                                <input readOnly={isDisabled} type="text" {...register("memberType")} defaultValue={memberType} />
                            </div>
                        </div>
                    </div>
                    <div className={Styles.inputSection}>
                        <h1>기간</h1>
                        <div className={Styles['col-3']}>
                        <div className={Styles.inputGroup}>
                            <label htmlFor="target_month">청구년월</label>
                            <div className={Styles.search}>
                             <input readOnly={isDisabled} type="text" {...register("target_month")} defaultValue={targetMonth} />
                            </div>
                        </div>
                        <div className={Styles.inputGroup}>
                            <label htmlFor="target_start_date">상품시작일</label>
                                <div className={Styles.search}>
                                    <input readOnly={isDisabled} type="text" {...register("target_start_date")} defaultValue={target_start_date} />
                                </div>
                            </div>
                            
                        <div className={Styles.inputGroup}>
                                <label htmlFor="target_end_date">상품종료일</label>
                                <div className={Styles.search}>
                                    <input readOnly={isDisabled} type="text" {...register("target_end_date")} defaultValue={target_end_date}/>  
                                </div>
                        </div>
                    </div>
                    </div>
                </div>    
                {regProd &&
                    <>
                        <div className={Styles.inputSection}>
                            <h1>상품정보 SW</h1>
                            <table className={Styles.sw}>
                                <thead>
                                    <tr>
                                        <th>상품아이디</th>
                                        <th>상품명</th>
                                        <th>상품상세분류</th>
                                        <th>상품가격기준</th>
                                        <th>정식단가</th>
                                        <th>노출단가</th>
                                        <th>할인율</th>
                                        <th>납부예상금액</th>
                                        <th>서비스 시작일시</th>
                                        <th>서비스 종료일시</th>
                                        <th>코멘트</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <RenderProdSw data={form.sw} view={true} />
                                </tbody>
                            </table>
                        </div>
                        <div className={Styles.inputSection}>
                            <h1>상품정보 MSP</h1>
                            <table className={Styles.msp}>
                                <thead>
                                    <tr>
                                        <th>상품아이디</th>
                                        <th>상품명</th>
                                        <th>상품상세분류</th>
                                        <th>수량</th>
                                        <th>정식단가</th>
                                        <th>할인율</th>
                                        <th>납부예상금액</th>
                                        <th>서비스 시작일시</th>
                                        <th>서비스 종료일시</th>
                                        <th>코멘트</th>
                                    </tr>
                                </thead>
                                <tbody>
                                <RenderProdMsp data={form.msp} view={true} />
                                </tbody>
                            </table>
                        </div>
                    </>}
                    <div className={Styles.btnArea}>
                         <Button className={`${Styles.btn} ${Styles.submitBtn}`} type="submit" skin={"green"} onClick={goEdit}>수정</Button>
                        <Button className={`${Styles.btn} ${Styles.cancelBtn}`} skin={"gray"} onClick={goBack}>목록</Button>
                    </div>
                
            </div> 

        </>
    )
}

export default ProductView;