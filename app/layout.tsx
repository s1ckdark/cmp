'use client';
import styled, * as styledComponents from "styled-components";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { GlobalStyle } from "@/styles/globalStyles";
import { theme } from '@/theme/theme';
import '@/styles/globals.scss';
import CountUpAnimation from "@/components/d3/CountUpAnimation";

export default function RootLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    const queryClient = new QueryClient();
    return (
      <html lang="kr">
        <body>
          <div id="portal" />
          <QueryClientProvider client={queryClient}>
            <ReactQueryDevtools />
            <styledComponents.ThemeProvider theme={theme}>
                <GlobalStyle />
                {children}
            </styledComponents.ThemeProvider>
          </QueryClientProvider> 
        </body>
      </html>
    );
}
  
  const Applayout = styled.div`
    display: flex;
    flex-direction: row;
    min-height: 100vh;
    flex: 1;
    flex-wrap: wrap;
    align-items: flex-start;  
    `;
