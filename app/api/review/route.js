import { NextResponse } from "next/server";
import prisma from "@/db/prismaClient";

// fetch reviews for a movie
export async function GET(request) {
    const { searchParams } = new URL(request.url);
    const movieId = searchParams.get("movieId");

    try {
      const reviews = await prisma.review.findMany({
        where: { movie_id: movieId },
        include: { user: { select: { name: true, email: true, id: true } } }
      });
  
      return NextResponse.json(reviews);
    } catch (error) {
      console.error("Failed to fetch reviews:", error);
      return NextResponse.json(
        { error: "Failed to fetch reviews" },
        { status: 500 }
      );
    }
  }

// create new review/post for a movie
export async function POST(request) {
  const { userId, content, movie_id, rating } = await request.json();

  try {
    const review = await prisma.review.create({
        data: { userId, content, movie_id, rating }
    })

    return NextResponse.json(review)
  } catch (error) {
    console.error("Failed to post review:", error);
  }
}
