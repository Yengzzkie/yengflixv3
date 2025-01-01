import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";
import prisma from "@/db/prismaClient";
import { compare } from "bcryptjs";

export const { handlers, signIn, signOut, auth } = NextAuth({
  callbacks: {
    jwt({ token, user }) {
      if (user) {
        token.id = user.id;
        token.location = user.location;
        token.isVerified = user.isVerified;
        // add user id, location and isVerified to the token because it is not included in the token by default
      }
      return token;
    },
    session({ session, token }) {
      session.user.id = token.id;
      session.user.location = token.location;
      session.user.isVerified = token.isVerified;
      return session;
      // and assign the ID, location and isVerified status to the session to be used in the frontend
    },
  },
  providers: [
    Credentials({
      credentials: {
        email: {},
        password: {},
      },

      async authorize(credentials) {
        const user = await prisma.user.findUnique({
          where: {
            email: credentials.email,
          },
        });

        if (!user) {
          console.log("User does not exist");
          return null;
        }

        const isMatch = await compare(credentials?.password, user.password);

        if (!isMatch) {
          console.log("Incorrect password");
          return null;
        }

        return { name: user.name, email: user.email, id: user.id, location: user.location, isVerified: user.isVerified };
      },
    }),
  ],
});
