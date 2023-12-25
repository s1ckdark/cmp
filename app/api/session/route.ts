// import { NextRequest, NextResponse } from 'next/server';
// import { cookies } from 'next/headers';

// interface Cookie {
//   name: string;
//   value: string;
// }

// const cookiesToString = (rawCookies: Cookie[]) => {
//   return rawCookies.map((cookie) => `${cookie.name}=${cookie.value}`).join('; ');
// };

// export const GET = async () => {
//   const cookieStore = cookies();
//   const cookiesString = cookiesToString(cookieStore.getAll());

//   let currentUser = null;
//   try {
//     // currentUser = await getMeApi(cookiesString).then((res) => res.data);
//   } catch (error) {
//     // do nothing
//   }
//   return NextResponse.json(currentUser);
// };

// // export const GET = async (request: Request) => {
// // const cookieStore = cookies();
// // cookieStore.set('accessToken',"123123123");
// //   // const cookieStore = cookies();
// //   // console.log("test");
// //   // cookieStore.set('accessToken', accessToken, {maxAge: 60 * 60 * 24 * 30, path: '/'});
// //   // console.log('cookieStore', cookieStore.getAll());
// //   return NextResponse.next();
// // }

// export async function POST(request: Request) {
//   const body = await request.json();
//   console.log(body);
//   const { accessToken, refreshToken } = body;
//   // const bodystring = JSON.stringify({ accessToken });
//   cookies().set('accessToken', accessToken, {maxAge: 60 * 60 * 24 * 30, path: '/'});
//   cookies().set('refreshToken', refreshToken, {maxAge: 60 * 60 * 24 * 30, path: '/'});
//   return NextResponse.json({ res: body });
// }

import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { NextResponse } from "next/server";

export async function GET(request: Request) {
  const session = await getServerSession(authOptions);

  return NextResponse.json({
    authenticated: !!session,
    session,
  });
}