'use client';
import React, { useState, ReactNode, useEffect }  from 'react';
import styles from './index.module.scss'
import { TableBodyProps } from '@/types/data';
import Styles from './TableBody.module.scss';
import { useRouter } from 'next/navigation';
import { monthAtom, currentPageAtom } from '@/states';
import { dataListAtom, historyListAtom, historyToggleAtom } from '@/states/data';
import { useRecoilState, useRecoilValue } from 'recoil';
import { History } from '@/public/svgs';
import { set } from 'lodash';

export const TableBody: React.FC<TableBodyProps> = ({rowType}:{rowType:string}) => {
    const [data, setData] = useRecoilState(dataListAtom) || null;
    const pageNumber = useRecoilValue(currentPageAtom);
    const [history, setHistory] = useRecoilState(historyListAtom || null);
    const { totalPages, totalItems } = data;
    const targetMonth = useRecoilValue(monthAtom);
    const [historyToggle, setHistoryToggle] = useRecoilState<boolean>(historyToggleAtom);
    const router = useRouter();
    const display = {
        "invoiceList": ['overview','memberNo', 'memberName', 'naverCost.cloudType', 'term', 'naverCost.payCurrency_code', 'naverCost.useAmount', 'naverCost.totalDiscountAmt', 'naverSummary.thisMonthDemandAmount', 'gdSummary.swUseAmount', 'gdSummary.mspUseAmount', 'gdSummary.productdiscountamount', 'gdSummary.thisMonthDemandAmount', 'result.thisMonthDemandAmount', 'result.thisMonthVatAmount', 'result.totalDemandAmount'],
        "productGd":['id','prodName', 'prodType','prodDesc','stdPrice','regName','regDt','history'],
        "customers": ['memberNo', 'memberName', 'regionType', 'businessRegNo', 'customerContacts', 'salesContacts'],
        "users": ['email', 'username', 'userType', 'privileges', 'regName', 'regDt', 'lasLogDt'],
    }
    
    const view = (memberNo?:number) => {
        const typeUrl = {
            "invoiceList": `/billing/invoice/view/${memberNo}/${targetMonth}`,
            "customers": '/customer',
            "users": '/user',
            "productGd":'/products/product/view/'

        }
        router.push(typeUrl[rowType]);
    }

    const newData = (rowType:string) => {
        switch(rowType){
            case 'invoiceList':
                return data['data'] && data['data'].map((item:any) => 
                    Object.assign({}, item, {term:item.target_start_date + ' ~ ' + item.target_end_date})
                )
                break;
            case 'productGd':
                return data['data'] && data['data'].map((item:any, index:number) => 
                    Object.assign({}, item, {id: totalItems - index - (pageNumber-1)*10,history: <History onClick={()=>setHistory(item.prodHist)}/>})
                )
                break;
            default:
                return data['data']
        }
    }

    const historyView = (historyData:any[]) => {
        setHistory(historyData);
        setHistoryToggle(true);
    }

    const field = display[rowType];
    if(!data?.data) return <div>Loading...</div>
    return (
        <tbody className={`${Styles.bodyContainer} ${Styles.productGd}`}>
            {newData(rowType).map((item: any, index: number) => (
                <tr key={index}>
                    {field.map((key: string, keyIndex: number) => {
                        let tmp = key.split('.').reduce((acc, cur) => acc && acc[cur], item) || '-';
                        key !== 'history' ? tmp = <td  key={keyIndex} onClick={()=>view()}>{tmp}</td> : tmp = <History onClick={()=>historyView(item.prodHist)}/>;
                        return (
                            <>
                                {tmp}
                            </>
                        )
                    })}
                </tr>
            ))}
        </tbody>
    );
}
