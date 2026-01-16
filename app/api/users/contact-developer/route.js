import { NextResponse } from "next/server";
import { sendBugReportMail } from "@/app/utils/sendMail";

export async function POST(request) {
    const { email, subject, message } = await request.json();
    try {
        await sendBugReportMail({ email, subject, message });
        return new NextResponse("Bug report sent", { status: 200 });
    } catch (error) {
        console.error("Error sending bug report email:", error);
        return new NextResponse("Failed to send bug report", { status: 500 });
    }
}