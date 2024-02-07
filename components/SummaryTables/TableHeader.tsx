'use client';
import { TableHeaderProps } from '@/types/data';
import Styles from './TableHeader.module.scss';

interface TableHeaderData {
    top10?: string[];
    top10bycust?: string[];
    trendMonth?: string[];
    perMonth?: string[];
    perWeek?: string[];
    perDay?: string[];
    notice?: string[];
    support?: string[];
}
  
interface TypesMap {
    [key:string]: string[];
}

export const TableHeader = ({ rowType }:any) => {
    const types: TypesMap = {
        "top10": ['서비스명', '시작일자', '종료일자', '금액(KRW)'],
        "perMonth": ['월', '비용(KRW)'],
        "perWeek": ["요일", "비용(KRW)"],
        "top10bycust": ["월","고객","고객명","금액(KRW)"],
        "trendMonth": ["순위", "매출(KRW)", "전월대비 증감액(KRW)","증감율(%)"],
        "notice": ['번호', '제목', '등록일자'],
        'support': ['번호', '제목', '고객사', '진행상태', '등록일자'],
    }

    const RenderHeader = ({ headers }: any) => (
        <tr>
            {
                headers.map((header: any, index: number) => (
                    <th
                        scope="col"
                        key={index}
                        className={"border"}
                        rowSpan={header.rowSpan || 1}
                        colSpan={header.subHeaders ? header.subHeaders.length : 1}
                    >
                         {header.label || header}
                    </th>
                ))
            }
        </tr >
    )

    const RenderSubHeaders = ({ headers }: any) => (
        <tr>
            {headers
                .filter((header: { subHeaders?: string[] }) => header.subHeaders)
                .flatMap((header: { subHeaders?: string[] }) => header.subHeaders!.map((subHeader: string, index: number) => (
                    <th key={index} className={"border"}>
                        {subHeader}
                    </th>
                )))
            }
        </tr>

    );

    return (
        <thead className={`${Styles[rowType]} ${Styles.headerContainer}`}>
            <RenderHeader headers={types[rowType]} />
            {types[rowType].some((header: any) => header.subHeaders) && <RenderSubHeaders headers={types[rowType]} />}
        </thead >
    )
}

