'use client';
import { useEffect } from 'react';
import { ArgosLogoSml } from '@/public/svgs';
import styles from "./index.module.scss";
import Auth from '@/components/Auth';
import { getCookie } from '@/utils/cookie';
import { redirect } from 'next/navigation';

const Login = () => {
    useEffect(() => {
        const IsLogin = getCookie('accessToken');
        // if (IsLogin) {
        //     redirect('/landing');
        // }
    }, []);
    return (
        <main className="flex items-center justify-center w-screen h-screen">
            <div className={`${styles.bgIntro} flex w-1/2 h-screen items-center justify-center`}></div>
            <div className={`${styles.loginForm} flex w-1/2 h-screen items-center justify-center flex-col}`}>
                <div className="mb-10">
                    <ArgosLogoSml />
                </div>
                <div className={styles.loginForm}>
                    <Auth />
                </div>
            </div>
        </main>
    );
};

export default Login;


