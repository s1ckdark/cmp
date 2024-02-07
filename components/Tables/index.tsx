"use client";
import React, { useEffect, useState } from "react";
import { TableHeader } from "./TableHeader";
import { TableBody } from "./TableBody";
import styles from "./index.module.scss";
import { TablesProps } from "@/types/data";
import Pagination from "@/components/Pagination";
import { useRecoilState, useResetRecoilState, useRecoilValue } from "recoil";
// import { currentPageAtom } from "@/states";
import { dataListAtom } from "@/states/data";
import { useRouter } from "next/navigation";
import Button from "@/components/Button";
import Loading from "@/components/Loading";
import { usePathname } from "next/navigation";
import { pathSpliter } from "@/utils/data";
import { apiBe } from "@/services";
import { Toast } from "@/components/Toast";
import { monthAtom, modalAtom } from "@/states";

interface dataProps {
    data: any;
    totalPages: number;
    currentPage?: number;
}
export const Tables = ({ rowType }: TablesProps) => {
    useResetRecoilState(dataListAtom);
    useResetRecoilState(modalAtom);
    useRecoilState(monthAtom);
    const [data, setData] = useRecoilState(dataListAtom);
    const [mounted, setMounted] = useState(false);
    const targetMonth = useRecoilValue(monthAtom) || null;
    const router = useRouter();
    const path = usePathname();
    

    useEffect(() =>{ 
        const pageNumber: any = data.mode === 'search' ? data.currentPage : pathSpliter(path).pageNumber;
        const endpoint:any = {
            invoice: {
                url: "/invoice/search",
                params: { targetMonth: targetMonth, page: pageNumber },
                key: "content",
            },
            billingProduct: {
                url: "/product/gdbilling",
                params: { target_month: targetMonth, page: pageNumber },
                key: "content",
            },
            productCategory: {
                url: "/product/producttype",
                params: { page: pageNumber },
                key: "content",
            },
            productGd: {
                url: "/product/product",
                params: { page: pageNumber },
                key: "content",
            },
            customers: {
                url: "/customer",
                params: { page: pageNumber },
                key: "content",
            },
            user: {
                url: "/user",
                params: { page: pageNumber },
                key: "content",
            },
            menu: {
                url: "/menu",
                params: { page: pageNumber },
            },
            role: {
                url: "/role",
                params: { page: pageNumber },
            },
            log: {
                url: "/user/logging",
                params: { page: pageNumber },
                key: "content",
            },
            notice: {
                url: "/notice",
                params: { page: pageNumber },
                key: "content"
            },
            support: {
                url: "/supportboard/board",
                params: { page: pageNumber },
                key: "content"
            }
        };

        const fetching = async () => {
            const { params } = data.mode === "search" ? data : endpoint[rowType];
            console.log(data.mode, params);
            const response = await apiBe.get(endpoint[rowType]['url'], { params });
            
            if (response.status === 200 || response.status === 201) {
                setData({
                    ...data,
                    data: endpoint[rowType]['key'] !== undefined ? response.data[endpoint[rowType]['key']]:response.data,
                    totalPages: response.data.totalPages,
                    currentPage: pageNumber
                });
        
                setMounted(true);
            } else {
                Toast("error", "데이터를 불러오는데 실패하였습니다.");
            }
        };
        fetching()
    }, [path, rowType, targetMonth, data.currentPage, data.mode]);

    const onPageChange = (newPage: number) => {
        if (data.mode === "search") {
            setData({
                ...data,
                params: {
                    ...data.params,
                    page: newPage
                },
                currentPage: newPage
            })
        } else {
            router.push(`./${newPage}`)
        }
        console.log(data)
    };

    const pageUrl:any = {
        invoice: "/billing/invoice",
        productGd: "/products/product",
        customers: "/customers",
        user: "/admin/user",
        billingProduct: "/billing/product",
        productCategory: "/products/category",
        menu: "/admin/menu",
        role: "/admin/role",
        log: "/admin/log",
        notice: "/notice",
        support: "/support"
    };
    
    const write = () => {
        switch (rowType) {
            case "user":
                return router.push(`${pageUrl[rowType]}/register`);
            default:
                return router.push(`${pageUrl[rowType]}/write`);
        }
    };

    const writeDisable = () => {
        switch (rowType) {
            case "invoice":
                return false;
            case "log":
                return false;
            default:
                return true;
        }
    };
    
    if (!data) return <Loading />;

    return mounted && (
        <>
            <div className={styles.tableContainer}>
                <div className={styles.scroller}>
                    <table className={styles[rowType]}>
                        <TableHeader rowType={rowType} />
                        {data.data.length > 0 ? <TableBody rowType={rowType} data={data} />:<tbody><tr><td colSpan={10} className="text-center text-xl p-10">조회된 데이터가 없습니다.</td></tr></tbody>}
                    </table>
                </div>
            </div>

            <div className={styles.btnArea}>
                {data.data.length > 0 && data.totalPages && (
                    <Pagination
                        count={data.totalPages}
                        page={data.currentPage}
                        onPageChange={onPageChange}
                    />
                )}
                {writeDisable() && (
                    <Button
                        className={styles.btn}
                        onClick={() => write()}
                        skin={"green"}
                    >
                        등록
                    </Button>
                )}
            </div>
        </>
    );
};
