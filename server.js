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
app.post('/contact', (req, res) => {
  const { name, email, phone, subject, message, preferredTime } = req.body;

  // Log to console (in production, replace with nodemailer or a DB)
  console.log('--- New Booking/Contact Request ---');
  console.log(`Name: ${name}`);
  console.log(`Email: ${email}`);
  console.log(`Phone: ${phone}`);
  console.log(`Subject: ${subject}`);
  console.log(`Preferred Time: ${preferredTime}`);
  console.log(`Message: ${message}`);
  console.log('-----------------------------------');

  // Respond with success
  res.json({ success: true, message: 'Message received! Abid will get back to you shortly.' });
});

app.listen(PORT, () => {
  console.log(`\n✅ Abid Newaz website running at http://localhost:${PORT}\n`);
});
