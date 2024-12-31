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
        console.log(JWT_SECRET)
        const decoded = verify(token, process.env.JWT_SECRET);

        if (!decoded) {
            return NextResponse.json(
                { message: "Invalid token" },
                { status: 401 } // Unauthorized
            );
        }

        const { email } = decoded;

        if (!email) {
            return NextResponse.json(
                { message: "Token does not contain a valid email" },
                { status: 400 } // Bad Request
            );
        }

        console.log(email);
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
