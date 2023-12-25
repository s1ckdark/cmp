import axios, { AxiosResponse, AxiosError, AxiosRequestHeaders } from 'axios';
import { setCookie, getCookie } from '@/utils/cookie';
import { useRecoilState } from 'recoil';
import { onLoginSuccess } from './auth';
import { FetchProps } from '@/types/data';
import { useSession } from 'next-auth/react';
import { getServerSession } from 'next-auth';
import { useQuery } from '@tanstack/react-query';
import { request } from 'http';
import { getSession, getCsrfToken } from 'next-auth/react'
import type { Session } from 'next-auth';
import { pushNoti } from '@/components/Toast';
import { useRouter } from 'next/navigation';

export const fetchClient = async (url: string, options?: FetchProps,): Promise<Response|undefined> => {
  try {
    const { data: session, status } = useSession();
    if ((session as any)?.accessToken) {
    let accessToken = (session as any).accessToken;

    const headers = {
      'Authorization': `Bearer ${accessToken}`,
      ...options?.headers // Spread any additional headers provided in options
    };
    const response = await fetch(`${process.env.NEXT_PUBLIC_BE_URL}/apibe/${url}`, {
      method: options?.method || 'GET', // Default to GET if no method specified
      headers: headers,
      mode: 'cors',
      body: options?.body ? JSON.stringify(options.body) : null, // Stringify the body if provided
      ...options
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
  }
    return response;
}
  } catch (error) {
    console.log("fetchClient Error :", error);
  }
};

export const fetcher = async (url:string) => {
  const { data: session, status } = useSession();
  if ((session as any)?.accessToken) {
    let accessToken = (session as any).accessToken;
  const response = await axios.get(url, {
    headers: {
      'Authorization': `Bearer ${accessToken}`,
    },
  });
  console.log(response);
  return response.data;
} 
};

/**
 * 브라우저 → 백엔드 서버, 혹은 프론트엔드 서버 → 백엔드 서버
 * 프론트엔드 서버에서 사용할 때는 쿠키가 포함될 수 있다.
 */

export const apiBe = axios.create({
    baseURL: `${process.env.NEXT_PUBLIC_BE_URL}`,
    timeout: 30000,
    withCredentials: true,
});

/**
 * 프론트엔드 서버 → 백엔드 서버로 사용할 수 있다.
 * 프론트엔드 서버에서만 사용할 것이며, metadata나 static 관련된 작업용으로만 쓴다.
 */

export const apiBePure = axios.create({
    baseURL: `${process.env.NEXT_PUBLIC_BE_URL}`,
    timeout: 30000,
    withCredentials: true,
});

/**
 * 브라우저 → 프론트엔드 서버, 혹은 프론트엔드 서버 → 프론트엔드 서버로 사용할 수 있다.
 * revalidate나 digicam 등 /api 가 붙은 프론트엔드 서버의 API를 브라우저에서 호출하는 용도다.
 */
export const apiFe = axios.create({
    baseURL: `${process.env.NEXT_PUBLIC_FE_URL}`,
    timeout: 30000,
    withCredentials: true,
});

apiBe.interceptors.request.use(
  async (config) => {
    const session = await getSession();
    if (session?.accessToken) {
      config.headers.Authorization = `Bearer ${session.accessToken}`;
    }
    config.headers['Cache-Control'] = 'no-store';
    config.headers['Pragma'] = 'no-store';
    config.headers['Expires'] = '0';
    console.log("apiBe config :",config);
    return config;
  }
)


apiBe.interceptors.response.use(
    (response) => response.data, // 2xx 범위일 때
    (error) => {
      if (error.response && error.response.status) {
        switch (error.response.status) {
          case 401:
            if (error.response.config?.url === '/auth/session') {
              return Promise.reject(error);
            }
            if (error.response.data.message === 'BAD REQUEST') {
              window.dispatchEvent(
                new CustomEvent('axiosError', {
                  detail: {
                    message: 'Bad Request',
                  },
                }),
              );
            } else {
              window.dispatchEvent(
                new CustomEvent('axiosError', {
                  detail: {
                    message: 'Unauthorized',
                  },
                }),
              );
            }
            return Promise.reject(error);
          case 403:
            window.dispatchEvent(
              new CustomEvent('axiosError', {
                detail: {
                  message: 'Forbidden',
                },
              }),
            );
            return new Promise(() => {});
          default:
            return Promise.reject(error);
        }
      }
  
      return Promise.reject(error);
    },
  );
  
export const isAxiosError = (err: unknown | AxiosError): err is AxiosError => {
    return axios.isAxiosError(err);
};

/** DPreview는 axios만 막는다. */
export const fakeUserAgent =
    'Mozilla/5.0 (iPhone14,3; U; CPU iPhone OS 15_0 like Mac OS X) AppleWebKit/602.1.50 (KHTML, like Gecko) Version/10.0 Mobile/19A346 Safari/602.1';

export const revalidatePathApi = (path: string) => apiFe(`/revalidate/path?path=${path}`);

export const revalidateTagApi = (tag: string) => apiFe(`/revalidate/tag?tag=${tag}`);

export const batchUpdateApi = () => apiBe<Comment[]>('/test');

