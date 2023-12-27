import { valueof } from '@/types';

export interface DonutChartProps {
  name:string;
  value:number;
}

export interface SalesDataPoint {
 x: number;
  y: number;
}

export interface LineChartProps {
  data: SalesDataPoint[];
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

// export interface fetchData {
//   // Define the shape of your data here
//   id: number;
//   name: string;
//   // ...
// }

// export interface UseDataFetchReturnType {
//   data: fetchData | null;
//   fetchedData: fetchData | undefined;
//   isLoading: boolean;
//   isError: boolean;
// }

// export interface DonutChartProps {
//   data: Array<DonutChart>;
//   title: string;
// }


export interface TableHeaderProps {
  className?: string;
  rowType?: rowType;
}

export interface rowType {
  [key: string]: 'announce' | 'support' | 'top10' | 'per_month' | 'announceOverview' | 'customers' | 'billing' | 'billingCustomers'|  'users' | 'menu' | 'role' | 'roleReg' | 'roleMod' | 'access' | 'productGd' | 'productSW' | 'productMSP' | 'productCategory' | 'vendor' | 'contract' | 'invoiceUsage' | 'invoiceList' | 'billingProductList' | 'billingProductDetail' | 'top10bycust' | 'trendMonth';
}

export interface TableBodyProps {
  rowType: rowType;
  data?: Array<any>;
  pageNumber: number;
  className: string;
}

export interface CustomerTableBodyProps {
  data: Array<any>;
}
interface Array {
  [key: string]: any; 
}

export interface TablesProps {
  rowType: string;
  data?: Array<any>;
  className?: string;
}
export interface SubHeader {
  label: string;
  subHeaders?: string[];
  rowSpan?: number;
}

export interface UseDataReturnWithParams 
  extends UseDataReturn {
  setParams: (params: UseDataParams) => void;
}
export interface FetchProps {
    tags?: string[];
    revalidate?: number;
    body?: any;
    method: "GET" | "POST" | "PUT" | "DELETE";
    headers?: any;
}

export interface Session {
  id: string;
  name: string;
  accessToken: string;
  refreshToken: string;
  maxAge: number;
  userType?: string
  privileges: string[];
}