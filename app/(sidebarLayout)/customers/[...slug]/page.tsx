"use client";
import CustomerView from "./view";
import CustomerList from "./list";
import CustomerWrite from "./write";
import CustomerEdit from "./edit";

const customerPage = async ({ params }: any) => {
    const { slug } = params;
    const pageType = slug[0];
    let pageNumber = 1,
    id = "";
    if (pageType === "list") {
        // slug.length === 1 ? redirect('./list/1') :  pageNumber = slug[1];
        pageNumber = slug[1];
    } else {
        id = slug[1];
       
    }
    switch (pageType) {
        case "list":
            return <CustomerList />
            break;
        case "view":
            return <CustomerView />
            break;
        case "write":
            return <CustomerWrite />
            break;
        case "edit":
            return <CustomerEdit />
            break;
        default:
            return <CustomerList />
            break;
    }
};

export default customerPage;
