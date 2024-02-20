'use client';
import React, { useEffect, useState, useCallback }from 'react';
import { useForm, Controller, useFieldArray, FormProvider, useFormContext } from 'react-hook-form';
import { apiBe } from '@/services';
import styles from './CustomerAddForm.module.scss';
import { Toast } from '@/components/Toast';
import Select, { defaultTheme } from 'react-select';
import { useRecoilState, useResetRecoilState } from 'recoil';
import { ICustomersForm } from '@/types/form';
import { IconSearch } from '@/public/svgs';
import { modalAtom } from '@/states';
import { addrAtom, customerStep } from '@/states/data';
import { usePathname, useRouter } from 'next/navigation';
import _ from 'lodash';

import Loading from '@/components/Loading';
import Button from '@/components/Button';
import CustomersAddPerForm from './CustomersAddPerForm';
import CustomersAddrForm from './CustomersAddrForm';

interface ICustomersFormProps {
    data?: ICustomersForm;
    pageType: "register" | "edit" | "view";
}

interface IaddMember {
    custContact: boolean;
    sales: boolean;
}

// export const ConnectForm = ({ children }:any) => {
//     const methods = useFormContext()
  
//     return children({ ...methods })
//   }

// export const DeepNest = () => (
//     <ConnectForm>
//          {({ register }) => <input {...register("deepNestedInput")} />}disabled:isDisabled,
//       <CustomersAddrForm />
//     </ConnectForm>
//   )

// useFormContext 와 FormProvider로 component input type을 정의하고, submit하는 경우 값을 한번에 받아올 수 있게 작업한다.
const CustomerAddForm = ({ data, pageType }: ICustomersFormProps) => {
    const [mounted, setMounted] = useState(false);
    const [modal, setModal] = useRecoilState(modalAtom);
    const [isDisabled, setIsDisabled] = useState(false);
    const [addMember, setAddMember] = useState<IaddMember>({ custContact: false, sales: false });
    const [regionTypeOptions, setRegionTypeOptions] = useState<any>([]);
    const [defaultRegionType, setDefaultRegionType] = useState<any>([]);
    const [member, setMember] = useState<any>({});
    const pathname = usePathname();
    const { memberNo, memberName, regionType, memberType, industry, businessRegNo, custCeo, custPhone, comment, custContact, address, sales } = member;
    const { control, register, setValue, handleSubmit, formState: { errors }} = useFormContext();
    const router = useRouter();

    const openModal = (type: string) => {
        if(pageType !== 'view') setModal({ isOpen: true, type: type, data: null });
    }

    useEffect(() => {
        const getMember = async (memberNo:string) => {
            const response = await apiBe.get(`/customer/${memberNo}`);
            const { data } = response;
            if (response.status === 200 && data.memberNo === memberNo ) {
               router.push(`/customers/edit/${memberNo}`)
            }
        }
        if (modal.data?.memberNo && modal.data?.memberName) {
            setMember({ ...member, 'memberNo': modal.data?.memberNo, 'memberName': modal.data?.memberName })
            setValue('memberNo', modal.data.memberNo);
            setValue('memberName', modal.data.memberName)
            getMember(modal.data.memberNo);
        }
    }, [modal]);



    useEffect(() => {
        setModal({isOpen: false, type: '', data: null});
        const memberNo = _.last(_.split(pathname, '/'))
        const getMember = async () => {
            const response = await apiBe.get(`/customer/${memberNo}`);
            if (response.status === 200 && response.data !== null) {
                const { data } = response;
                setMember(data)
                setValue('memberNo', data.memberNo);
                setValue('memberName', data.memberName);
                setValue('regionType', data.regionType);
                setValue('memberType', data.memberType);
                setValue('industry', data.industry);
                setValue('businessRegNo', data.businessRegNo);
                setValue('custCeo', data.custCeo);
                setValue('custPhone', data.custPhone);
                setValue('comment', data.comment);
                
        
            } else if(response.status === 404){
                setValue('memberNo', memberNo);
            }
        }
        if (pageType === 'view' || pageType === 'edit') {
            getMember()
        }

        const getRegionType = async () => {
            let tmp: any = [];
            const response = await apiBe.get('/common/code/regionType');
            if (response.status === 200 || response.status === 201) {
                const { regionType } = response.data;
                if (regionType) {
                    regionType.map((item: any) => {
                        tmp.push({ value: item.key, label: item.value });
                    })
                    const defaultRegion = tmp.filter((option: any) => regionType.includes(option.value));
                    setRegionTypeOptions(tmp);
                    setDefaultRegionType(defaultRegion);
                }
            }
        }
        if (defaultRegionType.length === 0) {
            getRegionType();
        }
        if (pageType === 'view') {
            setIsDisabled(true);
        }
        if (pageType === 'register') {
            const addr = async () => {
                const response = await apiBe.get(`/customer/${memberNo}/address`);
            }
        }
        setMounted(true);
    }, [pageType])
    
    if (mounted === false) return <Loading />
    return (
        <>
             <div className={`${styles.customers} ${styles[pageType]}`}>
                    <h2 className={styles.sectionTitle}>고객사 정보</h2>
                    <div className="columns-3 gap-36">
                        <div className={`${styles.memberNo} ${styles.inputGroup}`}>
                            <label htmlFor="memberNo" className="block text-sm font-medium text-gray-900 dark:text-black">고객사 번호<span className={styles.required}></span></label>
                            <input readOnly={true} type="text" id="memberNo" {...register("memberNo", {disabled:isDisabled, required: true })} defaultValue={memberNo} onClick={() => openModal('customer')}/>
                            {errors.memberNo && <span className={styles.errorMsg}>필수 입력 항목 입니다</span>}
                            {pageType === 'edit' || pageType === 'register' ? <IconSearch className={styles.iconSearch}  onClick={() => openModal('customer')}/> : null}
                            {errors.memberNo && <span className={styles.errorMsg}>필수 입력 항목 입니다</span>}
                        </div>
                        <div className={styles.inputGroup}>
                            <label htmlFor="memberName" className="block text-sm font-medium text-gray-900 dark:text-black">고객사 이름<span className={styles.required}></span></label>
                            <input readOnly={true} type="text" id="memberName" {...register("memberName", {disabled:isDisabled, required: true })} defaultValue={memberName} />
                            {errors.memberName && <span className={styles.errorMsg}>필수 입력 항목 입니다</span>}
                        </div>
                        <div className={styles.inputGroup}>
                            <label htmlFor="memberType" className="block text-sm font-medium text-gray-900 dark:text-black">고객유형<span className={styles.required}></span></label>
                            <input readOnly={isDisabled} type="text" id="memberType" {...register("memberType", {disabled:isDisabled, required: true })} defaultValue={memberType} />
                            {errors.memberType && <span className={styles.errorMsg}>필수 입력 항목 입니다</span>}
                        </div>
                    </div>
                    <div className="columns-3 gap-36">
                        <div className={styles.inputGroup}>
                            <label htmlFor="regionType" className="block text-sm font-medium text-gray-900 dark:text-black">리전타입<span className={styles.required}></span></label>
                            <Controller
                                name="regionType"
                                control={control}
                                defaultValue={defaultRegionType} // Set the default options
                                rules={{ required: true }}
                                render={({ field }) => (
                                    <Select
                                        {...field}
                                        options={regionTypeOptions}
                                        isDisabled={isDisabled}
                                        menuPosition={'fixed'}
                                        value={regionTypeOptions.find((option: any) => option.value === field.value)} // Corrected this line
                                        onChange={(val) => field.onChange(val.value)}
                                    />
                                )}
                            />
                            {errors.regionType && <span className={styles.errorMsg}>필수 입력 항목 입니다</span>}
                        </div>
                        <div className={styles.inputGroup}>
                            <label htmlFor="industry" className="block text-sm font-medium text-gray-900 dark:text-black">산업분류<span className={styles.required}></span></label>
                            <input readOnly={isDisabled} type="text" id="industry" {...register("industry", {disabled:isDisabled, required: true })} defaultValue={industry} />
                            {errors.industry && <span className={styles.errorMsg}>필수 입력 항목 입니다</span>}
                        </div>
                        <div className={styles.inputGroup}>
                            <label htmlFor="businessRegNo" className="block text-sm font-medium text-gray-900 dark:text-black">사업자번호<span className={styles.required}></span></label>
                            <input readOnly={isDisabled} type="text" id="businessRegNo" {...register("businessRegNo", {disabled:isDisabled, required: true },)} defaultValue={businessRegNo} placeholder="XXX-XX-XXXXXX 양식으로 입력해주세요"/>
                            {errors.businessRegNo && <span className={styles.errorMsg}>필수 입력 항목 입니다</span>}
                        </div>
                    </div>
                    <div className="columns-3 gap-36">
                        <div className={styles.inputGroup}>
                            <label htmlFor="custCeo" className="block text-sm font-medium text-gray-900 dark:text-black">대표<span className={styles.required}></span></label>
                            <input readOnly={isDisabled} type="text" id="custCeo" {...register("custCeo", {disabled:isDisabled, required: true })} defaultValue={custCeo} />
                            {errors.custCeo && <span className={styles.errorMsg}>필수 입력 항목 입니다</span>}
                        </div>
                        <div className={styles.inputGroup}>
                            <label htmlFor="custPhone" className="block text-sm font-medium text-gray-900 dark:text-black">고객 연락처<span className={styles.required}></span></label>
                            <input readOnly={isDisabled} type="text" id="custPhone" {...register("custPhone", {disabled:isDisabled, required: true })} defaultValue={custPhone} placeholder="010-1234-5678 양식으로 입력해주세요"/>
                            {errors.custPhone && <span className={styles.errorMsg}>필수 입력 항목 입니다</span>}
                        </div>
                    </div>
                </div>
            </>
    );
}

export default CustomerAddForm;
