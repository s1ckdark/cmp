'use client';
import { useRef, useEffect, useState } from 'react';
import { useRouter } from "next/navigation";
import dynamic from "next/dynamic";
import { FileDownloader } from '@/components/Files';
import { apiBe } from '@/services';
import style from './NoticeDetailView.module.scss';
import Loading from '@/components/Loading';
import Button from '@/components/Button';

// const ToastViewer = dynamic(() => import('@/components/Board/ToastViewer'), { ssr: false });

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
                {/* <div className={style.index}>
                    <label htmlFor="index">번호</label>
                    <div className={style.value}>{data.index}</div>
                </div> */}
                <div className={style.noticeType}>
                    <label htmlFor="noticeType">유형</label>
                    <div className={style.value}>{data.noticeType}</div>
                </div>
                <div className={style.writer}>
                    <label htmlFor="regName">작성자</label>
                    <div className={style.value}>{data.regName}</div>
                </div>
                <div className={style.regDate}>
                    <label htmlFor="regDt">작성일</label>
                    <div className={style.value}>{data.regDt}</div>
                </div>
            </div>
            <div className={style.textViewer}>
                {/* <ToastViewer
                    content={data.content}
                    editorRef={ref} /> */}
                    <textarea value={data.content} readOnly></textarea>
            </div>
            {data.uploadedFiles && <FileDownloader data={data.uploadedFiles} type="view"/>}
            <div className={style.btnArea}>
                <Button onClick={() => router.push(`/notice/edit/${id}`)} skin="submit">수정</Button>
                <Button onClick={() => router.back()} skin="cancel">목록</Button>
            </div>
        </div>
    );
}
export default NoticeDetailView;