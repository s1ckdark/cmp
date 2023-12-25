'use client';
import { ArgosLogoSml } from '@/public/svgs';
import styles from "./index.module.scss";
import Auth from '@/components/Auth';

const Login = () => {
    return (
        <main className="flex items-center justify-center w-screen h-screen">
            <div className={`${styles.bgIntro} flex w-1/2 h-screen items-center justify-center`}></div>
            <div className="bg-white flex w-1/2 h-screen items-center justify-center flex-col">
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


