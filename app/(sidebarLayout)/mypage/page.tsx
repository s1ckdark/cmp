'use client';
import RegistrationForm from '@/components/Form/RegistrationForm';
import { useRecoilValue } from 'recoil';
import { sessionState } from '@/states/auth';
import { getUserInfo } from '@/services/auth';

// async function getUser() {
//     const user = await getUserInfo();
//     console.log(user);
//     return user;
// }

const Mypage = async () => {
    const user = useRecoilValue(sessionState);
    // const data = await getUser();
    // console.log(data);
    return (
        <div className="container">
            <h1>회원 가입 페이지</h1>
            <RegistrationForm />
        </div>
    );
}

export default Mypage;