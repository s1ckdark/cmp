import ProductView from "@/containers/billing/product/ProductView";

interface ProductViewProps {
    memberNo: any;
    targetMonth: any;
}

const ProductViewPage = ({ memberNo, targetMonth }: ProductViewProps) => {
    return (
        <>
            <ProductView />
        </>
    );
};
export default ProductViewPage;
