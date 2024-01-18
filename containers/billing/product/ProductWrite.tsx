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
const ProductWrite= () => {
    const [form, setForm] = useState<form>();
    const [ prodSw, setProdSw ] = useState<ISW[]>([]);
    const [ prodMsp, setProdMsp ] = useState<IMSP[]>([]);
    const { register, handleSubmit, getValues, setValue, control, formState: { errors } } = useForm();
    const [startDate, setStartDate] = useState<Date>(new Date());
    const [endDate, setEndDate] = useState<Date>(new Date());
    const [ targetMonth, setTargetMonth ] = useState<string>('');
    const onSubmit = async (data: any) => {
        let target_start_date = dayjs(data.target_start_date).format('YYYYMMDD');
        let target_end_date = dayjs(data.target_end_date).format('YYYYMMDD');
        let target_month = dayjs(data.target_start_date).format('YYYYMM');
        let tmp: form = data;
        tmp.target_month = target_month;
        tmp.target_start_date = target_start_date;
        tmp.target_end_date = target_end_date;
        const url = `/product/gdbilling`;

        const response = await apiBe.put(url, tmp);
        if (response.status === 201) {
            const result = response.data;
            if (result.status === 201) {
                Toast('success', '저장되었습니다.')
            } else {
                Toast('error', "저장에 실패하였습니다.");
            }
        }
    }
    const handleChange = (e:any, idx:number, prod:string) => {
        console.log(e.target.name, e.target.value, prod);
        if(prod === 'sw' && idx !== undefined) {
            const updateItems = [...prodSw];
            updateItems[idx] = { ...updateItems[idx], [e.target.name]: e.target.value };
            setProdSw(updateItems);
        } else if(prod === 'msp') {
            const updateItems = [...prodMsp];
            updateItems[idx] = { ...updateItems[idx], [e.target.name]: e.target.value };
            setProdMsp(updateItems);
        }
    }

    const handleSwChange = (e:any) => {
        console.log(e.target.name, e.target.value);
        
    }

    const handleMspChange = (e:any) => {
        console.log(e.target.name, e.target.value);
        
    }
    const updateProdSw = () => {
        console.log(prodSw);
        const url = '/product/gdbilling/product/sw';

    }

    const updateProdMsp = () => {
        console.log(prodMsp);

    }
    const addLine = (prod:string) => {
        const target = document.querySelector(`.${Styles[prod]} tbody`);
        if (target) {
            const bodyRow = document.createElement('tr');
            let field:any = {
                "sw": ["billingId", "prodId", "prodName", "prodDetailType", "prodDetailTypeStd", "expPrice", "stdPrice", "discountRate", "etcdiscountamount", "estimateuseAmount", "promiseDiscountamount", "memberpricediscountamount", "memberpromisediscountadddamount", "service_start_date", "service_end_date", "comment"],
                "msp": ["billingId", "prodId", "prodName", "prodDetailType", "qty", "stdPrice", "discountRate", "promiseDiscountamount", "memberpricediscountamount", "memberpromisediscountadddamount", "etcdiscountamount", "estimateuseAmount", "service_start_date", "service_end_date", "comment"]
            };

            let objectStructure:any = {};

            for (let key in field) {
                objectStructure[key] = field[key].reduce((acc:any, cur:any) => {
                    acc[cur] = ''; // Set each field to an empty string or any default value
                    return acc;
                }, {});
            }

    
            // Check if the product type exists in the field object
            if (field[prod]) {
                // Create a delete button cell
                let deleteCell = document.createElement('td');
                let deleteSpan = document.createElement('span');
                deleteSpan.setAttribute('idx', 'delete')
                deleteSpan.innerHTML = '&times;';
                deleteSpan.style.cursor = 'pointer';
                deleteSpan.addEventListener('click', () => bodyRow.remove());
                deleteCell.appendChild(deleteSpan);
                bodyRow.appendChild(deleteCell);

                // Create input cells for each field
                field[prod].forEach((fieldName:any) => {
                    let cell = document.createElement('td');
                    let input:any = document.createElement('input');
                    input.type = 'text';
                    input.setAttribute('name', fieldName);
                    input.onchange = (event:any) => handleChange(event, prod);
                    // Register the input with react-hook-form
                    // register(input);

                    cell.appendChild(input);
                    bodyRow.appendChild(cell);
                });
            }
            
            // Append the new row to the table body
            target.appendChild(bodyRow);
            if(prod === 'sw') {
                setProdSw([...prodSw, objectStructure[prod]])
            } else {
                setProdMsp([...prodMsp, objectStructure[prod]])
            
            }
        }
    };
    const deleteLine = (prod:string, idx:number) => {
        console.log(idx);
        if(prod === 'sw') {
            const sw = prodSw.filter((item, index) => index !== idx);
            setProdSw(sw);
        } else {
            const msp = prodMsp.filter((item, index) => index !== idx);
            setProdMsp(msp);
        }
    }
    //billing id = objectId
    const renderProdSw = prodSw.map((item, idx) => {
        return (
            <tr key={idx}>
                <td><span onClick={() => deleteLine("sw",idx)}>&times;</span></td>
                <td><input type="text" name="billingId" value={item.billingId} onChange={(e) => handleChange(e, idx,'sw')} /></td>
                <td><input type="text" name="prodId" value={item.prodId} onChange={(e) => handleChange(e, idx, 'sw')} /></td>
                <td><input type="text" name="prodName" value={item.prodName} onChange={(e) => handleChange(e, idx, 'sw')} /></td>
                <td><input type="text" name="prodDetailType" value={item.prodDetailType} onChange={(e) => handleChange(e, idx, 'sw')} /></td>
                <td><input type="text" name="prodDetailTypeStd" value={item.prodDetailTypeStd} onChange={(e) => handleChange(e, idx, 'sw')} /></td>
                <td><input type="text" name="expPrice" value={item.expPrice} onChange={(e) => handleChange(e, idx, 'sw')} /></td>
                <td><input type="text" name="stdPrice" value={item.stdPrice} onChange={(e) => handleChange(e, idx, 'sw')} /></td>
                <td><input type="text" name="discountRate" value={item.discountRate} onChange={(e) => handleChange(e, idx, 'sw')} /></td>
                <td><input type="text" name="etcdiscountamount" value={item.etcdiscountamount} onChange={(e) => handleChange(e, idx, 'sw')} /></td>
                <td><input type="text" name="estimateuseAmount" value={item.estimateuseAmount} onChange={(e) => handleChange(e, idx, 'sw')} /></td>
                {/* <td><input type="text" name="trimDiscUnit" value={item.trimDiscUnit} onChange={(e) => handleChange(e, idx, 'sw')} /></td> */}
                <td><input type="text" name="promiseDiscountamount" value={item.promiseDiscountamount} onChange={(e) => handleChange(e, idx, 'sw')} /></td>
                <td><input type="text" name="memberpricediscountamount" value={item.memberpricediscountamount} onChange={(e) => handleChange(e, idx, 'sw')} /></td>
                <td><input type="text" name="memberpromisediscountadddamount" value={item.memberpromisediscountadddamount} onChange={(e) => handleChange(e, idx, 'sw')} /></td>
                {/* <td><input type="text" name="billingUnit" value={item.billingUnit} onChange={(e) => handleChange(e, idx, 'sw')} /></td> */}
                <td><input type="text" name="service_start_date" value={item.service_start_date} onChange={(e) => handleChange(e, idx, 'sw')} /></td>
                <td><input type="text" name="service_end_date" value={item.service_end_date} onChange={(e) => handleChange(e, idx, 'sw')} /></td>
                <td><input type="text" name="comment" value={item.comment} onChange={(e) => handleChange(e, idx, 'sw')} /></td>
            </tr>
        )
        })

        const renderProdMsp = prodMsp.map((item, idx) => {
            return (
                <tr key={idx}>
                    <td><span onClick={() => deleteLine("msp",idx)}>&times;</span></td>
                    <td><input type="text" name="billingId" value={item.billingId} onChange={(e) => handleChange(e, idx, 'msp')} /></td>
                    <td><input type="text" name="prodId" value={item.prodId} onChange={(e) => handleChange(e, idx, 'msp')} /></td>
                    <td><input type="text" name="prodName" value={item.prodName} onChange={(e) => handleChange(e, idx, 'msp')} /></td>
                    <td><input type="text" name="prodDetailType" value={item.prodDetailType} onChange={(e) => handleChange(e, idx, 'msp')} /></td>
                    <td><input type="text" name="qty" value={item.qty} onChange={(e) => handleChange(e, idx, 'msp')} /></td>
                    <td><input type="text" name="stdPrice" value={item.stdPrice} onChange={(e) => handleChange(e, idx, 'msp')} /></td>
                    <td><input type="text" name="discountRate" value={item.discountRate} onChange={(e) => handleChange(e, idx, 'msp')} /></td>
                    <td><input type="text" name="promiseDiscountamount" value={item.promiseDiscountamount} onChange={(e) => handleChange(e, idx, 'msp')} /></td>
                    <td><input type="text" name="memberpricediscountamount" value={item.memberpricediscountamount} onChange={(e) => handleChange(e, idx, 'msp')} /></td>
                    <td><input type="text" name="memberpromisediscountadddamount" value={item.memberpromisediscountadddamount} onChange={(e) => handleChange(e, idx, 'msp')} /></td>
                    {/* <td><input type="text" name="trimDiscUnit" value={item.trimDiscUnit} onChange={(e) => handleChange(e, idx, 'msp')} /></td> */}
                    <td><input type="text" name="etcdiscountamount" value={item.etcdiscountamount} onChange={(e) => handleChange(e, idx, 'msp')} /></td>
                    {/* <td><input type="text" name="billingUnit" value={item.billingUnit} onChange={(e) => handleChange(e, idx, 'msp')} /></td> */}
                    <td><input type="text" name="estimateuseAmount" value={item.estimateuseAmount} onChange={(e) => handleChange(e, idx, 'msp')} /></td>
                    <td><input type="text" name="service_start_date" value={item.service_start_date} onChange={(e) => handleChange(e, idx, 'msp')} /></td>
                    <td><input type="text" name="service_end_date" value={item.service_end_date} onChange={(e) => handleChange(e, idx, 'msp')} /></td>
                    <td><input type="text" name="comment" value={item.comment} onChange={(e) => handleChange(e, idx, 'msp')} /></td>
                </tr>
            )
        })
        
    const getCurrentMonth = () => { return new Date().getFullYear().toString() + (new Date().getMonth() + 1).toString().padStart(2, '0')}
    const prev_month = () => {
        const prevMonth = Number(getCurrentMonth()) - 1;
        return prevMonth.toString();
    }
    
    const from_month = prev_month();
    const to_month = getCurrentMonth();

    const closeModal = () => {
        const modal: any = document.querySelector("#modal");
        const modalHeader = modal.querySelector('#modalHeader');
        const modalBody = modal.querySelector('#modalBody');

        const searchBtn = modal.querySelector('#searchBtn');

        if (modal) {
            modalHeader.innerHTML = '';
            modalBody.innerHTML = '';
            modal.classList.remove(Styles.open);
            modal.querySelector('#modalContent').className = Styles.modalContent;
            // searchBtn.removeEventListener('click', () => { });
        }
    }

    const openModal = async(type: string) => {
        const modal: any = document.querySelector("#modal");
        const modalContent = modal.querySelector('#modalContent');
        const modalHeader = modal.querySelector('#modalHeader');
        const modalBody = modal.querySelector('#modalBody');
        let inner = "";

        switch (type) {
            case "member":
                inner = "<input type='text' id='memberInput' placeholder='회사 이름을 입력하세요.' /><button id='memberSearchBtn'>회사 검색</button>";
                break;
            default:
                inner = "<p>알 수 없는 검색 유형입니다.</p>"; // "Unknown search type"
        }

        if (modal) {
            modal.classList.add(Styles.open);
            modalContent.classList.add(Styles[type]);
            modalHeader.innerHTML = inner;

            const searchBtn = type === "product" ? modalHeader.querySelector('#productSearchBtn') : modalHeader.querySelector('#memberSearchBtn');
            const searchInput = type === "product" ? modalHeader.querySelector('#productInput') : modalHeader.querySelector('#memberInput');

            searchBtn.addEventListener('click', () => {
                if (searchBtn) {
                    switch (type) {
                        case "member":
                            memberSearch(searchInput.value);
                            break;
                        default:
                            break;
                    }
                }
            });
        }
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
            let content = '';
            let customers = result.content;
            if (customers.length === 0) {
                Toast("error", '회사명이 존재하지 않습니다.');
            } else {
                content = customers.map((item: any) => {
                    return `<div data-memberno="${item.memberNo}" data-membername="${item.memberName}" data-memberType="${item.memberType}"><p>${item.memberNo} - ${item.memberName} - ${item.memberType}</p></div>`;
                }).join('');
            }
      
            if (modalBody) {
                modalBody.innerHTML = content;

                // Attach click event listeners to the dynamically created div elements
                const divElements = modalBody.querySelectorAll('div');
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
    // useEffect(() => {
    //     const getCurrentMonthBilling = async() => {
    //         const copyurl = `/product/gdbilling/copy/${memberNo}/${from_month}/${to_month}`;
    //         const ieExistUrl = `/product/gdbilling?memberNo=${memberNo}&target_month=${targetMonth}`;
    //         const response = await apiBe.post(copyurl);
    //         if(response.status === 200) {
    //             setForm(response.data)
    //         } else {
    //             Toast('error', '동일한 청구가 존재합니다')
    //             const getFormData = await apiBe.get(ieExistUrl);
    //             if(getFormData.status === 200) {
    //                 setForm(getFormData.data[0])
    //             }
    //         }
    //     }
    //     getCurrentMonthBilling();
    // }, [memberNo, targetMonth]);
    // 고객정보. 기간 저장 먼저하고
    // 그 후에 상품정보 저장
    // 상품정보 msp
    // 상품정보 sw
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
                                {errors.memberName && <span className={Styles.error}>{errors.memberName.message}</span>}
                            </div>
                            <div className={Styles.inputGroup}>
                                <label htmlFor="memberNo">고객번호</label>
                                <input type="text" {...register("memberNo")} />
                            {errors.memberNo && <span className={Styles.error}>{errors.memberNo.message}</span>}
                            </div>
                            <div className={Styles.inputGroup}>
                                <label htmlFor="memberType">고객유형</label>
                                <input type="text" {...register("memberType")} />
                                {errors.memberType && <span className={Styles.error}>{errors.memberType.message}</span>}
                            </div>
                        </div>
                    </div>
                    <div className={Styles.inputSection}>
                        <h1>기간</h1>
                        <div className={Styles['col-3']}>
                        <div className={Styles.inputGroup}>
                            <label htmlFor="target_month">청구년월</label>
                            <div className={Styles.search}>
                                <input type="text" {...register("target_month")} value={targetMonth} />
                                <IconCalendar /> 
                            </div>
                            {errors.target_month && <span className={Styles.error}>{errors.target_month.message}</span>}
                        </div>
                        <div className={Styles.inputGroup}>
                            <label htmlFor="target_start_date">상품시작일</label>
                                <div className={Styles.search}>
                                     <Controller
                                        name="target_start_date"
                                        control={control}
                                        render={({ field: { onChange, value } }) => (
                                        <DatePicker
                                            selected={value}
                                            onChange={(date) => {
                                                onChange(date);
                                                setStartDate(date);
                                                setTargetMonth(dayjs(date).format('YYYYMM'));
                                            }}   
                                            dateFormat="yyyy/MM/dd"
                                                isClearable
                                            popperProps={{ strategy: "fixed" }}
                                        />
                                        )}
                                    /> 
                                    {/* <IconCalendar /> */}
                                </div>
                            {errors.target_start_date && <span className={Styles.error}>{errors.target_start_date.message}</span>}
                            </div>
                            
                        <div className={Styles.inputGroup}>
                                <label htmlFor="target_end_date">상품종료일</label>
                                <div className={Styles.search}>
                                <Controller
                                        name="target_end_date"
                                        control={control}
                                        render={({ field: { onChange, value } }) => (
                                            <DatePicker
                                            selected={value}
                                            disabled={startDate ? false : true}
                                            minDate={startDate}
                                            maxDate={getLastDayOfMonth(startDate)}
                                            onChange={(date) => { onChange(date); setEndDate(date) }}
                                            dateFormat="yyyy/MM/dd"
                                            isClearable
                                            popperProps={{ strategy: "fixed" }}
                                        />
                                        )}
                                    /> 
                                    {/* <IconCalendar /> */}
                                </div>
                            {errors.target_end_date && <span className={Styles.error}>{errors.target_end_date.message}</span>}
                        </div>
                    </div>
                    </div>
                    <div className={Styles.btnArea}>
                        <Button className={`${Styles.btn} ${Styles.submitBtn}`} type="submit" skin={"green"}>저장</Button>
                        <Button className={`${Styles.btn} ${Styles.cancelBtn}`} skin={"gray"}>취소</Button>
                    </div>
                </form>            
                    <div className={Styles.inputSection}>
                        <h1>상품정보SW</h1>
                        <div className={Styles.btnArea}>
                            <Button className={`${Styles.btn} ${Styles.addBtn}`} onClick={()=>addLine('sw')} skin={"green"}>상품추가</Button>
                        </div>
                        <table className={Styles.sw}>
                            <thead>
                                <tr>
                                    <th></th>
                                    <th>상품아이디</th>
                                    <th>상품명</th>
                                    <th>상품분류</th>
                                    <th>상품상세분류</th>
                                    <th>상품가격기준</th>
                                    <th>정식단가</th>
                                    <th>노출단가</th>
                                    <th>할인율</th>
                                    <th>할인금액</th>
                                    <th>납부예상금액</th>
                                    <th>청구단위</th>
                                    <th>절사금액</th>
                                    <th>서비스 시작일시</th>
                                    <th>서비스 종료일시</th>
                                    <th>빌링ID</th>
                                    <th>코멘트</th>
                                </tr>
                            </thead>
                            <tbody>
                                {renderProdSw}
                            </tbody>
                        </table>
                        <div className={Styles.btnArea}>
                        <Button className={`${Styles.btn} ${Styles.submitBtn}`} onClick={()=>updateProdSw} skin={"green"}>저장</Button>
                        <Button className={`${Styles.btn} ${Styles.cancelBtn}`} skin={"gray"}>취소</Button>
                    </div>
                    </div>
                    <div className={Styles.inputSection}>
                        <h1>상품정보MSP</h1>
                        <div className={Styles.btnArea}>
                            <Button className={`${Styles.btn} ${Styles.addBtn}`} onClick={()=>addLine('msp')} skin={"green"}>상품추가</Button>
                        </div>
                        <table className={Styles.msp}>
                            <thead>
                                <tr>
                                    <th></th>
                                    <th>상품아이디</th>
                                    <th>상품명</th>
                                    <th>상품분류</th>
                                    <th>상품상세분류</th>
                                    <th>수량</th>
                                    <th>정식단가</th>
                                    <th>할인율</th>
                                    <th>할인금액</th>
                                    <th>납부예상금액</th>
                                    <th>청구단위</th>
                                    <th>절사금액단위</th>
                                    <th>서비스 시작일시</th>
                                    <th>서비스 종료일시</th>
                                    <th>빌링ID</th>
                                    <th>코멘트</th>
                                </tr>
                            </thead>
                            <tbody>
                                {renderProdMsp}
                            </tbody>
                        </table>
                        <div className={Styles.btnArea}>
                            <Button className={`${Styles.btn} ${Styles.submitBtn}`} onClick={()=>updateProdMsp} skin={"green"}>저장</Button>
                            <Button className={`${Styles.btn} ${Styles.cancelBtn}`} skin={"gray"}>취소</Button>
                        </div>
                    </div>
                    <div className={Styles.btnArea}>
                        <Button className={`${Styles.btn} ${Styles.submitBtn}`} type="submit" skin={"green"}>저장</Button>
                        <Button className={`${Styles.btn} ${Styles.cancelBtn}`} skin={"gray"}>취소</Button>
                    </div>
            </div> 
            <div id="modal" className={Styles.modal}>
                <div id="modalContent" className={Styles.modalContent}>
                    <span className={Styles.closeBtn} onClick={()=> closeModal()}>&times;</span>
                    <div id="modalHeader" className={Styles.modalHeader}></div>
                    <div id="modalBody" className={Styles.modalBody}></div>
                </div>
            </div>
        </>
    )
}

export default ProductWrite;