'use client';
import React, { useState, FormEventHandler } from 'react';
import { useForm } from 'react-hook-form';
import { LogoSml } from '@/public/svgs';
import styles from "./index.module.scss";
import { yupResolver } from '@hookform/resolvers/yup';
import { loginForm } from '@/types/form';
import Button from '@/components/Button';
import { LogInSchema, logInValidator } from '@/utils/validator';
import { atom, selector, useRecoilState, useRecoilValue } from 'recoil';
import { useRouter } from 'next/navigation';
import Auth from '@/components/Auth';

const Login = () => {
    return (
        <main className="flex items-center justify-center w-screen h-screen">
            <div className={`${styles.bgIntro} flex w-1/2 h-screen items-center justify-center`}></div>
            <div className="bg-white flex w-1/2 h-screen items-center justify-center flex-col">
                <div className="mb-10">
                    <LogoSml />
                </div>
                <div className={styles.loginForm}>
                    <Auth />
                </div>
            </div>
        </main>
    );
};

export default Login;


