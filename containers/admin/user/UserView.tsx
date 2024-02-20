'use client';
import Breadcrumb from '@/components/Breadcrumb';
import React, {useState, useEffect} from 'react';
import { apiBe } from '@/services';
import Styles from './UserView.module.scss';
import { useRouter } from 'next/navigation';
import RegistrationForm from '@/components/Form/RegistrationForm';
import { usePathname } from 'next/navigation';
import lodash from 'lodash';
interface UserViewCtProps {
    memberNo: string;
    targetMonth: string;
}

const UserView = () => {
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
            <div className={Styles.container}>
                <div id="User">
                    <RegistrationForm data={userInfo} type={'view'} />
                </div>
            </div>

        </>
    )
}

export default UserView;