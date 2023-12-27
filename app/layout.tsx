// import styled, * as styledComponents from "styled-components";
// import { theme } from '@/theme/theme';
import '@/styles/globals.scss';
import RecoilRootProvider from "@/utils/recoilRootProvider";
// import Alert from "@/components/Alert";
import React, { Suspense, ReactNode } from 'react';
// import { metadata as profileMetadata } from './profile/page';
// import Provider from './Provider';
import Toastify from '@/components/Toast';
// import { getSession, useSession } from 'next-auth/react';
// import { Session } from '@/types/data';
// import { getServerSession } from 'next-auth';
// import { authOptions } from '@/app/api/auth/[...nextauth]/route';
import AuthProvider from './AuthProvider';
import Loading from '@/components/Loading';
import { getServerSession } from "next-auth/next"
import { authOptions } from '@/app/api/auth/[...nextauth]/route';

interface Props {
  children: React.ReactNode;
  params: any;
}

const RootLayout = async({ children }: Props) => {
  const session = await getServerSession(authOptions)
  return (
    <html lang="kr">
      <body>
      <Suspense fallback={<Loading />}>
          <RecoilRootProvider>
            <AuthProvider session={session}>
              {/* <styledComponents.ThemeProvider theme={theme}> */}
                <div id='portal' />
                <div id='alert' />
                <div id='modal' />
                {/* <Alert /> */}
                <Toastify />
                {children as ReactNode}
              {/* </styledComponents.ThemeProvider> */}
            </AuthProvider>
          </RecoilRootProvider>
        </Suspense>
      </body>
    </html >
  );
}

export default RootLayout