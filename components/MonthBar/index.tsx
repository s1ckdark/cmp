import { monthAtom } from "@/states";
import { Toast } from "@/components/Toast";
import { useRecoilState } from "recoil";
import React, { useEffect } from "react";
import styles from "./index.module.scss";
import { BoxLeftArrow, BoxRightArrow } from "@/public/svgs";

const MonthBar = () => {
    const [month, setMonth] = useRecoilState(monthAtom);

    const getCurrentMonth = () => {
        return (
            new Date().getFullYear().toString() +
            (new Date().getMonth() + 1).toString().padStart(2, "0")
        );
    };
    const prevMonth = (inputMonth: string) => {
        // Parse the input string into year and month parts
        let year = parseInt(inputMonth.slice(0, 4), 10);
        let month = parseInt(inputMonth.slice(4, 6), 10);

        // Subtract 1 from the month
        month--;

        // Handle the case where the month becomes 0 (December)
        if (month === 0) {
            month = 12;
            year--;
        }

        // Format the previous month as "YYYYMM"
        const previousMonth = year.toString() + month.toString().padStart(2, "0");
        // console.log("prev month", prevMonth);
        Toast("info", "데이터를 조회중입니다.", () => setMonth(previousMonth));
    };

    const nextMonth = (inputMonth: string) => {
        // Parse the input string into year and month parts
        if (inputMonth === getCurrentMonth()) { Toast("warning", "이번달 이후의 데이터는 조회할 수 없습니다."); return; }
        let year = parseInt(inputMonth.slice(0, 4), 10);
        let month = parseInt(inputMonth.slice(4, 6), 10);

        // Add 1 to the month
        month++;

        // Handle the case where the month becomes 13 (January of the next year)
        if (month === 13) {
            month = 1;
            year++;
        }

        // Format the previous month as "YYYYMM"
        const nextMonth = year.toString() + month.toString().padStart(2, "0");
        
        // console.log("next month", nextMonth);
        
        Toast("info", "데이터를 조회중입니다.",()=>setMonth(nextMonth));
    };
    
    return (
        <div className={styles.monthBar}>
            <div className={styles.monthBarLeft}>
                <button
                    className={styles.monthBarLeftBtn}
                    onClick={() => prevMonth(month)}
                >
                    <BoxLeftArrow /> <span>이전달</span>
                </button>
            </div>
            <div className={styles.monthBarCenter}>
                <p className={styles.monthBarCenterText}>
                    {month.slice(0, 4)}년 {month.slice(4, 6)}월
                </p>
            </div>
            <div className={styles.monthBarRight}>
                <button
                    className={styles.monthBarRightBtn}
                    onClick={() => nextMonth(month)}
                >
                    <span>다음달</span> <BoxRightArrow />
                </button>
            </div>
        </div>
    );
};
export default MonthBar;
