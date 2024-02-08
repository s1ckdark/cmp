'use client';
import styles from './Member.module.scss';
import Button from '@/components/Button';
import { useState } from 'react';
import { apiBe } from '@/services';
import { Toast } from '@/components/Toast';
import { useRecoilState } from 'recoil';
import { modalAtom } from '@/states';

const Member = () => {
    const [keyword, setKeyword] = useState('');
    const [ modal, setModal ] = useRecoilState(modalAtom);
    const [data, setData] = useState([]);

    const onChange = (e: any) => {
        setKeyword(e.target.value);
    }

    const pickup = (zipNo:string, roadAddrPart1:string) => {
        setModal({
            ...modal,
            isOpen: false,
            data: {
                zipNo: zipNo,
                roadAddrPart1: roadAddrPart1
            },
        })
    }

    const onSearch = async() => {
        const url = '/customer';
        // if (keyword === '') {
        //     Toast("error", '검색어를 입력해주세요.');
        //     return false;
        // }
        const response = await apiBe(url, { params: { memberName: keyword } });
        if (response.status === 200 || response.status === 201) {
            const result = response.data;
            let customers = result.content;
            if (customers.length === 0) {
                Toast("error", '회사명이 존재하지 않습니다.');
            } else {
                setData(customers);
            }
        }
    }

    return ( 
        <div className={styles.member}>
            <div className={styles.serachInput}>
                <input type="text" placeholder="주소를 입력하세요." onChange={onChange} value={keyword} />
                <Button onClick={onSearch} skin={"green"}>검색</Button>
            </div>
            <div className={styles.memberList}>
                {data.length > 0 && data.map((item: any) => (
                    <div className={styles.memberItem} key={item.memberNo} onClick={() => pickup(item.zipNo, item.roadAddrPart1)}>
                        <div className={styles.item} data-memberno={item.memberNo} data-membername={item.memberName}><p>{item.memberNo}</p><p>${item.memberName}</p></div>
                    </div>
                ))}
            </div>
        </div>
    )
}

export default Member;