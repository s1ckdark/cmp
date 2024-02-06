'use client';
import styles from './CustomersAddrForm.module.scss';
import Button from '../Button';
import { useForm } from 'react-hook-form';
import { useEffect, useState } from 'react';
import { apiBe } from '@/services';
import { modalAtom } from '@/states';
import Modal from '@/components/Modal'
import { useRecoilState } from 'recoil';
import { IconSearch } from '@/public/svgs';
import { Toast } from '@/components/Toast';
import { customerStep } from '@/states/data';
import { IaddrData } from '@/types/data';
import { set } from 'lodash';
interface ICustomersAddrForm {
    type: string;
    memberNo: string;
    mode: string;
    data: any;
}


const CustomersAddrForm = ({ type, memberNo, mode, data }: ICustomersAddrForm) => {
    const [step, setStep] = useRecoilState(customerStep);
    // const [ addrData, setAddrData ] = useState<IaddrData | null>(data); // addrData[0
    const [modal, setModal] = useRecoilState(modalAtom);
    const [isDisabled, setIsDisabled] = useState(false);
    const { id, name, zipcode, addr, addrDetail }: IaddrData = data ? data: { id:'', name: '', zipcode:'', addr: '', addrDetail: '' };
    const { register: registerAddr, setValue, handleSubmit: handleSubmitAddr, formState: { errors: errorsAddr } } = useForm({
        defaultValues: {
            id: id,
            memberNo: memberNo,
            name: name,
            zipcode: zipcode,
            addr: addr,
            addrDetail: addrDetail
        }
    });

    const onSubmitAddr = async (data: any) => {
        console.log(mode);
        const url = mode === 'register' ? '/customer/' + memberNo + '/address' : '/customer/' + memberNo + '/address/' + id;
        const response = mode === 'register' ? await apiBe.put(url, data):await apiBe.post(url, data);
        if (response.status === 200 || response.status === 201) {   
            if (mode === 'register') { Toast("success", '저장이 완료되었습니다.', () => setStep(2)) } else { Toast("success", '수정이 완료되었습니다.') }
        } else {
            Toast("error", '저장이 실패하였습니다. 확인부탁드립니다.')
        }
        
    }

    // const renderAddr = () => {
    //     if (typeof addrData === 'object' && addrData.length > 0) {
    //         addrData.map((item: any) => (
    //             <div className={styles.addrItem} key={item.id}>
    //                 <div className={styles.addrName}>{item.name}</div>
    //                 <div className={styles.addrZipcode}>{item.zipcode}</div>
    //                 <div className={styles.addr}>{item.addr}</div>
    //                 <div className={styles.addrDetail}>{item.addrDetail}</div>
    //             </div>
    //         ))
    //     }
    // }

    const openModal = (type: string) => {
        setModal({
            isOpen: true,
            type: "address",
            data: null
        })
    }
    useEffect(() => {
        if (modal.data?.zipcode && modal.data?.addr) {
            setValue('zipcode', modal.data.zipcode);
            setValue('addr', modal.data.addr);
        }
    }, [modal]);

    // useEffect(() => {
    //     const getAddr = async (memberNo: string) => {
    //         const response = await apiBe.get(`/customer/${memberNo}/address`);
    //         const { data } = response;
    //         if (response.status === 200 && data.length > 0) {
    //             setValue('id', data[0].id);
    //             setValue('name', data[0].name);
    //             setValue('zipcode', data[0].zipcode);
    //             setValue('addr', data[0].addr);
    //             setValue('addrDetail', data[0].addrDetail);
    //         } else {
    //             setAddrData({
    //                 id: '',
    //                 name: '',
    //                 zipcode: '',
    //                 addr: '',
    //                 addrDetail: ''
    //             });
    //         }
    //     }
    //     if(mode === "edit" || mode === "view") getAddr(memberNo);
    //     if(mode === "view") setIsDisabled(true);
    // }, [memberNo]);
    useEffect(() => {
        if (mode === "view") setIsDisabled(true);
    
    }, [type])


    return (
        <>
            <form className={styles.addressForm} onSubmit={handleSubmitAddr(onSubmitAddr)}>
                <div className="columns-4 gap-12">
                <div className={styles.inputGroup}>
                    <label htmlFor="name" className="block text-sm font-medium text-gray-900 dark:text-black">주소지명</label>
                        <input readOnly={isDisabled} type="text" id="name" {...registerAddr("name", {required: true})} defaultValue={name} />
                    {errorsAddr.name && <span className={`${styles.errorMsg} text-red-500`}>필수 입력 항목 입니다</span>}
                </div>
                    <div className={styles.inputGroup}>
                        <label htmlFor="zipcode" className="block text-sm font-medium text-gray-900 dark:text-black">우편 번호:</label>
                        <input readOnly={true} type="text" id="zipcode" {...registerAddr("zipcode", {required: true})} defaultValue={zipcode} />
                        {mode === 'edit' || mode === 'register' ? <IconSearch className={styles.iconSearch} onClick={() => openModal('address')} /> : null}
                        {errorsAddr.zipcode && <span className={`${styles.errorMsg} text-red-500`}>필수 입력 항목 입니다</span>}
                    </div>
                    <div className={styles.inputGroup}>
                        <label htmlFor="addr" className="block text-sm font-medium text-gray-900 dark:text-black">주소:</label>
                        <input readOnly={true} type="text" id="addr" {...registerAddr("addr", {required: true})} defaultValue={addr} />
                        {errorsAddr.addr && <span className={`${styles.errorMsg} text-red-500`}>필수 입력 항목 입니다</span>}
                    </div>
                    <div className={styles.inputGroup}>
                        <label htmlFor="addrDetail" className="block text-sm font-medium text-gray-900 dark:text-black">상세 주소:</label>
                        <input readOnly={isDisabled} type="text" id="addrDetail" {...registerAddr("addrDetail")} defaultValue={addrDetail} />
                        {/* {errorsAddr.addrDetail && <span className={`${styles.errorMsg} text-red-500`}>필수 입력 항목 입니다</span>} */}
                    </div>
                </div>
                <Button type="submit" skin={"green"}>저장</Button>
            </form>
        </>
    )
}
export default CustomersAddrForm;