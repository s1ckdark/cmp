'use client';
import Breadcrumb from '@/components/Breadcrumb';
import { Tables } from '@/components/Tables';
import Styles from './ProductsList.module.scss';
import Searchbar from '@/components/Searchbar';

const ProductList = () => {
    return (
        <>
            <Breadcrumb />
            <div className={`${Styles.table} ${Styles.withSearchbar}`}>
                <Searchbar rowType={'productGd'}/>
                <Tables rowType={'productGd'}/>
            </div>
        </>
    );
};

export default ProductList;
