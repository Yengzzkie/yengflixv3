import prisma from "@/db/prismaClient";
import { hash } from "bcryptjs";
import { NextResponse } from "next/server";
import { sendVerificationMail } from "@/app/utils/sendMail";
import { generateVerificationToken } from "@/app/utils/generateVerificationToken";

export async function POST(request) {
  try {
    const { name, email, password } = await request.json();

    const userExist = await prisma.user.findUnique({
      where: { email },
    });

    if (userExist) {
      return NextResponse.json(
        { message: "User with that email already exists" },
        { status: 400 }
      );
    }

    const hashedPassword = await hash(password, 10);

    const user = await prisma.user.create({
      data: {
        name,
        email,
        password: hashedPassword,
      },
    });

    const token = await generateVerificationToken(user)
    
    sendVerificationMail(user, token)

    return NextResponse.json(
      {
        message: "User created successfully",
        user: {
          id: user.id,
          email: user.email,
        },
      },
      { status: 201 }
    );
  } catch (error) {
    console.error("Error creating user:", error);
    return NextResponse.json(
      { message: "Internal server error", error: error.message },
      { status: 500 }
    );
  }
}
