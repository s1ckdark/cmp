import styles from './InfoSection.module.scss';
import React, { useEffect, useState } from 'react';
import { useRecoilValue } from 'recoil';
import { apiBe } from '@/services';
import { dataViewAtom } from '@/states/data'; // Import your Recoil state
interface InfoSectionProps {
    id: string;
    memberNo: string;
    memberName: string;
    regionType: string;
    memberType: string;
    industry: string;
    businessRegNo: string;
    custContact: any;
    sales: any;
    custCeo: string;
    custPhone: string;
    address: any;
    comment: string;
    regId: string;
    regDt: string;
    modId: string;
    modDt: string;
}
const goodusData = {
    "memberName": "굿어스데이터",
    "custCeo": "전상현",
    "businessRegNo": "679-81-01070",
    "custPhone": "070-7017-4200",
    "address": [{"addr":"서울시 강남구 테헤란로 44길 8","addrDetail":"아이콘 역삼빌딩 5층"}]
}
const InfoSection = ({ type, memberNo }: { type: string, memberNo?: string }) => {
    const invoice = useRecoilValue(dataViewAtom);
    const [ customer, setCustomer ] = useState<any>([]);
    const title = type === 'supply' ? '공급자' : '수신자';

    useEffect(() => {
        const fetching = async() => {
            const url = `/customer/${memberNo}`;
            const response = await apiBe.get(url);
            if(response.status === 200) setCustomer(response.data);
        }
        type === 'supply' ? setCustomer(goodusData):fetching();
    }, [type, memberNo])

    return (
        <div className={`${styles.infoSection}`}>
            <div className={`${type}__info`}>
                <hgroup>
                    <h1>{title}</h1>
                </hgroup>
                <div className={`${type}__info--name`}>
                    <label>상호명</label>
                    <span>{customer.memberName}</span>
                </div>
                <div className={`${type}__info--ceo`}>
                    <label>대표자</label>
                    <span>{customer.custCeo}</span>
                </div>
                <div className={`${type}__info--license`}>
                    <label>사업자 등록번호</label>
                    <span>{customer.businessRegNo}</span>
                </div>
                <div className={`${type}__info--address`}>
                    <label>주소</label>
                    <span>{customer.address ? customer.address[0].addr + ' '+  customer.address[0].addrDetail: '  '}</span>
                </div>
                <div className={`${type}__info--phone`}>
                    <label>전화</label>
                    <span>{customer.custPhone}</span>
                </div>
            </div>
        </div>
    );
};

export default InfoSection;
