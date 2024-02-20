'use client';
import React, { useEffect, useState, useCallback, }from 'react';
import { useForm, FormProvider } from 'react-hook-form';
import { apiBe } from '@/services';
import styles from './CustomersForm.module.scss';
import { Toast } from '@/components/Toast';
import { useRecoilState } from 'recoil';
import { ICustomersForm } from '@/types/form';
import { modalAtom } from '@/states';
import { usePathname, useRouter } from 'next/navigation';
import _ from 'lodash';

import { pageTypeAtom } from '@/states/data';
import Loading from '@/components/Loading';
import Button from '@/components/Button';
import CustomerAddForm from './CustomerAddForm';
import CustomersAddPerForm from './CustomersAddPerForm';
import CustomersAddrForm from './CustomersAddrForm';

interface ICustomersFormProps {
    data?: ICustomersForm;
    type: "register" | "edit" | "view";
}

// useFormContext 와 FormProvider로 component input type을 정의하고, submit하는 경우 값을 한번에 받아올 수 있게 작업한다.
const CustomersForm = ({ type }: ICustomersFormProps) => {
    const [mounted, setMounted] = useState(false);
    const [modal, setModal] = useRecoilState(modalAtom);    
    const [ pageType, setPageType ] = useRecoilState(pageTypeAtom);
    const [regionTypeOptions, setRegionTypeOptions] = useState<any>([]);
    const [defaultRegionType, setDefaultRegionType] = useState<any>([]);
    const [member, setMember] = useState<any>({});
    const pathname = usePathname();
    const { memberNo, memberName, regionType, memberType, industry, businessRegNo, custCeo, custPhone, comment, custContact, address, sales } = member;
    const methods = useForm({
        defaultValues:{
            "memberNo": memberNo,
            "memberName": memberName,
            "regionType": regionType,
            "memberType": memberType,
            "industry": industry,
            "businessRegNo": businessRegNo,
            "custCeo": custCeo,
            "custPhone": custPhone,
            "comment": comment,
            "custContact": [
              {
                "dept": custContact && custContact[0] ? custContact[0].dept:"",
                "name": custContact && custContact[0] ? custContact[0].name:"",
                "mobileNo": custContact && custContact[0] ? custContact[0].mobileNo:"",
                "email": custContact && custContact[0] ? custContact[0].email:"",
                "comment": custContact && custContact[0] ? custContact[0].comment:""
              }
            ],
            "address": [
              {
                "name": address && address[0] ? address[0].name:"",
                "zipcode": address && address[0] ? address[0].zipcode:"",
                "addr": address && address[0] ? address[0].addr:"",
                "addrDetail": address && address[0] ? address[0].addrDetail:"",
                "homepage": ""
              }
            ],
            "sales": [
                {
              "dept": sales && sales[0] ? sales[0].dept:"",
              "userId": sales && sales[0] ? sales[0].userId:"",
              "name": sales && sales[0] ? sales[0].name:"",
              "phoneNo": sales && sales[0] ? sales[0].phoneNo:"",
              "email": sales && sales[0] ? sales[0].email:"",
              "comment": sales && sales[0] ? sales[0].comment:"" 
            }
            ]
          }
    });
    const { control, register, handleSubmit, getValues, setValue, reset, formState: { errors } } = methods;
    
    const router = useRouter();

    const onSubmit = async (formData: any) => {
        let tmp = _.cloneDeep(formData);
        tmp.sales = tmp.sales[0];
       
        const response = type === 'register' ? await apiBe.put(`/customer/c`, tmp) : await apiBe.post(`/customer/c`, tmp);
        if (response.status === 201 || response.status === 200) {
            const { data } = response;
            if(type === 'register') Toast("success", '고객사 정보가 저장 되었습니다.', ()=> goList());
            if(type === 'edit') Toast("success", '고객사 정보가 저장 되었습니다.', ()=> goList());
        } else {
            Toast("error", '이미 고객사 정보가 존재합니다.')
        }
    };

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
        const memberNo = _.last(_.split(pathname, '/'))
        const getMember = async () => {
            const response = await apiBe.get(`/customer/${memberNo}`);
            if (response.status === 200 && response.data !== null) {
                const { data } = response;
                var tmp = _.cloneDeep(data);
                tmp.sales = [tmp.sales];
                setMember(tmp);
                reset(tmp);

                
            } else if(response.status === 404){
                setValue('memberNo', memberNo);
            }
        }
        if (type === 'view' || type === 'edit') {
            getMember()
        }
        setMounted(true);
    }, [type])
    
    if (mounted === false) return <Loading />
    return (
        <>
            <FormProvider {...methods}>
                <form className={`${styles.customers} ${styles[type]}`} onSubmit={methods.handleSubmit(onSubmit)}>
                    <div className={styles.customer}>
                        <CustomerAddForm data={member || null} pageType={type}/>
                    </div>
                    <div className={styles.address}>
                        <CustomersAddrForm  data={member.addr || null} pageType={type}/>
                    </div> 
                    <div className={styles.custContact}>
                        <CustomersAddPerForm type={"custContact"} data={member.custContact || null} pageType={type}/>
                    </div> 
                    <div className={styles.sales}>
                        <CustomersAddPerForm type={"sales"} data={member.sales || null} pageType={type}/>
                    </div> 
                    <div className={`${styles.btnArea} mt-6 mx-auto`}>
                        {type === 'register' || type === 'edit' ? <Button type='submit' className='px-3.5 py-2.5 text-sm font-bold text-white shadow-sm hover:bg-gray-100 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white' skin='green'>{type === 'register' ? "등 록" : "저 장"}</Button> : <Button type='button' onClick={editMode} className='px-3.5 py-2.5 text-sm font-bold text-white shadow-sm hover:bg-gray-100 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white' skin='green'>수 정</Button>}
                        <Button type='button' className={styles.btnBack} onClick={goList} skin='gray'>취 소</Button>
                    </div>
                </form>
            </FormProvider>
        </>
    );
}

export default CustomersForm;
