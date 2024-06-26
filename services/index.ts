import axios, { AxiosResponse, AxiosError, AxiosRequestHeaders, AxiosRequestConfig } from 'axios';
import { FetchProps } from '@/types/data';
import { parseCookies, setCookie, destroyCookie } from 'nookies';
import { Toast } from '@/components/Toast';
import { getCookies } from '@/utils/cookie';

export const fetchClient = async (url: string, options?: FetchProps): Promise<Response | undefined> => {
  try {
    const auth = getCookies();
    const { accessToken, refreshToken } = auth;
    // const { data: session } = useSession();
    if (accessToken) {
      // const { accessToken } = session as any;

      const headers = {
        Authorization: `Bearer ${accessToken}`,
        ...options?.headers, // Spread any additional headers provided in options
      };
      const response = await fetch(`${process.env.NEXT_PUBLIC_BE_URL}/${url}`, {
        method: options?.method || 'GET', // Default to GET if no method specified
        headers: headers,
        mode: 'cors',
        body: options?.body ? JSON.stringify(options.body) : null, // Stringify the body if provided
        ...options,
      });
      const result = await response.json();
      console.log(response, result);
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      return result;
    }
  } catch (error) {
    console.log('fetchClient Error :', error);
  }
};

export const fetcher = async (url: string) => {
  const auth = getCookies();
  const { accessToken, refreshToken } = auth;
  if (accessToken) {
    const response = await axios.get(url, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });
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

const regenerateTokens = async () => {
  try {
    const auth = getCookies();
    const { accessToken, refreshToken } = auth;
    const response = await axios.post(`${process.env.NEXT_PUBLIC_BE_URL}/auth/access-token`, { refreshToken: refreshToken });
    if (response.data.status === 200) {
      const { accessToken, refreshToken } = response.data.data;
      destroyCookie(null, 'accessToken');
      destroyCookie(null, 'refreshToken');
      setCookie(null, 'accessToken', accessToken, {
        maxAge: 10 * 60,
        path: '/',
      });
      setCookie(null, 'refreshToken', refreshToken, {
        maxAge: 30 * 60 * 60 * 24,
        path: '/',
      }); // 30 days
      console.log('new accessToken', accessToken);
      return accessToken;
    }
  } catch (error) {
    console.log('error :', error);
  }
};

apiBe.interceptors.request.use(
  async (config: any) => {
    // const session: any = await getSession();
    // if (session) {

    const auth = getCookies();
    const { accessToken, refreshToken } = auth || {};
    // }
    if (accessToken) {
      config.headers.Authorization = `Bearer ${accessToken}`;
    }
    // else if (session?.accessToken) {
    //     config.headers.Authorization = `Bearer ${session.accessToken}`;
    // }

    // config.headers['Pragma'] = 'no-store';
    // config.headers['Expires'] = '0';
    config.headers['Cache-Control'] = 'public';
    // console.log("apiBe config :", config);
    return config;
  },
  (error) => {
    console.log('apiBe error :', error);
  },
);

apiBe.interceptors.response.use(
  async (response) => {
    console.log('apiBe response :', response);
    if (response.status === 200 || response.status === 201) {
      if (response.data.status === 200 || response.data.status === 201) {
        return response.data; // 2xx 범위일 때
      } else if (response.data.status === 401) {
        window.dispatchEvent(
          new CustomEvent('axiosError', {
            detail: {
              message: 'Unauthorized',
            },
          }),
        );
        destroyCookie(null, 'auth', { path: '/' });
        Toast('error', '권한이 없습니다', () => (location.href = '/signin'));

        // return await regenerateTokens().then((token) => {
        //     response.config.headers.Authorization = `Bearer ${token}`;
        //     return axios.request(response.config);
        // })
      } else if (response.data.size > 0 && response.data.type === 'application/octet-stream') {
        return response.data;
      }
    } else if (response.data.status === 403) {
      window.dispatchEvent(
        new CustomEvent('axiosError', {
          detail: {
            message: '권한이 없습니다',
          },
        }),
      );
      return new Promise(() => {});
    }
  },
  async (error) => {
    console.log('error :', error);
    if (error.response) {
      switch (error.response.status) {
        case 401:
          if (error.response.data.message === 'BAD REQUEST') {
            window.dispatchEvent(
              new CustomEvent('axiosError', {
                detail: {
                  message: 'Bad Request',
                },
              }),
            );
          } else if (error.response.data.message === 'Full authentication is required to access this resource') {
            window.dispatchEvent(
              new CustomEvent('axiosError', {
                detail: {
                  message: 'Unauthorized',
                },
              }),
            );
            console.log('Unauthorized');
          } else {
            window.dispatchEvent(
              new CustomEvent('axiosError', {
                detail: {
                  message: 'Unauthorized',
                },
              }),
            );
          }
          return error.response.data;
        case 403:
          window.dispatchEvent(
            new CustomEvent('axiosError', {
              detail: {
                message: 'Forbidden',
              },
            }),
          );
          return new Promise(() => {});
        case 404:
          window.dispatchEvent(
            new CustomEvent('axiosError', {
              detail: {
                message: 'Not Found',
              },
            }),
          );
          return error.response.data;
        case 409:
          window.dispatchEvent(
            new CustomEvent('axiosError', {
              detail: {
                message: 'Duplicate Data',
              },
            }),
          );
          return error.response.data;
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
