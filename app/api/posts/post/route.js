import prisma from "@/db/prismaClient";
import { NextResponse } from "next/server";

// Get specific post
export async function GET(request) {
  const { searchParams } = new URL(request.url);
  const postId = searchParams.get("postId");

  try {
    const post = await prisma.post.findUnique({
      where: { id: postId },
      include: {
        comments: true,
        posted_by: { select: { email: true, name: true, id: true } },
      },
    });

    if (!post) {
      return NextResponse.json(
        {
          message: "Post not found",
        },
        { status: 404 }
      );
    }

    return NextResponse.json(post);
  } catch (error) {
    console.error({ error });
    NextResponse.json({ message: "Failed to fetch post" });
  }
}
