from fastapi import FastAPI, HTTPException
import pandas as pd
import joblib

from fastapi.middleware.cors import CORSMiddleware

from features.feature_engineering import engineer_features
from models.reasoning_engine import generate_reasoning, generate_hint
from insights.insight_generator import generate_insight
from utils.config import LABEL_OUTPERFORMING, LABEL_UNDERPERFORMING

app = FastAPI()
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # allow frontend to talk to backend
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# -------------------------
# Data & Model Loading
# -------------------------
DATA_PATH = "data/engagement_dataset.csv"
MODEL_PATH = "models/performance_classifier.pkl"

df = pd.read_csv(DATA_PATH)
df = engineer_features(df)

model = joblib.load(MODEL_PATH)

# -------------------------
# Priority Scoring Logic
# -------------------------
def compute_priority(row: dict):
    """
    Higher score = higher priority to fix
    """
    score = 0.0

    if row["performance_label"] == "average":
        score += 2.0

    score += (1.0 - float(row.get("engagement_rate", 0))) * 3.0

    if row.get("conversation_ratio", 0) < 0.1:
        score += 1.0

    if row.get("save_intent_score", 0) > row.get("shareability_score", 0):
        score += 1.0

    return round(score, 2)

# -------------------------
# Routes
# -------------------------
@app.get("/")
def root():
    return {"status": "AI Engagement Analyst API is running"}

@app.get("/dashboard")
def get_dashboard():
    total = int(len(df))
    outperforming = int((df["performance_label"] == LABEL_OUTPERFORMING).sum())
    needs_attention = int(
        df["performance_label"].isin(["average", LABEL_UNDERPERFORMING]).sum()
    )

    # AI insight (single, focused)
    latest = df.iloc[-1].to_dict()
    reasoning = generate_reasoning(latest)
    ai_insight = generate_insight(latest, reasoning)

    # STEP 1: Needs-attention-only, ranked list
    content_rows = []

    for _, row in df.iterrows():
        row_dict = row.to_dict()

        if row_dict["performance_label"] != "average":
            continue

        priority = compute_priority(row_dict)
        hint = generate_hint(row_dict)

        content_rows.append({
            "content_id": str(row_dict["content_id"]),
            "status": "needs_attention",
            "hint": hint,
            "priority": priority
        })

    content_rows = sorted(
        content_rows,
        key=lambda x: x["priority"],
        reverse=True
    )

    return {
        "summary": {
            "total_contents": total,
            "outperforming": outperforming,
            "needs_attention": needs_attention
        },
        "ai_insight": {
            "content_id": ai_insight["content_id"],
            "performance": ai_insight["performance"],
            "success_driver": ai_insight["success_driver"],
            "recommendations": ai_insight["recommendations"],
            "confidence": ai_insight["confidence"]
        },
        "contents": content_rows
    }

@app.get("/content/{content_id}")
def analyze_content(content_id: str):
    row_df = df[df["content_id"] == content_id]

    if row_df.empty:
        raise HTTPException(status_code=404, detail="Content not found")

    row = row_df.iloc[0].to_dict()
    reasoning = generate_reasoning(row)
    insight = generate_insight(row, reasoning)

    return {
        "content_id": content_id,
        "performance": row["performance_label"],
        "analysis": {
            "success_driver": insight["success_driver"],
            "recommendations": insight["recommendations"],
            "confidence": insight["confidence"]
        }
    }

@app.get("/next")
def next_post_to_fix():
    candidates = []

    for _, row in df.iterrows():
        row_dict = row.to_dict()

        if row_dict["performance_label"] != "average":
            continue

        priority = compute_priority(row_dict)
        candidates.append((priority, row_dict))

    if not candidates:
        return {"message": "No posts need attention 🎉"}

    candidates.sort(key=lambda x: x[0], reverse=True)
    best = candidates[0][1]

    reasoning = generate_reasoning(best)
    insight = generate_insight(best, reasoning)

    return {
        "content_id": best["content_id"],
        "reason": insight["success_driver"],
        "recommendation": insight["recommendations"][0]
    }
