'use client';
import styled, * as styledComponents from "styled-components";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { GlobalStyle } from "@/styles/globalStyles";
import { theme } from '@/theme/theme';
import '@/styles/globals.scss';

import { Inter, Roboto, Noto_Sans_KR } from "next/font/google";
// import { Metadata } from "next";
// export const metadata: Metadata = {
// 	title: 'Create Next App',
// 	description: 'Generated by create next app',
// };

const inter = Roboto({ subsets: ['latin'] , weight: ['400', '700'] });

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
          <Applayout>
            {children}
          </Applayout>
        </styledComponents.ThemeProvider>
      </QueryClientProvider>
		</body>
	  </html>
	);
  }
  
  const Applayout = styled.div`
	display: flex;
	flex-direction: column;
	min-height: 100vh;
	flex: 1;
  `;
