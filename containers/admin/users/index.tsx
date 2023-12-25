'use client';
import { Tables } from "@/components/Tables";
import styles from "./index.module.scss";
import { TableBodyProps } from '@/types/data';
import { isEmptyObject } from '@/utils/data';
import { getAllUsers } from '@/services/data';
import Pagination from '@/components/Pagination';
import { useRouter } from 'next/navigation';

const UsersPage = async ({rowType, pageNumber, className }:TableBodyProps) => {
    // const { data, isLoading, error } = await getAllUsers(pageNumber);
    // console.log(data);
    const router = useRouter();
    // const exfetch = async (pageNumber:number) => {
    // const { data, isLoading, error } = await fetchData(pageNumber);
    // console.log("fetchDataandsetrow", data, isLoading, error);
    // console.log(data.totalPages);


    const onPageChange = (pageNumber: number) => {
        // console.log(pageNumber);
            router.push(`./${pageNumber-1}`);
    }
    return (
        <div className={`${styles.container} min-h-screen`}>
           {/* <Tables rowType={"users"} data={data.content} className={'border'} pageNumber={pageNumber} /> */}
           {/* <Pagination count={data.totalPages} page={pageNumber} onPageChange={onPageChange} /> */}
        </div>
    )
}

export default UsersPage;