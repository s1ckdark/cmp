'use client';
import React, { useState, ReactNode, useEffect } from 'react';
import styles from './index.module.scss';
import { TableBodyProps } from '@/types/data';
import Styles from './TableBody.module.scss';
import { useRouter } from 'next/navigation';
import { monthAtom } from '@/states';
import { dataListAtom } from '@/states/data';
import { useRecoilState, useRecoilValue } from 'recoil';
import { addComma } from '@/utils/data';
interface TypesMap {
  [key: string]: string[];
}

export const TableBody = ({ rowType, data }: any) => {
  const display: TypesMap = {
    invoiceList: [
      'overview',
      'memberNo',
      'memberName',
      'naverCost.cloudType',
      'term',
      'naverCost.payCurrency_code',
      'naverCost.useAmount',
      'naverCost.totalDiscountAmt',
      'naverSummary.thisMonthDemandAmount',
      'gdSummary.swUseAmount',
      'gdSummary.mspUseAmount',
      'gdSummary.productdiscountamount',
      'gdSummary.thisMonthDemandAmount',
      'result.thisMonthDemandAmount',
      'result.thisMonthVatAmount',
      'result.totalDemandAmount',
    ],
    customers: ['memberNo', 'memberName', 'regionType', 'businessRegNo', 'customerContacts', 'salesContacts'],
    users: ['email', 'username', 'userType', 'privileges', 'regName', 'regDt', 'lasLogDt'],
    top10: ['name', 'start', 'end', 'amount'],
    perMonth: ['x', 'y'],
    perWeek: ['x', 'y'],
    trendMonth: ['x', 'y', 'z', 'a'],
    top10bycust: ['rank', 'memberNo', 'memberName', 'totalDemandAmount'],
    notice: ['idx', 'title', 'regDt'],
    support: ['idx', 'title', 'memberName', 'status', 'regDt'],
  };

  const field = display[rowType];

  const renderCell = (key: any, keyIndex: number, item: any, index: number) => {
    let content;
    const fieldValue = key.split('.').reduce((acc: any, cur: any) => acc && acc[cur], item);

    switch (key) {
      case 'rank':
        content = <td key={key + '-' + keyIndex}>{item[key]}</td>;
        break;
      case 'memberName':
        content = <td key={key + '-' + keyIndex}>{item[key] === null ? '미등록' : item[key]}</td>;
        break;
      default:
        content =
          typeof fieldValue !== 'number' ? (
            <td key={key + '-' + keyIndex}>{typeof fieldValue !== 'number' ? fieldValue : addComma(fieldValue)}</td>
          ) : (
            <td key={key + '-' + keyIndex} className="!text-right">
              {typeof fieldValue !== 'number' ? fieldValue : addComma(fieldValue)}
            </td>
          );
        break;
    }
    return content;
  };

  return (
    <tbody className={`${Styles.bodyContainer} ${Styles[rowType]}`}>
      {data.map((item: any, index: number) => (
        <tr key={item.memberNo + '-' + item.targetMonth + '-' + index}>{field.map((key: string, keyIndex: number) => renderCell(key, keyIndex, item, index))}</tr>
      ))}
    </tbody>
  );
};
