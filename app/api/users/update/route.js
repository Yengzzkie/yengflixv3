import { NextResponse } from "next/server";
import prisma from "@/db/prismaClient";
import { hash, compare } from "bcryptjs";

export async function POST(request) {
  const { searchParams } = new URL(request.url);
  const email = searchParams.get("email");

  // Parse form data
  const formData = await request.formData();
  const name = formData.get("name");
  const currentPassword = formData.get("currentPassword");
  const newPassword = formData.get("newPassword");

  // Fetch the user from the database
  const user = await prisma.user.findUnique({
    where: { email },
    include: { list: false }
  });

  // If the user doesn't exist, return an error
  if (!user) {
    return NextResponse.json({ message: "User not found" });
  }

  // Prepare data to update
  const dataToUpdate = {};

  if (name) {
    dataToUpdate.name = name;
  }

  if (newPassword) {
    // Compare the current password with the stored one
    const isMatch = await compare(currentPassword, user.password);

    if (!isMatch) {
        return NextResponse.json(
          { message: "Incorrect current password" },
          { status: 401 }
        );
      }

    // Hash the new password
    const hashedPassword = await hash(newPassword, 10);
    dataToUpdate.password = hashedPassword;
  }

  // Perform the update if there is data to update
  const updatedUser = await prisma.user.update({
    where: { email },
    data: dataToUpdate,
    include: { list: false }, // Optional: adjust based on your data requirements
  });

  console.log(updatedUser);

  // Return updated user data
  return NextResponse.json({ name: updatedUser.name, password: updatedUser.password });
}
