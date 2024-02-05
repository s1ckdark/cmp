import { Toast } from '@/components/Toast';
import style from './FileDownloader.module.scss';
import { apiBe } from '@/services';
import Button from '@/components/Button';
import { object } from 'yup';

const FileDownloader = ({ data }: any) => {
    console.log(data);
    const goDownload = async (objectName: string, fileName: string) => {
        console.log(objectName, fileName);
        const url = "/file/download";
        const data = {
            "objectName": objectName,
            "fileName": fileName
        }
        const response = await apiBe.post(url, data);
        if(response.status === 200) {
           Toast("success", "파일을 다운로드합니다.");
        }
    }

    return (
        <div className={style.downloader}>
            <div className={style.fileList}>
                <div className={style.label}>
                    <label htmlFor="files">첨부파일</label>
                </div>
                <div className={style.files}>
                    {data && data.map((file: any, index: number) => {
                        return (
                            <div key={index} className={style.file}>
                                <p onClick={()=>goDownload(file.objectName, file.originName)}>{file.originName}</p>
                            </div>
                        )
                    })}
                </div>
            </div>
        </div>
    );
}

export default FileDownloader;