'use client';

import React,{ ReactNode, useState } from 'react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';

interface Props {
  children: ReactNode;
  props: any;
}


const Providers = ({  children,...props}: Props) => {
const [queryClient] = useState(
    () =>
        new QueryClient({
            defaultOptions: {
                queries: {
                  retry: 0,
                  suspense: true,
                  refetchOnMount: false,
                  refetchOnWindowFocus: false,
                  staleTime: 30 * 1000,
                  cacheTime: 10 * 60 * 1000,
                },
            },
        }),
);
  return (
    <QueryClientProvider client={queryClient}>
      {children}
      <ReactQueryDevtools initialIsOpen={false} position='bottom-right' />
    </QueryClientProvider>
  );
};

export default Providers;