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

    const pickup = (email:string, name:string) => {
        setModal({
            ...modal,
            isOpen: false,
            data: {
                email: email,
                name: name
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
            <div className={styles.searchInput}>
                <input type="text" placeholder="사용자 이름을 입력하세요." onChange={onChange} value={keyword} />
                <Button onClick={onSearch} skin={"green"}>검색</Button>
            </div>
            <div className={styles.userList}>
                <table>
                    <thead>
                        <tr>
                            <th>이메일</th>
                            <th>사용자 이름</th>
                        </tr>
                    </thead>
                    <tbody>
                        {data && data.length > 0 && data.map((item: any) => (
                            <tr className={styles.userItem} key={item.memberNo} onClick={()=> pickup(item.email, item.userFullName)}>
                                <td>{item.email}</td>
                                <td>{item.userFullName}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    )
}

export default User;