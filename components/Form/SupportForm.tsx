'use client';
import { useForm, Controller } from 'react-hook-form';
import styles from './SupportForm.module.scss';
import { useRouter } from 'next/navigation';
import { FileUploader } from '@/components/Files';
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
import { IconSearch } from '@/public/svgs';
import Button from '@/components/Button';

interface ISupportFormProps {
  supportId?: string;
  data?: ISupportForm;
  pageType: string;
}

interface ISupportForm {
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
}

interface ISupportComment {
  id: string;
  content: string;
  fileIds?: string[];
  clientSession: string;
}

const SupportForm = ({ data, pageType }: ISupportFormProps) => {
  const [support, setSupport] = useState<any>(data || {});
  const [modal, setModal] = useRecoilState(modalAtom);
  const [confirm, setConfirm] = useRecoilState(confirmAtom);
  const [isDisabled, setIsDisabled] = useState<boolean>(false);
  const [uploadedFile, setUploadedFile] = useRecoilState(fileUploadAtom);
  const [uuid, setUuid] = useState<any>();
  const { id, subject, memberNo, memberName, chargeName, chargeEmail, repName, repEmail, salesName, salesEmail, statusName, typeName, content, fileIds, uploadedFiles, clientSession } = data || {};
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
  const resetModal = useResetRecoilState(modalAtom);

  const onSubmit = async (formData: object) => {
    let tmp: any = _.cloneDeep(formData);
    try {
      // if (pageType === 'edit') tmp['id'] = formData.id;
      tmp['fileIds'] = uploadedFile.map((file: any) => file.id);
      tmp['clientSession'] = uuid;
      const url = '/supportboard/board';
      const response = pageType === 'register' ? await apiBe.put(url, tmp) : await apiBe.post(url, tmp);
      const message = pageType === 'register' ? '공지사항이 저장되었습니다' : '공지사항이 수정되었습니다';
      if (response.status === 200 || response.status === 201) {
        Toast('success', message, () => goList());
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
    { value: '진행', label: '진행' },
    { value: '완료', label: '완료' },
  ];

  const openModal = (type: string, target?: string) => {
    setModal({ ...modal, isOpen: true, type: type, target: target });
  };

  const goList = () => {
    router.push('/support/list/1');
  };

  useEffect(() => {
    setUuid(uuidv4());
    setUploadedFile([]);
    setValue('statusName', selectOptions[0].value);
  }, []);

  useEffect(() => {
    if (uploadedFile) {
      // get id from uploadedFile array object
      console.log(uploadedFile);
      const getIds = uploadedFile.map((file: any) => {
        return file.id;
      });
      console.log(getIds);
      setValue('fileIds', getIds);
    }
  }, [uploadedFile]);

  useEffect(() => {
    if (modal.type === 'member') {
      setValue('memberNo', modal.data?.memberNo);
      setValue('memberName', modal.data?.memberName);
    }

    if (modal.type === 'user') {
      setValue(`${modal.target}Name` as keyof typeof defaultValues, modal.data?.name);
      setValue(`${modal.target}Email` as keyof typeof defaultValues, modal.data?.email);
    }
  }, [modal]);

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
    }
  }, [data]);

  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)} className={styles[pageType]}>
        <div className={styles.inputGroup}>
          <label htmlFor="subject">제목</label>
          <input type="text" {...register('subject', { required: false })} readOnly={isDisabled} />
        </div>
        <div className={styles.inputGroupGrid}>
          {/* <label htmlFor="memberName">고객사</label> */}
          <div className={styles.inputGroupCol2}>
            <div className={styles.inputGroup}>
              <label htmlFor="memberName">고객사번호</label>
              <input type="text" {...register('memberNo', { required: false })} readOnly={true} onClick={() => openModal('member')} />
              <IconSearch onClick={() => openModal('member')} />
            </div>
            <div className={styles.inputGroup}>
              <label htmlFor="memberName">고객사명</label>
              <input type="text" {...register('memberName', { required: false })} readOnly={true} onClick={() => openModal('member')} />
              <IconSearch onClick={() => openModal('member')} />
            </div>
          </div>
        </div>
        <div className={styles.inputGroupGrid}>
          {/* <label htmlFor="chargeName">지원 담당자</label> */}
          <div className={styles.inputGroupCol2}>
            <div className={styles.inputGroup}>
              <label htmlFor="chargeName">지원 담당자명</label>
              <input type="text" {...register('chargeName', { required: false })} readOnly={true} onClick={() => openModal('user', 'charge')} />
              <IconSearch onClick={() => openModal('user', 'charge')} />
            </div>
            <div className={styles.inputGroup}>
              <label htmlFor="chargeEmail">지원 담당자 이메일</label>
              <input type="email" {...register('chargeEmail', { required: false })} readOnly={true} onClick={() => openModal('user', 'charge')} />
              <IconSearch onClick={() => openModal('user', 'charge')} />
            </div>
          </div>
        </div>
        <div className={styles.inputGroupGrid}>
          {/* <label htmlFor="salesName">영업 담당자</label> */}
          <div className={styles.inputGroupCol2}>
            <div className={styles.inputGroup}>
              <label htmlFor="salesName">영업 담당자명</label>
              <input type="text" {...register('salesName', { required: false })} readOnly={true} onClick={() => openModal('user', 'sales')} />
              <IconSearch onClick={() => openModal('user', 'sales')} />
            </div>
            <div className={styles.inputGroup}>
              <label htmlFor="salesEmail">영업 담당자 이메일</label>
              <input type="email" {...register('salesEmail', { required: false })} readOnly={true} onClick={() => openModal('user', 'sales')} />
              <IconSearch onClick={() => openModal('user', 'sales')} />
            </div>
          </div>
        </div>
        <div className={styles.inputGroupGrid}>
          {/* <label htmlFor="repName">고객사 담당자</label> */}
          <div className={styles.inputGroupCol2}>
            <div className={styles.inputGroup}>
              <label htmlFor="repName">고객사 담당자명</label>
              <input type="text" {...register('repName', { required: false })} readOnly={true} onClick={() => openModal('user', 'rep')} />
              <IconSearch onClick={() => openModal('user', 'rep')} />
            </div>
            <div className={styles.inputGroup}>
              <label htmlFor="repEmail">고객사 담당자 이메일</label>
              <input type="email" {...register('repEmail', { required: false })} readOnly={true} onClick={() => openModal('user', 'rep')} />
              <IconSearch onClick={() => openModal('user', 'rep')} />
            </div>
          </div>
        </div>
        <div className={styles.inputGroup}>
          <label htmlFor="salesName">상태</label>
          <Controller
            control={control}
            name="statusName"
            render={({ field: { onChange, value } }) => <Select inputId="statusName" defaultValue={selectOptions[0]} options={selectOptions} value={selectOptions.find((option: any) => option.value === value)} onChange={(option: any) => onChange(option.value)} />}
          />
        </div>
        <div className={styles.inputGroup}>
          <label htmlFor="salesName">지원유형</label>
          <div className={styles.radioBtn}>
            <label htmlFor="typeName">
              <input type="radio" {...register('typeName', { required: false })} readOnly={isDisabled} value={'일반'} />
              일반유형
            </label>
            <label htmlFor="typeName">
              <input type="radio" {...register('typeName', { required: false })} readOnly={isDisabled} value={'장애'} />
              장애
            </label>
            <label htmlFor="typeName">
              <input type="radio" {...register('typeName', { required: false })} readOnly={isDisabled} value={'견적'} />
              견적
            </label>
            <label htmlFor="typeName">
              <input type="radio" {...register('typeName', { required: false })} readOnly={isDisabled} value={'기타'} />
              기타문의
            </label>
          </div>
        </div>
        <div className={styles.inputGroup}>
          <label htmlFor="content">내용</label>
          <textarea {...register('content', { required: false })} readOnly={isDisabled} />
        </div>
        <div className={styles.files}>
          <FileUploader uuid={uuid} data={data?.uploadedFiles} pageType={pageType} from={'support'} />
        </div>

        <div className={`${styles.btnArea} mt-6 mx-auto`}>
          <Button type="submit" className={styles.submitBtn} skin="submit">
            {pageType === 'register' ? '등 록' : '저 장'}
          </Button>
          <Button type="button" className={styles.cancelBack} onClick={goList} skin="cancel">
            취 소
          </Button>
        </div>
      </form>
    </>
  );
};

export default SupportForm;
