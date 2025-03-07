---

# Brevo SMTP Relay Service

This project is a Node.js relay service that accepts HTTP POST requests to send transactional emails using Brevo’s SMTP. It is designed to integrate with automated workflows (for example, a Google Apps Script that performs mail merge) so that personalized emails can be sent reliably using Brevo as the email delivery service.

---

## Table of Contents

- [Overview](#overview)
- [Features](#features)
- [Prerequisites](#prerequisites)
- [Installation](#installation)
- [Configuration](#configuration)
- [Running the Relay Service](#running-the-relay-service)
- [Testing the Service](#testing-the-service)
- [Integration with Google Apps Script](#integration-with-google-apps-script)
- [Troubleshooting](#troubleshooting)
- [License](#license)

---

## Overview

This relay service:
- Receives email payloads via an HTTP POST endpoint.
- Uses Nodemailer configured with Brevo SMTP to send emails.
- Can be used in conjunction with external automation (e.g., a Google Apps Script mail merge) to send personalized emails.
- Provides console logging for troubleshooting and confirmation.

---

## Features

- **SMTP Integration:** Uses Brevo’s SMTP server (`smtp-relay.brevo.com`) for sending emails.
- **External API Endpoint:** Exposes an endpoint (`/api/send-email`) to accept email details as JSON.
- **Environment-Based Configuration:** Uses a `.env` file to store SMTP credentials and configuration.
- **Modular & Scalable:** Easy to integrate with other systems (such as Google Apps Script) for automated email sending.

---

## Prerequisites

- **Node.js** (version 14 or later recommended)
- **npm** (Node package manager)
- A Brevo (formerly Sendinblue) account with SMTP enabled.  
- (Optional) [ngrok](https://ngrok.com) if you need to expose your local service to the Internet for testing with external services.

---

## Installation

1. **Clone the Repository (or create your project folder):**

   ```bash
   git clone https://github.com/yourusername/your-repo-name.git
   cd your-repo-name
   ```

2. **Initialize Your Project (if not already done):**

   ```bash
   npm init -y
   ```

3. **Install Dependencies:**

   ```bash
   npm install express body-parser nodemailer dotenv
   ```

4. **Create the `.env` File:**

   In the project root, create a file named `.env` with the following content (update the values accordingly):

   ```env
   EMAIL_USER=86893d001@smtp-brevo.com
   EMAIL_PASS=EfC1VIw8znMRSjFr
   SENDER_EMAIL=your-verified-sender@yourdomain.com
   PORT=3000
   ```

   **Note:**  
   - `EMAIL_USER` and `EMAIL_PASS` are the SMTP login credentials provided by Brevo.  
   - `SENDER_EMAIL` should be an email address that has been verified in your Brevo account (do not use the default Brevo SMTP login if it isn’t verified).  
   - `PORT` is the port your HTTP server will run on (typically 3000).

---

## Configuration

- **Brevo SMTP Settings:**
  - **SMTP Server:** `smtp-relay.brevo.com`
  - **Port:**  
    - Use **587** for STARTTLS (`secure: false`)  
    - Alternatively, use **465** with SSL (`secure: true`) if required.
  - **Authentication:**  
    The credentials are stored in the `.env` file. Ensure these values are correct and that the sender email (`SENDER_EMAIL`) is verified in your Brevo account.
  
- **Domain Authentication:**  
  For improved deliverability, authenticate your sending domain by setting up the required SPF, DKIM, and DMARC DNS records as described in Brevo’s documentation.

---

## Running the Relay Service

1. **Start the Service:**

   From your project directory, run:
   ```bash
   node server.js
   ```

   You should see a message:
   ```
   Server running at http://localhost:3000
   ```

2. **(Optional) Expose to the Internet with ngrok:**

   If you need external services (e.g., Google Apps Script) to access your relay service, run:
   ```bash
   ngrok http 3000
   ```
   Copy the provided public URL (e.g., `https://your-ngrok-url.ngrok-free.app`) and update your integration accordingly.

---

## Testing the Service

You can test the relay service using curl or Postman.

### Using curl:
```bash
curl -X POST https://your-ngrok-url.ngrok-free.app/api/send-email \
  -H "Content-Type: application/json" \
  -d '{
        "from": "Mrunal P <86893d001@smtp-brevo.com>",
        "to": "recipient@example.com",
        "subject": "Test Email",
        "message": "This is a test email sent via Brevo SMTP."
      }'
```

### Using Postman:
- Set up a POST request to:  
  ```
  https://your-ngrok-url.ngrok-free.app/api/send-email
  ```
- In the request body (raw, JSON), provide:
  ```json
  {
    "from": "Mrunal P <86893d001@smtp-brevo.com>",
    "to": "recipient@example.com",
    "subject": "Test Email",
    "message": "This is a test email sent via Brevo SMTP."
  }
  ```
- Send the request and verify the response.

---

## Integration with Google Apps Script

In your Google Apps Script, you will call this relay service’s endpoint to send emails. For example, update your Apps Script payload’s URL to your public ngrok URL (or your cloud-deployed URL):

```js
var relayUrl = 'https://your-ngrok-url.ngrok-free.app/api/send-email';
```

Then send a POST request using `UrlFetchApp.fetch()` with a JSON payload containing the email details.

---

## Troubleshooting

- **DNS and URL Issues:**  
  Ensure you are using the full, correct public URL from ngrok. Check the ngrok web interface at [http://127.0.0.1:4040](http://127.0.0.1:4040) for details.

- **Authentication Errors:**  
  If you see errors such as "Invalid login" or "sender not valid," confirm that the SMTP credentials in the `.env` file are correct and that the sender email is verified in Brevo.

- **Email Delivery:**  
  Check the recipient’s spam folder and your Brevo dashboard for logs. Ensure that domain authentication (SPF, DKIM, DMARC) is set up for better deliverability.

- **Logs:**  
  Use console logs in your Node.js code and execution logs in your Google Apps Script to diagnose issues.

---

## License

Include your preferred license information here (e.g., MIT License).

---

This README should help anyone understand the full setup and configuration required to run your Brevo SMTP Relay Service along with integration details for automated email sending. Let me know if you need further modifications or additional sections!



To set up brevo SMTP: https://youtu.be/vjb6T1VpolE?si=B6Z3qNz5KneK4Fii


To authenticate the user and add a domain for seamless operations: https://youtu.be/BEoF5Ny8rgs?si=1DCqphwc5XUu2oh7
