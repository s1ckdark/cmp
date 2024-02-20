import React, { useEffect, useState } from 'react';
import { useForm, useFormContext, useFieldArray } from "react-hook-form";
import styles from './CustomersAddPerForm.module.scss';
import { IconSearch } from '@/public/svgs';
import { useRecoilState } from 'recoil';
import { modalAtom } from '@/states';
import { useRouter } from 'next/navigation';
interface formProps {
    id?: string;
    userId?: string;
    name: string;
    dept: string;
    email: string;
    phoneNo?: string;
    mobileNo?: string;
    comment: string;
}
interface CustomersAddPerFormProps {
    type: "sales" | "custContact"; 
    data?: any;
    pageType: "register" | "edit" | "view";
}



const CustomersAddPerForm = ({ type, pageType, data }: CustomersAddPerFormProps) => {
    const [ isDisabled, setIsDisabled] = useState(false);
    const [ modal, setModal ] = useRecoilState(modalAtom);
    const { id, userId, name, dept, email, phoneNo, mobileNo, comment } = data || {};
    const { register, control, setValue, reset, formState: { errors } }:any = useFormContext();
    const router = useRouter();
    const { fields, append, remove, insert } = useFieldArray({
        name: type,
        control,
      });

    const onTitle = (type: string) => {
        switch (type) {
            case "sales":
                return "담당 영업 정보";
            case "custContact":
                return "고객사 담당자 정보";
            default:
                return "담당자";
        }
    }

    const openModal = (type: string) => {
        if(pageType !== 'view') setModal({isOpen: true, type: type, data:null});
    }

    useEffect(() => {
        if(modal.type === 'user' && modal.data !== null) {
            const { email, name} = modal?.data;
            setValue(`sales.0.userId`, email);
            setValue(`sales.0.name`, name);
        }
    },[modal.data])

    useEffect(() => {
        if (pageType === "view") setIsDisabled(true);
    }, [pageType])

    return (
        <>
            <div className={`${styles.addMember} ${styles[type]}`}>
                <h2 className={styles.sectionTitle}>{onTitle(type)}</h2>
                    {fields.map((field, index) => (
                        <div className="flex flex-wrap justify-start" key={field.id}>
                            {type === "sales" && <div className={`${styles.inputGroup} ${styles.userId}`}>
                                <label htmlFor="userId" className="block text-sm font-medium text-gray-900 dark:text-black">담당자 ID<span className={styles.required}></span></label>
                                <input readOnly={isDisabled} type="text" id="userId" {...register(`${type}.${index}.userId`, { required: true, disabled:isDisabled })} defaultValue={userId} onClick={() => openModal('user')}/>
                                <IconSearch className={styles.iconSearch} onClick={() => openModal('user')} /> 
                                {errors[type]?.[index]?.userId && <span className={styles.errorMsg}>필수 입력 항목 입니다</span>}
                            </div>}
                            <div className={styles.inputGroup}>
                                <label htmlFor="name" className="block text-sm font-medium text-gray-900 dark:text-black">담당자명<span className={styles.required}></span></label>
                                <input readOnly={isDisabled} type="text" id="name" {...register(`${type}.${index}.name`, { required: true, disabled:isDisabled })} defaultValue={name} />
                                {errors[type]?.[index]?.name && <span className={styles.errorMsg}>필수 입력 항목 입니다</span>}
                            </div>
                            <div className={styles.inputGroup}>
                                <label htmlFor="memberName" className="block text-sm font-medium text-gray-900 dark:text-black">부서</label>
                                <input readOnly={isDisabled} type="text" id='dept-sales' {...register(`${type}.${index}.dept`, { required: true, disabled:isDisabled })} defaultValue={dept} />
                                {errors[type]?.[index]?.dept && <span className={styles.errorMsg}>필수 입력 항목 입니다</span>}
                            </div>
                            <div className={`${styles.inputGroup}`}>
                                <label htmlFor="email" className="block text-sm font-medium text-gray-900 dark:text-black">이메일<span className={styles.required}></span></label>
                                <input readOnly={isDisabled} type="text" id="email" {...register(`${type}.${index}.email`, { required: true, disabled:isDisabled })} defaultValue={email} />
                                {errors[type]?.[index]?.email && <span className={styles.errorMsg}>필수 입력 항목 입니다</span>}
                            </div>
                            {type === "custContact" &&
                                <div className={`${styles.inputGroup}`}>
                                    <label htmlFor="mobileNo" className="block text-sm font-medium text-gray-900 dark:text-black">연락처<span className={styles.required}></span></label>
                                    <input readOnly={isDisabled} type="text" id="mobileNo" {...register(`${type}.${index}.mobileNo`, { required: true, disabled:isDisabled })} defaultValue={mobileNo} placeholder="010-1234-5678 양식으로 입력해주세요"/>
                                    {errors[type]?.[index]?.mobileNo && <span className={styles.errorMsg}>필수 입력 항목 입니다</span>}
                                </div>}
                                {type === "sales" &&
                                <div className={`${styles.inputGroup}`}>
                                    <label htmlFor="phoneNo" className="block text-sm font-medium text-gray-900 dark:text-black">연락처<span className={styles.required}></span></label>
                                    <input readOnly={isDisabled} type="text" id="phoneNo" {...register(`${type}.${index}.phoneNo`, { required: true, disabled:isDisabled })} defaultValue={phoneNo} placeholder="010-1234-5678 양식으로 입력해주세요" />
                                    {errors[type]?.[index]?.phoneNo && <span className={styles.errorMsg}>필수 입력 항목 입니다</span>}
                                </div>}
                            <div className={`${styles.inputGroup}`}>
                                <label htmlFor="comment" className="block text-sm font-medium text-gray-900 dark:text-black">코멘트</label>
                                <input readOnly={isDisabled} type="text" id="comment" {...register(`${type}.${index}.comment`,{ disabled:isDisabled })} defaultValue={comment} />
                            </div>
                        </div>
                ))}
            </div>
        </>
    )
}
export default CustomersAddPerForm;