import NextAuth, { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import FacebookProvider from "next-auth/providers/facebook";
import { ResponseProps } from "../user/[email]";

const bcrypt = require("bcryptjs");

export const authOptions: NextAuthOptions = {
  secret: "123123",
  providers: [
    CredentialsProvider({
      credentials: {
        password: {},
        email: {},
      },
      async authorize(credentials) {
        const { password, email } = credentials;

        const { user }: ResponseProps = await fetch(
          `http://localhost:3000/api/user/${email}`
        ).then((res) => res.json());

        if (!user?.hash) {
          return null;
        }

        const isEqual = bcrypt.compareSync(password, user.hash);

        if (isEqual) {
          return { email: user.email, provider: "credentials" };
        }

        return null;
      },
    }),
    FacebookProvider({
      clientId: "1446185392524918",
      clientSecret: "656b0556c7f01a30298609467a478e1a",
    }),
  ],
  callbacks: {
    async jwt({ token, user }) {
      const data: { provider?: string } = {};

      if (typeof user?.provider === "string") {
        data.provider = user.provider;
      }

      return { ...token, ...data };
    },
    async session({ session, token }) {
      const data: { provider?: string } = {};

      if (typeof token?.provider === "string") {
        data.provider = token.provider;
      }

      return { ...session, ...data };
    },
  },
};

export default NextAuth(authOptions);
