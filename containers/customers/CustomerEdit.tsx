import CustomersForm from "@/components/Form/CustomersForm";
import Breadcrumb from "@/components/Breadcrumb";

const CustomerEdit = () => {
    return (
        <>
            <Breadcrumb />
            <CustomersForm type={"edit"} />
        </>
    );
}
export default CustomerEdit;