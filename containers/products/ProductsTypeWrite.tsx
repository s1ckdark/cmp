import React from 'react';
import Styles from './ProductsTypeWrite.module.scss';
import Button from '@/components/Button';
import Breadcrumb from '@/components/Breadcrumb';
import { useForm, SubmitHandler } from 'react-hook-form';
import { apiBe } from '@/services';
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
    const router = useRouter();
    const onSubmit: SubmitHandler<FormValues> = async(data) => {
        const url = `/product/producttype`;
        const response = await apiBe.put(url, data);
        if (response.status === 201 || response.status === 200) {
            Toast('success', '저장되었습니다.', () => router.push('/products/category/list/1'));
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
                            <label htmlFor="prodType"><input type="radio" {...register("prodType")} value="SW" />상용SW</label>
                            <label htmlFor="prodType"><input type="radio" {...register("prodType")} value="MSP" />MSP</label>
                                {errors.prodType && <span className={Styles.error}>{errors.prodType?.message || null}</span>}
                        </div>
                    </div>
                    <div className={Styles.inputGroup}>
                        <label htmlFor="prodDetailType">상품상세분류</label>
                        <input type="text" placeholder='상품상세분류를 입력하세요'
                            {...register("prodDetailType", {
                                required: "해당 필드는 필수입니다."
                            })} />
                        {errors.prodDetailType && <span className={Styles.error}>{errors.prodDetailType?.message || null}</span>}
                    </div>
                    <div className={Styles.inputGroup}>
                        <label htmlFor="prodDetailTypeStd">상품가격기준</label>
                        <input type="text" placeholder='상품가격기준을 입력하세요'
                            {...register("prodDetailTypeStd", {
                                required: "해당 필드는 필수입니다."
                            })} />
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

export default ProductsTypeWrite;