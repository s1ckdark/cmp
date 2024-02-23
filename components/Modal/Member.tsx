"use client";
import styles from "./Member.module.scss";
import Button from "@/components/Button";
import { apiBe } from "@/services";
import { Toast } from "@/components/Toast";
import { useRecoilState } from "recoil";
import { modalAtom } from "@/states";
import { modalListAtom } from "@/states/modal";
import Pagination from "@/components/Pagination";

const Member = () => {
    const [data, setData] = useRecoilState(modalListAtom);
    const [modal, setModal] = useRecoilState(modalAtom);

    const onChange = (e: any) => {
        setData({ ...data, keyword: e.target.value });
    };

    const onPageChange = (page: number) => {
        setData({ ...data, currentPage: page });
    };

    const pickup = (memberNo: string, memberName: string) => {
        setModal({
            ...modal,
            isOpen: false,
            data: {
                memberNo: memberNo,
                memberName: memberName,
            },
        });
        setData({
            modalType: "",
            keyword: "",
            data: [],
            totalPages: 0,
            currentPage: 1,
        });
    };

    const onSearch = async () => {
        const url = "/customer";
        // if (keyword === '') {
        //     Toast("error", '검색어를 입력해주세요.');
        //     return false;
        // }
        const response = await apiBe(url, {
            params: { memberName: data.keyword, page: data.currentPage },
        });
        if (response.status === 200 || response.status === 201) {
            const { content } = response.data;
            if (content.length === 0) {
                Toast("error", "회사명이 존재하지 않습니다.");
            } else {
                setData({
                    ...data,
                    modalType: modal.type,
                    data: content,
                    totalPages: data.totalPages,
                    currentPage: data.currentPage,
                });
            }
        }
    };

    return (
        <div className={styles.member}>
            <div className={styles.searchInput}>
                <input
                    type="text"
                    placeholder="회사명을 입력하세요."
                    onChange={onChange}
                    value={data.keyword}
                />
                <Button onClick={onSearch} skin={"green"}>
                    검색
                </Button>
            </div>
            <div className={styles.memberList}>
                <table>
                    <thead>
                        <tr>
                            <th>회사명</th>
                            <th>회사번호</th>
                        </tr>
                    </thead>
                    <tbody>
                        {data.data.length > 0 ? (
                            data.data.map((item: any, index: number) => (
                                <tr
                                    className={styles.memberItem}
                                    key={`${item.memberNo}-${item.memberName}-${index}`}
                                    onClick={() =>
                                        pickup(item.memberNo, item.memberName)
                                    }
                                >
                                    <td className={styles.memberNo}>
                                        {item.memberNo}
                                    </td>
                                    <td className={styles.memberName}>
                                        {item.memberName}
                                    </td>
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td colSpan={3}>검색 결과가 없습니다.</td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
            {data.totalPages > 1 && (
                <Pagination
                    count={data.totalPages}
                    page={data.currentPage}
                    onPageChange={onPageChange}
                />
            )}
        </div>
    );
};

export default Member;
