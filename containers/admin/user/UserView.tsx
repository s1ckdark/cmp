'use client';
import Breadcrumb from '@/components/Breadcrumb';
import React, {useEffect} from 'react';
import { apiBe } from '@/services';
import Button from '@/components/Button';
import { useRecoilState, useRecoilValue } from 'recoil';
import { dataViewAtom } from '@/states/data';
import { adjustedMonthSelector } from '@/states/';
import Styles from './UserView.module.scss';
import { useRouter } from 'next/navigation';
import { Toast } from '@/components/Toast';

interface UserViewCtProps {
    memberNo: string;
    targetMonth: string;
}

const UserView = () => {
    const router = useRouter();

    // const [ data, setData ] = useRecoilState(dataViewAtom);
    // const nextMonth = useRecoilValue(adjustedMonthSelector('next'));
    // const currentMonth = useRecoilValue(adjustedMonthSelector('current'));
    // const router = useRouter();

    // useEffect(() => {
    //     const fetching = async() => {
    //         console.log(memberNo);
    //         const url = `/User/${memberNo}/${targetMonth}`;
    //         const response = await apiBe.get(url);
    //         if(response.status === 200) setData({data:response.data,memberNo:memberNo,targetMonth:targetMonth});
    //         console.log(response.data);
    //     }
    //     fetching();
    // }, [memberNo, targetMonth]);
 
    return (
        <>
            <Breadcrumb />
            <div className={Styles.container}>
                <div id="User">
                </div>
                <div className={Styles.btnArea}>
                    <Button onClick={()=>console.log("click")} className={`${Styles.btn} ${Styles.pdfBtn} flex justify-end mt-10`} skin="green">수정</Button>
                    <Button className={`${Styles.btn} ${Styles.backBtn} flex justify-end mt-10`} onClick={()=>router.back()} skin="green">목록</Button>
                </div>
            </div>

        </>
    )
}

export default UserView;