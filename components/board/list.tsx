'use client';
import React from "react";
import Link from "next/link";
import styles from "@/styles/components/board/list.module.scss";

const List = (props: {type:string}) => {
  let column : string[] = []; 
  const { type } = props;
  switch (type) {
    case 'announce':
      column = ['번호','제목','등록일자'];
      break;
    case 'support':
      column = ['번호','제목','고객사','진행상태','등록일자'];
      break;
    default:
      break;
  }

  return (
    <>
      <div className={`${styles[type]} ${styles.board_list}`}>
        <h2>{type}</h2>
      <table className="table-fixed mx-auto">
        <thead>
          <tr className="text-center">
            {column.map((item, index) => (
              <th key={index}>{item}</th>
            ))} 
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>134</td>
            <td>2023년 하반기 서버 긴급 정검 안내 공지</td>
            <td>2023.09.10 12:33:42</td>
          </tr>
          <tr>
            <td>134</td>
            <td>2023년 하반기 서버 긴급 정검 안내 공지</td>
            <td>2023.09.10 12:33:42</td>
          </tr>
          <tr>
            <td>134</td>
            <td>2023년 하반기 서버 긴급 정검 안내 공지</td>
            <td>2023.09.10 12:33:42</td>
          </tr>
        </tbody>
      </table>
    </div>
    </>
  );
};

export default List;