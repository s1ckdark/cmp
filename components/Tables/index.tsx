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
import { monthAtom } from "@/states";

interface dataProps {
    data: any;
    totalPages: number;
    currentPage?: number;
}
export const Tables = ({ rowType }: TablesProps) => {
    useResetRecoilState(dataListAtom);
    const [data, setData] = useRecoilState(dataListAtom);
    const [ mounted, setMounted ] = useState(false);
    const targetMonth = useRecoilValue(monthAtom) || null;
    const router = useRouter();
    const path = usePathname();
    
    
    
    useEffect(() => {
        const { pageNumber }: any = pathSpliter(path);
        const endpoint:any = {
            invoice: {
                url: "/invoice/search",
                params: { targetMonth, page: pageNumber },
                key: "content",
            },
            billingProduct: {
                url: "/product/gdbilling",
                params: { targetMonth, page: pageNumber },
                key: "content",
            },
            productCategory: {
                url: "/product/producttype",
                params: { page: pageNumber },
                key: "content",
            },
            productGd: {
                url: "/product/product",
                params: { page: pageNumber - 1 },
                key: "products",
            },
            customer: {
                url: "/customer",
                params: { targetMonth, page: pageNumber },
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
            }
        };

        const fetching = async () => {
            
            const response = await apiBe.get(endpoint[rowType]['url'], {
                params: endpoint[rowType]['params']
            });
            console.log(response);
            if (response.status === 200 || response.status === 201) {
                setData({
                    data: endpoint[rowType]['key'] !== undefined ? response.data[endpoint[rowType]['key']]:response.data,
                    totalPages: response.data.totalPages,
                    currentPage: pageNumber
                });
                setMounted(true);
            } else {
                Toast("error", "데이터를 불러오는데 실패하였습니다.");
            }
        };
        fetching();
    }, [path, rowType, targetMonth]);

    const onPageChange = (newPage: number) => {
        router.push(`./${newPage}`);
    };
    


    const pageUrl:any = {
        invoice: "/billing/invoice",
        productGd: "/products/product",
        customer: "/customer",
        user: "/admin/user",
        billingProduct: "/billing/product",
        productCategory: "/products/category",
        menu: "/admin/menu",
        role: "/admin/role",
        log: "/admin/log",
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
                        <TableBody rowType={rowType} data={data} />
                    </table>
                </div>
            </div>

            <div className={styles.btnArea}>
                {data?.totalPages && (
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
