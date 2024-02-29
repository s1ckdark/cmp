'use client';
import React, { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { Toast } from '@/components/Toast';
import style from './FileUploader.module.scss';
import { apiBe } from '@/services';
import lodash, { set } from 'lodash';
import Button from '@/components/Button';
import { useRecoilState, useResetRecoilState } from 'recoil';
import { FileDownloader } from '@/components/Files';
import { clientSessionAtom, fileUploadAtom } from '@/states/data';
import { refreshAtom } from '@/states';
interface IFileProps {
  file: any;
  clientSession: any;
}

const FileUploader = ({ uuid, data, pageType, from }: any) => {
  const [fileList, setFileList] = useRecoilState(fileUploadAtom);
  const [refresh, setRefresh] = useRecoilState(refreshAtom);
  const [activeBtn, setActiveBtn] = useState<boolean>(true);
  const {
    register,
    handleSubmit,
    getValues,
    resetField,
    watch,
    setValue,
    formState: { errors },
  } = useForm({
    defaultValues: {
      file: {},
      clientSession: uuid,
    },
  });
  const resetFileList = useResetRecoilState(fileUploadAtom);

  const onSubmit = async (data: object) => {
    let tmp: any = {
      file: (data as any).file[0],
      clientSession: uuid,
    };
    const url = '/file/upload';
    Toast('info', '파일을 업로드 중입니다.');
    const response = await apiBe.post(url, tmp, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    if (response.status === 200) {
      const filedata = response.data;
      setFileList([...fileList, filedata]);
      resetField('file');
      Toast('success', '파일 업로드가 완료되었습니다.');
    } else {
      Toast('error', '다시 시도해주세요.');
    }
  };

  const delFile = (id: string) => {
    const newFileList = fileList.filter((file: any) => file.clientSession !== id);
    setFileList(newFileList);
  };

  const cancel = () => {
    resetFileList();
    setFileList([]);
    setValue('file', {});
  };

  const selectFile = () => {
    const target: any = document.querySelector('input[type="file"]');
    if (target) {
      target.click();
    }
  };

  const fileSelected: any = watch('file');

  useEffect(() => {
    if (fileSelected.length > 0) {
      setActiveBtn(false);
    } else {
      setActiveBtn(true);
    }
  }, [fileSelected]);

  const onChangeFile = (e: any) => {
    const file = e.target.files[0];
    setValue('file', file);
    setActiveBtn(false);
  };

  useEffect(() => {
    cancel();
  }, []);
  useEffect(() => {
    if (pageType === 'register') {
      setFileList([]);
    }
    console.log(fileList);
    if (data && data.length > 0 && pageType === 'view') setFileList(data);
  }, [data, pageType, resetFileList]);

  useEffect(() => {
    if (refresh) cancel();
  }, [refresh]);

  return (
    <div className={style.fileUploader}>
      {pageType !== 'view' && (
        <div className={style.fileSelector}>
          <div className={style.inputGroup}>
            <label htmlFor="file">첨부 파일</label>
            <input type="file" className={style.fileInput} accept="*" {...register('file')} />
            <p className={style.fileSelected}>{fileSelected && fileSelected.length > 0 ? fileSelected[0].name : null}</p>
          </div>
          <div className={style.btnArea}>
            <Button type="button" skin="submit" onClick={selectFile}>
              파일 선택
            </Button>
            <Button type="button" onClick={handleSubmit(onSubmit)} skin="submit" disabled={activeBtn}>
              파일 업로드
            </Button>
            {/* <Button type="button" onClick={cancel} skin="cancel">
              취소
            </Button> */}
          </div>
        </div>
      )}
      {fileList && fileList.length > 0 && <FileDownloader data={fileList} pageType={pageType} from={from} />}
    </div>
  );
};

export default FileUploader;
