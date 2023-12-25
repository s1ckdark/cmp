'use client';
import { TableHeaderProps } from '@/types/data';
import { convertColumns } from '@/utils/data';
import Styles from './TableHeader.module.scss';

interface TableHeaderData {
    top10?: string[];
    top10bycust?: string[];
    trendMonth?: string[];
    perMonth?: string[];
    perWeek?: string[];
    perDay?: string[];
    announce?: string[];
    support?: string[];
}
  
export const TableHeader: React.FC<TableHeaderProps> = ({ rowType }) => {
    const types: TableHeaderData = {
        "top10": ['서비스명', '시작일자', '종료일자', '금액'],
        "perMonth": ['월', '비용'],
        "perWeek": ["요일", "비용"],
        "top10bycust": ["월","고객","고객명","금액(KRW)"],
        "trendMonth": ["월", "매출", "전월대비 증감액","증감율"],
        "announce": ['번호', '제목', '등록일자'],
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
                        {convertColumns(header.label || header)}
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

