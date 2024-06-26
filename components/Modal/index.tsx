"use client";
import styles from "./index.module.scss";
import Button from "../Button";
import { useState, useEffect } from "react";
import { useRecoilState, useResetRecoilState } from "recoil";
import { modalAtom } from "@/states/";
import { modalProps } from "@/types";
import Pagination from "@/components/Pagination";
import { modalListAtom } from "@/states/modal";
import { apiBe } from "@/services";
import { Toast } from "@/components/Toast";
import { set } from "lodash";

import Customer from "@/components/Modal/Customer";
import Address from "@/components/Modal/Address";
import User from "@/components/Modal/User";
import ProdType from "@/components/Modal/ProductType";
import Member from "@/components/Modal/Member";
import Product from "@/components/Modal/Product";

const Modal = () => {
    const [modal, setModal] = useRecoilState<modalProps>(modalAtom);
    const [modalList, setModalList] = useRecoilState(modalListAtom);
    const resetModalList = useResetRecoilState(modalListAtom);
    const { isOpen, type } = modal;
    const { modalType, keyword, data, totalPages, currentPage } = modalList;

    const onClose = () => {
        setModal({
            ...modal,
            isOpen: false,
            type: "",
        });
        resetModalList();
    };

    const onTitle = (type: string) => {
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
            case "prodType":
                return "상품분류 정보";
            case "product":
                return "상품 정보";
            default:
                return "undefined";
        }
    };

    const renderModal = () => {
        switch (type) {
            case "customer":
                return <Customer />;
            case "address":
                return <Address />;
            case "user":
                return <User />;
            case "member":
                return <Member />;
            case "prodType":
                return <ProdType />;
            case "product":
                return <Product />;
            default:
                return <p>undefiend Modal</p>;
        }
    };

    const onPageChange = (page: number) => {
        setModalList({ ...modalList, currentPage: page });
    };

    useEffect(() => {
        resetModalList();
    }, []);

    return (
        <>
            {isOpen && (
                <div className={styles.modal}>
                    <div className={`${styles.modalContent} ${styles[type]}`}>
                        <button onClick={onClose} className={styles.closeModalBtn}>
                            &times;
                        </button>
                        <div className={styles.modalHeader}>
                            <h2>{onTitle(type)}</h2>
                        </div>
                        <div className={styles.modalBody}>{renderModal()}</div>
                        <div className={styles.modalFooter}>{/* <Button onClick={onClose} skin={"green"}>닫기</Button> */}</div>
                    </div>
                </div>
            )}
        </>
    );
};
export default Modal;
