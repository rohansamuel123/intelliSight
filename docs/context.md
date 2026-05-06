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

- **Framework:** React Native (Expo)
- **Routing:** Expo Router (file-based routing)
- **State/Storage:** `@react-native-async-storage/async-storage` for local sessions, profiles, and game data
- **API Client:** Axios for API calls (base URL from `.env` via `EXPO_PUBLIC_API_URL`)
- **Styling:** React Native StyleSheet, gamified UI theme (warm creams, vibrant orange, 3D pill shapes)
- **Scoring Engine:** Custom `scoring.ts` utility for score normalization, aggregation, and cognitive profiling

### Backend

- **Framework:** FastAPI
- **Language:** Python
- **ORM:** SQLAlchemy

### Database (Planned/Initial Setup)

- PostgreSQL

### AI Layer

- OpenClaw Agent (analysis + report generation)

---

## 📁 Project Structure

### Root

```bash
intellisight/
├── frontend/    # React Native Expo app
├── backend/     # FastAPI Python server
├── docs/        # Project documentation and context
```

---

### Frontend Structure (Expo Router)

The frontend is built using a file-based routing system where each file in `app/` is a screen.

```bash
frontend/
├── .env                    # Environment variables (EXPO_PUBLIC_API_URL)
├── .env.example            # Template for .env
├── app/
│   ├── _layout.tsx         # Root layout configuration (controls header visibility)
│   ├── index.tsx           # Home/Login screen (Quick Access & Manual Login)
│   ├── profile.tsx         # Parent account creation
│   ├── dashboard.tsx       # Main hub: score overview, domain bars, journey map
│   ├── game-results.tsx    # Post-game results screen with stars and score ring
│   ├── cognitive-profile.tsx # Full cognitive profile with radar chart & history
│   ├── games/
│   │   ├── color-recall.tsx    # 🎨 Memory — Corsi Block-Tapping
│   │   ├── speed-tap.tsx       # ⚡ Processing Speed — Reaction Time
│   │   ├── balloon-pop.tsx     # 🎈 Attention — Go/No-Go Task
│   │   ├── card-match.tsx      # 🃏 Memory — Concentration/Pairs
│   │   ├── odd-one-out.tsx     # 🔍 Attention — Visual Search
│   │   ├── pattern-puzzle.tsx  # 🧩 Logic — Raven's Matrices
│   │   ├── sequence-builder.tsx# 🔢 Logic — Series Completion
│   │   └── follow-steps.tsx    # 📋 Comprehension — Token Test
│
├── components/             # Reusable UI
│   ├── Button.tsx          # Custom 3D gamified button component
│   ├── Header.tsx          # Reusable screen header with back button
│   ├── GameCard.tsx        # Journey map card (emoji, domain badge, stars, lock)
│   ├── ScoreRing.tsx       # Circular progress ring (0-100 score display)
│   └── CognitiveRadar.tsx  # Bar-chart cognitive domain visualization
│
├── data/
│   └── gameRegistry.ts     # Centralized game metadata, ordering, domain mapping
│
├── utils/
│   └── scoring.ts          # Score normalization, aggregation, profile building
│
├── services/               # API connection logic
│   └── api.js              # Axios config (reads EXPO_PUBLIC_API_URL from .env)
```

#### 🧩 Frontend File Responsibilities:

- **`app/index.tsx`**: The main entry point. It checks for a persistent login session on mount. If logged in, redirects to `/dashboard`. If not, it reads saved profiles from `AsyncStorage` and displays large "Quick Login" avatars. It also handles manual email/password login.
- **`app/profile.tsx`**: Allows users to create a parent account (Name, Email, Password). Upon creation, the account is stored locally via `AsyncStorage` inside an `accounts` array, and the user is instantly logged in (saving to `currentUser` key) and routed to `/dashboard`.
- **`app/dashboard.tsx`**: The landing screen for parents. It reads the `currentUser` from `AsyncStorage` to display a personalized greeting. Includes a "Logout" mechanism that clears the session and routes back to `/`.
- **`components/Button.tsx`**: A reusable, highly stylized React Native `<Pressable>` component that gives buttons a tactile, 3D pill-shaped feel suitable for a gamified, child-friendly app.
- **`app/index.tsx`**: The main entry point. Checks for persistent login session. If logged in, redirects to `/dashboard`. If not, displays "Quick Login" avatars and manual email/password login.
- **`app/profile.tsx`**: Parent account creation (Name, Email, Password). Stores locally via `AsyncStorage`, logs in immediately.
- **`app/dashboard.tsx`**: The main hub. Shows overall score ring, 5 domain progress bars (Memory, Attention, Logic, Speed, Comprehension), game stats (total games, stars, unlocked count), and a vertical **Journey Map** of all 8 games with progressive unlocking.
- **`app/game-results.tsx`**: Post-game screen showing 1-3 star rating, score ring in domain color, game info badge, and "Play Again" / "Next Game" navigation.
- **`app/cognitive-profile.tsx`**: Full cognitive profile with radar visualization, domain breakdown with mini score rings, session history, and AI analysis placeholder.
- **`app/games/*.tsx`**: Each game follows the same pattern: intro screen → 3 progressive difficulty rounds (Easy → Medium → Hard) → auto-save results to AsyncStorage → navigate to game-results.
- **`data/gameRegistry.ts`**: Single source of truth for all game metadata (id, name, emoji, domain, route, color, instructions).
- **`utils/scoring.ts`**: Normalizes raw metrics (accuracy, time, level) to 0-100. Aggregates per-domain scores. Calculates overall cognitive score. Manages progressive unlocking (complete a game → unlock the next). Stores/retrieves session history from AsyncStorage.
- **`components/Button.tsx`**: Reusable 3D pill-shaped `<Pressable>` button (primary, secondary, outline variants).

---

### Backend Structure

```bash
backend/
├── app/
│   ├── main.py             # Entry point (FastAPI server)
│   ├── routes/
│   │   ├── user.py
│   │   ├── game.py
│   │   ├── session.py
│   │   ├── report.py
│   │
│   ├── models/             # SQLAlchemy ORM Models
│   │   ├── user.py
│   │   ├── game.py
│   │   ├── session.py
│   │   ├── report.py
│   │   ├── score.py
│   │
│   ├── schemas/            # Pydantic validation models
│   ├── services/
│   │   ├── scoring_service.py
│   │   ├── ai_service.py
│   │
│   ├── db/
│   │   └── database.py     # Database connection setup
```

---

## 🔄 System Flow (End-to-End)

### 1. Account & Session Flow

- **App Launch:** `index.tsx` checks `AsyncStorage` for `currentUser`.
- **If authenticated:** Immediately route to `dashboard.tsx`.
- **If unauthenticated:**
  - Display "Quick Access" profiles (loaded from `accounts` array in `AsyncStorage`).
  - User taps Quick Access -> logs in instantly.
  - OR User logs in manually with Email/Password.
  - OR User taps "Create Profile" -> navigates to `profile.tsx` -> saves new account to `AsyncStorage` -> logs in.

### 2. Gameplay Interaction (Planned)

- Child plays game in mobile app

### 3. Data Capture (Planned)

Frontend sends:

### 2. Dashboard & Journey Map
- Dashboard shows overall cognitive score ring, domain progress bars, and game stats.
- **Journey Map:** A vertical scrollable list of 8 games. Game 1 is always unlocked. Each completed game unlocks the next.
- Child taps an unlocked game card → navigates to that game's intro screen.

### 3. Gameplay Interaction (✅ Implemented)
- Each game has an **intro screen** with instructions.
- Game plays through **3 progressive rounds** (Easy → Medium → Hard).
- During play, the app captures: accuracy, time taken, level reached, correct/incorrect responses.
- On completion, a `GameSession` object is saved to `AsyncStorage`:
```json
{
  "gameId": "color-recall",
  "domain": "memory",
  "score": 5,
  "maxScore": 7,
  "accuracy": 71,
  "timeTaken": 45.2,
  "level": 3,
  "stars": 2,
  "playedAt": "2026-05-07T01:30:00.000Z"
}
```

### 4. Backend Processing

- Store raw session in DB
- Compute basic metrics

### 5. Cognitive Scoring

Derived metrics:

- memory_score
- attention_score
- logic_score
- comprehension_score
- processing_speed

### 6. AI Processing (OpenClaw)

Input:

- aggregated scores
- gameplay history
  Output:
- strengths, weaknesses, recommendations, readiness level

### 7. Output

- Dashboard updated
- Report displayed
### 4. Results & Stars
- After each game → `game-results.tsx` shows stars (1-3), score ring, domain info.
- "Play Again" or "Next Game" navigation.

### 5. Cognitive Scoring (✅ Frontend Implemented)
- Raw metrics are **normalized to 0-100** using weighted formula: 50% accuracy + 30% level + 20% speed.
- **Per-domain scores:** Best score per game, averaged across games in that domain.
- **Overall score:** Average across all scored domains.
- **Stars:** ≥80 = ⭐⭐⭐, ≥50 = ⭐⭐, else ⭐

### 6. Cognitive Profile
- `cognitive-profile.tsx` shows domain bar chart, overall score, session history.
- AI Analysis button (placeholder — ready for backend integration).

### 7. Backend Processing (Planned)
- Frontend will POST session data to backend.
- Backend stores raw session in DB, computes aggregate metrics.

### 8. AI Processing (Planned)
Input: aggregated scores + gameplay history
Output: strengths, weaknesses, recommendations, readiness level

---

## 🗄️ Database Schema (Final Plan)

### USERS (Parents)

- id (PK)
- name
- age
- gender
- email
- password (hashed)
- created_at

### CHILDREN

- child_id (PK)
- parent_id (FK to USERS)
- name
- age
- gender
- avatar
- created_at

### GAMES

- id (PK)
- name
- type (memory, logic, attention)
- difficulty_level
- description

### GAME_SESSIONS

- id (PK)
- user_id (FK)
- game_id (FK)
- score
- accuracy
- time_taken (integer seconds)
- actions (JSONB)
- played_at

### COGNITIVE_SCORES

- id (PK)
- user_id (FK)
- memory_score
- attention_score
- logic_score
- comprehension_score
- processing_speed_score
- updated_at

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

### Auth & User (Parent)

- POST /users/register → register a new parent account (returns JWT)
- POST /users/login → authenticate and receive JWT
- GET /users/me → get current authenticated parent profile
- GET /users → list all parents (admin)

### Children

- POST /children → add a child profile to the authenticated parent
- GET /children → list all children for the authenticated parent
- GET /children/{id} → get specific child
- PUT /children/{id} → update child profile
- DELETE /children/{id} → remove child profile

### Game

- GET /games → fetch available games

### Session

- POST /session → submit gameplay

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
- **Database models fully implemented with SQLAlchemy ORM** (Users, Children, Games, Sessions, Scores, Reports)
- **All model relationships fixed and validated**
- **Backend environment configuration (load_dotenv)**
- **PostgreSQL driver (psycopg2) installed and configured**
- **Backend Authentication built (bcrypt hashing, JWT tokens, protected routes)**
- **Child profile management endpoints added**
- **Frontend local session management (AsyncStorage) implemented**
- **Frontend profile creation flow built**
- **Frontend 'Quick Access' authentication built**
- **Frontend global gamified UI established (creams, warm oranges, 3D buttons)**
- **Frontend `.env` setup with `EXPO_PUBLIC_API_URL` (reads local IP dynamically)**
- **8 cognitive assessment games fully implemented (all with 3 difficulty rounds)**
- **Game registry & centralized metadata system (`gameRegistry.ts`)**
- **Scoring engine: normalization, aggregation, star calculation (`scoring.ts`)**
- **Progressive game unlocking system (complete one → unlock next)**
- **Professional dashboard with score ring, domain bars, journey map**
- **Game results screen with star ratings and next-game navigation**
- **Cognitive profile screen with domain visualization and session history**
- **4 reusable UI components: Header, GameCard, ScoreRing, CognitiveRadar**

### 🚧 In Progress

- Connecting frontend local accounts with backend Postgres accounts (wiring up Axios calls)
- Scoring Engine logic (`score_service.py`)
- Session validation logic (`session_service.py`)
- API structuring
- Backend endpoints for receiving game sessions from frontend
- Connecting frontend local accounts with backend Postgres accounts

### ❌ Not Started

- Frontend → Backend session sync (POST game sessions to API)
- AI integration (passing cognitive profiles to AI for analysis)
- Backend score computation algorithms
- AI report display on frontend

---

## ⚠️ Networking Setup (IMPORTANT)

- Use Expo Tunnel OR same WiFi
- Backend must run with:
  ```bash
  uvicorn app.main:app --host 0.0.0.0 --port 8000
  ```
- Frontend API base URL is configured via `.env` file:
  ```
  EXPO_PUBLIC_API_URL=http://YOUR_LOCAL_IP:8000
  ```
- `api.js` reads this env var: `process.env.EXPO_PUBLIC_API_URL`
- `.env` is in `.gitignore`, `.env.example` is committed for reference

---

## 🧠 AI Integration Plan

### Role of AI

- NOT real-time gameplay
- ONLY post-analysis

### Input to AI

- Cognitive scores
- Session history

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
### Design Principles
- Simple, visual, and fun for children
- Minimal reading required
- Capture **interaction patterns**, not just right/wrong answers
- Each game has **3 progressive difficulty rounds** (Easy → Medium → Hard)
- Games **unlock sequentially** to guide the child through the assessment

### 8 Implemented Games (Research-Backed)

| # | Game | Domain | Inspired By | Measures |
|---|---|---|---|---|
| 1 | 🎨 Color Recall | Memory | Corsi Block-Tapping | Visual-spatial working memory |
| 2 | ⚡ Speed Tap | Processing Speed | Simple Reaction Time | Motor speed, visual-motor coordination |
| 3 | 🎈 Balloon Pop | Attention | Go/No-Go Task | Sustained attention, impulse control |
| 4 | 🃏 Card Match | Memory | Concentration/Pairs | Recognition memory, short-term recall |
| 5 | 🔍 Odd One Out | Attention | Visual Search | Selective attention, visual scanning |
| 6 | 🧩 Pattern Puzzle | Logic | Raven's Matrices | Pattern recognition, logical reasoning |
| 7 | 🔢 Sequence Builder | Logic | Series Completion | Sequential logic, rule inference |
| 8 | 📋 Follow Steps | Comprehension | Token Test | Instruction following, verbal comprehension |

### Scoring Formula
- **Normalized Score (0-100):** `accuracy × 0.5 + (level/maxLevel × 100) × 0.3 + speedBonus × 0.2`
- **Star Rating:** ≥80 = 3 stars, ≥50 = 2 stars, else 1 star
- **Domain Score:** Average of best scores across games in that domain
- **Overall Score:** Average across all scored domains

---

## 🎯 Design Constraints

- UI must be child-friendly (warm colors, playful 3D buttons, large touch targets)
- Backend must remain simple
- AI should enhance, not complicate
- Avoid over-engineering

---

## 🧾 Usage for AI Tools

This file contains:

- Full architecture
- Data flow
- File responsibilities
- Database schemas

👉 **To any AI Assistant:** Read this entire document before generating code or making architectural decisions. It is the definitive source of truth for the IntelliSight project.

---

## 👥 Team

- D Rohan Samuel
- Syed Mohammed Zuber
- Sharon Samuel Halli
- K Anushka Reddy

---

## 📅 Current Development Status (Google Auth)

**Current Status:**
- **Google Authentication** is fully implemented and works perfectly on the **PC Web Browser**. The frontend correctly gets the `id_token` and the Python backend correctly verifies it, creates a user, and issues a JWT.
- **Backend**: Running successfully with Uvicorn. The `POST /users/google` endpoint is active and working.
- **Frontend**: `index.tsx` is configured with `expo-auth-session` and the "Continue with Google" button. 

**The Blockers (Phone Testing):**
- Testing Google Login on the actual phone via Expo Go currently fails because Google strictly blocks local IP addresses and custom app schemes (`exp://`).
- Normally bypassed by an "Android Client ID", but the generic Expo Go fingerprint is claimed globally by someone else.

**Next Steps (Tomorrow):**
To get Google Login working on the phone, implement the **Expo Proxy** method:
1. **Create an Expo Account**: Run `npx expo register` to create a free account, then run `npx expo login` in the terminal.
2. **Update Google Cloud**: Go to Google Cloud Console, edit the **Web Client ID**, and add `https://auth.expo.io` to the "Authorized redirect URIs" list.
3. **Update Code**: Update `index.tsx` to use the proxy by adding `redirectUri: AuthSession.makeRedirectUri({ useProxy: true })` to the Google Auth hook.

---

## 🚀 Final Vision

Create a platform where:

> “Every child is understood based on how they think, not judged by a single number.”
