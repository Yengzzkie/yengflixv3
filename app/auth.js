import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";
import { compare } from "bcryptjs";
import prisma from "@/db/prismaClient";

export const { handlers, signIn, signOut, auth } = NextAuth({
  callbacks: {
    jwt({ token, user }) {
      if (user) {
        token.id = user.id;
        token.location = user.location
        // add user id and location to the token because it is not included in the token
        // by default
      }
      return token;
    },
    session({ session, token }) {
      session.user.id = token.id;
      session.user.location = token.location
      return session;
      // and assign the ID and location to the session to be used in the frontend
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

        return { name: user.name, email: user.email, id: user.id, location: user.location };
      },
    }),
  ],
});

// export { handler as GET, handler as POST };
