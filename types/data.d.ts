export interface DonutChartProps {
  name: string,
  value: number
}

export interface SalesDataPoint {
  month: number;
  sales: number;
}

export interface SalesDataSeries {
  name: string;
  data: SalesDataPoint[];
}

export interface LineChartProps {
  data: SalesDataSeries[];
  width?: number;
  height?: number;
}

export interface BarChartProps {
  day: number,
  sales: number
}

export interface top10Props {
  month: number;
  userid: string;
  username: string;
  sales: string;
}

export interface fetchData {
  // Define the shape of your data here
  id: number;
  name: string;
  // ...
}

export interface UseDataFetchReturnType {
  data: fetchData | null;
  fetchedData: fetchData | undefined;
  isLoading: boolean;
  isError: boolean;
}

export interface DonutChartProps {
  data: Array<DonutChart>;
  title: string;
}
