import Breadcrumb from "@/components/Breadcrumb";
import { Tables } from "@/components/Tables";

const NoticeList = () => {
    return (
        <>
            <Breadcrumb />
            <Tables rowType={'notice'} />
        </>
    );
}
export default NoticeList;