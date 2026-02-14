# AI Engagement Analyst

**AI Engagement Analyst** is a Decision Intelligence system that turns content analytics into clear, actionable coaching.

Instead of showing raw metrics, the system explains:
- *Why* a post performed the way it did
- *What* worked and what didn’t
- *What to do next*

The goal is to reduce decision fatigue and guide users toward the **single most useful next action**.

---

## 🚀 What This Project Does

- Analyzes content performance data
- Identifies posts that need attention
- Explains engagement patterns in plain language
- Recommends what to fix next
- Provides a calm, minimal dashboard UX

This is **not** a traditional analytics dashboard.  
It is a **Decision Intelligence assistant**.

---

## 🧠 Core Features

- **Needs Attention Queue**  
  Only shows posts that require action, ranked by priority.

- **AI Insight Panel**  
  One focused insight at a time — no overload.

- **Per-Content Drilldown**  
  Click any post to understand *why* it behaved the way it did.

- **“Next Post to Improve” Button**  
  Removes choice paralysis by telling the user where to start.

---

## 🗂 Project Structure

```text
ai_engagement_analyst/
├── api/
│   └── dashboard_api.py
│
├── data/
│   └── engagement_dataset.csv
│
├── features/
│   └── feature_engineering.py
│
├── models/
│   ├── classifier.py
│   ├── reasoning_engine.py
│   └── performance_classifier.pkl
│
├── insights/
│   └── insight_generator.py
│
├── utils/
│   └── config.py
│
├── frontend/
│   ├── index.html
│   ├── style.css
│   └── app.js
│
├── train.py
├── requirements.txt
└── README.md



⚙️ Setup Instructions
1️⃣ Create environment (recommended)
python -m venv venv
source venv/bin/activate   # macOS/Linux
# venv\Scripts\activate    # Windows

2️⃣ Install dependencies
pip install -r requirements.txt

🧪 Train the Model (one-time): This generates performance_classifier.pkl.
python train.py

You should see:
Model trained and saved to models/performance_classifier.pkl

▶️ Run the Backend
From the project root:
uvicorn api.dashboard_api:app --reload
Backend runs at:
http://127.0.0.1:8000

Useful endpoints:
/dashboard
/content/{content_id}
/next

🌐 Run the Frontend
Do not open index.html directly.
Serve it via HTTP:
cd frontend
python -m http.server 5500
Open in browser:
http://127.0.0.1:5500 OR right-click 'index.html' and click: open with live server


1.) uvicorn api.dashboard_api:app --reload
This does one critical job:
Starts a server at http://127.0.0.1:8000
Exposes routes like:
/dashboard
/content/{id}
/next
Think of this as turning the brain on.

If this is not running:
fetch("http://127.0.0.1:8000/dashboard") has nowhere to go
The browser silently fails
UI looks “static”

2.) index.html (served via HTTP)
This does a different job:
Loads UI
Runs JavaScript
Calls the backend using fetch()
Think of this as the eyes and hands.

If this runs without the backend:
UI loads
JS runs
API calls fail
No data appears









🧠 Content Insight Engine (MVP)

An AI-powered engine that analyzes social media content performance and generates actionable insights using a local LLM (Phi via Ollama).

Users do not enter JSON.
They simply select a post link, and the system:

fetches structured performance data

runs LLM reasoning

returns human-readable insights

✨ Features

🔗 Link-based analysis (Instagram, YouTube, LinkedIn, etc.)

🧠 Local LLM inference using Ollama (Phi)

⚡ FastAPI backend

🎨 React + Vite frontend

🧪 MVP-friendly in-memory content database

🔒 Safe JSON-only LLM responses

🚀 Ready for deployment

🗂️ Project Structure
digiBot/
│
├── contextEngine/
│   └── backend/
│       ├── main.py
│       ├── llm/
│       │   ├── insight_engine.py
│       │   └── prompt.txt
│       ├── data/
│       │   └── content_store.py
│       └── requirements.txt
│
├── frontend/
│   ├── src/
│   │   ├── App.jsx
│   │   ├── api.js
│   │   ├── main.jsx
│   │   ├── index.css
│   │   └── App.css
│   └── package.json
│
└── README.md

🧰 Prerequisites
1. System

Python 3.10+

Node.js 18+

Git

Windows / macOS / Linux

2. Ollama (Local LLM)

Install Ollama from:
👉 https://ollama.com

Pull Phi model:

ollama pull phi


Verify:

ollama run phi

🧠 Backend Setup (FastAPI)
1. Go to backend
cd contextEngine/backend

2. Create virtual environment (recommended)
python -m venv venv
venv\Scripts\activate   # Windows

3. Install dependencies
pip install fastapi uvicorn requests pydantic

4. Start the backend server
uvicorn main:app --reload


Backend will run at:

http://127.0.0.1:8000

5. Available API Routes
Method	Route	Description
GET	/links	Returns all available post links
POST	/analyze/link	Analyzes selected link

Example request:

{
  "link": "https://instagram.com/p/abc123"
}

🧠 LLM Insight Engine

Model: phi (via Ollama)

Runs locally on CPU

Strict JSON output enforcement

Safe fallback if model returns invalid output

Prompt lives in:

backend/llm/prompt.txt


Inference logic:

backend/llm/insight_engine.py

🗃️ Content Database (MVP)

Current MVP uses an in-memory Python dictionary.

Location:

backend/data/content_store.py


Why?

No DB setup required

Easy to test and iterate

Perfect for demos & validation

⚠️ No deployment issues with this for MVP.

Future upgrade:

PostgreSQL / Supabase / Firebase

🎨 Frontend Setup (React + Vite)
1. Go to frontend
cd frontend

2. Install dependencies
npm install

3. Start frontend
npm run dev


Frontend runs at:

http://localhost:5173

🖥️ Frontend Flow

User selects a post link from dropdown

Clicks Analyze

Frontend calls backend

LLM generates insights

Results are rendered cleanly

✅ Example Output
AI Insight

Failure Reason:
intent_match is misaligned, message and audience expectation differ

Success Driver:
Timing quality was good

Recommended Actions:
- Align message with audience intent
- Improve hook strength

Confidence: 80%

🧪 Common Issues & Fixes
❌ 404 on /analyze

✅ Use:

POST /analyze/link

❌ Ollama port error (11434 in use)

✅ Ollama is already running
DO NOT run ollama serve again.

❌ Frontend shows “Something went wrong”

Check backend is running

Check correct API route

Check CORS enabled

🚀 Deployment (Next Steps)

Ready for:

Vercel (Frontend)

Railway / Render (Backend)

Dockerization

Real-time scraping

Auth + user uploads

🧠 Roadmap

🔍 Auto-scrape link metadata

📊 Engagement visualizations

🧠 Multi-pass LLM reasoning

🧪 A/B hook analysis

🧬 Personalization by platform

❤️ Built With

FastAPI

React + Vite

Ollama

Phi LLM

Pure caffeine & persistence ☕🔥