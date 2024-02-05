import React from  'react';
import Styles from './ProductsView.module.scss';
import Button from '@/components/Button';
import Breadcrumb from '@/components/Breadcrumb';
import { usePathname, useRouter } from 'next/navigation'
import { useRecoilValue } from 'recoil';
import { dataListAtom } from '@/states/data';
import lodash from 'lodash';
import Loading from '@/components/Loading';

const ProductsView = () => {
    const data = useRecoilValue(dataListAtom);
    const pathname = usePathname();
    const router = useRouter();
    const id = lodash.last(pathname.split('/'));
    const product = lodash.find(data?.data, {id});

    const goEdit = () => {
        router.push(`/products/edit/${id}`);

    }
    if(!product) return <Loading />
    const { prodName, prodType, prodDetailType, prodDetailTypeStd, prodDesc, stdPrice, expPrice, comment } = product;
    return (
        <>
            <Breadcrumb />
            <div className={Styles.container}>
                    <div className={`${Styles.inputGroup} ${Styles.prodNamet}`}>
                        <label>상품명</label>
                        <p>{prodName} </p>
                    </div>
                    <div className={`${Styles.inputGroup} ${Styles.prodType}`}>
                        <label>상품분류</label>
                        <p>{prodType}</p>
                    </div>
                    <div className={`${Styles.inputGroup} ${Styles.prodDetailType}`}>
                        <label>상품상세분류</label>
                        <p>{prodDetailType}</p>
                    </div>
                    <div className={`${Styles.inputGroup} ${Styles.prodDetailTypeStd}`}>
                        <label>상품가격기준</label>
                        <p>{prodDetailTypeStd || '-'}</p>
                    </div>
                    <div className={`${Styles.inputGroup} ${Styles.prodDesc}`}>
                        <label>상품설명</label>
                        <p>{prodDesc}</p>
                    </div>
                    <div className={`${Styles.inputGroup} ${Styles.stdPrice}`}>
                        <label>정식단가</label>
                        <p>{stdPrice}</p>
                    </div>
                    <div className={`${Styles.inputGroup} ${Styles.comment}`}>
                        <label>코멘트</label>
                        <p>{comment}</p>
                    </div>
                    <div className={Styles.btnArea}>
                        <Button type="button" className={`${Styles.submitBtn} ${Styles.btn}`} skin={"green"} onClick={goEdit}>수정</Button>
                        <Button type="button" className={`${Styles.backBtn} ${Styles.btn}`}  onClick={()=> router.back()} skin={"back"}>돌아가기</Button>
                    </div>
            </div>
        </>
    )
}

export default ProductsView