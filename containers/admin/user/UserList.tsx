'use client';
import Breadcrumb from '@/components/Breadcrumb';
import { Tables } from '@/components/Tables';
import Styles from './UserList.module.scss';

const UserList = () => {
    return (
        <>
            <Breadcrumb />
            <Tables rowType={'user'} className={'UserList'} />
        </>
    );
};

export default UserList;
