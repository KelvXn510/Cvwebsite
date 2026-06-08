# Abid Newaz - Personal Website

A Node.js personal website for Abid Newaz, featuring a full CV page, about section, tutoring profile, achievements timeline, passion projects, and a contact/booking form.

## Tech Stack

- **Node.js** + **Express**: lightweight server
- **Vanilla HTML/CSS/JS**: no frontend framework needed
- Fonts: Cormorant Garamond + DM Sans (matching the CV)
- Colour scheme: `#1e2026` dark sidebar, `#b08d57` gold, `#f8f5f0` warm background

---

## 🚀 Local Setup

### 1. Install dependencies

```bash
npm install
```

### 2. Configure email (required for the booking form)

#### Option A (recommended): EmailJS (client-side, free tier)

1. Create an EmailJS account and connect your Gmail (or other service).
2. Create an email template with variables: `name`, `email`, `phone`, `subject`, `preferredTime`, `message`.
3. Copy your **Public Key**, **Service ID**, and **Template ID**.
4. Update the config in `public/js/main.js`.

#### Option B (server-side): Nodemailer

Create a `.env` file in the project root (use `.env.example` as a template):

```
EMAIL_USER=your@gmail.com
EMAIL_PASS=your-app-password
EMAIL_TO=abidnewaz14@gmail.com
```

For Gmail, generate an App Password and use that for `EMAIL_PASS`.

### 3. Start the server

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

## 📧 Contact Form (EmailJS overview)

EmailJS sends the booking email directly from the browser using a public key, so no server credentials are stored in this repo. The free plan currently allows 200 requests per month.

**How it works**

- The EmailJS SDK is loaded in `views/index.html` before `public/js/main.js`.
- EmailJS is initialized in `public/js/main.js` with your Public Key.
- When the form is submitted, `emailjs.sendForm(...)` sends the form fields to your EmailJS template.

**Required EmailJS values**

- Public Key (Account page)
- Service ID (Email Services page)
- Template ID (Email Templates page)

**If you see** `Gmail_API: Request had insufficient authentication scopes`

- Reconnect the Gmail service in EmailJS and allow "Send email on your behalf".
- If it still fails, remove the service and add it again with full permission.

## ✅ Files & lines to edit

Update these when changing EmailJS values or wiring the form:

- `public/js/main.js` → EmailJS config block (lines 2–6).
- `public/js/main.js` → EmailJS init block (lines 13–14).
- `public/js/main.js` → Form submission via `emailjs.sendForm(...)` (lines 114–124).
- `views/index.html` → EmailJS SDK `<script>` include (line 571).

Line numbers are from the current version and may shift if you edit the files.

## ✅ Running on another machine

1. Clone the repo.
2. Run `npm install`.
3. Add your EmailJS Public Key, Service ID, and Template ID in `public/js/main.js`.
4. Run `npm start` and open http://localhost:3000.

If you want server-side email instead, create `.env` and use the `/contact` endpoint in `server.js`.

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
4. Done - live URL provided automatically
