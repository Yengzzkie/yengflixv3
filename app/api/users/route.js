import prisma from "@/db/prismaClient";
import { NextResponse } from "next/server";

export async function GET(request) {
    try {
        const users = await prisma.user.findMany();

        return NextResponse.json(users)
    } catch (error) {
        console.error("Error fetching users:", error);

        return NextResponse.json({
            status: "error",
            message: "Failed to fetch users.",
        }, { status: 500 });
    }
}
