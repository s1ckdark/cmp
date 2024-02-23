import React, { useEffect, useState } from "react";
import { useForm, useFieldArray, useFormContext, Controller, FieldArrayWithId } from "react-hook-form";
import { modalAtom } from "@/states";
import { useRecoilState } from "recoil";
import { Toast } from "@/components/Toast";
import Button from "@/components/Button";
import styles from "./BillingProductTypeForm.module.scss";
import { confirmAtom } from "@/states/confirm";

interface IBillingProductForm {
    prodType: "billingSwList" | "billingMspList";
    pageType: string;
    product?: any;
}

interface IProduct {
    prodId: string;
    prodName: string;
    prodDetailType: string;
    prodDetailTypeStd?: string;
    qty?: number | undefined;
    expPrice?: number | undefined;
    stdPrice: number | undefined;
    discountRate: number | undefined;
    promiseDiscountamount: number | undefined;
    memberpricediscountamount: number | undefined;
    memberpromisediscountadddamount: number | undefined;
    trimDiscUnit: number | undefined;
    etcdiscountamount: number | undefined;
    billingUnit: string | undefined;
    estimateuseAmount: number | undefined;
    service_start_date: string;
    service_end_date: string;
    comment: string;
}

const BillingProductForm = ({ prodType, pageType, product }: IBillingProductForm) => {
    const [isDisabled, setIsDisabled] = useState(false);
    const [confirm, setConfirm] = useRecoilState(confirmAtom);
    const methods = useForm();
    const [modal, setModal] = useRecoilState(modalAtom);
    const {
        control,
        register,
        setValue,
        reset,
        watch,
        getValues,
        formState: { errors },
    }: any = useFormContext();
    const { fields, append, replace, prepend, update, remove, swap, move, insert } = useFieldArray({
        control,
        name: prodType,
    });

    useEffect(() => {
        if (pageType === "view") setIsDisabled(true);
    }, [pageType]);

    const deleteProd = (index: number, prodType: string) => {
        remove(index);
    };
    const confirmDeleteProd = (index: number, prodType: string) => {
        setConfirm({ ...confirm, open: true, title: "삭제", message: "삭제 하시겠습니까?", onConfirm: () => deleteProd(index, prodType) });
    };

    const openModal = (type: string) => {
        const productType = prodType === "billingSwList" ? "SW" : "MSP";
        const target_month = getValues("target_month");
        if (target_month === "") Toast("error", "기간을 선택해주세요");
        if (pageType !== "view") setModal({ isOpen: true, type: type, data: { ...modal.data, prodType: productType, service_start_date: getValues("target_start_date"), service_end_date: getValues("target_end_date") } });
    };

    useEffect(() => {
        const productType = modal.data?.prodType === "SW" ? "billingSwList" : "billingMspList";
        const target_month = getValues("target_month");
        const isExist = fields.find((field: any) => field.prodId === modal.data?.prodId);
        if (modal.type === "product" && target_month === "") Toast("error", "기간을 선택해주세요");
        if (isExist) {
            Toast("error", "이미 추가된 상품입니다.", () => setModal({ ...modal, data: null }));
        }
        if (!isExist && modal.type === "product" && modal.data?.prodId && prodType === productType && target_month !== "") {
            Toast("success", "상품이 추가되었습니다", () => append(modal.data));
            setModal({ ...modal, data: null });
        }
    }, [modal, prodType]);

    return (
        <>
            <div className={styles[prodType]}>
                <table>
                    <thead>
                        <tr>
                            <th></th>
                            <th>상품아이디</th>
                            <th>상품명</th>
                            <th>상품상세분류</th>
                            {prodType === "billingSwList" && <th>상품가격기준</th>}
                            <th>정식단가</th>
                            {prodType === "billingSwList" && <th>노출단가</th>}
                            <th>할인율</th>
                            {prodType === "billingMspList" && <th>수량</th>}
                            <th>납부예상금액</th>
                            <th>서비스 시작일시</th>
                            <th>서비스 종료일시</th>
                            <th>코멘트</th>
                        </tr>
                    </thead>
                    <tbody>
                        {fields.map((field, index) => {
                            const discountRate = watch(`${prodType}.${index}.discountRate`);
                            const stdPrice = watch(`${prodType}.${index}.stdPrice`);
                            const expPrice = watch(`${prodType}.${index}.expPrice`);
                            const qty = prodType === "billingMspList" ? watch(`${prodType}.${index}.qty`) : 0;
                            const estimateUseAmount = prodType === "billingSwList" ? ((100 - Number(discountRate)) * expPrice) / 100 : ((100 - discountRate) / 100) * stdPrice * qty;
                            // console.log(`${prodType}.${index}.estimateuseAmount`, estimateUseAmount);
                            return (
                                <tr key={field.id}>
                                    <td>
                                        <span onClick={() => confirmDeleteProd(index, prodType)}>&times;</span>
                                        {/* <span onClick={() => window.confirm("삭제하시겠습니까?") && deleteProd(index, prodType)}></span> */}
                                    </td>
                                    {/* <td><span onClick={() => setConfirmOpen(true)}>&times;</span><Confirm open={confirmOpen} onClose={()=>setConfirmOpen(false)} title="삭제" content="삭제 하시겠습니까?" onConfirm={()=>deleteSWProd(form.id, item.prodId)} /></td> */}
                                    <td>
                                        <input type="text" {...register(`${prodType}.${index}.prodId`, { disabled: isDisabled, required: false })} />
                                    </td>
                                    <td>
                                        <input type="text" {...register(`${prodType}.${index}.prodName`, { disabled: isDisabled, required: false })} />
                                    </td>
                                    <td>
                                        <input type="text" {...register(`${prodType}.${index}.prodDetailType`, { disabled: isDisabled, required: false })} />
                                    </td>
                                    {prodType === "billingSwList" && (
                                        <td>
                                            <input type="text" {...register(`${prodType}.${index}.prodDetailTypeStd`, { disabled: isDisabled, required: false })} />
                                        </td>
                                    )}
                                    <td>
                                        <input type="number" {...register(`${prodType}.${index}.stdPrice`, { disabled: isDisabled, required: false, valueAsNumber: true })} />
                                    </td>
                                    {prodType === "billingSwList" && (
                                        <td>
                                            <input type="number" {...register(`${prodType}.${index}.expPrice`, { disabled: isDisabled, required: false })} />
                                        </td>
                                    )}
                                    <td>
                                        <input type="number" {...register(`${prodType}.${index}.discountRate`, { disabled: isDisabled, required: false, valueAsNumber: true })} />
                                    </td>
                                    {prodType === "billingMspList" && (
                                        <td>
                                            <input type="number" {...register(`${prodType}.${index}.qty`, { disabled: isDisabled, required: false, valueAsNumber: true })} />
                                        </td>
                                    )}
                                    <td>
                                        <input type="number" {...register(`${prodType}.${index}.estimateuseAmount`, { disabled: isDisabled, valueAsNumber: true })} value={estimateUseAmount} />
                                    </td>
                                    <td>
                                        <input type="text" {...register(`${prodType}.${index}.service_start_date`, { disabled: isDisabled, required: false })} />
                                    </td>
                                    <td>
                                        <input type="text" {...register(`${prodType}.${index}.service_end_date`, { disabled: isDisabled, required: false })} />
                                    </td>
                                    <td>
                                        <input type="text" {...register(`${prodType}.${index}.comment`, { disabled: isDisabled, required: false })} />
                                    </td>
                                </tr>
                            );
                        })}
                    </tbody>
                </table>
            </div>
            {pageType !== "view" && (
                <div className={styles.btnArea}>
                    <Button type="button" skin={"green"} onClick={() => openModal("product")}>
                        상품추가
                    </Button>
                </div>
            )}
        </>
    );
};

export default BillingProductForm;
