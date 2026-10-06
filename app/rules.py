def check_rules(text):
    text = text.lower()

    score = 0
    reasons = []

    if "100% assurance" in text or "guaranteed job" in text:
        score += 3
        reasons.append("Promises a guaranteed job or 100% assurance.")

    if "no skill required" in text:
        score += 2
        reasons.append("Claims that no skills are required.")

    if "registration fee" in text or "pay registration" in text:
        score += 4
        reasons.append("Requests a registration payment.")

    if "training fee" in text or "pay for training" in text:
        score += 4
        reasons.append("Requests payment for training.")

    if "whatsapp only" in text:
        score += 2
        reasons.append("Uses WhatsApp as the only contact method.")

    if "urgent" in text or "immediately" in text or "limited seats" in text:
        score += 2
        reasons.append("Uses urgency or pressure to make the user act quickly.")

    if "₹1 lakh per month" in text or "1 lakh salary" in text:
        score += 3
        reasons.append("Promises an unusually high salary.")

    return score, reasons