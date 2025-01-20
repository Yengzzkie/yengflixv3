import prisma from "@/db/prismaClient";
import { NextResponse } from "next/server";

// Post a reply on comment
export async function POST(request) {
    try {
      const { userId, postId, content } = await request.json();
  
      const newPost = await prisma.comment.create({
        data: { userId, postId, content },
      });
  
      return NextResponse.json({
        message: "Reply created successfully",
        post: newPost,
      }, { status: 201 });
    } catch (error) {
      console.error({ "Reply failed to post": error });
      return NextResponse.json(
        { error: "Failed to create reply" },
        { status: 500 }
      );
    }
  }