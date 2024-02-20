"use client";

import { useEffect } from "react";
import Styles from "./TableBody.module.scss";
import { useRouter } from "next/navigation";
import { monthAtom, currentPageAtom } from "@/states";
import { historyListAtom, historyToggleAtom, visualAtom } from "@/states/data";
import { userInfoPerAtom } from "@/states/localStorage";
import { useRecoilState, useRecoilValue, useResetRecoilState } from "recoil";
import { History, IconOverview } from "@/public/svgs";
import { addComma } from "@/utils/data";
import Loading from "@/components/Loading";
import dayjs from "dayjs";

interface TypesMap {
    [key: string]: string[];
}

export const TableBody = ({ rowType, data }: any) => {
    // const [viewData, setViewData] = useRecoilState(dataViewAtom) || null;
    const [userInfo, setUserInfo] = useRecoilState(userInfoPerAtom);
    const pageNumber = useRecoilValue(currentPageAtom);
    const [history, setHistory] = useRecoilState(historyListAtom || null);
    const totalItems: any = data?.totalItems;
    const targetMonth = useRecoilValue(monthAtom);
    const [historyToggle, setHistoryToggle] =
        useRecoilState<boolean>(historyToggleAtom);
    const router = useRouter();
    const display: TypesMap = {
        invoice: [
            "overview",
            "memberNo",
            "memberName",
            "naverCost.cloudType",
            "term",
            "naverCost.payCurrency_code",
            "naverCost.useAmount",
            "naverCost.totalDiscountAmt",
            "naverSummary.thisMonthDemandAmount",
            "gdSummary.swUseAmount",
            "gdSummary.mspUseAmount",
            "gdSummary.productdiscountamount",
            "gdSummary.thisMonthDemandAmount",
            "result.thisMonthDemandAmount",
            "result.thisMonthVatAmount",
            "result.totalDemandAmount",
        ],
        productGd: [
            "idx",
            "prodName",
            "prodType",
            "prodDetailType",
            "stdPrice",
            "regName",
            "regDt",
            // "history",
        ],
        customers: [
            "memberNo",
            "memberName",
            "regionType",
            "businessRegNo",
            "sales.name",
            "regName",
            "regDt"
        ],
        user: [
            "email",
            "userFullName",
            "userType",
            "privileges",
            "activated",
            "regName",
            "regDt",
            // "lastLogDt",
        ],
        billingProduct: [
            "memberNo",
            "memberName",
            "category",
            "prodName",
            "prodDetailType",
            "prodDetailTypeStd",
            "stdPrice",
            "expPrice",
            "discountRate",
            "regName",
            "regDt",
        ],
        productCategory: [
            "prodType",
            "prodDetailType",
            "prodDetailTypeStd",
            "regDt",
            "regName",
        ],
        menu: [
            "idx",
            "menuName",
            "parentMenuId",
            "url",
            "icon",
            "redName",
            "regDt",
            "modName",
            "modDt"
        ],
        role: [
            // "index",
            "name",
            "description"
        ],
        log: [
            "userId",
            "userName",
            "ipAddress",
            "clientInfo",
            "regDt"
        ],
        notice: [
            "idx",
            "subject",
            "noticeType",
            "regName",
            "files",
            "regDt"
        ],
        support: [
            "idx",
            "memberNo",
            "memberName",
            "subject",
            "typeName",   
            "chargeName",
            "salesName",
            "regName",
            "regDt",
            "statusName",
        ]
    };

    const view = (props?: any) => {
        switch (rowType) {
            case "user":
                setUserInfo(props)
                break;
            default:
                break;
        }
        const typeUrl: any = {
            invoice: `/billing/invoice/view/${[
                props.memberNo,
            ]}/${targetMonth}`,
            customers: `/customers/view/${props.memberNo}`,
            user: `/admin/user/view/${props.id}`,
            productGd: `/products/product/view/${props.id}`,
            billingProduct: `/billing/product/view/${targetMonth}/${props.memberNo}`,
            productCategory: `/products/category/view/${props.id}`,
            // role: `/admin/role/view/${props.id}`,
            notice: `/notice/view/${props.id}`,
            support: `/support/view/${props.id}`,
        };

        if(typeUrl[rowType] === undefined) return;
        router.push(typeUrl[rowType]);
    };

    const newData = (rowType: string) => {
        switch (rowType) {
            case "invoice":
                return (
                    data?.data &&
                    data.data.map((item: any) =>
                        Object.assign({}, item, {
                            term:
                                item.target_start_date +
                                " ~ " +
                                item.target_end_date,
                        }),
                    )
                );
                break;
            case "productGd":
                return (
                    data?.data &&
                    data["data"].map((item: any, index: number) =>
                        Object.assign({}, item, {
                            history: (
                                <History
                                    onClick={() => setHistory(item.prodHist)}
                                />
                            ),
                        }),
                    )
                );
                break;
            case "files":
                return (
                    data['content']['uploadedFiles'].length > 0 ? true : false
                )
            default:
                return data?.data;
        }
    };

    const historyView = (historyData: any[]) => {
        setHistory(historyData);
        setHistoryToggle(true);
    };

    const resetVisual = useResetRecoilState(visualAtom);
    const visual = (memberNo: string) => {
        resetVisual();
        router.push(`/billing/invoice/visual/${memberNo}`);
    };
    const field = display[rowType];

    const renderCell = (key: any, keyIndex: number, item: any, index:number) => {
        let content;
        const fieldValue = key
            .split(".")
            .reduce((acc: any, cur: any) => acc && acc[cur], item);

        switch (key) {
            case "idx":
                content = (
                    <td key={key + "-" + keyIndex} onClick={() => view(item)}>
                        {data.totalElements && data.totalElements > 0 ? data.totalElements - index - (data.currentPage - 1 ) * 10:data.data.length - index - (pageNumber - 1) * 10}
                    </td>
                );
                break;
            // case "index":
            //     content = (
            //         <td key={key + "-" + keyIndex} onClick={() => view(item)}>
            //             {data.data.length - index}
            //         </td>
            //     );
            //     break;
            case "history":
                content = (
                    <td key={key + "-" + keyIndex}>
                        <History onClick={() => historyView(item.prodHist)} />
                    </td>
                );
                break;
            case "overview":
                content = (
                    <td
                        key={key + "-" + keyIndex}
                        onClick={() => visual(item.memberNo)}
                    >
                        <IconOverview />
                    </td>
                );
                break;
            case "discountRate":
                content = (
                    <td
                        key={key + "-" + keyIndex}
                        onClick={() => visual(item.memberNo)}
                    >
                        {item.discountRate}%
                    </td>
                );
                break;
            case "files":
                content = (
                    <td key={key + "-" + keyIndex} onClick={() => view(item)}>
                        {item.uploadedFiles.length > 0 ? "O" : "X"}
                    </td>
                );
                break;
            case "activated":
                content = (
                    <td key={key + "-" + keyIndex} onClick={() => view(item)}>
                        {item.activated ? "O" : "X"}
                    </td>
                );
                break;
            case "regDt":
                content = (
                    <td key={key + "-" + keyIndex} onClick={() => view(item)}>
                        {dayjs(item.regDt).format("YYYY-MM-DD HH:mm")}
                    </td>
                )
                break;
            default:
                content = (
                    <td key={key + "-" + keyIndex} onClick={() => view(item)}>
                        {typeof fieldValue !== "number" ? fieldValue:addComma(fieldValue)}
                    </td>
                );
                break;
        }

        return content;
    };

    if (!data?.data) return <Loading />;
    return (
        <tbody className={`${Styles.container} ${Styles[rowType]}`}>
            {newData(rowType)?.map((item: any, index: number) => (
                <tr key={item.memberNo + "-" + item.targetMonth + "-" + index}>
                    {field.map((key: string, keyIndex: number) =>
                        renderCell(key, keyIndex, item, index),
                    )}
                </tr>
            ))}
        </tbody>
    );
};
