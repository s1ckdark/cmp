import { useForm } from 'react-hook-form';
import Button from '@/components/Button';
import styles from './SupportForm.module.scss';
import { useRouter } from 'next/navigation';
import { FileUploader } from '@/components/Files';
import { UUID } from 'crypto';
interface ISupportFormProps {
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
  fileIds: string[];
  clientSession: string;
}

export const SupportForm = ({ data, pageType }: ISupportFormProps) => {
  const { id, subject, memberNo, memberName, chargeName, chargeEmail, repName, repEmail, salesName, salesEmail, statusName, typeName, content, fileIds, clientSession } = data || {};
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
    clientSession: clientSession || '',
  };
  const methods = useForm({ defaultValues });
  const {
    control,
    register,
    handleSubmit,
    getValues,
    setValue,
    reset,
    watch,
    formState: { errors },
  } = methods;
  const router = useRouter();
  const onSubmit = (data: any) => {
    console.log(data);
  };

  const editMode = () => {
    router.push(`/support/edit/${id}`);
  };

  return (
    <div className={styles.support}>
      <div className={styles.inputGroup}>
        <label htmlFor="subject">제목</label>
        <input type="text" {...register('subject', { required: true })} />
      </div>
      <div className={styles.inputGroup}>
        <label htmlFor="memberNo">고객사번호</label>
        <input type="text" {...register('memberNo', { required: true })} readOnly={true} />
      </div>
      <div className={styles.inputGroup}>
        <label htmlFor="memberName">고객사명</label>
        <input type="text" {...register('memberName', { required: true })} readOnly={true} />
      </div>
      <div className={styles.inputGroup}>
        <label htmlFor="chargeName">지원 담당자명</label>
        <input type="text" {...register('chargeName', { required: true })} readOnly={true} />
      </div>
      <div className={styles.inputGroup}>
        <label htmlFor="salesName">영업 담당자명</label>
        <input type="text" {...register('memberName', { required: true })} readOnly={true} />
      </div>
      <div className={styles.inputGroup}>
        <label htmlFor="salesName">영업 담당자명</label>
        <input type="text" {...register('memberName', { required: true })} readOnly={true} />
      </div>
      <div className={styles.inputGroup}>
        <label htmlFor="salesName">영업 담당자명</label>
        <input type="text" {...register('memberName', { required: true })} readOnly={true} />
      </div>
      <div className={styles.inputGroup}>
        <label htmlFor="salesName">상태</label>
        <input type="text" {...register('memberName', { required: true })} readOnly={true} />
      </div>
      <div className={styles.inputGroup}>
        <label htmlFor="salesName">지원유형</label>
        <input type="text" {...register('memberName', { required: true })} readOnly={true} />
      </div>
      <div className={styles.inputGroup}>
        <label htmlFor="content">내용</label>
        <input type="text" {...register('content', { required: true })} readOnly={true} />
      </div>
      <div className={styles.files}>
        <FileUploader />
      </div>
    </div>
  );
};
