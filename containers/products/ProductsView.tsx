import React, {useEffect,useState} from  'react';
import Styles from './ProductsView.module.scss';
import Button from '@/components/Button';
import Breadcrumb from '@/components/Breadcrumb';
import { usePathname, useRouter } from 'next/navigation'
import lodash from 'lodash';
import Loading from '@/components/Loading';
import { apiBe } from '@/services';

const ProductsView = () => {
    const pathname = usePathname();
    const router = useRouter();
    const id = lodash.last(pathname.split('/'));
    const [ product, setProduct] = useState<any>(null);
    
    useEffect(() => {
        const getProductInfo = async () => {
            const url = `/product/product/${id}`
            const response = await apiBe(url);
            if (response.status === 200) {
                const { data } = response;
                setProduct(data);
            } else {
                console.log('error');
            }
        }
        getProductInfo();
    }, [id])


    const goEdit = () => {
        router.push(`/products/product/edit/${id}`);

    }
    const goBack = () => {
        router.push('/products/product/list/1');
    }
    if(!product) return <Loading />
    const { prodName, prodType, prodDetailType, prodDetailTypeStd, prodDesc, stdPrice, expPrice, comment } = product;
    return (
        <>
            <Breadcrumb />
            <div className={Styles.container}>
                    <div className={`${Styles.inputGroup} ${Styles.prodNamet}`}>
                        <label htmlFor="prodName">상품명</label>
                        <p>{prodName} </p>
                    </div>
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
                    <div className={`${Styles.inputGroup} ${Styles.prodDesc}`}>
                        <label htmlFor="prodDesc">상품설명</label>
                        <p>{prodDesc}</p>
                    </div>
                    <div className={`${Styles.inputGroup} ${Styles.stdPrice}`}>
                        <label htmlFor="stdPrice">정식단가</label>
                        <p>{stdPrice}</p>
                    </div>
                    <div className={`${Styles.inputGroup} ${Styles.comment}`}>
                        <label htmlFor="comment">코멘트</label>
                        <p>{comment}</p>
                    </div>
                    <div className={Styles.btnArea}>
                        <Button type="button" className={`${Styles.submitBtn} ${Styles.btn}`} skin={"green"} onClick={goEdit}>수정</Button>
                        <Button type="button" className={`${Styles.backBtn} ${Styles.btn}`}  onClick={goBack} skin={"back"}>돌아가기</Button>
                    </div>
            </div>
        </>
    )
}

export default ProductsView