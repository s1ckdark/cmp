import { ReactNode } from 'react';

import { getMetaData } from '@/app/shareMetadata';

export const metadata = getMetaData({
    url: 'https://argos.goodusdata.com/bil',
    title: "ARGOS LANDING",
    description: 'ARGOS',
    imageUrl: '',
    keywords: ['argos'],
});

const Layout = ({ children }: { children: ReactNode }) => children;

export default Layout;