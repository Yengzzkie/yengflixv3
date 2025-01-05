import prisma from "@/db/prismaClient";
import { NextResponse } from "next/server";

export async function GET() {
    try {
        const user = await prisma.user.findUnique({
            where: { email: "gatchalian.manuel@ymail.com" },
            // select: { list: false }
        });

        if (!user) {
            return NextResponse.json({ message: "User not found" }, { status: 404 });
        }

        console.log(user);

        return NextResponse.json(user, { status: 200 });
    } catch (error) {
        console.error("Error fetching user:", error);
        return NextResponse.json({ message: "Internal server error" }, { status: 500 });
    }
}
