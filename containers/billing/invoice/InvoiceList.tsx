"use client";
import Breadcrumb from "@/components/Breadcrumb";
import React, { use, useEffect, Suspense, useState } from "react";
import { useRecoilState, useRecoilValue } from "recoil";
import { dataListAtom, searchAtom } from "@/states/data";
import { pageNumberType } from "@/types/props";
import { Tables } from "@/components/Tables";
import { apiBe, fetchClient } from "@/services";
import { monthAtom, currentPageAtom } from "@/states";
import MonthBar from "@/components/MonthBar";
import { Toast } from "@/components/Toast";
import Searchbar from "@/components/Searchbar";
import Styles from "./InvoiceList.module.scss";

const InvoiceList = () => {
    return (
        <>
            <Breadcrumb />
            <MonthBar />
            <div className={`${Styles.table} ${Styles.withSearchbar}`}>
                <Searchbar rowType={'invoice'} />
                <Tables rowType={"invoice"} />
            </div>
        </>
    );
};

export default InvoiceList;
