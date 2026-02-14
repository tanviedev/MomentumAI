import pandas as pd
import joblib

from features.feature_engineering import engineer_features
from models.classifier import train_classifier

DATA_PATH = "data/engagement_dataset.csv"
MODEL_PATH = "models/performance_classifier.pkl"

def main():
    df = pd.read_csv(DATA_PATH)
    df = engineer_features(df)

    features = [
        "engagement_intensity",
        "conversation_ratio",
        "shareability_score",
        "save_intent_score"
    ]

    model = train_classifier(df, features)

    joblib.dump(model, MODEL_PATH)
    print("✅ Model trained and saved to", MODEL_PATH)

if __name__ == "__main__":
    main()
