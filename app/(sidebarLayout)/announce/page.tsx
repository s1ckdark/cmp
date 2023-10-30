'use client';
import React from 'react';
import dynamic from 'next/dynamic';
import { authState } from '@/states/auth';
import { useRecoilValue } from 'recoil';

export default function EditPage() {
    const user = useRecoilValue(authState);
    console.log(user);
    const ToastEditor = dynamic(() => import('@/components/Board/ToastEditor'), {
        ssr: false
    });
    const onchange = (value: any) => {
        console.log(value);
    }

    return (
        <div className="container">
            <h3>### Editor Toast</h3>
            <input type="text" placeholder="제목을 입력해주세요." />
            <ToastEditor
                initialValue=""
                onChange={(value: string) => onchange(value)}
            />
        </div>
    );
}
