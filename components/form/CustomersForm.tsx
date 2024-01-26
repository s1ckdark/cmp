'use client';
import React from 'react';
import { useForm, Controller } from 'react-hook-form';
import { apiBe } from '@/services';
import styles from './CustomersForm.module.scss';
import Button from '@/components/Button';
import { Toast } from '@/components/Toast';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Select, { defaultTheme } from 'react-select';
import { useRecoilState } from 'recoil';
import Loading from '@/components/Loading';
import { ICustomersForm } from '@/types/form';
import CustomersAddPerForm from './CustomersAddPerForm';
import CustomersAddrForm from './CustomersAddrForm';
import { IconSearch } from '@/public/svgs';
import { modalAtom } from '@/states';
import Modal from '@/components/Modal';

interface ICustomersFormProps {
    data?: ICustomersForm;
    type: "register" | "edit" | "view";
}

interface IaddrData {
    name: string;
    zipcode: string;
    addr: string;
    addrDetail: string;
}

const CustomersForm = ({ data, type }: ICustomersFormProps) => {
    const [mounted, setMounted] = useState(false);
    const [ modal, setModal ] = useRecoilState(modalAtom);
    const [isDisabled, setIsDisabled] = useState(false);
    const [regionTypeOptions, setRegionTypeOptions] = useState<any>([]);
    const [defaultRegionType, setDefaultRegionType] = useState<any>([]);
    const [ member, setMember ] = useState<any>({memberNo: '', memberName: '', regionType: '', memberType: '', industry: '', businessRegNo: '', custCeo: '', custPhone: '', comment: ''});
    const [addrData, setAddrData] = useState<IaddrData>();
    const { memberNo, memberName, regionType, memberType, industry, businessRegNo, custCeo, custPhone, comment  } = data ? data : { memberNo: modal.data?.memberNo, memberName: modal.data?.memberName, regionType: '', memberType: '일반', industry: '', businessRegNo: '', custCeo: '', custPhone: '', comment: '' };
    
    const { control, register, handleSubmit, getValues, setValue, setError, formState: {errors} } = useForm({
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
   
    const router = useRouter();
    const onSubmit = async(formData: any) => {
        const response = await apiBe.put(`/customer`, formData);
        if (response.status === 201) {
            const { data } = response;
            setMember(data);
            Toast("success", '고객사 정보가 저장 되었습니다.');
        } else {
            Toast("error", '고객사 정보 저장에 실패하였습니다.')
        }
    };

    const openModal = (type:string) => {
        setModal({isOpen: true, type: type,data:null});
}


    const editMode = () => {
       router.push(`./edit`);
    }

    useEffect(() => {
        console.log(type);
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
                        <input readOnly={isDisabled} type="text" id="memberNo" {...register("memberNo")} defaultValue={memberNo} />
                        {errors.memberNo && <span className="text-red-500">This field is required</span>}
                        {type === 'edit' || type === 'register' ? <IconSearch className={styles.iconSearch}  onClick={() => openModal('customer')} />:null}
                            {errors.memberNo && <span className="text-red-500">This field is required</span>}
                    </div>
                    <div className={styles.inputGroup}>
                        <label htmlFor="memberName" className="block text-sm font-medium text-gray-900 dark:text-black">고객사 이름:</label>
                        <input readOnly={isDisabled} type="text" id="memberName" {...register("memberName")} defaultValue={memberName} />
                        {errors.memberName && <span className="text-red-500">This field is required</span>}
                    </div>
                    <div className={styles.inputGroup}>
                        <label htmlFor="memberType" className="block text-sm font-medium text-gray-900 dark:text-black">고객유형:</label>
                        <input type="text" id="memberType" {...register("memberType")} defaultValue={memberType} />
                        {errors.memberType && <span className="text-red-500">This field is required</span>}
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
                                    value={regionTypeOptions.find((option:any) => option.value === field.value)} // Corrected this line
                                    onChange={(val) => field.onChange(val.value)}
                                />
                            )}
                        />
                        {errors.regionType && <span className="text-red-500">This field is required</span>}
                    </div>
                    <div className={styles.inputGroup}>
                        <label htmlFor="industry" className="block text-sm font-medium text-gray-900 dark:text-black">산업분류:</label>
                        <input type="text" id="industry" {...register("industry")} defaultValue={industry} />
                        {errors.industry && <span className="text-red-500">This field is required</span>}
                    </div>
                    <div className={styles.inputGroup}>
                        <label htmlFor="businessRegNo" className="block text-sm font-medium text-gray-900 dark:text-black">사업자번호:</label>
                        <input type="text" id="businessRegNo" {...register("businessRegNo")} defaultValue={businessRegNo} />
                        {errors.businessRegNo && <span className="text-red-500">This field is required</span>}
                    </div>
                </div>
                <div className="columns-3 gap-36">
                    <div className={styles.inputGroup}>
                        <label htmlFor="custCeo" className="block text-sm font-medium text-gray-900 dark:text-black">대표:</label>
                        <input type="text" id="custCeo" {...register("custCeo")} defaultValue={custCeo} />
                        {errors.custCeo && <span className="text-red-500">This field is required</span>}
                    </div>
                    <div className={styles.inputGroup}>
                        <label htmlFor="custPhone" className="block text-sm font-medium text-gray-900 dark:text-black">고객 연락처:</label>
                        <input type="text" id="custPhone" {...register("custPhone")} defaultValue={custPhone} />
                        {errors.custPhone && <span className="text-red-500">This field is required</span>}
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
                            skin='green'>등 록</Button> : null}
                        <Button type='button' className={styles.btnBack} onClick={() => router.back()} skin={'gray'}>{type === 'register' || type === 'edit' ? "취소" : "목록"}</Button>
                </div>
            </form>

            {member.memberNo && <CustomersAddrForm type={"register"} memberNo={member.memberNo} />}
            {member.memberNo && <CustomersAddPerForm type={"custContact"} memberNo={member.memberNo}  data={member.custContact || null} />}
            {member.memberNo && <CustomersAddPerForm type={"sales"} memberNo={member.memberNo} data={member.sales || null} />}

            </>
    );
}

export default CustomersForm;
