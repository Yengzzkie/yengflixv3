import nodemailer from "nodemailer";

const transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  auth: {
    user: "gatchalian.manuel@gmail.com",
    pass: "bdvvfcylhbmqtryg",
  },
});

export async function sendVerificationMail(userData, token) {
  const { name, email } = userData;
  console.log(name, email)

  const verificationUrl = `http://localhost:3000/verify-email/${token}`;

  try {
    const mailOptions = {
      from: process.env.GMAIL_USERNAME,
      to: email,
      subject: `Verify your email`,
      text: `${verificationUrl}`,
      html: `
            <div style="color: #F7F7F7; background-color: #1693b6; font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; border-radius: 10px;">
              <h2 style="text-align: center; color: #fff; text-shadow: -5px 5px 3px #0e7490">Welcome to Pass-A-Buy!</h2>
              <p>Hello <strong>${name}</strong>,</p>
              <p>Thank you for registering with us! Please verify your email by clicking the button below:</p>
              <div style="text-align: center; margin: 20px;">
                <a href="${verificationUrl}" style="background-color: #4CAF50; color: white; padding: 10px 20px; text-decoration: none; border-radius: 5px;">Verify Email</a>
              </div>
              <p style="font-style: italic;">If you did not create an account with us, you can safely ignore this email.</p>
              <p>Best regards,<br>Yengflix</p>
              <hr style="border: none; border-top: 1px solid #eee; margin: 20px 0;">
              <p style="font-size: 12px; color: #2E2E2E; text-align: center;">&copy; ${new Date().getFullYear()} Pass-A-Buy. All rights reserved.</p>
            </div>
          `,
    };

    const result = await transporter.sendMail(mailOptions);

    if (!result) {
      console.log("Failed sending verification email");
    }

    console.log("Verification email sent");
  } catch (error) {
    console.error("Error sending support email:", error);
  }
}
