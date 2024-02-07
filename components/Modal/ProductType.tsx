'use client';
import styles from './ProductType.module.scss';
import Button from '@/components/Button';
import { useState } from 'react';
import { apiBe } from '@/services';
import { Toast } from '@/components/Toast';
import { useRecoilState } from 'recoil';
import { modalAtom } from '@/states';
import { modalListAtom } from '@/states/modal';
import Pagination from '@/components/Pagination';

const ProductType = () => {
    const [data, setData] = useRecoilState(modalListAtom);
    const [ modal, setModal ] = useRecoilState(modalAtom);

    const onChange = (e: any) => {
        setData({...data, keyword: e.target.value});
    }
    
    const onPageChange = (page: number) => {
        setData({...data, currentPage: page});
    }

    const pickup = (prodType: string, prodDetailType: string, prodDetailTypeStd:string) => {
        setModal({
            ...modal,
            isOpen: false,
            data: {
                prodType: prodType,
                prodDetailType: prodDetailType,
                prodDetailTypeStd: prodDetailTypeStd
            },
        })
    }

    const onSearch = async() => {
        const url = '/product/producttype';
        console.log(modal);
        const response = await apiBe(url, { params: { prodType: modal.data.prodType, prodDetailType: data.keyword, page: data.currentPage} });
        if (response.status === 200 || response.status === 201) {
            const { content } = response.data;
            if (content.length === 0) {
                Toast("error", '상품 상세 분류가 존재하지 않습니다.');
            } else {
                setData({...data, modalType: modal.type, data: content, totalPages: data.totalPages, currentPage: data.currentPage});
            }
        }
    }

    return ( 
        <div className={styles.productType}>
            <div className={styles.searchInput}>
                <input type="text" placeholder="상품명을 입력하세요." onChange={onChange} value={data.keyword} />
                <Button onClick={onSearch} skin={"green"}>검색</Button>
            </div>
            <div className={styles.productTypeList}>
                <table>
                    <thead>
                        <tr>
                            <th>상품분류</th>
                            <th>상품상세분류</th>
                            <th>상품가격기준</th>
                        </tr>
                    </thead>
                    <tbody>
                        {data.data.length > 0 ? data.data.map((item: any, index:number) => (
                            <tr className={styles.prodTypeItem} key={`${item.prodType}-${item.prodDetailType}-${index}`} onClick={() => pickup(item.prodType, item.prodDetailType, item.prodDetailTypeStd)}>
                                <td className={styles.prodType}>{item.prodType}</td>
                                <td className={styles.prodDetailType}>{item.memberNo}</td>
                                <td className={styles.prodTypeStd}>{item.prodDetailTypeStd}</td>
                            </tr>
                        )):<tr><td colSpan={3}>검색 결과가 없습니다.</td></tr>}
                    </tbody>
                </table>
            </div>
            {data.totalPages > 1 && <Pagination
                count={data.totalPages}
                page={data.currentPage}
                onPageChange={onPageChange}
            />}

        </div>
    )
}

export default ProductType;