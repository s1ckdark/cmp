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
import { addrAtom } from '@/states/data';
import { IaddrData } from '@/types/data';
interface ICustomersAddrForm {
    type: string;
    memberNo: string;
    mode: string;
}


const CustomersAddrForm = ({ type, memberNo, mode }: ICustomersAddrForm) => {
    const [addrData, setAddrData] = useRecoilState(addrAtom);
    const [modal, setModal] = useRecoilState(modalAtom);
    const [isDisabled, setIsDisabled] = useState(false);
    const { id, name, zipcode, addr, addrDetail }: IaddrData = addrData ? addrData : { id: '', name: '', zipcode:'', addr: '', addrDetail: '' };
    // const { register: registerAddr, setValue, handleSubmit: handleSubmitAddr, formState: { errors: errorsAddr } } = useForm({
    //     defaultValues: {
    //         id:'',
    //         name: '',
    //         zipcode: modal.data.zipcode ? modal.data.zipcode: '',
    //         addr: modal.data.addr ? modal.data.addr : '',
    //         addrDetail: ''
    //     }
    // });

    const onSubmit = async(data: any) => {
        const url = '/customer/' + memberNo + '/address';
        let tmp = [];
        const response = await apiBe.put(url, data);
        if (response.status === 200 || response.status === 201) {   
            tmp.push(response.data);
            setAddrData(tmp[0]);
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
    const onChangeAddr = (e: any) => {
        const { id, value } = e.target;
        setAddrData({
            ...addrData,
            [id]: value
        })
    }

    const openModal = (type: string) => {
        setModal({
            isOpen: true,
            type: "address",
            data: null
        })
    }
    useEffect(() => {
        console.log(modal);
        setAddrData({...addrData, 'zipcode':modal.data?.zipcode, 'addr': modal.data?.addr});
    }, [modal]);

    useEffect(() => {
        const getAddr = async (memberNo: string) => {
            const response = await apiBe.get(`/customer/${memberNo}/address`);
            const { data } = response;
            if (response.status === 200 && data.length > 0) {
                setAddrData(data[0]);
            } else {
                setAddrData({
                    id: '',
                    name: '',
                    zipcode: '',
                    addr: '',
                    addrDetail: ''
                });
            }
        }
        if(mode === "edit" || mode === "view") getAddr(memberNo);
        if(mode === "view") setIsDisabled(true);
    }, [memberNo]);


    return (
        <>
            <div className={styles.addressForm}>
                <div className="columns-4 gap-12">
                <div className={styles.inputGroup}>
                    <label htmlFor="name" className="block text-sm font-medium text-gray-900 dark:text-black">주소지명</label>
                    <input type="text" id="name" onChange={(e)=>onChangeAddr(e)} value={addrData.name} />
                    {/* {errorsAddr.name && <span className="text-red-500">This field is required</span>} */}
                </div>
                    <div className={styles.inputGroup}>
                        <label htmlFor="zipcode" className="block text-sm font-medium text-gray-900 dark:text-black">우편 번호:</label>
                        <input type="text" id="zipcode" onChange={(e)=>onChangeAddr(e)} value={addrData.zipcode} />
                        {type === 'edit' || type === 'register' ? <IconSearch className={styles.iconSearch} onClick={() => openModal('address')} /> : null}
                        {/* {errorsAddr.zipcode && <span className="text-red-500">This field is required</span>} */}
                    </div>
                    <div className={styles.inputGroup}>
                        <label htmlFor="addr" className="block text-sm font-medium text-gray-900 dark:text-black">주소:</label>
                        <input readOnly={isDisabled} type="text" id="addr" onChange={(e)=>onChangeAddr(e)} value={addrData.addr} />
                        {/* {errorsAddr.addr && <span className="text-red-500">This field is required</span>} */}
                    </div>
                    <div className={styles.inputGroup}>
                        <label htmlFor="addrDetail" className="block text-sm font-medium text-gray-900 dark:text-black">상세 주소:</label>
                        <input readOnly={isDisabled} type="text" id="addrDetail" onChange={(e)=>onChangeAddr(e)} value={addrData.addrDetail} />
                        {/* {errorsAddr.addrDetail && <span className="text-red-500">This field is required</span>} */}
                    </div>
                </div>
                {/* <Button type="button" skin={"green"} onClick={()=> handleSubmitAddr(onSubmit)}>저장</Button> */}
            </div>
        </>
    )
}
export default CustomersAddrForm;