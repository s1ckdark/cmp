'use client';
import React from 'react';
import { useForm, Controller } from 'react-hook-form';
import { apiBe } from '@/services';
import styles from './RoleForm.module.scss';
import Button from '@/components/Button';
import { Toast } from '@/components/Toast';
import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Select from 'react-select';
import { Privileges } from '@/types/auth';

interface IRoleForm {
    name: string;
    description: string;
}
interface IRoleFormProps {
    data?: IRoleForm;
    type: "write" | "edit" | "view";
}

const RoleForm = ({ data, type }: IRoleFormProps) => {
    const { name, description } = data ? data : { name:'', description:'' };
    const { control, handleSubmit, getValues, setValue, setError, formState: {errors} } = useForm({
        defaultValues: {
            name: name,
            description: description
        }
    });
    const router = useRouter();

    const onSubmit = async(data: any) => {
        let url = '', method = '';
        if (type === 'write') { url = '/role'; method = 'put'; }
        else if (type === 'edit') { url = `/user/${data.id}`; method = 'post'; }
        
        // if (!passwordCheck()) return false;
        const response = await apiBe(url, { method, data: data });
        if (response.status === 200) {
            Toast('success', '성공적으로 저장되었습니다.', () => router.back());
        } else {
            Toast('error', '다시 시도해주세요.');
        }
    };

    useEffect(() => {
        console.log(type);
        if(type === 'view') {
            const input = document.querySelectorAll('input');
            input.forEach((item:any) => {
                item.setAttribute('readOnly', true);
            })
        } 
    },[type])
    return (
        <>
            <form className={`${styles.template}`} onSubmit={handleSubmit(onSubmit)}>
                    <div className={`${styles.inputGroup}`}>
                    <label htmlFor="name" className="block text-sm font-medium text-gray-900 dark:text-black">롤 이름<span className={styles.required}></span></label>
                    <Controller
                        rules={{ required: true }}
                            name="name"
                            control={control}
                            render={({ field }) => <input type="text" id="name" {...field} defaultValue={name} />}
                        />
                        {errors.name && <span className="text-red-500">필수 입력 항목입니다</span>}
                    </div>
                    <div className={`${styles.inputGroup}`}>
                        <label htmlFor="description" className="block text-sm font-medium text-gray-900 dark:text-black">롤 설명<span className={styles.required}></span></label>
                    <Controller
                            rules={{ required: true }}
                            name="description"
                            control={control}
                            render={({ field }) => <input type="text" id="description" {...field} defaultValue={description} />}
                        />
                        {errors.description && <span className="text-red-500">필수 입력 항목입니다</span>}
                    </div>
                <div className={`${styles.btnArea} mt-6 mx-auto`}>
                <Button type='submit'
                    className='px-3.5 py-2.5 text-sm font-bold text-white shadow-sm hover:bg-gray-100 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white'
                        skin='green'>{type === "view" ? "수 정" : "저 장"}
                    </Button>
                </div>
            </form >
            </>
    );
}

export default RoleForm;
