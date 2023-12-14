import { monthAtom } from '@/states';
import { Toast } from '@/components/Toast';
import { useRecoilState } from 'recoil';
import React, {useEffect} from 'react';
import styles from './index.module.scss';
import { BoxLeftArrow, BoxRightArrow } from '@/public/svgs';

const MonthBar = () => {
    const [ month, setMonth ] = useRecoilState(monthAtom);
    const nextMonth = () => {
        const currentMonth = getCurrentMonth();
        const nextMonth = Number(month) + 1;
        nextMonth > Number(currentMonth) ? Toast('error','다음달 이용내역서가 없습니다.') : setMonth(nextMonth.toString());
    }

    const prevMonth = () => {
        const prevMonth = Number(month) - 1;
        setMonth(prevMonth.toString());
    }
    const getCurrentMonth = () => { return new Date().getFullYear().toString() + (new Date().getMonth() + 1).toString().padStart(2, '0')}
    const getMonth = () => {
        const currentMonth = getCurrentMonth();
        month !== currentMonth ? setMonth(currentMonth): null;
    }
    useEffect(() => {
        getMonth();
    },[])
return (
    <div className={styles.monthBar}>
        <div className={styles.monthBarLeft}>
            <button className={styles.monthBarLeftBtn} onClick={prevMonth}>
                <BoxLeftArrow /> <span>이전달</span>
            </button>
        </div>
        <div className={styles.monthBarCenter}>
            <p className={styles.monthBarCenterText}>{month.slice(0,4)}년 {month.slice(4,6)}월</p>
        </div>
        <div className={styles.monthBarRight}>
            <button className={styles.monthBarRightBtn} onClick={nextMonth}>
               <span>다음달</span> <BoxRightArrow />
            </button>
        </div>
    </div>
)
}
export default MonthBar;