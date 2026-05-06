from pydantic import BaseModel
from datetime import datetime
from typing import Optional


class ChildCreate(BaseModel):
    name: str
    age: int
    gender: str           # "Male" | "Female" | "Other"
    avatar: Optional[str] = None   # emoji or initials e.g. "🐻" or "A"


class ChildResponse(BaseModel):
    child_id: int
    parent_id: int
    name: str
    age: int
    gender: str
    avatar: Optional[str]
    created_at: datetime

    class Config:
        from_attributes = True
