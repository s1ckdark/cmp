'use client';
import { TableHeader } from './TableHeader';
import { TableBody } from './TableBody';
import styles from './index.module.scss';
import { TablesProps, TableHeaderProps, TableBodyProps } from '@/types/data';
import { useSetRecoilState, useRecoilState } from 'recoil';

export const Tables = ({rowType, data}:TablesProps) => {
    return (
        <>
            <div className={styles.tableContainer}>
                <table className={styles[rowType]}>
                    <TableHeader rowType={rowType} />
                    <TableBody rowType={rowType} data={data} />
                </table>
            </div>
        </>
    );

};

