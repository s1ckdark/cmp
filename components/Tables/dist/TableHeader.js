'use client';
"use strict";
exports.__esModule = true;
exports.TableHeader = void 0;
var data_1 = require("@/utils/data");
exports.TableHeader = function (_a) {
    var rowType = _a.rowType;
    console.log("rowType", rowType);
    var types = {
        "announceOverview": ['번호', '제목', '등록일자'],
        "announce": ['번호', '제목', '유형', '등록자', '첨부파일', '등록일자'],
        "supportOverview": ['번호', '제목', '고객사', '진행상태', '등록일자'],
        "top10": ['월', '고객ID', '고객명', '금액(KRW)'],
        "per_month": ['월', '매출'],
        "support": ['지원번호', '고객사번호', '고객사명', '계약번호(ERP)', '제목', '지원유형', '지원담당자명', '고객사담당자명', '등록자', '등록일시', '상태'],
        "customers": ["memberNo", "memberName", "regionType", "businessRegNo", "customerContacts", "salesContacts"],
        "billingCustomers": [
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
        "productGd": ['상품번호', '상품명', '상품분류', '상품상세분류', '정식단가', '등록자', '등록일시', '이력'],
        "productSW": ['상품번호', '상품명', '상품분류', '상품상세분류', '등록자', '등록일시', '수정자', '수정일시', '정식단가', '상품설명'],
        "productMSP": ['상품번호', '상품명', '상품분류', '상품상세분류', '등록자', '등록일시', '수정자', '수정일시', '정식단가', '상품설명'],
        "productCategory": ['상품분류', '상품상세분류', '등록일시', '등록자'],
        "vendors": ['고객사번호', '고객사명', '고객유형', '사업자번호', '담당영업', '등록자', '등록일시'],
        "contracts": ['고객사번호', '고객사명', '계약번호(ERP)', '계약명', '계약유형', '계약금액', '계약상태', '계약시작일', '계약종료일'],
        "invoiceUsage": [
            { label: '구분', rowSpan: 2 },
            { label: '서비스명', rowSpan: 2 },
            { label: '클라우드 유형', rowSpan: 2 },
            { label: '상세', rowSpan: 2 },
            { label: '요금제', rowSpan: 2 },
            { label: '이용금액', rowSpan: 2 },
            {
                label: '할인금액',
                subHeaders: ['약정', '공급가액', '공급가액', '기타', '납부예상금액']
            },
            { label: '시작일', rowSpan: 2 },
            { label: '종료일', rowSpan: 2 },
        ]
    };
    var RenderHeader = function (_a) {
        var headers = _a.headers;
        return (React.createElement("tr", null, headers.map(function (header, index) { return (React.createElement("th", { scope: "col", key: index, className: "border", rowSpan: header.rowSpan || 1, colSpan: header.subHeaders ? header.subHeaders.length : 1 }, data_1.convertColumns(header.label || header))); })));
    };
    var RenderSubHeaders = function (_a) {
        var headers = _a.headers;
        return (React.createElement("tr", null, headers
            .filter(function (header) { return header.subHeaders; })
            .flatMap(function (header) { return header.subHeaders.map(function (subHeader, index) { return (React.createElement("th", { key: index, className: "border" }, subHeader)); }); })));
    };
    return (React.createElement("thead", null,
        React.createElement(RenderHeader, { headers: types[rowType] }),
        types[rowType].some(function (header) { return header.subHeaders; }) && React.createElement(RenderSubHeaders, { headers: types[rowType] })));
};
