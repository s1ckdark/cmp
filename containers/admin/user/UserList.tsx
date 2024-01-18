'use client';
import Searchbar from '@/components/Searchbar';
import Breadcrumb from '@/components/Breadcrumb';
import { Tables } from '@/components/Tables';
import Styles from './UserList.module.scss';

const UserList = () => {
    return (
        <>
            <Breadcrumb />
            <div className={`${Styles.table} ${Styles.withSearchbar}`}>
                <Searchbar rowType={"user"} />
                <Tables rowType={'user'} className={'UserList'} />
            </div>
        </>
    );
};

export default UserList;
