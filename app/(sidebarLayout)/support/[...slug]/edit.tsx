'use client';
import React, { useState, useRef } from 'react';
import dynamic from 'next/dynamic';
import { Tables } from '@/components/Tables';
import { isEmptyObject } from '@/utils/data';
import { TablesProps } from '@/types/data';
import { useForm } from "react-hook-form";
import Button from '@/components/Button';
import { toast } from 'react-toastify';
import { useRouter } from 'next/navigation';

// const ToastEditor = dynamic(() => import('@/components/Board/ToastEditor'), {
//     ssr: false
// });

const EditPage = () => {
    const { register, handleSubmit, setValue, formState: { errors } } = useForm();
    const router = useRouter();
    const ref = useRef<any>(null);

    const onSubmit = async (data: object) => {
        try {
            const editorIns = ref?.current?.getInstance();
            const contentMark = editorIns.getMarkdown();

            if (contentMark?.length === 0) {
                throw new Error('내용을 입력해주세요.');
            }
            toast.success('포스트를 작성했습니다.', {
                autoClose: 2000,
            }); 

            router.replace('/support');
        } catch (error) {
            console.log(error);
            toast.error(`${error}` || '다시 시도해주세요.', {
                autoClose: 2000,
            });
        }
    }

    const data = {};
    const row: any[] = isEmptyObject(data) ? [] : [data];
    return (
        <div className="container">
            <form onSubmit={handleSubmit(onSubmit)}>
                <input type="text" {...register('title')} />
                {/* <ToastEditor
                    content=''
                    editorRef={ref}
                /> */}
                <Button type="submit" skin="green">Submit</Button>
            </form>
        </div>
    );
}
export default EditPage;