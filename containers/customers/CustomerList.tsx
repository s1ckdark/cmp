import Breadcrumb from "@/components/Breadcrumb";
import { Tables } from "@/components/Tables";

const CustomerList = () => {
    return (
        <>
            <Breadcrumb />
            <Tables rowType={'customers'} />
        </>
    );
}
export default CustomerList;