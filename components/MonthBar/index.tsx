import { monthAtom } from "@/states";
import { Toast } from "@/components/Toast";
import { useRecoilState } from "recoil";
import React, { useEffect } from "react";
import styles from "./index.module.scss";
import { usePathname, useRouter,  useSearchParams } from "next/navigation";
import dayjs from "dayjs";
import { BoxLeftArrow, BoxRightArrow } from "@/public/svgs";

const MonthBar = () => {
    const [month, setMonth] = useRecoilState(monthAtom);
    const pathname = usePathname();
    const router = useRouter();

    const url = pathname.split("/").filter((item:any, index:number) => index < 3 ? item : null).join("/");
    const getCurrentMonth = () => {
        console.log("getCurrentMonth", dayjs().format("YYYYMM"));
        return dayjs().format("YYYYMM");
    };
    const prevMonth = (inputMonth: string) => {
        const previousMonth = dayjs(inputMonth).subtract(1, "month").format("YYYYMM");
        Toast("info", "데이터를 조회중입니다.", () => setMonth(previousMonth));
    };

    const nextMonth = (inputMonth: string) => {
        if (inputMonth === getCurrentMonth()) { Toast("warning", "이번달 이후의 데이터는 조회할 수 없습니다."); return; }
        const nextMonth = dayjs(inputMonth).add(1, "month").format("YYYYMM");
        
        Toast("info", "데이터를 조회중입니다.",()=>setMonth(nextMonth));
    };

    useEffect(() => {
        console.log(url+"로 변동");
        // setMonth(getCurrentMonth());
    }, [url]);

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
