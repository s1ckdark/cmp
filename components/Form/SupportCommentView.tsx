import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { Toast } from '@/components/Toast';
import { FileUploader, FileDownloader } from '@/components/Files';
import { v4 as uuidv4 } from 'uuid';
import { apiBe } from '@/services';
import styles from './SupportCommentView.module.scss';
import Button from '@/components/Button';
import _ from 'lodash';
import { useRouter, usePathname } from 'next/navigation';
import { fileUploadAtom } from '@/states/data';
import { useRecoilState } from 'recoil';
import { refreshAtom } from '@/states';
import { confirmAtom } from '@/states/confirm';

interface ISupportCommentViewProps {
  data?: ISupportCommentView[];
  pageType: string;
  postId: string;
}
interface ISupportCommentView {
  id: string;
  content: string;
  fileIds?: string[];
  uploadedFiles?: string[];
  clientSession: string;
}

const SupportCommentView = ({ pageType, data, postId }: ISupportCommentViewProps) => {
  const [comments, setComments] = useState<any>([]);
  const [confirm, setConfirm] = useRecoilState(confirmAtom);
  const [refresh, setRefresh] = useRecoilState(refreshAtom);
  const [uploadedFile, setuploadedFile] = useRecoilState(fileUploadAtom);
  const uuid = uuidv4();
  const router = useRouter();
  const pathname = usePathname();
  // const {
  //   register,
  //   handleSubmit,
  //   getValues,
  //   setValue,
  //   formState: { errors },
  // } = useForm();
  //   {
  //   defaultValues: {
  //     id: id || '',
  //     content: content || '',
  //     fileIds: uploadedFiles || [],
  //     clientSession: uuid || uuidv4(),
  //   },
  // }

  // const onSubmit = async (formData: object) => {
  //   let tmp: any = _.cloneDeep(formData);
  //   try {
  //     if (pageType === 'edit') tmp['id'] = data.id;
  //     if (pageType === 'register') tmp['yn'] = true;
  //     tmp['clientSession'] = uuid;
  //     tmp['fileIds'] = uploadedFile.map((file: any) => file.id);
  //     const url = '/supportboard/board/comment';
  //     const response = pageType === 'register' ? await apiBe.put(url, tmp) : await apiBe.post(url, tmp);
  //     const message = pageType === 'register' ? '공지사항이 저장되었습니다' : '공지사항이 수정되었습니다';
  //     if (response.status === 200 || response.status === 201) {
  //       Toast('success', message, () => router.push(pathname + '?completed=true'));
  //     } else {
  //       Toast('error', '다시 시도해주세요');
  //     }
  //   } catch (error) {
  //     console.log(error);
  //     Toast('error', `${error}` || '다시 시도해주세요.');
  //   }
  // };
  const confirmDelComment = (id: string, commentId: string) => {
    setConfirm({ ...confirm, open: true, title: '삭제', message: '삭제 하시겠습니까?', onConfirm: () => delComment(id, commentId) });
  };
  const delComment = async (id: string, commentId: string) => {
    console.log(id, commentId);
    try {
      const url = `/supportboard/board/comment`;
      const response = await apiBe.delete(url, { data: { id: id, comment_id: commentId } });
      if (response.status === 200 || response.status === 201) {
        Toast('success', '삭제되었습니다', () => setRefresh(true));
      } else {
        Toast('error', '다시 시도해주세요');
      }
    } catch (error) {
      console.log(error);
      Toast('error', `${error}` || '다시 시도해주세요.');
    }
  };

  useEffect(() => {
    if (data) {
      setComments(data);
    }
  }, [data]);

  return (
    <>
      {data && (
        <div className={styles.listing}>
          {comments.map((comment: any, index: number) => {
            return (
              <div className={styles.comment} key={index}>
                <div className={styles.header}>
                  <div className={styles.regName}>{comment.regName}</div>
                  <div className={styles.regDt}>{comment.regDt}</div>
                  <div className={styles.btnArea}>
                    <span className={styles.commentDelBtn} onClick={() => confirmDelComment(postId, comment.id)}>
                      삭제
                    </span>
                  </div>
                </div>
                <div className={styles.content}>{comment.content}</div>
                {comment.uploadedFiles && comment.uploadedFiles.length > 0 && <FileDownloader data={comment.uploadedFiles} pageType="view" />}
              </div>
            );
          })}
        </div>
      )}

      {/* <form onSubmit={handleSubmit(onSubmit)} className={styles.comment}>
        <div className={styles.inputGroup}>
          <label htmlFor="content">내용</label>
          <textarea {...register('content', { required: true })} placeholder="덧글 내용을 입력해주세요." />
          {errors.content && <span>내용을 입력해주세요.</span>}
        </div>
        <FileUploader uuid={uuid} pageType="register" from="support" />
        <div className={styles.btnArea}>
          <Button type="submit" skin={'submit'}>
            등록
          </Button>
          <Button type="button" skin={'cancel'}>
            취소
          </Button>
        </div>
      </form> */}
    </>
  );
};

export default SupportCommentView;
