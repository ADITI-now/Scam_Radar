from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel

from app.rules import check_rules

import pickle


app = FastAPI(title="ScamRadar")


app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_methods=["*"],
    allow_headers=["*"],
)


class JobMessage(BaseModel):
    text: str


# Load trained ML model
with open("model/scam_model.pkl", "rb") as file:
    ml_model = pickle.load(file)


def get_risk_level(score):
    if score >= 8:
        return "Likely Scam"
    elif score >= 2:
        return "Suspicious"
    else:
        return "Safe"


@app.post("/check")
def check_message(message: JobMessage):

    # Rule-based detection
    rule_score, reasons = check_rules(message.text)

    # Machine Learning prediction
    ml_prediction = ml_model.predict([message.text])[0]
    ml_probability = ml_model.predict_proba([message.text])[0][1]

    # ML supports the rule-based detection
    # ML only contributes when at least one red flag is detected
    if rule_score > 0 and ml_probability >= 0.75:
        ml_score = 4
    elif rule_score > 0 and ml_probability >= 0.60:
        ml_score = 2
    else:
        ml_score = 0

    # Combine rule score and ML score
    final_score = rule_score + ml_score

    # Limit score to 20
    if final_score > 20:
        final_score = 20

    risk = get_risk_level(final_score)

    # Add ML explanation only when ML actually contributes
    if ml_prediction == 1 and ml_score > 0:
        reasons.append(
            "Machine learning model detected scam-like language patterns."
        )

    return {
        "risk": risk,
        "score": final_score,
        "reasons": reasons
    }