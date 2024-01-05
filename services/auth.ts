import axios from 'axios';
import { useRecoilState, useResetRecoilState } from 'recoil';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { apiBe, apiFe } from '@/services';
import { UserWithPrivileges } from '@/types/auth.d';
import { setCookie, getCookie, isTokenExpired } from '@/utils/cookie';
import { useRouter } from 'next/router';
import { get } from 'lodash';
import { isToken } from 'typescript';



export const postIdTokenApi = (idToken: string) => {
  console.log("idToken",idToken)
  apiBe.post('/auth/session', { idToken });
}

export const getUserInfoLocal = () => {
  apiBe.get(`/users/profile`);
}

export const getUserInfo = (cookie: string) =>
  apiBe({
    url: `/users/profile`,
    method: 'get',
    headers: {
      Cookie: cookie,
    },
  });
  // export const getUserInfo = async () => {
  //   const response = await apiBe.get('/users/profile');
  //   return response;
  // }

export const logoutApi = () => apiBe.post('/auth/logout');

export const onLoginSuccess = (response:any) => {
  console.log("onLoginSuccess",response);
  const { accessToken, refreshToken } = response;
  console.log(accessToken, refreshToken);
  localStorage.setItem('accessToken', accessToken);
  localStorage.setItem('refreshToken', refreshToken);
  setCookie('accessToken', accessToken, 1);
  setCookie('refreshToken', refreshToken, 1);
  axios.defaults.headers.common['Authorization'] = `Bearer ${accessToken}` 
  // const JWT_EXPIRY_TIME = isTokenExpired(accessToken);
  // setTimeout(() => 
  // onSilentRefresh(refreshToken)
  // , JWT_EXPIRY_TIME - 60000) // wrap in function
  console.info('login success')
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

    const { data } = await response.json();
    
    // const cookie = await apiFe.post('/auth/session/',{ accessToken: data.accessToken, refreshToken: data.refreshToken })
    // if (cookie.status === 200) {
    //   onLoginSuccess(data);
    // } else {
    //   throw new Error('login failed');
    // }
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
  