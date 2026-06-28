# SmartHire

SmartHire is an AI-assisted recruitment and professional networking platform for candidates, recruiters, and admins. It combines resume analysis, job matching, recruiter search, social networking, and platform moderation in a single workflow.

## What It Does

- Helps candidates upload resumes and get ATS-style analysis
- Helps recruiters search and rank candidates by skill fit
- Lets recruiters post jobs and review AI-ranked matches
- Includes social features such as posts, likes, comments, and friend requests
- Adds admin controls for platform oversight

## Highlights

| Area | What is implemented |
|---|---|
| Authentication | JWT login and register, role-based access for `candidate`, `recruiter`, and `admin` |
| Candidate flow | Profile editing, resume upload, resume analysis, job matching, connections, notifications |
| Recruiter flow | Candidate search, job creation, job listings, AI-ranked candidate matches |
| Admin flow | User management, job management, platform stats |
| AI / ML | PDF text extraction, skill detection, ATS scoring, resume-JD matching, smart feed ranking, connection suggestions, spam detection |
| Email flows | Email verification and password reset |

## AI And Matching

The AI service is a local Python FastAPI app, not a hosted LLM integration.

Implemented AI / ML components:

- PyMuPDF for PDF text extraction
- spaCy for text processing and skill detection
- sentence-transformers for semantic embeddings
- cosine similarity for resume-JD and post ranking
- TF-IDF and cosine-based candidate matching
- NetworkX for connection suggestions
- keyword-based spam detection

Not used in this codebase:

- OpenAI, Gemini, or Llama APIs
- OCR
- Google OAuth
- TensorFlow / PyTorch training pipelines
- Chatbot module

## Tech Stack

### Frontend

- React 19
- Vite
- React Router
- Axios
- Lucide React
- Tailwind CSS 4

### Backend

- Node.js
- Express
- MongoDB
- Mongoose
- JWT
- Multer
- Nodemailer
- Helmet
- Morgan

### AI Service

- Python 3
- FastAPI
- PyMuPDF
- spaCy
- sentence-transformers
- scikit-learn
- NetworkX
- pandas
- numpy
- PyTorch

## Main User Capabilities

### Candidates

- Register and log in
- Edit profile details, skills, education, experience, bio, and location
- Upload a PDF resume for AI analysis
- View ATS score, extracted skills, strengths, and improvement suggestions
- Compare a resume against a job description
- Send and accept friend requests
- View profile views

### Recruiters

- Search candidates by skills
- Create job posts
- View their own job posts
- Open AI-ranked matches for each job
- Review skill overlap, missing skills, and match scores

### Admins

- View platform-wide stats
- View all users
- Delete users
- View all jobs
- Delete jobs

## Platform Features

- Candidate and recruiter dashboards
- Social feed with AI-based post ranking
- Spam filtering for posts
- Notifications and settings pages
- Email verification
- Password reset flow

## Deployment Notes

- Frontend: React app in `client/`
- Backend: Express app in `server/`
- AI service: FastAPI app in `ai-service/`
- Database: MongoDB

The backend serves the built frontend from `server/views/build` when present.

## Local Setup

### Backend

```bash
cd server
npm install
npm run dev
```

### AI Service

```bash
cd ai-service
pip install -r requirements.txt
uvicorn main:app --reload --port 8000
```

### Frontend

```bash
cd client
npm install
npm run dev
```

## Environment Variables

Add these to the backend `.env` file:

- `MONGO_URL`
- `JWT_SECRET_KEY`
- `AUTH_EMAIL`
- `AUTH_PASSWORD`
- `APP_URL`
- `PORT` optional, defaults to `8800`

## Metrics

The codebase exposes platform counters, but not model-evaluation benchmarks.

Available stats:

- Total users
- Total candidates
- Total recruiters
- Total jobs
- Total resumes analyzed

Not currently tracked:

- Resume parsing accuracy
- Matching accuracy
- Average response time
- Training dataset size

## Notes

- Resume upload currently supports PDF only.
- Some dashboard values are placeholders in the UI, so they should not be described as live analytics.
- If you change the backend or AI service host/port, update the hardcoded localhost URLs in the client and server.
