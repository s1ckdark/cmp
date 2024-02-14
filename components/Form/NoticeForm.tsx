'use client';
import React, { useState, useRef, useEffect } from 'react';
import dynamic from 'next/dynamic';
import { isEmptyObject } from '@/utils/data';
import { TablesProps } from '@/types/data';
import { useForm } from "react-hook-form";
import Button from '@/components/Button';
import { useRouter } from 'next/navigation';
import { Toast } from '@/components/Toast';
import style from './NoticeForm.module.scss'
import { FileUploader } from '@/components/Files';
import { useRecoilState } from 'recoil';
import { fileUploadAtom } from '@/states/data';
import { v4 as uuidv4 } from 'uuid';
import lodash from 'lodash';
import { apiBe } from '@/services';
// const ToastEditor = dynamic(() => import('@/components/Board/ToastEditor'), { ssr: false });

interface INoticeFormProps {
    data?: any;
    type: string;
}

const NoticeForm = ({ data, type }: INoticeFormProps) => {
    const [ notice, setNotice] = useState<any>(data || {});
    const { id, subject, yn, noticeType, content, uploadedFiles, clientSession } = notice;
    const { register, handleSubmit, setValue, formState: { errors } } = useForm({
        defaultValues: {
            id: data?.id,
            subject: subject,
            yn: true,
            noticeType: noticeType,
            content: content,
            fileIds: uploadedFiles,
            clientSession: clientSession
        }
    });
    const [uploadedFile, setUploadedFile] = useRecoilState(fileUploadAtom);
    const [uuid, setUuid] = useState<any>();
    const router = useRouter();
    // const ref = useRef<any>(null);


    const onSubmit = async (formData: object) => {
        let tmp:any = lodash.cloneDeep(formData);
        try {
            if (type === 'edit') tmp['id'] = data.id;
            if (type === 'register') tmp['yn'] = true;
            tmp['clientSession'] = uuid;
            tmp['fileIds'] = uploadedFile.map((file: any) => file.id);
            console.log(type,tmp);
            const url = "/notice";
            const response = type === 'register' ? await apiBe.put(url, tmp):await apiBe.post(url, tmp);
            if (response.status === 200 || response.status === 201) {
                Toast("success", '포스트를 작성했습니다.', () => router.push('/notice/list/1'));
            } else {
                Toast("error", '다시 시도해주세요.');
            }
        } catch (error) {
            console.log(error);
            Toast("error", `${error}` || '다시 시도해주세요.');
        }
    }

    const row: any[] = isEmptyObject(data) ? [] : [data];
    const cancel = () => {
        router.back();
    }

    useEffect(() => {
        setUuid(uuidv4());
        setUploadedFile([])
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
    // fileIds 리스트 만들고 submit시에 같이 보내기(file id만 포함되어있음)
    // uploadFiles는 현재 업로드된 파일 리스트(여러가지 파일 data)

    useEffect(() => {
        if (data) {
            setValue('id', data.id)
            setValue('subject', data.subject);
            setValue('yn', data.yn);
            setValue('noticeType', data.noticeType);
            setValue('content', data.content);
            setValue('fileIds', data.uploadedFiles);
            setUploadedFile(data.uploadedFiles);
        }
    }, [data])

    return (
        <div className="container">
            <form onSubmit={handleSubmit(onSubmit)}>
                <div className={style.inputGroupTitle}>
                    <div className={style.inputGroup}>
                        <label htmlFor="subject">제목</label>
                        <input type="text" {...register('subject', {required: true})} />
                        <input type="hidden" {...register('id')} />
                        {errors.subject && <span>제목을 입력해주세요.</span>}
                    </div>
                    {type === 'edit' && <div className={style.inputGroupCheckbox}>
                        <label htmlFor="type">게시여부</label>
                        <input type="checkbox" {...register('yn')} />
                    </div>}
                </div>
                <div className={style.inputGroupType}>
                    <label htmlFor="noticeType">유형</label>
                    <div className={style.inputGroupRadio}>
                        <div className={style.inputGroup}>
                            <label htmlFor="전체">
                                <input type="radio" value="전체" {...register('noticeType', {required:true})} />전체
                            </label>
                        </div>
                        <div className={style.inputGroup}>
                            <label htmlFor="시스템">
                                <input type="radio" value="시스템" {...register('noticeType', { required: true })} />시스템
                            </label>
                        </div>
                        <div className={style.inputGroup}>
                            <label htmlFor="영업">
                                <input type="radio" value="영업" {...register('noticeType', { required: true })}  />영업
                            </label>
                        </div>
                        <div className={style.inputGroup}>
                            <label htmlFor="기술">
                                <input type="radio" value="기술" {...register('noticeType', { required: true })}  />기술
                            </label>
                        </div>
                        {errors.noticeType && <span>유형을 선택해주세요.</span>}
                        {/* <input type="hidden" {...register('fileids')} />
                        <input type="hidden" {...register('clientSession')} />
                        <input type='hidden' {...register('content')} /> */}
                    </div>
                </div>
                <div className={style.contentGroup}>
                    <label htmlFor="content">내용</label>
                    <textarea className={style.textArea} {...register('content', { required:true, minLength: 10 })} />
                    {errors.content && <span>최소 10글자 이상의 내용을 넣어주세요</span>}
                    {/* <ToastEditor
                        content={data.content}
                        editorRef={ref} /> */}
                </div>
                <FileUploader uuid={uuid} data={data?.uploadedFiles} type={type} from={"notice"} />
                <div className={style.btnArea}>
                    <Button type="submit" skin="submit">{type === 'register' ? "등록":"저장"}</Button>
                    <Button type="button" skin="cancel" onClick={cancel}>취소</Button>
                </div>
            </form>
        </div>
    );
}
export default NoticeForm;