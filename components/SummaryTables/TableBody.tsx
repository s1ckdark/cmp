'use client';
import React, { useState, ReactNode, useEffect }  from 'react';
import styles from './index.module.scss'
import { TableBodyProps } from '@/types/data';
import Styles from './TableBody.module.scss';
import { useRouter } from 'next/navigation';
import { monthAtom } from '@/states';
import { dataListAtom } from '@/states/data';
import { useRecoilState, useRecoilValue } from 'recoil';
import { addComma } from '@/utils/data';
export const TableBody: React.FC<TableBodyProps> = ({rowType, data}:{rowType:string, data:any[]}) => {
    const display = {
        "invoiceList": ['overview','memberNo', 'memberName', 'naverCost.cloudType', 'term', 'naverCost.payCurrency_code', 'naverCost.useAmount', 'naverCost.totalDiscountAmt', 'naverSummary.thisMonthDemandAmount', 'gdSummary.swUseAmount', 'gdSummary.mspUseAmount', 'gdSummary.productdiscountamount', 'gdSummary.thisMonthDemandAmount', 'result.thisMonthDemandAmount', 'result.thisMonthVatAmount', 'result.totalDemandAmount'],
        "customers": ['memberNo', 'memberName', 'regionType', 'businessRegNo', 'customerContacts', 'salesContacts'],
        "users": ['email', 'username', 'userType', 'privileges', 'regName', 'regDt', 'lasLogDt'],
        "top10": ['name', 'start','end','amount'],
        "perMonth": ["x", "y"],
        "perWeek": ["x", "y"],
        "trendMonth": ["x", "y", "z", "a"],
        "top10bycust": ["rank", "memberNo", "memberName", "totalDemandAmount"],
        "announce": ['idx', 'title', 'regDt'],
        "support": ['idx', 'title', 'memberName', 'status', 'regDt'],
    }
    
    // let newData = data['data'] && data['data'].map((item:any) => 
    //     Object.assign({}, item, {term:item.target_start_date + ' ~ ' + item.target_end_date})
    // )

    const field = display[rowType];

    return (
        <tbody className={`${Styles[rowType]} ${Styles.bodyContainer}`}>
            {data.map((item: any, index: number) => (
                
                <tr key={index}>
                    {field.map((key: string, keyIndex: number) => {
                        let tmp = key.split('.').reduce((acc, cur) => acc && acc[cur], item) || '-';
                        return (
                            <td key={keyIndex}>
                                {typeof tmp === 'number' ? addComma(Math.round(tmp*100) / 100):tmp}
                            </td>
                        )
                    })}
                </tr>
            ))}
        </tbody>
    );
}