import { cookies } from 'next/headers';
export const setCookie = (name: string, value: string, expDays: number) => {
    const date = new Date();
    date.setTime(date.getTime() + expDays * 24 * 60 * 60 * 1000);
    const expires = `expires=${date.toUTCString()}`;
    document.cookie = `${name}=${value}; ${expires}; path=/`;
};

export const getCookie = (name: string) => {
    if(typeof window !== 'object') return;
    const value = document.cookie.match(`(^|;) ?${name}=([^;]*)(;|$)`);
    return value ? decodeURI(value[2]) : null;
};

export const deleteCookie = (name: string) => {
    document.cookie = `${name}=; expires=Thu, 01 Jan 1999 00:00:10 GMT;`;
};

interface Cookie {
    name: string;
    value: string;
}

export const cookiesToString = (rawCookies: Cookie[]) => {
    return rawCookies.map((cookie) => `${cookie.name}=${cookie.value}`).join('; ');
};

export const isTokenExpired = (token: string) => {
    const expiry = (JSON.parse(atob(token.split('.')[1]))).exp;
    return expiry;
    // return (Math.floor((new Date()).getTime() / 1000)) >= expiry;
  }