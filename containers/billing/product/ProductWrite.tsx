'use client';
import Breadcrumb from '@/components/Breadcrumb';
import React, {useEffect, useState} from 'react';
import { apiBe } from '@/services';
import Button from '@/components/Button';
import { useRecoilState } from 'recoil';
import { dataViewAtom} from '@/states/data';
import Styles from './ProductWrite.module.scss';
import { useForm, Controller } from "react-hook-form";
import { Toast } from '@/components/Toast';
import { IconSearch, IconCalendar } from '@/public/svgs';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { getMonth, getLastDayOfMonth, generateDates } from '@/utils/date';
import dayjs from 'dayjs';
import Lodash, { add } from 'lodash';

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


const ProductWrite = () => {
    const [form, setForm] = useState<any>({});
    const [regProd, setRegProd] = useState<boolean>(false);
    const [prodSw, setProdSw] = useState<ISW[]>([]);
    const [prodMsp, setProdMsp] = useState<IMSP[]>([]);
    const { register, handleSubmit, getValues, setValue, control, formState: { errors } } = useForm();
    const [startDate, setStartDate] = useState<string>('');
    const [endDate, setEndDate] = useState<string>('');
    const [targetMonth, setTargetMonth] = useState<string>('');
    const [addField, setAddField] = useState<any>({});
    const [addFieldType, setAddFieldType] = useState<string>('');
    const [prodList, setProdList] = useState<any>([]);
   
    const onSubmit = async (data: any) => {
        const target_start_date = dayjs(data.target_start_date).format('YYYYMMDD').toString();
        const target_end_date = dayjs(data.target_end_date).format('YYYYMMDD').toString();
        const target_month = dayjs(data.target_month).format('YYYYMM').toString();
        const tmp: form = data;
        tmp.target_month = target_month;
        tmp.target_start_date = target_start_date;
        tmp.target_end_date = target_end_date;
        const prevMonth = dayjs(target_month).subtract(1, 'month').format('YYYYMM');
        const chkPrevMonth = { url: `/product/gdbilling?memberNo=${data.memberNo}&target_month=${prevMonth}`, method: 'get' };
        const insertUrl = { url: '/product/gdbilling', method: 'put' };
        const copyUrl = { url: `/product/gdbilling/copy/${data.memberNo}/${prevMonth}/${target_month}`, method: 'post' };
        const getUrl = { url: `/product/gdbilling/${data.memberNo}/${data.target_month}`, method: 'get' };
        const chkResponse = await apiBe(getUrl.url, { method: getUrl.method });
        if (chkResponse.status === 200 && chkResponse.data) {
            Toast("success", '저장된 데이터를 가져옵니다.');
            setForm(chkResponse.data);
            setRegProd(true);
        } else {
            const chkPrevMonthResponse = await apiBe(chkPrevMonth.url, { method: chkPrevMonth.method });
            console.log(chkPrevMonth.url, chkPrevMonthResponse);
            if (chkPrevMonthResponse.status === 200 && chkPrevMonthResponse.data.content.length > 0) {
                Toast("success", '이전달 청구가 존재합니다. 이전달 청구를 복사합니다.');
                const copyResponse = await apiBe(copyUrl.url, { method: copyUrl.method });
                if (copyResponse.status === 200) {
                    const updateData = await apiBe(getUrl.url, { method: getUrl.method });
                    if (updateData.status === 200) {
                        Toast("success", '로드 되었습니다.');
                        setForm(updateData.data[0]);
                        setRegProd(true);
                    }
                    
                }
            } else {
                try {
                    const insertResponse = await apiBe(insertUrl.url, { method: insertUrl.method, data: tmp });
                    if (insertResponse.status === 200) {
                        Toast("success", '저장되었습니다.');
                        setForm(insertResponse.data);
                        setRegProd(true);
                    }
                } catch (error: any) {
                    console.log(error);
                    Toast('error', error.response.data.message);
                }
            }
        }
    }
    const reload = async () => {
        const data = getValues();
        const target_month = dayjs(data.target_month).format('YYYYMM').toString();
        const response = await apiBe.get(`/product/gdbilling?memberNo=${data.memberNo}&target_month=${target_month}`);
        const result = response.data;
        if (response.status === 200 || response.status === 201) {
            setForm(result);
        }
    }
    const handleChange = (e: any) => {
        if (e.target.name === 'discountRate') {
            let tmp = (100 - Number(e.target.value)) * addField.expPrice / 100;
            setAddField({ ...addField, [e.target.name]: e.target.value, estimateuseAmount: tmp });
        } else {
            setAddField({ ...addField, [e.target.name]: e.target.value })
        }
    }

    const writeProd = async(type: string) => {
        const response = await apiBe.put(`/product/gdbilling/product/${type}`, addField);
        const result = response.data;
        if (response.status === 200 || response.status === 201) {
            Toast("success", '저장되었습니다.');
            setAddField({});
            reload();
            // setForm(result);
        }
        // let tmp = addField;
        // let tmpSw = prodSw;
        // let tmpMsp = prodMsp;
        // let tmpForm = form;
        // if (type === 'sw') {
        //     tmpSw.push(tmp);
        //     tmpForm.sw = tmpSw;
        // } else if (type === 'msp') {
        //     tmpMsp.push(tmp);
        //     tmpForm.msp = tmpMsp;
        // }
        // setForm(tmpForm);
        // setAddField({});
    }
    const updateProdSw = () => {
        console.log(prodSw);
        const url = '/product/gdbilling/product/sw';

    }

    const updateProdMsp = () => {
        console.log(prodMsp);
    }

    const addProd = (idx:number) => {
        let tmp = prodList[idx];
        console.log(tmp);
        const fieldValue = {
            billingId: form.id,
            prodId: tmp.id,
            prodName: tmp.prodName,
            prodDetailType: tmp.prodDetailType,
            prodDetailTypeStd: tmp.prodDetailTypeStd,   
            expPrice: tmp.expPrice,
            stdPrice: tmp.stdPrice,
            discountRate: 0,
            etcdiscountamount: 0,
            estimateuseAmount: 0,
            promiseDiscountamount: 0,
            memberpricediscountamount: 0,
            memberpromisediscountadddamount: 0,
            billingUnit: "KRW",
            service_start_date: dayjs(startDate).format('YYYY-MM-DD'),
            service_end_date: dayjs(endDate).format('YYYY-MM-DD'),
            comment:''
        }
        setProdList([]);
        setAddField(fieldValue);
    };

    const addprodCancel = () => {
        setAddField({});
    }
    const deleteProd = async (billingId: string, prodId: string, prodType: string) => {
        const response = await apiBe.delete(`/product/gdbilling/product`, { data: { billingId, prodId, prodType } });
        if (response.status === 200) {
            Toast("success", '삭제되었습니다.');
            reload();
        }
    }

    const productSearch = async(prodType:any, prodName:any) => {
        const url = `/product/product?prodType=${prodType}&prodName=${prodName}`;
        const modalBody = document.querySelector("#prodModal #modalBody");
        const modalResult = document.querySelector("#prodModal #modalResult");
        const response = await apiBe(url);
        if (response.status === 200 || response.status === 201) {
                const result = response.data;
                let html = '';
                let { content } = result;
                if (content.length === 0) {
                    Toast("error", '상품명이 존재하지 않습니다.');
                } else {
                    setProdList(content);
                }
        }
    }


    //billing id = objectId
    const RenderProdSw = ({ data, view }:any) => {
        return data.map((item: ISW, idx: number) => (
            <tr key={item.prodId || idx}>
                <td><span onClick={() => deleteProd(form.id, item.prodId, "SW")}>&times;</span></td>
                <td><input type="text" name="prodId" value={item.prodId} onChange={(e) => handleChange(e)} readOnly={view} /></td>
                <td><input type="text" name="prodName" value={item.prodName} onChange={(e) => handleChange(e)} readOnly={view}/></td>
                <td><input type="text" name="prodDetailType" value={item.prodDetailType} onChange={(e) => handleChange(e)} readOnly={view}/></td>
                <td><input type="text" name="prodDetailTypeStd" value={item.prodDetailTypeStd} onChange={(e) => handleChange(e)} readOnly={view}/></td>
                <td><input type="number" name="stdPrice" value={item.stdPrice} onChange={(e) => handleChange(e)} readOnly={view}/></td>
                <td><input type="number" name="expPrice" value={item.expPrice} onChange={(e) => handleChange(e)} readOnly={view}/></td>
                <td><input type="number" name="discountRate" value={item.discountRate} onChange={(e) => handleChange(e)} readOnly={view}/></td>
                <td><input type="number" name="estimateUseAmount" value={item.estimateuseAmount} onChange={(e) => handleChange(e)} readOnly={view}/></td>
                <td><input type="text" name="service_start_date" value={item.service_start_date} onChange={(e) => handleChange(e)} readOnly={view}/></td>
                <td><input type="text" name="service_end_date" value={item.service_end_date} onChange={(e) => handleChange(e)} readOnly={view}/></td>
                <td><input type="text" name="comment" value={item.comment} onChange={(e) => handleChange(e)} readOnly={view}/></td>
            </tr>
        ))
    }

    const RenderProdMsp = ({ data, view }:any) => {
        return data.map((item: IMSP, idx: number) => (
            <tr key={item.prodId || idx}>
                <td><span onClick={() => deleteProd(form.id, item.prodId, "MSP")}>&times;</span></td>
                <td><input type="text" name="prodId" value={item.prodId} onChange={(e) => handleChange(e)} readOnly={view} /></td>
                <td><input type="text" name="prodName" value={item.prodName} onChange={(e) => handleChange(e)} readOnly={view} /></td>
                <td><input type="text" name="prodDetailType" value={item.prodDetailType} onChange={(e) => handleChange(e)} readOnly={view} /></td>
                <td><input type="text" name="prodDetailTypeStd" value={item.prodDetailTypeStd} onChange={(e) => handleChange(e)} readOnly={view} /></td>
                <td><input type="number" name="qty" value={item.qty} onChange={(e) => handleChange(e)} readOnly={view} /></td>
                <td><input type="number" name="stdPrice" value={item.stdPrice} onChange={(e) => handleChange(e)} readOnly={view} /></td>
                <td><input type="number" name="discountRate" value={item.discountRate} onChange={(e) => handleChange(e)} readOnly={view} /></td>
                <td><input type="number" name="estimateUseAmount" value={item.estimateuseAmount} /></td>
                <td><input type="text" name="service_start_date" value={item.service_start_date} onChange={(e) => handleChange(e)} readOnly={view} /></td>
                <td><input type="text" name="service_end_date" value={item.service_end_date} onChange={(e) => handleChange(e)} readOnly={view} /></td>
                <td><input type="text" name="comment" value={item.comment} onChange={(e) => handleChange(e)} readOnly={view} /></td>
            </tr>
        ))
}

    const closeModal = (type: string) => {
        const modal: any = document.querySelector("#modal");
        const modalHeader = modal.querySelector('#modalHeader');
        const modalResult = modal.querySelector('#modalResult');
        const modalBody = modal.querySelector('#modalBody');

        const searchBtn = modal.querySelector('#searchBtn');

        if (modal) {
            modalHeader.innerHTML = '';
            setProdList([]);
            setAddField({});
            modal.classList.remove(Styles.open);
            modal.querySelector('#modalContent').className = Styles.modalContent;
        }
    }

    const openModal = async (type: string) => {
        const modal: any = document.querySelector("#modal");
        const modalContent = modal.querySelector('#modalContent');
        const modalHeader = modal.querySelector('#modalHeader');
        const modalBody = modal.querySelector('#modalBody');
        const modalResult = modal.querySelector('#modalResult');
        let inner = "";

        switch (type) {
            case "sw":
                inner = "<input type='text' id='productInput' placeholder='상품명을 입력하세요.' /><button id='productSearchBtn'>상품 검색</button>";
                break;
            case "msp":
                inner = "<input type='text' id='productInput' placeholder='상품명을 입력하세요.' /><button id='productSearchBtn'>상품 검색</button>";
                break;
            case "member":
                inner = "<input type='text' id='memberInput' placeholder='회사 이름을 입력하세요.' /><button id='memberSearchBtn'>회사 검색</button>";
                break;
            default:
                inner = "<p>알 수 없는 검색 유형입니다.</p>"; // "Unknown search type"
        }

        modal.classList.add(Styles.open);
        modalContent.classList.add(Styles[type]);
        modalHeader.innerHTML = inner;
        const searchBtn = type === "sw" || type==='msp' ? modalHeader.querySelector('#productSearchBtn') : modalHeader.querySelector('#memberSearchBtn');
        const searchInput =  type === "sw" || type==='msp' ? modalHeader.querySelector('#productInput') : modalHeader.querySelector('#memberInput');

        searchBtn.addEventListener('click', () => {
            if (searchBtn) {
                switch (type) {
                    case "sw":
                        productSearch('SW', searchInput.value);
                        break;
                    case "msp":
                        productSearch('MSP', searchInput.value);
                        break;
                    case "member":
                        memberSearch(searchInput.value);
                        break;
                    default:
                        break;
                }
            }
        });
    }

    const addMemberNo = (memberNo: string, memberName: string, memberType:string) => {
        const modal: any = document.querySelector("#modal");
        const modalContent = modal.querySelector('#modalContent');
        const modalHeader = modal.querySelector('#modalHeader');
        const modalBody = modal.querySelector('#modalBody');

        if (modal) {
            modalHeader.innerHTML = '';
            modalBody.innerHTML = '';
            modal.classList.remove(Styles.open);
            modalContent.classList.remove(Styles.member);
            setValue("memberNo", memberNo);
            setValue("memberName", memberName);
            setValue("memberType", memberType);
        }
    }
    const memberSearch = async(value: string) => {
        const url = '/customer';
        const modalBody = document.querySelector("#modalBody");
        const response = await apiBe(url, { params: { memberName: value } });
        if (response.status === 200 || response.status === 201) {
            const result = response.data;
            let html = '';
            let { content } = result;
            if (content.length === 0) {
                Toast("error", '회사명이 존재하지 않습니다.');
            } else {
                html = "<table><thead><tr><th>업체번호</th><th>고객유형</th></th></tr></thead><tbody>"
                html += content.map((item: any) => {
                    return `<tr data-memberno="${item.memberNo}" data-membername="${item.memberName}" data-memberType="${item.memberType}"><td>${item.memberName}</td><td>${item.memberType}</td></tr>`;
                }).join('');
                html += "</tbody></table>";
            }
      
            if (modalBody) {
                modalBody.innerHTML = html;

                // Attach click event listeners to the dynamically created div elements
                const divElements = modalBody.querySelectorAll('tr');
                divElements.forEach((div:any) => {
                    const getMemberNo = div.getAttribute('data-memberno');
                    const getMemberName = div.getAttribute('data-membername');
                    const getMemberType = div.getAttribute('data-memberType');
                    div.addEventListener('click', () => {
                        if (getMemberNo && getMemberName && getMemberType) {
                            addMemberNo(getMemberNo, getMemberName, getMemberType);
                        }
                    });
                });
            }
        }
    }
    return (
        <>
            <Breadcrumb />
            <div className={Styles.container}>
                <form className={Styles.form} onSubmit={handleSubmit(onSubmit)}>
                    <div className={Styles.inputSection}>
                        <h1>고객 정보</h1>
                        <div className={Styles['col-3']}>
                            <div className={Styles.inputGroup}>
                                <label htmlFor="memberName">고객명</label>
                                <div className={Styles.search}>
                                    <input type="text" {...register("memberName")} onClick={() => openModal('member')} />
                                    <IconSearch />
                                </div>
                                {errors.memberName && <span className={Styles.error}>this field is required</span>}
                            </div>
                            <div className={Styles.inputGroup}>
                                <label htmlFor="memberNo">고객번호</label>
                                <input type="text" {...register("memberNo")} />
                            {errors.memberNo && <span className={Styles.error}>this field is required</span>}
                            </div>
                            <div className={Styles.inputGroup}>
                                <label htmlFor="memberType">고객유형</label>
                                <input type="text" {...register("memberType")} />
                                {errors.memberType && <span className={Styles.error}>this field is required</span>}
                            </div>
                        </div>
                    </div>
                    <div className={Styles.inputSection}>
                        <h1>기간</h1>
                        <div className={Styles['col-3']}>
                        <div className={Styles.inputGroup}>
                            <label htmlFor="target_month">청구년월</label>
                            <div className={Styles.search}>
                                <Controller
                                    name="target_month"
                                    control={control}
                                    render={({ field: { onChange, value } }) => (
                                    <DatePicker
                                        selected={value}
                                        showMonthYearPicker
                                        onChange={(date:any) => {
                                            onChange(date);
                                            setStartDate(dayjs(date).startOf('month').format('YYYY-MM-DD'));
                                            setEndDate(dayjs(date).endOf('month').format('YYYY-MM-DD'))
                                            setTargetMonth(dayjs(date).format('YYYYMM').toString());
                                            setValue("target_start_date", dayjs(date).startOf('month').format('YYYY-MM-DD'));
                                            setValue("target_end_date", dayjs(date).endOf('month').format('YYYY-MM-DD'))
                                        }}   
                                        dateFormat="yyyy/MM"
                                            isClearable
                                        popperProps={{ strategy: "fixed" }}
                                    />
                                    )}
                                /> 
                                <IconCalendar /> 
                            </div>
                            {errors.target_month && <span className={Styles.error}>this field is required</span>}
                        </div>
                        <div className={Styles.inputGroup}>
                            <label htmlFor="target_start_date">상품시작일</label>
                                <div className={Styles.search}>
                                    <input type="text" {...register("target_start_date")} />
                                    {/* <IconCalendar /> */}
                                </div>
                            {errors.target_start_date && <span className={Styles.error}>this field is required</span>}
                            </div>
                            
                        <div className={Styles.inputGroup}>
                                <label htmlFor="target_end_date">상품종료일</label>
                                <div className={Styles.search}>
                                    <input type="text" {...register("target_end_date")} />  
                                    {/* <IconCalendar /> */}
                                </div>
                            {errors.target_end_date && <span className={Styles.error}>this field is required</span>}
                        </div>
                    </div>
                    </div>
                    <div className={Styles.btnArea}>
                        <Button className={`${Styles.btn} ${Styles.submitBtn}`} type="submit" skin={"green"}>저장</Button>
                        <Button className={`${Styles.btn} ${Styles.cancelBtn}`} skin={"gray"}>취소</Button>
                    </div>
                </form>    
                {regProd &&
                    <>
                        <div className={Styles.inputSection}>
                            <h1>상품정보 SW</h1>
                            <div className={Styles.btnArea}>
                                <Button className={`${Styles.btn} ${Styles.addBtn}`} onClick={() => openModal('sw')} skin={"green"}>상품추가</Button>
                            </div>
                            <table className={Styles.sw}>
                                <thead>
                                    <tr>
                                        <th></th>
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
                            <div className={Styles.btnArea}>
                                <Button className={`${Styles.btn} ${Styles.submitBtn}`} onClick={() => updateProdSw} skin={"green"}>저장</Button>
                                <Button className={`${Styles.btn} ${Styles.cancelBtn}`} skin={"gray"}>취소</Button>
                            </div>
                        </div>
                        <div className={Styles.inputSection}>
                            <h1>상품정보 MSP</h1>
                            <div className={Styles.btnArea}>
                                <Button className={`${Styles.btn} ${Styles.addBtn}`} onClick={() => openModal('msp')} skin={"green"}>상품추가</Button>
                            </div>
                            <table className={Styles.msp}>
                                <thead>
                                    <tr>
                                        <th></th>
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
                            <div className={Styles.btnArea}>
                                <Button className={`${Styles.btn} ${Styles.submitBtn}`} onClick={() => updateProdMsp} skin={"green"}>저장</Button>
                                <Button className={`${Styles.btn} ${Styles.cancelBtn}`} skin={"gray"}>취소</Button>
                            </div>
                        </div>
                    </>}
                    {/* <div className={Styles.btnArea}>
                        <Button className={`${Styles.btn} ${Styles.submitBtn}`} type="submit" skin={"green"}>저장</Button>
                        <Button className={`${Styles.btn} ${Styles.cancelBtn}`} skin={"gray"}>취소</Button>
                    </div> */}
                
            </div> 
           
            <div id="modal" className={Styles.modal}>
                <div id="modalContent" className={Styles.modalContent}>
                    <span className={Styles.closeBtn} onClick={()=> closeModal('prod')}>&times;</span>
                    <div id="modalHeader" className={Styles.modalHeader}>
                        <div className={Styles.inputGroup}>
                            <label htmlFor="productInput">상품명</label>
                            <div className={Styles.search}>
                                <input type="text" id="productInput" />
                                <IconSearch />
                            </div>
                        </div>
                    </div>
                    {prodList.length > 0 && <div id="modalResult" className={Styles.modalResult}>
                        <table className={Styles.prodList}>
                            <thead>
                                <tr>
                                    <th>상품명</th>
                                    <th>상품분류</th>
                                    <th>상품설명</th>
                                </tr>
                            </thead>
                            <tbody>
                                {prodList && prodList.map((item: any, idx:number) => {
                                    return (
                                        <tr key={item.id} onClick={() => addProd(idx)}>
                                            <td>{item.prodName}</td>
                                            <td>{item.prodType}</td>
                                            <td>{item.prodDesc}</td>
                                        </tr>
                                    )
                                }
                                )}
                            </tbody>
                        </table>
                    </div>}
                    <div id="modalBody" className={Styles.modalBody}>
                        {addField && addField.prodId && <>
                            <div className={Styles.addProd}>
                                <table className={Styles.sw}>
                                    <thead>
                                        <tr>
                                            <th></th>
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
                                        <tr>
                                            <td><span>×</span></td>
                                            <td><input type="text" name="prodId" onChange={(e)=>handleChange(e)} value={addField.prodId} /></td>
                                            <td><input type="text" name="prodName" onChange={(e)=>handleChange(e)} value={addField.prodName} /></td>
                                            <td><input type="text" name="prodDetailType" onChange={(e)=>handleChange(e)} value={addField.prodDetailType} /></td>
                                            <td><input type="text" name="prodDetailTypeStd" onChange={(e)=>handleChange(e)} value={addField.prodDetailTypeStd} /></td>
                                            <td><input type="number" name="stdPrice" onChange={(e)=>handleChange(e)} value={addField.stdPrice} /></td>
                                            <td><input type="number" name="expPrice" onChange={(e)=>handleChange(e)} value={addField.expPrice} /></td>
                                            <td><input type="number" name="discountRate" onChange={(e)=>handleChange(e)} value={addField.discountRate} /></td>
                                            <td><input type="number" name="estimateuseAmount" onChange={(e)=>handleChange(e)} value={addField.estimateuseAmount} /></td>
                                            <td><input type="text" name="service_start_date" onChange={(e)=>handleChange(e)} value={addField.service_start_date} /></td>
                                            <td><input type="text" name="service_end_date" onChange={(e)=>handleChange(e)} value={addField.service_end_date} /></td>
                                            <td><input type="text" name="comment" onChange={(e)=>handleChange(e)} value={addField.comment} /></td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>
                            <div className={Styles.btnArea}>
                                <Button className={`${Styles.btn} ${Styles.submitBtn}`} skin={"green"} onClick={()=> writeProd('sw')}>저장</Button>
                                <Button className={`${Styles.btn} ${Styles.cancelBtn}`} skin={"gray"} onClick={() => addprodCancel()}>취소</Button>
                            </div>
                            </>
                        }

                    </div>
                </div>
            </div>
        </>
    )
}

export default ProductWrite;