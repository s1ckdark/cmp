import CustomerList from "@/containers/customer/CustomerList";
import { fetchClient } from "@/services";

async function getData(url: string) {
    const response: any = await fetchClient(url);
    return response;
}

const CustomerPage = () => {
    return (
        <>
            <CustomerList />
        </>
    );
};

export default CustomerPage;
