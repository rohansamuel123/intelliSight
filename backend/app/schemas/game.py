from pydantic import BaseModel
from datetime import datetime

class GameCreate(BaseModel):
    game_name: str
    game_description: str
    game_type: str
    game_difficulty: int

class GameResponse(BaseModel):
    game_id: int
    game_name: str
    game_description: str
    game_type: str
    game_difficulty: int
    created_at: datetime

    class Config:
        from_attributes = True