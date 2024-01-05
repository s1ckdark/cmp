'use client';
import React from 'react';
import { useForm, Controller } from 'react-hook-form';
import { apiBe } from '@/services';
import styles from './RegistrationForm.module.scss';
import Button from '@/components/Button';

interface IRegistrationForm {
    regId: string;
    userFullName: string;
    userType: string;
    privilege: string;
    password: string;
    email: string;
    mobile: string;
    phone: string;
    addr: string;
    addrDetail: string;
    zipcode: string;
    memberNo: string;
    memberName: string;
}
interface IRegistrationFormProps {
    data?: IRegistrationForm;
    type: string;
}

const RegistrationForm = ({ data, type }: IRegistrationFormProps) => {
    console.log(data);
    const { regId, userFullName, userType, privilege, password, email, mobile, phone, addr, addrDetail, zipcode, memberNo, memberName } = data ? data : { regId: '', userFullName: '', userType: '', privilege: '', password: '', email: '', mobile: '', phone: '', addr: '', addrDetail: '', zipcode: '',memberNo:'', memberName:'' };
    const { control, handleSubmit, getValues, setValue } = useForm({
        defaultValues: {
            regId: regId,
            userFullName: userFullName,
            userType: userType,
            privilege: privilege,
            password: password,
            confirmPassword: '',
            email: email,
            mobile: mobile,
            phone: phone,
            zipcode: zipcode,
            addr: addr,
            addrDetail: addrDetail,
            memberNo: memberNo,
            memberName: memberName
        }
    });

    const onSubmit = (data:any) => {
        console.log(data);
    };

    const passwordCheck = () => {
        const password: any = getValues('password');
        const newPassword: any = getValues('confirmPassword');
        return password === confirmPassword || '비밀번호가 일치하지 않습니다.';
    }

   
    const addMemberNo = (memberNo: string) => {
        setValue('memberNo', memberNo);
    }

    const memberSearch = async (value: string) => {
        const url = '/customer';
        const response = await apiBe(url, { params: { memberName: value } });
        const result = response.data;
        console.log(result, response);
        let content = '';
        let { customers } = result;

            if (customers.length === 0) {
                alert('회사명이 존재하지 않습니다.');
            } else {
                content = customers.map((item: any) => {
                    return `<div data-memberno="${item.memberNo}"><p>${item.memberNo}</p><p>${item.memberName}</p></div>`;
                }).join('');
            }

            const modal = document.querySelector("#modal");
            if (modal) {
                modal.classList.add("modal");
                modal.innerHTML = content;

                // Attach click event listeners to the dynamically created div elements
                const divElements = modal.querySelectorAll('div');
                divElements.forEach((div) => {
                    const getMemberNo = div.getAttribute('data-memberno');
                    div.addEventListener('click', () => addMemberNo(getMemberNo));
                });
            }
        }


    const addrSearch = async(pageNumber: number = 1) => {
        const value = getValues('addr');
        const url = `https://business.juso.go.kr/addrlink/addrLinkApi.do?currentPage=${pageNumber}&countPerPage=10&keyword=${value}&confmKey=${process.env.NEXT_PUBLIC_JUSO_API_KEY}&resultType=json`;
        const response = await fetch(url);
        const data = await response.json();
        console.log(data);
    }

    return (
        <>
        <form className={`${styles.template}`} onSubmit={handleSubmit(onSubmit)}>
            <div className={`${styles.inputGroup}`}>
                <label htmlFor="regId" className="block text-sm font-medium text-gray-900 dark:text-black">회원ID:</label>
                <Controller
                    name="regId"
                    control={control}
                    render={({ field }) => <input type="text" id="regId" {...field} required defaultValue={regId} />}
                />
                {/* <p id="helper-text-explanation" class="mt-2 text-sm text-gray-500 dark:text-gray-400">We’ll never share your details. Read our <a href="#" class="font-medium text-blue-600 hover:underline dark:text-blue-500">Privacy Policy</a>.</p> */}
            </div>
            <div className={`${styles.inputGroup}`}>
                <label htmlFor="userFullName" className="block text-sm font-medium text-gray-900 dark:text-black">회원명:</label>
                <Controller
                    name="userFullName"
                    control={control}
                    render={({ field }) => <input type="text" id="userFullName" {...field} required defaultValue={userFullName} />}
                />
                {/* <p id="helper-text-explanation" class="mt-2 text-sm text-gray-500 dark:text-gray-400">We’ll never share your details. Read our <a href="#" class="font-medium text-blue-600 hover:underline dark:text-blue-500">Privacy Policy</a>.</p> */}
            </div>
            <div className="grid gap-6 mb-6 md:grid-cols-2">
                <div className={`${styles.inputGroup}`}>
                    <label htmlFor="userType" className="block text-sm font-medium text-gray-900 dark:text-black">회원유형:</label>
                    <Controller
                        name="userType"
                        control={control}
                        render={({ field }) => <input type="text" id="userType" {...field} required defaultValue={userType} />}
                    />
                    {/* <p id="helper-text-explanation" class="mt-2 text-sm text-gray-500 dark:text-gray-400">We’ll never share your details. Read our <a href="#" class="font-medium text-blue-600 hover:underline dark:text-blue-500">Privacy Policy</a>.</p> */}
                </div>
                <div className={`${styles.inputGroup}`}>
                    <label htmlFor="privilege" className="block text-sm font-medium text-gray-900 dark:text-black">권한:</label>
                    <Controller
                        name="privilege"
                        control={control}
                        render={({ field }) => <input type="text" id="privilege" {...field} required defaultValue={privilege} />}
                    />
                    {/* <p id="helper-text-explanation" class="mt-2 text-sm text-gray-500 dark:text-gray-400">We’ll never share your details. Read our <a href="#" class="font-medium text-blue-600 hover:underline dark:text-blue-500">Privacy Policy</a>.</p> */}
                </div>
            </div>
            <div className={`${styles.inputGroup}`}>
                <div className="flex items-end">
                    <div className="password">
                        <label htmlFor="password" className="block text-sm font-medium text-gray-900 dark:text-black">비밀번호:</label>
                        <Controller
                            name="password"
                            control={control}
                            render={({ field }) => <input type="password" id="password" {...field} required defaultValue={password} />}
                        />
                    </div>
                    <div className="confirmPassword">
                        <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-900 dark:text-black">비밀번호:</label>
                        <Controller
                            name="confirmPassword"
                            control={control}
                            render={({ field }) => <input type="password" id="confirmPassword" {...field} required />}
                        />
                    </div>
                    <div className="btnArea">
                        <Button type='button'
                            className='mx-auto px-3.5 py-2.5 text-sm font-bold text-white shadow-sm hover:bg-gray-100 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white'
                            skin='gray'>수정
                        </Button>
                    </div>
                </div>
                {/* <p id="helper-text-explanation" class="mt-2 text-sm text-gray-500 dark:text-gray-400">We’ll never share your details. Read our <a href="#" class="font-medium text-blue-600 hover:underline dark:text-blue-500">Privacy Policy</a>.</p> */}
            </div>
            <div className={`${styles.inputGroup}`}>
                <label htmlFor="email" className="block text-sm font-medium text-gray-900 dark:text-black">이메일:</label>
                <Controller
                    name="email"
                    control={control}
                    render={({ field }) => <input type="text" id="email" {...field} required defaultValue={email} />}
                />
                {/* <p id="helper-text-explanation" class="mt-2 text-sm text-gray-500 dark:text-gray-400">We’ll never share your details. Read our <a href="#" class="font-medium text-blue-600 hover:underline dark:text-blue-500">Privacy Policy</a>.</p> */}
            </div>
            <div className={`${styles.inputGroup}`}>
                <label htmlFor="mobile" className="block text-sm font-medium text-gray-900 dark:text-black">전화:</label>
                <Controller
                    name="mobile"
                    control={control}
                    render={({ field }) => <input type="text" id="mobile" {...field} defaultValue={mobile} />}
                />
            </div>
            <div className={`${styles.inputGroup}`}>
                <label htmlFor="phone" className="block text-sm font-medium text-gray-900 dark:text-black">유선전화:</label>
                <Controller
                    name="phone"
                    control={control}
                    render={({ field }) => <input type="phone" id="phone" {...field} required defaultValue={phone} />}
                />
                {/* <p id="helper-text-explanation" class="mt-2 text-sm text-gray-500 dark:text-gray-400">We’ll never share your details. Read our <a href="#" class="font-medium text-blue-600 hover:underline dark:text-blue-500">Privacy Policy</a>.</p> */}
            </div>

            <div className={`${styles.inputGroup}`}>
                <div className="flex items-end">
                    <div className="addr1">
                        <label htmlFor="addr" className="block text-sm font-medium text-gray-900 dark:text-black">주소:</label>
                        <Controller
                            name="addr"
                            control={control}
                            render={({ field }) => <input type="text" id="addr" {...field} required defaultValue={addr} />}
                        />
                        {/* <p id="helper-text-explanation" class="mt-2 text-sm text-gray-500 dark:text-gray-400">We’ll never share your details. Read our <a href="#" class="font-medium text-blue-600 hover:underline dark:text-blue-500">Privacy Policy</a>.</p> */}
                    </div>
                    <div className="addr2">
                        <label htmlFor="addrDetail" className="block text-sm font-medium text-gray-900 dark:text-black">상세 주소:</label>
                        <Controller
                            name="addrDetail"
                            control={control}
                            render={({ field }) => <input type="text" id="addrDetail" {...field} required defaultValue={addrDetail} />}
                        />
                        </div>
                    <div className="btnArea">
                        <Button type='button' onClick={() => addrSearch()} skin={"gray"}>주소 검색</Button>
                            {/* <p id="helper-text-explanation" class="mt-2 text-sm text-gray-500 dark:text-gray-400">We’ll never share your details. Read our <a href="#" class="font-medium text-blue-600 hover:underline dark:text-blue-500">Privacy Policy</a>.</p> */}
                    </div>
                </div>
            </div>
            <div className={`${styles.inputGroup}`}>
                <div className="flex items-end">
                    <div className="memberNo">
                        <label htmlFor="memberNo" className="block text-sm font-medium text-gray-900 dark:text-black">회사번호:</label>
                        <Controller
                            name="memberNo"
                            control={control}
                            render={({ field }) => <input type="text" id="memberNo" {...field} defaultValue={memberNo} readOnly/>}
                        />
                    </div>
                    <div className="memberName">
                        <label htmlFor="memberName" className="block text-sm font-medium text-gray-900 dark:text-black">회사이름:</label>
                        <Controller
                            name="memberName"
                            control={control}
                            render={({ field }) => <input type="text" id="memberName" {...field} defaultValue={memberName} />}
                        />
                    </div>
                    <div className="btnArea">
                        <Button type='button' onClick={() => memberSearch(getValues('memberName'))} skin={"gray"}>회사 검색</Button>
                    </div>
                </div>
            </div>
            <div className={`${styles.btnArea} mt-6`}>
                <Button type='submit'
                    className='mx-auto px-3.5 py-2.5 text-sm font-bold text-white shadow-sm hover:bg-gray-100 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white'
                    skin='green'>수정
                </Button>
            </div>
            <div id="modal"></div>
            </form >
            </>
    );
}

export default RegistrationForm;
