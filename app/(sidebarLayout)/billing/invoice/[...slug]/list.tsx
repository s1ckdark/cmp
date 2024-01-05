import InvoiceList from "@/containers/billing/invoice/InvoiceList";
import { fetchClient } from "@/services";

async function getData(url: string) {
    const response: any = await fetchClient(url);
    return response;
}

const InvoiceListPage = async ({ pageNumber }: any) => {
    // const url = `/invoice/search?page=${pageNumber}`;
    // const data: any = await getData(url);

    return (
        <>
            <InvoiceList pageNumber={pageNumber} />
        </>
    );
};

export default InvoiceListPage;
