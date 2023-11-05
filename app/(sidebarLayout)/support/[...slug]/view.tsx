'use client';
import React, { useState, useRef } from 'react';
import dynamic from 'next/dynamic';
import { Tables } from '@/components/Tables';
import { isEmptyObject } from '@/utils/data';
import { TablesProps } from '@/types/data';
import Button from '@/components/Button';
import { toast } from 'react-toastify';
import { useRouter } from 'next/navigation';

const ViewPage = () => {
    const router = useRouter();
    const ref = useRef<any>(null);
    const ToastViewer = dynamic(() => import('@/components/Board/ToastViewer'), {
        ssr: false
    });

    const data = {};
    const row: any[] = isEmptyObject(data) ? [] : [data];
    return (
        <div className="container">
            <ToastViewer
                content={content || ''}
            />
        </div >
    );
}
export default ViewPage;