'use client';
import Breadcrumb from '@/components/Breadcrumb';
import React, {useState, useEffect} from 'react';
import { apiBe } from '@/services';
import Button from '@/components/Button';
import Styles from './UserEdit.module.scss';
import { useRouter } from 'next/navigation';
import { Toast } from '@/components/Toast';
import RegistrationForm from '@/components/Form/RegistrationForm';
import { usePathname, useParams } from 'next/navigation';
import { useRecoilValue } from 'recoil';
import { userInfoAtom } from '@/states/data';
import lodash from 'lodash';
interface UserViewCtProps {
    memberNo: string;
    targetMonth: string;
}

const UserEdit = () => {
    const router = useRouter();
    const path = usePathname();
    const id = lodash.last(path.split('/'));
    const [userInfo, setUserInfo] = useState<any>(null);
    
    useEffect(() => {
        const getUserInfo = async () => {
            const url = `/user/${id}`
            const response = await apiBe(url);
            if (response.status === 200) {
                const { data } = response;
                setUserInfo(data);
            } else {
                console.log('error');
            }
        }
        getUserInfo();
    }, [id])
    return (
        <>
            <Breadcrumb />
            <RegistrationForm data={userInfo} type={"edit"} />
        </>
    );
}
export default UserEdit;