import React from  'react';
import Styles from './ProductsTypeView.module.scss';
import Button from '@/components/Button';
import Breadcrumb from '@/components/Breadcrumb';
import { useRecoilValue } from 'recoil';
import { dataListAtom } from '@/states/data';
import lodash from 'lodash';
import Loading from '@/components/Loading';
import { usePathname, useRouter } from 'next/navigation';

const ProductsTypeView = () => {
    const data = useRecoilValue(dataListAtom);
    const router = useRouter();
    const pathname = usePathname();
    const id = lodash.last(pathname.split('/'));
    const product = lodash.find(data?.data, {id});
    console.log('product', id, product);
    if(!product) return <Loading />
    const { prodType, prodDetailType, prodDetailTypeStd } = product;
    return (
        <>
            <Breadcrumb />
            <div className={Styles.container}>
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
                    <div className={Styles.btnArea}>
                        <Button type="submit" className={`${Styles.submitBtn} ${Styles.btn}`} skin={"green"}>수정</Button>
                        <Button type="button" className={`${Styles.backBtn} ${Styles.btn}`}  onClick={()=> router.back()} skin={"back"}>돌아가기</Button>
                    </div>
            </div>
        </>
    )
}

export default ProductsTypeView;