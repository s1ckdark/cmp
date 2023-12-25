import ProductWrite from "@/containers/billing/product/ProductWrite";

const ProductWritePage = ({pageNumber}:any) => {
    console.log("ProductWrite pageNumber :",pageNumber)
    return (
            <>
                <ProductWrite />
            </>

    );
}

export default ProductWritePage;