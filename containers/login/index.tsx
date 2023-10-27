'use client';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { LogoSml } from '@/public/svgs';
import styles from "./index.module.scss";
import Link from 'next/link';
import useAuth from '@/hooks/useAuth';
import { loginData } from '@/types/form';

const result = {
    "timestamp": "2023-10-25T04:37:15.791621550Z",
    "status": 200,
    "error": null,
    "message": "Successfully Logged In",
    "data": {
        "userId": "65371924569d6f6fb96a1e63",
        "accessToken": "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzUxMiJ9.eyJzdWIiOiI2NTM3MTkyNDU2OWQ2ZjZmYjk2YTFlNjMiLCJpc3MiOiJNeUFwcCIsImV4cCI6MTY5ODIxMjIzNSwiaWF0IjoxNjk4MjA4NjM1fQ.3a5ipuOO3uAcNO72rZqFh0CvRkG9d_ObmdOZJ_vZ3_KuE78gf0E_2blW1Mjd0ysN2_7EEBNVXc12FW6Lcyd8SQ",
        "refreshToken": "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzUxMiJ9.eyJzdWIiOiI2NTM3MTkyNDU2OWQ2ZjZmYjk2YTFlNjMiLCJ0b2tlbklkIjpudWxsLCJpc3MiOiJNeUFwcCIsImV4cCI6MTcwMDgwMDYzNSwiaWF0IjoxNjk4MjA4NjM1fQ.QK_dlfgj4zPONheL6tsxRZDcXEXFY0VZ8jIAp0DPdqoAl-5l_xxvW3WLkCbFoC3zPgZxkeMpiywHB3IXZeAiJA"
    }
}

const Login = () => {
    const { register, handleSubmit, formState: { errors } } = useForm();
    const { login, isLoggingIn } = useAuth();
    const [state, setState] = useState({
        username: "",
        password: "",
    });

    const onSubmit = async (data: loginData) => {
        setState(data);
        try {
            await login(data);
            console.log('Login successful!');
        } catch (error) {
            console.error('Login failed:', error);
        }
    };
    console.log("렌더링");

    return (
        <main className="flex items-center justify-center w-screen h-screen">
            <div className={`${styles.bgIntro} flex w-1/2 h-screen items-center justify-center`}></div>
            <div className="bg-white flex w-1/2 h-screen items-center justify-center flex-col">
                <div className="mb-10">
                    <LogoSml />
                </div>
                <form className="loginform" onSubmit={handleSubmit(onSubmit)}>
                    <div className={`flex mb-3 ${styles.inputField}`}>
                        <span className="inline-flex items-center justify-center px-3 text-sm text-gray-900 bg-white border border-r-0 border-gray-300 rounded-l-md dark:bg-gray-600 dark:text-gray-400 dark:border-gray-600">
                            ID
                        </span>
                        <input {...register("username", { required: true })} className={`${styles.input_id} rounded-none rounded-r-lg bg-white border text-gray-900 focus:ring-blue-500 focus:border-blue-500 block flex-1 min-w-0 w-full text-sm border-gray-300 p-2.5  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500`} placeholder="id를 입력해주세요" />
                        {errors.username && <span>This field is required</span>}
                    </div>
                    <div className={`flex mb-3 ${styles.inputField}`}>
                        <span className="inline-flex items-center px-3  justify-center text-sm text-gray-900 bg-white border border-r-0 border-gray-300 rounded-l-md dark:bg-gray-600 dark:text-gray-400 dark:border-gray-600">
                            PW
                        </span>
                        <input type="password" {...register("password", { required: true })} className={`${styles.input_password} rounded-none rounded-r-lg bg-white border text-gray-900 focus:ring-blue-500 focus:border-blue-500 block flex-1 min-w-0 w-full text-sm border-gray-300 p-2.5  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500`} placeholder="비밀번호" />
                        {errors.password && <span>This field is required</span>}
                    </div>
                    <div className="mb-10">
                        <button type="submit" disabled={isLoggingIn} className={`${styles.btnLogin} px-3.5 py-2.5 text-sm font-bold text-white shadow-sm hover:bg-gray-100 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white`}> {isLoggingIn ? 'Logging in...' : 'Login'}</button>
                    </div>
                </form>
            </div>
        </main>
    )
}

export default Login;