'use client';
import React from 'react';
import { useForm, Controller } from 'react-hook-form';
import styles from './RegistrationForm.module.scss';
import Button from '@/components/Button';
function RegistrationForm() {
    const { control, handleSubmit } = useForm({
        defaultValues: {
            memberId: '',
            memberName: '',
            memberType: '',
            permission: '',
            password: '',
            contact: '',
            landline: '',
            email: '',
            address: '',
            company: ''
        }
    });

    const onSubmit = (data) => {
        console.log(data);
    };

    return (
        <form className={`${styles.template}`} onSubmit={handleSubmit(onSubmit)}>
            <div className={`${styles.inputGroup}`}>
                <label htmlFor="memberId" className="block mb-2 text-sm font-medium text-gray-900 dark:text-black">회원ID:</label>
                <Controller
                    name="memberId"
                    control={control}
                    render={({ field }) => <input type="text" id="memberId" {...field} required />}
                />
            </div>
            <div className={`${styles.inputGroup}`}>
                <label htmlFor="memberName" className="block mb-2 text-sm font-medium text-gray-900 dark:text-black">회원명:</label>
                <Controller
                    name="memberName"
                    control={control}
                    render={({ field }) => <input type="text" id="memberName" {...field} required />}
                />
            </div>
            <div className="grid gap-6 mb-6 md:grid-cols-2">
                <div className={`${styles.inputGroup}`}>
                    <label htmlFor="memberType" className="block mb-2 text-sm font-medium text-gray-900 dark:text-black">회원유형:</label>
                    <Controller
                        name="memberType"
                        control={control}
                        render={({ field }) => <input type="text" id="memberType" {...field} required />}
                    />
                </div>
                <div className={`${styles.inputGroup}`}>
                    <label htmlFor="permission" className="block mb-2 text-sm font-medium text-gray-900 dark:text-black">권한:</label>
                    <Controller
                        name="permission"
                        control={control}
                        render={({ field }) => <input type="text" id="permission" {...field} required />}
                    />
                </div>
            </div>
            <div className={`${styles.inputGroup}`}>
                <label htmlFor="password" className="block mb-2 text-sm font-medium text-gray-900 dark:text-black">비밀번호:</label>
                <Controller
                    name="password"
                    control={control}
                    render={({ field }) => <input type="password" id="password" {...field} required />}
                />
                <Button type='button'
                    className='mx-auto px-3.5 py-2.5 text-sm font-bold text-white shadow-sm hover:bg-gray-100 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white'
                    skin='gray'>수정
                </Button>
            </div>
            <div className={`${styles.inputGroup}`}>
                <label htmlFor="contact" className="block mb-2 text-sm font-medium text-gray-900 dark:text-black">연락처:</label>
                <Controller
                    name="contact"
                    control={control}
                    render={({ field }) => <input type="text" id="contact" {...field} required />}
                />
            </div>
            <div className={`${styles.inputGroup}`}>
                <label htmlFor="landline" className="block mb-2 text-sm font-medium text-gray-900 dark:text-black">유선전화:</label>
                <Controller
                    name="landline"
                    control={control}
                    render={({ field }) => <input type="text" id="landline" {...field} />}
                />
            </div>
            <div className={`${styles.inputGroup}`}>
                <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-900 dark:text-black">이메일:</label>
                <Controller
                    name="email"
                    control={control}
                    render={({ field }) => <input type="email" id="email" {...field} required />}
                />
            </div>

            <div className={`${styles.inputGroup}`}>
                <label htmlFor="address" className="block mb-2 text-sm font-medium text-gray-900 dark:text-black">주소:</label>
                <div className="grid gap-6 mb-6 md:grid-cols-2">
                    <Controller
                        name="address"
                        control={control}
                        render={({ field }) => <input type="text" id="address" {...field} required />}
                    />
                    <Controller
                        name="address"
                        control={control}
                        render={({ field }) => <input type="text" id="address" {...field} required />}
                    />
                </div>
            </div>
            <div className={`${styles.inputGroup}`}>
                <label htmlFor="company" className="block mb-2 text-sm font-medium text-gray-900 dark:text-black">회사:</label>
                <Controller
                    name="company"
                    control={control}
                    render={({ field }) => <input type="text" id="company" {...field} />}
                />
            </div>
            <div className={`${styles.btnArea} mt-6`}>
                <Button type='submit'
                    className='mx-auto px-3.5 py-2.5 text-sm font-bold text-white shadow-sm hover:bg-gray-100 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white'
                    skin='green'>수정
                </Button>
            </div>

        </form >
    );
}

export default RegistrationForm;
