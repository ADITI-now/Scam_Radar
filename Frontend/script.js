const button = document.getElementById("checkButton");
const message = document.getElementById("message");
const result = document.getElementById("result");

document.getElementById("fakeOfferButton").onclick = () => {
    message.value = "URGENT! You are guaranteed a job. Pay ₹2000 registration fee immediately. Contact us only through WhatsApp.";
};

document.getElementById("realOfferButton").onclick = () => {
    message.value = "Software Developer Internship at a reputed company. Apply through the official company website. No registration fee is required.";
};


/* Highlight red flags */

function highlightFlags(text) {
    const words = [
        "registration fee", "training fee", "guaranteed job",
        "urgent", "immediately", "whatsapp only"
    ];

    words.forEach(word => {
        text = text.replace(
            new RegExp(word, "gi"),
            match => `<mark>${match}</mark>`
        );
    });

    return text;
}


/* Explain detected red flags */

function explanation(reason) {
    const r = reason.toLowerCase();

    if (r.includes("registration"))
        return "Genuine employers generally do not require payment to apply.";
    if (r.includes("training"))
        return "Be careful when an employer asks you to pay for mandatory training.";
    if (r.includes("guaranteed"))
        return "Real jobs normally involve selection, skills or interviews.";
    if (r.includes("whatsapp"))
        return "WhatsApp-only recruitment can make the employer harder to verify.";
    if (r.includes("urgency"))
        return "Urgency can pressure applicants into acting before verifying the offer.";
    if (r.includes("salary"))
        return "An unusually high salary should be independently verified.";

    return "This pattern should be verified before proceeding.";
}


/* Analyze offer */

button.onclick = async () => {
    const text = message.value.trim();

    if (!text) {
        result.innerHTML = "⚠️ Please paste a job or internship message first.";
        return;
    }

    result.innerHTML = "🔍 Analyzing offer...";

    try {
        const apiUrl = window.location.protocol === "file:"
            ? "http://127.0.0.1:8000/check"
            : "/check";

        const response = await fetch(apiUrl, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ text })
        });

        if (!response.ok) throw new Error("Server error");

        const data = await response.json();
        const risk100 = Math.round((data.score / 20) * 100);

        let resultClass = "risk-safe";
        if (data.risk === "Likely Scam") resultClass = "risk-scam";
        else if (data.risk === "Suspicious") resultClass = "risk-suspicious";

        result.className = resultClass;

        const reasons = data.reasons.length
            ? data.reasons.map(reason => `
                <div class="reason">
                    ⚠️ ${reason}<br>
                    <small>💡 ${explanation(reason)}</small>
                </div>
            `).join("")
            : `<div class="reason">✓ No major red flags detected.</div>`;

        result.innerHTML = `
            <div class="risk-header">
                <h2>${data.risk}</h2>
                <div class="score">${data.score}</div>
            </div>

            <p class="score-label">RISK SCORE: ${risk100}/100</p>

            <div class="reasons">
                <h3>🚩 Detected Red Flags</h3>
                ${reasons}
            </div>

            <div class="highlight-box">
                <h3>🔎 Message Check</h3>
                <p>${highlightFlags(text)}</p>
            </div>
        `;

    } catch (error) {
        result.innerHTML = "❌ Could not connect to ScamRadar server.";
        console.error(error);
    }
};