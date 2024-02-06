'use client';
import React, {useState, useEffect} from 'react';
import { useForm } from "react-hook-form";
import { Toast } from '@/components/Toast';
import style from './FileUploader.module.scss';
import { apiBe } from '@/services';
import lodash, { set } from 'lodash';
import Button from '@/components/Button';
import { useRecoilState } from 'recoil';
import { clientSessionAtom, fileUploadAtom } from '@/states/data';
interface IFileProps {
    file: {};
    clientSession: any;
}

const FileUploader = ({ uuid, data }: any) => {
    const [fileUpload, setFileUpload] = useRecoilState(fileUploadAtom);
    const [fileList, setFileList] = React.useState<IFileProps[]>(data || []);
    const [uploadedFile, setUploadedFile] = useRecoilState(fileUploadAtom);
    const { register, handleSubmit, setValue, formState: { errors } } = useForm({
        defaultValues: {
            file: {},
            clientSession: uuid
        }
    });
    const onSubmit = async (data: object) => {
        console.log(data);
        let tmp:any = {
            file: (data as any).file[0],
            clientSession: uuid
        }
        console.log(tmp);
        const url = "/file/upload";
        const response = await apiBe.post(url, tmp,{
            headers: {
                "Content-Type": "multipart/form-data",
            }
        }
        );
        if(response.status === 200) {
            const { data } = response;
            setFileList([...fileList, data]);
            setFileUpload([...fileUpload, data.id])
            Toast("success", '파일을 업로드했습니다.');
        } else {
            Toast("error", '다시 시도해주세요.');
        }
    }
    
    const delFile = (id: string) => {
        const newFileList = fileList.filter((file) => file.clientSession !== id);
        setFileList(newFileList);
    }

    const cancel = () => {
        setFileList([]);
    }
    const selectFile = () => {
        const target = document.querySelector('input[type="file"]') as HTMLInputElement;
        console.log(target);
        if (target) {
            target.click();
        }
    }
    useEffect(() => {
        setFileList(data);
    }, [data])
    return (
        <div className={style.fileUploader}>
                <div className={style.selector}>
                    <div className={style.inputGroup}>
                    <label htmlFor="file">첨부 파일</label>
                    <input type="file" className={style.fileInput} accept="*"  {...register("file")} />
                    
                    </div>
                <div className={style.btnArea}>
                        <Button type="button" skin='submit' onClick={selectFile}>파일 선택</Button>
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