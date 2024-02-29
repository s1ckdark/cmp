'use client';
import { useForm, Controller } from 'react-hook-form';
import styles from './SupportViewForm.module.scss';
import { useRouter } from 'next/navigation';
import { FileUploader, FileDownloader } from '@/components/Files';
import React, { useState, useRef, useEffect } from 'react';
import { Toast } from '@/components/Toast';
import { useRecoilState, useResetRecoilState } from 'recoil';
import { fileUploadAtom } from '@/states/data';
import { v4 as uuidv4 } from 'uuid';
import _ from 'lodash';
import { apiBe } from '@/services';
import { confirmAtom } from '@/states/confirm';
import Select from 'react-select';
import { modalAtom } from '@/states';

interface ISupportViewFormProps {
  supportId?: string;
  data?: ISupportViewForm;
  pageType: string;
}

interface ISupportViewForm {
  id: string;
  subject: string;
  memberNo: string;
  memberName: string;
  chargeName: string;
  chargeEmail: string;
  repName: string;
  repEmail: string;
  salesName: string;
  salesEmail: string;
  statusName: string;
  typeName: string;
  content: string;
  fileIds?: string[] | [];
  uploadedFiles?: string[] | [];
  clientSession: string;
  comments: ISupportComment[] | [];
  regName: string;
  regDt: string;
}

interface ISupportComment {
  id: string;
  content: string;
  fileIds?: string[];
  clientSession: string;
}

const SupportViewForm = ({ data, pageType }: ISupportViewFormProps) => {
  const [support, setSupport] = useState<any>(data || {});
  const [modal, setModal] = useRecoilState(modalAtom);
  const [confirm, setConfirm] = useRecoilState(confirmAtom);
  const [isDisabled, setIsDisabled] = useState<boolean>(false);
  const [uploadedFile, setUploadedFile] = useRecoilState(fileUploadAtom);
  const [uuid, setUuid] = useState<any>();
  const { id, subject, memberNo, memberName, chargeName, chargeEmail, repName, repEmail, salesName, salesEmail, statusName, typeName, content, fileIds, uploadedFiles, clientSession, regName, regDt } = data || {};
  const defaultValues = {
    id: id || '',
    subject: subject || '',
    memberNo: memberNo || '',
    memberName: memberName || '',
    chargeName: chargeName || '',
    chargeEmail: chargeEmail || '',
    repName: repName || '',
    repEmail: repEmail || '',
    salesName: salesName || '',
    salesEmail: salesEmail || '',
    statusName: statusName || '',
    typeName: typeName || '',
    content: content || '',
    fileIds: fileIds || [],
    uploadedFiles: uploadedFiles || [],
    clientSession: clientSession || '',
    regName: regName || '',
    regDt: regDt || '',
  };

  const {
    control,
    register,
    handleSubmit,
    getValues,
    setValue,
    reset,
    watch,
    formState: { errors },
  } = useForm({ defaultValues });

  const router = useRouter();

  const onSubmit = async (formData: object) => {
    let tmp: any = _.cloneDeep(formData);
    try {
      // if (pageType === 'edit') tmp['id'] = formData.id;
      tmp['fileIds'] = uploadedFile.map((file: any) => file.id);
      const url = '/supportboard/board';
      const response = pageType === 'register' ? await apiBe.put(url, tmp) : await apiBe.post(url, tmp);
      const message = pageType === 'register' ? '공지사항이 저장되었습니다' : '공지사항이 수정되었습니다';
      if (response.status === 200 || response.status === 201) {
        Toast('success', message, () => router.push('/support/list/1'));
      } else {
        Toast('error', '다시 시도해주세요');
      }
    } catch (error) {
      console.log(error);
      Toast('error', `${error}` || '다시 시도해주세요.');
    }
  };

  const selectOptions = [
    { value: '접수', label: '접수' },
    { value: '진행중', label: '진행중' },
    { value: '완료', label: '완료' },
  ];

  useEffect(() => {
    setUuid(uuidv4());
    setUploadedFile([]);
    setValue('clientSession', uuidv4());
    setValue('statusName', selectOptions[0].value);
  }, []);

  useEffect(() => {
    if (uploadedFile) {
      // get id from uploadedFile array object
      const getIds = uploadedFile.map((file: any) => {
        return file.id;
      });
      setValue('fileIds', getIds);
    }
  }, [uploadedFile]);

  useEffect(() => {
    if (data) {
      setValue('id', data.id);
      setValue('subject', data.subject);
      setValue('memberNo', data.memberNo);
      setValue('memberName', data.memberName);
      setValue('chargeName', data.chargeName);
      setValue('chargeEmail', data.chargeEmail);
      setValue('repName', data.repName);
      setValue('repEmail', data.repEmail);
      setValue('salesName', data.salesName);
      setValue('salesEmail', data.salesEmail);
      setValue('statusName', data.statusName);
      setValue('typeName', data.typeName);
      setValue('content', data.content);
      setValue('uploadedFiles', data.uploadedFiles || []);
      setValue('regDt', data.regDt);
      setValue('regName', data.regName);
      setIsDisabled(pageType === 'view' ? true : false);
    }
  }, [data, pageType]);

  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)} className={styles[pageType]}>
        <div className={styles.inputGroup}>
          <label htmlFor="subject">제목</label>
          <p> {subject}</p>
        </div>
        <div className={styles.inputGroupGrid}>
          <div className={styles.inputGroup}>
            <label htmlFor="chargeName">지원번호</label>
            <p> {id}</p>
          </div>
          <div className={styles.inputGroup}>
            <label htmlFor="statusName">상태</label>
            <p> {statusName}</p>
          </div>
          <div className={styles.inputGroup}>
            <label htmlFor="repName">등록자</label>
            <p> {regName}</p>
          </div>
          <div className={styles.inputGroup}>
            <label htmlFor="repName">등록일시</label>
            <p> {regDt}</p>
          </div>
        </div>
        <div className={styles.inputGroupGrid}>
          {/* <label htmlFor="memberName">고객사</label> */}
          <div className={styles.inputGroup}>
            <label htmlFor="memberName">고객사번호</label>
            <p> {memberNo}</p>
          </div>
          <div className={styles.inputGroup}>
            <label htmlFor="memberName">고객사명</label>
            <p> {memberName}</p>
          </div>
        </div>
        <div className={styles.inputGroupGrid}>
          {/* <label htmlFor="chargeName">지원 담당자</label> */}
          <div className={styles.inputGroup}>
            <label htmlFor="chargeName">지원 담당자명</label>
            <p> {chargeName}</p>
          </div>
          <div className={styles.inputGroup}>
            <label htmlFor="salesName">영업 담당자명</label>
            <p> {salesName}</p>
          </div>
          <div className={styles.inputGroup}>
            <label htmlFor="repName">고객사 담당자명</label>
            <p> {repName}</p>
          </div>
          <div className={styles.inputGroup}>
            <label htmlFor="repName">등록자</label>
            <p> {regName}</p>
          </div>
          <div className={styles.inputGroup}>
            <label htmlFor="repName">등록일시</label>
            <p> {regDt}</p>
          </div>
        </div>

        <div className={styles.files}>
          <FileDownloader uuid={uuid} data={data?.uploadedFiles} pageType={pageType} from={'support'} />
        </div>
      </form>
    </>
  );
};

export default SupportViewForm;
