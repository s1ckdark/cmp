'use client';
import React, { useState, FormEventHandler } from 'react';
import { useForm } from 'react-hook-form';
import { LogoSml } from '@/public/svgs';
import styles from "./index.module.scss";
import { yupResolver } from '@hookform/resolvers/yup';
import Link from 'next/link';
import { loginForm } from '@/types/form';
import axios from 'axios';
import Button from '@/components/Button';
import { LogInSchema, logInValidator } from '@/utils/validator';
import { showPasswordAtom } from '@/states/auth';
import { atom, selector, useRecoilState, useRecoilValue } from 'recoil';
import authService from '@/services/authService';
import { logInErrorAtom, logInLoadingAtom } from '@/states/auth';

const Login = () => {
    const { login, resetLogInError } = authService();
    const logInError = useRecoilValue(logInErrorAtom);
    const isLoggingIn = useRecoilValue(logInLoadingAtom);
    const [state, setState] = useState({
        username: "",
        password: "",
    });
    const methods = useForm<LogInSchema>({ mode: 'onBlur', resolver: yupResolver(logInValidator) });
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = methods;
    const [showPassword, setShowPassword] = useRecoilState(showPasswordAtom);
    const errorMessage = Object.values(errors).length > 0 ? Object.values(errors)[0].message : undefined;

    const submitLogIn = handleSubmit((formValues: LogInSchema) => {
        login(formValues.username, formValues.password);
    });

    const onSignIn: FormEventHandler<HTMLFormElement> = (e) => {
        e.preventDefault();
        submitLogIn();
    };


    const onSubmit = async (data) => {
        resetLogInError();
        login({ username: data.username, password: data.password });
    };

    return (
        <main className="flex items-center justify-center w-screen h-screen">
            <div className={`${styles.bgIntro} flex w-1/2 h-screen items-center justify-center`}></div>
            <div className="bg-white flex w-1/2 h-screen items-center justify-center flex-col">
                <div className="mb-10">
                    <LogoSml />
                </div>
                <form onSubmit={onSignIn}>
                    <div className={`flex mb-3 ${styles.inputField}`}>
                        <span className="inline-flex items-center justify-center px-3 text-sm text-gray-900 bg-white border border-r-0 border-gray-300 rounded-l-md dark:bg-gray-600 dark:text-gray-400 dark:border-gray-600">
                            ID
                        </span>
                        <input {...register("username", { required: true })}
                            type='string'
                            placeholder='이메일'
                            // disabled={disabled}
                            className={`${styles.input_id} rounded-none rounded-r-lg bg-white border text-gray-900 focus:ring-blue-500 focus:border-blue-500 block flex-1 min-w-0 w-full text-sm border-gray-300 p-2.5  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500`} />
                        {errors.username && <span>This field is required</span>}
                    </div>
                    <div className={`flex mb-3 ${styles.inputField}`}>
                        <span className="inline-flex items-center px-3  justify-center text-sm text-gray-900 bg-white border border-r-0 border-gray-300 rounded-l-md dark:bg-gray-600 dark:text-gray-400 dark:border-gray-600">
                            PW
                        </span>
                        <input {...register("password", { required: true })}
                            type={showPassword ? 'text' : 'password'} // fix here
                            placeholder='비밀번호 (6글자 이상)'
                            autoComplete='off'
                            // disabled={disabled}
                            className={`${styles.input_password} rounded-none rounded-r-lg bg-white border text-gray-900 focus:ring-blue-500 focus:border-blue-500 block flex-1 min-w-0 w-full text-sm border-gray-300 p-2.5  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500`} />
                        {errors.password && <span>This field is required</span>}
                    </div>
                    <div className="mb-10">
                        <Button type='submit'
                            className={`${styles.btnLogin} px-3.5 py-2.5 text-sm font-bold text-white shadow-sm hover:bg-gray-100 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white`}
                            disabled={isLoggingIn}
                            skin='green'>LOGIN
                        </Button>
                    </div>
                </form>
                {(logInError || errorMessage) && <div>{logInError || errorMessage}</div>}
            </div>
        </main>
    );
};

export default Login;


