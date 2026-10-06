import pandas as pd

from sklearn.feature_extraction.text import TfidfVectorizer
from sklearn.linear_model import LogisticRegression
from sklearn.pipeline import Pipeline

import pickle


# Load dataset
data = pd.read_csv("data/fake_jobs.csv")

X = data["text"]
y = data["label"]


# Create ML pipeline
model = Pipeline([
    ("tfidf", TfidfVectorizer()),
    ("classifier", LogisticRegression())
])


# Train the model
model.fit(X, y)


# Save the trained model
with open("model/scam_model.pkl", "wb") as file:
    pickle.dump(model, file)


print("✅ ScamRadar ML model trained successfully!")
print("✅ Model saved as model/scam_model.pkl")