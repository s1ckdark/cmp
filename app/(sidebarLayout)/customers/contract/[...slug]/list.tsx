import UserList from "@/containers/customer/UserList";
import { fetchClient } from "@/services";

async function getData(url: string) {
    const response: any = await fetchClient(url);
    return response;
}

const CustomerPage = () => {
    return (
        <>
            <UserList />
        </>
    );
};

export default CustomerPage;
