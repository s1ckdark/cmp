import Breadcrumb from "@/components/Breadcrumb";
import RegistrationForm from "@/components/Form/RegistrationForm";
import { userInfoAtom } from "@/states/data";
import { useRecoilValue } from "recoil";

const UserEdit = () => {
    const userInfo = useRecoilValue(userInfoAtom);
    return (
        <>
            <Breadcrumb />
            <RegistrationForm data={userInfo} type={"edit"} />
        </>
    );
}
export default UserEdit;