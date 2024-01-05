
import { useRecoilValue } from 'recoil';

import { dataViewAtom } from '@/states/data'; // Import your Recoil state
import { isObjKeyExist, addComma } from '@/utils/data';

import Loading from '@/components/Loading';
import styles from './Summary.module.scss';

const Summary = () => {
    const resultData = useRecoilValue(dataViewAtom);
    const { data, memberNo, targetMonth } = resultData || {}; // Add null check and provide default value


    if (!data) return <Loading />; 
    const { naverSummary, result }:any = data;
    return (
        <div className={styles.summary}>
            <hgroup>
                <h1>총계</h1>
            </hgroup>
            <table className="w-full table">
                <thead>
                    <tr>
                        <th rowSpan={6}>월전체 합계</th>
                        <th colSpan={2}>이용금액</th>
                    </tr>
                    <tr>
                        <th rowSpan={4}>할인금액</th>
                        <th>약정</th>
                    </tr>
                    <tr>
                        <th>회원요금제</th>
                    </tr>
                    <tr>
                        <th>회원약정요금제</th>
                    </tr>
                    <tr>
                        <th>기타</th>
                    </tr>
                    <tr>
                        <th colSpan={2}>납부예상금액</th>
                    </tr>
                    <tr>
                    <th colSpan={3}>크레딧할인</th>
                    </tr>
                    <tr>
                    <th colSpan={3}>상품할인</th>
                    </tr>
                    <tr>
                    <th colSpan={3}>고객할인</th>
                    </tr>
                    <tr>
                    <th colSpan={3}>코인 사용금액</th>
                    </tr>
                    <tr>
                    <th colSpan={3}>100원미만할인</th>
                    </tr>
                    <tr>
                    <th colSpan={3}>미납금(누적+가산금액 포함)</th>
                    </tr>
                    <tr>
                    <th colSpan={3}>세전</th>
                    </tr>
                    <tr>
                    <th colSpan={3}>부가세</th>
                    </tr>
                    <tr>
                    <th colSpan={3}>약정해지 위약금(부가세 면제항목)</th>
                    </tr>
                     <tr>
                    <th colSpan={3}>실청구 요금</th>
                    </tr>
                </thead>
                <tbody>
                <tr>
                    <td>{addComma(isObjKeyExist(result, "useAmount"))}</td>
                </tr>
                <tr>
                    <td>{addComma(isObjKeyExist(naverSummary, "promiseDiscountAmount"))}</td>
                </tr>
                <tr>
                    <td>{addComma(isObjKeyExist(naverSummary, "memberPriceDiscountAmount"))}</td>
                </tr>
                <tr>
                    <td>{addComma(isObjKeyExist(naverSummary, "memberPromiseDiscountAddAmount"))}</td>
                </tr>
                <tr>
                    <td>{addComma(isObjKeyExist(result, "etcdiscountamount"))}</td>
                </tr>
                <tr>
                    <td>{addComma(isObjKeyExist(result, "thisMonthDemandAmount"))}</td>
                </tr>
                <tr>
                    <td>{addComma(isObjKeyExist(result, "creditDiscountAmount"))}</td>
                </tr>
                <tr>
                    <td>{addComma(isObjKeyExist(result, "productDiscountAmount"))}</td>
                </tr>
                <tr>
                    <td>{addComma(isObjKeyExist(result, "customerDiscountAmount"))}</td>
                </tr>
                <tr>
                    <td>{addComma(isObjKeyExist(result, "coinUseAmount"))}</td>
                </tr>
                <tr>
                    <td>{addComma(isObjKeyExist(result, "rounddownDiscountAmount"))}</td>
                </tr>
                <tr>
                    <td>{addComma(isObjKeyExist(result, "overduePlusAmount"))}</td>
                </tr>
                <tr>
                    <td>{addComma(isObjKeyExist(result, "thisMonthDemandAmount"))}</td>
                </tr>
                <tr>
                    <td>{addComma(isObjKeyExist(result, "thisMonthVatAmount"))}</td>
                </tr>
                <tr>
                    <td>{addComma(isObjKeyExist(result, "defaultAmount"))}</td>
                </tr>
                <tr>
                    <td>{addComma(isObjKeyExist(result, "totalDemandAmount"))}</td>
                </tr>

                </tbody>
            </table>
        </div>
    )
};

export default Summary
