'use client';
import { useRef, useEffect, useState } from 'react';
import { useRouter } from "next/navigation";
import dynamic from "next/dynamic";
import { FileDownloader } from '@/components/Files';
import { apiBe } from '@/services';
import style from './NoticeDetailView.module.scss';
import Loading from '@/components/Loading';

const ToastViewer = dynamic(() => import('@/components/Board/ToastViewer'), { ssr: false });

const NoticeDetailView = ({ id }: any) => {

    const [data, setData] = useState<any>({});
    const router = useRouter();
    const ref = useRef<any>(null);

    useEffect(() => {
        const getNotice = async (id: string) => {
            const url = `/notice/${id}`;
            const response = await apiBe(url);
            if (response.status === 200) {
                const { notice } = response.data;
                setData(notice);
            } else {
                console.log('error');
            }
        }
        getNotice(id);
    }, [id]);

    if(!data) return <Loading />;
    return (
        <div className={style.noticeDetailView}>
            <div className={style.title}>
                <h2>{data.subject}</h2>
            </div>
            <div className={style.info}>
                <div className={style.index}>
                    <label>번호</label>
                    <div className={style.value}>{data.index}</div>
                </div>
                <div className={style.noticeType}>
                    <label>유형</label>
                    <div className={style.value}>{data.noticeType}</div>
                </div>
                <div className={style.writer}>
                    <label>작성자</label>
                    <div className={style.value}>{data.regName}</div>
                </div>
                <div className={style.date}>
                    <label>작성일</label>
                    <div className={style.value}>{data.regDt}</div>
                </div>
            </div>
            <div className={style.toastViewer}>
                <ToastViewer
                    content={data.content}
                    editorRef={ref} />
            </div>
            {data.uploadedFiles && data.uploadedFiles.length > 0 ? <FileDownloader data={data.uploadedFiles} />: null}
        </div>
    );
}
export default NoticeDetailView;