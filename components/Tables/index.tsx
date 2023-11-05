import React from 'react';
import { THeader } from './TableHeader';
import { TBody } from './TableBody';
import { isEmptyObject } from '@/utils/data';
import cx from 'clsx';
import styles from './index.module.scss';

interface TableHeaderProps {
    type: string;
}
interface TableBodyProps {
    data: Array<any>;
}
export interface TablesProps {
    type: string;
    data: Array<any>;
    className?: string;
}


export const TableHeader: React.FC<TableHeaderProps> = ({ type }) => {
    return (
        <THeader type={type} />
    );
}
export const TableBody: React.FC<TableBodyProps> = ({ data }) => {
    return (
        <TBody data={data} />
    );
}
export const Tables: React.FC<TablesProps> = ({ type, data, className }) => {
    const row: any[] = isEmptyObject(data) ? data : [];
    console.log(type);
    return (
        <table className={cx(className, styles[type ?? 'primary'])}>
            <THeader type={type} />
            <TBody data={row} />
        </table>
    );
};

