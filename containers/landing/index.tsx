'use client';
import React, { useEffect, useRef, useState } from 'react';
import Summary from '@/components/Summary';
import Breadcrumb from '@/components/Breadcrumb';
import { useRecoilValue } from 'recoil';
import { monthAtom, geneMonthDateAtom } from '@/states';
import styles from './index.module.scss';
import { Tables } from '@/components/SummaryTables';
import { getCurrentMonth } from '@/utils/date';
import { get } from 'lodash';
  
const LandingPage = () => {
    const month = getCurrentMonth();
    const geneMonthDate = useRecoilValue(geneMonthDateAtom);
    return (
        <>
            <Breadcrumb />
            <div className={`${styles.demandAmount} ${styles.boxSection}`}>
                <h1 className={styles.currentMonth}><label htmlFor="term">이용 기간</label>{geneMonthDate.firstDayOfMonth} - {geneMonthDate.relevantDate}</h1>
            </div>
            <Summary header={false} month={month} />
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