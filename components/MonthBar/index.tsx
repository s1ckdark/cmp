import { monthAtom } from "@/states";
import { Toast } from "@/components/Toast";
import { useRecoilState } from "recoil";
import React, { useEffect, useState } from "react";
import styles from "./index.module.scss";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import dayjs from "dayjs";
import { BoxLeftArrow, BoxRightArrow } from "@/public/svgs";
import _ from "lodash";
import { filterUrl } from "@/utils/data";
import { pathSpliter } from "@/utils/data";

interface MonthBarProps {
    targetMonth?: any;
    pageNumber?: any;
}
// monthbar가 붙은 페이지에서는 monthAtom을 사용하지 않고, pathname을 통해 현재 페이지의 month를 가져온다.
const MonthBar = () => {
    const pathname = usePathname();
    const router = useRouter();
    const { targetMonth, pageNumber }: MonthBarProps = filterUrl(pathname, "list") ? pathSpliter(pathname) : { targetMonth: _.last(pathname.split("/")), pageNumber: null };
    const url = filterUrl(pathname, "list") ? pathname.split("/").slice(0, -2).join("/") : pathname.split("/").slice(0, -1).join("/");
    const getCurrentMonth = () => {
        return dayjs().format("YYYYMM");
    };

    const prevMonth = (inputMonth: any) => {
        const previousMonth = dayjs(inputMonth).subtract(1, "month").format("YYYYMM");
        // if(filterUrl(pathname, "list")) router.push(`./1`)
        targetUrl(previousMonth);
    };

    const nextMonth = (inputMonth: any) => {
        if (inputMonth === getCurrentMonth() && _.includes(pathname.split("/"), "invoice")) {
            Toast("warning", "이번달 이후의 데이터는 조회할 수 없습니다.");
            return;
        }
        const nextMonth = dayjs(inputMonth).add(1, "month").format("YYYYMM");
        targetUrl(nextMonth);
    };

    const targetUrl = (month: any) => {
        if (filterUrl(pathname, "list")) {
            router.push(`${url}/${month}/1`);
        } else {
            router.push(`${url}/${month}`);
        }
    };

    return (
        <div className={styles.monthBar}>
            <div className={styles.monthBarLeft}>
                <button className={styles.monthBarLeftBtn} onClick={() => prevMonth(targetMonth)}>
                    <BoxLeftArrow /> <span>이전달</span>
                </button>
            </div>
            <div className={styles.monthBarCenter}>
                <p className={styles.monthBarCenterText}>
                    {targetMonth.slice(0, 4)}년 {targetMonth.slice(4, 6)}월
                </p>
            </div>
            <div className={styles.monthBarRight}>
                <button className={styles.monthBarRightBtn} onClick={() => nextMonth(targetMonth)}>
                    <span>다음달</span> <BoxRightArrow />
                </button>
            </div>
        </div>
    );
};
export default MonthBar;
