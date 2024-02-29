'use client';
import { useEffect, useState } from 'react';
import SupportViewForm from '@/components/Form/SupportViewForm';
import Breadcrumb from '@/components/Breadcrumb';
import { usePathname, useRouter } from 'next/navigation';
import { apiBe } from '@/services';
import _ from 'lodash';
import SupportComment from '@/components/Form/SupportComment';
import SupportCommentView from '@/components/Form/SupportCommentView';
import styles from './SupportView.module.scss';
import { useRecoilState } from 'recoil';
import { refreshAtom } from '@/states';
import { v4 as uuidv4 } from 'uuid';
import { confirmAtom } from '@/states/confirm';
import Button from '@/components/Button';
import { FileDownloader } from '@/components/Files';

const SupportView = () => {
  const [data, setData] = useState<any>({});
  const [confirm, setConfirm] = useRecoilState(confirmAtom);
  const [refresh, setRefresh] = useRecoilState(refreshAtom);
  const [uuid, setUuid] = useState<any>();
  const pathname = usePathname();
  const router = useRouter();
  const supportId: any = _.last(pathname.split('/'));

  useEffect(() => {
    const fetchData = async () => {
      const response = await apiBe.get(`/supportboard/board/${supportId}`);
      if (response.status === 200 || response.status === 201) {
        const { data } = response;
        setData(data.board);
      }
      router.push(pathname);
    };
    fetchData();
    if (refresh !== false) {
      setRefresh(false);
    }
  }, [pathname, refresh]);

  useEffect(() => {
    setUuid(uuidv4());
  }, []);

  const changeStatus = async (status: string) => {
    let tmp = _.cloneDeep(data);
    tmp['statusName'] = status;
    tmp['clientSession'] = tmp.uploadedFiles.length > 0 ? tmp.uploadedFiles[0].clientSession : uuid;
    tmp['fileIds'] = tmp.uploadFiles && tmp.uploadedFiles.length > 0 ? tmp.uploadedFiles.map((file: any) => file.id) : [];
    const url = `/supportboard/board`;
    const response = await apiBe.post(url, tmp);
    if (response.status === 200 || response.status === 201) {
      setRefresh(true);
    }
  };
  const confirmChangeStatus = (status: string) => {
    setConfirm({ ...confirm, open: true, message: '상태를 변경하시겠습니까?', onConfirm: () => changeStatus(status) });
  };

  return (
    <>
      <Breadcrumb />
      <div className={styles.posts}>
        <div className={styles.contents}>
          <div className={styles.postContent}>
            <div className={styles.postHeader}>
              <Button type="button" skin={data.statusName === '접수' ? 'green' : 'gray'} size="small" onClick={() => confirmChangeStatus('접수')}>
                접수
              </Button>
              <Button type="button" skin={data.statusName === '진행' ? 'green' : 'gray'} size="small" onClick={() => confirmChangeStatus('진행')}>
                진행
              </Button>
              <Button type="button" skin={data.statusName === '완료' ? 'green' : 'gray'} size="small" onClick={() => confirmChangeStatus('완료')}>
                완료
              </Button>
            </div>
            <textarea value={data.content} />
            <FileDownloader data={data.uploadedFiles} />
          </div>
          {data.comments && data.comments.length > 0 ? <SupportCommentView pageType="view" data={data.comments} postId={data.id} /> : null}
          <SupportComment uuid={uuid} pageType="register" postId={data.id} />
        </div>
        <div className={styles.info}>
          <SupportViewForm pageType="view" data={data} />
        </div>
      </div>
    </>
  );
};
export default SupportView;
