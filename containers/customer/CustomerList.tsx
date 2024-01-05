import Breadcrumb from "@/components/Breadcrumb";
import { Tables } from "@/components/Tables";
const CustomerList = () => {
    // const { data, error, isLoading, isError } = useQuery("customers", () => getData("/customers"));
    // if (isLoading) {
    //     return <div>Loading...</div>;
    // }
    // if (isError) {
    //     return <div>{error.message}</div>;
    // }
    return (
        <>
            <Breadcrumb />
            <Tables rowType={'customer'} className={'CustomerList'} />
        </>
    );
}
export default CustomerList;