import InvoiceList from "@/containers/billing/invoice/InvoiceList";

const InvoiceListPage = ({pageNumber}:any) => {
    console.log("InvoiceList pageNumber :",pageNumber)
    return (
            <>
                <InvoiceList pageNumber={pageNumber} />
            </>

    );
}

export default InvoiceListPage;