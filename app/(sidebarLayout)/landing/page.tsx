'use client';
import LandingPage from '@/containers/landing';
import { top10Props, DonutChartProps, LineChartProps, SalesDataSeries } from '@/types/data';
import { atom, useRecoilValue, useRecoilState } from 'recoil';
import { authState } from '@/states/auth';
import { tokenState } from '@/states/recoilPersist';

const dData1: DonutChartProps[] = [
  { name: "Oracle Enterprise Edition", value: 65 },
  { name: "Rocket hammer", value: 25 },
  { name: "aws MSK", value: 10 },
];
const dData2: DonutChartProps[] = [
  { name: "Oracle Enterprise Edition", value: 58 },
  { name: "Rocket hammer", value: 33 },
  { name: "aws MSK", value: 9 },
];
const top10: top10Props[] = [
  {
    month: 1,
    userid: "bibitan01",
    username: "김비비",
    sales: "88,220,333"
  },
  {
    month: 2,
    userid: "bibitan01",
    username: "김비비",
    sales: "88,220,333"
  },
  {
    month: 3,
    userid: "bibitan01",
    username: "김비비",
    sales: "88,220,333"
  },
  {
    month: 4,
    userid: "bibitan01",
    username: "김비비",
    sales: "88,220,333"
  },
  {
    month: 5,
    userid: "bibitan01",
    username: "김비비",
    sales: "88,220,333"
  },
  {
    month: 6,
    userid: "bibitan01",
    username: "김비비",
    sales: "88,220,333"
  },
  {
    month: 7,
    userid: "bibitan01",
    username: "김비비",
    sales: "88,220,333"
  },
  {
    month: 8,
    userid: "bibitan01",
    username: "김비비",
    sales: "88,220,333"
  },
  {
    month: 9,
    userid: "bibitan01",
    username: "김비비",
    sales: "88,220,333"
  },
  {
    month: 10,
    userid: "bibitan01",
    username: "김비비",
    sales: "88,220,333"
  }
]


const lineChartData: SalesDataSeries[] = [
  {
    name: "Sales A",
    data: [
      { month: 1, sales: 50000 },
      { month: 2, sales: 75000 },
      { month: 3, sales: 60000 },
      { month: 4, sales: 85000 },
      { month: 5, sales: 70000 },
      { month: 6, sales: 90000 },
      { month: 7, sales: 80000 },
      { month: 8, sales: 95000 },
      { month: 9, sales: 85000 },
      { month: 10, sales: 100000 },
      { month: 11, sales: 95000 },
      { month: 12, sales: 105000 },
    ]
  },
  {
    name: "Sales B",
    data: [
      { month: 1, sales: 30000 },
      { month: 2, sales: 45000 },
      { month: 3, sales: 40000 },
      { month: 4, sales: 55000 },
      { month: 5, sales: 50000 },
      { month: 6, sales: 60000 },
      { month: 7, sales: 55000 },
      { month: 8, sales: 70000 },
      { month: 9, sales: 65000 },
      { month: 10, sales: 75000 },
      { month: 11, sales: 70000 },
      { month: 12, sales: 80000 },
    ]
  }
];

const announce = [
  {
    "번호": "134",
    "제목": "2023년 하반기 서버 긴급 정검 안내 공지",
    "등록일자": "2023.09.10 12:33:42"
  },
  {
    "번호": "134",
    "제목": "2023년 하반기 서버 긴급 정검 안내 공지",
    "등록일자": "2023.09.10 12:33:42"
  },
  {
    "번호": "134",
    "제목": "2023년 하반기 서버 긴급 정검 안내 공지",
    "등록일자": "2023.09.10 12:33:42"
  }
]
const support = [
  {
    "번호": "134",
    "제목": "2023년 하반기 서버 긴급 정검 안내 공지",
    "고객사": "비비탄",
    "진행상태": "진행중",
    "등록일자": "2023.09.10 12:33:42"
  },
  {
    "번호": "134",
    "제목": "2023년 하반기 서버 긴급 정검 안내 공지",
    "고객사": "비비탄",
    "진행상태": "완료",
    "등록일자": "2023.09.10 12:33:42"
  },
  {
    "번호": "134",
    "제목": "2023년 하반기 서버 긴급 정검 안내 공지",
    "고객사": "비비탄",
    "진행상태": "완료",
    "등록일자": "2023.09.10 12:33:42"
  }
]

const billing = [
  { "day": 1, "sales": 123456 },
  { "day": 2, "sales": 145678 },
  { "day": 3, "sales": 132456 },
  { "day": 4, "sales": 142356 },
  { "day": 5, "sales": 152456 },
  { "day": 6, "sales": 162356 },
  { "day": 7, "sales": 172456 },
  { "day": 8, "sales": 182356 },
  { "day": 9, "sales": 192456 },
  { "day": 10, "sales": 202356 },
  { "day": 11, "sales": 212456 },
  { "day": 12, "sales": 222356 },
  { "day": 13, "sales": 232456 },
  { "day": 14, "sales": 242356 },
  { "day": 15, "sales": 252456 },
  { "day": 16, "sales": 262356 },
  { "day": 17, "sales": 272456 },
  { "day": 18, "sales": 282356 },
  { "day": 19, "sales": 292456 },
  { "day": 20, "sales": 302356 },
  { "day": 21, "sales": 312456 },
  { "day": 22, "sales": 322356 },
  { "day": 23, "sales": 332456 },
  { "day": 24, "sales": 342356 },
  { "day": 25, "sales": 352456 },
  { "day": 26, "sales": 362356 },
  { "day": 27, "sales": 372456 },
  { "day": 28, "sales": 382356 },
  { "day": 29, "sales": 392456 },
  { "day": 30, "sales": 402356 }
];



interface LandingProps {
  top10: top10Props[];
  billing: { day: number; sales: number; }[];
  support: { 번호: string; 제목: string; 고객사: string; 진행상태: string; 등록일자: string; }[];
  announce: { 번호: string; 제목: string; 등록일자: string; }[];
  dData1: DonutChartProps[];
  dData2: DonutChartProps[];
  lineChartData: SalesDataSeries[];
}

const Landing = () => {
  // const token = useRecoilValue(tokenState);
  return (
    <LandingPage top10={top10} billing={billing} support={support} announce={announce} dData1={dData1} dData2={dData2} lineChartData={lineChartData} />
  )
}

export default Landing;


