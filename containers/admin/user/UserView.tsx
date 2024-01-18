'use client';
import { useState } from 'react';
import Breadcrumb from '@/components/Breadcrumb';
import React, {useEffect} from 'react';
import { apiBe } from '@/services';
import Button from '@/components/Button';
import Styles from './UserView.module.scss';
import { useRouter } from 'next/navigation';
import { Toast } from '@/components/Toast';
import RegistrationForm from '@/components/Form/RegistrationForm';
import { usePathname, useParams } from 'next/navigation';
import { useRecoilValue } from 'recoil';
import { userInfoAtom } from '@/states/data';

interface UserViewCtProps {
    memberNo: string;
    targetMonth: string;
}

const UserView = () => {
    const router = useRouter();
    const path = usePathname();
    const memberId = path.split('/')[4];
    const userInfo = useRecoilValue(userInfoAtom);
    const params = useParams<any>;
 
    return (
        <>
            <Breadcrumb />
            <div className={Styles.container}>
                <div id="User">
                    <RegistrationForm data={userInfo} type={'view'} />
                </div>
            </div>

        </>
    )
}

export default UserView;