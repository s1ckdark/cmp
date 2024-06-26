'use client';
import { useEffect, useState } from 'react';
import { Tables } from '@/components/SummaryTables';
import CountUpAnimation from '@/components/D3/CountUpAnimation';
import BarChart from '@/components/D3/BarChart';
import DonutChart from '@/components/D3/DonutChart';
import styles from './InvoiceVisual.module.scss';
import MonthBar from '@/components/MonthBar';
import { useRecoilState, useResetRecoilState } from 'recoil';
import { visualAtom, dataListAtom } from '@/states/data';
import { apiBe } from '@/services';
import { useRouter, usePathname } from 'next/navigation';
import Loading from '@/components/Loading';
import Breadcrumb from '@/components/Breadcrumb';
import { generateDates } from '@/utils/date';
import { Toast } from '@/components/Toast';
import Button from '@/components/Button';
import _ from 'lodash';
import { getCurrentMonth } from '@/utils/date';
interface DemandItem {
  rank: number;
  demandType: string;
  sum_Of_demandAmount: number;
  ratio_of_total: number; // The ratio will be calculated, so it's optional initially
  start: string;
  end: string;
}
const InvoiceVisual = () => {
  const pathname = usePathname();
  const memberNo = _.nth(pathname.split('/'), -2);
  const target_month = _.last(pathname.split('/'));
  const [visual, setVisual] = useRecoilState(visualAtom);
  const [data, setData] = useRecoilState(dataListAtom) || null;
  const resetData = useResetRecoilState(dataListAtom);
  const resetVisual = useResetRecoilState(visualAtom);
  const router = useRouter();
  useEffect(() => {
    resetData();
    resetVisual();
    const targetUrl = (arg: string) => {
      return `/billing/naver_summary/${arg}/${target_month}/${memberNo}`;
    };

    const getAllData = async (urls: string[]) => {
      return Promise.all(urls.map(fetchData));
    };

    const fetchData = async (url: string) => {
      const response = await apiBe.get(url);
      if (response.status === 200) return response.data;
    };

    const getOverview = (data: any) => {
      const result = data.reduce((acc: any, cur: any) => {
        acc.push({ targe_month: cur.targetMonth.substr(4, 6), useAmount: cur.summary.useAmount });
        return acc;
      });
      console.log(result);
      return result;
    };

    const getMainService = (data: any) => {
      const { firstDayOfMonth, relevantDate } = generateDates(data.target_month);
      const { top } = data;
      const totalSum = top.reduce((sum: any, item: any) => sum + item.sum_Of_demandAmount, 0);
      return top.map((item: any) => ({
        // ...item,
        name: item.demandType,
        rank: item.rank,
        amount: item.sum_Of_demandAmount,
        ratio: totalSum > 0 ? item.sum_Of_demandAmount / totalSum : 0,
        start: firstDayOfMonth,
        end: relevantDate,
      }));
    };

    const getDonutChart = (data: any) => {
      const { top } = data;
      const totalSum = top.reduce((sum: any, item: any) => sum + item.sum_Of_demandAmount, 0);
      return top.map((item: any) => ({
        // ...item,
        name: item.demandType,
        value: totalSum > 0 ? item.sum_Of_demandAmount / totalSum : 0,
      }));
    };

    const getPerMonthData = (data: any) => {
      const result = data.reduce((acc: any, cur: any) => {
        acc.push({ x: cur.target_month.substr(4, 6), y: cur.summary.useAmount });
        return acc;
      }, []);
      return result;
    };

    const getWeeklyData = (data: any) => {
      const result = data.reduce((acc: any, cur: any) => {
        acc.push({ x: cur.dayOfWeek, y: cur.dailyUsageAmount || 0 });
        return acc;
      }, []);
      return result;
    };

    const getDailyData = (data: any) => {
      const result = data.reduce((acc: any, cur: any) => {
        acc.push({ x: Number(cur.collected_dt.substr(8, 2)), y: cur.dailyUsageAmount > 0 ? cur.dailyUsageAmount : 0 });
        return acc;
      }, []);
      return result;
    };
    getAllData([targetUrl('month'), targetUrl('mainservice'), targetUrl('monthly'), targetUrl('weekly'), targetUrl('daily')])
      .then((res) => {
        const [month, mainservice, monthly, weekly, daily] = res;

        setVisual({
          ...visual,
          month: month,
          mainservice: getMainService(mainservice),
          donutChart: getDonutChart(mainservice),
          perMonth: getPerMonthData(monthly),
          perWeek: getWeeklyData(weekly),
          perDay: getDailyData(daily),
        });
      })
      .catch((error) => {
        Toast('error', '저장된 데이터가 없습니다', () => router.push('/billing/invoice/1'));
      });
  }, [memberNo, target_month, pathname]);

  if (!visual) return <Loading className="loadingPage" />;
  const { month, mainservice, donutChart, perMonth, perWeek, perDay } = visual;
  //   if (!month || !mainservice || !donutChart || !perMonth || !perWeek || !perDay) return <Loading className="loadingPage" />;
  return (
    <>
      <Breadcrumb />
      <div className={styles.btnArea}>
        {/* <button className={`${styles.btn} ${styles.backBtn}`} onClick={()=> router.push(`/billing/invoice/view/${memberNo}/${targetMonth}`)}>상세이용내역</button> */}
        <Button type="button" skin={'gray'} className="me-2" onClick={() => router.back()}>
          이전
        </Button>
        <Button type="button" skin={'gray'} onClick={() => router.push(`/billing/invoice/list/${getCurrentMonth()}/1`)}>
          목록
        </Button>
      </div>
      <div className={`${styles.container} min-h-screen`}>
        <div className={`${styles.demandAmount} ${styles.boxSection}`}>
          {month.memberName && <h1 className={styles.memberName}>{month.memberName}</h1>}
          <MonthBar />
        </div>
        <div className={styles.demandAmount}>
          <div className={`${styles.col2} ${styles.half} flex items-center justify-center flex-wrap`}>
            <div className={`${styles.left} ${styles.boxSection} prevMonth flex items-center justify-center`}>
              <div className={styles.inner}>
                <div className={styles.label}>
                  <h2>전월 비용</h2>
                </div>
                <div className={styles.countup}>
                  <span>
                    <CountUpAnimation endValue={month.trend.pre_totalDemandAmount} duration={500} />
                    KRW
                  </span>
                </div>
              </div>
            </div>
            <div className={`${styles.right} ${styles.boxSection} currentMonth flex items-center justify-center`}>
              <div className={styles.inner}>
                <div className={styles.label}>
                  <h2>금월 비용</h2>
                </div>
                <div className={styles.countup}>
                  <span>
                    <CountUpAnimation endValue={month.trend.current_totalDemandAmount} duration={500} />
                    KRW
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className={styles.rank}>
          <div className={`${styles.col2} ${styles.asymc} period_sales flex items-center justify-center flex-wrap`}>
            <div className={`${styles.left} ${styles.boxSection} flex justify-center items-center`}>
              <div className={styles.inner}>
                <div className={styles.label}>
                  <h2>주요 서비스</h2>
                </div>
                <div className="w-full">
                  <Tables rowType="top10" data={mainservice} />
                </div>
              </div>
            </div>
            <div className={`${styles.right} ${styles.boxSection} period_sales flex items-center justify-center flex-wrap`}>
              <div className={styles.inner}>
                <div className={styles.label}>
                  <h2>서비스 세부사항</h2>
                </div>
                <div className="flex justify-center items-center">{donutChart && <DonutChart data={donutChart} title={'전체 서비스'} />}</div>
              </div>
            </div>
          </div>
        </div>

        {perMonth.length > 0 ? (
          <div className={styles.perMonth}>
            <div className={`${styles.boxSection} period_sales flex items-center justify-center flex-wrap`}>
              <div className={styles.inner}>
                <div className={styles.label}>
                  <h2>월간 이용 추이</h2>
                </div>
                <div className={`${styles.col2} ${styles.asymc} flex justify-center items-center`}>
                  <div className={styles.left}>{perMonth && <BarChart data={perMonth} aspectRatio={7 / 3} />}</div>
                  <div className={styles.right}>
                    <Tables rowType={'perMonth'} data={perMonth} />
                  </div>
                </div>
              </div>
            </div>
          </div>
        ) : (
          <div>데이터가 없습니다</div>
        )}

        {perWeek.length > 0 ? (
          <div className={styles.perWeek}>
            <div className={`${styles.boxSection} period_sales flex items-center justify-center flex-wrap`}>
              <div className={styles.inner}>
                <div className={styles.label}>
                  <h2>주간 이용 추이</h2>
                </div>
                <div className={`${styles.col2} ${styles.asymc} flex justify-center items-center`}>
                  <div className={styles.left}>{perWeek && <BarChart data={perWeek} aspectRatio={7 / 3} />}</div>
                  <div className={styles.right}>
                    <Tables rowType={'perWeek'} data={perWeek} />
                  </div>
                </div>
              </div>
            </div>
          </div>
        ) : (
          <div>데이터가 없습니다</div>
        )}

        {perDay.length > 0 ? (
          <div className={styles.perDay}>
            <div className={`${styles.boxSection} period_sales flex items-center justify-center flex-wrap`}>
              <div className={styles.inner}>
                <div className={styles.label}>
                  <h2>일간 이용 추이</h2>
                </div>
                <div className="flex justify-center items-center">{perDay && <BarChart data={perDay} aspectRatio={7 / 3} />}</div>
              </div>
            </div>
          </div>
        ) : (
          <div>데이터가 없습니다</div>
        )}
      </div>
    </>
  );
};

export default InvoiceVisual;
