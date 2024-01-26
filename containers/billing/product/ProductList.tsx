'use client';
import Breadcrumb from '@/components/Breadcrumb';
import React, { useEffect } from 'react';
import { Tables } from '@/components/Tables';
import MonthBar from '@/components/MonthBar';
import Styles from './ProductList.module.scss';
import SearchBar from '@/components/Searchbar';

const ProductList = () => {
    return (
        <>
            <Breadcrumb />
            <MonthBar />
            <div className={`${Styles.table} ${Styles.withSearchbar}`}>
                <SearchBar rowType={'billingProduct'} />
                <Tables rowType={'billingProduct'}  />
            </div>
        </>
    );
};

export default ProductList;
