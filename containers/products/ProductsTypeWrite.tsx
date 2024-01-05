import React from 'react';
import Styles from './ProductsTypeWrite.module.scss';
import Button from '@/components/Button';
import Breadcrumb from '@/components/Breadcrumb';
import { useForm, SubmitHandler } from 'react-hook-form';
import { apiBe } from '@/services';

interface FormValues {
    prodName: string;
    prodType: string;
    prodDetailType: string;
    prodDetailTypeStd: string;
    prodDesc: string;
    stdPrice: string;
    expPrice: string;
    comment: string;
    regId: string;
    regName: string;
    regDt: string;
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


const ProductsTypeWrite = () => {
    const { register, handleSubmit, watch, reset, getValues, setError, setFocus, formState: { errors } } = useForm<FormValues>();
    const onSubmit: SubmitHandler<FormValues> = (data) => {
        const url = `/product/producttype`;
        apiBe.put(url, data).then((res) => {
            console.log(res);
        })
    }

    return (
        <>
            <Breadcrumb />
            <div className={Styles.container}>
                <form className={Styles.form} onSubmit={handleSubmit(onSubmit)}>
                    <div className={Styles.inputGroup}>
                        <label htmlFor="prodType">상품분류</label>
                        <input type="radio" {...register("prodType")} value="SW" />사용SW
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

                    <Button type="submit" className={Styles.submitBtn} skin={"green"}>저장</Button>
                </form>
            </div>
        </>
    )
}

export default ProductsTypeWrite;