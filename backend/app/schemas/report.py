from pydantic import BaseModel
from datetime import datetime
from typing import Optional, Any

class ReportCreate(BaseModel):
    user_id: int
    session_id: int
    strengths: Optional[Any] = None
    weaknesses: Optional[Any] = None
    recommendations: Optional[Any] = None
    readiness_level: Optional[int] = None
    summary: Optional[str] = None

class ReportResponse(BaseModel):
    report_id: int
    user_id: int
    session_id: int
    strengths: Optional[Any] = None
    weaknesses: Optional[Any] = None
    recommendations: Optional[Any] = None
    readiness_level: Optional[int] = None
    summary: Optional[str] = None
    created_at: datetime

    class Config:
        from_attributes = True