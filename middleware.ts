import { NextRequest, NextResponse, NextFetchEvent } from 'next/server';
import { cookies } from 'next/headers';
import { all } from 'axios';
import { getServerSession } from 'next-auth';
import { getToken } from "next-auth/jwt";

interface Cookie {
  name: string;
  value: string;
}

export const middleware = async (req: NextRequest, res: NextResponse, event: NextFetchEvent) => {
  console.log("Middleware executing!");
  const { pathname } = req.nextUrl;
  console.log("pathname : ",pathname);
  
  // 미들웨어 쿠키
  // const allCookies = req.cookies.getAll()
  // console.log(allCookies)
  // let accessToken = req.cookies.get("accessToken")?.value || "";
  // console.log("accessToken in middleware :",cookies, accessToken);

  //setting Headers
  // const requestHeaders = new Headers(req.headers);
  // requestHeaders.set("Authroization", "bearer "+accessToken);


  // const {searchParams} = req.nextUrl;
  // const callbackUrl = searchParams.get("callbackUrl");
  
  // const session = await getServerSession(authOptions);
  // console.log("serverSession :",session);
  // if(!session) return NextResponse.redirect("/signin");
  // const accessToken = session?.accessToken;
  // accessToken === undefined ? 
  // console.log("pathname : ",pathname);
  // const allCookies = request.cookies.getAll()
  // if(pathname.includes('customer')) console.log(allCookies); 
  // const accessToken: string | undefined = request.cookies.get('next-auth.session-token')?.value;
  // if(accessToken) {
  //   try {
  //     const requestHeaders = new Headers(req.headers)
  //     requestHeaders.set("Authorization", `Bearer ${accessToken}`);
  //     const newRequest: any = new Request(req, {
  //       headers: requestHeaders,
  //     });
      
  //   return NextResponse.next({
  //       request: {
  //         headers: requestHeaders,
  //       }
  //   });
  //   } catch (error) {
  //     console.log("expired");
  //   }
  // }
    // Retrieve existing headers
    // const headers = new Headers(request.headers);

    // // Add or modify a specific cookie
    // // Note: Directly modifying cookies in headers might not work as expected due to the format of the `Cookie` header.
    // // You might need to use a different approach to set cookies.
    // headers.append('Set-Cookie', 'yourCookieName=yourCookieValue; Path=/; HttpOnly');

    // Create a new response with modified headers
    // return NextResponse.next({
    //     headers: headers
    // });

// For all other requests, do nothing special
console.log("Middleware executed!");
return NextResponse.next();
}

// export default withAuth({
//   callbacks: {
//     authorized({ req, token }) {
//       return !!token
//     },
//   },
// })


export const config = {
  // matcher: ['/']
  matcher: ["/apibe/:path*", "/apife/:path*"]
};
