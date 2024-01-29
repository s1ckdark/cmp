import Breadcrumb from '@/components/Breadcrumb';
import CustomersForm from '@/components/Form/CustomersForm';

const CustomerView = () => {
    return (
        <>
            <Breadcrumb />
            <CustomersForm type={"view"} />
        </>
    );
}
export default CustomerView;