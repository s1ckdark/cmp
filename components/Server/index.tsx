import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import UserInfo from "@/app/(sidebarLayout)/_common/UserInfo";
import { fetchClient } from "@/services";
export const UserName = async () => {
    const session:any = await getServerSession(authOptions);
    console.log("UserName :",session.user.name);
    return (
        <UserInfo name={session.user.name} />
    );
}

export const sessionChecker = async () => {
    const session:any = await getServerSession(authOptions);
    return session ? true : false;
}

export const fetchingInvoice = async(memberNo: string, targetMonth: string) => {
    const url = `/invoice/${memberNo}/${targetMonth}`;
    try {
        const response = await fetchClient(`/apibe/invoice/${memberNo}/${targetMonth}`);
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        return data;
    } catch (error) {
        console.error("Error fetching data: ", error);
        return null;
    }
}