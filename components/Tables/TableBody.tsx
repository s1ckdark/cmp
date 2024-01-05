"use client";
import React, { useState, ReactNode, useEffect, Suspense } from "react";
import styles from "./index.module.scss";
import { TableBodyProps } from "@/types/data";
import Styles from "./TableBody.module.scss";
import { useRouter } from "next/navigation";
import { monthAtom, currentPageAtom } from "@/states";
import {
    dataListAtom,
    historyListAtom,
    historyToggleAtom,
} from "@/states/data";
import { useRecoilState, useRecoilValue } from "recoil";
import { History, IconOverview } from "@/public/svgs";
import { addComma } from "@/utils/data";
import Loading from "@/components/Loading";

interface TypesMap {
    [key: string]: string[];
}

export const TableBody = ({ rowType, data }: any) => {
    // const [data, setData] = useRecoilState(dataListAtom) || null;
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
            "prodDesc",
            "stdPrice",
            "regName",
            "regDt",
            "history",
        ],
        customer: [
            "memberNo",
            "memberName",
            "regionType",
            "businessRegNo",
            "customerContacts",
            "salesContacts",
        ],
        user: [
            "email",
            "userFullName",
            "userType",
            "privileges",
            "regName",
            "regDt",
            "lastLogDt",
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
            
        ]
    };

    const view = (props?: any) => {
        const typeUrl: any = {
            invoice: `/billing/invoice/view/${[
                props.memberNo,
            ]}/${targetMonth}`,
            customer: `/customer/view/${[props.id]}`,
            user: `/admin/user/view/${[props.id]}`,
            productGd: `/products/product/view/${[props.id]}`,
            productCategory: `/products/category/view/${[props.id]}`,
            billingProduct: `/billing/product/view/${[props.prodId]}`,
        };
        router.push(typeUrl[rowType] + "/" + props.id);
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
            default:
                return data?.data;
        }
    };

    const historyView = (historyData: any[]) => {
        setHistory(historyData);
        setHistoryToggle(true);
    };

    const visual = (memberNo: string) => {
        router.push(`/billing/invoice/visual/${memberNo}/${targetMonth}`);
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
                        {data.totalItems ? data.totalItems:data.data.length - index - (pageNumber - 1) * 10}
                    </td>
                );
                break;
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
            default:
                content = (
                    <td key={key + "-" + keyIndex} onClick={() => view(item)}>
                        {typeof fieldValue !== "number"
                            ? fieldValue
                            : addComma(fieldValue)}
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
