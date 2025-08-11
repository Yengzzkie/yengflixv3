import prisma from "@/db/prismaClient";
import { NextResponse } from "next/server";
import { sendResetPasswordMail } from "@/app/utils/sendMail";
import { generateVerificationToken } from "@/app/utils/generateVerificationToken";
import bcrypt from "bcryptjs";
import { verifyResetToken } from "@/app/utils/verifyResetToken";

// route for handling forgot password requests
// it checks if the user exists, generates a verification token, and sends a reset password email
export async function POST(request) {
  const { email } = await request.json();
  const user = await prisma.user.findUnique({
    where: { email },
  });

  if (!user) {
    return NextResponse.json({ error: "User with that email not found" }, { status: 404 });
  }

  // Generate verification token
  const token = await generateVerificationToken(user);

  // Send reset password email
  await sendResetPasswordMail(user, token);

  return NextResponse.json({
    message: "Reset password email sent successfully",
    user: {
      id: user.id,
      email: user.email,
    },
  });
};

// route for handling password reset requests
// it verifies the token, hashes the new password, and updates the user's password in the database
export async function PATCH(request) {
  const { token, newPassword } = await request.json();

  // Verify reset token and get user id
  const userId = verifyResetToken(token);
  if (!userId) {
    return NextResponse.json({ error: "Invalid or expired token" }, { status: 401 });
  }

  // Hash new password
  const hashedPassword = await bcrypt.hash(newPassword, 10);

  // Update user's password
  await prisma.user.update({
    where: { id: userId },
    data: { password: hashedPassword },
  });

  return NextResponse.json({ message: "Password updated successfully" });
}
