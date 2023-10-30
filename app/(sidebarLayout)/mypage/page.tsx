'use client';
import RegistrationForm from '@/components/form/RegistrationForm';
import { useRecoilValue } from 'recoil';
import { authState } from '@/states/auth';

const Mypage = () => {
    const user = useRecoilValue(authState);
    console.log(user)
    return (
        <div className="container">
            <h1>회원 가입 페이지</h1>
            <RegistrationForm />
        </div>
    );
}

export default Mypage;