'use client';
import Breadcrumb from '@/components/Breadcrumb';
import React, {useEffect, useState} from 'react';
import { apiBe } from '@/services';
import Button from '@/components/Button';
import { useRecoilState } from 'recoil';
import { dataViewAtom} from '@/states/data';
import Styles from './ProductWrite.module.scss';
import { useForm } from "react-hook-form";
import { Toast } from '@/components/Toast';
import { IconSearch, IconCalendar } from '@/public/svgs';

interface ProductViewCtProps {
    memberNo: string;
    targetMonth: string;
}
interface form {
    "memberNo": "string",
    "memberName": "string",
    "memberType": "string",
    "target_start_date": "string",
    "target_end_date": "string",
    "target_month": "string"
  }

interface ISW {
    "billingId": "string",
    "prodId": "string",
    "prodName": "string",
    "prodDetailType": "string",
    "prodDetailTypeStd": "string",
    "expPrice": 0,
    "stdPrice": 0,
    "discountRate": 0,
    "etcdiscountamount": 0,
    "estimateuseAmount": 0,
    "trimDiscUnit": 0,
    "promiseDiscountamount": 0,
    "memberpricediscountamount": 0,
    "memberpromisediscountadddamount": 0,
    "billingUnit": "string",
    "service_start_date": "string",
    "service_end_date": "string",
    "comment": "string"
  }
interface IMSP {
    "billingId": "string",
    "prodId": "string",
    "prodName": "string",
    "prodDetailType": "string",
    "qty": 0,
    "stdPrice": 0,
    "discountRate": 0,
    "promiseDiscountamount": 0,
    "memberpricediscountamount": 0,
    "memberpromisediscountadddamount": 0,
    "trimDiscUnit": 0,
    "etcdiscountamount": 0,
    "billingUnit": "string",
    "estimateuseAmount": 0,
    "service_start_date": "string",
    "service_end_date": "string",
    "comment": "string"
  }
const ProductWrite= ({memberNo, targetMonth}:ProductViewCtProps) => {
    const [ form, setForm ] = useState();
    const [ prodSw, setProdSw ] = useState<ISW[]>([]);
    const [ prodMsp, setProdMsp ] = useState<IMSP[]>([]);
    const { register, handleSubmit, watch, reset, getValues, setError, setFocus, formState: { errors } } = useForm();
    const onSubmit = (data:form) => {
        console.log(data);
        const url = `/product/gdbilling`;

        apiBe.put(url, data).then((res) => {
            console.log(res);
        })
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
    // const handleSwChange = (e:any) => {
    //     console.log(e.target.name, e.target.value);
        
    // }

    // const handleMspChange = (e:any) => {
    //     console.log(e.target.name, e.target.value);
        
    // }
    const updateProdSw = () => {
        console.log(prodSw);
        const url = '/product/gdbilling/product/sw';

    }

    const updateProdMsp = () => {
        console.log(prodMsp);

    }
    const addLine = (prod:string) => {
        // const target = document.querySelector(`.${Styles[prod]} tbody`);
        // if (target) {
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
            // if (field[prod]) {
            //     // Create a delete button cell
            //     let deleteCell = document.createElement('td');
            //     let deleteSpan = document.createElement('span');
            //     deleteSpan.setAttribute('idx', 'delete')
            //     deleteSpan.innerHTML = '&times;';
            //     deleteSpan.style.cursor = 'pointer';
            //     deleteSpan.addEventListener('click', () => bodyRow.remove());
            //     deleteCell.appendChild(deleteSpan);
            //     bodyRow.appendChild(deleteCell);

            //     // Create input cells for each field
            //     field[prod].forEach((fieldName:any) => {
            //         let cell = document.createElement('td');
            //         let input:any = document.createElement('input');
            //         input.type = 'text';
            //         input.setAttribute('name', fieldName);
            //         input.onchange = (event:any) => handleChange(event, prod);
            //         // Register the input with react-hook-form
            //         // register(input);

            //         cell.appendChild(input);
            //         bodyRow.appendChild(cell);
            //     });
            // }
            
            // Append the new row to the table body
            // target.appendChild(bodyRow);
            if(prod === 'sw') {
                setProdSw([...prodSw, objectStructure[prod]])
            } else {
                setProdMsp([...prodMsp, objectStructure[prod]])
            
            }
        // }
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
    useEffect(() => {
        const getCurrentMonthBilling = async() => {
            const copyurl = `/product/gdbilling/copy/${memberNo}/${from_month}/${to_month}`;
            const ieExistUrl = `/product/gdbilling?memberNo=${memberNo}&target_month=${targetMonth}`;
            const response = await apiBe.post(copyurl);
            if(response.status === 200) {
                setForm(response.data)
            } else {
                Toast('error', '동일한 청구가 존재합니다')
                const getFormData = await apiBe.get(ieExistUrl);
                if(getFormData.status === 200) {
                    setForm(getFormData.data[0])
                }
            }
        }
        getCurrentMonthBilling();
    }, [memberNo, targetMonth]);
    // 고객정보. 기간 저장 먼저하고
    // 그 후에 상품정보 저장
    // 상품정보 msp
    // 상품정보 sw
    return (
        <>
            {/* <Breadcrumb />
            <div className={Styles.container}>
                <form className={Styles.form} onSubmit={handleSubmit(onSubmit)}>
                    <div className={Styles.inputSection}>
                        <h1>고객 정보</h1>
                        <div className={Styles['col-3']}>
                            <div className={Styles.inputGroup}>
                                <label htmlFor="memberNo">고객번호</label>
                                <input type="text" {...register("memberNo")} />
                            {errors.memberNo && <span className={Styles.error}>{errors.memberNo.message || null}</span>}
                            </div>
                            <div className={Styles.inputGroup}>
                                <label htmlFor="memberName">고객명</label>
                                <div className={Styles.search}>
                                    <input type="text" {...register("memberName")} />
                                    <IconSearch />
                                </div>
                                {errors.memberName && <span className={Styles.error}>{errors.memberName?.message || null}</span>}
                            </div>
                            <div className={Styles.inputGroup}>
                                <label htmlFor="memberType">고객유형</label>
                                <input type="text" {...register("memberType")} />
                                {errors.memberType && <span className={Styles.error}>{errors.memberType?.message || null}</span>}
                            </div>
                        </div>
                    </div>
                    <div className={Styles.inputSection}>
                        <h1>기간</h1>
                        <div className={Styles['col-3']}>
                        <div className={Styles.inputGroup}>
                            <label htmlFor="target_month">청구년월</label>
                            <div className={Styles.search}>
                                <input type="text" {...register("target_month")} />
                                <IconCalendar />
                            </div>
                            {errors.target_month && <span className={Styles.error}>{errors.target_month?.message || null}</span>}
                        </div>
                        <div className={Styles.inputGroup}>
                            <label htmlFor="target_start_date">상품시작일</label>
                            <input type="text" {...register("target_start_date")} />
                            {errors.target_start_date && <span className={Styles.error}>{errors.target_start_date?.message || null}</span>}
                        </div>
                        <div className={Styles.inputGroup}>
                            <label htmlFor="target_end_date">상품종료일</label>
                            <input type="text" {...register("target_end_date")} />
                            {errors.target_end_date && <span className={Styles.error}>{errors.target_end_date?.message || null}</span>}
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
                </form>
            </div> */}
        </>
    )
}

export default ProductWrite;