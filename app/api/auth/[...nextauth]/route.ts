import CredentialsProvider from 'next-auth/providers/credentials';
// import crypto from 'crypto';
import axios, { AxiosError } from 'axios';
import { apiBePure } from "@/services"; 
import nookies, { setCookie } from 'nookies';
import { NextApiRequest, NextApiResponse } from 'next';
import NextAuth, { NextAuthOptions} from "next-auth";
import { pushNoti } from '@/components/Toast';
import { JWT as NextAuthJWT } from "next-auth/jwt"; 
import { Session as NextAuthSession, User as NextAuthUser } from "next-auth";
const backend = process.env.BACKEND_AUTH

interface Token { accessToken: string; refreshToken: string;name:string; email:string;sub:string; id:string; iat:number; exp:number; jtu:string; }
interface User extends NextAuthUser { accessToken: string; refreshToken: string; username: string; }
interface Session extends NextAuthSession { accessToken: string; refreshToken: string;  user: { id?: string | null | undefined; name?: string | null | undefined; email?: string | null | undefined; image?: string | null | undefined; username: string; }}
interface JWT extends NextAuthJWT { accessToken: string; refreshToken: string; user: { id?: string | null | undefined; name?: string | null | undefined; email?: string | null | undefined; image?: string | null | undefined; username: string; }; }

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
        console.log(refreshedTokens);
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
                        const res = await fetch("http://10.20.19.96:30006/api/auth/login", {
                            method: 'POST',
                            mode: 'cors',
                            headers: {
                                'Content-Type': 'application/json',
                            },
                            body: JSON.stringify(credentials),
                        });
                        const user = await res.json();
                        if(user) {
                            const resProfile = await fetch('http://10.20.19.96:30006/api/users/profile', {
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
                    console.log("redfine token by user");
                    token.accessToken = user.accessToken;
                    token.refreshToken = user.refreshToken;
                    token.accessTokenExpires = Date.now() + user.maxAge;
                    token.user = user;
                    console.log(Date.now(),token.accessTokenExpires, "first set accessTokenExpires in jwt");
                }
                if(Date.now() <= token.accessTokenExpires) {
                    console.log("in expire", token.accessTokenExpires);
                    return token;
                }
                console.log("call Refresh Token");
                console.log(token.accessTokenExpires,"token in jwt");
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
            async session({ session, token } : { session: Session; token: Token; }) {
                // console.log(token,"token in session")
                session.accessTokenExpires = token.accessTokenExpires;
                session.accessToken = token.accessToken;
                session.refreshToken = token.refreshToken;
                session.user.id = token.user.id;
                session.user.name = token.user.username ?? 'Unknown'; // Retrieve userName from the token
                session.user.email = token.user.email ?? 'Unknown'; // Retrieve email from the token
                console.log(session.accessTokenExpires, "accessTokenExpires in session");
                return session;
            }
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