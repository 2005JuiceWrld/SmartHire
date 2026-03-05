from fastapi import FastAPI, UploadFile, File, Form, HTTPException
from fastapi.middleware.cors import CORSMiddleware
import re
import fitz  # PyMuPDF
import io
import spacy
import torch
import numpy as np
import pandas as pd
from sentence_transformers import SentenceTransformer, util
from sklearn.metrics.pairwise import cosine_similarity
from sklearn.feature_extraction.text import TfidfVectorizer
import networkx as nx
from typing import List, Optional
import pickle
import os

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Load Models
try:
    nlp = spacy.load("en_core_web_sm")
except:
    import subprocess
    import sys
    print("Downloading spaCy model...")
    subprocess.run([sys.executable, "-m", "spacy", "download", "en_core_web_sm"])
    nlp = spacy.load("en_core_web_sm")

embedder = SentenceTransformer('all-MiniLM-L6-v2')

# Skill list and Education keywords
SKILLS_LIST = [
    'Python', 'Data Analysis', 'Machine Learning', 'Communication', 'Project Management', 'Deep Learning', 'SQL',
    'Tableau', 'Java', 'C++', 'JavaScript', 'HTML', 'CSS', 'React', 'Angular', 'Node.js', 'MongoDB', 'Express.js', 'Git',
    'Research', 'Statistics', 'Pandas', 'Numpy', 'Scikit-learn', 'TensorFlow', 'Keras', 'PyTorch', 'NLTK',
    'Natural Language Processing', 'Computer Vision', 'Docker', 'Kubernetes', 'Linux', 'AWS', 'GCP', 'Azure'
]

EDUCATION_KEYWORDS = [
    'Computer Science', 'Information Technology', 'Software Engineering', 'Data Science', 'Business Administration'
]

JOB_ROLES = {
    "Full Stack Developer": ["React", "Node.js", "Express.js", "MongoDB", "JavaScript", "HTML", "CSS", "Git"],
    "Data Scientist": ["Python", "Machine Learning", "Data Analysis", "SQL", "Pandas", "Numpy", "Statistics"],
    "Machine Learning Engineer": ["Python", "Machine Learning", "Deep Learning", "TensorFlow", "PyTorch", "Scikit-learn"],
    "DevOps Engineer": ["Docker", "Kubernetes", "AWS", "Linux", "Git", "CI/CD"],
    "Frontend Developer": ["React", "HTML", "CSS", "JavaScript", "UI/UX Design"],
    "Backend Developer": ["Node.js", "Express.js", "SQL", "MongoDB", "Python", "Java"]
}

def extract_text_from_pdf(file_content):
    try:
        doc = fitz.open(stream=file_content, filetype="pdf")
        text = ""
        for page in doc:
            text += page.get_text()
        return text
    except Exception as e:
        print(f"Error extracting PDF: {e}")
        return ""

@app.post("/extract")
async def extract_resume_data(file: UploadFile = File(...)):
    content = await file.read()
    text = ""
    
    if file.filename.endswith('.pdf'):
        text = extract_text_from_pdf(content)
    else:
        text = content.decode('utf-8', errors='ignore')

    # Extract Skills using NLP & Regex
    doc = nlp(text.lower())
    found_skills = []
    for skill in SKILLS_LIST:
        if skill.lower() in text.lower():
            found_skills.append(skill)

    # Extract Education
    found_education = []
    for edu in EDUCATION_KEYWORDS:
        if edu.lower() in text.lower():
            found_education.append(edu)

    # Skill Gap Analysis
    recommendations = {}
    for role, req_skills in JOB_ROLES.items():
        missing = [s for s in req_skills if s not in found_skills]
        match_percentage = ((len(req_skills) - len(missing)) / len(req_skills)) * 100
        recommendations[role] = {
            "match": round(match_percentage, 2),
            "missing": missing
        }

    # Mock AI Analysis Logic
    resume_score = min(40 + (len(found_skills) * 5) + (len(found_education) * 10), 95)
    
    strengths = []
    if len(found_skills) > 5:
        strengths.append("Strong technical skill set detected.")
    if len(found_education) > 0:
        strengths.append("Solid educational background in relevant fields.")
    if "Python" in found_skills or "JavaScript" in found_skills:
        strengths.append("Proficiency in industry-standard programming languages.")
    
    improvements = []
    if len(found_skills) < 8:
        improvements.append("Consider adding more specialized technical skills.")
    if "Docker" not in found_skills and "AWS" not in found_skills:
        improvements.append("Adding Cloud or DevOps tools (AWS, Docker) could boost your profile.")
    if len(text.split()) < 200:
        improvements.append("Your resume content seems a bit brief. Try elaborating on your project experiences.")

    return {
        "filename": file.filename,
        "raw_text": text,
        "skills": found_skills,
        "education": found_education,
        "recommendations": recommendations,
        "resume_score": resume_score,
        "keyStrengths": strengths,
        "improvementSuggestions": improvements
    }

@app.post("/job_match")
async def match_job(resume_text: str = Form(...), job_description: str = Form(...)):
    """
    Compares resume text with job description using NLP.
    """
    # Extract skills from both
    def extract_skills(text):
        found = []
        for skill in SKILLS_LIST:
            if skill.lower() in text.lower():
                found.append(skill)
        return found

    resume_skills = extract_skills(resume_text)
    jd_skills = extract_skills(job_description)
    
    matching_skills = list(set(resume_skills).intersection(set(jd_skills)))
    missing_skills = list(set(jd_skills) - set(resume_skills))
    
    # Calculate Semantic Similarity
    embeddings = embedder.encode([resume_text, job_description], convert_to_tensor=True)
    cosine_score = util.cos_sim(embeddings[0], embeddings[1])
    match_score = int(float(cosine_score) * 100)
    
    # Mock suggestions
    suggestions = []
    if len(missing_skills) > 0:
        suggestions.append(f"Try to gain experience in: {', '.join(missing_skills[:3])}")
    if match_score < 60:
        suggestions.append("Tailor your professional summary to highlight matching keywords.")
    else:
        suggestions.append("Your profile is a strong match. Highlight your projects related to these skills.")

    return {
        "matchScore": match_score,
        "matchingSkills": matching_skills,
        "missingSkills": missing_skills,
        "improvementSuggestions": suggestions
    }

@app.post("/smart_feed")
async def get_smart_feed(user_skills: List[str], posts: List[dict]):
    """
    Ranks posts based on user skills and post content similarity.
    """
    if not user_skills or not posts:
        return posts

    user_text = " ".join(user_skills)
    post_descriptions = [post.get('description', '') for post in posts]
    
    # Embeddings
    user_embedding = embedder.encode(user_text, convert_to_tensor=True)
    post_embeddings = embedder.encode(post_descriptions, convert_to_tensor=True)
    
    # Cosine Similarity
    cosine_scores = util.cos_sim(user_embedding, post_embeddings)[0]
    
    # Add scores to posts
    for i, post in enumerate(posts):
        post['score'] = float(cosine_scores[i])
        
    # Sort by score
    sorted_posts = sorted(posts, key=lambda x: x['score'], reverse=True)
    return sorted_posts

@app.post("/suggest_connections")
async def suggest_connections(user_id: str, users: List[dict], graph_data: List[dict]):
    """
    Suggests connections based on skill similarity and mutual friends (Graph-based).
    """
    G = nx.Graph()
    
    # Build graph
    for edge in graph_data:
        G.add_edge(edge['from'], edge['to'])
        
    user_skills_map = {u['_id']: u.get('skills', []) for u in users}
    target_skills = user_skills_map.get(user_id, [])
    
    if not target_skills:
        return []

    suggestions = []
    for other_user in users:
        oid = other_user['_id']
        if oid == user_id:
            continue
            
        # Skill Similarity
        other_skills = other_user.get('skills', [])
        intersection = set(target_skills).intersection(set(other_skills))
        skill_score = len(intersection) / max(len(target_skills), 1)
        
        # Graph Score (Mutual Friends)
        mutual_score = 0
        if G.has_node(user_id) and G.has_node(oid):
            mutual_friends = sorted(nx.common_neighbors(G, user_id, oid))
            mutual_score = len(mutual_friends) / 10 # Normalize
            
        total_score = (skill_score * 0.7) + (mutual_score * 0.3)
        
        if total_score > 0:
            suggestions.append({
                "userId": oid,
                "score": total_score,
                "mutual_friends": len(mutual_friends) if G.has_node(user_id) and G.has_node(oid) else 0
            })
            
    return sorted(suggestions, key=lambda x: x['score'], reverse=True)

@app.post("/detect_spam")
async def detect_spam(text: str):
    """
    Basic Spam Detection (could be replaced with a trained model).
    """
    spam_keywords = ['win money', 'click here', 'urgent', 'prize', 'work from home', 'easy money']
    score = 0
    for word in spam_keywords:
        if word in text.lower():
            score += 1
            
    is_spam = score > 1
    return {"is_spam": is_spam, "score": score}

@app.get("/")
def read_root():
    return {"message": "SocialSync AI Service is running"}

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)
