'use client';
import React, { useEffect } from 'react';
import Styles from './ProductsTypeEdit.module.scss';
import Button from '@/components/Button';
import Breadcrumb from '@/components/Breadcrumb';
import { useForm, SubmitHandler } from 'react-hook-form';
import { apiBe } from '@/services';
import { usePathname, useRouter } from 'next/navigation';
import { useRecoilValue } from 'recoil';
import { prodTypeAtom } from '@/states/data';
import lodash from 'lodash';
import { Toast } from '@/components/Toast';

interface FormValues {
    prodType: string;
    prodDetailType: string;
    prodDetailTypeStd: string;
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


const ProductsTypeEdit = () => {
    const product = useRecoilValue(prodTypeAtom);
    const router = useRouter();
    const pathname = usePathname();
    const prodid = lodash.last(pathname.split('/'));
    const { prodType, prodDetailType, prodDetailTypeStd } = product;
    const { register, handleSubmit, watch, reset, getValues, setError, setFocus, formState: { errors } } = useForm(
        {
            defaultValues: {
                prodType: product?.prodType || '',
                prodDetailType: product?.prodDetailType || '',
                prodDetailTypeStd: product?.prodDetailTypeStd || ''
            }
        }
    );
       
    const onSubmit: SubmitHandler<FormValues> = async(data) => {
        const url = `/product/producttype/${prodid}`;
        const response = await apiBe.post(url, data);
        if (response.status === 201 || response.status === 200) {
            Toast('success', '저장되었습니다.', () => router.push('/products/category/list/1'));
        } else {
            Toast('error', '저장이 실패했습니다.');
        }
    }

    const cancel = () => {
        router.push('/products/category/list/1');
    }
    return (
        <>
            <Breadcrumb />
            <div className={Styles.container}>
                <form className={Styles.form} onSubmit={handleSubmit(onSubmit)}>
                  <div className={Styles.inputGroup}>
                        <label htmlFor="type">상품분류</label>
                        <div className={Styles.inputRadio}>
                            <label htmlFor="prodType"><input type="radio" {...register("prodType")} value="SW" />사용SW</label>
                            <label htmlFor="prodType"><input type="radio" {...register("prodType")} value="MSP" />MSP</label>
                                {errors.prodType && <span className={Styles.error}>{errors.prodType?.message || null}</span>}
                        </div>
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
                            })} defaultValue={prodDetailType}/>
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
                            })}
                            defaultValue={prodDetailTypeStd}/>
                        {errors.prodDetailTypeStd && <span className={Styles.error}>{errors.prodDetailTypeStd?.message || null}</span>}
                    </div>
                    <div className={Styles.btnArea}>
                        <Button type="submit" skin={"submit"}>저장</Button>
                        <Button type="button" skin={"cancel"} onClick={cancel}>취소</Button>
                    </div>
                </form>
            </div>
        </>
    )
}

export default ProductsTypeEdit;