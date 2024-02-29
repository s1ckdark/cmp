import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { Toast } from '@/components/Toast';
import { FileUploader, FileDownloader } from '@/components/Files';
import { apiBe } from '@/services';
import styles from './SupportComment.module.scss';
import Button from '@/components/Button';
import _ from 'lodash';
import { useRouter, usePathname } from 'next/navigation';
import { fileUploadAtom } from '@/states/data';
import { refreshAtom } from '@/states';
import { useRecoilState, useResetRecoilState } from 'recoil';
interface ISupportCommentProps {
  data?: ISupportComment;
  pageType: string;
  postId: string;
  uuid: string;
}
interface ISupportComment {
  id: string;
  content: string;
  fileIds?: string[];
  uploadedFiles?: string[];
  clientSession: string;
}

const SupportComment = ({ uuid, pageType, data, postId }: ISupportCommentProps) => {
  const [comment, setComment] = useState<any>(data);
  const [uploadedFile, setUploadedFile] = useRecoilState(fileUploadAtom);
  const resetUploadedFile = useResetRecoilState(fileUploadAtom);
  const { id, content, uploadedFiles, clientSession }: ISupportComment = data ? data : { id: postId, content: '', uploadedFiles: [], clientSession: '' };
  const [refresh, setRefresh] = useRecoilState(refreshAtom);
  const router = useRouter();
  const pathname = usePathname();
  const {
    register,
    handleSubmit,
    getValues,
    reset,
    setValue,
    formState: { errors },
  } = useForm({
    defaultValues: {
      id: id || '',
      content: content || '',
      fileIds: uploadedFiles || [],
      clientSession: uuid,
    },
  });

  const resetComment = () => {
    reset();
    resetUploadedFile();
    setRefresh((current) => !current);
    console.log(uploadedFile);
  };

  const onSubmit = async (formData: object) => {
    let tmp: any = _.cloneDeep(formData);
    try {
      // if (pageType === 'edit')
      tmp['id'] = postId;
      tmp['clientSession'] = uuid;
      tmp['fileIds'] = uploadedFile.map((file: any) => file.id);
      const url = '/supportboard/board/comment';
      const response = pageType === 'register' ? await apiBe.put(url, tmp) : await apiBe.post(url, tmp);
      const message = pageType === 'register' ? '댓글이 저장되었습니다' : '댓글이 수정되었습니다';
      if (response.status === 200 || response.status === 201) {
        Toast('success', message, () => resetComment());
      } else {
        Toast('error', '다시 시도해주세요');
      }
    } catch (error) {
      console.log(error);
      Toast('error', `${error}` || '다시 시도해주세요.');
    }
  };

  useEffect(() => {
    if (refresh) {
      resetComment();
      setRefresh(false); // Optionally reset the refresh state if it's a toggle
    }
  }, [refresh, resetUploadedFile]);

  useEffect(() => {
    if (uploadedFile) {
      // get id from uploadedFile array object
      const getIds = uploadedFile.map((file: any) => {
        return file.id;
      });
      setValue('fileIds', getIds);
    }
  }, [uploadedFile]);

  // fileIds 리스트 만들고 submit시에 같이 보내기(file id만 포함되어있음)
  // uploadFiles는 현재 업로드된 파일 리스트(여러가지 파일 data)

  // useEffect(() => {
  //   if (data) {
  //     setValue('id', data.id);
  //     setValue('content', data.content);
  //     setValue('fileIds', data.uploadedFiles || []);
  //     setValue('clientSession', data.clientSession);
  //   }
  // }, [data]);

  useEffect(() => {
    if (pageType === 'register') {
      resetComment();
    }
  }, [pageType]);

  const goList = () => {
    router.push('/support/list/1');
  };
  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)} className={styles.comment}>
        <div className={styles.inputGroup}>
          <label htmlFor="content">내용</label>
          <textarea {...register('content', { required: true })} placeholder="덧글 내용을 입력해주세요." />
          {errors.content && <span>내용을 입력해주세요.</span>}
        </div>
        <FileUploader uuid={uuid} pageType="register" from="support" />
        <div className={styles.btnArea}>
          <Button type="submit" skin={'submit'}>
            댓글 등록
          </Button>
          <Button type="button" skin={'cancel'} onClick={goList}>
            목록
          </Button>
        </div>
      </form>
    </>
  );
};

export default SupportComment;
