from sklearn.linear_model import LogisticRegression
from sklearn.model_selection import train_test_split

def train_classifier(df, features):
    X = df[features]
    y = (df["performance_label"] == "outperforming").astype(int)

    model = LogisticRegression(class_weight="balanced")
    model.fit(X, y)

    return model
