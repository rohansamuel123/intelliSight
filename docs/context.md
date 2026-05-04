# 🧠 IntelliSight — Full Project Context (AI-Ready)

---

## 📌 Project Identity

**Name:** IntelliSight
**Type:** AI-powered cognitive assessment platform for children
**Platform:** Mobile-first (React Native)
**Goal:** Replace rigid IQ-based evaluation with **behavior-based cognitive assessment**

---

## 🎯 Core Idea (VERY IMPORTANT)

Instead of testing children with static IQ questions:

👉 We observe **how they interact with tasks**

We measure:

- Memory
- Attention
- Logic
- Comprehension
- Processing Speed

👉 Then use AI to interpret these behaviors into a **cognitive profile**

---

## 🧠 Key Principle

> “Measure thinking patterns, not just answers.”

---

## 🏗️ Tech Stack

### Frontend

- React Native (Expo)
- Expo Router (file-based routing)
- Axios for API calls

### Backend

- FastAPI
- Python

### Database (Planned)

- PostgreSQL

### AI Layer

- OpenClaw Agent (analysis + report generation)

---

## 📁 Project Structure

### Root

```bash
intellisight/
├── frontend/
├── backend/
├── docs/
```

---

### Frontend Structure (Expo Router)

```bash
frontend/
├── app/
│   ├── index.tsx           # Home screen
│   ├── profile.tsx         # User setup
│   ├── game.tsx            # Game screen
│   ├── dashboard.tsx       # Progress view
│   ├── report.tsx          # AI report
│
├── services/
│   └── api.js              # Axios config
│
├── components/             # Reusable UI
├── hooks/                  # Custom logic
├── constants/              # Config values
```

---

### Backend Structure (Planned)

```bash
backend/
├── app/
│   ├── main.py
│   ├── routes/
│   │   ├── user.py
│   │   ├── game.py
│   │   ├── session.py
│   │   ├── report.py
│   │
│   ├── models/
│   ├── schemas/
│   ├── services/
│   │   ├── scoring_service.py
│   │   ├── ai_service.py
│   │
│   ├── db/
│   │   └── database.py
```

---

## 🔄 System Flow (End-to-End)

### 1. User Interaction

- Child plays game in mobile app

---

### 2. Data Capture

Frontend sends:

```json
{
  "user_id": "uuid",
  "game_id": "memory_01",
  "actions": [...],
  "time_taken": 12.5,
  "accuracy": 80
}
```

---

### 3. Backend Processing

- Store raw session in DB
- Compute basic metrics

---

### 4. Cognitive Scoring

Derived metrics:

- memory_score
- attention_score
- logic_score
- comprehension_score
- processing_speed

---

### 5. AI Processing (OpenClaw)

Input:

- aggregated scores
- gameplay history

Output:

- strengths
- weaknesses
- recommendations
- readiness level

---

### 6. Output

- Dashboard updated
- Report displayed

---

## 🗄️ Database Schema (Final Plan)

### USERS

- id (PK)
- name
- age
- email
- created_at

---

### GAMES

- id (PK)
- name
- type (memory, logic, attention)
- difficulty_level
- description

---

### GAME_SESSIONS

- id (PK)
- user_id (FK)
- game_id (FK)
- score
- accuracy
- time_taken
- actions (JSONB)
- played_at

---

### COGNITIVE_SCORES

- id (PK)
- user_id (FK)
- memory_score
- attention_score
- logic_score
- comprehension_score
- processing_speed_score
- updated_at

---

### REPORTS

- id (PK)
- user_id (FK)
- summary
- strengths
- weaknesses
- recommendations
- readiness_level
- created_at

---

## 🔌 API Design (Planned)

### User

- POST /users → create user
- GET /users → list users

---

### Game

- GET /games → fetch available games

---

### Session

- POST /session → submit gameplay

---

### Report

- GET /report/{user_id} → fetch AI report

---

## ⚙️ Current Implementation Status

### ✅ Done

- Idea finalized
- Wireframes created
- DFD created
- DB schema designed
- Backend initialized
- Basic FastAPI running
- Frontend initialized (Expo Router)
- Frontend ↔ Backend connection working
- CORS configured
- **Database models fully implemented with SQLAlchemy ORM**
- **All model relationships fixed and validated**
- **Backend environment configuration (load_dotenv)**
- **PostgreSQL driver (psycopg2) installed and configured**
- **Backend server running successfully on port 8000**

---

### 🚧 In Progress

- API structuring
- First real endpoints

---

### ❌ Not Started

- Database integration
- Game logic
- AI integration

---

## 🔧 Recent Fixes & Changes (May 5, 2026)

### Backend Model Fixes

Fixed critical issues in SQLAlchemy ORM model definitions:

1. **[User Model](../backend/app/models/user.py)** - Updated relationships:
   - Fixed back_populates references (was "users" → now "user" for singular relationships)
   - Added missing `games` relationship to `Game` model
   - Fixed cascade delete relationships

2. **[Game Model](../backend/app/models/game.py)** - Added missing relationship:
   - Added `game_sessions` relationship back to `Session` model
   - Corrected back_populates naming

3. **[Session Model](../backend/app/models/session.py)** - Fixed multiple issues:
   - Removed invalid `time_taken` calculation (was trying to subtract datetime columns)
   - Changed `time_taken` to Integer column for storing seconds
   - Fixed relationship references: `users` → `user`, `games` → `game`
   - Removed invalid `server_default` from `end_time` column

4. **[Report Model](../backend/app/models/report.py)** - Fixed relationship:
   - Fixed back_populates: `"users"` → `"User"` (capitalization and correct reference)
   - Changed relationship name: `users` → `user` (singular)

5. **[CognitiveScore Model](../backend/app/models/score.py)** - Fixed relationship:
   - Fixed back_populates: `"cognitive_scores"` → `"cognitive_score"` (matching User model definition)
   - Changed relationship name: `users` → `user` (singular)

### Environment & Dependencies

- **[main.py](../backend/main.py)** - Fixed initialization order:
  - Moved `load_dotenv()` to the very top before any app imports
  - Ensures `DATABASE_URL` environment variable is loaded before database connection attempt

- **[requirements.txt](../backend/requirements.txt)** - Added missing dependency:
  - Added `psycopg2-binary==2.9.9` for PostgreSQL connection support

### Database Configuration

- **.env** - Already configured with PostgreSQL connection:
  - `DATABASE_URL=postgresql://postgres:admin@localhost:5432/intellisight_db`
  - Ensure PostgreSQL is running locally on default port 5432

### Validation

✅ Backend server starts successfully:

```bash
uvicorn main:app --host 0.0.0.0 --port 8000
```

Output:

```
INFO:     Started server process
INFO:     Waiting for application startup.
INFO:     Application startup complete.
INFO:     Uvicorn running on http://0.0.0.0:8000
```

---

## ⚠️ Networking Setup (IMPORTANT)

- Use Expo Tunnel OR same WiFi
- Backend must run with:

  ```bash
  uvicorn main:app --host 0.0.0.0 --port 8000
  ```

- API baseURL:
  - localhost for web
  - IPv4 for mobile

---

## 🧠 AI Integration Plan

### Role of AI

- NOT real-time gameplay
- ONLY post-analysis

---

### Input to AI

- Cognitive scores
- Session history

---

### Output

Structured JSON:

```json
{
  "strengths": "...",
  "weaknesses": "...",
  "recommendations": "...",
  "readiness_level": "..."
}
```

---

## 🧩 Game Design Approach

Games should:

- Be simple and visual
- Require minimal reading
- Capture interaction patterns

Examples:

- Memory sequence
- Pattern matching
- Follow instructions

---

## 🎯 Design Constraints

- UI must be child-friendly
- Backend must remain simple
- AI should enhance, not complicate
- Avoid over-engineering

---

## 🚀 Roadmap

### Phase 1 (Now)

- Basic APIs
- UI skeleton
- Data flow working

---

### Phase 2

- Database integration
- Scoring logic

---

### Phase 3

- AI integration
- Report generation

---

### Phase 4

- UI polish
- Demo readiness

---

## 🧠 Key Philosophy

- Focus on **behavior over scores**
- Keep system **modular**
- Build **incrementally**
- Prioritize **clarity over complexity**

---

## 🧾 Usage for AI Tools

This file contains:

- Full architecture
- Data flow
- API plan
- Folder structure

👉 Can be directly used as context for:

- Code generation tools
- AI agents
- Team onboarding

---

## 👥 Team

- D Rohan Samuel
- Syed Mohammed Zuber
- Sharon Samuel Halli
- K Anushka Reddy

---

## 🚀 Final Vision

Create a platform where:

> “Every child is understood based on how they think, not judged by a single number.”

---
