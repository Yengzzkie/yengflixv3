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
        comments: {
          include: { user: { select: { name: true, email: true, id: true } } },
        },
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

// Delete post
export async function DELETE(request) {
  try {
    const { searchParams } = new URL(request.url);
    const postId = searchParams.get("postId");

    const post = await prisma.post.delete({
      where: { id: postId }
    });

    if (!postId) {
      return NextResponse.json(
        { message: "Invalid postId" },
        { status: 400 }
      );
    }

    return NextResponse.json({ message: "Post deleted successfully", post });
  } catch (error) {
    console.error("Error deleting post:", error);
    return NextResponse.json(
      { message: "Failed to delete post", error: error.message },
      { status: 500 }
    );
  }
}