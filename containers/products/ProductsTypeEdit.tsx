"use client";
import React, { useEffect, useState } from "react";
import Styles from "./ProductsTypeEdit.module.scss";
import Button from "@/components/Button";
import Breadcrumb from "@/components/Breadcrumb";
import { useForm, SubmitHandler } from "react-hook-form";
import { apiBe } from "@/services";
import { usePathname, useRouter } from "next/navigation";
import lodash from "lodash";
import { Toast } from "@/components/Toast";
import Loading from "@/components/Loading";
import { useRecoilState } from "recoil";
import { confirmAtom } from "@/states/confirm";
interface FormValues {
    prodType: string;
    prodDetailType: string;
    prodDetailTypeStd: string;
}

interface IForm {
    register: any;
    handleSubmit: any;
    watch: any;
    reset: any;
    getValues: any;
    setError: any;
    setFocus: any;
    formState: any;
}

const ProductsTypeEdit = () => {
    const [product, setProduct] = useState<any>(null);
    const [confirm, setConfirm] = useRecoilState(confirmAtom);
    const router = useRouter();
    const pathname = usePathname();
    const [type, setType] = useState(false);
    const prodId = lodash.last(pathname.split("/"));
    const { id, prodType, prodDetailType, prodDetailTypeStd } = product || {};
    const {
        register,
        handleSubmit,
        watch,
        reset,
        getValues,
        setValue,
        setError,
        setFocus,
        formState: { errors },
    } = useForm({
        defaultValues: {
            id: product?.id || "",
            prodType: product?.prodType || "",
            prodDetailType: product?.prodDetailType || "",
            prodDetailTypeStd: product?.prodDetailTypeStd || "",
        },
    });

    useEffect(() => {
        const getProductInfo = async () => {
            const url = `/product/producttype/${prodId}`;
            const response = await apiBe(url);
            if (response.status === 200) {
                const { data } = response;
                setProduct(data);
            } else {
                console.log("error");
            }
        };
        getProductInfo();
    }, [prodId]);

    const onSubmit: SubmitHandler<FormValues> = async (data) => {
        const url = `/product/producttype/${prodId}`;
        const response = await apiBe.post(url, data);
        if (response.status === 201 || response.status === 200) {
            Toast("success", "저장되었습니다.", () => router.push("/products/category/list/1"));
        } else {
            Toast("error", "저장이 실패했습니다.");
        }
    };

    const cancel = () => {
        router.push("/products/category/list/1");
    };

    const productType = watch("prodType");

    useEffect(() => {
        if (productType === "SW") {
            setType(true);
        } else {
            setType(false);
            setValue("prodDetailTypeStd", "");
        }
    }, [productType]);

    const del = async (prodId: string) => {
        const url: any = "/product/producttype/" + prodId;
        console.log(url);
        const response = await apiBe.delete(url);
        if (response.status === 201 || response.status === 200) {
            Toast("success", "삭제되었습니다.", () => router.push("/products/category/list/1"));
        }
    };
    const confirmDel = (prodId: string) => {
        setConfirm({
            open: true,
            title: "삭제",
            message: "삭제 하시겠습니까?",
            onConfirm: () => del(prodId),
        });
    };
    useEffect(() => {
        setValue("id", prodId);
        setValue("prodType", prodType);
        setValue("prodDetailType", prodDetailType);
        setValue("prodDetailTypeStd", prodDetailTypeStd);
    }, [product]);

    if (!product) return <Loading />;

    return (
        <>
            <Breadcrumb />
            <div className={Styles.container}>
                <form className={Styles.form} onSubmit={handleSubmit(onSubmit)}>
                    <div className={Styles.inputGroup}>
                        <label htmlFor="type">상품분류</label>
                        <div className={Styles.inputRadio}>
                            <label htmlFor="prodType">
                                <input type="radio" {...register("prodType")} value="SW" />
                                상용SW
                            </label>
                            <label htmlFor="prodType">
                                <input type="radio" {...register("prodType")} value="MSP" />
                                MSP
                            </label>
                            {errors.prodType && <span className={Styles.error}>필수 입력 항목 입니다</span>}
                        </div>
                    </div>
                    <div className={Styles.inputGroup}>
                        <label htmlFor="prodDetailType">상품상세분류</label>
                        <input type="text" placeholder="상품상세분류를 입력하세요" {...register("prodDetailType")} defaultValue={prodDetailType} />
                        {errors.prodDetailType && <span className={Styles.error}>필수 입력 항목 입니다</span>}
                    </div>
                    {type && (
                        <div className={Styles.inputGroup}>
                            <label htmlFor="prodDetailTypeStd">상품가격기준</label>
                            <input type="text" placeholder="상품가격기준을 입력하세요" {...register("prodDetailTypeStd")} defaultValue={prodDetailTypeStd} />
                        </div>
                    )}
                    <div className={Styles.btnArea}>
                        <Button type="submit" skin={"submit"}>
                            저장
                        </Button>
                        <Button type="button" skin={"del"} onClick={() => confirmDel(prodId ?? "")}>
                            삭제
                        </Button>
                        <Button type="button" skin={"cancel"} onClick={cancel}>
                            취소
                        </Button>
                    </div>
                </form>
            </div>
        </>
    );
};

export default ProductsTypeEdit;
