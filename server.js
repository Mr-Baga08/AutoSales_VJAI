require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const nodemailer = require('nodemailer');

const app = express();
const port = process.env.PORT || 3000;

app.use(bodyParser.json());

// Test route to confirm the server is running
app.get('/', (req, res) => {
  res.send('Server is running!');
});

// Email Sending Route using Brevo SMTP settings
app.post('/api/send-email', async (req, res) => {
  const { to, subject, message } = req.body;

  if (!to || !subject || !message) {
    return res.status(400).send('Missing required fields.');
  }

  // Create a Nodemailer transporter configured for Brevo SMTP
  let transporter = nodemailer.createTransport({
    host: "smtp-relay.brevo.com",
    port: 587,         // Use 587 for STARTTLS; alternatively try port 465 with secure: true
    secure: false,     // false for STARTTLS on port 587; change to true for port 465
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    }
  });

  try {
    await transporter.sendMail({
      from: `"Mrunal P" <${process.env.EMAIL_USER}>`,  // Use the verified sender from EMAIL_USER
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

// Start the server
app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
