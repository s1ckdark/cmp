'use client';
import React, {useEffect, useState, Suspense} from 'react';
import { TableHeader } from './TableHeader';
import { TableBody } from './TableBody';
import styles from './index.module.scss';
import { TablesProps, TableHeaderProps, TableBodyProps } from '@/types/data';
import Pagination from '@/components/Pagination';
import { useSetRecoilState, useRecoilState } from 'recoil';
import { currentPageAtom } from '@/states';
import { dataListAtom } from '@/states/data';
import { useRouter } from 'next/navigation';
import Button from '@/components/Button';
import Loading from '@/components/Loading';
export const Tables = ({rowType, className}:TablesProps) => {
    const [currentPage, setCurrentPage] = useRecoilState(currentPageAtom);
    const [data, setData ] = useRecoilState(dataListAtom) || null;
    const router = useRouter();
    const onPageChange = (newPage: number) => {
        setCurrentPage(newPage);
        router.push(`./${newPage}`)
    };

    const write = () => {
        switch(rowType){
            case 'invoiceList':
                router.push('/billing/invoice/write');
                break;
            case 'productGd':
                router.push('/products/product/write');
                break;
            case 'customers':
                router.push('/customer/write');
                break;
            case 'users':
                router.push('/user/write');
                break;
            case 'billingProductList':
                router.push('/billing/product/write');
                break;
            case 'productCategory':
                router.push('/products/category/write');
                break;
            default:
                return;
        }
    }

    const writeDisable = () => {
        switch(rowType){
            case 'invoiceList':
                return false;
                break;
            case 'productGd':
                return true;
                break;
            case 'customers':
                return true;
                break;
            case 'users':
                return true;
                break;
            case 'billingProductList':
                return true;
                break;
            case 'productCategory':
                return true;
                break;
            default:
                return true;
        }
    }
    return (
        <>
            <div className={styles.tableContainer}>
            <div className={styles.scroller}>
                <table className={styles[rowType]}>
                    <TableHeader rowType={rowType} />
                    <TableBody rowType={rowType} data={data} />
                </table>
            </div>
            </div>
         
            <div className={styles.btnArea}>
            {data?.totalPages && (<Pagination
                    count={data.totalPages}
                    page={currentPage}
                    onPageChange={onPageChange}
                />
                )}
            {writeDisable() && <Button className={styles.btn} onClick={()=> write()} skin={"green"}>등록</Button>}
            </div>

        </>
    );
}

