import axios from 'axios';
import { atom, useRecoilState, useResetRecoilState, useRecoilValue } from 'recoil';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { authState, resetLogInErrorAtom, resetSignUpErrorAtom, } from '@/states/auth';
import { apiBe } from '@/services';
import { loginForm } from '@/types/form';
// Define your authentication service
const authService = () => {
    const [auth, setAuth] = useRecoilState(authState);
    const queryClient = useQueryClient();
    const resetLogInError = useResetRecoilState(resetLogInErrorAtom);
    const resetSignUpError = useResetRecoilState(resetSignUpErrorAtom);

    const loginMutation = useMutation(
        async ({ email, password }: loginForm) => {
            // const public_be_url:string = process.env.NEXT_PUBLIC_BE_URL || '';
            const be_url:string = '/backend/api/auth/login';
            const response = await axios.post(be_url, { email, password });
            return response.data.data;
        },
        {
            onSuccess: (user) => {
                console.log(user)
                setAuth({ user });
                queryClient.invalidateQueries('userData');
                console.log("loginMutation.onSuccess");
            },
        }
    );

    const logout = () => {
        setAuth({ user: null });
        queryClient.invalidateQueries('userData');
    };

    return {
        login: loginMutation.mutate,
        logout,
        resetLogInError,
        resetSignUpError,
    };
};

export default authService;


