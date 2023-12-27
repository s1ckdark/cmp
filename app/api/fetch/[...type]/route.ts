import { NextRequest, NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import { fetcher } from '@/services';
interface Cookie {
  name: string;
  value: string;
}

const cookiesToString = (rawCookies: Cookie[]) => {
  return rawCookies.map((cookie) => `${cookie.name}=${cookie.value}`).join('; ');
};

const parseCookies = (cookieString: string) => {
  const cookies: Cookie[] = [];
  cookieString.split(';').forEach((cookie) => {
    const [name, value] = cookie.trim().split('=');
    cookies.push({ name, value });
  });
  return cookies;
}

export const GET = async (request: Request) => {
  const cookieStore = cookies();
  const cookiesString = cookiesToString(cookieStore.getAll());
  const cookiesParsed = parseCookies(cookiesString);
  console.log("cookiesParsed :",cookiesParsed);
  const accessToken = cookiesParsed.filter((cookie) => cookie.name === 'next-auth.session-token')[0].value;
  console.log(accessToken);
  cookies().set('accessToken', accessToken, {maxAge: 60 * 60 * 24 * 30, path: '/'});
  // cookies().set('refreshToken', cookiesParsed['next-auth.refreshToken'], {maxAge: 60 * 60 * 24 * 30, path: '/'});
  // let currentUser = {test:"test"}
  try {
    // currentUser = await fetcher(`${process.env.NEXT_PUBLIC_BE_URL}/users/profile`,)
  } catch (error) {
    // do nothing
  }
  return NextResponse.json(cookiesParsed);
};

export const POST = async(request: Request) => {
  const body = await request.json();
  console.log("api call success", body);
  const { accessToken, refreshToken } = body;
  cookies().set('accessToken', accessToken, {maxAge: 60 * 60 * 24 * 30, path: '/'});
  cookies().set('refreshToken', refreshToken, {maxAge: 60 * 60 * 24 * 30, path: '/'});
  return NextResponse.json({ accessToken, refreshToken });
}

