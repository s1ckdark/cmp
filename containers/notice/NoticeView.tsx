import Breadcrumb from '@/components/Breadcrumb';
import NoticeDetailView from './NoticeDetailView';
import { usePathname } from 'next/navigation';
import lodash from 'lodash';

const NoticeView = () => {
  const pathname = usePathname();
  const noticeId: any = lodash.last(pathname.split('/'));
  return (
    <>
      <Breadcrumb />
      <NoticeDetailView id={noticeId} pageType="view" />
    </>
  );
};
export default NoticeView;
