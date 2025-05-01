# 🎤 Voice-Based Answer Evaluation System for Physically Disabled Students

This project presents an **AI-powered, voice-based answer evaluation system** that aims to facilitate inclusive and accessible assessments for students with physical impairments. It integrates **advanced speech recognition, NLP, machine learning**, and **emotion recognition** to analyze spoken responses and provide automated grading and personalized feedback.

---

## 🚀 Features

### 🗣️ Speech-to-Text Conversion (ASR)
- Utilizes Automatic Speech Recognition (ASR) to capture spoken responses.
- Supports **accent normalization** to reduce errors from varied pronunciation patterns.

### 🧠 Natural Language Processing
- Preprocessing: Tokenization, normalization, stop word removal, and lemmatization.
- Feature Extraction:
  - **Topic Modeling** using Latent Dirichlet Allocation (LDA)
  - **Semantic Similarity** with T5 Transformer embeddings
  - **Coherence Scoring** via dependency parsing
  - **TF-IDF + Cosine Similarity** for traditional matching

### 🎓 Automated Grading
- Combined feature vectors are passed to **supervised ML models** for scoring.
- Delivers accurate, explainable, and reproducible grading outputs.

### 💡 Personalized Feedback
- AI-driven suggestions based on content gaps and linguistic analysis.
- Highlights improvement areas for better learning outcomes.

### 😃 Emotion Recognition
- Voice tone analysis to detect **emotional state and confidence level**.
- Helps instructors understand engagement levels.

### 🌐 Multilingual Support
- Evaluates spoken responses in **multiple languages**, improving accessibility.

### 🎯 Adaptive Question Recommendation
- Adjusts question difficulty based on student performance in real time.
- Promotes a personalized learning trajectory.

---

## 🧩 System Architecture

Modular and scalable architecture supporting:
- Easy upgrades to ASR, NLP, ML, feedback, and UI modules.
- API-driven integration for frontend and backend communication.

---
