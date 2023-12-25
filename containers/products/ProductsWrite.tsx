import React from 'react';
import Styles from './ProductsWrite.module.scss';
import Button from '@/components/Button';
import Breadcrumb from '@/components/Breadcrumb';
import { useForm } from 'react-hook-form';
import { apiBe } from '@/services';
import { getKRCurrrentTime } from '@/utils/date';
import { useRouter } from 'next/navigation';
import { Toast } from '@/components/Toast';
interface FormValues {
    prodName: string;
    prodType: string;
    prodDetailType: string;
    prodDetailTypeStd: string;
    prodDesc: string;
    stdPrice: string;
    expPrice: string;
    comment: string;
}

interface IForm {
    register: any;
    handleSubmit: any;
    watch: any;
    reset: any;
    getValues: any;
    setError: any;
    setFocus: any;
    formState: any;
}

interface form {
    prodType: string;
    prodDetailType: string;
    prodDetailTypeStd: string;
    prodName: string;
    stdPrice: number;
    prodDesc: string;
    comment: string;
    billingIsUsed: true;
    prodIsUsed: false;
    prodEndDt: string;
    regDt: string;
  }


const ProductsWrite = () => {
    const { register, handleSubmit, watch, reset, getValues, setError, setFocus, formState: { errors } } = useForm();
    const router = useRouter();
    const onSubmit = (data:form) => {
        console.log(data);
        let tmp:object = {};
        const addData = {
            billingIsUsed: true,
            prodIsUsed: true,
            prodEndDt: getKRCurrrentTime(),
            regDt: getKRCurrrentTime()
        }

        const url = `/product/product`;
        Object.assign(tmp, data, addData)

        apiBe.put(url, tmp).then((res) => {
            if(res.status === 201) {
                Toast('success','저장되었습니다.', ()=> router.back())

            }    
        })
    }
    return (
        <>
        <Breadcrumb />
        <div className={Styles.container}>
            <form className={Styles.form} onSubmit={handleSubmit(onSubmit)}>
                <div className={Styles.inputGroup}>
                    <label htmlFor="prodName">상품명</label>
                    <input type="text" placeholder='상품명을 입력하세요' 
                    {...register("prodName", {
                        required: "해당 필드는 필수입니다.", 
                        minLength: {
                            value: 3,
                            message: "3글자 이상 입력해주세요."
                        }
                    })} />
                    {errors.prodName && <span className={Styles.error}>{errors.prodName?.message || null}</span>}
                </div>
                <div className={Styles.inputGroup}>
                    <label htmlFor="prodType">상품분류</label>
                    <input type="radio" {...register("prodType")} value="SW"/>사용SW
                    <input type="radio" {...register("prodType")} value="MSP" />MSP
                    {errors.prodType && <span className={Styles.error}>{errors.prodType?.message || null}</span>}
                </div>
                <div className={Styles.inputGroup}>
                    <label htmlFor="prodDetailType">상품상세분류</label>
                    <input type="text" placeholder='상품상세분류를 입력하세요' 
                    {...register("prodDetailType", {
                        required: "해당 필드는 필수입니다.", 
                        minLength: {
                            value: 3,
                            message: "3글자 이상 입력해주세요."
                        }
                    })} />
                    {errors.prodDetailType && <span className={Styles.error}>{errors.prodDetailType?.message || null}</span>}
                </div>
                <div className={Styles.inputGroup}>
                    <label htmlFor="prodDetailTypeStd">상품가격기준</label>
                    <input type="text" placeholder='상품가격기준을 입력하세요' 
                     {...register("prodDetailTypeStd", {
                        required: "해당 필드는 필수입니다.", 
                        minLength: {
                            value: 3,
                            message: "3글자 이상 입력해주세요."
                        }
                    })} />
                    {errors.prodDetailTypeStd && <span className={Styles.error}>{errors.prodDetailTypeStd?.message || null}</span>}
                </div>
                <div className={Styles.inputGroup}>
                    <label htmlFor="prodDesc">상품정보</label>
                    <input type="text" placeholder='상품가격기준을 입력하세요' 
                     {...register("prodDesc", {
                        required: "해당 필드는 필수입니다.", 
                        minLength: {
                            value: 3,
                            message: "3글자 이상 입력해주세요."
                        }
                    })} />
                    {errors.prodDesc && <span className={Styles.error}>{errors.prodDesc?.message || null}</span>}
                </div>
                <div className={Styles.inputGroup}>
                    <label htmlFor="stdPrice">정식단가</label>
                    <input type="text" placeholder='정식단가를 입력하세요' 
                     {...register("stdPrice", {
                        required: "해당 필드는 필수입니다.", 
                        minLength: {
                            value: 3,
                            message: "3글자 이상 입력해주세요."
                        }
                    })} />
                    {errors.stdPrice && <span className={Styles.error}>{errors.stdPrice?.message || null}</span>}
                </div>

                <div className={Styles.inputGroup}>
                    <label htmlFor="">코멘트</label>
                    <textarea placeholder='코멘트를 입력하세요'
                     {...register("comment", {
                        required: false
                    })} />
                </div>
                <Button type="submit" className={Styles.submitBtn} skin={"green"}>저장</Button>
            </form>
        </div>
        </>
    )
    }
export default ProductsWrite;