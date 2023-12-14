'use client';
import Breadcrumb from '@/components/Breadcrumb';
import React, {useEffect} from 'react';
import { apiBe } from '@/services';
import Button from '@/components/Button';
import { useRecoilState } from 'recoil';
import { dataViewAtom} from '@/states/data';

interface ProductViewCtProps {
    memberNo: string;
    targetMonth: string;
}

const ProductWrite= ({memberNo, targetMonth}:ProductViewCtProps) => {
    const [ product, setProduct ] = useRecoilState(dataViewAtom);
    const breadcrumbs = [
        { href: '/', label: 'Home' },
        { href: '/billing', label: 'Billing' },
        { href: `/billing/product/${memberNo}/${targetMonth}`, label: 'Write' }
    ];

    useEffect(() => {
        const fetching = async() => {
            const fromMonth = (targetMonth:string) => {
                console.log(typeof targetMonth);
                // const year = parseInt(targetMonth.substring(0, 4), 10);
                // const month = parseInt(targetMonth.substring(4, 6), 10) - 1; // Month is 0-indexed in JavaScript
                // return new Date(year, month + 1);
            }
            console.log(fromMonth(targetMonth));
            const url = `/product/gdbilling/copy/${memberNo}/${fromMonth}/${targetMonth}`;
            const response = await apiBe.get(url);
            if(response.status === 200) setProduct({data:response.data,memberNo:memberNo,targetMonth:targetMonth});
        }
        fetching();
    }, [memberNo, targetMonth]);

    return (
        <>
            <Breadcrumb title={memberNo} breadcrumbs={breadcrumbs} />
            <div id="product">

            </div>
        </>
    )
}

export default ProductWrite;