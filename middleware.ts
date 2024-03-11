import { NextRequest, NextResponse, NextFetchEvent } from 'next/server';
import { cookies } from 'next/headers';
import { all } from 'axios';
import { getServerSession } from 'next-auth';
import { getToken } from 'next-auth/jwt';
import { withAuth } from 'next-auth/middleware';

interface Cookie {
  name: string;
  value: string;
}

export const middleware = async (req: NextRequest, res: NextResponse, event: NextFetchEvent) => {
  const { pathname } = req.nextUrl;
  const token = (await getToken({ req })) as any;
  if (!token) return NextResponse.redirect(new URL('/signin', req.url));
  const { isAdmin } = token.user;
  // Check the role and redirect based on the role
  // switch (isAdmin) {
  //   case 'admin':
  //     if (!req.nextUrl.pathname.startsWith('/profile')) {
  //       return NextResponse.redirect(new URL('/profile', req.url));
  //     }
  //     break;
  //   default:
  //     return NextResponse.redirect(new URL('/signin', req.url));
  // }
  if (isAdmin) {
    return NextResponse.next();
  } else {
    return NextResponse.redirect(new URL('/landing', req.url));
  }
};

export const config = {
  //   matcher: ['/'],
  // matcher: ['/apibe/:path*', '/apife/:path*'],
  matcher: ['/admin/:path*'],
};

export default withAuth;
