import { FailedLoginResponse, SuccessLoginResponse } from '@/interfaces';
import CredentialsProvider from "next-auth/providers/credentials";
import type { AuthOptions } from "next-auth";

export const authOptions: AuthOptions = {
  providers: [
    CredentialsProvider({
      name: 'credentials', 
      credentials: {
        email: {},
        password: {}
      },
      async authorize(credentials) {
        const response = await fetch('https://ecommerce.routemisr.com/api/v1/auth/signin', {
          method: 'POST',
          body: JSON.stringify({
            email: credentials?.email,
            password: credentials?.password
          }),
          headers: { 'Content-Type': 'application/json' }
        });

        const payload: SuccessLoginResponse | FailedLoginResponse = await response.json();

        if ('token' in payload) {
          return {
            id: payload.user.email,
            user: payload.user,
            accessToken: payload.token, // ✅ مهم
          };
        } else {
          throw new Error(payload.message);
        }
      }
    })
  ],

  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.user = (user as any).user;                // ✅
        token.accessToken = (user as any).accessToken;  // ✅
      }
      return token;
    },

    async session({ session, token }) {
      session.user = token.user as any;                      // ✅
      (session as any).accessToken = token.accessToken as string; // ✅
      return session;
    }
  },

  session: {
    strategy: "jwt" // ✅
  },

  trustHost: true, // ✅

  cookies: { // ✅
    sessionToken: {
      name: "__Secure-next-auth.session-token",
      options: {
        httpOnly: true,
        sameSite: "lax",
        path: "/",
        secure: true
      }
    }
  },

  pages: {
    signIn: '/login',
    error: '/login'
  },

  secret: process.env.NEXTAUTH_SECRET
};
