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

interface fetchData {
  // Define the shape of your data here
  id: number;
  name: string;
  // ...
}

interface UseDataFetchReturnType {
  data: fetchData | null;
  fetchedData: fetchData | undefined;
  isLoading: boolean;
  isError: boolean;
}

export type {
  fetchData,
  UseDataFetchReturnType,
  DonutChartProps,
  SalesDataPoint,
  SalesDataSeries,
  LineChartProps,
  BarChartProps,
  top10Props
};