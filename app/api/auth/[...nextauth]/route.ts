import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import type { NextAuthOptions, User, Session } from "next-auth";
import { cookies } from "next/headers";

const beUrl = process.env.NEXT_BACKEND_URL+"/api";
// const feUrl = process.env.NEXT_PUBLIC_FE_URL;

// async function refreshAccessToken(token: any) {
//     try {
//         // Call your API to refresh the token
//         const response = await fetch(`${beUrl}/auth/access-token`, {
//             method: "POST",
//             body: JSON.stringify({ refreshToken: token.refreshToken }),
//             headers: {
//                 "Content-Type": "application/json",
//             },
//         });

//         const refreshedTokens = await response.json();

//         if (!response.ok) {
//             throw refreshedTokens;
//         }


//         cookies().set("accessToken", token.accessToken , {
//             maxAge: 60 * 10, // 10 minutes
//             path: "/",
//             // httpOnly: true,
//         });
//         cookies().set("refreshToken", token.refreshToken , {
//         maxAge: 30 * 24 * 60 * 60, // 30 days
//         path: "/",
//         // httpOnly: true,
//         });
//         console.log("set cookie complete");
//         return {
//             ...token,
//             accessToken: refreshedTokens.data.accessToken,
//             accessTokenExpires: Math.floor(Date.now() / 1000) + 60 * 10, // 10 minutes
//             refreshToken: refreshedTokens.data.refreshToken, // if the refresh token was also refreshed
//         };
//     } catch (error) {
//         console.error("Error refreshing access token: ", error);
//         return {
//             ...token,
//             error: "Error refreshing access token",
//         };
//     }
// }

const authOptions: NextAuthOptions = {
    providers: [
        CredentialsProvider({
            name: "Credentials",
            credentials: {
                email: { label: "Email", type: "email" },
                password: { label: "Password", type: "password" },
                ipAddr: { label: "ipAddress", type: "text" },
                client: { label: "clientInfo", type: "text" },
            },
            authorize: async (credentials) => {
                try {
                    const loginRes = await fetch(`${beUrl}/auth/login`, {
                        method: "POST",
                        mode: "cors",
                        headers: {
                            "Content-Type": "application/json",
                        },
                        body: JSON.stringify(credentials),
                    });

                    if (!loginRes.ok) {
                        throw new Error("Login failed");
                    }

                    const user = await loginRes.json();

                    // Assuming user.data contains the necessary user information
                    if (!user.data) {
                        return null;
                    }

                    const profileRes = await fetch(`${beUrl}/users/profile`, {
                        method: "GET",
                        headers: {
                            "Authorization": `Bearer ${user.data.accessToken}`,
                            "Content-Type": "application/json",
                        },
                    });

                    if (!profileRes.ok) {
                        throw new Error("Failed to retrieve user profile");
                    }

                    const profile = await profileRes.json();
                    const cookieData = {
                        id: profile.data.id,
                        username: profile.data.userFullName,
                        email: profile.data.email,
                        accessToken: user.data.accessToken,
                        refreshToken: user.data.refreshToken,
                    }
                    cookies().set("username",profile.data.userFullName , {
                        maxAge: 2 * 24 * 60 * 60,
                        path: "/",
                        // httpOnly: true,
                    });
                    cookies().set("accessToken", user.data.accessToken , {
                        maxAge: 2 * 24 * 60 * 60,
                        path: "/",
                        // httpOnly: true,
                    });
                     cookies().set("refreshToken", user.data.refreshToken , {
                        maxAge: 2 * 24 * 60 * 60,
                        path: "/",
                        // httpOnly: true,
                    });
                    // Construct and return the user object
                    return cookieData;
                } catch (error) {
                    console.error("Authorization error:", error);
                    throw new Error("Authorization error");
                }
            },
        }),
    ],

    secret: process.env.NEXTAUTH_SECRET,
    callbacks: {
        async jwt({ token, user }: any) {
            // const { user } = token;
            const isSignIn = user ? true : false;
            // If signing in, set initial token properties
            if (isSignIn) {
                token.accessToken = user.accessToken;
                token.refreshToken = user.refreshToken;
                token.user = user;
                token.accessTokenExpires =
                    Math.floor(Date.now() / 1000) + 60 * 10; // 10 minutes
            }
            // Check if the token needs to be refreshed
            // For example, if it's within 1 hour of expiring
            // const shouldRefreshTime = Math.floor(Date.now() / 1000) + 10 * 60; // Current time in seconds + 9 minutes
            // if (token.accessTokenExpires < shouldRefreshTime) {
            //     // Refresh token logic
            //     console.log("Refreshing token...");
            //     const refreshedToken = await refreshAccessToken(token);
            //     return refreshedToken;
            // }
            return token;
        },
        async signIn({ user }) {
            if (user) {
                return true;
            }
            return false;
        },
        async redirect({ url, baseUrl }) {
            if (url.startsWith(baseUrl)) return url;
            else if (url.startsWith("/"))
                return new URL(url, baseUrl).toString();
            return baseUrl;
        },
        async session({ token }: any) {
            return token;
        },
    },
    session: {
        strategy: "jwt",
    },
    debug: process.env.NODE_ENV === "development",
    pages: {
        signIn: "/signin",
    },
};

const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };
