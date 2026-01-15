# SiteSage Backend

The SiteSage backend is a FastAPI-based service responsible for crawling URLs, extracting SEO and performance data, generating AI-powered insights, and persisting audit reports.

---

## 🔧 Responsibilities

- Crawl and analyze website URLs
- Extract SEO metadata (titles, headings, images, meta tags)
- Compute SEO score and issues
- Collect lightweight performance metrics
- Generate AI summaries and recommendations using Letta
- Persist and serve audit reports via REST APIs

---

## 🧱 Tech Stack

- FastAPI
- Python 3.12
- SQLAlchemy ORM
- PostgreSQL
- Alembic (migrations)
- Letta (AI orchestration)

---

## 📂 Project Structure

backend/
├── app/
│ ├── api/ # API routes
│ ├── core/ # Settings & configuration
│ ├── db/ # Database session & base
│ ├── models/ # SQLAlchemy models
│ ├── services/ # Business logic
│ ├── utils/ # Helpers (URL normalization, crawling)
│ └── main.py
├── alembic/
├── Dockerfile
└── README.md

---

## 🔑 Key Features

### Idempotent Audit Creation

- URLs are normalized and enforced as unique.
- Re-submitting the same URL returns the existing audit.

### AI Integration

- Letta agents are used to generate:
  - SEO quality summaries (2–3 paragraphs)
  - Actionable improvement suggestions
- AI output is stored and returned as part of the audit report.

---

## ▶️ Running Locally

```bash
docker compose up backend
```

---

## 🧪 Database Migrations

```bash
alembic upgrade head
```

---

## 📄 API Endpoints

| Method | Endpoint      | Description              |
| ------ | ------------- | ------------------------ |
| POST   | `/audit`      | Create or fetch an audit |
| GET    | `/audit/list` | List recent audits       |
| GET    | `/audit/{id}` | Fetch audit details      |

---

## 📘 API Docs

Swagger UI available at:

```
/docs
```
