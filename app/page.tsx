import { getMetaData } from '@/app/shareMetadata';

export const metadata = getMetaData({
  url: 'https://argos.goodusdata.com/',
  title: "WELCOME ARGOS by goodusdata",
  description: 'ARGOS',
  imageUrl: '',
  keywords: ['argos'],
});

export { default } from '@/containers/home';