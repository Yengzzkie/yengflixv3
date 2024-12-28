import prisma from "@/db/prismaClient";
import { NextResponse } from "next/server";

export async function POST(request) {
  if (request.method === "POST") {
    const { email, newMovie } = await request.json();

    if (!email || !newMovie) {
      return NextResponse.json({ message: "Email and movie are required." });
    }

    try {
      const user = await prisma.user.findUnique({
        where: { email },
        select: { list: true },
      });

      const isDuplicate = user.list.some((movie) => movie.id === newMovie.id)
      // check if movie is already in the list
      if (isDuplicate) {
        return NextResponse.json({ message: "Movie is already in the list" })
      }

      const updatedUser = await prisma.user.update({
        where: { email },
        data: {
          list: {
            push: newMovie,
          },
        },
      });
      return NextResponse.json({
        message: "Added To List",
        list: updatedUser.list,
      });
    } catch (error) {
      console.error("Error adding movie to list:", { error });
      return NextResponse.json({ message: "Internal server error." });
    }
  } else {
    return NextResponse.json({ message: "Method not allowed." });
  }
}
