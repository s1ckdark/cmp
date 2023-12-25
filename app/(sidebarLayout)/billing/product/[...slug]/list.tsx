import ProductList from "@/containers/billing/product/ProductList";

const ProductListPage = ({pageNumber}:any) => {
    console.log("ProductList pageNumber :",pageNumber)
    return (
            <>
                <ProductList pageNumber={pageNumber} />
            </>

    );
}

export default ProductListPage;