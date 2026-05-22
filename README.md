# Abid Newaz — Personal Website

A Node.js personal website for Abid Newaz, featuring a full CV page, about section, tutoring profile, achievements timeline, passion projects, and a contact/booking form.

## Tech Stack

- **Node.js** + **Express** — lightweight server
- **Vanilla HTML/CSS/JS** — no frontend framework needed
- Fonts: Cormorant Garamond + DM Sans (matching the CV)
- Colour scheme: `#1e2026` dark sidebar, `#b08d57` gold, `#f8f5f0` warm background

---

## 🚀 Local Setup

### 1. Install dependencies

```bash
npm install
```

### 2. Start the server

```bash
npm start
```

Visit: **http://localhost:3000**

---

## 📁 Project Structure

```
abid-website/
├── server.js           # Express server + contact form endpoint
├── package.json
├── views/
│   └── index.html      # Main website (all sections)
└── public/
    ├── css/
    │   └── style.css   # All styles
    ├── js/
    │   └── main.js     # Scroll animations, nav, form
    └── img/
        └── abid.jpg    # Profile photo
```

---

## 📧 Contact Form

Form submissions are currently logged to the console. To receive real email notifications, install nodemailer and add your email credentials:

```bash
npm install nodemailer
```

Then in `server.js`, replace the `console.log` block with:

```js
const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: 'your@gmail.com',
    pass: 'your-app-password'   // Use a Gmail App Password
  }
});

await transporter.sendMail({
  from: '"Website" <your@gmail.com>',
  to: 'abidnewaz14@gmail.com',
  subject: `New Booking Request from ${name}`,
  text: `Name: ${name}\nEmail: ${email}\nPhone: ${phone}\nSubject: ${subject}\nPreferred Time: ${preferredTime}\nMessage: ${message}`
});
```

---

## 🌐 Deploying to GitHub

### First time

```bash
git init
git add .
git commit -m "Initial commit: Abid Newaz website"
git branch -M main
git remote add origin https://github.com/YOUR_USERNAME/YOUR_REPO_NAME.git
git push -u origin main
```

### Future updates

```bash
git add .
git commit -m "Update: describe your change"
git push
```

---

## 🌍 Hosting Options (beyond local)

| Platform | Free Tier | Notes |
|---|---|---|
| **Railway** | Yes | Connect GitHub repo, auto-deploys |
| **Render** | Yes | Connect GitHub repo, spins down after inactivity |
| **Fly.io** | Yes | More control, needs CLI setup |
| **VPS (DigitalOcean/Hostinger)** | Paid | Full control, use PM2 to keep running |

For Railway (recommended for simplicity):
1. Push to GitHub
2. Go to [railway.app](https://railway.app)
3. "New Project" → "Deploy from GitHub repo"
4. Done — live URL provided automatically
