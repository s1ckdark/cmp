"use client";
import ContractView from "./view";
import ContractList from "./list";
import ContractWrite from "./write";
import ContractEdit from "./edit";

const contractPage = async ({ params }: any) => {
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
            return <ContractList />;
            break;
        case "view":
            return (
                <ContractView />
            );
            break;
        case "write":
            return (
                <ContractWrite  />
            );
            break;
        default:
            return <ContractList />;
            break;
    }
};

export default contractPage;
