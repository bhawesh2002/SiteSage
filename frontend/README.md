# 📗 Frontend README (`frontend/README.md`)

# SiteSage Frontend

The SiteSage frontend is a modern, responsive dashboard built with Next.js.
It allows users to submit URLs for analysis and view detailed SEO audit reports with AI-generated insights.

---

## 🎯 Features

- URL submission form with validation
- Recent audits overview (card view)
- Detailed audit report pages
- SEO metrics & performance visualization
- AI summaries and actionable recommendations
- Loading states and error handling
- Responsive design for desktop and mobile

---

## 🧰 Tech Stack

- Next.js (App Router)
- React
- TypeScript
- Tailwind CSS
- Axios

---

## 📂 Project Structure

```

frontend/
├── src/
│ ├── app/ # Pages (App Router)
│ ├── components/ # UI components
│ ├── services/ # API services
│ ├── lib/ # API client & utilities
│ └── styles/
├── Dockerfile
└── README.md

```

---

## 🔌 API Integration

- Axios is used via a centralized API client.
- All backend interactions are handled through service classes.
- Errors and loading states are surfaced to the user.

---

## ▶️ Running Locally

```bash
npm install
npm run dev
```

or via Docker:

```bash
docker compose up frontend
```

---

## 🎨 UI & UX Notes

- Designed to be clean, readable, and functional rather than visually flashy.
- Subtle animations and hover states enhance usability.
- AI output is defensively rendered to handle variability in responses.

---

## 🌍 Deployment

- Deployed on **Vercel**
- Configured to communicate with the deployed backend service
