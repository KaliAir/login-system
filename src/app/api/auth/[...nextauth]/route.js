import NextAuth from "next-auth/next";
import CredentialsProvider from "next-auth/providers/credentials";
import bcryptjs from "bcryptjs";
import { PrismaAdapter } from "@auth/prisma-adapter";
import { PrismaClient } from "@prisma/client";
import Google from "next-auth/providers/google";
import Twitter from "next-auth/providers/twitter";
import Facebook from "next-auth/providers/facebook";

const prisma = new PrismaClient();

export const authOptions = { 
  adapter: PrismaAdapter(prisma),
  providers: [
    Google({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET
    }),
    Twitter({
      clientId: process.env.TWITTER_CLIENT_ID,
      clientSecret: process.env.TWITTER_CLIENT_SECRET
    }),
    Facebook({
      clientId: process.env.FACEBOOK_CLIENT_ID,
      clientSecret: process.env.FACEBOOK_CLIENT_SECRET
    }),
    CredentialsProvider({
      name: "credentials",
      credentials: {
        email: {
          label: "Email",
          type: "email",
        },
        password: {
          label: "Password",
          type: "password",
        }
      },
      async authorize(credentials) {
        
        if (!credentials.email || !credentials.password) {
          return null;
        }

        const userLog = await prisma.user.findUnique({
          where: {
            email: credentials.email,
          },
        });
        if (!userLog) {
          return null;
        }
        const passValidate = await bcryptjs.compare(
          credentials.password,
          userLog.hashedPassword
        );
        if (!passValidate) {
          return null;
        }
        const userData = {
          id: userLog.id,
          email: userLog.email,
		      verified: userLog.verified,
          isAdmin: userLog.isAdmin
        };
        return userData;
      },
    }),
  ],
  secret: process.env.NEXTAUTH_SECRET,
  pages: {
    signIn: "/login",
  },
  session: {
    strategy: "jwt",
  },
  jwt:{
    maxAge: 1 * 24 * 60 * 60,
  },
  callbacks: {
    async signIn({user, account, profile}){
      if(account?.provider !== "credentials" && profile.email_verified) return true;
      if(!user.verified){
        return false;
      }
      return true;
    },
    async jwt({ token, user }) {
      return { ...token, ...user };
    },
    async session({ session, token}) {
      session.user = token;
      return session;
    },
  },
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
