'use client';
import React from 'react';
import dynamic from 'next/dynamic';
// import styles from './write.module.scss';

export default function EditPage() {

    const ToastEditor = dynamic(() => import('@/components/Board/ToastEditor'), {
        ssr: false
    });
    const onchange = (value: any) => {
        console.log(value);
    }

    return (
        <div className='container'>
            <div className="inputGroup mb-6">
                <label htmlFor="제목">제목</label>
                <input type="text" className="w-full mt-3" placeholder="제목을 입력해주세요." />
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

            <ToastEditor
                initialValue=""
                onChange={(value: string) => onchange(value)}
            />
            <div className="input-group mb-5">
                <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white" htmlFor="default_size">Default size</label>
                <input className="block w-full mb-5 text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 dark:text-gray-400 focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400" id="default_size" type="file" />
            </div>
        </div>
    );
}
