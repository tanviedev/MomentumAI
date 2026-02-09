import pandas as pd
from features.feature_engineering import engineer_features
from models.classifier import train_classifier
from models.reasoning_engine import generate_reasoning
from insights.insight_generator import generate_insight

df = pd.read_csv("data/engagement_dataset.csv")
df = engineer_features(df)

features = [
    "engagement_intensity",
    "conversation_ratio",
    "shareability_score",
    "save_intent_score"
]

model = train_classifier(df, features)

insights = []
for _, row in df.iterrows():
    reasoning = generate_reasoning(row)
    insight = generate_insight(row, reasoning)
    insights.append(insight)

print(insights[:3])
