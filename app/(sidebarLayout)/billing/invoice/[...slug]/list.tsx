import InvoiceList from "@/containers/billing/invoice/InvoiceList";

const InvoiceListPage = ({pageNumber}:any) => {
    return (
            <>
                <InvoiceList pageNumber={pageNumber} />
            </>

    );
}

export default InvoiceListPage;