'use client';
import React, { useEffect, useRef, useState } from 'react';
import Summary from '@/components/Summary';
import Breadcrumb from '@/components/Breadcrumb';
import { useRecoilValue } from 'recoil';
import { monthAtom, geneMonthDateAtom } from '@/states';
import styles from './index.module.scss';
import { Tables } from '@/components/SummaryTables';
const notice = [
    {
      "idx": "134",
      "title": "작업 중입니다",
      "regDt": "2023.12.28 12:33:42"
    },
    {
      "idx": "133",
      "title": "작업 중입니다",
      "regDt": "2023.12.20 12:33:42"
    },
    {
      "idx": "132",
      "title": "작업 중입니다",
      "regDt": "2023.12.01 12:33:42"
    }
  ]
  const support = [
    {
      "idx": "3",
      "title": "작업 중입니다",
      "memberName": "비비탄",
      "status": "진행중",
      "regDt": "2023.12.22 12:33:42"
    },
    {
      "idx": "2",
      "title": "작업 중입니다",
      "memberName": "비비탄",
      "status": "완료",
      "regDt": "2023.12.20 12:33:42"
    },
    {
      "idx": "1",
      "title": "작업 중입니다",
      "memberName": "비비탄",
      "status": "완료",
      "regDt": "2023.12.10 12:33:42"
    }
  ]
  
const LandingPage = () => {
    const month = useRecoilValue(monthAtom);
    const geneMonthDate = useRecoilValue(geneMonthDateAtom);
    return (
        <>
            <Breadcrumb />
            <div className={`${styles.demandAmount} ${styles.boxSection}`}>
                <h1 className={styles.currentMonth}><label htmlFor="term">이용 기간</label>{geneMonthDate.firstDayOfMonth} - {geneMonthDate.relevantDate}</h1>
            </div>
            <Summary header={false} />
            {/* <div className={`${styles.notice} ${styles.boxSection}`}>
                <div className={styles.inner}>
                    <div className={styles.label}>
                        <h2>공지사항</h2>
                    </div>
                    <div className={styles.noticeTable}>
                    <Tables rowType={'notice'} data={notice}/>
                    </div>
                </div>
            </div>
            <div className={`${styles.support} ${styles.boxSection}`}>
                <div className={styles.inner}>
                    <div className={styles.label}>
                        <h2>고객지원 내역</h2>
                    </div>
                    <div className={styles.supportTable}>
                    <Tables rowType={'support'} data={support}/>
                    </div>
                </div>
            </div> */}
         </>
    )
}

export default LandingPage;