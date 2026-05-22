const express = require('express');
const path = require('path');
const app = express();
const PORT = process.env.PORT || 3000;

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

  // Log to console (in production, replace with nodemailer or a DB)
  const nodemailer = require('nodemailer');

  const transporter = nodemailer.createTransport({
  host: 'smtp.gmail.com',
  port: 465,
  secure: true, // true for 465 false for other ports
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS   // Use a Gmail App Password
  }
});

await transporter.sendMail({
  from: '"cvwebsitean" <your@gmail.com>',
  to: 'abidnewaz14@gmail.com',
  subject: `New Booking Request from ${name}`,
  text: `Name: ${name}\nEmail: ${email}\nPhone: ${phone}\nSubject: ${subject}\nPreferred Time: ${preferredTime}\nMessage: ${message}`
});

  // Respond with success
  res.json({ success: true, message: 'Message received! Abid will get back to you shortly.' });
});

app.listen(PORT, () => {
  console.log(`\n✅ Abid Newaz website running at http://localhost:${PORT}\n`);
});
