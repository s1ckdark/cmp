import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';

import { getMeApi } from '@/services/auth';

interface Cookie {
    name: string;
    value: string;
}

const cookiesToString = (rawCookies: Cookie[]) => {
    return rawCookies.map((cookie) => `${cookie.name}=${cookie.value}`).join('; ');
};

export const GET = async () => {
    const cookieStore = cookies();
    const cookiesString = cookiesToString(cookieStore.getAll());

    let currentUser = null;
    try {
        currentUser = await getMeApi(cookiesString).then((res) => res.data);
    } catch (error) {
        // do nothing
    }
    return NextResponse.json(currentUser);
};

// export const signin = async (email: string, password: string) => {
//     const response = await fetch(`${process.env.NEXT_PUBLIC_BE_URL}/auth/login`, {
//       method: 'POST',
//       headers: {
//         'Content-Type': 'application/json',
//       },
//       body: JSON.stringify({ email, password }),
//     });
  
//     if (!response.ok) {
//       throw new Error('Login failed');
//     }
  
//     const data = await response.json();
//     // Assuming the response contains a token you want to store
//     localStorage.setItem('token', data.token);
  
//     return data;
//   }

//     export const signup = async (email: string, password: string) => {
//     const response = await fetch(`${process.env.NEXT_PUBLIC_BE_URL}/auth/signup`, {
//       method: 'POST',
//       headers: {
//         'Content-Type': 'application/json',
//       },
//       body: JSON.stringify({ email, password }),
//     });
  
//     if (!response.ok) {
//       throw new Error('Signup failed');
//     }
  
//     const data = await response.json();
//     // Assuming the response contains a token you want to store
//     localStorage.setItem('token', data.token);
  
//     return data;
//   }
  