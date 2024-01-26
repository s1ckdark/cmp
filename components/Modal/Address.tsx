'use client';
import styles from './Address.module.scss';
import Button from '@/components/Button';
import { useState } from 'react';
import { apiBe } from '@/services';
import { Toast } from '@/components/Toast';
import { useRecoilState } from 'recoil';
import { modalAtom } from '@/states';

const Address = () => {
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
        const url = `https://business.juso.go.kr/addrlink/addrLinkApi.do?currentPage=1&countPerPage=10&keyword=${keyword}&confmKey=${process.env.NEXT_PUBLIC_JUSO_API_KEY}&resultType=json`;
        const response = await fetch(url);
        const { results} = await response.json();
        if (results.juso != null) {
            setData(results.juso);
        } else {
            Toast("error", '주소가 존재하지 않습니다.');
        }
    }

    return ( 
        <div className={styles.address}>
            <div className={styles.serachInput}>
                <input type="text" placeholder="주소를 입력하세요." onChange={onChange} value={keyword} />
                <Button onClick={onSearch} skin={"green"}>검색</Button>
            </div>
            <div className={styles.addressList}>
                {data.length > 0 && data.map((item: any) => (
                    <div className={styles.addressItem} key={item.memberNo} onClick={()=> pickup(item.zipNo, item.roadAddrPart1)}>
                        <div className={styles.addressRow} data-zipcode={item.zipNo} data-addr={item.roadAddrPart1} data-addrDetail={item.jibunAddr}>{item.roadAddrPart1}</div>
                    </div>
                ))}
            </div>
        </div>
    )
}

export default Address;