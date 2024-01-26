'use client';
import RegistrationForm from "@/components/Form/RegistrationForm";
import Breadcrumb from "@/components/Breadcrumb";
import React, { useEffect, useState } from 'react';
import { apiBe } from "@/services";
import { IRegistrationForm } from '@/types/form';

const MyPageView = () => {
    const [data, setData] = useState<IRegistrationForm>();
    useEffect(() => {
        const fetchData = async () => {
            const response = await apiBe('/users/profile');
            const result = response.data;
            setData(result);
        }
        fetchData();
    },[])
    return (
        <>
            <Breadcrumb />
            <RegistrationForm data={data} type={'view'} />
        </>
    )
}
export default MyPageView;