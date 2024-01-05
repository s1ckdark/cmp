"use client";
import MenuView from "./view";
import MenuList from "./list";
import MenuWrite from "./write";
import MenuEdit from "./edit";

const menuPage = async ({ params }: any) => {
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
            return <MenuList />;
            break;
        case "view":
            return (
                <MenuView />
            );
            break;
        case "write":
            return (
                <MenuWrite  />
            );
            break;
        default:
            return <MenuList />;
            break;
    }
};

export default menuPage;
