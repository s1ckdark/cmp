'use client';
import styles from './Customer.module.scss';
import Button from '@/components/Button';
import { useState } from 'react';
import { apiBe } from '@/services';
import { Toast } from '@/components/Toast';
import { useRecoilState } from 'recoil';
import { modalAtom } from '@/states';
import { modalListAtom } from '@/states/modal';

const Customer = () => {
    const [data, setData] = useRecoilState(modalListAtom);
    const [ modal, setModal ] = useRecoilState(modalAtom);
 

    const onChange = (e: any) => {
        setData({...data, keyword: e.target.value});
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
        // if (keyword === '') {
        //     Toast("error", '검색어를 입력해주세요.');
        //     return false;
        // }
            const response = await apiBe(url, { params: { memberName: data.keyword, page: data.currentPage } });
            if (response.status === 200 || response.status === 201) {
                const { data } = response;
                if (data.length === 0) {
                    Toast("error", '회사명이 존재하지 않습니다.');
                } else {
                    setData({...data, modalType: modal.type, data: data, totalPages: data.totalPages, currentPage: data.currentPage});
                }
            }
    }

    return ( 
        <div className={styles.customers}>
            <div className={styles.searchInput}>
                <input type="text" placeholder="고객사명을 입력하세요." onChange={onChange} value={data.keyword} />
                <Button onClick={onSearch} skin={"green"}>검색</Button>
            </div>
            <div className={styles.customerList}>
                <table>
                    <thead>
                        <tr>
                            <th>고객사명</th>
                            <th>고객사번호</th>
                        </tr>
                    </thead>
                    <tbody>
                        {data.data.length > 0 ? data.data.map((item: any) => (
                            <tr className={styles.customerItem} key={item.memberNo} onClick={() => pickup(item.memberNo, item.memberName)}>
                                <td className={styles.customerName}>{item.memberName}</td>
                                <td className={styles.customerNo}>{item.memberNo}</td>
                            </tr>
                        )):<tr><td colSpan={2}>검색 결과가 없습니다.</td></tr>}
                    </tbody>
                </table>
            </div>
        </div>
    )
}

export default Customer;