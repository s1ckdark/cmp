"use client";
import NoticeView from "./view";
import NoticeList from "./list";
import NoticeWrite from "./write";
import NoticeEdit from "./edit";

const noticePage = async ({ params }: any) => {
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
            return <NoticeList />
            break;
        case "view":
            return <NoticeView />
            break;
        case "write":
            return <NoticeWrite />
            break;
        case "edit":
            return <NoticeEdit />
            break;
        default:
            return <NoticeList />
            break;
    }
};

export default noticePage;
