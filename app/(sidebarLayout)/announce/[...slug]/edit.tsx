import React, { useState, useRef } from 'react';
import dynamic from 'next/dynamic';
import { isEmptyObject } from '@/utils/data';
import { TablesProps } from '@/types/data';
import { useForm } from "react-hook-form";
import Button from '@/components/Button';
import { toast } from 'react-toastify';
import { useRouter } from 'next/navigation';

interface announce {
    title: string;
    contents: string;
}

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
                <div className="inputGroup">
                    <input type="text" {...register('title')} />
                </div>
                <div className="inputGroup">
                    <label htmlFor="유형">유형</label>
                    <ul className="items-center w-full text-sm font-medium text-gray-900 bg-white border border-gray-200 rounded-lg sm:flex dark:bg-gray-700 dark:border-gray-600 dark:text-white">
                        <li className="w-full border-b border-gray-200 sm:border-b-0 sm:border-r dark:border-gray-600">
                            <div className="flex items-center pl-3">
                                <input id="horizontal-list-radio-license" type="radio" value="" name="list-radio" className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-700 dark:focus:ring-offset-gray-700 focus:ring-2 dark:bg-gray-600 dark:border-gray-500" />
                                <label htmlFor="horizontal-list-radio-license" className="w-full py-3 ml-2 text-sm font-medium text-gray-900 dark:text-gray-300">전체</label>
                            </div>
                        </li>
                        <li className="w-full border-b border-gray-200 sm:border-b-0 sm:border-r dark:border-gray-600">
                            <div className="flex items-center pl-3">
                                <input id="horizontal-list-radio-id" type="radio" value="" name="list-radio" className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-700 dark:focus:ring-offset-gray-700 focus:ring-2 dark:bg-gray-600 dark:border-gray-500" />
                                <label htmlFor="horizontal-list-radio-id" className="w-full py-3 ml-2 text-sm font-medium text-gray-900 dark:text-gray-300">시스템</label>
                            </div>
                        </li>
                        <li className="w-full border-b border-gray-200 sm:border-b-0 sm:border-r dark:border-gray-600">
                            <div className="flex items-center pl-3">
                                <input id="horizontal-list-radio-millitary" type="radio" value="" name="list-radio" className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-700 dark:focus:ring-offset-gray-700 focus:ring-2 dark:bg-gray-600 dark:border-gray-500" />
                                <label htmlFor="horizontal-list-radio-millitary" className="w-full py-3 ml-2 text-sm font-medium text-gray-900 dark:text-gray-300">영업</label>
                            </div>
                        </li>
                        <li className="w-full dark:border-gray-600">
                            <div className="flex items-center pl-3">
                                <input id="horizontal-list-radio-passport" type="radio" value="" name="list-radio" className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-700 dark:focus:ring-offset-gray-700 focus:ring-2 dark:bg-gray-600 dark:border-gray-500" />
                                <label htmlFor="horizontal-list-radio-passport" className="w-full py-3 ml-2 text-sm font-medium text-gray-900 dark:text-gray-300">기술</label>
                            </div>
                        </li>
                    </ul>
                </div>
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