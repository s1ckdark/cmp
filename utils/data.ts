import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
export const isEmptyObject = (obj: object) => {
    if( obj === null || obj === undefined ) return true;
    return Object.keys(obj).length === 0 && obj.constructor === Object;
}

type ColumnKeys = "memberNo" | "memberName" | "regionType" | "businessRegNo" | "customerContacts" | "salesContacts" | "naverCost.cloudType" | "target_start_date" | "target_end_date" | "naverCost.payCurrency_code" | "naverCost.useAmount" | "naverCost.totalDiscountAmt" | "naverSummary.thisMonthDemandAmount" | "gdSummary.swUseAmount" | "gdSummary.mspUseAmount" | "gdSummary.productdiscountamount" | "gdSummary.thisMonthDemandAmount" | "result.thisMonthDemandAmount" | "result.thisMonthVatAmount" | "result.totalDemandAmount";

export const convertColumns = (params: ColumnKeys) => {
    const convert: Record<ColumnKeys, string> = {
        "memberNo": "고객번호",
        "memberName": "고객명",
        "regionType": "고객유형",
        "businessRegNo": "사업자번호",
        "customerContacts": "담당영업",
        "salesContacts": "등록자",
        "target_start_date": "이용시작일자",
        "target_end_date": "이용종료일자",
        "naverCost.cloudType": "클라우드 유형",
        "naverCost.payCurrency_code": "결제통화",
        "naverCost.useAmount": "이용금액",
        "naverCost.totalDiscountAmt": "할인금액", // naverSummary.ectDiscountAmount + naverSummary.productDiscountAmount + naverSummary.customDiscountAmount 인 것인가요?
        "naverSummary.totalDemandAmount": "공급가액", // demand는 수요아닌가요?
        "naverSummary.thisMonthDemandAmount": "공급가액", // 이 두가지가 공급가로 추정되는데 기준이 달라보입니다. 어떤게 맞을까요?
        "gdSummary.swUseAmount": "SW 이용금액",
        "gdSummary.mspUseAmount": "MSP 이용금액",
        "gdSummary.productdiscountamount": "할인금액",
        "gdSummary.thisMonthDemandAmount": "공급가액",
        "result.thisMonthDemandAmount": "월전체 힙계", 
        "result.thisMonthVatAmount": "부가세",
        "result.totalDemandAmount": "최종공급가액",
    }
    return convert[params] || params;
}

export const isObjKeyExist = (obj: any, key: string) => {
    if(obj === null || obj === undefined) return false;
    return Object.keys(obj).includes(key) ? obj[key] : "N/A";
}
