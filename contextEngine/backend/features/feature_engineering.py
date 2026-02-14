import pandas as pd

def engineer_features(df):
    df = df.copy()

    df["engagement_intensity"] = (
        df["likes"] + df["comments"] + df["shares"] + df["saves"]
    ) / df["reach"]

    df["conversation_ratio"] = df["comments"] / (df["likes"] + 1)
    df["shareability_score"] = df["shares"] / df["reach"]
    df["save_intent_score"] = df["saves"] / df["reach"]

    return df
