import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { ResponseProps } from "../user/[email]";

const bcrypt = require("bcryptjs");

export const authOptions = {
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
          return { email: user.email };
        }

        return null;
      },
    }),
  ],
};

export default NextAuth(authOptions);
