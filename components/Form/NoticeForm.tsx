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
const ToastEditor = dynamic(() => import('@/components/Board/ToastEditor'), { ssr: false });

const NoticeForm = () => {
    const { register, handleSubmit, setValue, formState: { errors } } = useForm({
        defaultValues: {
            subject: '',
            yn: true,
            noticeType: '',
            content: '',
            fileIds:[],
            clientSession: ''
        }
    });
    const [uploadedFile, setUploadedFile] = useRecoilState(fileUploadAtom);
    const [uuid, setUuid] = useState<any>();
    const router = useRouter();
    const ref = useRef<any>(null);


    const onSubmit = async (data: object) => {
        console.log(data);
        let tmp:any = lodash.cloneDeep(data);
        try {
            const editorIns = ref?.current?.getInstance();
            const contentMark = editorIns.getMarkdown();
            if (contentMark?.length === 0) {
                throw new Error('내용을 입력해주세요.');
            }
            tmp['content'] = contentMark;
            tmp['clientSession'] = uuid;
            const url = "/notice";
            const response = await apiBe.put(url, tmp);
            if (response.status === 200) {
                Toast("success", '포스트를 작성했습니다.', () => router.push('/notice/list/1'));
            } else {
                Toast("error", '다시 시도해주세요.');
            }
        } catch (error) {
            console.log(error);
            Toast("error", `${error}` || '다시 시도해주세요.');
        }
    }

    const data = {};
    const row: any[] = isEmptyObject(data) ? [] : [data];
    const cancel = () => {
        router.back();
    }
    useEffect(() => {
        setUuid(uuidv4());
    }, []);
    useEffect(() => {
       if (uploadedFile) {
           setValue('fileIds', uploadedFile);
       }
    }, [uploadedFile]);
    return (
        <div className="container">
            <form onSubmit={handleSubmit(onSubmit)}>
                <div className={style.inputGroupTitle}>
                    <div className={style.inputGroup}>
                        <label htmlFor="subject">제목</label>
                        <input type="text" {...register('subject')} />
                    </div>
                    <div className={style.inputGroupCheckbox}>
                        <label htmlFor="type">게시여부</label>
                        <input type="checkbox" {...register('yn')} />
                    </div>
                </div>
                <div className={style.inputGroupType}>
                    <label htmlFor="noticeType">유형</label>
                    <div className={style.inputGroupRadio}>
                        <div className={style.inputGroup}>
                            <label htmlFor="전체">
                                <input type="radio" value="전체" {...register('noticeType')} />전체
                            </label>
                        </div>
                        <div className={style.inputGroup}>
                            <label htmlFor="시스템">
                                <input type="radio" value="시스템" {...register('noticeType')} />시스템
                            </label>
                        </div>
                        <div className={style.inputGroup}>
                            <label htmlFor="영업">
                                <input type="radio" value="영업" {...register('noticeType')} />영업
                            </label>
                        </div>
                        <div className={style.inputGroup}>
                            <label htmlFor="기술">
                                <input type="radio" value="기술" {...register('noticeType')} />기술
                            </label>
                        </div>
                        {/* <input type="hidden" {...register('fileids')} />
                        <input type="hidden" {...register('clientSession')} />
                        <input type='hidden' {...register('content')} /> */}
                    </div>
                </div>
                <div className={style.inputGroup}>
                    <label htmlFor="content">내용</label>
                    <ToastEditor
                        content=''
                        editorRef={ref}
                        />
                </div>
                <FileUploader uuid={uuid} />
                <div className={style.btnArea}>
                    <Button type="submit" skin="submit">등록</Button>
                    <Button type="button" skin="cancel" onClick={cancel}>취소</Button>
                </div>
            </form>
        </div>
    );
}
export default NoticeForm;