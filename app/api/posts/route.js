import prisma from "@/db/prismaClient";
import { NextResponse } from "next/server";

// Get all posts
export async function GET() {
  try {
    const posts = await prisma.post.findMany({
      include: {
        comments: {
          // in comment object, include the 'replier's' id, name and email
          include: { user: { select: { id: true, email: true, name: true }}},
        },
        // in post object, include the 'poster's' id, name and email
        posted_by: { select: { id: true, email: true, name: true }},
      },
    });
    
    return NextResponse.json(posts);
  } catch (error) {
    console.error({ error });
    return NextResponse.json(
      { message: "Failed to fetch posts" },
      { status: 500 }
    );
  }
}

// Create post
export async function POST(request) {
  try {
    const { userId, title, content } = await request.json();

    const newPost = await prisma.post.create({
      data: { userId, title, content }
    });

    return NextResponse.json(
      {
        message: "Post created successfully",
        post: newPost,
      },
      { status: 201 }
    );
  } catch (error) {
    console.error({ error });
    return NextResponse.json(
      { message: "Failed to create post", error: error.message },
      { status: 500 }
    );
  }
}
