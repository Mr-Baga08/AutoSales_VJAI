require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const nodemailer = require('nodemailer');

const app = express();
// Use PORT from .env or default to 3000 for your HTTP server
const port = process.env.PORT || 3000;

app.use(bodyParser.json());

// Test route to confirm the server is running
app.get('/', (req, res) => {
  res.send('Server is running!');
});

// Email Sending Route using Brevo SMTP settings
app.post('/api/send-email', async (req, res) => {
  const { to, subject, message } = req.body;

  // Validate required fields
  if (!to || !subject || !message) {
    return res.status(400).send('Missing required fields.');
  }

  // Create a Nodemailer transporter configured for Brevo SMTP
  // Using port 587 (STARTTLS) and secure: false. Adjust if necessary.
  let transporter = nodemailer.createTransport({
    host: "smtp-relay.brevo.com",
    port: 587,
    secure: false, // false for STARTTLS on port 587; try secure: true with port 465 if needed.
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    }
  });

  try {
    // Use SENDER_EMAIL if defined; otherwise fall back to EMAIL_USER
    await transporter.sendMail({
      from: `"Mrunal P" <${process.env.SENDER_EMAIL || process.env.EMAIL_USER}>`,
      to: to,
      subject: subject,
      text: message
    });
    res.send('Email Sent Successfully!');
  } catch (error) {
    console.error('Error sending email:', error);
    res.status(500).send('Failed to send email. ' + error.message);
  }
});

// Start the HTTP server
app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
