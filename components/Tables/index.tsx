'use client';
import React, {useEffect, useState} from 'react';
import { TableHeader } from './TableHeader';
import { TableBody } from './TableBody';
import { isEmptyObject } from '@/utils/data';
import cx from 'clsx';
import styles from './index.module.scss';
import { TablesProps, TableHeaderProps, TableBodyProps } from '@/types/data';
import Pagination from '@/components/Pagination';
import { useSetRecoilState, useRecoilState } from 'recoil';
import { currentPageAtom } from '@/states';
import { dataListAtom } from '@/states/data';

export const Tables = ({rowType, className}:TablesProps) => {
    const [currentPage, setCurrentPage] = useRecoilState(currentPageAtom);
    const [data, setData ] = useRecoilState(dataListAtom) || null;
    
    const onPageChange = (newPage: number) => {
        setCurrentPage(newPage);
    };

    return (
        <>
            <div className={styles.tableContainer}>
                <table className={styles[rowType]}>
                    <TableHeader rowType={rowType} />
                    <TableBody rowType={rowType} data={data} />
                </table>
            </div>
            {data?.totalPages && (
                <Pagination
                    count={data.totalPages}
                    page={currentPage}
                    onPageChange={onPageChange}
                />
            )}
        </>
    );

};

