import NextAuth from 'next-auth';
import GoogleProvider from 'next-auth/providers/google';

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
      console.log(
        'jwt',
        JSON.stringify({
          token,
          user,
          account,
        })
      );
      return token;
    },
    async session({ session, token, user }) {
      console.log('session', session);
      return session;
    },
  },
});
