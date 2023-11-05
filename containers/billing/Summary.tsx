import styles from './index.module.scss';
import React from 'react';
interface SummaryProps {
    data: any;
}

const Summary: React.FC<SummaryProps> = ({ data }) => {

    return (
        <div className={styles.summary}>
            <hgroup>
                <h1>총계</h1>
            </hgroup>
            <table className="w-full table">
                <tr>
                    <th rowSpan={6}>월전체 합계</th>
                    <th colSpan={2}>이용금액</th>
                    <td>1,821,220</td>
                </tr>
                <tr>
                    <th rowSpan={4}>할인금액</th>
                    <th>약정</th>
                    <td>1,391,315</td>
                </tr>
                <tr>
                    <th>회원요금제</th>
                    <td>3,391,315</td>
                </tr>
                <tr>
                    <th>월약정요금</th>
                    <td>3,391,315</td>
                </tr>
                <tr>
                    <th>기타</th>
                    <td>3,391,315</td>
                </tr>
                <tr>
                    <th colSpan={2}>납부예상금액</th>
                    <td>KRW 1,821,220</td>
                </tr>
                <tr>
                    <th colSpan={3}>크레딧할인</th>
                    <td>0</td>
                </tr>
                <tr>
                    <th colSpan={3}>상품할인</th>
                    <td>0</td>
                </tr>
                <tr>
                    <th colSpan={3}>고객할인</th>
                    <td>0</td>
                </tr>
                <tr>
                    <th colSpan={3}>코인 사용금액</th>
                    <td>0</td>
                </tr>
                <tr>
                    <th colSpan={3}>100원미만할인</th>
                    <td>0</td>
                </tr>
                <tr>
                    <th colSpan={3}>세전</th>
                    <td>0</td>
                </tr>
                <tr>
                    <th colSpan={3}>부가세</th>
                    <td>0</td>
                </tr>
                <tr>
                    <th colSpan={3}>약정해지 위약금</th>
                    <td>0</td>
                </tr>
                <tr>
                    <th colSpan={3}>실청구 요금</th>
                    <td>0</td>
                </tr>
            </table>
        </div>
    );
};

export default Summary
