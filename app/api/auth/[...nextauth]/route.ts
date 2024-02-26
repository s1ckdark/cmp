import NextAuth from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';
import type { NextAuthOptions, User, Session } from 'next-auth';
import { cookies } from 'next/headers';

const beUrl = process.env.NEXT_PUBLIC_BE_URL;

async function refreshAccessToken(token: any) {
  try {
    // Call your API to refresh the token
    const response = await fetch(`${beUrl}/auth/access-token`, {
      method: 'POST',
      body: JSON.stringify({ refreshToken: token.refreshToken }),
      headers: {
        'Content-Type': 'application/json',
      },
    });

    const refreshedTokens = await response.json();

    if (!response.ok) {
      throw refreshedTokens;
    }

    const cookieData = {
      ...token,
      accessToken: refreshedTokens.data.accessToken,
      accessTokenExpires: Math.floor(Date.now() / 1000) + 60 * 60 * 2, // updated access token expires in 2 hours
      refreshToken: refreshedTokens.data.refreshToken, // if the refresh token was also refreshed
    };

    cookies().set('auth', JSON.stringify(cookieData), {
      maxAge: 2 * 24 * 60 * 60, // 30 days
      path: '/',
      // httpOnly: true,
    });
    return cookieData;
  } catch (error) {
    console.error('Error refreshing access token: ', error);
    return {
      ...token,
      error: 'Error refreshing access token',
    };
  }
}

const authOptions: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      name: 'Credentials',
      credentials: {
        email: { label: 'Email', type: 'email' },
        password: { label: 'Password', type: 'password' },
      },
      authorize: async (credentials) => {
        try {
          const loginRes = await fetch(`${beUrl}/auth/login`, {
            method: 'POST',
            mode: 'cors',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify(credentials),
          });

          if (!loginRes.ok) {
            throw new Error('Login failed');
          }

          const user = await loginRes.json();

          // Assuming user.data contains the necessary user information
          if (!user.data) {
            return null;
          }

          const profileRes = await fetch(`${beUrl}/users/profile`, {
            method: 'GET',
            headers: {
              Authorization: `Bearer ${user.data.accessToken}`,
              'Content-Type': 'application/json',
            },
          });

          if (!profileRes.ok) {
            throw new Error('Failed to retrieve user profile');
          }

          const profile = await profileRes.json();
          const cookieData = {
            id: profile.data.id,
            username: profile.data.userFullName,
            email: profile.data.email,
            accessToken: user.data.accessToken,
            refreshToken: user.data.refreshToken,
          };
          cookies().set('auth', JSON.stringify(cookieData), {
            maxAge: 2 * 24 * 60 * 60, // 30 days
            path: '/',
            // httpOnly: true,
          });
          //   cookies().set('refreshToken', user.data.refreshToken, {
          //     maxAge: 2 * 24 * 60 * 60, // 30 days
          //     path: '/',
          //     // httpOnly: true,
          //   });
          // Construct and return the user object
          return cookieData;
        } catch (error) {
          console.error('Authorization error:', error);
          throw new Error('Authorization error');
        }
      },
    }),
  ],

  secret: process.env.NEXTAUTH_SECRET,
  callbacks: {
    async jwt({ token, user }: any) {
      const isSignIn = !!user;
      // If signing in, set initial token properties
      if (isSignIn) {
        token.accessToken = user.accessToken;
        token.refreshToken = user.refreshToken;
        token.user = user;
        token.accessTokenExpires = Math.floor(Date.now() / 1000) + 60 * 60 * 2; // 2 hours
      }
      const expiredTokenBeforeTenMin = token.accessTokenExpires - 10 * 60; // 만료 시간에서 10분을 뺀 값

      if (Math.floor(Date.now() / 1000) >= expiredTokenBeforeTenMin) {
        const refreshedToken = await refreshAccessToken(token);
        return refreshedToken;
      }
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
      else if (url.startsWith('/')) return new URL(url, baseUrl).toString();
      return baseUrl;
    },
    async session({ token }: any) {
      return token;
    },
  },
  session: {
    strategy: 'jwt',
  },
  debug: process.env.NODE_ENV === 'development',
  pages: {
    signIn: '/signin',
  },
};

const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };
