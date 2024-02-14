'use client';
import React, {useState, useEffect} from 'react';
import { useForm } from "react-hook-form";
import { Toast } from '@/components/Toast';
import style from './FileUploader.module.scss';
import { apiBe } from '@/services';
import lodash, { set } from 'lodash';
import Button from '@/components/Button';
import { useRecoilState } from 'recoil';
import { FileDownloader } from '@/components/Files';
import { clientSessionAtom, fileUploadAtom } from '@/states/data';
interface IFileProps {
    file: any;
    clientSession: any;
}

const FileUploader = ({ uuid, data, type, from}: any) => {
    const [fileList, setFileList] = useRecoilState(fileUploadAtom);
    const [ activeBtn, setActiveBtn ] = useState<boolean>(true);
    const { register, handleSubmit, getValues, watch, setValue, formState: { errors } } = useForm({
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
        // console.log(tmp);
        const url = "/file/upload";
        Toast("info", "파일을 업로드 중입니다.")
        const response = await apiBe.post(url, tmp,{
            headers: {
                "Content-Type": "multipart/form-data",
            }
        }
        );
        if(response.status === 200) {
            const filedata = response.data;
            console.log(filedata,fileList);
            setFileList([...fileList, filedata]);
            Toast("success", '파일 업로드가 완료되었습니다.');
        } else {
            Toast("error", '다시 시도해주세요.');
        }
    }
    
    const delFile = (id: string) => {
        const newFileList = fileList.filter((file:any) => file.clientSession !== id);
        setFileList(newFileList);
    }

    const cancel = () => {
        setFileList([]);
        setValue('file', {});
    }
    const selectFile = () => {
        const target:any= document.querySelector('input[type="file"]');
        if (target) {
            target.click();
        }
    }
    const fileSelected:any = watch('file');
    
    useEffect(() => {
        if (fileSelected.length > 0) {
            setActiveBtn(false);
        } else {
            setActiveBtn(true);
        }
    }, [fileSelected])
    
    const onChangeFile = (e: any) => {
        const file = e.target.files[0];
        setValue('file', file);
        setActiveBtn(false);
    }

    useEffect(() => {
        if(data && data.length > 0) setFileList(data);
    }, [data])

    return (
        <div className={style.fileUploader}>
            <div className={style.fileSelector}>
                <div className={style.inputGroup}>
                    <label htmlFor="file">첨부 파일</label>
                    <input type="file" className={style.fileInput} accept="*"  {...register("file")} />
                    <p className={style.fileSelected}>{fileSelected && fileSelected.length > 0 ? fileSelected[0].name:null}</p>
                </div>
                <div className={style.btnArea}>
                    <Button type="button" skin='submit' onClick={selectFile}>파일 선택</Button>
                    <Button type="button" onClick={handleSubmit(onSubmit)} skin='submit' disabled={activeBtn}>파일 업로드</Button>
                    <Button type="button" onClick={cancel} skin='cancel'>취소</Button>
                </div>
            </div>
            {fileList && fileList.length > 0 && <FileDownloader data={ fileList } type={ type } from={from} /> }
        </div>
    );
}

export default FileUploader;