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