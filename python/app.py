from flask import Flask, request, jsonify
from flask_pymongo import PyMongo
from werkzeug.security import generate_password_hash, check_password_hash
from transformers import T5Tokenizer, T5ForConditionalGeneration
import torch
import spacy
import gensim
from gensim import corpora
from sklearn.metrics.pairwise import cosine_similarity
from flask_cors import CORS

app = Flask(__name__)
CORS(app)

# MongoDB config (adjust as needed)
app.config["MONGO_URI"] = "mongodb://localhost:27017/test"
mongo = PyMongo(app)

# Load NLP models
nlp = spacy.load("en_core_web_sm")
tokenizer = T5Tokenizer.from_pretrained("t5-small")
model = T5ForConditionalGeneration.from_pretrained("t5-small")

# -------------------------- Evaluation Functions --------------------------

def lda_topic_score(reference, student):
    texts = [reference.split(), student.split()]
    dictionary = corpora.Dictionary(texts)
    corpus = [dictionary.doc2bow(text) for text in texts]
    lda_model = gensim.models.LdaModel(corpus, num_topics=3, id2word=dictionary, passes=10)

    ref_topics = lda_model[dictionary.doc2bow(reference.split())]
    stu_topics = lda_model[dictionary.doc2bow(student.split())]

    ref_vector = [t[1] for t in ref_topics]
    stu_vector = [t[1] for t in stu_topics]

    if len(ref_vector) == len(stu_vector):
        return cosine_similarity([ref_vector], [stu_vector])[0][0]
    return 0.0

def semantic_similarity_score(reference, student):
    input_text = f"stsb sentence1: {reference} sentence2: {student}"
    input_ids = tokenizer(input_text, return_tensors="pt").input_ids
    output = model.generate(input_ids)
    score = tokenizer.decode(output[0], skip_special_tokens=True)
    return float(score) if score.replace('.', '', 1).isdigit() else 0.5

def coherence_score(student):
    doc = nlp(student)
    return min(len(set([token.dep_ for token in doc])), 1.0)

# -------------------------- API Routes --------------------------

@app.route('/evaluate', methods=['POST'])
def evaluate():
    data = request.json
    answers = data.get("answers", [])

    results = []
    for item in answers:
        question = item["question"]
        reference = item["referenceAnswer"]
        student = item["studentAnswer"].strip()

        if not student:
            total_score = 0.0
            lda_score = 0.0
            semantic_score = 0.0
            coherence = 0.0
        else:
            lda_score = lda_topic_score(reference, student) * 3
            semantic_score = semantic_similarity_score(reference, student)
            coherence = coherence_score(student) * 2
            total_score = lda_score + semantic_score + coherence

        results.append({
            "question": question,
            "student": student,
            "reference": reference,
            "score": round(total_score, 2),
            "lda": lda_score,
            "t5": semantic_score,
            "coherence": coherence
        })

    return jsonify({"scores": results})


@app.route('/api/student/register', methods=['POST'])
def register_student():
    data = request.json
    name = data.get("name")
    roll_no = data.get("rollNo")
    email = data.get("email")
    phone = data.get("phone")
    semester = data.get("semester")
    password = data.get("password")

    if mongo.db.learners.find_one({"rollNo": roll_no}):
        return jsonify({"error": "Student already exists"}), 409

    hashed_password = generate_password_hash(password)
    mongo.db.learners.insert_one({
        "name": name,
        "rollNo": roll_no,
        "email": email,
        "phone": phone,
        "semester": semester,
        "password": hashed_password
    })

    return jsonify({"message": "Student registered successfully"}), 201


@app.route('/api/student/login', methods=['POST'])
def login_student():
    data = request.json
    roll_no = data.get("rollNo")
    password = data.get("password")

    student = mongo.db.learners.find_one({"rollNo": roll_no})
    if not student:
        return jsonify({"error": "Student not found"}), 404

    if check_password_hash(student["password"], password):
        return jsonify({
            "message": "Login successful",
            "student": {
                "name": student["name"],
                "rollNo": student["rollNo"],
                "email": student["email"],
                "semester": student["semester"]
            }
        }), 200
    else:
        return jsonify({"error": "Invalid password"}), 401

# -------------------------- Run Server --------------------------

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5000, debug=True, use_reloader=False)