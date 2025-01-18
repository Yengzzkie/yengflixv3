import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";
import prisma from "@/db/prismaClient";
import { compare } from "bcryptjs";

export const { handlers, signIn, signOut, auth } = NextAuth({
  callbacks: {
    jwt({ token, user, trigger, session }) {
      if (user) {
        // Add user details to the token when it's first created
        token = {
          id: user.id,
          name: user.name,
          email: user.email,
          location: user.location,
          isVerified: user.isVerified,
          role: user.role,
        };
      }

      if (trigger === "update") {
        // Update token when the session is updated
        return {...token, ...session.user};
      }

      return token;
    },
    session({ session, token }) {
      // Assign updated user data from the token to the session
      session.user.name = token.name;
      session.user.id = token.id;
      session.user.location = token.location;
      session.user.isVerified = token.isVerified;
      session.user.role = token.role;

      return session;
    },
  },
  providers: [
    Credentials({
      credentials: {
        email: {},
        password: {},
      },

      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) {
          console.log("Email or password is missing");
          return null;
        }

        const user = await prisma.user.findUnique({
          where: {
            email: credentials.email,
          },
        });

        if (!user) {
          console.log("User does not exist");
          return null;
        }

        const isMatch = await compare(credentials.password, user.password);

        if (!isMatch) {
          console.log("Incorrect password");
          return null;
        }

        return {
          name: user.name,
          email: user.email,
          id: user.id,
          location: user.location,
          isVerified: user.isVerified,
          role: user.role,
        };
      },
    }),
  ],
});
