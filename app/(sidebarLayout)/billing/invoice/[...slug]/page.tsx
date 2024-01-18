import InvoiceView from "./view";
import InvoiceList from "./list";
import InvoiceVisual from "./visual";


const invoicePage = ({ params }: any) => {
    const { slug } = params;
    console.log(params);
    const pageType = slug[0];
    let pageNumber = 1,
        memberNo = "",
        targetMonth = "";
    if (pageType === "list") {
        pageNumber = slug[1];
    } else {
        memberNo = slug[1];
        targetMonth = slug[2];
    }
    switch (pageType) {
        case "list":
            return <InvoiceList pageNumber={pageNumber} />;
            break;
        case "view":
            return (
                <InvoiceView memberNo={memberNo} targetMonth={targetMonth} />
            );
            break;
        case "visual":
            return (
                <InvoiceVisual memberNo={memberNo} targetMonth={targetMonth} />
            );
            break;
        default:
            return <InvoiceList pageNumber={pageNumber} />;
            break;
    }
};

export default invoicePage;
