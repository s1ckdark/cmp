'use client';
import React, { useState, useRef } from 'react';
// import { Tables } from '@/components/Tables';
import { isEmptyObject } from '@/utils/data';
import { toast } from 'react-toastify';
import { useRouter } from 'next/navigation';

const ListPage = () => {
    const router = useRouter();
    const data = {};
    const row: any[] = isEmptyObject(data) ? [] : [data];
    return (
        <div className="container">
            {/* <Tables type="support" data={row} className={"w-full text-sm text-left text-gray-500 dark:text-gray-400"} /> */}
        </div>
    );
}
export default ListPage;