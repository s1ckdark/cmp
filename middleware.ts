import { NextRequest, NextResponse } from 'next/server';

interface Cookie {
  name: string;
  value: string;
}

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  if (pathname === '/landing') {
    const sessionCookie = request.cookies.get('session');
    console.log(sessionCookie);
    // return NextResponse.redirect(
    //   new URL(`/example/middleware/redirected?cookie=${sessionCookie?.value ?? '로그인 안됨'}`, request.url),
    // );
  }
  return null;
}

// export const config = {
//   matcher: ['/api/:path*', '/example/:path*'],
// };

export default middleware;
