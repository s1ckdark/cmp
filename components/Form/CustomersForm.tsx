'use client';
import React, { use } from 'react';
import { useForm, Controller } from 'react-hook-form';
import { apiBe } from '@/services';
import styles from './CustomersForm.module.scss';
import Button from '@/components/Button';
import { Toast } from '@/components/Toast';
import { useEffect, useState } from 'react';
import Select, { defaultTheme } from 'react-select';
import { useRecoilState, useResetRecoilState } from 'recoil';
import Loading from '@/components/Loading';
import { ICustomersForm } from '@/types/form';
import CustomersAddPerForm from './CustomersAddPerForm';
import CustomersAddrForm from './CustomersAddrForm';
import { IconSearch } from '@/public/svgs';
import { modalAtom } from '@/states';
import { addrAtom, customerStep } from '@/states/data';
import Modal from '@/components/Modal';
import { usePathname, useRouter } from 'next/navigation';
import lodash, { set } from 'lodash';

interface ICustomersFormProps {
    data?: ICustomersForm;
    type: "register" | "edit" | "view";
}

interface IaddMember {
    custContact: boolean;
    sales: boolean;
}
const CustomersForm = ({ data, type }: ICustomersFormProps) => {
    const [mounted, setMounted] = useState(false);
    const [ formType, setFormType ] = useState(type);
    const [step, setStep] = useRecoilState(customerStep);
    const [modal, setModal] = useRecoilState(modalAtom);
    const [addr, setAddr] = useRecoilState(addrAtom);
    const [isDisabled, setIsDisabled] = useState(false);
    const [addMember, setAddMember] = useState<IaddMember>({ custContact: false, sales: false });
    const [regionTypeOptions, setRegionTypeOptions] = useState<any>([]);
    const [defaultRegionType, setDefaultRegionType] = useState<any>([]);
    const [member, setMember] = useState<any>({ memberNo: '', memberName: '', regionType: '', memberType: '일반', industry: '', businessRegNo: '', custCeo: '', custPhone: '', comment: '' });
    const pathname = usePathname();
    const { memberNo, memberName, regionType, memberType, industry, businessRegNo, custCeo, custPhone, comment } = member;

    const { control, register, handleSubmit, getValues, setValue, setError, formState: { errors } } = useForm({
        defaultValues: {
            memberNo: memberNo,
            memberName: memberName,
            regionType: regionType,
            memberType: memberType,
            industry: industry,
            businessRegNo: businessRegNo,
            custCeo: custCeo,
            custPhone: custPhone,
            comment: comment,
        }
    });
    console.log(modal);
    const router = useRouter();

    const onSubmit = async (formData: any) => {
        // formData.memberNo = member.memberNo;
        // formData.memberName = member.memberName;
        
        const response = type === 'register' ? await apiBe.put(`/customer`, formData) : await apiBe.post(`/customer`, formData);
        if (response.status === 201 || response.status === 200) {
            const { data } = response;
            // setMember(data);
            if(type === 'register' ) setStep(1)
            Toast("success", '고객사 정보가 저장 되었습니다.');
        } else {
            Toast("error", '이미 고객사 정보가 존재합니다.')
        }
    };

    // const addAddress = async (id: string, memberNo: string) => {
    //     const data = {
    //         ...addr,
    //         id: id
    //     }

        
    //     const response = type === 'register' ? await apiBe.put(`/customer/${memberNo}/address`, data) : await apiBe.post(`/customer/${memberNo}/address/`, data);
    //     return response.status;
    // }
    const openModal = (type: string) => {
        setModal({ isOpen: true, type: type, data: null });
    }

    const addMembers = (type: string) => {
        switch (type) {
            case 'custContact':
                setAddMember({ ...addMember, custContact: true });
                break;
            case 'sales':
                setAddMember({ ...addMember, sales: true });
                break;
            default:
                break;
        }
    }
    const editMode = () => {
        router.push(`/customers/edit/${memberNo}`);
    }

    const goBack = () => {
        router.back();
    }
    const goList = () => {
        router.push('/customers/list/1');
    }

    useEffect(() => {
        const getMember = async (memberNo:string) => {
            const response = await apiBe.get(`/customer/${memberNo}`);
            const { data } = response;
            if (response.status === 200 && data.memberNo === memberNo ) {
               router.push(`/customers/edit/${memberNo}`)
            }
        }
        if (modal.data?.memberNo && modal.data?.memberName) {
            setMember({ ...member, 'memberNo': modal.data?.memberNo, 'memberName': modal.data?.memberName })
            setValue('memberNo', modal.data.memberNo);
            setValue('memberName', modal.data.memberName)
            getMember(modal.data.memberNo);
        }
    }, [modal]);

    useEffect(() => {
        setModal({isOpen: false, type: '', data: null});
        const memberNo = lodash.last(lodash.split(pathname, '/'))
        const getMember = async () => {
            const response = await apiBe.get(`/customer/${memberNo}`);
            if (response.status === 200 && data !== null) {
                const { data } = response;
                setMember(data)
                setStep(4);
                setValue('memberNo', data.memberNo);
                setValue('memberName', data.memberName);
                setValue('regionType', data.regionType);
                setValue('memberType', data.memberType);
                setValue('industry', data.industry);
                setValue('businessRegNo', data.businessRegNo);
                setValue('custCeo', data.custCeo);
                setValue('custPhone', data.custPhone);
                setValue('comment', data.comment);
                
                if (data.custContact !== null && data.sales !== null) setAddMember({ custContact: true, sales: true })
                if (data.sales !== null && data.custContact === null) setAddMember({ ...addMember, sales: true })
                if (data.sales === null && data.custContact !== null) setAddMember({ ...addMember, custContact: true })
            } else if(response.status === 404){
                setStep(0);
                setValue('memberNo', memberNo);
            }
        }
        if (type === 'view' || type === 'edit') {
            getMember()
        }

        const getRegionType = async () => {
            let tmp: any = [];
            const response = await apiBe.get('/common/code/regionType');
            if (response.status === 200 || response.status === 201) {
                const { regionType } = response.data;
                if (regionType) {
                    regionType.map((item: any) => {
                        tmp.push({ value: item.key, label: item.value });
                    })
                    const defaultRegion = tmp.filter((option: any) => regionType.includes(option.value));
                    setRegionTypeOptions(tmp);
                    setDefaultRegionType(defaultRegion);
                }
            }
        }
        if (defaultRegionType.length === 0) {
            getRegionType();
        }
        if (type === 'view') {
            setIsDisabled(true);
        }
        if (type === 'register') {
            setStep(0);
            const addr = async () => {
                const response = await apiBe.get(`/customer/${memberNo}/address`);
            }
        }

        setMounted(true);
    }, [type])
    
    if (mounted === false) return <Loading />
    return (
        <>
            <form className={`${styles.customers} ${styles[type]}`} onSubmit={handleSubmit(onSubmit)}>
                <h2 className={styles.sectionTitle}>고객사 정보</h2>
                <div className="columns-3 gap-36">
                    <div className={`${styles.memberNo} ${styles.inputGroup}`}>
                        <label htmlFor="memberNo" className="block text-sm font-medium text-gray-900 dark:text-black">고객사 번호:</label>
                        <input readOnly={true} type="text" id="memberNo" {...register("memberNo", { required: true })} defaultValue={memberNo}  />
                        {errors.memberNo && <span className={`${styles.errorMsg} text-red-500`}>필수 입력 항목 입니다</span>}
                        {type === 'edit' || type === 'register' ? <IconSearch className={styles.iconSearch}  onClick={() => openModal('customer')}/> : null}
                        {errors.memberNo && <span className={`${styles.errorMsg} text-red-500`}>필수 입력 항목 입니다</span>}
                    </div>
                    <div className={styles.inputGroup}>
                        <label htmlFor="memberName" className="block text-sm font-medium text-gray-900 dark:text-black">고객사 이름:</label>
                        <input readOnly={true} type="text" id="memberName" {...register("memberName", { required: true })} defaultValue={memberName} />
                        {errors.memberName && <span className={`${styles.errorMsg} text-red-500`}>필수 입력 항목 입니다</span>}
                    </div>
                    <div className={styles.inputGroup}>
                        <label htmlFor="memberType" className="block text-sm font-medium text-gray-900 dark:text-black">고객유형:</label>
                        <input readOnly={isDisabled} type="text" id="memberType" {...register("memberType", { required: true })} defaultValue={memberType} />
                        {errors.memberType && <span className={`${styles.errorMsg} text-red-500`}>필수 입력 항목 입니다</span>}
                    </div>
                </div>
                <div className="columns-3 gap-36">
                    <div className={styles.inputGroup}>
                        <label htmlFor="regionType" className="block text-sm font-medium text-gray-900 dark:text-black">리전타입:</label>
                        <Controller
                            name="regionType"
                            control={control}
                            defaultValue={defaultRegionType} // Set the default options
                            rules={{ required: true }}
                            render={({ field }) => (
                                <Select
                                    {...field}
                                    options={regionTypeOptions}
                                    isDisabled={isDisabled}
                                    menuPosition={'fixed'}
                                    value={regionTypeOptions.find((option: any) => option.value === field.value)} // Corrected this line
                                    onChange={(val) => field.onChange(val.value)}
                                />
                            )}
                        />
                        {errors.regionType && <span className={`${styles.errorMsg} text-red-500`}>필수 입력 항목 입니다</span>}
                    </div>
                    <div className={styles.inputGroup}>
                        <label htmlFor="industry" className="block text-sm font-medium text-gray-900 dark:text-black">산업분류:</label>
                        <input readOnly={isDisabled} type="text" id="industry" {...register("industry", { required: true })} defaultValue={industry} />
                        {errors.industry && <span className={`${styles.errorMsg} text-red-500`}>필수 입력 항목 입니다</span>}
                    </div>
                    <div className={styles.inputGroup}>
                        <label htmlFor="businessRegNo" className="block text-sm font-medium text-gray-900 dark:text-black">사업자번호:</label>
                        <input readOnly={isDisabled} type="text" id="businessRegNo" {...register("businessRegNo", { required: true },)} defaultValue={businessRegNo} placeholder="XXX-XX-XXXXXX 양식으로 입력해주세요"/>
                        {errors.businessRegNo && <span className={`${styles.errorMsg} text-red-500`}>필수 입력 항목 입니다</span>}
                    </div>
                </div>
                <div className="columns-3 gap-36">
                    <div className={styles.inputGroup}>
                        <label htmlFor="custCeo" className="block text-sm font-medium text-gray-900 dark:text-black">대표:</label>
                        <input readOnly={isDisabled} type="text" id="custCeo" {...register("custCeo", { required: true })} defaultValue={custCeo} />
                        {errors.custCeo && <span className={`${styles.errorMsg} text-red-500`}>필수 입력 항목 입니다</span>}
                    </div>
                    <div className={styles.inputGroup}>
                        <label htmlFor="custPhone" className="block text-sm font-medium text-gray-900 dark:text-black">고객 연락처:</label>
                        <input readOnly={isDisabled} type="text" id="custPhone" {...register("custPhone", { required: true })} defaultValue={custPhone} placeholder="010-1234-5678 양식으로 입력해주세요"/>
                        {errors.custPhone && <span className={`${styles.errorMsg} text-red-500`}>필수 입력 항목 입니다</span>}
                    </div>
                </div>
            

               
           
                <div className={`${styles.btnArea} mt-6 mx-auto`}>
                    {type === 'register' || type === 'edit' ? <Button type='submit' className='px-3.5 py-2.5 text-sm font-bold text-white shadow-sm hover:bg-gray-100 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white' skin='green'>{type === 'register' ? "등 록" : "저 장"}</Button> : <Button type='button' onClick={editMode} className='px-3.5 py-2.5 text-sm font-bold text-white shadow-sm hover:bg-gray-100 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white' skin='green'>수 정</Button>}
                    <Button type='button' className={styles.btnBack} onClick={goList} skin='gray'>취 소</Button>
                    {!addMember.custContact && member.custContact && member.custContact.length !== 0 ? <Button type='button' className={styles.btnAdd} onClick={() => addMembers('custContact')} skin={'gray'}>고객사 담당자 추가</Button> : null}
                    {!addMember.sales && member.sales && member.sales.userId !== '' ? <Button type='button' className={styles.btnAdd} onClick={() => addMembers('sales')} skin={'gray'}>고객 담당자 추가</Button> : null}
                  
                </div>
            </form>
            
            {step > 0 && <div className={styles.address}>
                {member.memberNo && <CustomersAddrForm type={"register"} memberNo={member.memberNo} mode={formType} data={member.address && member.address.length > 0 ? member.address[0] : null} />}
            </div>}
            {step > 1 && <div className={styles.custContact}>
                 <CustomersAddPerForm type={"custContact"} memberNo={member.memberNo} data={member.custContact && member.custContact.length !== 0 ? member.custContact[0] : null} mode={formType} />
            </div>}
            {step > 2 && <div className={styles.sales}>
                <CustomersAddPerForm type={"sales"} memberNo={member.memberNo} data={member.sales || null} mode={formType} />
                </div>}
            </>
    );
}

export default CustomersForm;
