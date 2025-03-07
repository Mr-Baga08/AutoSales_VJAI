require('dotenv').config();
const nodemailer = require('nodemailer');

async function testEmail() {
  let transporter = nodemailer.createTransport({
    host: "smtp-relay.brevo.com",
    port: 587,  // or try 465 if necessary
    secure: false,  // false for 587; set to true for 465
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS
    }
  });

  try {
    let info = await transporter.sendMail({
      from: process.env.EMAIL_USER,
      to: "stealtho.baga@gmail.com",
      subject: "SMTP Test Email",
      text: "This is a test email sent via Brevo SMTP using Nodemailer."
    });
    console.log("Email sent:", info.messageId);
  } catch (error) {
    console.error("Error sending email:", error);
  }
}

testEmail();
