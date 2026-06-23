// lib/sendVerificationEmail

import nodemailer from "nodemailer";

export async function sendVerificationEmail(email, token) {
  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.SUPER_ADMIN_EMAIL,
      pass: process.env.SUPER_ADMIN_PASSWORD,
    },
  });

  const verifyUrl = `${process.env.NEXT_PUBLIC_SITE_URL}/api/verify?token=${token}`;

  await transporter.sendMail({
    from: process.env.SUPER_ADMIN_EMAIL,
    to: email,
    subject: "Verify your subscription",
    html: `
      <h2>Verify your email</h2>
      <p>Click below to verify:</p>
      <a href="${verifyUrl}">${verifyUrl}</a>
    `,
  });
}