const express = require('express');
const path = require('path');

require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3000;
const EMAIL_TO = process.env.EMAIL_TO || 'abidnewaz14@gmail.com';

app.use(express.static(path.join(__dirname, 'public')));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Serve the main index page
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'views', 'index.html'));
});

// Contact form endpoint
app.post('/contact', async (req, res) => {
  const { name, email, phone, subject, message, preferredTime } = req.body;

  if (!process.env.EMAIL_USER || !process.env.EMAIL_PASS) {
    return res.status(500).json({
      success: false,
      message: 'Email service is not configured on the server.'
    });
  }

  try {
    const nodemailer = require('nodemailer');

    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS // Use a Gmail App Password
      }
    });

    await transporter.sendMail({
      from: `"Abid Newaz Website" <${process.env.EMAIL_USER}>`,
      replyTo: email,
      to: EMAIL_TO,
      subject: `New Booking Request from ${name}`,
      text: `Name: ${name}\nEmail: ${email}\nPhone: ${phone}\nSubject: ${subject}\nPreferred Time: ${preferredTime}\nMessage: ${message}`
    });

    // Respond with success
    res.json({ success: true, message: 'Message received! Abid will get back to you shortly.' });
  } catch (error) {
    console.error("Email Sending Failed", error);
    res.status(500).json({ success: false, message: 'Failed to send the email.', error: error.message });
  }
});

app.listen(PORT, () => {
  console.log(`\n✅ Abid Newaz website running at http://localhost:${PORT}\n`);
});
