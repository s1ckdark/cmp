'use client';
import styles from './Customer.module.scss';
import Button from '@/components/Button';
import { useState } from 'react';
import { apiBe } from '@/services';
import { Toast } from '@/components/Toast';
import { useRecoilState } from 'recoil';
import { modalAtom } from '@/states';

const Customer = () => {
    const [keyword, setKeyword] = useState('');
    const [ modal, setModal ] = useRecoilState(modalAtom);
    const [data, setData] = useState([]);

    const onChange = (e: any) => {
        setKeyword(e.target.value);
    }

    const pickup = (memberNo: string, memberName: string) => {
        setModal({
            ...modal,
            isOpen: false,
            data: {
                memberNo: memberNo,
                memberName: memberName
            },
        })
    }

    const onSearch = async() => {
        const url = '/common/code/msp-customer-search';
        const response = await apiBe(url, { params: { memberName: keyword } });
        if (response.status === 200 || response.status === 201) {
            const { data }= response;
            if (data.length === 0) {
                Toast("error", '회사명이 존재하지 않습니다.');
            } else {
                setData(data);
            }
        }
    }

    return ( 
        <div className={styles.customers}>
            <div className={styles.serachInput}>
                <input type="text" placeholder="고객사명을 입력하세요." onChange={onChange} value={keyword} />
                <Button onClick={onSearch} skin={"green"}>검색</Button>
            </div>
            <div className={styles.customerList}>
                {data.length > 0 && data.map((item: any) => (
                    <div className={styles.customerItem} key={item.memberNo} onClick={()=> pickup(item.memberNo, item.memberName)}>
                        <div className={styles.customerName}>{item.memberName}</div>
                        <div className={styles.customerNo}>{item.memberNo}</div>
                    </div>
                ))}
            </div>
        </div>
    )
}

export default Customer;