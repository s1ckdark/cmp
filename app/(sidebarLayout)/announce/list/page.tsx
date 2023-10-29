'use client';
import React from 'react';
import dynamic from 'next/dynamic';
import List from '@/components/Board/BoardList';
const announce = [
    {
        "번호": "134",
        "제목": "2023년 하반기 서버 긴급 정검 안내 공지",
        "유형": "시스템",
        "등록자": "관리자",
        "첨부파일": false,
        "등록일자": "2023.09.10 12:33:42"
    },
    {
        "번호": "134",
        "제목": "2023년 하반기 서버 긴급 정검 안내 공지",
        "유형": "시스템",
        "등록자": "관리자",
        "첨부파일": false,
        "등록일자": "2023.09.10 12:33:42"
    },
    {
        "번호": "134",
        "제목": "2023년 하반기 서버 긴급 정검 안내 공지",
        "유형": "시스템",
        "등록자": "관리자",
        "첨부파일": false,
        "등록일자": "2023.09.10 12:33:42"
    }
]
export default function ListPage() {
    return (
        <div className='container'>
            <h2>공지사항</h2>
            <List type="announceList" data={announce} />

        </div>
    );
}


