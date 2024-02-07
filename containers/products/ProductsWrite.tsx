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
    const { register, handleSubmit, watch, getValues, setValue, formState: { errors } } = useForm<FormValues>();
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
        if (getValues('prodType') === "SW" || getValues('prodType') === "MSP") {
            setModal({ ...modal, isOpen: true, type: type });
        } else {
            Toast('error', '상품분류를 선택해주세요.');
        }
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
        setModal({ ...modal, data: { prodDetailType: '', prodDetailTypeStd: '', prodType: prodTypeValue } })
        setValue('prodDetailType', '');
        setValue('prodDetailTypeStd', '');
        setValue('prodDesc', '');
        setValue('stdPrice', 0);
        setValue('comment', '')
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
                    {errors.prodName && <span className={`${Styles.errorMsg} text-red-500`}>필수 입력 항목입니다.</span>}
                </div>
                    <div className={Styles.inputGroup}>
                        <label htmlFor="type">상품분류</label>
                        <div className={Styles.inputRadio}>
                            <label htmlFor="prodType"><input type="radio" {...register("prodType", {required: true})} value="SW" />상용SW</label>
                            <label htmlFor="prodType"><input type="radio" {...register("prodType", { required: true })} value="MSP" />MSP</label>
                                {errors.prodType && <span className={`${Styles.errorMsg} text-red-500`}>필수 선택 사항입니다</span>}
                        </div>
                    </div>
                <div className={Styles.inputGroup}>
                    <label htmlFor="prodDetailType">상품상세분류</label>
                    <input type="text" placeholder='상품상세분류를 입력하세요' 
                            {...register("prodDetailType", { required: true })} readOnly={true}  onClick={()=>openModal("prodType")}/>
                    <IconSearch />
                    {errors.prodDetailType && <span className={`${Styles.errorMsg} text-red-500`}>필수 입력 항목입니다.</span>}
                </div>
                <div className={Styles.inputGroup}>
                    <label htmlFor="prodDetailTypeStd">상품가격기준</label>
                        <input type="text" placeholder='상품가격기준을 입력하세요'
                            {...register("prodDetailTypeStd", { required: true })} readOnly={true} />
                    {errors.prodDetailTypeStd && <span className={`${Styles.errorMsg} text-red-500`}>필수 입력 항목입니다.</span>}
                </div>
                <div className={Styles.inputGroup}>
                    <label htmlFor="prodDesc">상품정보</label>
                    <input type="text" placeholder='상품가격기준을 입력하세요' 
                     {...register("prodDesc", {
                        required: true
                    })} />
                    {errors.prodDesc && <span className={`${Styles.errorMsg} text-red-500`}>필수 입력 항목입니다.</span>}
                </div>
                <div className={Styles.inputGroup}>
                    <label htmlFor="stdPrice">정식단가</label>
                    <input type="text" placeholder='정식단가를 입력하세요' 
                     {...register("stdPrice", {
                        required: true
                    })} />
                    {errors.stdPrice && <span className={`${Styles.errorMsg} text-red-500`}>필수 입력 항목입니다.</span>}
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