import CustomersForm from "@/components/Form/CustomersForm";
import Breadcrumb from "@/components/Breadcrumb";

const CustomerWrite = () => {
    return (
        <>
            <Breadcrumb />
            <CustomersForm type={"register"} />
        </>
    );
}
export default CustomerWrite;