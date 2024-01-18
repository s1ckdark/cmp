'use client';
import { useState } from 'react';
import Breadcrumb from '@/components/Breadcrumb';
import React, {useEffect} from 'react';
import { apiBe } from '@/services';
import Button from '@/components/Button';
import Styles from './RoleView.module.scss';
import { useRouter } from 'next/navigation';
import { Toast } from '@/components/Toast';
import RegistrationForm from '@/components/Form/RegistrationForm';
import { usePathname } from 'next/navigation';
import { useRecoilState } from 'recoil';
import { dataViewAtom } from '@/states/data';

interface RoleiewCtProps {
    memberNo: string;
    targetMonth: string;
}

const Roleiew = () => {
    const router = useRouter();
    const path = usePathname();
    const [view, setView] = useRecoilState(dataViewAtom) || null;
    const memberId = path.split('/')[4];
    // useEffect(() => {
    //     const fetching = async() => {
    //         const url = `/user?email=${memberId}`;
    //         const response = await apiBe.get(url);
    //         console.log(response);
    //         if(response.status === 200) setData(response.data.content[0]);
    //     }
    //     fetching();
    // }, [memberId]);
 
    return (
        <>
            <Breadcrumb />
            <div className={Styles.container}>
                <div id="User">
                </div>
            </div>

        </>
    )
}

export default Roleiew;