import { ReactNode } from 'react';

import { getMetaData } from '@/app/shareMetadata';

export const metadata = getMetaData({
  url: 'https://argos.goodusdata.com/billing',
  title: "ARGOS BILLING",
  description: 'ARGOS',
  imageUrl: '',
  keywords: ['argos'],
});

const Layout = ({ children }: { children: ReactNode }) => children;

export default Layout;