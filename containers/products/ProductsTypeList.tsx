'use client';
import Breadcrumb from '@/components/Breadcrumb';
import { Tables } from '@/components/Tables';
import Styles from './ProductsTypeList.module.scss';
const ProductsTypeList = () => {
    return (
        <>
            <Breadcrumb />
            <Tables rowType={'productCategoryList'} className={'productCategoryList'} />
        </>
    );
};

export default ProductsTypeList;
