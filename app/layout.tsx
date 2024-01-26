import '@/styles/globals.scss';
import RecoilRootProvider from "@/utils/recoilRootProvider";
import React, { Suspense, ReactNode } from 'react';
import Toastify from '@/components/Toast';
import AuthProvider from './AuthProvider';
import Loading from '@/components/Loading';
import Modal from '@/components/Modal';
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
              <Modal />
              {children as ReactNode}
            </AuthProvider>
          </RecoilRootProvider>
        </Suspense>
      </body>
    </html >
  );
}

export default RootLayout