import React, { useEffect } from 'react';
import Styles from './ProductsWrite.module.scss';
import Button from '@/components/Button';
import Breadcrumb from '@/components/Breadcrumb';
import { useForm, SubmitHandler,  } from 'react-hook-form';
import { apiBe } from '@/services';
import { getKRCurrrentTime } from '@/utils/date';
import { useRouter } from 'next/navigation';
import { Toast } from '@/components/Toast';
import { IconSearch } from '@/public/svgs';
import { useRecoilState } from 'recoil';
import { modalAtom } from '@/states';

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

const ProductsWrite = () => {
    const [modal, setModal] = useRecoilState(modalAtom);
    const { register, handleSubmit, watch, setValue, formState: { errors } } = useForm<FormValues>();
    const router = useRouter();
    
    const onSubmit: SubmitHandler<FormValues> = async(data) => {
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

        const response = await apiBe.put(url, tmp);
        if (response.status === 201 || response.status === 200) {
                Toast('success','저장되었습니다.', ()=> router.back())
        }    
    }
    
    const goBack = () => {
        router.push('/products/product/list/1');
    }
    
    const openModal = (type: string) => {
        setModal({ isOpen: true, type: type, data: null });
    }
    const prodTypeValue = watch('prodType');
    useEffect(() => {
        if (modal.type === 'prodType' && modal.data !== null) {
            const { prodType, prodDetailType, prodDetailTypeStd } = modal.data;
            setValue('prodType', prodType);
            setValue('prodDetailType', prodDetailType);
            setValue('prodDetailTypeStd', prodDetailTypeStd);
        }
    }, [modal])

    useEffect(() => {
        console.log("prodType change", prodTypeValue);
        setModal({...modal, data: {prodType: prodTypeValue}})
    },[prodTypeValue])

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
                    })} onClick={()=>openModal("prodType")}/>
                    <IconSearch />
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
export default ProductsWrite;