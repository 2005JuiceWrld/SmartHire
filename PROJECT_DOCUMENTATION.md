# Project Documentation: SmartHire AI

## 1. Project Overview
**SmartHire** is a modern, AI-powered professional networking platform designed to bridge the gap between job seekers and industry requirements. Unlike traditional social networks, SmartHire utilizes Natural Language Processing (NLP) and Machine Learning (ML) to analyze user resumes, calculate ATS (Applicant Tracking System) scores, and provide a personalized "Smart Feed" based on a user's professional skill set.

## 2. System Architecture
The project follows a **Microservices-inspired Architecture** consisting of three primary layers:
1.  **Frontend (Client Layer)**: A responsive React application providing the user interface.
2.  **Backend (Orchestration Layer)**: A Node.js/Express server handling authentication, database management, and communication with the AI service.
3.  **AI Microservice (Intelligence Layer)**: A high-performance Python FastAPI service dedicated to NLP tasks and complex data analysis.

## 3. Technology Stack
*   **Frontend**: React.js (Vite), Tailwind CSS (v4), Lucide Icons.
*   **Backend**: Node.js, Express.js.
*   **AI Service**: Python 3.x, FastAPI.
*   **Database**: MongoDB (NoSQL) with Mongoose ODM.
*   **Authentication**: JSON Web Tokens (JWT) with Secure Password Hashing (bcrypt).
*   **Communication**: RESTful APIs using Axios.

## 4. AI / NLP Components
The "Intelligence Layer" utilizes several specialized libraries:
*   **Resume Extraction**: Uses **PyMuPDF (fitz)** to convert unstructured PDF data into raw text.
*   **Skill Detection**: Utilizes **spaCy (en_core_web_sm)** for Entity Recognition and pattern matching to identify technical and soft skills from the extracted text.
*   **ATS Scoring**: A custom algorithm that calculates a score based on skill density, educational relevance, and keyword matching against industry standards.

## 5. Machine Learning & AI Concepts
*   **Cosine Similarity**: Used in the "Smart Feed" to rank posts. It measures the mathematical distance between a user's skill vector and a post's content vector.
*   **Graph Theory**: Used for "Connection Suggestions." The system analyzes "Common Neighbors" using the **NetworkX** library to identify potential professional matches.
*   **Content-Based Filtering**: Recommends career roadmaps and job roles based on identified skill gaps.
*   **Heuristic Analysis**: Used for Spam Detection to identify and block fraudulent job postings.

## 6. Folder Structure
```text
SmartHire/
├── ai-service/         # Python FastAPI (NLP, ML logic, models)
├── client/             # React Frontend (UI, State Management)
│   ├── src/components/ # Reusable UI elements (Sidebar, Navbar)
│   ├── src/pages/      # View components (Dashboard, Resume)
│   └── src/context/    # Authentication & Global State
└── server/             # Node.js Backend (API, MongoDB, Auth)
    ├── controllers/    # Business logic
    ├── models/         # MongoDB Schemas
    └── routes/         # API Route definitions
```

## 7. API Endpoints
### Backend (Node.js)
*   `POST /auth/register`: User registration and auto-verification.
*   `POST /auth/login`: Authentication and JWT generation.
*   `POST /users/get-user`: Fetches real-time profile and ATS data.
*   `POST /users/upload-resume`: Handles PDF upload and coordinates AI analysis.
*   `PUT /users/update-user`: Persists profile edits to MongoDB.

### AI Service (Python)
*   `POST /extract`: Extracts text and generates ATS insights.
*   `POST /smart_feed`: Ranks social posts using Vector Embeddings.
*   `POST /suggest_connections`: Graph-based networking logic.

## 8. Data Flow
1.  **Authentication**: User logs in -> Server validates credentials -> Server returns JWT -> Client stores JWT in LocalStorage.
2.  **Analysis**: User uploads PDF -> Node server receives multipart data -> Node server forwards file to Python -> Python extracts data -> Python returns JSON results -> Node server updates MongoDB -> Frontend displays results.

## 9. Libraries & Packages
*   **npm (Node/React)**: `jsonwebtoken`, `bcryptjs`, `mongoose`, `axios`, `lucide-react`, `tailwindcss`.
*   **pip (Python)**: `fastapi`, `spacy`, `sentence-transformers`, `pymupdf`, `networkx`, `scikit-learn`.

## 10. Security Implementation
*   **JWT Protection**: All sensitive routes require a valid Bearer Token.
*   **Password Hashing**: Uses Salted Bcrypt rounds to prevent plain-text exposure.
*   **CORS**: Configured to allow only authorized cross-origin requests.
*   **Input Validation**: Strict schema enforcement using Mongoose.

## 11. Features Implemented
*   ✅ **AI Resume Analysis**: Real-time ATS scoring and skill extraction.
*   ✅ **SaaS Dashboard**: Modern, responsive UI with dynamic statistics.
*   ✅ **Interactive Profile**: Fully editable professional profile with data persistence.
*   ✅ **Smart Feed**: Personalized content ranking using ML similarity.
*   ✅ **Network Suggestions**: AI-driven connection recommendations.

## 12. Future Improvements
*   Integration of OpenAI GPT-4 for a "Career Chat Assistant."
*   Implementation of real-time notifications using WebSockets (Socket.io).
*   Addition of a Video Interview practice module using Sentiment Analysis.
*   Exporting analyzed resumes to professional PDF templates.
