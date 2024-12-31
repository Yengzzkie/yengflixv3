import prisma from "@/db/prismaClient";
import { verify } from "jsonwebtoken";
import { NextResponse } from "next/server";

export async function POST(request) {
    const { searchParams } = new URL(request.url);
    const token = searchParams.get("token");

    if (!token) {
        return NextResponse.json(
            { message: "Token is required" },
            { status: 400 } // Bad Request
        );
    }

    try {
        const decoded = verify(token, process.env.JWT_SECRET);

        if (!decoded) {
            return NextResponse.json(
                { message: "Invalid token" },
                { status: 401 } // Unauthorized
            );
        }

        const { id } = decoded;
        const user = await prisma.user.update({
            where: { id },
            data: { isVerified: true}
        })

        if (!user) {
            return NextResponse.json({ message: "Can't find user" }, { status: 404 }) // Not found
        }

        return NextResponse.json(
            { message: "Verified successfully", token },
            { status: 200 } // OK
        );
    } catch (error) {
        console.error("JWT Verification Error:", error.message);
        return NextResponse.json(
            { message: "Token verification failed", error: error.message },
            { status: 401 } // Unauthorized
        );
    }
}
