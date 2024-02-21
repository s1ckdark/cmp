'use client';
import { useEffect } from 'react';
import { ArgosLogoSml } from '@/public/svgs';
import styles from "./index.module.scss";
import Auth from '@/components/Auth';
import { useRouter, redirect } from 'next/navigation';
import { signOut, useSession } from 'next-auth/react';
import Button from '@/components/Button';
import { parseCookies } from 'nookies';

const Login = () => {
    const { data: session } = useSession(); 
    const cookies = parseCookies();
    const router = useRouter();
    
    // useEffect(() => {
    //     if(cookies.accessToken) router.push('/landing');
    // }, [cookies.accessToken]);
    return (    
        <main className="flex items-center justify-center w-screen h-screen">
            <div className={`${styles.bgIntro} flex w-1/2 h-screen items-center justify-center`}></div>
            <div className={`${styles.loginForm} flex w-1/2 h-screen items-center justify-center flex-col}`}>
                <div className="mb-10">
                    <ArgosLogoSml />
                </div>
                <div className={styles.loginForm}>
                    {!cookies.accessToken ? <Auth /> : <><Button type='button' className="mb-3" onClick={()=>router.push('/landing')} skin={'gray'}>첫화면으로 이동</Button><Button onClick={() => signOut()} type='button' skin={'green'}>로그 아웃</Button></>}
                </div>
            </div>
        </main>
    );
}

export default Login;


