interface DonutChartProps {
  name: string,
  value: number
}

interface SalesDataPoint {
  month: number;
  sales: number;
}

interface SalesDataSeries {
  name: string;
  data: SalesDataPoint[];
}

interface LineChartProps {
  data: SalesDataSeries[];
  width?: number;
  height?: number;
}

interface BarChartProps {
  day: number,
  sales: number
}

interface top10Props {
  month: number;
  userid: string;
  username: string;
  sales: string;
}

export type {
  DonutChartProps,
  SalesDataPoint,
  SalesDataSeries,
  LineChartProps,
  BarChartProps,
  top10Props
};