'use client';
import Breadcrumb from '@/components/Breadcrumb';
import { Tables } from '@/components/Tables';
import Styles from './ProductsList.module.scss';

const ProductList = () => {
    return (
        <>
            <Breadcrumb />
            <Tables rowType={'productGd'} className={'productGd'} />
        </>
    );
};

export default ProductList;
