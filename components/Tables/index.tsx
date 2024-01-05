"use client";
import React, { useEffect, useState, Suspense } from "react";
import { TableHeader } from "./TableHeader";
import { TableBody } from "./TableBody";
import styles from "./index.module.scss";
import { TablesProps, TableHeaderProps, TableBodyProps } from "@/types/data";
import Pagination from "@/components/Pagination";
import { useSetRecoilState, useRecoilValue, useRecoilState } from "recoil";
import { currentPageAtom } from "@/states";
import { dataListAtom } from "@/states/data";
import { useRouter } from "next/navigation";
import Button from "@/components/Button";
import Loading from "@/components/Loading";
import { usePathname } from "next/navigation";
import { pathSpliter } from "@/utils/data";
import { apiBe } from "@/services";
import { Toast } from "@/components/Toast";
import { monthAtom } from "@/states";

export const Tables = ({ rowType, className }: TablesProps) => {
    const [data, setData] = useState([]);
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
                params: { targetMonth, page: pageNumber },
                key: "products",
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
        };

        const fetching = async (
            pageNumber: number,
        ) => {
            const response = await apiBe.get(endpoint[rowType]['url'], {
                params: endpoint[rowType]['params']
            });
            if (response.status === 200 || response.status === 201) {
                setData({
                    data: endpoint[rowType]['key'] !== undefined ? response.data[endpoint[rowType]['key']]:response.data,
                    totalPages: response.data.totalPages,
                    currentPage: pageNumber,
                });
                setMounted(true);
            } else {
                Toast("error", "데이터를 불러오는데 실패하였습니다.");
            }
        };
        fetching(pageNumber);
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
    };
    
    const write = () => {
        router.push(`${pageUrl[rowType]}/write`);
    };

    const writeDisable = () => {
        switch (rowType) {
            case "invoice":
                return false;
                break;
            case "productGd":
                return true;
                break;
            case "customer":
                return true;
                break;
            case "user":
                return true;
                break;
            case "billingProduct":
                return true;
                break;
            case "productCategory":
                return true;
                break;
            case "menu":
                return true;
                break;
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
