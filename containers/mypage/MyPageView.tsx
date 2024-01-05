'use client';
import RegistrationForm from "@/components/Form/RegistrationForm";
import Breadcrumb from "@/components/Breadcrumb";
import React, { useEffect, useState } from 'react';
import { apiBe } from "@/services";

const MyPageView = async () => {
    const [data, setData] = useState({});
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