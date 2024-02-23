'use client';
import React, { useState, useRef } from 'react';
import { Tables } from '@/components/Tables';
import { TablesProps } from '@/types/data';
import Button from '@/components/Button';
import { useRouter } from 'next/navigation';

const ViewPage = () => {
    const router = useRouter();
    const ref = useRef<any>(null);

    return (
        <div className="container">
               <h1>작업 중입니다.</h1>
        </div >
    );
}
export default ViewPage;