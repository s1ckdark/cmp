'use client';
import cx from 'clsx';
import { ReactNode } from 'react';
import styles from './index.module.scss';
import { TableHeaderProps } from '@/types/data';
import { convertColumns } from '@/utils/data';
import Styles from './TableHeader.module.scss';
interface ComplexHeader {
    label: string;
    rowSpan?: number;
    subHeaders?: string[];
  }
  
  type Header = string | ComplexHeader;
  
  interface TableHeaderData {
    announceOverview: string[];
    announce: string[];
    supportOverview: string[];
    top10:ComplexHeader[];
    per_month: string[];
    support: string[];
    customers: string[];
    custBillList: string[];
    users: string[];
    menu: string[];
    role: string[];
    roleReg: string[];
    roleMod: string[];
    access: string[];
    productGd: string[];
    productSW: string[];
    productMSP: string[];
    productCategory: string[];
    contracts: string[];
    invoiceUsage: ComplexHeader[];
    custBillDetail: string[];
    invoiceList: ComplexHeader[];
    customerPiC: string[];
  }
  
export const TableHeader: React.FC<TableHeaderProps> = ({ rowType }) => {
    console.log(rowType);
    const types: TableHeaderData = {
        "announceOverview": ['번호', '제목', '등록일자'],
        "announce": ['번호', '제목', '유형', '등록자', '첨부파일', '등록일자'],
        "per_month" : ['월','매출','전월대비 증감액','증감율'],  //수정(컬럼 2개 추가됨)
        "supportOverview": ['번호', '제목', '고객사', '진행상태', '등록일자'],
        "top10":[{ label: '전체 고객사', subHeaders: ['월', '고객ID', '고객명', '금액(KRW)']}], //전체고객사 추가
        "support": ['지원번호', '고객사번호', '고객사명', '계약번호(ERP)', '제목', '지원유형', '지원담당자명', '고객사담당자명', '등록자', '등록일시', '상태'],
		"custBillList":['고객번호','고객명','구분','상품명','상품상세분류','상품가격기준','정식단가','노출단가','할인율','등록자','등록일시'], //추가
		"custBillDetail":['상품ID','상품명','상품분류','상품상세분류','상품가격기준','정식단가','노출단가','수량','할인율','납부예상금액','청구단위','서비스 시작일시','서비스 종료일시','빌링ID','코멘트'], //추가
        "invoiceUsage": [
            { label: '구분', rowSpan: 2 },
            { label: "서비스 종류", rowSpan: 2 },
            { label: '서비스명', rowSpan: 2 },
            { label: '리전', rowSpan: 2 },
            { label: '상세', rowSpan: 2 },
            { label: '요금제', rowSpan: 2 },
            { label: '이용금액', rowSpan: 2 },
            {
                label: '할인금액',
                subHeaders: ['약정', '회원요금제', '회원약정요금제', '기타']
            },
            { label: '납부예상금액', rowSpan: 2},
            { label: '청구 시작일', rowSpan: 2 },
            { label: '청구 종료일', rowSpan: 2 },
        ],
        "invoiceList":
        [
            {label: "요약", rowSpan: 2},
            { label: '고객번호', rowSpan: 2 },
            { label: '고객명', rowSpan: 2 },
            { label: '클라우드 유형', rowSpan: 2 },
            { label: '이용 기간', rowSpan: 2 },
            { label: '결제통화', rowSpan: 2 },
            {
                label: '네이버 서비스 청구내역',
                subHeaders: ['이용금액', '할인금액', '공급가액']
            },
            {
                label: '자사 서비스 청구내역',
                subHeaders: ['SW 이용금액', 'MSP 이용금액', '할인금액', '공급가액']
            },
            { label: '월 전체합계', rowSpan: 2 },
            { label: '부가세', rowSpan: 2 },
            { label: '최종 공급가액', rowSpan: 2 },
        ],        
        "users": ['회원 ID', '회원명', '회원유형', '권한', '등록자', '등록일시', '마지막 접속일시'],
        "menu": ['메뉴번호', '메뉴이름', '상위메뉴번호', 'URL', '아이콘', '등록자', '등록일시', '수정자', '수정일시'],
        "role": ['권한번호', '권한명', '메뉴번호', 'URL', '접근허용', '등록자', '등록일시'],
        "roleReg": ['번호', 'URL', '접근허용'],
        "roleMod": ['번호', 'URL', '읽기가능', '쓰기가능'],
        "access": ['회원 ID', '회원명', 'IP주소', '클라이언트 환경정보', '마지막 접속일시'],
        "productGd": ['번호', '상품명', '상품분류', '상품상세분류', '정식단가', '등록자', '등록일시', '이력'],
        "productSW": ['상품번호', '상품명', '상품분류', '상품상세분류', '등록자', '등록일시', '수정자', '수정일시', '정식단가', '상품설명'],
        "productMSP": ['상품번호', '상품명', '상품분류', '상품상세분류', '등록자', '등록일시', '수정자', '수정일시', '정식단가', '상품설명'],
        "productCategory": ['상품분류', '상품상세분류', '등록일시', '등록자'],
        "customerPiC": ['고객사번호', '고객사명', '고객유형', '사업자번호', '담당영업', '등록자', '등록일시'], //vendors -> customerPiC
        "contracts": ['고객사번호', '고객사명', '계약번호(ERP)', '계약명', '계약유형', '계약금액', '계약상태', '계약시작일', '계약종료일'],
        "customers":["memberNo","memberName","regionType","businessRegNo","customerContacts","salesContacts"],
        "history":[""]
        
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
        <thead className={Styles[rowType]}>
            <RenderHeader headers={types[rowType]} />
            {types[rowType].some((header: any) => header.subHeaders) && <RenderSubHeaders headers={types[rowType]} />}
        </thead >
    )
}

