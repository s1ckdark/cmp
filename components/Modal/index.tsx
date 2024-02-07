'use client';
import styles from './index.module.scss';
import Button from '../Button';
import { useState } from 'react';
import { useRecoilState } from 'recoil';
import { modalAtom } from '@/states/'; 
import { modalProps } from '@/types';
import Customer from '@/components/Modal/Customer';
import Address from '@/components/Modal/Address';
import User from '@/components/Modal/User';
import ProdType from '@/components/Modal/ProductType';

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
                break;
            case "sales":
                return "담당 영업 정보";
                break;
            case "contact":
                return "고객사 담당자 정보";
                break;
            case "member":
                return "회사 정보";
                break;
            case "user":
                return "사용자 정보";
                break;
            case "customer":
                return "고객사 정보";
                break;
            case "prodType":
                return "상품분류 정보";
                break;
            default:
                return "담당자";
                break;
        }
    }

    const renderModal = () => {
        switch (type) {
            case "customer":
                return <Customer />;
                break;
            case "address":
                return <Address />;
                break;
            case "user":
                return <User />;
                break;
            case "prodType":
                return <ProdType />;
                break;
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