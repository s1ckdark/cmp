// 'use client';
import { useState } from 'react';
import { Tables } from "@/components/Tables";
import CountUpAnimation from '@/components/D3/CountUpAnimation';
import LineChart from '@/components/D3/LineChart';
import BarChart from '@/components/D3/BarChart';
import PieChart from '@/components/D3/PieChart';
import DonutChart from '@/components/D3/DonutChart';
import styles from "./index.module.scss";
import { top10Props, DonutChartProps, LineChartProps, SalesDataSeries } from '@/types/data';
import BillingNaver from './billingNaver';
import BillingGd from './billingGd';
interface BillingProps {
    top10: top10Props[];
    billing: { day: number; sales: number; }[];
    support: { 번호: string; 제목: string; 고객사: string; 진행상태: string; 등록일자: string; }[];
    announce: { 번호: string; 제목: string; 등록일자: string; }[];
    dData1: DonutChartProps[];
    dData2: DonutChartProps[];
    lineChartData: SalesDataSeries[];
}

const BillingPage: React.FC<BillingProps> = ({ top10, billing, support, announce, dData1, dData2, lineChartData }) => {
    return (
        <div className={`${styles.container} min-h-screen`}>
            <div className="w-full flex items-center justify-center flex-wrap">
                <div className={`${styles.box_section} prevMonth flex items-center justify-center flex-col w-1/2`}>
                    <h2>전원 전체 매출</h2>
                    <div className="whole">
                        <label>전체고객사</label>
                        <div><CountUpAnimation endValue={380320636} duration={500} /></div>
                    </div>
                    <div className="supervised">
                        <label>담당고객사</label>
                        <div>
                            <CountUpAnimation endValue={65320636} duration={500} />
                        </div>
                    </div>
                </div>
                <div className={`${styles.box_section} currentMonth flex items-center justify-center flex-col text-left w-1/2`}>
                    <h2>당월 전체 매출</h2>
                    <div className="whole">
                        <label>전체고객사</label>
                        <div>
                            <CountUpAnimation endValue={584320636} duration={500} />
                        </div>
                    </div>
                    <div className="supervised">
                        <label>담당고객사</label>
                        <div>
                            <CountUpAnimation endValue={110320800} duration={500} />
                        </div>
                    </div>
                </div>
            </div>
            <div className={`${styles.box_section} period_sales flex items-center justify-center flex-wrap`}>
                <h2>월별 매출</h2>
                <LineChart data={lineChartData} width="950" height="300" />
                <div className="flex justify-center items-center">
                    <div className="supervised w-1/2">
                        <Tables type="per_month" data={lineChartData[0].data} />
                    </div>
                    <div className="whole w-1/2"></div>
                    <Tables type="per_month" data={lineChartData[1].data} />
                </div>
            </div>
            <div className={`${styles.box_section} period_sales flex items-center justify-center flex-wrap`}>
                <h2>매출 TOP10</h2>
                <div className="flex justify-center items-center">
                    <div className="whole w-1/2">
                        <div className="bg-gray-500 text-center">전체 고객사</div>
                        <Tables type="top10" data={top10} />
                    </div>
                    <div className="supervised w-1/2">
                        <div className="bg-gray-500 text-center">담당 고객사</div>
                        <Tables type="top10" data={top10} />
                    </div>
                </div>
            </div>

            <div className="service_usage">
                <div className={`${styles.box_section} period_sales flex items-center justify-center flex-wrap`}>
                    <h2>서비스별 이용률</h2>
                    <div className="flex justify-center items-center">
                        <div className="whole w-1/2">
                            <DonutChart data={dData1} title={"전체 서비스"} />
                        </div>
                        <div className="supervised w-1/2">
                            <DonutChart data={dData2} title={"담당 서비스"} />
                        </div>
                    </div>
                </div>
            </div>
            <div className="service_usage">
                <BillingNaver />
                <BillingGd />
            </div>

            <div className="service_usage">
                <div className={`${styles.box_section} period_sales flex items-center justify-center flex-wrap`}>
                    <h2>서비스별 이용률</h2>
                    <div className="flex justify-center items-center">
                        <div className="whole w-4/5">
                            <BarChart data={billing} title={"월간 이용 추이"} width="100%" height="500px" />
                        </div>
                        <div className="supervised w-1/5">
                            <BarChart data={billing} title={"월간 이용 추이"} width="100%" height="500px" />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default BillingPage;