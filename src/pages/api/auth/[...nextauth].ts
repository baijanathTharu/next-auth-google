import NextAuth from 'next-auth';
import GoogleProvider from 'next-auth/providers/google';
import { refreshAccessToken } from '../../../utils/auth';

const googleClientId = process.env.GOOGLE_CLIENT_ID as string;
const googleClientSecret = process.env.GOOGLE_CLIENT_SECRET as string;

export default NextAuth({
  providers: [
    GoogleProvider({
      clientId: googleClientId,
      clientSecret: googleClientSecret,
    }),
  ],
  callbacks: {
    async jwt({ token, user, account }) {
      // Initial sign in
      if (account && user) {
        return {
          accessToken: account.access_token,
          accessTokenExpires: Date.now() + account.expires_at! * 1000,
          refreshToken: account.refresh_token,
          user,
        };
      }

      // Return previous token if the access token has not expired yet
      // @ts-ignore
      if (Date.now() < token.accessTokenExpires) {
        console.log('token not expired', token);
        return token;
      }

      console.log('token expired', token);
      // Access token has expired, try to update it
      return refreshAccessToken({
        token: {
          refreshToken: account?.refresh_token,
        },
        clientCred: {
          clientId: googleClientId,
          clientSecret: googleClientSecret,
        },
      });
    },
    async session(data) {
      const { session, token, user } = data;
      session.token = token;
      session.user = user;
      return session;
    },
  },
});
