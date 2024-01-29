import React, { useEffect, useState } from 'react';
import { useForm } from "react-hook-form";
import styles from './CustomersAddPerForm.module.scss';
import Button from '../Button';
import { IconSearch } from '@/public/svgs';
import { useRecoilState } from 'recoil';
import { modalAtom } from '@/states';
import { apiBe } from '@/services';
import { Toast } from '@/components/Toast';
interface formProps {
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
    data?: formProps;
    mode?: "register" | "edit" | "view";
}


const CustomersAddPerForm = ({ type, memberNo, data, mode}: CustomersAddPerFormProps) => {
    const [isDisabled, setIsDisabled] = useState(false);
    const [ modal, setModal ] = useRecoilState(modalAtom);
    const { userId, name, dept, email, phoneNo, mobileNo, comment } = data ? data : { userId: '', name: '', dept: '', email: '', phoneNo: '', mobileNo:'', comment: '' };
    const { register, handleSubmit, control, formState: { errors } } = useForm<formProps>({
        defaultValues: {
            userId: modal?.data?.email ? modal?.data?.email : '',
            name: name,
            dept: dept,
            email: email,
            phoneNo: phoneNo,
            mobileNo: mobileNo,
            comment: comment
        }
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

    const onSubmit = async(data: any) => {
        const url = type === 'custContact' ? '/customer/' + memberNo + '/contact' : '/customer/' + memberNo + '/sales';
        const response = await apiBe.put(url, data);
        if(response.status === 200 || response.status === 201) {
            Toast("success", '저장이 완료되었습니다.');
        } else {
            Toast("error", '저장이 실패하였습니다. 확인부탁드립니다.')
        }
    }

    const openModal = (type:string) => {
        setModal({isOpen: true, type: type, data:null});
    }

    useEffect(() => {
        if(mode === "view") setIsDisabled(true);
    }, [])

    return (
        <>
        <form className={`${styles.addMember} ${styles[type]}`} onSubmit={handleSubmit(onSubmit)}>
            <h2 className={styles.sectionTitle}>{onTitle(type)}</h2>
          
                <div className="flex flex-wrap justify-start">
                    {type === "sales" && <div className={`${styles.inputGroup} ${styles.userId}`}>
                        <label htmlFor="userId" className="block text-sm font-medium text-gray-900 dark:text-black">담당자 ID:</label>
                        <input readOnly={isDisabled} type="text" id="userId" {...register("userId")} defaultValue={userId} />
                        <IconSearch className={styles.iconSearch} onClick={() => openModal('user')} />
                        {errors.userId && <span className="text-red-500">This field is required</span>}
                    </div>}
                    <div className={styles.inputGroup}>
                        <label htmlFor="name" className="block text-sm font-medium text-gray-900 dark:text-black">담당자명:</label>
                        <input readOnly={isDisabled} type="text" id="name" {...register("name")} defaultValue={name} />
                        {errors.name && <span className="text-red-500">This field is required</span>}
                    </div>
                    <div className={styles.inputGroup}>
                        <label htmlFor="memberName" className="block text-sm font-medium text-gray-900 dark:text-black">부서</label>
                        <input readOnly={isDisabled} type="text" id='dept-sales' {...register("dept")} defaultValue={dept} />
                        {errors.dept && <span className="text-red-500">This field is required</span>}
                    </div>
                    <div className={`${styles.inputGroup}`}>
                        <label htmlFor="email" className="block text-sm font-medium text-gray-900 dark:text-black">이메일:</label>
                        <input readOnly={isDisabled} type="text" id="email" {...register("email")} defaultValue={email} />
                        {errors.email && <span className="text-red-500">This field is required</span>}
                    </div>
                    {type === "custContact" &&
                        <div className={`${styles.inputGroup}`}>
                            <label htmlFor="phoneNo" className="block text-sm font-medium text-gray-900 dark:text-black">연락처:</label>
                            <input readOnly={isDisabled} type="text" id="phoneNo" {...register("phoneNo")} defaultValue={phoneNo} />
                            {errors.phoneNo && <span className="text-red-500">This field is required</span>}
                        </div>}
                     {type === "sales" &&
                        <div className={`${styles.inputGroup}`}>
                            <label htmlFor="mobileNo" className="block text-sm font-medium text-gray-900 dark:text-black">연락처:</label>
                            <input readOnly={isDisabled} type="text" id="mobileNo" {...register("mobileNo")} defaultValue={mobileNo} />
                            {errors.mobileNo && <span className="text-red-500">This field is required</span>}
                        </div>}
                    <div className={`${styles.inputGroup}`}>
                        <label htmlFor="comment" className="block text-sm font-medium text-gray-900 dark:text-black">코멘트:</label>
                        <input readOnly={isDisabled} type="text" id="comment" {...register("comment")} defaultValue={comment} />
                        {errors.comment && <span className="text-red-500">This field is required</span>}
                    </div>
                </div>
            <div className={styles.btnArea}>
                <Button type="button" className={styles.submitBtn} onClick={handleSubmit(onSubmit)} skin={"green"}>저장</Button>
                <Button type="button" skin={"gray"}>취소</Button>
            </div>
        </form>
        </>
    )
}
export default CustomersAddPerForm;