'use client';
import RegistrationForm from "@/components/Form/RegistrationForm";
import Breadcrumb from "@/components/Breadcrumb";

const UserWrite = () => {
    return (
        <>
            <Breadcrumb />
            <RegistrationForm type={'register'} />
        </>
    )
}
export default UserWrite;