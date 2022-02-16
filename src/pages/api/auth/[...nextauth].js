import NextAuth from 'next-auth';
import GoogleProvider from 'next-auth/providers/google';
import CredentialsProvider from 'next-auth/providers/credentials';
import EmailProvider from 'next-auth/providers/email';
import { PrismaAdapter } from '@next-auth/prisma-adapter';
import { compareSync } from 'bcrypt';
import prisma from '@lib/prisma';

export default NextAuth({
  providers: [
    CredentialsProvider({
      async authorize(credentials) {
        const result = await prisma.user.findUnique({
          where: {
            email: credentials.email,
          },
        });

        // User not found

        if (!result) {
          await prisma.$disconnect();
          throw new Error('No user found with this email !');
        }

        //Check hashed password with database password
        const checkPassword = await compareSync(
          credentials.password,
          result.password
        );

        // Password Not Matched
        if (!checkPassword) {
          await prisma.$disconnect();
          throw new Error('Password is wrong !');
        }
        // Login Success
        await prisma.$disconnect();

        return result;
      },
    }),

    EmailProvider({
      server: {
        host: process.env.EMAIL_SERVER_HOST,
        port: process.env.EMAIL_SERVER_PORT,
        auth: {
          user: process.env.EMAIL_SERVER_USER,
          pass: process.env.EMAIL_SERVER_PASSWORD,
        },
      },
      from: process.env.EMAIL_FROM,
    }),

    GoogleProvider({
      clientId: process.env.GOOGLE_ID,
      clientSecret: process.env.GOOGLE_SECRET,
    }),
  ],

  adapter: PrismaAdapter(prisma),
  secret: process.env.SECRET,
  session: {
    strategy: 'jwt',
    // strategy: 'database',
    maxAge: 30 * 24 * 60 * 60, // 30 days
    // updateAge: 24 * 60 * 60, // 24 hours
  },

  jwt: {
    secret: process.env.SECRET,
    // Set to true to use encryption (default: false)
    // encryption: true,
    // encode: async ({ secret, token, maxAge }) => {},
    // decode: async ({ secret, token, maxAge }) => {},
  },

  pages: {
    signIn: '/auth/signin', // Displays signin buttonsc
    error: '/auth/signin',
    // signOut: '/auth/signout', // Displays form with sign out button
    verifyRequest: '/auth/signin-verify', // Used for check email page
    // newUser: null // If set, new users will be directed here on first sign in
  },

  callbacks: {
    // async signIn({ user, account, profile, email, credentials }) {
    //   return true;
    // },
    // async redirect({ url, baseUrl }) {
    //   return baseUrl;
    // },
    async session({ session, user, token }) {
      session.accessToken = token.accessToken;
      return session;
    },
    async jwt({ token, user, account, profile, isNewUser }) {
      if (account) {
        token.accessToken = account.access_token;
      }
      return token;
    },
  },

  events: {},
  debug: process.env.NODE_ENV === 'development',
});
