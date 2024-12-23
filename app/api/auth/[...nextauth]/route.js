import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { compare } from "bcryptjs";
import prisma from "@/db/prismaClient";

const handler = NextAuth({
  session: {
    strategy: "jwt",
  },
  providers: [
    CredentialsProvider({
      credentials: {
        email: {},
        password: {},
      },

      async authorize(credentials, req) {
        const user = await prisma.user.findUnique({
          where: {
            email: credentials.email,
          },
        });

        if (!user) {
          console.log("User does not exist");
          return null;
        }

        const isMatch = await compare(
          credentials?.password || "",
          user.password
        );

        if (!isMatch) {
          console.log("Incorrect password");
          return null;
        }
        
        return { id: user.id, name: user.name, email: user.email };
      },
    }),
  ],
});

export { handler as GET, handler as POST };
