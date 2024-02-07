import React, { useEffect, useState } from 'react';
import { useForm } from "react-hook-form";
import styles from './CustomersAddPerForm.module.scss';
import Button from '../Button';
import { IconSearch } from '@/public/svgs';
import { useRecoilState } from 'recoil';
import { modalAtom } from '@/states';
import { customerStep } from '@/states/data';
import { apiBe } from '@/services';
import { Toast } from '@/components/Toast';
import { set } from 'lodash';
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
    memberNo: string;
    data?: any;
    mode?: "register" | "edit" | "view";
}


const CustomersAddPerForm = ({ type, memberNo, data, mode }: CustomersAddPerFormProps) => {
    const [ formData, setFormData ] = useState<formProps>({ id:'', userId: '', name: '', dept: '', email: '', phoneNo: '', mobileNo:'', comment: '' });
    const [isDisabled, setIsDisabled] = useState(false);
    const [ step, setStep ] = useRecoilState(customerStep);
    const [ modal, setModal ] = useRecoilState(modalAtom);
    const { id, userId, name, dept, email, phoneNo, mobileNo, comment } = data ? data: { id:'', userId: '', name: '', dept: '', email: '', phoneNo: '', mobileNo:'', comment: '' };
    const { register, handleSubmit, control, setValue, reset, formState: { errors } } = useForm<formProps>({
        defaultValues: {
            id: data?.id,
            userId: userId,
            name: name,
            dept: dept,
            email: email,
            phoneNo: phoneNo,
            mobileNo: mobileNo,
            comment: comment
        }
    });
    const router = useRouter();

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


    const onSubmit = async (formData: any) => {
        let fixedType = mode;
        if (data === null && mode === 'edit') { fixedType = 'register' }
    
        let url = type === 'custContact' ? '/customer/' + memberNo + '/contacts' : '/customer/' + memberNo + '/sales';
        url = fixedType === 'edit' && type === 'custContact' ? '/customer/' + memberNo + '/contact' + '/' + formData.id : url;
        const response = fixedType === 'register' ? await apiBe.put(url, formData):await apiBe.post(url, formData);
        if (response.status === 200 || response.status === 201) {
            if (mode === 'register') Toast("success", '저장이 완료되었습니다.', () => type === 'custContact' ? setStep(3) : router.push('/customers/list/1'));
            if (mode === 'edit') Toast("success", '수정이 완료되었습니다.',()=>router.push('/customers/list/1'));
        } else {
            Toast("error", '저장이 실패하였습니다. 확인부탁드립니다.')
        }
    }

    const openModal = (type:string) => {
        setModal({isOpen: true, type: type, data:null});
    }

    const goList = () => {
        router.push('/customers/list/1')
    }
    const goEdit = () => {
        router.push(`/customers/edit/${memberNo}`);
    }
    useEffect(() => {
        if(modal.type === 'user' && modal.data !== null) {
            const { email, name} = modal?.data;
            setValue('userId', email);
            setValue('name', name);
        }
    },[modal.data])

    useEffect(() => {
        if (mode === "view") setIsDisabled(true);
        setFormData(data);
    }, [])

    useEffect(() => {
        if (type === "custContact" && data !== null) {
            setValue('id', data.id)
        }
        if(type === 'sales' && data !== null) {
            setValue('userId', userId)
        }
        setValue('name', name);
        setValue('dept', dept);
        setValue('email', email);
        setValue('phoneNo', phoneNo);
        setValue('mobileNo', mobileNo);
        setValue('comment', comment);
    },[type, data])
    return (
        <>
        <form className={`${styles.addMember} ${styles[type]}`} onSubmit={handleSubmit(onSubmit)}>
            <h2 className={styles.sectionTitle}>{onTitle(type)}</h2>
          
                <div className="flex flex-wrap justify-start">
                    {type === "sales" && <div className={`${styles.inputGroup} ${styles.userId}`}>
                        <label htmlFor="userId" className="block text-sm font-medium text-gray-900 dark:text-black">담당자 ID:</label>
                        <input readOnly={isDisabled} type="text" id="userId" {...register("userId", { required: true })} defaultValue={userId} />
                        <IconSearch className={styles.iconSearch} onClick={() => openModal('user')} />
                        {errors.userId && <span className={`${styles.errorMsg} text-red-500`}>필수 입력 항목 입니다</span>}
                    </div>}
                    <div className={styles.inputGroup}>
                        <label htmlFor="name" className="block text-sm font-medium text-gray-900 dark:text-black">담당자명:</label>
                        <input readOnly={isDisabled} type="text" id="name" {...register("name", { required: true })} defaultValue={name} />
                        {errors.name && <span className={`${styles.errorMsg} text-red-500`}>필수 입력 항목 입니다</span>}
                    </div>
                    <div className={styles.inputGroup}>
                        <label htmlFor="memberName" className="block text-sm font-medium text-gray-900 dark:text-black">부서</label>
                        <input readOnly={isDisabled} type="text" id='dept-sales' {...register("dept", { required: true })} defaultValue={dept} />
                        {errors.dept && <span className={`${styles.errorMsg} text-red-500`}>필수 입력 항목 입니다</span>}
                    </div>
                    <div className={`${styles.inputGroup}`}>
                        <label htmlFor="email" className="block text-sm font-medium text-gray-900 dark:text-black">이메일:</label>
                        <input readOnly={isDisabled} type="text" id="email" {...register("email", { required: true })} defaultValue={email} />
                        {errors.email && <span className={`${styles.errorMsg} text-red-500`}>필수 입력 항목 입니다</span>}
                    </div>
                    {type === "custContact" &&
                        <div className={`${styles.inputGroup}`}>
                            <label htmlFor="phoneNo" className="block text-sm font-medium text-gray-900 dark:text-black">연락처:</label>
                            <input readOnly={isDisabled} type="text" id="phoneNo" {...register("mobileNo", { required: true })} defaultValue={phoneNo} placeholder="010-1234-5678 양식으로 입력해주세요"/>
                            {errors.phoneNo && <span className={`${styles.errorMsg} text-red-500`}>필수 입력 항목 입니다</span>}
                        </div>}
                     {type === "sales" &&
                        <div className={`${styles.inputGroup}`}>
                            <label htmlFor="mobileNo" className="block text-sm font-medium text-gray-900 dark:text-black">연락처:</label>
                            <input readOnly={isDisabled} type="text" id="mobileNo" {...register("phoneNo", { required: true })} defaultValue={mobileNo} placeholder="010-1234-5678 양식으로 입력해주세요" />
                            {errors.mobileNo && <span className={`${styles.errorMsg} text-red-500`}>필수 입력 항목 입니다</span>}
                        </div>}
                    <div className={`${styles.inputGroup}`}>
                        <label htmlFor="comment" className="block text-sm font-medium text-gray-900 dark:text-black">코멘트:</label>
                        <input readOnly={isDisabled} type="text" id="comment" {...register("comment")} defaultValue={comment} />
                    </div>
                </div>
                <div className={styles.btnArea}>
                    {mode === 'edit' || mode === 'register' ?
                        <>
                            <Button type="button" className={styles.submitBtn} onClick={handleSubmit(onSubmit)} skin={"green"}>저장</Button>
                            <Button type="button" skin={"gray"} onClick={goList}>돌아가기</Button>
                        </> : null}
            </div>
        </form>
        </>
    )
}
export default CustomersAddPerForm;