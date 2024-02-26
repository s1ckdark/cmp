import { useForm, FormProvider, useFieldArray, useFormContext } from 'react-hook-form';
import Button from '@/components/Button';
import styles from './SupportForm.module.scss';
import { useRouter } from 'next/navigation';
import { SupportForm } from '@/components/Form/SupportForm';
import { v4 as uuidv4 } from 'uuid';
import { useEffect } from 'react';

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

export const SupportBoardForm = ({ data, pageType }: ISupportFormProps) => {
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

  useEffect(() => {
    setValue('clientSession', uuidv4());
  }, []);
  return (
    <FormProvider {...methods}>
      <form onSubmit={handleSubmit(onSubmit)} className={styles[pageType]}>
        <div className={styles.support}>
          <SupportForm pageType={pageType} />
        </div>
        <div className={`${styles.btnArea} mt-6 mx-auto`}>
          {pageType === 'register' || pageType === 'edit' ? (
            <Button type="submit" className={styles.submitBtn} skin="submit">
              {pageType === 'register' ? '등 록' : '저 장'}
            </Button>
          ) : (
            <Button type="button" onClick={editMode} className={styles.submitBtn} skin="green">
              수 정
            </Button>
          )}
          <Button type="button" className={styles.cancelBack} onClick={goList} skin="cancel">
            취 소
          </Button>
        </div>
      </form>
    </FormProvider>
  );
};
