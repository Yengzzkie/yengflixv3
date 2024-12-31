import prisma from "@/db/prismaClient";
import { NextResponse } from "next/server";

// Add movie to user's list
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

// Get all user's favorite list
export async function GET(request) {
  const { searchParams } = new URL(request.url)
  const email = searchParams.get("email")

  try {
    const response = await prisma.user.findUnique({
      where: { email },
      select: { list: true }
    });

    return NextResponse.json(response)
  } catch (error) {
    
  }
}

// Delete a movie from user's favorite list
export async function DELETE(request) {
  const { searchParams } = new URL(request.url)
  const email = searchParams.get("email")
  const id = searchParams.get("id")

  try {
    const user = await prisma.user.findUnique({
      where: { email },
      select: { list: true }
    });

    const updatedList = user.list.filter((movie) => movie.id !== parseInt(id));
    console.log(updatedList)

    await prisma.user.update({
      where: { email },
      data: { list: updatedList }
    })

    return NextResponse.json({ message: "Movie removed successfully", updatedList }, { status: 200 })
  } catch (error) {
    console.error({ error });
    return NextResponse.json(
      { error: "An error occurred while removing the movie" },
      { status: 500 }
    );
  }
}