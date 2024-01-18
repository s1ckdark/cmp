"use client";
import LogList from "./list";

const logPage = async ({ params }: any) => {

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
            return <LogList />;
            break;
        default:
            return <LogList />;
            break;
    }
};

export default logPage;
