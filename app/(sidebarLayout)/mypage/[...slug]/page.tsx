import MyPageView from "./view";
import MyPageEdit from "./edit";

const myPage = async ({ params }: any) => {
    const { slug } = params;
    const pageType = slug[0];

    switch (pageType) {
        case "view":
            return (
                <MyPageView />
            );
            break;
        case "Edit":
            return (
                <MyPageEdit />
            );
            break;
        default:
            return <MyPageView />;
            break;
    }
};

export default myPage;
