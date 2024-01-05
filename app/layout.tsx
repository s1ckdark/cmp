import '@/styles/globals.scss';
import RecoilRootProvider from "@/utils/recoilRootProvider";
import React, { Suspense, ReactNode } from 'react';
import Toastify from '@/components/Toast';
import AuthProvider from './AuthProvider';
import Loading from '@/components/Loading';

interface Props {
  children: React.ReactNode;
  params: any;
}

const RootLayout = async ({ children }: Props) => {
  return (
    <html lang="kr">
      <body>
      <Suspense fallback={<Loading />}>
          <RecoilRootProvider>
            <AuthProvider>
                <Toastify />
                {children as ReactNode}
            </AuthProvider>
          </RecoilRootProvider>
        </Suspense>
      </body>
    </html >
  );
}

export default RootLayout