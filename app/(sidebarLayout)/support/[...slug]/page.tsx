"use client";
import SupportView from "./view";
import SupportList from "./list";
import SupportWrite from "./write";
import SupportEdit from "./edit";

const supportPage = async ({ params }: any) => {
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
            return <SupportList />
            break;
        case "view":
            return <SupportView />
            break;
        case "write":
            return <SupportWrite />
            break;
        case "edit":
            return <SupportEdit />
            break;
        default:
            return <SupportList />
            break;
    }
};

export default supportPage;
