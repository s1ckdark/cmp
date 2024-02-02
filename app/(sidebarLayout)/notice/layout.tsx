import { ReactNode } from 'react';

import { getMetaData } from '@/app/shareMetadata';

export const metadata = getMetaData({
    url: 'https://argos.goodusdata.com/notice/list/1',
    title: "ARGOS NOTICE",
    description: '공지사항',
    imageUrl: '',
    keywords: ['argos'],
});

const Layout = ({ children }: { children: ReactNode }) => children;

export default Layout;