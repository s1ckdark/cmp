'use client';
import React, { useState, useRef, useEffect } from 'react';
import { Tables } from '@/components/Tables';
import { isEmptyObject } from '@/utils/data';
import Button from '@/components/Button';
import { toast } from 'react-toastify';
import { useRouter } from 'next/navigation';

// const ToastViewer = dynamic(() => import('@/components/Boar'), {
//     ssr: false
// });

const ViewPage = () => {
    const router = useRouter();
    const ref = useRef<any>(null);
    const [content, setContent] = useState<string>('');

    useEffect (() => {
        setContent('');
        const data = {};
    },[]);

    return (
        <div className="container">
            {/* <ToastViewer
                content={content || ''}
            /> */}
        </div >
    );
}
export default ViewPage;