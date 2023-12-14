'use client';
import { TableHeaderProps } from '@/types/data';
import { convertColumns } from '@/utils/data';
import Styles from './TableHeader.module.scss';

interface TableHeaderData {
    top10: string[];
    perMonth: string[];
    perWeek: string[];
    perDay: string[];
}
  
export const TableHeader: React.FC<TableHeaderProps> = ({ rowType }) => {
    const types: TableHeaderData = {
        "top10": ['서비스명', '시작일자', '종료일자', '금액'],
        "perMonth": ['월', '비용'],
        "perWeek": ["요일", "비용"],
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
        <thead className={`${Styles[rowType]} w-full`}>
            <RenderHeader headers={types[rowType]} />
            {types[rowType].some((header: any) => header.subHeaders) && <RenderSubHeaders headers={types[rowType]} />}
        </thead >
    )
}

