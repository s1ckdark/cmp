import React from  'react';
import Styles from './ProductsTypeView.module.scss';
import Button from '@/components/Button';
import Breadcrumb from '@/components/Breadcrumb';
import { useRecoilState, useRecoilValue } from 'recoil';
import { dataListAtom, prodTypeAtom } from '@/states/data';
import lodash, { set } from 'lodash';
import Loading from '@/components/Loading';
import { usePathname, useRouter } from 'next/navigation';

const ProductsTypeView = () => {
    const [ prodDetail, setProdDetail] = useRecoilState<any>(prodTypeAtom);
    const data = useRecoilValue(dataListAtom);
    const router = useRouter();
    const pathname = usePathname();
    const id = lodash.last(pathname.split('/'));
    const product = lodash.find(data?.data, { id });
    const goEdit = () => {
        router.push(`/products/category/edit/${id}`);
    }
    console.log('product', data, id, product);
    setProdDetail(product);
    if(!product) return <Loading />
    const { prodType, prodDetailType, prodDetailTypeStd } = product;
    return (
        <>
            <Breadcrumb />
            <div className={Styles.container}>
                    <div className={`${Styles.inputGroup} ${Styles.prodType}`}>
                        <label htmlFor="prodType">상품분류</label>
                        <p>{prodType}</p>
                    </div>
                    <div className={`${Styles.inputGroup} ${Styles.prodDetailType}`}>
                        <label htmlFor="prodDetailType">상품상세분류</label>
                        <p>{prodDetailType}</p>
                    </div>
                    <div className={`${Styles.inputGroup} ${Styles.prodDetailTypeStd}`}>
                        <label htmlFor="prodDetailTypeStd">상품가격기준</label>
                        <p>{prodDetailTypeStd || '-'}</p>
                    </div>
                    <div className={Styles.btnArea}>
                        <Button type="button" onClick={goEdit} className={`${Styles.submitBtn} ${Styles.btn}`} skin={"green"}>수정</Button>
                        <Button type="button" className={`${Styles.backBtn} ${Styles.btn}`}  onClick={()=> router.back()} skin={"back"}>돌아가기</Button>
                    </div>
            </div>
        </>
    )
}

export default ProductsTypeView;