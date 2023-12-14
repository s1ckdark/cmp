import React from 'react';
import Styles from './ProductsWrite.module.scss';
import Button from '@/components/Button';
import Breadcrumb from '@/components/Breadcrumb';
const ProductsWrite = () => {
    const header = {
        title: '자사상품 등록',
        breadcrumbs: [
            { href: '/', label: 'Home' },
            { href: '/products', label: '자사상품'},
            { href: '/products/product', label: '전체' },
            { href: '/products/product/write', label: '자사상품 등록' },
        ]
    }
    return (
        <>
         <Breadcrumb title={header.title} breadcrumbs={header.breadcrumbs} />
        <div className={Styles.container}>
            <form className={Styles.form}>
                <div className={Styles.inputGroup}>
                    <label>상품명</label>
                    <input type="text" placeholder='상품명을 입력하세요' />
                </div>
                <div className={Styles.inputGroup}>
                    <label>상품분류</label>
                    <input type="radio" name="product" value="SW" />사용SW
                    <input type="radio" name="product" value="MSP" />MSP
                </div>
                <div className={Styles.inputGroup}>
                    <label>상품상세분류</label>
                    <input type="text" placeholder='상품상세분류를 입력하세요' />
                </div>
                <div className={Styles.inputGroup}>
                    <label>상품명</label>
                    <input type="text" placeholder='상품가격기준을 입력하세요' />
                </div>
                <div className={Styles.inputGroup}>
                    <label>정식단가</label>
                    <input type="text" placeholder='정식단가를 입력하세요' />
                </div>
                <div className={Styles.inputGroup}>
                    <label>벤더사 영업 이름</label>
                    <input type="text" placeholder='벤더사 영업 이름을 입력하세요' />
                </div>
                <div className={Styles.inputGroup}>
                    <label>벤더사 영업 이메일</label>
                    <input type="text" placeholder='벤더사 영업 이메일을 입력하세요' />
                </div>
                <div className={Styles.inputGroup}>
                    <label>코멘트</label>
                    <textarea placeholder='벤더사 영업 전화번호를 입력하세요' />
                </div>
                <Button type="submit" className={Styles.submitBtn} skin={"green"}>등록</Button>
            </form>
        </div>
        </>
    )