import axios from 'axios';
import { useRecoilState, useResetRecoilState } from 'recoil';
import { useMutation, useQueryClient } from '@tanstack/react-query';
// import { authState, resetLogInErrorAtom, resetSignUpErrorAtom, } from '@/states/auth';
import { apiBe, apiFe } from '@/services';
import { UserWithRole } from '@/types/auth.d';
import { loginForm } from '@/types/form';
import { tokenState } from '@/states/localStorage';

// Define your authentication service
// export const auth = () => {
//     const [token, setToken] = useRecoilState(tokenState);
//     const queryClient = useQueryClient();
//     const resetLogInError = useResetRecoilState(resetLogInErrorAtom);
//     const resetSignUpError = useResetRecoilState(resetSignUpErrorAtom);

//     const loginMutation = useMutation(
//         async ({ email, password }: loginForm) => {
//             // const public_be_url:string = process.env.NEXT_PUBLIC_BE_URL || '';
//             const be_url: string = '/backend/api/auth/login';
//             const response = await axios.post(be_url, { email, password });
//             return response.data.data;
//         },
//         {
//             onSuccess: (user) => {
//                 setToken(user);
//                 queryClient.invalidateQueries('userData');
//                 console.log(user);
//             },
//             onError: (error) => {
//                 console.error('Login failed:', error);
//             },
//         }
//     );

//     const logout = () => {
//         setToken({ user: null });
//         queryClient.invalidateQueries('userData');
//     };

//     return {
//         login: loginMutation.mutate,
//         logout,
//         resetLogInError,
//         resetSignUpError,
//     };
// };



export const postIdTokenApi = (idToken: string) => apiBe.post('/auth/session', { idToken });

export const getMeApiLocal = () => apiBe<UserWithRole>(`/users/profile`);

export const getMeApi = (cookie: string) =>
  apiBe<UserWithRole>({
    url: `/users/profile`,
    method: 'get',
    headers: {
      Cookie: cookie,
    },
  });

export const logoutApi = () => apiBe.delete('/auth/session');
export const getUserInfo = async () => {
  const response = await apiBe.get('/users/profile');
  return response;
}


export const signin = async (email: string, password: string) => {
    const response = await fetch(`/apibe/auth/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email, password }),
    });

    if (!response.ok) {
      throw new Error('Login failed');
    }

    const data = await response.json();
    // Assuming the response contains a token you want to store
    localStorage.setItem('token', data.data.accessToken);
    // setTokenStateValue(data.data.accessToken);
    return data;
  }

    export const signup = async (email: string, password: string) => {
    const response = await fetch(`${process.env.NEXT_PUBLIC_BE_URL}/auth/signup`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email, password }),
    });
  
    if (!response.ok) {
      throw new Error('Signup failed');
    }
  
    const data = await response.json();
    // Assuming the response contains a token you want to store
    localStorage.setItem('token', data.data.accessToken);
  
    return data;
  }
  