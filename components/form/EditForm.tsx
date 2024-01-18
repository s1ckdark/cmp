'use client';
import React from 'react';
import { useForm, Controller } from 'react-hook-form';
import { apiBe } from '@/services';
import styles from './EditForm.module.scss';
import Button from '@/components/Button';
import { Toast } from '@/components/Toast';

interface IEditForm {
    regId: string;
    userFullName: string;
    userType: string;
    privilege: string[];
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
interface IEditFormProps {
    data?: IEditForm;
    type: string;
}

const EditForm = ({ data, type }: IEditFormProps) => {
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

    const onSubmit = (data: any) => {
        if (!passwordCheck()) return false;
        console.log(data);
    };

    const passwordCheck = () => {
        const password: any = getValues('password');
        const newPassword: any = getValues('confirmPassword');
        const status = password === newPassword ? true : false;
        if(!status) Toast("warning", '비밀번호가 일치하지 않습니다.')
        return status;
    }

     const openModal = (type: string) => {
    const modal: any = document.querySelector("#modal");
    const innerSearch = modal.querySelector('#searchInput');
    let inner = "";

    switch (type) {
        case "address":
            inner = "<input type='text' id='addressInput' placeholder='주소를 입력하세요.' /><button id='addressSearchBtn'>주소 검색</button>";
            break;
        case "member":
            inner = "<input type='text' id='memberInput' placeholder='회사 이름을 입력하세요.' /><button id='memberSearchBtn'>회사 검색</button>";
            break;
        default:
            inner = "<p>알 수 없는 검색 유형입니다.</p>"; // "Unknown search type"
    }

    if (modal) {
        modal.classList.add(styles.open);
        innerSearch.innerHTML = inner;

        const searchBtn = type === "address" ? modal.querySelector('#addressSearchBtn') : modal.querySelector('#memberSearchBtn');
        const searchInput = type === "address" ? modal.querySelector('#addressInput') : modal.querySelector('#memberInput');

        searchBtn.addEventListener('click', () => {
            if (searchInput) {
                switch (type) {
                    case "address":
                        addrSearch(searchInput.value);
                        break;
                    case "member":
                        memberSearch(searchInput.value);
                        break;
                    default:
                        break;
                }
            }
        });
    }
}


    const closeModal = () => {
        const modal: any = document.querySelector("#modal");
        const innerModal = modal.querySelector(styles.innerModal);
        const searchBtn = modal.querySelector('#searchBtn');
        const search:any = modal.querySelector('#searchInput');
        const result:any = modal.querySelector('#searchResult');
        if (modal) {
            search.innerHTML = '';
            result.innerHTML = '';
            modal.classList.remove(styles.open);
            // searchBtn.removeEventListener('click', () => { });
        }
    }
    const addAddr = (zipcode: string, addr: string) => {
        closeModal();
        setValue('zipcode', zipcode);
        setValue('addr', addr);
    }

    const addMemberNo = (memberNo: string, memberName: string) => {
        closeModal();
        setValue('memberNo', memberNo);
        setValue('memberName', memberName);
    }

    const memberSearch = async (value: string) => {
        const url = '/customer';
        const response = await apiBe(url, { params: { memberName: value } });
        if (response.status === 200 || response.status === 201) {
            const result = response.data;
            let content = '';
            let customers = result.content;
            if (customers.length === 0) {
                Toast("error", '회사명이 존재하지 않습니다.');
            } else {
                content = customers.map((item: any) => {
                    return `<div data-memberno="${item.memberNo}" data-membername="${item.memberName}"><p>${item.memberNo}</p><p>${item.memberName}</p></div>`;
                }).join('');
            }

            const modal = document.querySelector("#modal");
            if (modal) {
                modal.classList.add(styles.open);
                const resultArea: any = modal.querySelector('#searchResult');
                resultArea.innerHTML = content;

                // Attach click event listeners to the dynamically created div elements
                const divElements = resultArea.querySelectorAll('div');
                divElements.forEach((div:any) => {
                    const getMemberNo = div.getAttribute('data-memberno');
                    const getMemberName = div.getAttribute('data-membername');
                    div.addEventListener('click', () => {
                        if (getMemberNo && getMemberName) {
                            addMemberNo(getMemberNo, getMemberName);
                        }
                    });
                });
            }
        }
    }


    const addrSearch = async (value: string) => {
        const url = `https://business.juso.go.kr/addrlink/addrLinkApi.do?currentPage=1&countPerPage=10&keyword=${value}&confmKey=${process.env.NEXT_PUBLIC_JUSO_API_KEY}&resultType=json`;
        const response = await fetch(url);
        const { results} = await response.json();
        if (results.juso != null) {
            let content = results.juso.map((item: any) => {
                return `<div data-zipcode="${item.zipNo}" data-addr="${item.roadAddrPart1}" data-addrDetail="${item.jibunAddr}">${item.roadAddrPart1}</div>`
            })
            const resultArea = document.querySelector('#searchResult');
            if (resultArea) {
                resultArea.innerHTML = content;
                const divElements = resultArea.querySelectorAll('div');
                divElements.forEach((div:any) => {
                    const zipcode = div.getAttribute('data-zipcode');
                    const addr = div.getAttribute('data-addr');
                    div.addEventListener('click', () => {
                        if (zipcode && addr) {
                            addAddr(zipcode, addr);
                        }
                        closeModal();
                    });
                });
            }
        }

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
                        <div className={styles.password}>
                        <label htmlFor="password" className="block text-sm font-medium text-gray-900 dark:text-black">비밀번호:</label>
                        <Controller
                            name="password"
                            control={control}
                            render={({ field }) => <input type="password" id="password" {...field} required defaultValue={password} />}
                        />
                    </div>
                        <div className={styles.password}>
                        <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-900 dark:text-black">비밀번호 확인:</label>
                        <Controller
                            name="confirmPassword"
                            control={control}
                            render={({ field }) => <input type="password" id="confirmPassword" {...field} required />}
                        />
                    </div>
                        <div className={`${styles.btnArea} ${styles.btnPasswordCheck}`}>
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
                        <div className={styles.address}>
                        <label htmlFor="addr" className="block text-sm font-medium text-gray-900 dark:text-black">주소:</label>
                        <Controller
                            name="addr"
                            control={control}
                            render={({ field }) => <input type="text" id="addr" {...field} required defaultValue={addr} readOnly/>}
                        />
                        {/* <p id="helper-text-explanation" class="mt-2 text-sm text-gray-500 dark:text-gray-400">We’ll never share your details. Read our <a href="#" class="font-medium text-blue-600 hover:underline dark:text-blue-500">Privacy Policy</a>.</p> */}
                    </div>
                        <div className={styles.addressDetail}>
                        <label htmlFor="addrDetail" className="block text-sm font-medium text-gray-900 dark:text-black">상세 주소:</label>
                        <Controller
                            name="addrDetail"
                            control={control}
                            render={({ field }) => <input type="text" id="addrDetail" {...field} required defaultValue={addrDetail} readOnly />}
                        />
                        </div>
                        <div className={styles.zipcode}>
                        <label htmlFor="zipcode" className="block text-sm font-medium text-gray-900 dark:text-black">상세 주소:</label>
                        <Controller
                            name="zipcode"
                            control={control}
                            render={({ field }) => <input type="text" id="zipcode" {...field} required defaultValue={zipcode}/>}
                        />
                        </div>
                        <div className={`${styles.btnArea} ${styles.btnAddrSearch}`}>
                        <Button type='button' onClick={() => openModal('address')} skin={"gray"}>주소 검색</Button>
                            {/* <p id="helper-text-explanation" class="mt-2 text-sm text-gray-500 dark:text-gray-400">We’ll never share your details. Read our <a href="#" class="font-medium text-blue-600 hover:underline dark:text-blue-500">Privacy Policy</a>.</p> */}
                    </div>
                </div>
            </div>
            <div className={`${styles.inputGroup}`}>
                <div className="flex items-end">
                        <div className={styles.memberNo}>
                        <label htmlFor="memberNo" className="block text-sm font-medium text-gray-900 dark:text-black">회사번호:</label>
                        <Controller
                            name="memberNo"
                            control={control}
                            render={({ field }) => <input type="text" id="memberNo" {...field} defaultValue={memberNo} readOnly/>}
                        />
                    </div>
                        <div className={styles.memberName}>
                        <label htmlFor="memberName" className="block text-sm font-medium text-gray-900 dark:text-black">회사이름:</label>
                        <Controller
                            name="memberName"
                            control={control}
                            render={({ field }) => <input type="text" id="memberName" {...field} defaultValue={memberName} readOnly />}
                        />
                    </div>
                        <div className={`${styles.btnMemberSearch} ${styles.btnArea}`}>
                        <Button type='button' onClick={() => openModal('member')} skin={"gray"}>회사 검색</Button>
                    </div>
                </div>
            </div>
            <div className={`${styles.btnArea} mt-6`}>
                <Button type='submit'
                    className='mx-auto px-3.5 py-2.5 text-sm font-bold text-white shadow-sm hover:bg-gray-100 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white'
                    skin='green'>수정
                </Button>
            </div>
            </form >
            <div id="modal" className={styles.modal}>
                <span className={styles.closeBtn} onClick={() => closeModal()}>&times;</span>
                <div className={styles.innerModal}>
                    <div className={styles.inputGroup} id="searchInput"></div>
                    <div className={styles.resultArea} id="searchResult"></div>
                </div>
            </div>
            </>
    );
}

export default EditForm;
