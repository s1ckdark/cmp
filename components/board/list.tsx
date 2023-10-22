'use client';
import React from "react";
import Link from "next/link";
import styles from "@/styles/components/board/list.module.scss";

const List = (props: {type:string, data:any}) => {
  let column : string[] = []; 
  const { type, data } = props;
  switch (type) {
    case 'announce':
      column = ['번호','제목','등록일자'];
      break;
    case 'support':
      column = ['번호','제목','고객사','진행상태','등록일자'];
      break;
    case 'top10':
      column = ['월','고객ID','고객명','금액(KRW)'];
      break;
    case 'per_month':
      column = ['월','매출'];
      break;
    case '접속이력':
      column = ['회원ID','회원명','IP주소','클라이언트 환경정보','마지막 접속일시'];
      break;
    case '고객지원':
      column = ['지원번호','고객사번호','고객사명','계약번호(ERP)','제목','지원유형','지원담당자명','고객사담당자명','등록자','등록일시','상태'];
      break;
    case '고객자사상품':
      column = ['고객번호','고객명','청구연월','상품명','상품분류','상품상세분류','이용금액','할인율','할인금액','공급금액'];
    default:
      break;
  }

  return (
    <>
      <div className={`${styles[type]} ${styles.board_list}`}>
      <table className="table-fixed mx-auto">
        <thead>
          <tr className="text-center">
            {column.map((item, index) => (
              <th key={index}>{item}</th>
            ))} 
          </tr>
        </thead>
        <tbody>
            {data.map((item: any, index: number) => (
              <tr key={index} className="text-center">
                {Object.keys(item).map((key, index) => (
                  <td key={index}>{item[key]}</td>
                ))}
              </tr>
            ))}
        </tbody>
      </table>
    </div>
    </>
  );
};

export default List;