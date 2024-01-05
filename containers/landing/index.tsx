'use client';
import React, { useEffect, useRef, useState } from 'react';
import Summary from '@/components/Summary';
import Breadcrumb from '@/components/Breadcrumb';
import { useRecoilValue } from 'recoil';
import { monthAtom, geneMonthDateAtom } from '@/states';
import styles from './index.module.scss';
import { Tables } from '@/components/SummaryTables';
const announce = [
    {
      "idx": "134",
      "title": "2023년 하반기 서버 긴급 정검 안내 공지",
      "regDt": "2023.12.28 12:33:42"
    },
    {
      "idx": "133",
      "title": "2023년 하반기 서버 정기 정검 안내 공지",
      "regDt": "2023.12.20 12:33:42"
    },
    {
      "idx": "132",
      "title": "2023년 서비스 이용약관 변경 안내 공지",
      "regDt": "2023.12.01 12:33:42"
    }
  ]
  const support = [
    {
      "idx": "3",
      "title": "거래 내역 조회 오류 문의",
      "memberName": "비비탄",
      "status": "진행중",
      "regDt": "2023.12.22 12:33:42"
    },
    {
      "idx": "2",
      "title": "PDF 다운로드 오류 문의",
      "memberName": "비비탄",
      "status": "완료",
      "regDt": "2023.12.20 12:33:42"
    },
    {
      "idx": "1",
      "title": "로그인 오류 문의",
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
            <div className={`${styles.announce} ${styles.boxSection}`}>
                <div className={styles.inner}>
                    <div className={styles.label}>
                        <h2>공지사항</h2>
                    </div>
                    <div className={styles.announceTable}>
                    <Tables rowType={'announce'} data={announce}/>
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
            </div>
         </>
    )
}

export default LandingPage;