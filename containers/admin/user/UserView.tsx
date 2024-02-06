'use client';
import Breadcrumb from '@/components/Breadcrumb';
import React, {useState, useEffect} from 'react';
import { apiBe } from '@/services';
import Button from '@/components/Button';
import Styles from './UserView.module.scss';
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

const UserView = () => {
    const router = useRouter();
    const path = usePathname();
    const memberId = lodash.last(path.split('/'));
    const [userInfo, setUserInfo] = useState<any>(null);
    useEffect(() => {
        const getUserInfo = async () => {
            const url = `/user?email=${memberId}`;
            const response = await apiBe(url);
            if (response.status === 200) {
                const { content } = response.data;
                setUserInfo(content[0]);
            } else {
                console.log('error');
            }
        }
        getUserInfo();
    }, [memberId])
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