'use client';
import React, {useState} from 'react';
import { useForm } from "react-hook-form";
import { Toast } from '@/components/Toast';
import style from './index.module.scss';
import { v4 as uuidv4 } from 'uuid';
import { apiBe } from '@/services';
import lodash from 'lodash';
import Button from '@/components/Button';
import { useRecoilState } from 'recoil';
import { fileUploadAtom } from '@/states/data';
interface IFileProps {
    file: string;
    clientSession: string;
}

const FileUploader = ({ type }: any) => {
    const [fileList, setFileList] = React.useState<IFileProps[]>([]);
    const [uploadedFile, setUploadedFile] = useRecoilState(fileUploadAtom);
    const { register, handleSubmit, setValue, formState: { errors } } = useForm();
    const onSubmit = async (data: object) => {
        console.log(uuidv4(), data);
        const temp = lodash.cloneDeep(fileList);
        // temp['clientSession'] = uuid();
        // try {
        //     const formData = new FormData();
        //     const file = data.images[0];
        //     formData.append('file', file);
        //     const response = await fetch('/file/upload', {
        //         method: 'POST',
        //         body: formData
        //     });
        //     const result = await response.json();
        //     console.log(result);
        //     Toast("success", '파일을 업로드했습니다.');
        // } catch (error) {
        //     console.log(error);
        //     Toast("error", `${error}` || '다시 시도해주세요.');
        // }
        // const url = "/file/upload";
        // const response = await apiBe.post(url, data);
        // console.log(response);
        // if (response.status === 200) {
        //     const { data } = response;
        //     Toast("success", '파일을 업로드했습니다.');
        // } else {
        //     Toast("error", '다시 시도해주세요.');
        // }

    }
    
    const delFile = (id: string) => {
        const newFileList = fileList.filter((file) => file.clientSession !== id);
        setFileList(newFileList);
    }

    const cancel = () => {
        setFileList([]);
    }

    return (
        <div className={style.fileUploader}>
                <div className={style.selector}>
                    <div className={style.inputGroup}>
                        <label htmlFor="file">첨부 파일</label>
                        <input type="file" className={style.fileInput} accept="image/*"  {...register("images")} />
                    </div>
                    <div className={style.btnArea}>
                        <Button type="button" onClick={handleSubmit(onSubmit)} skin='submit'>파일 업로드</Button>
                        <Button type="button" onClick={cancel} skin='cancel'>취소</Button>
                    </div>
                </div>
            {fileList && fileList.map((file: any, index: number) => {
                return (
                    <div key={index} className={style.preview}>
                        <div className={style.previewItem}>
                            <div className={style.previewItem}>
                                <span onClick={() => delFile(file.id)}>&times;</span>
                                <p>{file.originName}</p>
                            </div>
                        </div>
                    </div>
                )
            })}

        </div>
    );
}

export default FileUploader;