'use client';
import React, { useEffect, useRef, useState } from 'react';
import { Tables } from "@/components/SummaryTables";
import CountUpAnimation from '@/components/D3/CountUpAnimation';
import LineChart from '@/components/D3/LineChart';
import DonutChart from '@/components/D3/DonutChart';
import styles from "./index.module.scss";
import { useRecoilState, useRecoilValue } from 'recoil';
import { visualAtom, dataListAtom } from '@/states/data';
import { apiBe} from '@/services';
import { useRouter, usePathname } from 'next/navigation';
import Breadcrumb from '@/components/Breadcrumb';
import MonthBar from '@/components/MonthBar';
import { monthAtom } from '@/states';
import Loading from '@/components/Loading';
import { generateDates } from '@/utils/date';
import lodash from 'lodash';
import { getCookie } from '@/utils/cookie';
interface visualType {
    top10bycust: any;
    trendMonth: any;
    donutChart: any;
    diffMonth: any;
}
// const InvoiceVisual: React.FC<Props> = ({ top10, billing, support, announce, dData1, dData2, lineChartData }) => {
const Summary = ({ header }: { header: boolean } = { header: true }) => {
    const month= useRecoilValue(monthAtom);
    const [visual, setVisual] = useState<visualType>({
        top10bycust: null,
        trendMonth: null,
        donutChart: null,
        diffMonth: null
    });
    const [ data, setData ] = useRecoilState(dataListAtom) || null;
    const svgContainer = useRef<HTMLDivElement>(null);
    const router = useRouter();
    const path = usePathname();
    
    useEffect(() => {
        const accessToken = getCookie('accessToken');
        const targetUrl = (arg:string) => {
            return `/billing/total/${arg}/${month}`;
        }
        const fetchData = async(url:string) => {
            const response = await apiBe.get(url, { headers: { Authorization: `Bearer ${accessToken}` } });
            if(response.status === 200) return response.data;
        }
        
        const getAllData = async(urls:string[]) => {
            return Promise.all(urls.map(fetchData));
        }
    

        const getOverview = (data:any) => {
            const result = data.reduce((acc:any, cur:any) => {
                acc.push({targe_month: cur.targetMonth.substr(4,6), useAmount: cur.summary.useAmount})
                return acc
            })
            return result;
        }

        const getDonutChart = (data:any) => {
            const { top10 } = data;
            return top10.map((item:any) => ({
                // ...item,
                name: item.memberName,
                // ratio: totalSum > 0 ? item.sum_Of_demandAmount / totalSum : 0,
                value: item.totalDemandAmount
            }));
        }

        const getPerMonthData = (data:any) => {
            const result = data.reduce((acc:any, cur:any) => {
                acc.push({x:cur.trend.current_month.substr(4,2), y: cur.trend.current_totalDemandAmount, z:cur.trend.diff, a:cur.trend.growth_rate})
                return acc
            },[])
            return result;
        }
       
        const fetching = () => {
            getAllData([targetUrl('top10bycust'), targetUrl('monthly'), targetUrl('month')]).then((res: any) => {
                    const [top10bycust, monthly, diffMonth] = res;
                    setVisual({
                        ...visual,
                        diffMonth: diffMonth,
                        trendMonth: monthly ? getPerMonthData(monthly) : null,
                        top10bycust: top10bycust.top10,
                        donutChart: top10bycust ? getDonutChart(top10bycust) : null
                    })
        });
    }
    fetching();
    }, [month])

    if(!visual) return <Loading/>

    const { top10bycust,  trendMonth, donutChart, diffMonth} = visual;
    if(!top10bycust || !trendMonth || !donutChart || !diffMonth) return <Loading />
    return (
        <>
        <Breadcrumb />
        <div className={`${styles.container} min-h-screen`} ref={svgContainer}>
            { header && <div className={`${styles.demandAmount} ${styles.boxSection}`}>
                {diffMonth.memberName && <h1 className={styles.memberName}>{diffMonth.memberName}</h1>}
                <MonthBar />
            </div>}
            <div className={styles.demandAmount}>
                <div className={`${styles.col2} ${styles.half} flex items-center justify-center flex-wrap`}>
                    <div className={`${styles.left} ${styles.boxSection} prevMonth flex items-center justify-center`}>
                        <div className={styles.inner}>
                            <div className={styles.label}>
                                <h2>전월 네이버 전체매출</h2>
                            </div>
                            <div className={styles.countup}>
                                <label htmlFor="totalDemandAmount">전체고객사</label>
                                <span><CountUpAnimation endValue={diffMonth.trend.prev_totalDemandAmount} duration={500} /> KRW</span>
                            </div>
                        </div>
                    </div>
                    <div className={`${styles.right} ${styles.boxSection} currentMonth flex items-center justify-center`}>
                        <div className={styles.inner}>
                            <div className={styles.label}>
                                <h2>당월 네이버 전체매출<span>{Math.round(diffMonth.trend.growth_rate)}&#37;</span></h2>
                            </div>
                            <div className={styles.countup}>
                                <label htmlFor="totalDemandAmount">전체고객사</label>
                                <span><CountUpAnimation endValue={diffMonth.trend.current_totalDemandAmount} duration={500} /> KRW</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

        {trendMonth && trendMonth.length > 0 ? 
            <div className={styles.trendMonth} >
                <div className={`${styles.boxSection} period_sales flex items-center justify-center flex-wrap`}>
                    <div className={styles.inner}>
                        <div className={styles.label}>
                            <h2>월간 이용 추이</h2>
                        </div>
                        <div className={styles.lineChart}>
                                    {trendMonth && <LineChart data={trendMonth} aspectRatio={16 / 5} />}
                        </div>
                        <div className={styles.trendMonthTable}>
                            <Tables rowType={"trendMonth"} data={trendMonth} />
                        </div>
                    </div>
                </div>
            </div>:<div>데이터가 없습니다</div>}
            
            <div className={styles.rank}>
                <div className={`${styles.col2} ${styles.asymc} period_sales flex items-center justify-center flex-wrap`}>
                    <div className={`${styles.left} ${styles.boxSection} flex justify-center items-center`}>
                        <div className={styles.inner}>
                            <div className={styles.label}>
                                <h2>매출 TOP 10</h2>
                            </div>
                            <div className="w-full">
                                <Tables rowType="top10bycust" data={top10bycust} />
                            </div>
                        </div>
                    </div>
                    <div className={`${styles.right} ${styles.boxSection} period_sales flex items-center justify-center flex-wrap`}>
                        <div className={styles.inner}>
                            <div className={styles.label}>
                                <h2>서비스 세부사항</h2>
                            </div>
                            <div className="flex justify-center items-center">
                                    {donutChart && <DonutChart data={donutChart} title={"전체 서비스"} />}
                            </div>
                        </div> 
                    </div>
                </div>
            </div>
    </div>
    </>
    )
}

export default Summary;