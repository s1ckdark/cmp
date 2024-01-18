"use client";
import UserView from "./view";
import UserList from "./list";
import UserWrite from "./write";
import UserEdit from "./edit";

const userPage = async ({ params }: any) => {

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
            return <UserList />;
            break;
        case "view":
            return (
                <UserView />
            );
            break;
        case "edit":
            return (
                <UserEdit />
            );
            break;
        case "register":
            return (
                <UserWrite  />
            );
            break;
        default:
            return <UserList />;
            break;
    }
};

export default userPage;
