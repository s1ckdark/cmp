import styles from './index.module.scss';
import React from 'react';

interface InfoSectionProps {
    type: 'supply' | 'client';
    name: string;
    ceo: string;
    license: string;
    address: string;
    phone: string;
}

const InfoSection: React.FC<InfoSectionProps> = ({ type, name, ceo, license, address, phone }) => {
    const title = type === 'supply' ? '공급자' : '수신자';

    return (
        <div className={`${styles.infoSection}`}>
            <div className={`${type}__info`}>
                <hgroup>
                    <h1>{title}</h1>
                </hgroup>
                <div className={`${type}__info--name`}>
                    <label>상호명</label>
                    <span>{name}</span>
                </div>
                <div className={`${type}__info--ceo`}>
                    <label>대표자</label>
                    <span>{ceo}</span>
                </div>
                <div className={`${type}__info--license`}>
                    <label>사업자 등록번호</label>
                    <span>{license}</span>
                </div>
                <div className={`${type}__info--address`}>
                    <label>주소</label>
                    <span>{address}</span>
                </div>
                <div className={`${type}__info--phone`}>
                    <label>전화</label>
                    <span>{phone}</span>
                </div>
            </div>
        </div>
    );
};

export default InfoSection;
