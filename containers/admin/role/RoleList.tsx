'use client';
import Breadcrumb from '@/components/Breadcrumb';
import { Tables } from '@/components/Tables';
import Styles from './RoleList.module.scss';

const RoleList = () => {
    return (
        <>
            <Breadcrumb />
            <Tables rowType={'role'} className={'RoleList'} />
        </>
    );
};

export default RoleList;
