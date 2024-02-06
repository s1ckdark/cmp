import React from 'react';
import Styles from './ProductsEdit.module.scss';
import Button from '@/components/Button';
import Breadcrumb from '@/components/Breadcrumb';
import { useForm, SubmitHandler,  } from 'react-hook-form';
import { apiBe } from '@/services';
import { getKRCurrrentTime } from '@/utils/date';
import { useRouter, usePathname } from 'next/navigation';
import { Toast } from '@/components/Toast';
import { useRecoilValue } from 'recoil';
import { dataListAtom } from '@/states/data';
import lodash from 'lodash';
import Loading from '@/components/Loading';
interface FormValues {
    prodType: string;
    prodDetailType: string;
    prodDetailTypeStd: string;
    prodName: string;
    stdPrice: number;
    prodDesc: string;
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

const ProductEdit = () => {
    const data = useRecoilValue(dataListAtom);
    const pathname = usePathname();
    const router = useRouter();
    const id:any = lodash.last(pathname.split('/'));
    const product = lodash.find(data?.data, {id});
    const { prodName, prodType, prodDetailType, prodDetailTypeStd, prodDesc, stdPrice, expPrice, comment } = product;
    const { register, handleSubmit, formState: { errors } } = useForm<FormValues>({
        defaultValues: {
            prodType: prodType,
            prodDetailType: prodDetailType,
            prodDetailTypeStd: prodDetailTypeStd,
            prodName: prodName,
            stdPrice: stdPrice,
            prodDesc: prodDesc,
            comment: comment
        }
    });

    const onSubmit: SubmitHandler<FormValues> = async(data) => {
        const url:any = `/product/product/${id}`;
        const response = await apiBe.post(url, data);
        if (response.status === 201 || response.status === 200) {
                Toast('success','저장되었습니다.', ()=> goBack())
        }    
    }
    const goBack = () => {
        router.push('/products/product/list/1');
    }
    if(!product) return <Loading />
   
    return (
        <>
        <Breadcrumb />
        <div className={Styles.container}>
            <form className={Styles.form} onSubmit={handleSubmit(onSubmit)}>
                <div className={Styles.inputGroup}>
                    <label htmlFor="prodName">상품명</label>
                    <input type="text" placeholder='상품명을 입력하세요' 
                    {...register("prodName", {
                        required: "해당 필드는 필수입니다."
                    })} />
                    {errors.prodName && <span className={Styles.error}>{errors.prodName?.message}</span>}
                </div>
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
                        required: "해당 필드는 필수입니다."
                    })} />
                    {errors.prodDetailType && <span className={Styles.error}>{errors.prodDetailType?.message}</span>}
                </div>
                <div className={Styles.inputGroup}>
                    <label htmlFor="prodDetailTypeStd">상품가격기준</label>
                    <input type="text" placeholder='상품가격기준을 입력하세요' 
                     {...register("prodDetailTypeStd", {
                        required: "해당 필드는 필수입니다."
                    })} />
                    {errors.prodDetailTypeStd && <span className={Styles.error}>{errors.prodDetailTypeStd?.message}</span>}
                </div>
                <div className={Styles.inputGroup}>
                    <label htmlFor="prodDesc">상품정보</label>
                    <input type="text" placeholder='상품가격기준을 입력하세요' 
                     {...register("prodDesc", {
                        required: "해당 필드는 필수입니다."
                    })} />
                    {errors.prodDesc && <span className={Styles.error}>{errors.prodDesc?.message}</span>}
                </div>
                <div className={Styles.inputGroup}>
                    <label htmlFor="stdPrice">정식단가</label>
                    <input type="text" placeholder='정식단가를 입력하세요' 
                     {...register("stdPrice", {
                        required: "해당 필드는 필수입니다."
                    })} />
                    {errors.stdPrice && <span className={Styles.error}>{errors.stdPrice?.message}</span>}
                </div>

                <div className={Styles.inputGroup}>
                    <label htmlFor="comment">코멘트</label>
                    <textarea placeholder='코멘트를 입력하세요'
                     {...register("comment", {
                        required: false
                    })} />
                </div>
                <div className={Styles.btnArea}>
                        <Button type="submit" className={Styles.submitBtn} skin={"submit"}>저장</Button>
                        <Button type="button" className={Styles.submitBtn} skin={"cancel"} onClick={goBack}>취소</Button>
                </div>
            </form>
        </div>
        </>
    )
    }
export default ProductEdit;