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

interface ICustomersAddrForm {
    type: string;
    memberNo: string;
}

interface IAddrData {
    id: string;
    name: string;
    zipcode: string;
    addr: string;
    addrDetail: string;
}

const CustomersAddrForm = ({ type, memberNo }: ICustomersAddrForm) => {
    const [addrData, setAddrData] = useState<any[]>([]);
    const [modal, setModal] = useRecoilState(modalAtom);
    const [isDisabled, setIsDisabled] = useState(false);
    const [address, setAddress] = useState({});
    const { id, name, zipcode, addr, addrDetail }: IAddrData = addrData.length > 0 ? addrData[0] : { id: '', name: '', zipcode:'', addr: '', addrDetail: '' };
    const { register: registerAddr, handleSubmit: handleSubmitAddr, formState: { errors: errorsAddr } } = useForm({
        defaultValues: {
            name: '',
            zipcode: modal?.data?.zipNo ? modal?.data?.zipNo : '',
            addr: modal?.data?.roadAddrPart1 ? modal?.data?.roadAddrPart1 : '',
            addrDetail: ''
        }
    });

    const onSubmit = async(data: any) => {
        const url = '/customer/' + memberNo + '/address';
        let tmp = [];
        const response = await apiBe.put(url, data);
        if (response.status === 200 || response.status === 201) {   
            tmp.push(response.data);
            setAddrData(tmp);
        } else {
            Toast("error", '저장이 실패하였습니다. 확인부탁드립니다.')
        }
        
    }

    const renderAddr = () => {
        if (typeof addrData === 'object' && addrData.length > 0) {
            addrData.map((item: any) => (
                <div className={styles.addrItem} key={item.id}>
                    <div className={styles.addrName}>{item.name}</div>
                    <div className={styles.addrZipcode}>{item.zipcode}</div>
                    <div className={styles.addr}>{item.addr}</div>
                    <div className={styles.addrDetail}>{item.addrDetail}</div>
                </div>
            ))
        }
    }

    const openModal = (type: string) => {
        setModal({
            isOpen: true,
            type: "address",
            data: null
        })
    }
    useEffect(() => {
        const getAddr = async () => {
            const response = await apiBe.get(`/customers/${memberNo}/address`);
            const { data } = response;
            if (response.status === 200 && data.length > 0) {
                setAddrData(data);
            } else {
                setAddrData([]);
            }
        }
    }, [memberNo]);


    return (
        <>
            <form className={styles.addressForm} onSubmit={handleSubmitAddr(onSubmit)}>
                <div className="columns-4 gap-12">
                <div className={styles.inputGroup}>
                    <label htmlFor="name" className="block text-sm font-medium text-gray-900 dark:text-black">주소지명</label>
                    <input type="text" id="name" {...registerAddr("name")} defaultValue={name} />
                    {errorsAddr.name && <span className="text-red-500">This field is required</span>}
                </div>
                    <div className={styles.inputGroup}>
                        <label htmlFor="zipcode" className="block text-sm font-medium text-gray-900 dark:text-black">우편 번호:</label>
                        <input type="text" id="zipcode" {...registerAddr("zipcode")} defaultValue={zipcode} />
                        {type === 'edit' || type === 'register' ? <IconSearch className={styles.iconSearch} onClick={() => openModal('address')} /> : null}
                        {errorsAddr.zipcode && <span className="text-red-500">This field is required</span>}
                    </div>
                    <div className={styles.inputGroup}>
                        <label htmlFor="addr" className="block text-sm font-medium text-gray-900 dark:text-black">주소:</label>
                        <input readOnly={isDisabled} type="text" id="addr" {...registerAddr("addr")} defaultValue={addr} />
                        {errorsAddr.addr && <span className="text-red-500">This field is required</span>}
                    </div>
                    <div className={styles.inputGroup}>
                        <label htmlFor="addrDetail" className="block text-sm font-medium text-gray-900 dark:text-black">상세 주소:</label>
                        <input readOnly={isDisabled} type="text" id="addrDetail" {...registerAddr("addrDetail")} defaultValue={addrDetail} />
                        {errorsAddr.addrDetail && <span className="text-red-500">This field is required</span>}
                    </div>
                </div>
                <Button type="submit" skin={"green"}>저장</Button>
            </form>
        </>
    )
}
export default CustomersAddrForm;