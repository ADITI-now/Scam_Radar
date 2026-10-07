const button = document.getElementById("checkButton");
const message = document.getElementById("message");
const result = document.getElementById("result");

button.addEventListener("click", async function () {

    const text = message.value.trim();

    if (text === "") {
        result.innerHTML = "⚠️ Please paste a job or internship message first.";
        return;
    }

    result.innerHTML = "🔍 Analyzing offer...";

    try {

        const response = await fetch("/check", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                text: text
            })
        });

        const data = await response.json();

        let resultClass = "";

        if (data.risk === "Likely Scam") {
            resultClass = "risk-scam";
        } else if (data.risk === "Suspicious") {
            resultClass = "risk-suspicious";
        } else {
            resultClass = "risk-safe";
        }

        result.className = resultClass;

        result.innerHTML = `
            <div class="risk-header">
                <h2>${data.risk}</h2>
                <div class="score">${data.score}</div>
            </div>

            <p class="score-label">RISK SCORE</p>

            <div class="reasons">
                <h3>🚩 Detected Red Flags</h3>

                ${data.reasons.map(reason =>
                    `<div class="reason">⚠️ ${reason}</div>`
                ).join("")}
            </div>
        `;

    } catch (error) {

        result.className = "";

        result.innerHTML =
            "❌ Could not connect to ScamRadar server.";

    }

});
