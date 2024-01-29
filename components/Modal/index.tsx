'use client';
import styles from './index.module.scss';
import Button from '../Button';
import { useState } from 'react';
import { useRecoilState } from 'recoil';
import { modalAtom } from '@/states/'; 
import { modalProps } from '@/types';
import Customer from '@/components/Modal/Customer';
import Address from '@/components/Modal/Address';
const Modal = () => {
    const [modal, setModal] = useRecoilState<modalProps>(modalAtom);
    const { isOpen, type } = modal;

    const onClose = () => {
        setModal({
            ...modal,
            isOpen: false,
            type: ''
        })
    }

    const onTitle = (type: string) => {
        console.log(type);
        switch (type) {
            case "address":
                return "주소지 정보";
            case "sales":
                return "담당 영업 정보";
            case "contact":
                return "고객사 담당자 정보";
            case "member":
                return "회사 정보";
            case "user":
                return "사용자 정보";
            case "customer":
                return "고객사 정보";
            default:
                return "담당자";
        }
    }

    const renderModal = () => {
        switch (type) {
            case "customer":
                return <Customer />;
            case "address":
                return <Address />;
            default:
                return;
        }
    }


    return (
        <>
        { isOpen && (
            <div className={styles.modal}>
                <div className={`${styles.modalContent} ${styles[type]}`}>
                    <button onClick={onClose} className={styles.closeModalBtn}>&times;</button>
                    <div className={styles.modalHeader}>
                        <h2>{onTitle(type)}</h2>
                    </div>
                    <div className={styles.modalBody}>
                            {renderModal()}
                    </div>
                    <div className={styles.modalFooter}>
                        {/* <Button onClick={onClose} skin={"green"}>닫기</Button> */}
                    </div>
                </div>
            </div>
        )}
        </>
    )
}
export default Modal;