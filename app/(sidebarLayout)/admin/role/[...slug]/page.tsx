"use client";
import RoleView from "./view";
import RoleList from "./list";
import RoleWrite from "./edit";
import RoleEdit from "./edit";

const rolePage = async ({ params }: any) => {
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
            return <RoleList />;
            break;
        case "view":
            return (
                <RoleView />
            );
            break;
        case "write":
            return (
                <RoleWrite  />
            );
            break;
        default:
            return <RoleList />;
            break;
    }
};

export default rolePage;
