from pydantic import BaseModel
from datetime import datetime

class UserCreate(BaseModel):
    name:str
    age:int
    gender:str
    email:str

class UserResponse(BaseModel):
    user_id:int
    name:str
    age:int
    gender:str
    email:str
    created_at:datetime

    class Config:
        from_attributes=True