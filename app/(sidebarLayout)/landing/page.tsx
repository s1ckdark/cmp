'use client';
import Image from 'next/image'
import styles from "@/styles/pages/landing.module.scss";
import Link from 'next/link';
import List from "@/components/board/list";
import CountUpAnimation from '@/components/d3/CountUpAnimation';
import LineChart from '@/components/d3/LineChart';
import BarChart from '@/components/d3/BarChart';
import PieChart from '@/components/d3/PieChart';
import DonutChart from '@/components/d3/DonutChart';

const Landing = () => {
  const dData1 = [
    { "name":"Oracle Enterprise Edition", "value":65 },
    { "name":"Rocket hammer", "value":25 },
    { "name":"aws MSK", "value":10 },
  ];
  const dData2 = [
    { "name":"Oracle Enterprise Edition", "value":58 },
    { "name":"Rocket hammer", "value":33 },
    { "name":"aws MSK", "value":9 },
  ];
  const top10 = [
    {
    "month":1,
    "userid":"bibitan01",
    "username":"김비비",
    "sales": "88,220,333"
    },
    {
      "month":2,
      "userid":"bibitan01",
      "username":"김비비",
      "sales": "88,220,333"
      },
      {
        "month":3,
        "userid":"bibitan01",
        "username":"김비비",
        "sales": "88,220,333"
      },
      {
        "month":4,
        "userid":"bibitan01",
        "username":"김비비",
        "sales": "88,220,333"
      },
      {
        "month":5,
        "userid":"bibitan01",
        "username":"김비비",
        "sales": "88,220,333"
      },
      {
        "month":6,
        "userid":"bibitan01",
        "username":"김비비",
        "sales": "88,220,333"
      },
      {
        "month":7,
        "userid":"bibitan01",
        "username":"김비비",
        "sales": "88,220,333"
      },
      {
        "month":8,
        "userid":"bibitan01",
        "username":"김비비",
        "sales": "88,220,333"
      },
      {
        "month":9,
        "userid":"bibitan01",
        "username":"김비비",
        "sales": "88,220,333"
      },
      {
        "month":10,
        "userid":"bibitan01",
        "username":"김비비",
        "sales": "88,220,333"
      }
  ]

  const lineChartData = [
    {
      name: "Sales A",
      data: [
        { "month": 1, "sales": 50000 },
        { "month": 2, "sales": 75000 },
        { "month": 3, "sales": 60000 },
        { "month": 4, "sales": 85000 },
        { "month": 5, "sales": 70000 },
        { "month": 6, "sales": 90000 },
        { "month": 7, "sales": 80000 },
        { "month": 8, "sales": 95000 },
        { "month": 9, "sales": 85000 },
        { "month": 10, "sales": 100000 },
        { "month": 11, "sales": 95000 },
        { "month": 12, "sales": 105000 },
      ]
    },
    {
      name: "Sales B",
      data: [
        { "month": 1, "sales": 30000 },
        { "month": 2, "sales": 45000 },
        { "month": 3, "sales": 40000 },
        { "month": 4, "sales": 55000 },
        { "month": 5, "sales": 50000 },
        { "month": 6, "sales": 60000 },
        { "month": 7, "sales": 55000 },
        { "month": 8, "sales": 70000 },
        { "month": 9, "sales": 65000 },
        { "month": 10, "sales": 75000 },
        { "month": 11, "sales": 70000 },
        { "month": 12, "sales": 80000 },
      ]
    }
  ];
  
  const announce = [
      {
            "번호":"134",
            "제목":"2023년 하반기 서버 긴급 정검 안내 공지",
            "등록일자":"2023.09.10 12:33:42"
      },
      {
        "번호":"134",
        "제목":"2023년 하반기 서버 긴급 정검 안내 공지",
        "등록일자":"2023.09.10 12:33:42"
  },
  {
    "번호":"134",
    "제목":"2023년 하반기 서버 긴급 정검 안내 공지",
    "등록일자":"2023.09.10 12:33:42"
}
  ]
  const support = [
    {
      "번호":"134",
      "제목":"2023년 하반기 서버 긴급 정검 안내 공지",
      "고객사":"비비탄",
      "진행상태":"진행중",
      "등록일자":"2023.09.10 12:33:42"
  },
  {
    "번호":"134",
    "제목":"2023년 하반기 서버 긴급 정검 안내 공지",
    "고객사":"비비탄",
    "진행상태":"완료",
    "등록일자":"2023.09.10 12:33:42"
},
{
  "번호":"134",
  "제목":"2023년 하반기 서버 긴급 정검 안내 공지",
  "고객사":"비비탄",
  "진행상태":"완료",
  "등록일자":"2023.09.10 12:33:42"
}
  ]

  const billing = [
    {"day": 1, "sales": 123456},
    {"day": 2, "sales": 145678},
    {"day": 3, "sales": 132456},
    {"day": 4, "sales": 142356},
    {"day": 5, "sales": 152456},
    {"day": 6, "sales": 162356},
    {"day": 7, "sales": 172456},
    {"day": 8, "sales": 182356},
    {"day": 9, "sales": 192456},
    {"day": 10, "sales": 202356},
    {"day": 11, "sales": 212456},
    {"day": 12, "sales": 222356},
    {"day": 13, "sales": 232456},
    {"day": 14, "sales": 242356},
    {"day": 15, "sales": 252456},
    {"day": 16, "sales": 262356},
    {"day": 17, "sales": 272456},
    {"day": 18, "sales": 282356},
    {"day": 19, "sales": 292456},
    {"day": 20, "sales": 302356},
    {"day": 21, "sales": 312456},
    {"day": 22, "sales": 322356},
    {"day": 23, "sales": 332456},
    {"day": 24, "sales": 342356},
    {"day": 25, "sales": 352456},
    {"day": 26, "sales": 362356},
    {"day": 27, "sales": 372456},
    {"day": 28, "sales": 382356},
    {"day": 29, "sales": 392456},
    {"day": 30, "sales": 402356}
  ];

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
            <List type="per_month" data={lineChartData[0].data} />
          </div>
          <div className="whole w-1/2"></div>
            <List type="per_month" data={lineChartData[1].data} />
          </div>
      </div>
      <div className={`${styles.box_section} period_sales flex items-center justify-center flex-wrap`}>
        <h2>매출 TOP10</h2>
        <div className="flex justify-center items-center">
          <div className="whole w-1/2">
            <div className="bg-gray-500 text-center">전체 고객사</div>
            <List type="top10" data={top10} />
          </div>
          <div className="supervised w-1/2">
            <div className="bg-gray-500 text-center">담당 고객사</div>
            <List type="top10" data={top10} />
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
          <DonutChart data={dData2}  title={"담당 서비스"} />
          </div>
        </div>
      </div>
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
      <div className={`${styles.box_section} w-full`}>
        <h2>공지사항</h2>
        <List type="announce" data={announce} />
      </div>
      <div className={`${styles.box_section} w-full`}>
        <h2>고객지원 내역</h2>
        <List type="support" data={support} />
      </div>
    </div>
  )
}

export default Landing;