import nodemailer from "nodemailer";

const transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  auth: {
    user: process.env.GMAIL_USERNAME,
    pass: process.env.GMAIL_PASS,
  },
});

// Function to send verification email
// This function is used in the registration flow to send a verification link to the user
export async function sendVerificationMail(userData, token) {
  const { name, email } = userData;
  const verificationUrl = `http://yengflix.com/verify-email?token=${token}`;

  try {
    const mailOptions = {
      from: process.env.GMAIL_USERNAME,
      to: email,
      subject: `Verify your email`,
      text: `${verificationUrl}`,
      html: `
        <div style="color: #fbfbfb; background-color: #262626; font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; border-radius: 10px;">
          <h2 style="text-align: center; color: #e0142f; text-shadow: -3px 3px 2px rgba(0, 0, 0, 0.7);">Welcome to Yengflix!</h2>
          <p style="color: #fbfbfb;">Hello <strong>${name}</strong>,</p>
          <p style="color: #fbfbfb;">Thank you for registering with us! Please verify your email by clicking the button below:</p>
          <div style="text-align: center; margin: 20px;">
            <a href="${verificationUrl}" style="background-color: #e0142f; color: #fbfbfb; padding: 10px 20px; text-decoration: none; border-radius: 5px; font-weight: bold;">Verify Email</a>
          </div>
          <p style="color: #fbfbfb; font-style: italic;">If you did not create an account with us, you can safely ignore this email.</p>
          <p style="color: #fbfbfb;">Best regards,<br>Yengflix</p>
          <hr style="border: none; border-top: 1px solid #fbfbfb; margin: 20px 0;">
          <p style="font-size: 12px; color: #fbfbfb; text-align: center;">&copy; ${new Date().getFullYear()} Yengflix. All rights reserved.</p>
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

// Function to send reset password email
// This function is used in the forgot password flow to send a reset link to the user
export async function sendResetPasswordMail(userData, token) {
  const { name, email } = userData;
  const resetUrl = `http://yengflix.com/reset-password?token=${token}`;

  try {
    const mailOptions = {
      from: process.env.GMAIL_USERNAME,
      to: email,
      subject: `Reset your password`,
      text: `${resetUrl}`,
      html: `
        <div style="color: #fbfbfb; background-color: #262626; font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; border-radius: 10px;">
          <h2 style="text-align: center; color: #e0142f; text-shadow: -3px 3px 2px rgba(0, 0, 0, 0.7);">Reset your password</h2>
          <p style="color: #fbfbfb;">Hello <strong>${name}</strong>,</p>
          <p style="color: #fbfbfb;">We received a request to reset your password. You can reset your password by clicking the button below:</p>
          <div style="text-align: center; margin: 20px;">
            <a href="${resetUrl}" style="background-color: #e0142f; color: #fbfbfb; padding: 10px 20px; text-decoration: none; border-radius: 5px; font-weight: bold;">Reset Password</a>
          </div>
          <p style="color: #fbfbfb; font-style: italic;">If you did not request a password reset, you can safely ignore this email.</p>
          <p style="color: #fbfbfb;">Best regards,<br>Yengflix</p>
          <hr style="border: none; border-top: 1px solid #fbfbfb; margin: 20px 0;">
          <p style="font-size: 12px; color: #fbfbfb; text-align: center;">&copy; ${new Date().getFullYear()} Yengflix. All rights reserved.</p>
        </div>
      `,
    };

    const result = await transporter.sendMail(mailOptions);

    if (!result) {
      console.log("Failed sending reset password email");
    }

    console.log("Reset password email sent");
  } catch (error) {
    console.error("Error sending reset password email:", error);
  }
};

// Function to send bug report email to developer
// This function is used to send bug reports from users to the developer
export async function sendBugReportMail(reportData) {
  const { email, subject, message } = reportData;

  try {
    const mailOptions = {
      from: process.env.GMAIL_USERNAME,
      to: process.env.GMAIL_USERNAME,
      subject: `Bug Report: ${subject}`,
      text: message,
      html: `
        <div style="color: #fbfbfb; background-color: #262626; font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; border-radius: 10px;">
          <h2 style="text-align: center; color: #e0142f; text-shadow: -3px 3px 2px rgba(0, 0, 0, 0.7);">New Bug Report</h2>
          <p style="color: #fbfbfb;">Hello Yengzzkie,</p>
          <p style="color: #fbfbfb;">You have received a new bug report from <strong>${email}</strong>:</p>
          <p style="color: #fbfbfb;">${message}</p>
          <p style="color: #fbfbfb;">Best regards,<br>Yengflix</p>
          <hr style="border: none; border-top: 1px solid #fbfbfb; margin: 20px 0;">
          <p style="font-size: 12px; color: #fbfbfb; text-align: center;">&copy; ${new Date().getFullYear()} Yengflix. All rights reserved.</p>
        </div>
      `,
    };

    const result = await transporter.sendMail(mailOptions);

    if (!result) {
      console.log("Failed sending bug report email");
    }

    console.log("Bug report email sent");
  } catch (error) {
    console.error("Error sending bug report email:", error);
  }
}