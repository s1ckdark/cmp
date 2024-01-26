'use client';
import styles from './User.module.scss';
import Button from '@/components/Button';
import { useState } from 'react';
import { apiBe } from '@/services';
import { Toast } from '@/components/Toast';
import { useRecoilState } from 'recoil';
import { modalAtom } from '@/states';

const User = () => {
    const [keyword, setKeyword] = useState('');
    const [ modal, setModal ] = useRecoilState(modalAtom);
    const [data, setData] = useState([]);

    const onChange = (e: any) => {
        setKeyword(e.target.value);
    }

    const pickup = (email:string) => {
        setModal({
            ...modal,
            isOpen: false,
            data: {
                email: email
            },
        })
    }

    const onSearch = async() => {
        const url = '/user?username=' + keyword;
        const response = await apiBe.get(url);
        if (response.status === 200 || response.status === 201) {
            const { content } = response.data;
            setData(content);
        } else {
            Toast("error", '사용자가 존재하지 않습니다.');
        }
    }

    return ( 
        <div className={styles.user}>
            <div className={styles.serachInput}>
                <input type="text" placeholder="사용자 이름을 입력하세요." onChange={onChange} value={keyword} />
                <Button onClick={onSearch} skin={"green"}>검색</Button>
            </div>
            <div className={styles.userList}>
                {data.length > 0 && data.map((item: any) => (
                    <div className={styles.userItem} key={item.memberNo} onClick={()=> pickup(item.email)}>
                        <div className={styles.item}>{item.email}</div>
                    </div>
                ))}
            </div>
        </div>
    )
}

export default User;