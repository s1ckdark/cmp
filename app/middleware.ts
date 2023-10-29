import { NextRequest, NextResponse } from 'next/server';

// export async function middleware(request: NextRequest) {
//     const { pathname } = request.nextUrl;
//     console.debug('middleware', pathname);
//     if (pathname === '/example/middleware') {
//         const sessionCookie = request.cookies.get('session');
//         return NextResponse.redirect(
//             new URL(`/example/middleware/redirected?cookie=${sessionCookie?.value ?? '로그인 안됨'}`, request.url),
//         );
//     }
//     return null;
// }

// export const config = {
//     matcher: ['/api/:path*', '/example/:path*'],
// };

//`/api/`로 시작하는 경로로 미들웨어를 제한합니다.
export const config = {
    matcher: '/api/:function*',
}

export function middleware(request: NextRequest) {
    // 인증 함수를 호출하여 요청 확인
    // if (!isAuthenticated(request)) {
    //     // 오류 메시지를 나타내는 JSON으로 응답
    //     return new NextResponse(
    //         JSON.stringify({ success: false, message: 'authentication failed' }),
    //         { status: 401, headers: { 'content-type': 'application/json' } }
    //     )
    // }

    //      // 요청 헤더를 복제하고 새 헤더 `x-hello-from-middleware1`을 설정합니다.
    //   const requestHeaders = new Headers(request.headers)
    //   requestHeaders.set('x-hello-from-middleware1', 'hello')

    //   // NextResponse.rewrite에서 요청 헤더를 설정할 수도 있습니다.
    //   const response = NextResponse.next({
    //     request: {
    //       // New request headers
    //       headers: requestHeaders,
    //     },
    //   })

    //   // 새 응답 헤더 `x-hello-from-middleware2` 설정
    //   response.headers.set('x-hello-from-middleware2', 'hello')
    //   return response

    // 들어오는 요청에 "Cookie:nextjs=fast" 헤더가 있다고 가정합니다.
    // RequestCookies API를 사용하여 요청에서 쿠키 가져오기
    let cookie = request.cookies.get('nextjs')
    console.log(cookie) // => { name: 'nextjs', value: 'fast', Path: '/' }
    const allCookies = request.cookies.getAll()
    console.log(allCookies) // => [{ name: 'nextjs', value: 'fast' }]

    request.cookies.has('nextjs') // => true
    request.cookies.delete('nextjs')
    request.cookies.has('nextjs') // => false

    // ResponseCookies API를 사용하여 응답에 쿠키 설정
    const response = NextResponse.next()
    response.cookies.set('vercel', 'fast')
    response.cookies.set({
        name: 'vercel',
        value: 'fast',
        path: '/',
    })
    cookie = response.cookies.get('vercel')
    console.log(cookie) // => { name: 'vercel', value: 'fast', Path: '/' }
    // 나가는 응답에는 `Set-Cookie:vercel=fast;path=/test` 헤더가 있습니다.

    return response
}


export default middleware;