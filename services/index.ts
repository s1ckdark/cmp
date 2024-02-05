import axios, { AxiosResponse, AxiosError, AxiosRequestHeaders, AxiosRequestConfig } from "axios";
import { FetchProps } from "@/types/data";
import { getSession } from "next-auth/react";
import { parseCookies, setCookie } from 'nookies';
import axiosRetry from 'axios-retry';
import { useRouter } from "next/navigation";

// Define the structure of a retry queue item
interface RetryQueueItem {
  resolve: (value?: any) => void;
  reject: (error?: any) => void;
  config: AxiosRequestConfig;
}


const cookie = parseCookies();
const { accessToken, refreshToken } = cookie;
// Create a list to hold the request queue
const refreshAndRetryQueue: RetryQueueItem[] = [];
// Flag to prevent multiple token refresh requests
let isRefreshing = false;

export const fetchClient = async (
    url: string,
    options?: FetchProps,
): Promise<Response | undefined> => {
    try {
        // const { data: session } = useSession();
        if (accessToken) {
            // const { accessToken } = session as any;

            const headers = {
                Authorization: `Bearer ${accessToken}`,
                ...options?.headers, // Spread any additional headers provided in options
            };
            const response = await fetch(
                `${process.env.NEXT_PUBLIC_BE_URL}/${url}`,
                {
                    method: options?.method || "GET", // Default to GET if no method specified
                    headers: headers,
                    mode: "cors",
                    body: options?.body ? JSON.stringify(options.body) : null, // Stringify the body if provided
                    ...options,
                },
            );
            const result = await response.json();
            console.log(response, result);
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            return result;
        }
    } catch (error) {
        console.log("fetchClient Error :", error);
    }
};

export const fetcher = async (url: string) => {
    // const { data: session } = useSession();
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
    withCredentials: true
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


apiBe.interceptors.request.use((config: any) => {
    const cookie = parseCookies();
    const { accessToken, refreshToken } = cookie;
    if (accessToken) {
        config.headers.Authorization = `Bearer ${accessToken}`;
        config.headers["Cache-Control"] = "public";
        // config.headers['Pragma'] = 'no-store';
        // config.headers['Expires'] = '0';
        console.log("apiBe config :", config);
        return config;
    }
});

const regenerateTokens = async () => {
    try {
        
        const {refreshToken} = cookie;
        const response = await axios.post(`${process.env.NEXT_PUBLIC_BE_URL}/auth/access-token`, 
            {refreshToken: refreshToken}
        );
        if (response.data.status === 200) {
            const { accessToken, refreshToken } = response.data.data;
            setCookie(null, 'accessToken', accessToken, { maxAge: 11 * 60 });
            setCookie(null, 'refreshToken', refreshToken, { maxAge: 30 * 60 * 60 * 24 }); // 30 days
            // console.log("new accessToken", accessToken);
            return accessToken;
        }
    } catch (error) {
        console.log("error :", error);
    }
}


apiBe.interceptors.response.use(
    async (response) => {
        const originalRequest: AxiosRequestConfig = response.config;
        if (response.status === 200 || response.status === 201) {
            console.log("response", response.data.status, response);
          
            if (response.data.status === 200 || response.data.status === 201) {
                 console.log("response",response.data.status, response);
                return response.data // 2xx 범위일 때
            }
            else if (response.data.status === 401) {
                window.dispatchEvent(
                    new CustomEvent("axiosError", {
                        detail: {
                            message: "Unauthorized",
                        },
                    }),
                );
            // if (!isRefreshing) {
            //         isRefreshing = true;
            //         try {
            //         // Refresh the access token
            //         const newAccessToken = await regenerateTokens();
                    
            //         // Update the request headers with the new access token
            //         response.config.headers['Authorization'] = `Bearer ${newAccessToken}`;
                    
            //         // Retry all requests in the queue with the new token
            //         refreshAndRetryQueue.forEach(({ config, resolve, reject }) => {
            //             axios
            //             .request(config)
            //             .then((response) => resolve(response))
            //             .catch((err) => reject(err));
            //         });

            //         // Clear the queue
            //         refreshAndRetryQueue.length = 0;

            //         // Retry the original request
            //         return axios(originalRequest);
            //         } catch (refreshError) {
            //         // Handle token refresh error
            //         // You can clear all storage and redirect the user to the login page
            //         throw refreshError;
            //         } finally {
            //         isRefreshing = false;
            //         }
            //     }

            //     // Add the original request to the queue
            //     return new Promise<void>((resolve, reject) => {
            //         refreshAndRetryQueue.push({ config: originalRequest, resolve, reject });
            //     });
                return await regenerateTokens().then((token) => {
                    response.config.headers.Authorization = `Bearer ${token}`;
                    return axios.request(response.config);
                    // return axiosRetry(axios, {
                    //     retries: 3,
                    //     retryCondition: (response) => {
                    //         return response.status === 200;
                    //     }}
                    // )});
                })
            } 
            return Promise.reject(response);  
        }
    },
    (error) => {
        // console.log("error :", error.response);
        if (error.response) {
            switch (error.response.status) {
                case 401:
                    if (error.response.data.message === "BAD REQUEST") {
                        window.dispatchEvent(
                            new CustomEvent("axiosError", {
                                detail: {
                                    message: "Bad Request",
                                },
                            }),
                        );
                    } else if (error.response.data.message === "Full authentication is required to access this resource"){
                        window.dispatchEvent(
                            new CustomEvent("axiosError", {
                                detail: {
                                    message: "Unauthorized",
                                },
                            }),
                        );
                        console.log("Unauthorized");
                    
                    }
                    else {
                        window.dispatchEvent(
                            new CustomEvent("axiosError", {
                                detail: {
                                    message: "Unauthorized",
                                },
                            }),
                        );
                        console.log()
                    }
                    return Promise.reject(error);
                case 403:
                    window.dispatchEvent(
                        new CustomEvent("axiosError", {
                            detail: {
                                message: "Forbidden",
                            },
                        }),
                    );
                    return new Promise(() => { });
                case 409:
                    window.dispatchEvent(
                        new CustomEvent("axiosError", {
                            detail: {
                                message: "Duplicate Data",
                            },
                        }),
                    );
                    // return Promise.reject(error);
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
    "Mozilla/5.0 (iPhone14,3; U; CPU iPhone OS 15_0 like Mac OS X) AppleWebKit/602.1.50 (KHTML, like Gecko) Version/10.0 Mobile/19A346 Safari/602.1";

export const revalidatePathApi = (path: string) =>
    apiFe(`/revalidate/path?path=${path}`);

export const revalidateTagApi = (tag: string) =>
    apiFe(`/revalidate/tag?tag=${tag}`);

export const batchUpdateApi = () => apiBe<Comment[]>("/test");
