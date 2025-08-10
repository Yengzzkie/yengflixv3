import prisma from "@/db/prismaClient";
import { NextResponse } from "next/server";
import { sendVerificationMail } from "@/app/utils/sendMail";
import { generateVerificationToken } from "@/app/utils/generateVerificationToken";

export async function POST(request) {
    const { email } = await request.json();
    const user = await prisma.user.findUnique({
        where: { email }
    });

    if (!user) {
        return NextResponse.error(new Error("User not found"), 404);
    }

    // Generate verification token
    const token = await generateVerificationToken(user);

    // Send verification email
    await sendVerificationMail(user, token);

    return NextResponse.json({
        message: "Verification email sent successfully",
        user: {
            id: user.id,
            email: user.email,
        },
    });

}