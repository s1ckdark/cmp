'use client';
import React from 'react';
import dynamic from 'next/dynamic';
import Breadcrumb from '@/components/Breadcrumb';
// import { TableHeader, TableBody } from '@/components/Tables';

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
const breadcrumbs = [
    { href: '/', label: 'Home' },
    { href: '/announce', label: 'Announce' },
    { href: '/announce/list', label: 'List' }
];

const ListPage: React.FC = () => {
    const pageTitle = "공지사항";

    return (
        <div className='container'>
            <Breadcrumb title={pageTitle} breadcrumbs={breadcrumbs} />
            {/* <TableHeader type="announce" /> */}

        </div>
    );
}

export default ListPage;

