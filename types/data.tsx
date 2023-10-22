interface DonutChart {
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
 

export type {
    DonutChart,
    SalesDataPoint,
    SalesDataSeries,
    LineChartProps,
    BarChartProps
  };