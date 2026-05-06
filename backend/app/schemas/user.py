from pydantic import BaseModel, EmailStr
from datetime import datetime
from typing import Optional


# ── Registration ───────────────────────────────────────────────────────────────

class UserCreate(BaseModel):
    name: str
    age: int
    gender: str          # "Male" | "Female" | "Other"
    email: EmailStr
    password: str        # plain-text; will be hashed before storing


# ── Public response (password NEVER returned) ──────────────────────────────────

class UserResponse(BaseModel):
    user_id: int
    name: str
    age: int
    gender: str
    email: str
    created_at: datetime

    class Config:
        from_attributes = True


# ── Login ──────────────────────────────────────────────────────────────────────

class LoginRequest(BaseModel):
    email: EmailStr
    password: str

class GoogleAuthRequest(BaseModel):
    id_token: str


# ── JWT response after login / register ───────────────────────────────────────

class TokenResponse(BaseModel):
    access_token: str
    token_type: str = "bearer"
    user: UserResponse


# ── Internal — payload decoded from a JWT ─────────────────────────────────────

class TokenData(BaseModel):
    user_id: Optional[int] = None