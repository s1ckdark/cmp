import axios from 'axios';
import { useRecoilState, useResetRecoilState } from 'recoil';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { authState, resetLogInErrorAtom, resetSignUpErrorAtom, } from '@/states/auth';
import { apiBe, apiFe } from '@/services';
import { UserWithRole } from '@/types/auth.d';
import { loginForm } from '@/types/form';
import { tokenState } from '@/states/sessionStorage';
import { useRouter } from 'next/router';

// Define your authentication service
export const auth = () => {
    const [token, setToken] = useRecoilState(tokenState);
    const queryClient = useQueryClient();
    const resetLogInError = useResetRecoilState(resetLogInErrorAtom);
    const resetSignUpError = useResetRecoilState(resetSignUpErrorAtom);

    const loginMutation = useMutation(
        async ({ email, password }: loginForm) => {
            // const public_be_url:string = process.env.NEXT_PUBLIC_BE_URL || '';
            const be_url: string = '/backend/api/auth/login';
            const response = await axios.post(be_url, { email, password });
            return response.data.data;
        },
        {
            onSuccess: (user) => {
                setToken(user);
                queryClient.invalidateQueries('userData');
                console.log(user);
            },
            onError: (error) => {
                console.error('Login failed:', error);
            },
        }
    );

    const logout = () => {
        setToken({ user: null });
        queryClient.invalidateQueries('userData');
    };

    return {
        login: loginMutation.mutate,
        logout,
        resetLogInError,
        resetSignUpError,
    };
};



export const postIdTokenApi = (idToken: string) => apiBe.post('/auth/session', { idToken });

export const getMeApiLocal = () => apiFe<UserWithRole>('/auth/session');

export const getMeApi = (cookie: string) =>
  apiBe<UserWithRole>({
    url: '/auth/session',
    method: 'get',
    headers: {
      Cookie: cookie,
    },
  });

export const logoutApi = () => apiBe.delete('/auth/session');
