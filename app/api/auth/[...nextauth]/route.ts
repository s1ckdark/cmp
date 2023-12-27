import CredentialsProvider from 'next-auth/providers/credentials';
import NextAuth, { NextAuthOptions, Session as NextAuthSession, User as NextAuthUser } from "next-auth";
import { JWT as NextAuthJWT } from "next-auth/jwt"; 
import { setCookie } from 'nookies';
import { NextApiRequest, NextApiResponse } from 'next';

const beUrl = process.env.NEXT_PUBLIC_BE_URL;
const feUrl = process.env.NEXT_PUBLIC_FE_URL;
interface Token { accessToken: string; refreshToken: string;name:string; email:string;sub:string; id:string; iat:number; exp:number; jtu:string;accessTokenExpires:number; error?: any; user: { id?: string | null | undefined; name?: string | null | undefined; email?: string | null | undefined; image?: string | null | undefined; username: string;maxAge:number }};
interface User extends NextAuthUser { 
    accessToken: string; 
    refreshToken: string; 
    username: string; 
}

interface Session extends NextAuthSession { 
    accessToken?: string | undefined;
    refreshToken?: string | undefined;
      user: { 
         id?: string | null | undefined
         name?: string | null | undefined
         email?: string | null | undefined
         image?: string | null | undefined
    }
    accessTokenExpires?: number | undefined;
 }
    

interface JWT extends NextAuthJWT { 
    accessToken: string; 
    refreshToken: string; 
    user?: { 
        id?: string | null | undefined; 
        name?: string | null | undefined; 
        email?: string | null | undefined; 
        image?: string | null | undefined; 
        username?: string; 
    }; 
    }

interface loginData {
    id: string;
    username: string;
    email: string;
    accessToken: string;
    refreshToken: string;
    maxAge: number;
    userType?: string
    privileges: string[];
}

async function refreshAccessToken(token:any) {
    console.log(token,"refreshAccessToken");
    try {
        const url = `http://localhost:3000/apibe/auth/access-token`
        const response = await fetch(url, {
            headers: {
            'Content-Type': 'application/json',
            // 'Authorization': "Bearer " + token.accessToken, // accessToken이 없어도 되는 이유는 refresh token이 있기 때문에
            },
            method: "POST",
            body: JSON.stringify({refreshToken: token.refreshToken})
            }
        )

      if (response.status === 401 ) {
        // throw refreshedTokens
        // throw new Error("RefreshAccessTokenError 401");
        return {
            ...token,
            error: "RefreshAccessTokenError 401"
        }
      }
      if (response.status === 500 ) {
        // throw refreshedTokens
        // throw new Error("RefreshAccessTokenError 500")
        return {
            ...token,
            error: "RefreshAccessTokenError 500"
        }
      }
      
    if(response.status === 200) {
        const refreshedTokens = await response.json()
        console.log( Date.now() + token.user.maxAge, "success regenerage refreshedTokens");
        fetch(`${feUrl}/api/fetch/refresh?accessToken=${refreshedTokens.data.accessToken}`)
        //     method: 'GET',
        //     mode: 'cors',
        //     headers: {
        //         'Content-Type': 'application/json',
        //     },
        //     body: JSON.stringify(refreshedTokens.data),
        // });
        // console.log(refreshedTokens.data.accessToken, "refreshedTokens.data.accessToken")
        fetch(`${feUrl}/fetch/access-token`, {
            method: 'POST',
            mode: 'cors',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(refreshedTokens.data),
        });
        return {
            ...token,
            accessToken: refreshedTokens.data.accessToken,
            accessTokenExpires: Date.now() + token.user.maxAge,
            refreshToken: refreshedTokens.data.refreshToken
        }
    }
    } catch (error) {
      console.log("error :",error)
      return {
        ...token,
        error: "RefreshAccessTokenError",
      }
    }
  }




export const authOptions: NextAuthOptions = {
        providers: [
            CredentialsProvider({
                name: 'Crendentials',
                credentials: {
                    email: { label: "Email", type: "email", placeholder: "test@test.com" },
                    password: { label: "Password", type: "password" }
                },
                async authorize(credentials, req) {
                    try {
                        const res = await fetch(`${be}/auth/login`, {
                            method: 'POST',
                            mode: 'cors',
                            headers: {
                                'Content-Type': 'application/json',
                            },
                            body: JSON.stringify(credentials),
                        });
                        const user = await res.json();
                        if(user) {
                            const resProfile = await fetch(`${be}/users/profile`, {
                                method: 'GET',
                                mode: 'cors',
                                headers: {
                                    'Content-Type': 'application/json',
                                    'Authorization': `Bearer ${user.data.accessToken}`
                                },
                            })
                            const { data } = await resProfile.json();
                            return {
                                id: data.id,
                                username: data.userFullName,
                                email: data.email,
                                accessToken: user.data.accessToken,
                                refreshToken: user.data.refreshToken,
                                privileges: data.privileges,
                                userType: data.userType,
                                maxAge: 60 * 1 * 1000
                            }
                        } else {
                            return null;
                        }
                    } catch (error: any) {
                        console.log("error :",error);
                        throw new Error(error?.response?.data.message);
                    }
                }
            })
        ],
        secret: process.env.NEXTAUTH_SECRET,
        callbacks: {
            async jwt({ token, user }: { token:any; user:any;}) {
                if (user) {
                    // console.log("redfine token by user");
                    token.accessToken = user.accessToken;
                    token.refreshToken = user.refreshToken;
                    token.accessTokenExpires = Date.now() + user.maxAge;
                    token.user = user;
                    // console.log(Date.now(),token.accessTokenExpires, "first set accessTokenExpires in jwt");
                }
                if(Date.now() <= token.accessTokenExpires) {
                    console.log("keep going", token.accessTokenExpires);
                    return token;
                }
                console.log("call Refresh Token");
                // console.log(token.accessTokenExpires,"token in jwt");
                return refreshAccessToken(token);
            },
            async signIn({ user }) {
                try {
                    const isAllowedToSignIn = true;
                    return true; 
                } catch (error) {
                    if (error instanceof Error) {
                        return `signin?errorcode=${error.message}`;
                    }
                    return false; 
                }
            },
            async session({ session, token, user }: { session: Session; token: Token; user: User;}) {
                // Check if the user object exists in the session
                if (!session.user) {
                    session.user = {} as User;
                }
    
                // Add token details to the session
                session.accessToken = token.accessToken;
                session.refreshToken = token.refreshToken;
                session.accessTokenExpires = token.accessTokenExpires;
    
                // Update user details in the session
                session.user.id = token.user.id ?? session.user.id;
                session.user.name = token.user.username ?? session.user.name ?? 'Unknown';
                session.user.email = token.user.email ?? session.user.email ?? 'Unknown';
    
                return session;
            },
            // async redirect ({url, baseUrl}) {
            //             if (url.startsWith("/")) {
            //                 return `${baseUrl}${url}`
            //             }
            //             else if ( new URL(url).origin === baseUrl) {
            //                 return `${baseUrl}`
            //             }
            //             return baseUrl
            //         }
        },
        session: {
            strategy: "jwt",
        },
        debug: false,
        pages:{
            signIn: '/signin',
        },
    }


const handler = NextAuth(authOptions);
export { handler as GET, handler as POST }