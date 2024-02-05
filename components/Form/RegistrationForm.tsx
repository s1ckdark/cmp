'use client';
import React from 'react';
import { useForm, Controller } from 'react-hook-form';
import { apiBe } from '@/services';
import styles from './RegistrationForm.module.scss';
import Button from '@/components/Button';
import { Toast } from '@/components/Toast';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Select, { defaultTheme } from 'react-select';
import { Privileges } from '@/types/auth';
import { useRecoilState } from 'recoil';
import Loading from '@/components/Loading';
import { IRegistrationForm } from '@/types/form';


interface IRegistrationFormProps {
    data?: IRegistrationForm;
    type: "register" | "edit" | "view";
}

const RegistrationForm = ({ data, type }: IRegistrationFormProps) => {
    const [mounted, setMounted] = useState(false);
    const [isDisabled, setIsDisabled] = useState(false);
    const [ myData, setMyData] = useState<IRegistrationForm>({ id:'',username: '', userFullName: '', userType: '', privileges: [], password: '', confirmPassword: '', email: '', mobile: '', phone: '', addr: '', addrDetail: '', zipcode: '', memberNo: '', memberName: '', salesName: '', isAdmin: 'false', isActivated: "true", regId: '', regName: '', regDt: '' });
    const { id, username, userFullName, userType, privileges, password, confirmPassword, email, mobile, phone, addr, addrDetail, zipcode, memberNo, memberName, salesName, isAdmin, isActivated, regId, regName, regDt } = data ? data: myData; 
  
    const { control, handleSubmit, getValues, register, setValue, setError, formState: {errors} } = useForm({
        defaultValues: {
            id:id,
            username: userFullName,
            userType: userType,
            privileges: privileges,
            password: password,
            confirmPassword:password,
            email: email,
            mobile: mobile,
            phone: phone,
            zipcode: zipcode,
            addr: addr,
            addrDetail: addrDetail,
            memberNo: memberNo,
            memberName: memberName,
            salesName: salesName,
            isAdmin: isAdmin,
            isActivated: isActivated,
            regId: regId,
            regName: regName,
            regDt: regDt
        }
    });
    const [privilegeOptions, setPrivilegeOptions] = useState<any[]>([]);
    const [defaultPrivilegeOptions, setDefaultPrivilegeOptions] = useState<any[]>([]);
    const [ passwordChecker, setPasswordChecker ] = useState(false);
   
    const router = useRouter();

    const onSubmit = async (data: any) => {
        if (getValues('privileges').includes('admin')) {
            setValue('isAdmin', "true");
        }
        if (passwordChecker === false && type === 'register') {
            Toast("warning", '비밀번호를 확인해주세요.');
            return false;
        }
        let url = '', method = '';
        if (type === 'register' && passwordChecker) { url = '/user'; method = 'put'; } 
        else if (type === 'edit') { url = `/user/${username}`; method = 'post'; }
        else { return false;}
        
        console.log(url);
        const response = await apiBe(url, { method, data: data });
        if (response.status === 200 || response.status === 201) {
            const result = response.data;
            if (result) {
                Toast("success", '등록되었습니다.');
                router.push('/admin/user/list/1');
            }
        }
    };

    const passwordCheck = () => {
        const password: any = (document.querySelector('[name="password"]') as HTMLInputElement)?.value || null;
        const newPassword: any = (document.querySelector('[name="confirmPassword"]') as HTMLInputElement)?.value || null;
        const status = password === newPassword ? true : false;
        if(!status) Toast("warning", '비밀번호가 일치하지 않습니다.')
        setPasswordChecker(true);
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

    const pwCloseModal = () => {
        const modal: any = document.querySelector('#passwordModal');
        const pwInput = modal.querySelector('.modalPassword');
        const pwConfirmInput = modal.querySelector('.modalComfirmPassword');

        if (modal) {
            modal.classList.remove(styles.open);
            pwInput.value = '';
            pwConfirmInput.value = '';
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

    const passwordModal = () => {
        const modal: any = document.querySelector("#passwordModal");
        if (modal) {
            modal.classList.add(styles.open);
        }
    }

    const passwordChange = async() => {
        const newPassword:any = (document.querySelector('.modalPassword') as HTMLInputElement)?.value;
        const confirmPassword: any = (document.querySelector('.modalComfirmPassword') as HTMLInputElement)?.value;
        if (newPassword && confirmPassword) {
            if (newPassword.value === confirmPassword.value) {
                const data = {
                    newPassword: newPassword,
                    newPasswordConfirm: confirmPassword
                }
                const url = `/user/changePassword/${id}`;
                const response = await apiBe.post(url, data);
                if (response.status === 200 || response.status === 201) {
                    Toast("success", '비밀번호가 변경되었습니다.', ()=> pwCloseModal());
  
                } else {
                    Toast("error", '비밀번호 변경에 실패하였습니다.',()=> pwCloseModal());
                }
            } else {
                Toast("warning", '비밀번호가 일치하지 않습니다.',()=> pwCloseModal());
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
    const userTypeOptions = [
        { value: "고객사", label: "고객사" },
        { value: "GD", label: "GD" },
    ]

    const editMode = () => {
       router.push(`./edit`);
    }

    useEffect(() => {
        console.log(type, data);
        if (data) {
            setValue('username', data.userFullName);
            setValue('userType', data.userType);
            setValue('privileges', data.privileges);
            setValue('email', data.email);
            setValue('mobile', data.mobile);
            setValue('phone', data.phone);
            setValue('zipcode', data.zipcode);
            setValue('addr', data.addr);
            setValue('addrDetail', data.addrDetail);
            setValue('memberNo', data.memberNo);
            setValue('memberName', data.memberName);
            setValue('salesName', data.salesName);
        }
        const getPrivilegeOptions = async () => {
            const response = await apiBe('/role');
            if (response.status === 200 || response.status === 201) {
                const result = response.data;
                let tmp :any = []
                if (result) {
                    result.map((item: any) => {
                       tmp.push({ value: item.name, label: item.name });
                    })
                    setPrivilegeOptions(tmp);
                    const defaultPrivileges = privilegeOptions.filter(option => privileges.includes(option.value));
                    console.log(defaultPrivileges);
                    setDefaultPrivilegeOptions(defaultPrivileges);
                }
            }
        }

        if (defaultPrivilegeOptions.length === 0) {
            getPrivilegeOptions();
        }
            if (type === 'view') {
                setIsDisabled(true);
            }
            setMounted(true);
        }, [type,data])
    
    
    
    if (mounted === false) return <Loading />
    return (
        <>
        <form className={`${styles.template} ${styles[type]}`} onSubmit={handleSubmit(onSubmit)}>
            <div className={`${styles.inputGroup}`}>
                <label htmlFor="email" className="block text-sm font-medium text-gray-900 dark:text-black">회원ID:</label>
                <Controller
                    name="email"
                    control={control}
                    render={({ field }) => <input readOnly={isDisabled} type="text" id="email" {...field} required defaultValue={email} />}
                />
                {errors.email && <span className="text-red-500">This field is required</span>}
            </div>
            <div className={`${styles.inputGroup}`}>
                <label htmlFor="username" className="block text-sm font-medium text-gray-900 dark:text-black">회원명:</label>
                <Controller
                    name="username"
                    control={control}
                    render={({ field }) => <input readOnly={isDisabled} type="text" id="username" {...field} required defaultValue={userFullName} />}
                />
                {errors.username && <span className="text-red-500">This field is required</span>}
            </div>
            <div className="grid gap-6 mb-6 md:grid-cols-2">
                <div className={`${styles.inputGroup}`}>
                    <label htmlFor="userType" className="block text-sm font-medium text-gray-900 dark:text-black">회원유형:</label>
                    <Controller
                        name="userType"
                        control={control}
                        defaultValue={userType}
                        rules={{ required: true }}
                        render={({ field }) => (
                        <Select
                            {...field}
                            options={userTypeOptions}
                            isDisabled={isDisabled}
                            value={userTypeOptions.find((c) => c.value === field.value)}
                            onChange={val => field.onChange(val?.value)}
                        />
                        )}
                    />
                    {errors.userType && <span className="text-red-500">This field is required</span>}
                </div>
                <div className={`${styles.inputGroup}`}>
                    <label htmlFor="privileges" className="block text-sm font-medium text-gray-900 dark:text-black">권한:</label>
                    <Controller
                        name="privileges"
                        control={control}
                        defaultValue={defaultPrivilegeOptions} // Set the default options
                        rules={{ required: true }}
                        render={({ field }) => (
                            <Select
                                {...field}
                                options={privilegeOptions}
                                isDisabled={isDisabled}
                                isMulti
                                value={privilegeOptions.filter((option:any) => field.value.includes(option.value))} // Corrected this line
                                onChange={(val) => field.onChange(val.map((item) => item.value))}
                            />
                        )}
                        />
                        <input type='hidden' {...register('isActivated')} defaultValue={isActivated} />
                        <input type='hidden' {...register('isAdmin')} defaultValue={isAdmin} />
                    {errors.privileges && <span className="text-red-500">This field is required</span>}
                </div>
                </div>
            <div className={`${styles.inputGroup}`}>
                    {type === 'register' ?  
                <div className="flex items-end">
                        <div className={styles.password}>
                        <label htmlFor="password" className="block text-sm font-medium text-gray-900 dark:text-black">비밀번호:</label>
                        <Controller
                            name="password"
                            control={control}
                            render={({ field }) => <input readOnly={isDisabled} type="password" id="password" {...field} required defaultValue={password} />}
                        />
                    </div>
                    <div className={styles.password}>
                        <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-900 dark:text-black">비밀번호 확인:</label>
                        <Controller
                            name="confirmPassword"
                            control={control}
                            render={({ field }) => <input readOnly={isDisabled} type="password" id="confirmPassword" {...field} required />}
                        />
                    </div>
                        <div className={`${styles.btnArea} ${styles.btnPasswordCheck}`}>
                        <Button type='button'
                            className='mx-auto px-3.5 py-2.5 text-sm font-bold text-white shadow-sm hover:bg-gray-100 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white'
                                    onClick={() => passwordCheck()} skin='gray'>{passwordChecker ? "검증완료" : "검증"}
                        </Button>
                    </div>
                            </div>:
                type === 'edit' ? <div className="flex items-end">
                    <div className={styles.password}>
                    <label htmlFor="password" className="block text-sm font-medium text-gray-900 dark:text-black">비밀번호:</label>
                    <Controller
                        name="password"
                        control={control}
                        render={({ field }) => <input readOnly={isDisabled} type="password" id="password" {...field} />}
                    />
                </div>
                            <div className={`${styles.btnArea} ${styles.btnPasswordCheck}`}>
                                <Button type='button' onClick={() => passwordModal()}
                                    className='mx-auto px-3.5 py-2.5 text-sm font-bold text-white shadow-sm hover:bg-gray-100 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white'
                                    skin='gray'>비밀번호 수정
                                </Button>
                            </div>
                        </div> : <></>
                        
            }
                {errors.password && <span className="text-red-500">This field is required</span>} 
            </div>
            <div className={`${styles.inputGroup}`}>
                <label htmlFor="mobile" className="block text-sm font-medium text-gray-900 dark:text-black">전화:</label>
                <Controller
                    name="mobile"
                    control={control}
                    render={({ field }) => <input readOnly={isDisabled} type="text" id="mobile" {...field} defaultValue={mobile} />}
                    />
                {errors.mobile && <span className="text-red-500">This field is required</span>}
            </div>
            <div className={`${styles.inputGroup}`}>
                <label htmlFor="phone" className="block text-sm font-medium text-gray-900 dark:text-black">유선전화:</label>
                <Controller
                    name="phone"
                    control={control}
                    render={({ field }) => <input readOnly={isDisabled} type="phone" id="phone" {...field} required defaultValue={phone} />}
                />
                {errors.phone && <span className="text-red-500">This field is required</span>}
            </div>

            <div className={`${styles.inputGroup}`}>
                <div className="flex items-end">
                        <div className={styles.zipcode}>
                        <label htmlFor="zipcode" className="block text-sm font-medium text-gray-900 dark:text-black">우편 번호:</label>
                        <Controller
                            name="zipcode"
                            control={control}
                            render={({ field }) => <input readOnly={true} type="text" id="zipcode" {...field} required defaultValue={zipcode}/>}
                        />
                        </div>
                        <div className={styles.address}>
                        <label htmlFor="addr" className="block text-sm font-medium text-gray-900 dark:text-black">주소:</label>
                        <Controller
                            name="addr"
                            control={control}
                            render={({ field }) => <input readOnly={true} type="text" id="addr" {...field} required defaultValue={addr} />}
                        />
                        {errors.addr && <span className="text-red-500">This field is required</span>}
                    </div>
                        <div className={styles.addressDetail}>
                        <label htmlFor="addrDetail" className="block text-sm font-medium text-gray-900 dark:text-black">상세 주소:</label>
                        <Controller
                            name="addrDetail"
                            control={control}
                            render={({ field }) => <input readOnly={isDisabled} type="text" id="addrDetail" {...field} required defaultValue={addrDetail} />}
                        />
                        </div>
                        {type === 'edit' || type === 'register' ? <div className={`${styles.btnArea} ${styles.btnAddrSearch}`}>
                            <Button type='button' onClick={() => openModal('address')} skin={"gray"}>주소 검색</Button>
                            {errors.addrDetail && <span className="text-red-500">This field is required</span>}
                        </div>:null}
                </div>
            </div>
            <div className={`${styles.inputGroup}`}>
                <div className="flex items-end">
                    <div className={styles.memberNo}>
                        <label htmlFor="memberNo" className="block text-sm font-medium text-gray-900 dark:text-black">회사번호:</label>
                        <Controller
                            name="memberNo"
                            control={control}
                            render={({ field }) => <input readOnly={true} type="text" id="memberNo" {...field} defaultValue={memberNo}/>}
                            />
                            {errors.memberNo && <span className="text-red-500">This field is required</span>}
                    </div>
                        <div className={styles.memberName}>
                        <label htmlFor="memberName" className="block text-sm font-medium text-gray-900 dark:text-black">회사이름:</label>
                        <Controller
                            name="memberName"
                            control={control}
                            render={({ field }) => <input readOnly={true} type="text" id="memberName" {...field} defaultValue={memberName} />}
                            />
                            {errors.memberName && <span className="text-red-500">This field is required</span>}
                    </div>
                        {type === 'edit' || type === 'register' ? <div className={`${styles.btnMemberSearch} ${styles.btnArea}`}>
                            <Button type='button' onClick={() => openModal('member')} skin={"gray"}>회사 검색</Button>
                        </div> : null}
                </div>
            </div>
            
            <div className={`${styles.btnArea} mt-6 mx-auto`}>
                    {type === 'view' && <Button type='button'
                        onClick={() => editMode()}  className='px-3.5 py-2.5 text-sm font-bold text-white shadow-sm hover:bg-gray-100 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white'
                        skin='green'>수 정</Button>}
                    {type === 'edit' ?  <Button type='submit'
                        className='px-3.5 py-2.5 text-sm font-bold text-white shadow-sm hover:bg-gray-100 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white'
                        skin='green'>수 정</Button>: null}
                    {type === 'register' ? <Button type='submit'
                        className='px-3.5 py-2.5 text-sm font-bold text-white shadow-sm hover:bg-gray-100 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white'
                        onClick={handleSubmit(onSubmit)} skin='green'>등 록</Button> : null}
                    <Button type='button' className={styles.btnBack} onClick={() => router.back()} skin={'gray'}>{type === 'register' || type === 'edit' ? "취소" : "목록"}</Button>
            </div>
            </form >
            <div id="modal" className={styles.modal}>
                <span className={styles.closeBtn} onClick={() => closeModal()}>&times;</span>
                <div className={styles.innerModal}>
                    <div className={styles.inputGroup} id="searchInput"></div>
                    <div className={styles.resultArea} id="searchResult"></div>
                </div>
            </div>
            {type === 'edit' ? <div id="passwordModal" className={`${styles.modal} ${styles.passwordModal}`}>
                <span className={styles.closeBtn} onClick={() => pwCloseModal()}>&times;</span>
                <div className={styles.innerModal}>
                    <div className={styles.inputGroup}>
                        <label htmlFor="newPassword" className="block text-sm font-medium text-gray-900 dark:text-black">비밀번호:</label>
                        <input readOnly={isDisabled} name="newPassword" type="password" className="modalPassword" />
                    </div>
                    <div className={styles.inputGroup}>
                        <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-900 dark:text-black">비밀번호 확인:</label>
                        <input readOnly={isDisabled} name="confirmPassword"  type="password" className="modalComfirmPassword" /> 
                    </div>
                    <div className={styles.btnArea}>
                        <Button type='button' className={styles.btnPasswordChange} onClick={() => passwordChange()} skin={'green'}>확인</Button>
                    </div>

                </div></div> : null}
            </>
    );
}

export default RegistrationForm;
