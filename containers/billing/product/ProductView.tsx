'use client';
import React, { useState } from  'react';
import Styles from './ProductView.module.scss';
import Button from '@/components/Button';
import Breadcrumb from '@/components/Breadcrumb';
import { usePathname, useRouter } from 'next/navigation'
import { useRecoilValue } from 'recoil';
import { dataViewAtom } from '@/states/data';
import lodash from 'lodash';
import Loading from '@/components/Loading';

const ProductsView = () => {
    const [product, setProduct] = useState({});
    const pathname = usePathname();
    const router = useRouter();
    const prodId = lodash.last(pathname.split('/'));

    useEffect(() => {
        const fetching = async() => {
            const url = `/product/gdbliling?memberNo=${prodId}&targetMonth=${targetMonth}`;
            const response = await apiBe.get(url);
            console.log(response);
            if(response.status === 200) setProduct(response.data);
            console.log(response.data);
        }
        fetching();
    
    })
    console.log('product', prodId, product, data?.data);
    if(!product) return <Loading />
    const { prodName, category, prodDetailType, prodDetailTypeStd, prodDesc, stdPrice, expPrice, comment } = product;
    return (
        <>
            <Breadcrumb />
            <div className={Styles.container}>
                    <div className={Styles.inputGroup}>
                        <label>상품명</label>
                        <p>{prodName} </p>
                    </div>
                    <div className={Styles.inputGroup}>
                        <label>상품분류</label>
                        <p>{category}</p>
                    </div>
                    <div className={Styles.inputGroup}>
                        <label>상품상세분류</label>
                        <p>{prodDetailType}</p>
                    </div>
                    <div className={Styles.inputGroup}>
                        <label>상품가격기준</label>
                        <p>{prodDetailTypeStd || '-'}</p>
                    </div>
                    <div className={Styles.inputGroup}>
                        <label>상품설명</label>
                        <p>{prodDesc}</p>
                    </div>
                    <div className={Styles.inputGroup}>
                        <label>정식단가</label>
                        <p>{stdPrice}</p>
                    </div>
                    <div className={Styles.inputGroup}>
                        <label>코멘트</label>
                        <p>{comment}</p>
                    </div>
                    <div className={Styles.btnArea}>
                        <Button type="submit" size={"normal"} className={`${Styles.submitBtn} ${Styles.btn}`} skin={"green"}>수정</Button>
                        <Button type="button" size={"normal"} className={`${Styles.backBtn} ${Styles.btn}`}  onClick={()=> router.back()} skin={"gray"}>돌아가기</Button>
                    </div>
            </div>
        </>
    )
}

export default ProductsView;