import React, { useState } from 'react';
import _ from 'lodash';
import Styles from './TableHeader.module.scss';
import { useRouter } from 'next/navigation';


interface ComplexHeader {
    label: string;
    rowSpan?: number;
    subHeaders?: string[];
  }
  
  type Header = string | ComplexHeader;
  
  interface TableHeaderData {
    announceOverview?: any[];
    announce?: any[];
    supportOverview?: any[];
    top10?:ComplexHeader[];
    per_month?: any[];
    support?: any[];
    billingProductList?: any[];
    billingProductDetail?: any[];
    users?: any[];
    menu?: any[];
    role?: any[];
    roleReg?: any[];
    roleMod?: any[];
    access?: any[];
    productGd?: any[];
    productSW?: any[];
    productMSP?: any[];
    productCategory?: any[];
    contracts?: any[];
    invoiceUsage?: ComplexHeader[];
    invoiceList?: ComplexHeader[];
      customerPiC?: any[];
    notice: any[];
  }
  interface TypesMap {
    [key:string]: string[] | ComplexHeader[];
  }
  
  interface TableHeaderProps {
    rowType: any;  // Use the defined RowType here
  }
  
  interface sortStatesProps {
    field: string;
    direction: string;
  }

export const TableHeader: React.FC<TableHeaderProps> = ({ rowType }) => {
    const [sortState, setSortState] = useState({field:'', direction: 'desc'});
    const router = useRouter();
    const types: TypesMap = {
        "noticeOverview": ['번호', '제목', '등록일자'],
        "per_month" : ['월','매출','전월대비 증감액(KRW)','증감율(%)'],  //수정(컬럼 2개 추가됨)
        "supportOverview": ['번호', '제목', '고객사', '진행상태', '등록일자'],
        "top10":[
                { label: '전체 고객사',
                subHeaders: ['월', '고객ID', '고객사명', '금액(KRW)']}
            ], //전체고객사 추가
        "support": ['지원번호', '고객사번호', '고객사명', '제목', '지원유형', '지원담당자명', '고객사담당자명', '등록자', '등록일시', '상태'],
        "billingProduct":['고객사번호','고객사명','구분','상품명','상품상세분류','상품가격기준','정식단가(KRW)','노출단가(KRW)','할인율(%)','등록자','등록일시'], //추가
        "billingProductDetail":['상품ID','상품명','상품분류','상품상세분류','상품가격기준','정식단가(KRW)','노출단가(KRW)','수량','할인율(%)','납부예상금액','청구단위','서비스 시작일시','서비스 종료일시','빌링ID','코멘트'], //추가
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
        "invoice":
        [
            {label: "요약", rowSpan: 2},
            { label: '고객사번호', rowSpan: 2 },
            { label: '고객사명', rowSpan: 2 },
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
        "user": ['회원 ID', '회원명', '회원유형', '권한', '상태', '등록자', '등록일시'],
        "menu": ['메뉴번호', '메뉴이름', '상위메뉴번호', 'URL', '아이콘', '등록자', '등록일시', '수정자', '수정일시'],
        "role": ['권한명', '권한설명'],
        "roleReg": ['번호', 'URL', '접근허용'],
        "roleMod": ['번호', 'URL', '읽기가능', '쓰기가능'],
        "log": ['회원 ID', '회원명', 'IP주소', '클라이언트 환경정보', '마지막 접속일시'],
        "productGd": ['상품번호', '상품명', '상품분류', '상품상세분류', '정식단가(KRW)', '등록자', '등록일시'],
        "productSW": ['상품번호', '상품명', '상품분류', '상품상세분류', '등록자', '등록일시', '수정자', '수정일시', '정식단가(KRW)', '상품설명'],
        "productMSP": ['상품번호', '상품명', '상품분류', '상품상세분류', '등록자', '등록일시', '수정자', '수정일시', '정식단가(KRW)', '상품설명'],
        "productCategory": ['상품분류', '상품상세분류','상품가격기준','등록일시', '등록자'],
        "customers": ['고객사번호', '고객사명', '고객유형', '사업자번호', '담당영업', '등록자', '등록일시'], 
        "contract": ['고객사번호', '고객사명', '계약번호(ERP)', '계약명', '계약유형', '계약금액', '계약상태', '계약시작일', '계약종료일'],
        "notice": ['번호', '제목', '유형', '등록자', '등록일자'],
        
    }
    
    const sortList:any = {
        "user": ["userType", "email", "username", "memberNo", "memberName", "salesName", "isAdmin", "isActivated"], // 회원관리 user
        "customers": ["memberNo", "memberName", "memberType", "regName", "regDt"], // 고객사 관리 customer 
        "productCategory":["prodType", "prodTypeDetail", "prodDetailTypeStd", "regDt"], // 상품분류 관리 producttype
        "productGd": ["prodName", "prodType", "prodDetailType", "stdPrice", "regName", "regDt"], // 자사 상품 전체 product
        "billingProduct":[ "memberNo", "memberName", "prodName", "prodDetailType", "prodDetailTypeStd", "expPrice", "stdPrice", "discountRate", "regName", "regDt"] // 고객사 자사 상품
    }
    
    const sortMapping:any = {
        '할인율(%)': 'discountRate',
        '회원 ID': 'email',
        '노출단가(KRW)': 'expPrice',
        '상태': 'isActivated',
        '관리자여부': 'isAdmin',
        '고객사번호': 'memberName',
        '고객사명': 'memberNo',
        '고객유형': 'memberType',
        '상품상세분류': 'prodDetailType',
        '상품가격기준': 'prodDetailTypeStd',
        '상품명': 'prodName',
        '상품분류': 'prodType',
        // '상품상세분류': 'prodTypeDetail',
        '등록일시': 'regDt',
        '등록자': 'regName',
        '담당영업': 'salesName',
        '정식단가(KRW)':'stdPrice',
        '회원명': 'username',
        '회원유형': 'userType' 
    }

    const toggleSortState = (fieldKey: string) => {
        const isCurrentField = sortState.field === fieldKey;
        const newDirection = isCurrentField && sortState.direction === 'asc' ? 'desc' : 'asc';
        setSortState({field: fieldKey, direction: newDirection});
        router.push(`./1?sort=${fieldKey}&direction=${newDirection}`);
    };

    const RenderHeader = ({ headers }:any) => {
        return (
            <tr>
                {headers.map((header: any, index: number) => {
                    const isComplexHeader = typeof header !== 'string';
                    const fieldKey = isComplexHeader ? header.label : header;
                    const isSortable = sortList[rowType]?.includes(fieldKey) || sortList[rowType]?.includes(sortMapping[fieldKey]);
                    const isCurrentSortField = sortState.field === (sortMapping[fieldKey] || fieldKey);
                    console.log(fieldKey, sortList[rowType]?.includes(fieldKey),   isCurrentSortField, isSortable)
                    return (
                        <th
                            key={index}
                            className="border"
                            rowSpan={isComplexHeader ? header.rowSpan || 1 : 1}
                            colSpan={isComplexHeader && header.subHeaders ? header.subHeaders.length : 1}
                            onClick={() => isSortable && toggleSortState(sortMapping[fieldKey] || fieldKey)}
                        >
                            {isComplexHeader ? header.label : header}
                            {isSortable && (
                                <span className={Styles.sortToggle}>
                                    {isCurrentSortField ? (sortState.direction === 'asc' ? '▲' : '▼') : '▼'}
                                </span>
                            )}
                        </th>
                    );
                })}
            </tr>
        );
    };

    const RenderSubHeaders = ({ headers }: any) => {
        return (
            <tr>
                {headers.flatMap((header: any) => {
                    return header.subHeaders ? header.subHeaders.map((subHeader: string, index: number) => {
                        const isSortable = sortList[rowType]?.includes(subHeader) || sortList[rowType]?.includes(sortMapping[subHeader]);
                        const isCurrentSortField = sortState.field === (sortMapping[subHeader] || subHeader);
                        console.log(isCurrentSortField);
                        return (
                            <th
                                key={`${subHeader}-${index}`}
                                className="border"
                                onClick={() => isSortable && toggleSortState(sortMapping[subHeader] || subHeader)}
                            >
                                {subHeader}
                                {isSortable && (
                                    <span className={Styles.sortToggle}>
                                        {isCurrentSortField ? (sortState.direction === 'asc' ? '▲' : '▼') : '▼'}
                                    </span>
                                )}
                            </th>
                        );
                    }) : [];
                })}
            </tr>
        );
    };

    return (
        <thead className={`${Styles.container} ${Styles[rowType]}`}>
            <RenderHeader headers={types[rowType]} />
            {types[rowType].some((header: any) => header.subHeaders) && <RenderSubHeaders headers={types[rowType]} />}
        </thead>
    );
};

