import prisma from "@/db/prismaClient";
import { NextResponse } from "next/server";

export async function GET(request) {
    try {
        const users = await prisma.user.findMany()

        console.log(users)
        return NextResponse.json(users)
    } catch (error) {
        console.error({ error })
    }
}