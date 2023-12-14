import React, { ReactNode } from 'react';

import { getMetaData } from '@/app/shareMetadata';

export const metadata = getMetaData({
  url: 'https://argos.goodusdata.com/landing',
  title: "ARGOS SUPPORT",
  description: '고객게시판',
  imageUrl: '',
  keywords: ['argos'],
});

const Layout = ({ children }: { children: ReactNode }) => children;

export default Layout;