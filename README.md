# 🛡️ ScamRadar

ScamRadar is a web-based application that helps users identify potentially fraudulent job and internship opportunities.

Users can paste a job or internship message into the application, and ScamRadar analyzes it using rule-based detection and a machine learning model. It then provides a risk level, risk score, and specific reasons for the detected warning signs.

## 🎯 Problem Statement

Job and internship scams are becoming increasingly common. Fake opportunities may promise unrealistic salaries, guaranteed jobs, require registration or training fees, or pressure applicants to act immediately.

ScamRadar aims to provide a simple first-level screening tool that helps users recognize common warning signs before responding to an opportunity.

## ✨ Features

- 🚩 Rule-based scam detection
- 🤖 Machine learning based text classification
- 🧠 Explainable scam detection reasons
- 📊 Risk scoring system
- 🟢 Safe classification
- 🟠 Suspicious classification
- 🔴 Likely Scam classification
- ⚡ Fast web-based analysis
- 📱 Simple and responsive interface

## 🏗️ System Architecture

```text
User
  ↓
ScamRadar Web Interface
  ↓
JavaScript
  ↓
FastAPI Backend
  ↓
 ┌───────────────────────┐
 │ Rule-Based Detection  │
 │          +            │
 │ Machine Learning      │
 └───────────────────────┘
  ↓
Risk Score + Detected Reasons
  ↓
Result displayed to User