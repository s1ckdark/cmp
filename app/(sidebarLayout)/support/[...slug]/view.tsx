'use client';
import React, { useState, useRef } from 'react';
import dynamic from 'next/dynamic';
import { Tables } from '@/components/Tables';
import { isEmptyObject } from '@/utils/data';
import { TablesProps } from '@/types/data';
import Button from '@/components/Button';
import { toast } from 'react-toastify';
import { useRouter } from 'next/navigation';
// import { Editor } from '@/components/Board';

// const ToastViewer = dynamic(() => import('@/components/Board/ToastViewer'), {
//     ssr: false
// });

const ViewPage = () => {
    const router = useRouter();
    const ref = useRef<any>(null);
    

    const data = {};
    const row: any[] = isEmptyObject(data) ? [] : [data];
    return (
        <div className="container">
               <h1>작업 중입니다.</h1>
            {/* <ToastViewer
                // content={content || ''}
                content={''}
                editorRef={ref}
            /> */}
        </div >
    );
}
export default ViewPage;