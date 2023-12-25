import { fetcher } from '@/services';
import React from 'react';
import useSWR from 'swr';
interface InvoiceProps {
  memberNo: number;
  targetMonth: string;

}
export const useInvoice = ({memberNo, targetMonth}:InvoiceProps) => {
  const { data, error, isLoading } = useSWR(`/apibe/invoice/${memberNo}/${targetMonth}`, fetcher);
  return {
    data:data,
    isError:error,
    isLoading
  }
}